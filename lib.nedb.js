/*
 * assets.nedb-lite.js
 *
 * this package will run a standalone, browser-compatible version of the nedb v1.8.0 database
 * with zero npm-dependencies
 *
 * browser example:
 *     <script src="assets.nedb-lite.js"></script>
 *     <script>
 *     var table = new window.Nedb({ name: 'table1' });
 *     table.insert({ field1: 'hello', field2: 'world'}, console.log.bind(console));
 *     </script>
 *
 * node example:
 *     var Nedb = require('./assets.nedb-lite.js');
 *     var table = new Nedb({ name: 'table1' });
 *     table.insert({ field1: 'hello', field2: 'world'}, console.log.bind(console));
 */



/* istanbul instrument in package nedb-lite */
/*jslint
    browser: true,
    maxerr: 8,
    maxlen: 196,
    node: true,
    nomen: true,
    regexp: true,
    stupid: true
*/
(function () {
    'use strict';
    var local;



    // run shared js-env code - pre-init
    (function () {
        // init local
        local = function (options, onError) {
        /**
         * Create a new collection
         * @param {String} options.name
         * @param {Function} onError Optional,
         * if autoload is used this will be called after the load database
         * with the error object as parameter. If you don't pass it the error will be thrown
         */
            // validate name
            if (!(options && options.name && typeof options.name === 'string')) {
                throw new Error('Nedb - missing name param, e.g. new Nedb({ name: "table1" })');
            }
            this.name = options.name;
            local.dbTableDrop(this, local.nop);
            local.dbTableDict[this.name] = this;
            // Persistence handling
            this.persistence = new local.Persistence({ db: this });
            // This new executor is ready if we don't use persistence
            // If we do, it will only be ready once loadDatabase is called
            this.executor = new local.Executor();
            // Indexed by field name, dot notation can be used
            // _id is always indexed and since _ids are generated randomly the underlying
            // binary is always well-balanced
            this.indexes = {
                _id: new local.Index({ fieldName: '_id', unique: true }),
                createdAt: new local.Index({ fieldName: 'createdAt' }),
                updatedAt: new local.Index({ fieldName: 'updatedAt' })
            };
            this.ttlIndexes = {};
            this.load(options, onError);
        };
        local.Nedb = local.local = local;
        // init modeJs
        local.modeJs = (function () {
            try {
                return typeof navigator.userAgent === 'string' &&
                    typeof document.querySelector('body') === 'object' &&
                    typeof XMLHttpRequest.prototype.open === 'function' &&
                    'browser';
            } catch (errorCaughtBrowser) {
                return module.exports &&
                    typeof process.versions.node === 'string' &&
                    typeof require('http').createServer === 'function' &&
                    'node';
            }
        }());
        // init global
        local.global = local.modeJs === 'browser'
            ? window
            : global;
    }());



    // run shared js-env code - function
    (function () {
        local.assert = function (passed, message) {
        /*
         * this function will throw the error message if passed is falsey
         */
            var error;
            if (passed) {
                return;
            }
            error = message && message.message
                // if message is an error-object, then leave it as is
                ? message
                : new Error(typeof message === 'string'
                    // if message is a string, then leave it as is
                    ? message
                    // else JSON.stringify message
                    : JSON.stringify(message));
            throw error;
        };

        local.dbExport = function () {
        /*
         * this function will export the database as a serialized tableList
         */
            var data;
            data = '';
            Object.keys(local.dbTableDict).map(function (key) {
                data += local.dbTableDict[key].export() + '\n\n';
            });
            return data.slice(0, -2);
        };

        local.dbImport = function (tableList, onError) {
        /*
         * this function will import the serialized tableList
         */
            var onParallel;
            onParallel = function () {
                onParallel.counter -= 1;
                if (onParallel.counter === 0) {
                    onError();
                }
            };
            onParallel.counter = 0;
            onParallel.counter += 1;
            tableList.trim().split('\n\n').forEach(function (table) {
                onParallel.counter += 1;
                local.dbTableCreate({
                    persistenceData: table,
                    name: JSON.parse((/.*/).exec(table)[0])
                }, onParallel);
            });
            onParallel();
        };

        local.dbReset = function (onError) {
        /*
         * this function will reset nedb's persistence
         */
            var onParallel;
            onParallel = function () {
                onParallel.counter -= 1;
                if (onParallel.counter === 0) {
                    onError();
                }
            };
            onParallel.counter = 0;
            onParallel.counter += 1;
            // drop all tables
            Object.keys(local.dbTableDict).forEach(function (key) {
                onParallel.counter += 1;
                local.dbTableDrop({ name: key }, onParallel);
            });
            onParallel.counter += 1;
            local.storeClear(onParallel);
            onParallel();
        };

        local.dbTableCreate = function (options, onError) {
            var self;
            self = local.dbTableDict[options.name];
            if (self) {
                setTimeout(function () {
                    self.load(options, onError);
                });
                return self;
            }
            return new local.Nedb(options, onError);
        };

        local.dbTableDict = {};

        local.dbTableDrop = function (options, onError) {
        /*
         * this function will drop the table with the given options.name
         */
            var self;
            self = local.dbTableDict[options.name];
            if (!self) {
                onError();
                return;
            }
            delete local.dbTableDict[options.name];
            self.persistence = self.prototype = self;
            self.persistCachedDatabase = self.persistNewState = function () {
                var ii;
                // coverage-hack
                for (ii = -1; ii < arguments.length; ii += 1) {
                    if (typeof arguments[ii] === 'function') {
                        arguments[ii]();
                        return;
                    }
                }
            };
            local.storeRemoveItem(self.name, onError);
        };

        local.fsDir = function () {
        /*
         * this function will return the persistence-dir
         */
            if (local.fsDirInitialized) {
                return local.fsDirInitialized;
            }
            local.fsDirInitialized = 'tmp/nedb.persistence.' + local.NODE_ENV;
            // mkdirp fsDirInitialized
            local.child_process.spawnSync('mkdir', ['-p', local.fsDirInitialized], {
                stdio: ['ignore', 1, 2]
            });
            return local.fsDirInitialized;
        };

        local.jsonStringifyOrdered = function (element, replacer, space) {
        /*
         * this function will JSON.stringify the element,
         * with object-keys sorted and circular-references removed
         */
            var circularList, stringify, tmp;
            stringify = function (element) {
            /*
             * this function will recursively JSON.stringify the element,
             * with object-keys sorted and circular-references removed
             */
                // if element is an object, then recurse its items with object-keys sorted
                if (element &&
                        typeof element === 'object' &&
                        typeof element.toJSON !== 'function') {
                    // ignore circular-reference
                    if (circularList.indexOf(element) >= 0) {
                        return;
                    }
                    circularList.push(element);
                    // if element is an array, then recurse its elements
                    if (Array.isArray(element)) {
                        return '[' + element.map(function (element) {
                            tmp = stringify(element);
                            return typeof tmp === 'string'
                                ? tmp
                                : 'null';
                        }).join(',') + ']';
                    }
                    return '{' + Object.keys(element)
                        // sort object-keys
                        .sort()
                        .map(function (key) {
                            tmp = stringify(element[key]);
                            return typeof tmp === 'string'
                                ? JSON.stringify(key) + ':' + tmp
                                : undefined;
                        })
                        .filter(function (element) {
                            return typeof element === 'string';
                        })
                        .join(',') + '}';
                }
                // else JSON.stringify as normal
                return JSON.stringify(element);
            };
            circularList = [];
            return JSON.stringify(element && typeof element === 'object'
                ? JSON.parse(stringify(element))
                : element, replacer, space);
        };

        local.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };

        local.prototype.export = function () {
        /*
         * this function will export the table as serialized-text
         */
            var data, self;
            self = this;
            data = '';
            data += JSON.stringify(String(this.name)) + '\n';
            self.getAllData().forEach(function (doc) {
                data += local.model.serialize(doc) + '\n';
            });
            Object.keys(self.indexes).forEach(function (fieldName) {
                if (fieldName === '_id') {
                    return;
                }
                data += local.model.serialize({ $$indexCreated: {
                    fieldName: fieldName,
                    unique: self.indexes[fieldName].unique,
                    sparse: self.indexes[fieldName].sparse
                } }) + '\n';
            });
            return data.slice(0, -1);
        };

        local.prototype.load = function (options, onError) {
            var data, modeNext, onNext, self;
            self = this;
            modeNext = 0;
            onNext = function (error) {
                modeNext = error
                    ? Infinity
                    : modeNext + 1;
                switch (modeNext) {
                case 1:
                    onError = onError || function (error) {
                        // validate no error occurred
                        local.assert(!error, error);
                    };
                    data = (options.persistenceData || '').trim();
                    if (options.reset) {
                        data = 'undefined';
                    }
                    if (!data) {
                        onNext();
                        return;
                    }
                    self.isLoaded = null;
                    data += '\n';
                    data = data.slice(data.indexOf('\n') + 1);
                    local.storeSetItem(self.name, data, onNext);
                    break;
                case 2:
                    if (self.isLoaded) {
                        onNext();
                        return;
                    }
                    self.isLoaded = true;
                    self.loadDatabase(onNext);
                    break;
                default:
                    onError(error, self);
                }
            };
            onNext(options.error);
            return self;
        };

        local.sortCompare = function (aa, bb) {
        /*
         * this function will sort-compare aa vs bb
         */
            var type1, type2;
            // compare equal
            if (aa === bb) {
                return 0;
            }
            // compare undefined
            if (aa === undefined) {
                return -1;
            }
            if (bb === undefined) {
                return 1;
            }
            // compare null
            if (aa === null) {
                return -1;
            }
            if (bb === null) {
                return 1;
            }
            // compare different-types
            type1 = typeof aa;
            type2 = typeof bb;
            if (type1 !== type2) {
                if (type1 === 'boolean') {
                    return -1;
                }
                if (type2 === 'boolean') {
                    return 1;
                }
                if (type1 === 'number') {
                    return -1;
                }
                if (type2 === 'number') {
                    return 1;
                }
                if (type1 === 'string') {
                    return -1;
                }
                if (type2 === 'string') {
                    return 1;
                }
            }
            // default compare
            return aa < bb
                ? -1
                : aa > bb
                ? 1
                : 0;
        };

        local.storeAction = function (options, onError) {
            var argList, data, done, onError2, request, store;
            if (!local.store) {
                argList = arguments;
                local.storePromiseList.push(function () {
                    local.storeAction.apply(null, argList);
                });
                return;
            }
            onError2 = function () {
                if (done) {
                    return;
                }
                done = true;
                onError(
                    request && (request.error || request.transaction.error),
                    data || request.result
                );
            };
            switch (options.action) {
            case 'clear':
            case 'removeItem':
            case 'setItem':
                store = local.store.transaction('nedbdata', 'readwrite').objectStore('nedbdata');
                break;
            default:
                store = local.store.transaction('nedbdata', 'readonly').objectStore('nedbdata');
            }
            switch (options.action) {
            case 'clear':
                request = store.clear();
                break;
            case 'getItem':
                request = store.get(options.key);
                break;
            case 'keys':
                data = [];
                request = store.openCursor();
                request.onsuccess = function () {
                    if (!request.result) {
                        onError2();
                        return;
                    }
                    data.push(request.result.key);
                    request.result.continue();
                };
                break;
            case 'length':
                request = store.count();
                break;
            case 'removeItem':
                request = store.delete(options.key);
                break;
            case 'setItem':
                request = store.put(options.value, options.key);
                break;
            }
            ['onabort', 'onerror', 'onsuccess'].forEach(function (handler) {
                request[handler] = request[handler] || onError2;
            });
        };

        local.storeClear = function (onError) {
            local.storeAction({ action: 'clear' }, onError);
        };

        local.storeGetItem = function (key, onError) {
            local.assert(typeof key === 'string');
            local.storeAction({ action: 'getItem', key: key }, onError);
        };

        local.storeInit = function () {
            var modeNext, onNext, request;
            if (!local.global.indexedDB) {
                return;
            }
            modeNext = 0;
            onNext = function (error) {
                local.store = local.global.nedbStore;
                // validate no error occurred
                local.assert(local.store || !error, error);
                modeNext += 1;
                switch (modeNext) {
                // init indexedDB
                case 1:
                    if (local.store) {
                        onNext();
                        return;
                    }
                    request = local.global.indexedDB.open('NeDB');
                    request.onerror = function () {
                        onNext(request.error);
                    };
                    request.onsuccess = function () {
                        local.global.nedbStore = request.result;
                        onNext();
                    };
                    request.onupgradeneeded = function () {
                        if (!request.result.objectStoreNames.contains('nedbdata')) {
                            request.result.createObjectStore('nedbdata');
                        }
                    };
                    break;
                // run promised actions
                case 2:
                    while (local.storePromiseList.length) {
                        local.storePromiseList.shift()();
                    }
                    break;
                }
            };
            onNext();
        };

        local.storeKeys = function (onError) {
            local.storeAction({ action: 'keys' }, onError);
        };

        local.storeLength = function (onError) {
            local.storeAction({ action: 'length' }, onError);
        };

        local.storePromiseList = [];

        local.storeRemoveItem = function (key, onError) {
            local.assert(typeof key === 'string');
            local.storeAction({ action: 'removeItem', key: key }, onError);
        };

        local.storeSetItem = function (key, value, onError) {
            local.assert(typeof key === 'string');
            local.assert(typeof value === 'string');
            local.storeAction({ action: 'setItem', key: key, value: value }, onError);
        };

        // legacy
        local.asyncEachSeries = function (arr, iterator, callback) {
            var completed, iterate;
            if (!arr.length) {
                return callback();
            }
            completed = 0;
            iterate = function () {
                iterator(arr[completed], function (error) {
                    if (error) {
                        callback(error);
                        callback = local.nop;
                    } else {
                        completed += 1;
                        if (completed >= arr.length) {
                            callback();
                        } else {
                            iterate();
                        }
                    }
                });
            };
            iterate();
        };
        local.asyncQueue = function (worker) {
            var self;
            function only_once(fn) {
                var called = false;
                return function () {
                    if (called) {
                        throw new Error("Callback was already called.");
                    }
                    called = true;
                    fn.apply(null, arguments);
                };
            }
            self = {
                tasks: [],
                push: function (data, callback) {
                    if (data.constructor !== Array) {
                        data = [data];
                    }
                    data.forEach(function (task) {
                        var item = {
                            data: task,
                            callback: typeof callback === 'function' ? callback : null
                        };
                        self.tasks.push(item);
                    });
                    setTimeout(self.process);
                },
                process: function () {
                    var task;
                    if (!self.isRunningTask && self.tasks.length) {
                        task = self.tasks.shift();
                        self.isRunningTask = true;
                        worker(task.data, only_once(function () {
                            self.isRunningTask = null;
                            if (task.callback) {
                                task.callback.apply(task, arguments);
                            }
                            self.process();
                        }));
                    }
                }
            };
            return self;
        };
        local.inherits = function (ctor, superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
        };
        local.isDate = function (obj) {
            return Object.prototype.toString.call(obj) === '[object Date]';
        };
        local.isRegExp = function (obj) {
            return Object.prototype.toString.call(obj) === '[object RegExp]';
        };
        local.listUnique = function (list) {
        /*
         * this function will remove duplicate elements from the array
         */
            var seen;
            seen = {};
            return list.filter(function (element) {
                if (seen.hasOwnProperty(element)) {
                    return;
                }
                seen[element] = true;
                return true;
            });
        };
    }());
    switch (local.modeJs) {



    // run node js-env code - function
    case 'node':
        local.storeClear = function (onError) {
            local.child_process.spawn('sh', ['-c', 'rm ' + local.fsDir() + '/*'], {
                stdio: ['ignore', 1, 2]
            }).once('exit', onError);
        };

        local.storeGetItem = function (key, onError) {
            local.assert(typeof key === 'string');
            local.fs.readFile(
                local.fsDir() + '/' + encodeURIComponent(key),
                'utf8',
                function (error, data) {
                    // jslint-hack
                    local.nop(error);
                    onError(null, data || '');
                }
            );
        };

        local.storeKeys = function (onError) {
            local.fs.readdir(local.fsDir(), function (error, data) {
                onError(error, data && data.map(decodeURIComponent));
            });
        };

        local.storeLength = function (onError) {
            local.fs.readdir(local.fsDir(), function (error, data) {
                onError(error, data && data.length);
            });
        };

        local.storeRemoveItem = function (key, onError) {
            local.assert(typeof key === 'string');
            local.fs.unlink(local.fsDir() + '/' + encodeURIComponent(key), function (error) {
                // jslint-hack
                local.nop(error);
                onError();
            });
        };

        local.storeSetItem = function (key, value, onError) {
            var tmp;
            local.assert(typeof key === 'string');
            local.assert(typeof value === 'string');
            tmp = local.os.tmpdir() + '/' + Date.now() + Math.random();
            // save to tmp
            local.fs.writeFile(tmp, value, function (error) {
                // jslint-hack
                local.nop(error);
                // rename tmp to key
                local.fs.rename(tmp, local.fsDir() + '/' + encodeURIComponent(key), onError);
            });
        };
        break;
    }



// init lib nedb
/* jslint-ignore-begin */
// https://github.com/louischatriot/nedb/blob/cadf4ef434e517e47c4e9ca1db5b89e892ff5981/browser-version/out/nedb.js
// replace 'return i(r?r:t)' with 'return local[t] = i(r?r:t)'
// replace 'seen = {}' with 'seen = local'
(function (e) {
    if ('function' == typeof bootstrap) bootstrap('nedb', e);
    else if ('object' == typeof exports) module.exports = e();
    else if ('function' == typeof define && define.amd) define(e);
    else if ('undefined' != typeof ses) {
        if (!ses.ok()) return;
        ses.makeNedb = e
    } else 'undefined' != typeof local.global ? local.global.Nedb = e() : global.Nedb = e()
})(function () {
    var define, ses, bootstrap, module, exports;
    return (function (e, t, n) {
        function i(n, s) {
            if (!t[n]) {
                if (!e[n]) {
                    var o = typeof require == 'function' && require;
                    if (!s && o) return o(n, !0);
                    if (r) return r(n, !0);
                    throw new Error("Cannot find module '" + n + "'")
                }
                var u = t[n] = {
                    exports: {}
                };
                e[n][0].call(u.exports, function (t) {
                    var r = e[n][1][t];
                    return local[t] = i(r ? r : t)
                }, u, u.exports)
            }
            return t[n].exports
        }
        var r = typeof require == 'function' && require;
        for (var s = 0; s < n.length; s++) i(n[s]);
        return i
    })({
        5: [function (require, module, exports) {
            /**
             * Manage access to data, be it to find, update or remove it
             */
            var model = require('./model');



            /**
             * Create a new cursor for this collection
             * @param {Datastore} db - The datastore this cursor is bound to
             * @param {Query} query - The query this cursor will operate on
             * @param {Function} execFn - Handler to be executed after cursor has found the results and before the callback passed to find/findOne/update/remove
             */
            function Cursor(db, query, execFn) {
                this.db = db;
                this.query = query || {};
                if (execFn) {
                    this.execFn = execFn;
                }
            }


            /**
             * Set a limit to the number of results
             */
            Cursor.prototype.limit = function (limit) {
                this._limit = limit;
                return this;
            };


            /**
             * Skip a the number of results
             */
            Cursor.prototype.skip = function (skip) {
                this._skip = skip;
                return this;
            };


            /**
             * Sort results of the query
             * @param {SortQuery} sortQuery - SortQuery is { field: order }, field can use the dot-notation, order is 1 for ascending and -1 for descending
             */
            Cursor.prototype.sort = function (sortQuery) {
                this._sort = sortQuery;
                return this;
            };


            /**
             * Add the use of a projection
             * @param {Object} projection - MongoDB-style projection. {} means take all fields. Then it's { key1: 1, key2: 1 } to take only key1 and key2
             *                              { key1: 0, key2: 0 } to omit only key1 and key2. Except _id, you can't mix takes and omits
             */
            Cursor.prototype.projection = function (projection) {
                this._projection = projection;
                return this;
            };


            /**
             * Apply the projection
             */
            Cursor.prototype.project = function (candidates) {
                var res = [],
                    self = this,
                    keepId, action, keys;

                if (self._projection === undefined || Object.keys(self._projection).length === 0) {
                    return candidates;
                }

                keepId = self._projection._id === 0 ? false : true;

                // Check for consistency
                keys = Object.keys(self._projection).filter(function (key) {
                    return key !== '_id';
                });
                keys.forEach(function (k) {
                    if (action !== undefined && self._projection[k] !== action) {
                        throw new Error("Can't both keep and omit fields except for _id");
                    }
                    action = self._projection[k];
                });

                // Do the actual projection
                candidates.forEach(function (candidate) {
                    var toPush;
                    if (action === 1) { // pick-type projection
                        toPush = {
                            $set: {}
                        };
                        keys.forEach(function (k) {
                            toPush.$set[k] = model.getDotValue(candidate, k);
                            if (toPush.$set[k] === undefined) {
                                delete toPush.$set[k];
                            }
                        });
                        toPush = model.modify({}, toPush);
                    } else { // omit-type projection
                        toPush = {
                            $unset: {}
                        };
                        keys.forEach(function (k) {
                            toPush.$unset[k] = true
                        });
                        toPush = model.modify(candidate, toPush);
                    }
                    if (keepId) {
                        toPush._id = candidate._id;
                    } else {
                        delete toPush._id;
                    }
                    res.push(toPush);
                });

                return res;
            };


            /**
             * Get all matching elements
             * Will return pointers to matched elements (shallow copies), returning full copies is the role of find or findOne
             * This is an internal function, use exec which uses the executor
             *
             * @param {Function} callback - Signature: error, results
             */
            Cursor.prototype._exec = function (_callback) {
                var res = [],
                    added = 0,
                    skipped = 0,
                    self = this,
                    error = null,
                    i, keys, key;

                function callback(error, res) {
                    if (self.execFn) {
                        return self.execFn(error, res, _callback);
                    } else {
                        return _callback(error, res);
                    }
                }

                this.db.getCandidates(this.query, function (error, candidates) {
                    if (error) {
                        return callback(error);
                    }

                    try {
                        for (i = 0; i < candidates.length; i += 1) {
                            if (model.match(candidates[i], self.query)) {
                                // If a sort is defined, wait for the results to be sorted before applying limit and skip
                                if (!self._sort) {
                                    if (self._skip && self._skip > skipped) {
                                        skipped += 1;
                                    } else {
                                        res.push(candidates[i]);
                                        added += 1;
                                        if (self._limit && self._limit <= added) {
                                            break;
                                        }
                                    }
                                } else {
                                    res.push(candidates[i]);
                                }
                            }
                        }
                    } catch (error) {
                        return callback(error);
                    }

                    // Apply all sorts
                    if (self._sort) {
                        keys = Object.keys(self._sort);

                        // Sorting
                        var criteria = [];
                        for (i = 0; i < keys.length; i++) {
                            key = keys[i];
                            criteria.push({
                                key: key,
                                direction: self._sort[key]
                            });
                        }
                        res.sort(function (a, b) {
                            var criterion, compare, i;
                            for (i = 0; i < criteria.length; i++) {
                                criterion = criteria[i];
                                compare = criterion.direction * local.sortCompare(model.getDotValue(a, criterion.key), model.getDotValue(b, criterion.key));
                                if (compare !== 0) {
                                    return compare;
                                }
                            }
                            return 0;
                        });

                        // Applying limit and skip
                        var limit = self._limit || res.length,
                            skip = self._skip || 0;

                        res = res.slice(skip, skip + limit);
                    }

                    // Apply projection
                    try {
                        res = self.project(res);
                    } catch (e) {
                        error = e;
                        res = undefined;
                    }

                    return callback(error, res);
                });
            };

            Cursor.prototype.exec = function () {
                this.db.executor.push({
                    this: this,
                    fn: this._exec,
                    arguments: arguments
                });
            };



            // Interface
            module.exports = Cursor;

        }, {
            "./model": 10
        }],
        6: [function (require, module, exports) {
            /**
             * Specific customUtils for the browser, where we don't have access to the Crypto and Buffer modules
             */

            /**
             * Taken from the crypto-browserify module
             * https://github.com/dominictarr/crypto-browserify
             * NOTE: Math.random() does not guarantee "cryptographic quality" but we actually don't need it
             */
            function randomBytes(size) {
                var bytes = new Array(size);
                var r;

                for (var i = 0, r; i < size; i++) {
                    if ((i & 0x03) == 0) r = Math.random() * 0x100000000;
                    bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
                }

                return bytes;
            }


            /**
             * Taken from the base64-js module
             * https://github.com/beatgammit/base64-js/
             */
            function byteArrayToBase64(uint8) {
                var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
                    extraBytes = uint8.length % 3 // if we have 1 byte left, pad 2 bytes
                    ,
                    output = '',
                    temp, length, i;

                function tripletToBase64(num) {
                    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
                };

                // go through the array every three bytes, we'll deal with trailing stuff later
                for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
                    temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
                    output += tripletToBase64(temp);
                }

                // pad the end with zeros, but make sure to not forget the extra bytes
                switch (extraBytes) {
                    case 1:
                        temp = uint8[uint8.length - 1];
                        output += lookup[temp >> 2];
                        output += lookup[(temp << 4) & 0x3F];
                        output += '==';
                        break;
                    case 2:
                        temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
                        output += lookup[temp >> 10];
                        output += lookup[(temp >> 4) & 0x3F];
                        output += lookup[(temp << 2) & 0x3F];
                        output += '=';
                        break;
                }

                return output;
            }


            /**
             * Return a random alphanumerical string of length len
             * There is a very small probability (less than 1/1,000,000) for the length to be less than len
             * (il the base64 conversion yields too many pluses and slashes) but
             * that's not an issue here
             * The probability of a collision is extremely small (need 3*10^12 documents to have one chance in a million of a collision)
             * See http://en.wikipedia.org/wiki/Birthday_problem
             */
            function uid(len) {
                return byteArrayToBase64(randomBytes(Math.ceil(Math.max(8, len * 2)))).replace(/[+\/]/g, '').slice(0, len);
            }



            module.exports.uid = uid;

        }, {}],
        7: [function (require, module, exports) {
            var Datastore,
                customUtils = require('./customUtils'),
                model = require('./model'),
                Executor = local.Executor = require('./executor'),
                Index = local.Index = require('./indexes'),
                Persistence = local.Persistence = require('./persistence'),
                Cursor = require('./cursor');


            Datastore = local;

            /**
             * Load the database from the datafile, and trigger the execution of buffered commands if any
             */
            Datastore.prototype.loadDatabase = function () {
                this.executor.push({
                    this: this.persistence,
                    fn: this.persistence.loadDatabase,
                    arguments: arguments
                }, true);
            };


            /**
             * Get an array of all the data in the database
             */
            Datastore.prototype.getAllData = function () {
                return this.indexes._id.getAll();
            };


            /**
             * Reset all currently defined indexes
             */
            Datastore.prototype.resetIndexes = function (newData) {
                var self = this;

                Object.keys(this.indexes).forEach(function (i) {
                    self.indexes[i].reset(newData);
                });
            };


            Datastore.prototype.ensureIndex = function (options, cb) {
            /**
             * Ensure an index is kept for this field. Same parameters as lib/indexes
             * For now this function is synchronous, we need to test how much time it takes
             * We use an async API for consistency with the rest of the code
             * @param {String} options.fieldName
             * @param {Boolean} options.unique
             * @param {Boolean} options.sparse
             * @param {Number} options.expireAfterSeconds - Optional, if set this index becomes a TTL index (only works on Date fields, not arrays of Date)
             * @param {Function} cb Optional callback, signature: error
             */
                var error, callback = cb;
                if (!options.fieldName) {
                    error = new Error("Cannot create an index without a fieldName");
                    error.missingFieldName = true;
                    return callback(error);
                }
                if (this.indexes[options.fieldName]) {
                    return callback();
                }

                this.indexes[options.fieldName] = new Index(options);
                if (options.expireAfterSeconds !== undefined) {
                    this.ttlIndexes[options.fieldName] = options.expireAfterSeconds;
                } // With this implementation index creation is not necessary to ensure TTL but we stick with MongoDB's API here

                try {
                    this.indexes[options.fieldName].insert(this.getAllData());
                } catch (e) {
                    delete this.indexes[options.fieldName];
                    return callback(e);
                }

                // We may want to force all options to be persisted including defaults, not just the ones passed the index creation function
                this.persistence.persistNewState([{
                    $$indexCreated: options
                }], function (error) {
                    if (error) {
                        return callback(error);
                    }
                    return callback();
                });
            };


            /**
             * Remove an index
             * @param {String} fieldName
             * @param {Function} cb Optional callback, signature: error
             */
            Datastore.prototype.removeIndex = function (fieldName, cb) {
                var callback = cb;

                delete this.indexes[fieldName];

                this.persistence.persistNewState([{
                    $$indexRemoved: fieldName
                }], function (error) {
                    if (error) {
                        return callback(error);
                    }
                    return callback();
                });
            };


            /**
             * Add one or several document(s) to all indexes
             */
            Datastore.prototype.addToIndexes = function (doc) {
                var i, failingIndex, error, keys = Object.keys(this.indexes);

                for (i = 0; i < keys.length; i += 1) {
                    try {
                        this.indexes[keys[i]].insert(doc);
                    } catch (e) {
                        failingIndex = i;
                        error = e;
                        break;
                    }
                }

                // If an error happened, we need to rollback the insert on all other indexes
                if (error) {
                    for (i = 0; i < failingIndex; i += 1) {
                        this.indexes[keys[i]].remove(doc);
                    }

                    throw error;
                }
            };


            /**
             * Remove one or several document(s) from all indexes
             */
            Datastore.prototype.removeFromIndexes = function (doc) {
                var self = this;

                Object.keys(this.indexes).forEach(function (i) {
                    self.indexes[i].remove(doc);
                });
            };


            /**
             * Update one or several documents in all indexes
             * To update multiple documents, oldDoc must be an array of { oldDoc, newDoc } pairs
             * If one update violates a constraint, all changes are rolled back
             */
            Datastore.prototype.updateIndexes = function (oldDoc, newDoc) {
                var i, failingIndex, error, keys = Object.keys(this.indexes);

                for (i = 0; i < keys.length; i += 1) {
                    try {
                        this.indexes[keys[i]].update(oldDoc, newDoc);
                    } catch (e) {
                        failingIndex = i;
                        error = e;
                        break;
                    }
                }

                // If an error happened, we need to rollback the update on all other indexes
                if (error) {
                    for (i = 0; i < failingIndex; i += 1) {
                        this.indexes[keys[i]].revertUpdate(oldDoc, newDoc);
                    }

                    throw error;
                }
            };


            Datastore.prototype.getCandidates = function (query, dontExpireStaleDocs, callback) {
            /**
             * Return the list of candidates for a given query
             * Crude implementation for now, we return the candidates given by the first usable index if any
             * We try the following query types, in this order: basic match, $in match, comparison match
             * One way to make it better would be to enable the use of multiple indexes if the first usable index
             * returns too much data. I may do it in the future.
             *
             * Returned candidates will be scanned to find and remove all expired documents
             *
             * @param {Query} query
             * @param {Boolean} dontExpireStaleDocs Optional, defaults to false, if true don't remove stale docs. Useful for the remove function which shouldn't be impacted by expirations
             * @param {Function} callback Signature error, candidates
             */
                var self = this,
                    usableQueryKeys;

                if (typeof dontExpireStaleDocs === 'function') {
                    callback = dontExpireStaleDocs;
                    dontExpireStaleDocs = false;
                }


                var modeNext, onNext;
                modeNext = 0;
                onNext = function (error, docs) {
                    modeNext = error
                        ? Infinity
                        : modeNext + 1;
                    switch (modeNext) {
                    // STEP 1: get candidates list by checking indexes from most to least frequent usecase
                    case 1:
                        // For a basic match
                        usableQueryKeys = [];
                        Object.keys(query).forEach(function (k) {
                            if (typeof query[k] === 'string' || typeof query[k] === 'number' || typeof query[k] === 'boolean' || local.isDate(query[k]) || query[k] === null) {
                                usableQueryKeys.push(k);
                            }
                        });
                        usableQueryKeys = usableQueryKeys.filter(function (element) {
                            return self.indexes.hasOwnProperty(element);
                        });
                        if (usableQueryKeys.length > 0) {
                            return onNext(null, self.indexes[usableQueryKeys[0]].getMatching(query[usableQueryKeys[0]]));
                        }

                        // For a $in match
                        usableQueryKeys = [];
                        Object.keys(query).forEach(function (k) {
                            if (query[k] && query[k].hasOwnProperty('$in')) {
                                usableQueryKeys.push(k);
                            }
                        });
                        usableQueryKeys = usableQueryKeys.filter(function (element) {
                            return self.indexes.hasOwnProperty(element);
                        });
                        if (usableQueryKeys.length > 0) {
                            return onNext(null, self.indexes[usableQueryKeys[0]].getMatching(query[usableQueryKeys[0]].$in));
                        }

                        // For a comparison match
                        usableQueryKeys = [];
                        Object.keys(query).forEach(function (k) {
                            if (query[k] && (query[k].hasOwnProperty('$lt') || query[k].hasOwnProperty('$lte') || query[k].hasOwnProperty('$gt') || query[k].hasOwnProperty('$gte'))) {
                                usableQueryKeys.push(k);
                            }
                        });
                        usableQueryKeys = usableQueryKeys.filter(function (element) {
                            return self.indexes.hasOwnProperty(element);
                        });
                        if (usableQueryKeys.length > 0) {
                            return onNext(null, self.indexes[usableQueryKeys[0]].getBetweenBounds(query[usableQueryKeys[0]]));
                        }

                        // By default, return all the DB data
                        return onNext(null, self.getAllData());
                    // STEP 2: remove all expired documents
                    default:
                        if (dontExpireStaleDocs) {
                            return callback(null, docs);
                        }

                        var expiredDocsIds = [],
                            validDocs = [],
                            ttlIndexesFieldNames = Object.keys(self.ttlIndexes);

                        docs.forEach(function (doc) {
                            var valid = true;
                            ttlIndexesFieldNames.forEach(function (i) {
                                if (doc[i] !== undefined && local.isDate(doc[i]) && Date.now() > doc[i].getTime() + self.ttlIndexes[i] * 1000) {
                                    valid = false;
                                }
                            });
                            if (valid) {
                                validDocs.push(doc);
                            } else {
                                expiredDocsIds.push(doc._id);
                            }
                        });

                        local.asyncEachSeries(expiredDocsIds, function (_id, cb) {
                            self._remove({
                                _id: _id
                            }, {}, function (error) {
                                if (error) {
                                    return callback(error);
                                }
                                return cb();
                            });
                        }, function (error) {
                            return callback(null, validDocs);
                        });
                    }
                };
                onNext();
            };


            /**
             * Insert a new document
             * @param {Function} cb Optional callback, signature: error, insertedDoc
             *
             * @api private Use Datastore.insert which has the same signature
             */
            Datastore.prototype._insert = function (newDoc, cb) {
                var callback = cb,
                    preparedDoc;

                try {
                    preparedDoc = this.prepareDocumentForInsertion(newDoc)
                    this._insertInCache(preparedDoc);
                } catch (e) {
                    return callback(e);
                }

                this.persistence.persistNewState(Array.isArray(preparedDoc) ? preparedDoc : [preparedDoc], function (error) {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, model.deepCopy(preparedDoc));
                });
            };

            /**
             * Create a new _id that's not already in use
             */
            Datastore.prototype.createNewId = function () {
                var tentativeId = customUtils.uid(16);
                // Try as many times as needed to get an unused _id. As explained in customUtils, the probability of this ever happening is extremely small, so this is O(1)
                if (this.indexes._id.getMatching(tentativeId).length > 0) {
                    tentativeId = this.createNewId();
                }
                return tentativeId;
            };

            /**
             * Prepare a document (or array of documents) to be inserted in a database
             * Meaning adds _id and timestamps if necessary on a copy of newDoc to avoid any side effect on user input
             * @api private
             */
            Datastore.prototype.prepareDocumentForInsertion = function (newDoc) {
                var preparedDoc, self = this;

                if (Array.isArray(newDoc)) {
                    preparedDoc = [];
                    newDoc.forEach(function (doc) {
                        preparedDoc.push(self.prepareDocumentForInsertion(doc));
                    });
                } else {
                    preparedDoc = model.deepCopy(newDoc);
                    if (preparedDoc._id === undefined) {
                        preparedDoc._id = this.createNewId();
                    }
                    var now = new Date().toISOString();
                    if (preparedDoc.createdAt === undefined) {
                        preparedDoc.createdAt = now;
                    }
                    if (preparedDoc.updatedAt === undefined) {
                        preparedDoc.updatedAt = now;
                    }
                    model.checkObject(preparedDoc);
                }

                return preparedDoc;
            };

            /**
             * If newDoc is an array of documents, this will insert all documents in the cache
             * @api private
             */
            Datastore.prototype._insertInCache = function (preparedDoc) {
                if (Array.isArray(preparedDoc)) {
                    this._insertMultipleDocsInCache(preparedDoc);
                } else {
                    this.addToIndexes(preparedDoc);
                }
            };

            /**
             * If one insertion fails (e.g. because of a unique constraint), roll back all previous
             * inserts and throws the error
             * @api private
             */
            Datastore.prototype._insertMultipleDocsInCache = function (preparedDocs) {
                var i, failingI, error;

                for (i = 0; i < preparedDocs.length; i += 1) {
                    try {
                        this.addToIndexes(preparedDocs[i]);
                    } catch (e) {
                        error = e;
                        failingI = i;
                        break;
                    }
                }

                if (error) {
                    for (i = 0; i < failingI; i += 1) {
                        this.removeFromIndexes(preparedDocs[i]);
                    }

                    throw error;
                }
            };

            Datastore.prototype.insert = function () {
                this.executor.push({
                    this: this,
                    fn: this._insert,
                    arguments: arguments
                });
            };


            /**
             * Count all documents matching the query
             * @param {Object} query MongoDB-style query
             */
            Datastore.prototype.count = function (query, callback) {
                var cursor = new Cursor(this, query, function (error, docs, callback) {
                    if (error) {
                        return callback(error);
                    }
                    return callback(null, docs.length);
                });

                if (typeof callback === 'function') {
                    cursor.exec(callback);
                } else {
                    return cursor;
                }
            };


            /**
             * Find all documents matching the query
             * If no callback is passed, we return the cursor so that user can limit, skip and finally exec
             * @param {Object} query MongoDB-style query
             * @param {Object} projection MongoDB-style projection
             */
            Datastore.prototype.find = function (query, projection, callback) {
                switch (arguments.length) {
                    case 1:
                        projection = {};
                        // callback is undefined, will return a cursor
                        break;
                    case 2:
                        if (typeof projection === 'function') {
                            callback = projection;
                            projection = {};
                        } // If not assume projection is an object and callback undefined
                        break;
                }

                var cursor = new Cursor(this, query, function (error, docs, callback) {
                    var res = [],
                        i;

                    if (error) {
                        return callback(error);
                    }

                    for (i = 0; i < docs.length; i += 1) {
                        res.push(model.deepCopy(docs[i]));
                    }
                    return callback(null, res);
                });

                cursor.projection(projection);
                if (typeof callback === 'function') {
                    cursor.exec(callback);
                } else {
                    return cursor;
                }
            };


            /**
             * Find one document matching the query
             * @param {Object} query MongoDB-style query
             * @param {Object} projection MongoDB-style projection
             */
            Datastore.prototype.findOne = function (query, projection, callback) {
                switch (arguments.length) {
                    case 1:
                        projection = {};
                        // callback is undefined, will return a cursor
                        break;
                    case 2:
                        if (typeof projection === 'function') {
                            callback = projection;
                            projection = {};
                        } // If not assume projection is an object and callback undefined
                        break;
                }

                var cursor = new Cursor(this, query, function (error, docs, callback) {
                    if (error) {
                        return callback(error);
                    }
                    if (docs.length === 1) {
                        return callback(null, model.deepCopy(docs[0]));
                    } else {
                        return callback(null, null);
                    }
                });

                cursor.projection(projection).limit(1);
                if (typeof callback === 'function') {
                    cursor.exec(callback);
                } else {
                    return cursor;
                }
            };


            /**
             * Update all docs matching query
             * @param {Object} query
             * @param {Object} updateQuery
             * @param {Object} options Optional options
             *                 options.multi If true, can update multiple documents (defaults to false)
             *                 options.upsert If true, document is inserted if the query doesn't match anything
             *                 options.returnUpdatedDocs Defaults to false, if true return as third argument the array of updated matched documents (even if no change actually took place)
             * @param {Function} cb Optional callback, signature: (error, numAffected, affectedDocuments, upsert)
             *                      If update was an upsert, upsert flag is set to true
             *                      affectedDocuments can be one of the following:
             *                        * For an upsert, the upserted document
             *                        * For an update with returnUpdatedDocs option false, null
             *                        * For an update with returnUpdatedDocs true and multi false, the updated document
             *                        * For an update with returnUpdatedDocs true and multi true, the array of updated documents
             *
             * WARNING: The API was changed between v1.7.4 and v1.8, for consistency and readability reasons. Prior and including to v1.7.4,
             *          the callback signature was (error, numAffected, updated) where updated was the updated document in case of an upsert
             *          or the array of updated documents for an update if the returnUpdatedDocs option was true. That meant that the type of
             *          affectedDocuments in a non multi update depended on whether there was an upsert or not, leaving only two ways for the
             *          user to check whether an upsert had occured: checking the type of affectedDocuments or running another find query on
             *          the whole dataset to check its size. Both options being ugly, the breaking change was necessary.
             *
             * @api private Use Datastore.update which has the same signature
             */
            Datastore.prototype._update = function (query, updateQuery, options, cb) {
                var callback, self = this,
                    numReplaced = 0,
                    multi, upsert, i;

                if (typeof options === 'function') {
                    cb = options;
                    options = {};
                }
                callback = cb;
                multi = options.multi !== undefined ? options.multi : false;
                upsert = options.upsert !== undefined ? options.upsert : false;

                var modeNext, onNext;
                modeNext = 0;
                onNext = function (error) {
                    modeNext = error
                        ? Infinity
                        : modeNext + 1;
                    switch (modeNext) {
                    case 1:
                        // If upsert option is set, check whether we need to insert the doc
                        if (!upsert) {
                            return onNext();
                        }

                        // Need to use an internal function not tied to the executor to avoid deadlock
                        var cursor = new Cursor(self, query);
                        cursor.limit(1)._exec(function (error, docs) {
                            if (error) {
                                return callback(error);
                            }
                            if (docs.length === 1) {
                                return onNext();
                            } else {
                                var toBeInserted;

                                try {
                                    model.checkObject(updateQuery);
                                    // updateQuery is a simple object with no modifier, use it as the document to insert
                                    toBeInserted = updateQuery;
                                } catch (e) {
                                    // updateQuery contains modifiers, use the find query as the base,
                                    // strip it from all operators and update it according to updateQuery
                                    try {
                                        toBeInserted = model.modify(model.deepCopy(query, true), updateQuery);
                                    } catch (error) {
                                        return callback(error);
                                    }
                                }

                                return self._insert(toBeInserted, function (error, newDoc) {
                                    if (error) {
                                        return callback(error);
                                    }
                                    return callback(null, 1, newDoc, true);
                                });
                            }
                        });
                        break;
                    default:
                        // Perform the update
                        var modifiedDoc, modifications = [],
                            createdAt;

                        self.getCandidates(query, function (error, candidates) {
                            if (error) {
                                return callback(error);
                            }

                            // Preparing update (if an error is thrown here neither the datafile nor
                            // the in-memory indexes are affected)
                            try {
                                for (i = 0; i < candidates.length; i += 1) {
                                    if (model.match(candidates[i], query) && (multi || numReplaced === 0)) {
                                        numReplaced += 1;
                                        createdAt = candidates[i].createdAt;
                                        modifiedDoc = model.modify(candidates[i], updateQuery);
                                        modifiedDoc.createdAt = createdAt;
                                        modifiedDoc.updatedAt = new Date().toISOString();
                                        modifications.push({
                                            oldDoc: candidates[i],
                                            newDoc: modifiedDoc
                                        });
                                    }
                                }
                            } catch (error) {
                                return callback(error);
                            }

                            // Change the docs in memory
                            try {
                                self.updateIndexes(modifications);
                            } catch (error) {
                                return callback(error);
                            }

                            // Update the datafile
                            var updatedDocs = modifications.map(function (element) {
                                return element.newDoc;
                            });
                            self.persistence.persistNewState(updatedDocs, function (error) {
                                if (error) {
                                    return callback(error);
                                }
                                if (!options.returnUpdatedDocs) {
                                    return callback(null, numReplaced);
                                } else {
                                    var updatedDocsDC = [];
                                    updatedDocs.forEach(function (doc) {
                                        updatedDocsDC.push(model.deepCopy(doc));
                                    });
                                    if (!multi) {
                                        updatedDocsDC = updatedDocsDC[0];
                                    }
                                    return callback(null, numReplaced, updatedDocsDC);
                                }
                            });
                        });
                    }
                };
                onNext();
            };

            Datastore.prototype.update = function () {
                this.executor.push({
                    this: this,
                    fn: this._update,
                    arguments: arguments
                });
            };


            /**
             * Remove all docs matching the query
             * For now very naive implementation (similar to update)
             * @param {Object} query
             * @param {Object} options Optional options
             *                 options.multi If true, can update multiple documents (defaults to false)
             * @param {Function} cb Optional callback, signature: error, numRemoved
             *
             * @api private Use Datastore.remove which has the same signature
             */
            Datastore.prototype._remove = function (query, options, cb) {
                var callback, self = this,
                    numRemoved = 0,
                    removedDocs = [],
                    multi;

                if (typeof options === 'function') {
                    cb = options;
                    options = {};
                }
                callback = cb;
                multi = options.multi !== undefined ? options.multi : false;

                this.getCandidates(query, true, function (error, candidates) {
                    if (error) {
                        return callback(error);
                    }

                    try {
                        candidates.forEach(function (d) {
                            if (model.match(d, query) && (multi || numRemoved === 0)) {
                                numRemoved += 1;
                                removedDocs.push({
                                    $$deleted: true,
                                    _id: d._id
                                });
                                self.removeFromIndexes(d);
                            }
                        });
                    } catch (error) {
                        return callback(error);
                    }

                    self.persistence.persistNewState(removedDocs, function (error) {
                        if (error) {
                            return callback(error);
                        }
                        return callback(null, numRemoved);
                    });
                });
            };

            Datastore.prototype.remove = function () {
                this.executor.push({
                    this: this,
                    fn: this._remove,
                    arguments: arguments
                });
            };



            module.exports = Datastore;

        }, {
            "./cursor": 5,
            "./customUtils": 6,
            "./executor": 8,
            "./indexes": 9,
            "./model": 10,
            "./persistence": 11
        }],
        8: [function (require, module, exports) {
            /**
             * Responsible for sequentially executing actions on the database
             */

            function Executor() {
                this.buffer = [];
                this.ready = false;

                // This queue will execute all commands, one-by-one in order
                this.queue = local.asyncQueue(function (task, cb) {
                    var newArguments = [];

                    // task.arguments is an array-like object on which adding a new field doesn't work, so we transform it into a real array
                    for (var i = 0; i < task.arguments.length; i += 1) {
                        newArguments.push(task.arguments[i]);
                    }
                    var lastArg = task.arguments[task.arguments.length - 1];

                    // Always tell the queue task is complete. Execute callback if any was given.
                    if (typeof lastArg === 'function') {
                        // Callback was supplied
                        newArguments[newArguments.length - 1] = function () {
                            if (typeof setImmediate === 'function') {
                                setImmediate(cb);
                            } else {
                                setTimeout(cb);
                            }
                            lastArg.apply(null, arguments);
                        };
                    } else if (!lastArg && task.arguments.length !== 0) {
                        // false/undefined/null supplied as callbback
                        newArguments[newArguments.length - 1] = function () {
                            cb();
                        };
                    } else {
                        // Nothing supplied as callback
                        newArguments.push(function () {
                            cb();
                        });
                    }


                    task.fn.apply(task.this, newArguments);
                });
            }


            /**
             * If executor is ready, queue task (and process it immediately if executor was idle)
             * If not, buffer task for later processing
             * @param {Object} task
             *                 task.this - Object to use as this
             *                 task.fn - Function to execute
             *                 task.arguments - Array of arguments, IMPORTANT: only the last argument may be a function (the callback)
             *                                                                 and the last argument cannot be false/undefined/null
             * @param {Boolean} forceQueuing Optional (defaults to false) force executor to queue task even if it is not ready
             */
            Executor.prototype.push = function (task, forceQueuing) {
                if (this.ready || forceQueuing) {
                    this.queue.push(task);
                } else {
                    this.buffer.push(task);
                }
            };



            // Interface
            module.exports = Executor;

        }, {}],
        9: [function (require, module, exports) {
            var BinarySearchTree = require('./lib/avltree'),
                model = require('./model');

            /**
             * Type-aware projection
             */
            function projectForUnique(elt) {
                if (elt === null) {
                    return '$null';
                }
                if (typeof elt === 'string') {
                    return '$string' + elt;
                }
                if (typeof elt === 'boolean') {
                    return '$boolean' + elt;
                }
                if (typeof elt === 'number') {
                    return '$number' + elt;
                }
                if (Array.isArray(elt)) {
                    return '$date' + elt.getTime();
                }

                return elt; // Arrays and objects, will check for pointer equality
            }


            /**
             * Create a new index
             * All methods on an index guarantee that either the whole operation was successful and the index changed
             * or the operation was unsuccessful and an error is thrown while the index is unchanged
             * @param {String} options.fieldName On which field should the index apply (can use dot notation to index on sub fields)
             * @param {Boolean} options.unique Optional, enforce a unique constraint (default: false)
             * @param {Boolean} options.sparse Optional, allow a sparse index (we can have documents for which fieldName is undefined) (default: false)
             */
            function Index(options) {
                this.fieldName = options.fieldName;
                this.unique = options.unique || false;
                this.sparse = options.sparse || false;

                this.treeOptions = { unique: this.unique };

                this.reset(); // No data in the beginning
            }


            /**
             * Reset an index
             * @param {Document or Array of documents} newData Optional, data to initialize the index with
             *                                                 If an error is thrown during insertion, the index is not modified
             */
            Index.prototype.reset = function (newData) {
                this.tree = new BinarySearchTree(this.treeOptions);

                if (newData) {
                    this.insert(newData);
                }
            };


            /**
             * Insert a new document in the index
             * If an array is passed, we insert all its elements (if one insertion fails the index is not modified)
             * O(log(n))
             */
            Index.prototype.insert = function (doc) {
                var key, self = this,
                    keys, i, failingI, error;

                if (Array.isArray(doc)) {
                    this.insertMultipleDocs(doc);
                    return;
                }

                key = model.getDotValue(doc, this.fieldName);

                // We don't index documents that don't contain the field if the index is sparse
                if (key === undefined && this.sparse) {
                    return;
                }

                if (!Array.isArray(key)) {
                    this.tree.insert(key, doc);
                } else {
                    // If an insert fails due to a unique constraint, roll back all inserts before it
                    keys = local.listUnique(key).map(projectForUnique);

                    for (i = 0; i < keys.length; i += 1) {
                        try {
                            this.tree.insert(keys[i], doc);
                        } catch (e) {
                            error = e;
                            failingI = i;
                            break;
                        }
                    }

                    if (error) {
                        for (i = 0; i < failingI; i += 1) {
                            this.tree.delete(keys[i], doc);
                        }

                        throw error;
                    }
                }
            };


            /**
             * Insert an array of documents in the index
             * If a constraint is violated, the changes should be rolled back and an error thrown
             *
             * @API private
             */
            Index.prototype.insertMultipleDocs = function (docs) {
                var i, error, failingI;

                for (i = 0; i < docs.length; i += 1) {
                    try {
                        this.insert(docs[i]);
                    } catch (e) {
                        error = e;
                        failingI = i;
                        break;
                    }
                }

                if (error) {
                    for (i = 0; i < failingI; i += 1) {
                        this.remove(docs[i]);
                    }

                    throw error;
                }
            };


            /**
             * Remove a document from the index
             * If an array is passed, we remove all its elements
             * The remove operation is safe with regards to the 'unique' constraint
             * O(log(n))
             */
            Index.prototype.remove = function (doc) {
                var key, self = this;

                if (Array.isArray(doc)) {
                    doc.forEach(function (d) {
                        self.remove(d);
                    });
                    return;
                }

                key = model.getDotValue(doc, this.fieldName);

                if (key === undefined && this.sparse) {
                    return;
                }

                if (!Array.isArray(key)) {
                    this.tree.delete(key, doc);
                } else {
                    local.listUnique(key).map(projectForUnique).forEach(function (_key) {
                        self.tree.delete(_key, doc);
                    });
                }
            };


            /**
             * Update a document in the index
             * If a constraint is violated, changes are rolled back and an error thrown
             * Naive implementation, still in O(log(n))
             */
            Index.prototype.update = function (oldDoc, newDoc) {
                if (Array.isArray(oldDoc)) {
                    this.updateMultipleDocs(oldDoc);
                    return;
                }

                this.remove(oldDoc);

                try {
                    this.insert(newDoc);
                } catch (e) {
                    this.insert(oldDoc);
                    throw e;
                }
            };


            /**
             * Update multiple documents in the index
             * If a constraint is violated, the changes need to be rolled back
             * and an error thrown
             * @param {Array of oldDoc, newDoc pairs} pairs
             *
             * @API private
             */
            Index.prototype.updateMultipleDocs = function (pairs) {
                var i, failingI, error;

                for (i = 0; i < pairs.length; i += 1) {
                    this.remove(pairs[i].oldDoc);
                }

                for (i = 0; i < pairs.length; i += 1) {
                    try {
                        this.insert(pairs[i].newDoc);
                    } catch (e) {
                        error = e;
                        failingI = i;
                        break;
                    }
                }

                // If an error was raised, roll back changes in the inverse order
                if (error) {
                    for (i = 0; i < failingI; i += 1) {
                        this.remove(pairs[i].newDoc);
                    }

                    for (i = 0; i < pairs.length; i += 1) {
                        this.insert(pairs[i].oldDoc);
                    }

                    throw error;
                }
            };


            /**
             * Revert an update
             */
            Index.prototype.revertUpdate = function (oldDoc, newDoc) {
                var revert = [];

                if (!Array.isArray(oldDoc)) {
                    this.update(newDoc, oldDoc);
                } else {
                    oldDoc.forEach(function (pair) {
                        revert.push({
                            oldDoc: pair.newDoc,
                            newDoc: pair.oldDoc
                        });
                    });
                    this.update(revert);
                }
            };


            /**
             * Get all documents in index whose key match value (if it is a Thing) or one of the elements of value (if it is an array of Things)
             * @param {Thing} value Value to match the key against
             * @return {Array of documents}
             */
            Index.prototype.getMatching = function (value) {
                var self = this;

                if (!Array.isArray(value)) {
                    return self.tree.search(value);
                } else {
                    var _res = {},
                        res = [];

                    value.forEach(function (v) {
                        self.getMatching(v).forEach(function (doc) {
                            _res[doc._id] = doc;
                        });
                    });

                    Object.keys(_res).forEach(function (_id) {
                        res.push(_res[_id]);
                    });

                    return res;
                }
            };


            /**
             * Get all documents in index whose key is between bounds are they are defined by query
             * Documents are sorted by key
             * @param {Query} query
             * @return {Array of documents}
             */
            Index.prototype.getBetweenBounds = function (query) {
                return this.tree.betweenBounds(query);
            };


            /**
             * Get all elements in the index
             * @return {Array of documents}
             */
            Index.prototype.getAll = function () {
                var res = [];

                this.tree.executeOnEveryNode(function (node) {
                    var i;

                    for (i = 0; i < node.data.length; i += 1) {
                        res.push(node.data[i]);
                    }
                });

                return res;
            };




            // Interface
            module.exports = Index;

        }, {
            "./model": 10,
            "./lib/avltree": 15
        }],
        10: [function(require, module, exports) {
            /**
             * Handle models (i.e. docs)
             * Serialization/deserialization
             * Copying
             * Querying, update
             */

            var modifierFunctions = {},
                lastStepModifierFunctions = {},
                comparisonFunctions = {},
                logicalOperators = {},
                arrayComparisonFunctions = {};


            /**
             * Check a key, throw an error if the key is non valid
             * @param {String} k key
             * @param {Model} v value, needed to treat the Date edge case
             * Non-treatable edge cases here: if part of the object if of the form { $$date: number } or { $$deleted: true }
             * Its serialized-then-deserialized version it will transformed into a Date object
             * But you really need to want it to trigger such behaviour, even when warned not to use '$' at the beginning of the field names...
             */
            function checkKey(k, v) {
                if (typeof k === 'number') {
                    k = k.toString();
                }

                if (k[0] === '$' && !(k === '$$date' && typeof v === 'number') && !(k === '$$deleted' && v === true) && !(k === '$$indexCreated') && !(k === '$$indexRemoved')) {
                    throw new Error('Field names cannot begin with the $ character');
                }

                if (k.indexOf('.') !== -1) {
                    throw new Error('Field names cannot contain a .');
                }
            }


            /**
             * Check a DB object and throw an error if it's not valid
             * Works by applying the above checkKey function to all fields recursively
             */
            function checkObject(obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(function(o) {
                        checkObject(o);
                    });
                }

                if (typeof obj === 'object' && obj !== null) {
                    Object.keys(obj).forEach(function(k) {
                        checkKey(k, obj[k]);
                        checkObject(obj[k]);
                    });
                }
            }


            /**
             * Serialize an object to be persisted to a one-line string
             * For serialization/deserialization, we use the native JSON parser and not eval or Function
             * That gives us less freedom but data entered in the database may come from users
             * so eval and the like are not safe
             * Accepted primitive types: Number, String, Boolean, Date, null
             * Accepted secondary types: Objects, Arrays
             */
            function serialize(obj) {
                var res;

                res = JSON.stringify(obj, function(k, v) {
                    checkKey(k, v);

                    if (v === undefined) {
                        return undefined;
                    }
                    if (v === null) {
                        return null;
                    }

                    // Hackish way of checking if object is Date (this way it works between execution contexts in node-webkit).
                    // We can't use value directly because for dates it is already string in this function (date.toJSON was already called), so we use this
                    if (typeof this[k].getTime === 'function') {
                        return {
                            $$date: this[k].getTime()
                        };
                    }

                    return v;
                });

                return res;
            }


            /**
             * From a one-line representation of an object generate by the serialize function
             * Return the object itself
             */
            function deserialize(rawData) {
                return JSON.parse(rawData, function(k, v) {
                    if (k === '$$date') {
                        return new Date(v).toISOString();
                    }
                    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null) {
                        return v;
                    }
                    if (v && v.$$date) {
                        return v.$$date;
                    }

                    return v;
                });
            }


            /**
             * Deep copy a DB object
             * The optional strictKeys flag (defaulting to false) indicates whether to copy everything or only fields
             * where the keys are valid, i.e. don't begin with $ and don't contain a .
             */
            function deepCopy(obj, strictKeys) {
                var res;

                if (typeof obj === 'boolean' ||
                    typeof obj === 'number' ||
                    typeof obj === 'string' ||
                    obj === null ||
                    (local.isDate(obj))) {
                    return obj;
                }

                if (Array.isArray(obj)) {
                    res = [];
                    obj.forEach(function(o) {
                        res.push(deepCopy(o, strictKeys));
                    });
                    return res;
                }

                if (typeof obj === 'object') {
                    res = {};
                    Object.keys(obj).forEach(function(k) {
                        if (!strictKeys || (k[0] !== '$' && k.indexOf('.') === -1)) {
                            res[k] = deepCopy(obj[k], strictKeys);
                        }
                    });
                    return res;
                }

                return undefined; // For now everything else is undefined. We should probably throw an error instead
            }


            /**
             * Tells if an object is a primitive type or a 'real' object
             * Arrays are considered primitive
             */
            function isPrimitiveType(obj) {
                return (typeof obj === 'boolean' ||
                    typeof obj === 'number' ||
                    typeof obj === 'string' ||
                    obj === null ||
                    local.isDate(obj) ||
                    Array.isArray(obj));
            }



            // ==============================================================
            // Updating documents
            // ==============================================================

            /**
             * The signature of modifier functions is as follows
             * Their structure is always the same: recursively follow the dot notation while creating
             * the nested documents if needed, then apply the "last step modifier"
             * @param {Object} obj The model to modify
             * @param {String} field Can contain dots, in that case that means we will set a subfield recursively
             * @param {Model} value
             */

            /**
             * Set a field to a new value
             */
            lastStepModifierFunctions.$set = function(obj, field, value) {
                obj[field] = value;
            };


            /**
             * Unset a field
             */
            lastStepModifierFunctions.$unset = function(obj, field, value) {
                delete obj[field];
            };


            /**
             * Push an element to the end of an array field
             * Optional modifier $each instead of value to push several values
             * Optional modifier $slice to slice the resulting array, see https://docs.mongodb.org/manual/reference/operator/update/slice/
             * Différeence with MongoDB: if $slice is specified and not $each, we act as if value is an empty array
             */
            lastStepModifierFunctions.$push = function(obj, field, value) {
                // Create the array if it doesn't exist
                if (!obj.hasOwnProperty(field)) {
                    obj[field] = [];
                }

                if (!Array.isArray(obj[field])) {
                    throw new Error("Can't $push an element on non-array values");
                }

                if (value !== null && typeof value === 'object' && value.$slice && value.$each === undefined) {
                    value.$each = [];
                }

                if (value !== null && typeof value === 'object' && value.$each) {
                    if (Object.keys(value).length >= 3 || (Object.keys(value).length === 2 && value.$slice === undefined)) {
                        throw new Error("Can only use $slice in cunjunction with $each when $push to array");
                    }
                    if (!Array.isArray(value.$each)) {
                        throw new Error("$each requires an array value");
                    }

                    value.$each.forEach(function(v) {
                        obj[field].push(v);
                    });

                    if (value.$slice === undefined || typeof value.$slice !== 'number') {
                        return;
                    }

                    if (value.$slice === 0) {
                        obj[field] = [];
                    } else {
                        var start, end, n = obj[field].length;
                        if (value.$slice < 0) {
                            start = Math.max(0, n + value.$slice);
                            end = n;
                        } else if (value.$slice > 0) {
                            start = 0;
                            end = Math.min(n, value.$slice);
                        }
                        obj[field] = obj[field].slice(start, end);
                    }
                } else {
                    obj[field].push(value);
                }
            };


            /**
             * Add an element to an array field only if it is not already in it
             * No modification if the element is already in the array
             * Note that it doesn't check whether the original array contains duplicates
             */
            lastStepModifierFunctions.$addToSet = function(obj, field, value) {
                var addToSet = true;

                // Create the array if it doesn't exist
                if (!obj.hasOwnProperty(field)) {
                    obj[field] = [];
                }

                if (!Array.isArray(obj[field])) {
                    throw new Error("Can't $addToSet an element on non-array values");
                }

                if (value !== null && typeof value === 'object' && value.$each) {
                    if (Object.keys(value).length > 1) {
                        throw new Error("Can't use another field in conjunction with $each");
                    }
                    if (!Array.isArray(value.$each)) {
                        throw new Error("$each requires an array value");
                    }

                    value.$each.forEach(function(v) {
                        lastStepModifierFunctions.$addToSet(obj, field, v);
                    });
                } else {
                    obj[field].forEach(function(v) {
                        if (local.sortCompare(v, value) === 0) {
                            addToSet = false;
                        }
                    });
                    if (addToSet) {
                        obj[field].push(value);
                    }
                }
            };


            /**
             * Remove the first or last element of an array
             */
            lastStepModifierFunctions.$pop = function(obj, field, value) {
                if (!Array.isArray(obj[field])) {
                    throw new Error("Can't $pop an element from non-array values");
                }
                if (typeof value !== 'number') {
                    throw new Error(value + " isn't an integer, can't use it with $pop");
                }
                if (value === 0) {
                    return;
                }

                if (value > 0) {
                    obj[field] = obj[field].slice(0, obj[field].length - 1);
                } else {
                    obj[field] = obj[field].slice(1);
                }
            };


            /**
             * Removes all instances of a value from an existing array
             */
            lastStepModifierFunctions.$pull = function(obj, field, value) {
                var arr, i;

                if (!Array.isArray(obj[field])) {
                    throw new Error("Can't $pull an element from non-array values");
                }

                arr = obj[field];
                for (i = arr.length - 1; i >= 0; i -= 1) {
                    if (match(arr[i], value)) {
                        arr.splice(i, 1);
                    }
                }
            };


            /**
             * Increment a numeric field's value
             */
            lastStepModifierFunctions.$inc = function(obj, field, value) {
                if (typeof value !== 'number') {
                    throw new Error(value + " must be a number");
                }

                if (typeof obj[field] !== 'number') {
                    if (!obj.hasOwnProperty(field)) {
                        obj[field] = value;
                    } else {
                        throw new Error("Don't use the $inc modifier on non-number fields");
                    }
                } else {
                    obj[field] += value;
                }
            };

            /**
             * Updates the value of the field, only if specified field is greater than the current value of the field
             */
            lastStepModifierFunctions.$max = function(obj, field, value) {
                if (typeof obj[field] === 'undefined') {
                    obj[field] = value;
                } else if (value > obj[field]) {
                    obj[field] = value;
                }
            };

            /**
             * Updates the value of the field, only if specified field is smaller than the current value of the field
             */
            lastStepModifierFunctions.$min = function(obj, field, value) {
                if (typeof obj[field] === 'undefined') {
                    obj[field] = value;
                } else if (value < obj[field]) {
                    obj[field] = value;
                }
            };

            // Given its name, create the complete modifier function
            function createModifierFunction(modifier) {
                return function(obj, field, value) {
                    var fieldParts = typeof field === 'string' ? field.split('.') : field;

                    if (fieldParts.length === 1) {
                        lastStepModifierFunctions[modifier](obj, field, value);
                    } else {
                        if (obj[fieldParts[0]] === undefined) {
                            if (modifier === '$unset') {
                                return;
                            } // Bad looking specific fix, needs to be generalized modifiers that behave like $unset are implemented
                            obj[fieldParts[0]] = {};
                        }
                        modifierFunctions[modifier](obj[fieldParts[0]], fieldParts.slice(1), value);
                    }
                };
            }

            // Actually create all modifier functions
            Object.keys(lastStepModifierFunctions).forEach(function(modifier) {
                modifierFunctions[modifier] = createModifierFunction(modifier);
            });


            /**
             * Modify a DB object according to an update query
             */
            function modify(obj, updateQuery) {
                var keys = Object.keys(updateQuery),
                    firstChars = keys.map(function(item) {
                        return item[0];
                    }),
                    dollarFirstChars = firstChars.filter(function(c) {
                        return c === '$';
                    }),
                    newDoc, modifiers;

                if (keys.indexOf('_id') !== -1 && updateQuery._id !== obj._id) {
                    throw new Error("You cannot change a document's _id");
                }

                if (dollarFirstChars.length !== 0 && dollarFirstChars.length !== firstChars.length) {
                    throw new Error("You cannot mix modifiers and normal fields");
                }

                if (dollarFirstChars.length === 0) {
                    // Simply replace the object with the update query contents
                    newDoc = deepCopy(updateQuery);
                    newDoc._id = obj._id;
                } else {
                    // Apply modifiers
                    modifiers = local.listUnique(keys);
                    newDoc = deepCopy(obj);
                    modifiers.forEach(function(m) {
                        var keys;

                        if (!modifierFunctions[m]) {
                            throw new Error("Unknown modifier " + m);
                        }

                        // Can't rely on Object.keys throwing on non objects since ES6
                        // Not 100% satisfying as non objects can be interpreted as objects but no false negatives so we can live with it
                        if (typeof updateQuery[m] !== 'object') {
                            throw new Error("Modifier " + m + "'s argument must be an object");
                        }

                        keys = Object.keys(updateQuery[m]);
                        keys.forEach(function(k) {
                            modifierFunctions[m](newDoc, k, updateQuery[m][k]);
                        });
                    });
                }

                // Check result is valid and return it
                checkObject(newDoc);

                if (obj._id !== newDoc._id) {
                    throw new Error("You can't change a document's _id");
                }
                return newDoc;
            };


            // ==============================================================
            // Finding documents
            // ==============================================================

            /**
             * Get a value from object with dot notation
             * @param {Object} obj
             * @param {String} field
             */
            function getDotValue(obj, field) {
                var fieldParts = typeof field === 'string' ? field.split('.') : field,
                    i, objs;

                if (!obj) {
                    return undefined;
                } // field cannot be empty so that means we should return undefined so that nothing can match

                if (fieldParts.length === 0) {
                    return obj;
                }

                if (fieldParts.length === 1) {
                    return obj[fieldParts[0]];
                }

                if (Array.isArray(obj[fieldParts[0]])) {
                    // If the next field is an integer, return only this item of the array
                    i = parseInt(fieldParts[1], 10);
                    if (typeof i === 'number' && !isNaN(i)) {
                        return getDotValue(obj[fieldParts[0]][i], fieldParts.slice(2))
                    }

                    // Return the array of values
                    objs = new Array();
                    for (i = 0; i < obj[fieldParts[0]].length; i += 1) {
                        objs.push(getDotValue(obj[fieldParts[0]][i], fieldParts.slice(1)));
                    }
                    return objs;
                } else {
                    return getDotValue(obj[fieldParts[0]], fieldParts.slice(1));
                }
            }


            /**
             * Check whether 'things' are equal
             * Things are defined as any native types (string, number, boolean, null, date) and objects
             * In the case of object, we check deep equality
             * Returns true if they are, false otherwise
             */
            function areThingsEqual(a, b) {
                var aKeys, bKeys, i;

                // Strings, booleans, numbers, null
                if (a === null || typeof a === 'string' || typeof a === 'boolean' || typeof a === 'number' ||
                    b === null || typeof b === 'string' || typeof b === 'boolean' || typeof b === 'number') {
                    return a === b;
                }

                // Dates
                if (local.isDate(a) || local.isDate(b)) {
                    return local.isDate(a) && local.isDate(b) && a.getTime() === b.getTime();
                }

                // Arrays (no match since arrays are used as a $in)
                // undefined (no match since they mean field doesn't exist and can't be serialized)
                if ((!(Array.isArray(a) && Array.isArray(b)) && (Array.isArray(a) || Array.isArray(b))) || a === undefined || b === undefined) {
                    return false;
                }

                // General objects (check for deep equality)
                // a and b should be objects at this point
                try {
                    aKeys = Object.keys(a);
                    bKeys = Object.keys(b);
                } catch (e) {
                    return false;
                }

                if (aKeys.length !== bKeys.length) {
                    return false;
                }
                for (i = 0; i < aKeys.length; i += 1) {
                    if (bKeys.indexOf(aKeys[i]) === -1) {
                        return false;
                    }
                    if (!areThingsEqual(a[aKeys[i]], b[aKeys[i]])) {
                        return false;
                    }
                }
                return true;
            }


            /**
             * Check that two values are comparable
             */
            function areComparable(a, b) {
                if (typeof a !== 'string' && typeof a !== 'number' && !local.isDate(a) &&
                    typeof b !== 'string' && typeof b !== 'number' && !local.isDate(b)) {
                    return false;
                }

                if (typeof a !== typeof b) {
                    return false;
                }

                return true;
            }


            /**
             * Arithmetic and comparison operators
             * @param {Native value} a Value in the object
             * @param {Native value} b Value in the query
             */
            comparisonFunctions.$lt = function(a, b) {
                return areComparable(a, b) && a < b;
            };

            comparisonFunctions.$lte = function(a, b) {
                return areComparable(a, b) && a <= b;
            };

            comparisonFunctions.$gt = function(a, b) {
                return areComparable(a, b) && a > b;
            };

            comparisonFunctions.$gte = function(a, b) {
                return areComparable(a, b) && a >= b;
            };

            comparisonFunctions.$ne = function(a, b) {
                if (a === undefined) {
                    return true;
                }
                return !areThingsEqual(a, b);
            };

            comparisonFunctions.$in = function(a, b) {
                var i;

                if (!Array.isArray(b)) {
                    throw new Error("$in operator called with a non-array");
                }

                for (i = 0; i < b.length; i += 1) {
                    if (areThingsEqual(a, b[i])) {
                        return true;
                    }
                }

                return false;
            };

            comparisonFunctions.$nin = function(a, b) {
                if (!Array.isArray(b)) {
                    throw new Error("$nin operator called with a non-array");
                }

                return !comparisonFunctions.$in(a, b);
            };

            comparisonFunctions.$regex = function(a, b) {
                if (!local.isRegExp(b)) {
                    throw new Error("$regex operator called with non regular expression");
                }

                if (typeof a !== 'string') {
                    return false
                } else {
                    return b.test(a);
                }
            };

            comparisonFunctions.$exists = function(value, exists) {
                if (exists || exists === '') { // This will be true for all values of exists except false, null, undefined and 0
                    exists = true; // That's strange behaviour (we should only use true/false) but that's the way Mongo does it...
                } else {
                    exists = false;
                }

                if (value === undefined) {
                    return !exists
                } else {
                    return exists;
                }
            };

            // Specific to arrays
            comparisonFunctions.$size = function(obj, value) {
                if (!Array.isArray(obj)) {
                    return false;
                }
                if (value % 1 !== 0) {
                    throw new Error("$size operator called without an integer");
                }

                return (obj.length == value);
            };
            comparisonFunctions.$elemMatch = function(obj, value) {
                if (!Array.isArray(obj)) {
                    return false;
                }
                var i = obj.length;
                var result = false; // Initialize result
                while (i--) {
                    if (match(obj[i], value)) { // If match for array element, return true
                        result = true;
                        break;
                    }
                }
                return result;
            };
            arrayComparisonFunctions.$size = true;
            arrayComparisonFunctions.$elemMatch = true;


            /**
             * Match any of the subqueries
             * @param {Model} obj
             * @param {Array of Queries} query
             */
            logicalOperators.$or = function(obj, query) {
                var i;

                if (!Array.isArray(query)) {
                    throw new Error("$or operator used without an array");
                }

                for (i = 0; i < query.length; i += 1) {
                    if (match(obj, query[i])) {
                        return true;
                    }
                }

                return false;
            };


            /**
             * Match all of the subqueries
             * @param {Model} obj
             * @param {Array of Queries} query
             */
            logicalOperators.$and = function(obj, query) {
                var i;

                if (!Array.isArray(query)) {
                    throw new Error("$and operator used without an array");
                }

                for (i = 0; i < query.length; i += 1) {
                    if (!match(obj, query[i])) {
                        return false;
                    }
                }

                return true;
            };


            /**
             * Inverted match of the query
             * @param {Model} obj
             * @param {Query} query
             */
            logicalOperators.$not = function(obj, query) {
                return !match(obj, query);
            };


            /**
             * Use a function to match
             * @param {Model} obj
             * @param {Query} query
             */
            logicalOperators.$where = function(obj, fn) {
                var result;

                if (typeof fn !== 'function') {
                    throw new Error("$where operator used without a function");
                }

                result = fn.call(obj);
                if (typeof result !== 'boolean') {
                    throw new Error("$where function must return boolean");
                }

                return result;
            };


            /**
             * Tell if a given document matches a query
             * @param {Object} obj Document to check
             * @param {Object} query
             */
            function match(obj, query) {
                var queryKeys, queryKey, queryValue, i;

                // Primitive query against a primitive type
                // This is a bit of a hack since we construct an object with an arbitrary key only to dereference it later
                // But I don't have time for a cleaner implementation now
                if (isPrimitiveType(obj) || isPrimitiveType(query)) {
                    return matchQueryPart({
                        needAKey: obj
                    }, 'needAKey', query);
                }

                // Normal query
                queryKeys = Object.keys(query);
                for (i = 0; i < queryKeys.length; i += 1) {
                    queryKey = queryKeys[i];
                    queryValue = query[queryKey];

                    if (queryKey[0] === '$') {
                        if (!logicalOperators[queryKey]) {
                            throw new Error("Unknown logical operator " + queryKey);
                        }
                        if (!logicalOperators[queryKey](obj, queryValue)) {
                            return false;
                        }
                    } else {
                        if (!matchQueryPart(obj, queryKey, queryValue)) {
                            return false;
                        }
                    }
                }

                return true;
            };


            /**
             * Match an object against a specific { key: value } part of a query
             * if the treatObjAsValue flag is set, don't try to match every part separately, but the array as a whole
             */
            function matchQueryPart(obj, queryKey, queryValue, treatObjAsValue) {
                var objValue = getDotValue(obj, queryKey),
                    i, keys, firstChars, dollarFirstChars;

                // Check if the value is an array if we don't force a treatment as value
                if (Array.isArray(objValue) && !treatObjAsValue) {
                    // If the queryValue is an array, try to perform an exact match
                    if (Array.isArray(queryValue)) {
                        return matchQueryPart(obj, queryKey, queryValue, true);
                    }

                    // Check if we are using an array-specific comparison function
                    if (queryValue !== null && typeof queryValue === 'object' && !local.isRegExp(queryValue)) {
                        keys = Object.keys(queryValue);
                        for (i = 0; i < keys.length; i += 1) {
                            if (arrayComparisonFunctions[keys[i]]) {
                                return matchQueryPart(obj, queryKey, queryValue, true);
                            }
                        }
                    }

                    // If not, treat it as an array of { obj, query } where there needs to be at least one match
                    for (i = 0; i < objValue.length; i += 1) {
                        if (matchQueryPart({
                                k: objValue[i]
                            }, 'k', queryValue)) {
                            return true;
                        } // k here could be any string
                    }
                    return false;
                }

                // queryValue is an actual object. Determine whether it contains comparison operators
                // or only normal fields. Mixed objects are not allowed
                if (queryValue !== null && typeof queryValue === 'object' && !local.isRegExp(queryValue) && !Array.isArray(queryValue)) {
                    keys = Object.keys(queryValue);
                    firstChars = keys.map(function(item) {
                        return item[0];
                    });
                    dollarFirstChars = firstChars.filter(function(c) {
                        return c === '$';
                    });

                    if (dollarFirstChars.length !== 0 && dollarFirstChars.length !== firstChars.length) {
                        throw new Error("You cannot mix operators and normal fields");
                    }

                    // queryValue is an object of this form: { $comparisonOperator1: value1, ... }
                    if (dollarFirstChars.length > 0) {
                        for (i = 0; i < keys.length; i += 1) {
                            if (!comparisonFunctions[keys[i]]) {
                                throw new Error("Unknown comparison function " + keys[i]);
                            }

                            if (!comparisonFunctions[keys[i]](objValue, queryValue[keys[i]])) {
                                return false;
                            }
                        }
                        return true;
                    }
                }

                // Using regular expressions with basic querying
                if (local.isRegExp(queryValue)) {
                    return comparisonFunctions.$regex(objValue, queryValue);
                }

                // queryValue is either a native value or a normal object
                // Basic matching is possible
                if (!areThingsEqual(objValue, queryValue)) {
                    return false;
                }

                return true;
            }


            // Interface
            module.exports.serialize = serialize;
            module.exports.deserialize = deserialize;
            module.exports.deepCopy = deepCopy;
            module.exports.checkObject = checkObject;
            module.exports.isPrimitiveType = isPrimitiveType;
            module.exports.modify = modify;
            module.exports.getDotValue = getDotValue;
            module.exports.match = match;
            module.exports.areThingsEqual = areThingsEqual;

        }, {}],
        11: [function(require, module, exports) {
            /**
             * Handle every persistence-related task
             * The interface Datastore expects to be implemented is
             * * Persistence.loadDatabase(callback) and callback has signature error
             * * Persistence.persistNewState(newDocs, callback) where newDocs is an array of documents and callback has signature error
             */

            var model = require('./model'),
                customUtils = require('./customUtils'),
                Index = require('./indexes');


            /**
             * Create a new Persistence object for database options.db
             * @param {Datastore} options.db
             */
            function Persistence(options) {
                var i, j, randomString;

                this.db = options.db;
            };


            /**
             * Persist cached database
             * This serves as a compaction function since the cache always contains only the number of documents in the collection
             * while the data file is append-only so it may grow larger
             * @param {Function} cb Optional callback, signature: error
             */
            Persistence.prototype.persistCachedDatabase = function(cb) {
                var callback = cb,
                    toPersist = '',
                    self = this;

                this.db.getAllData().forEach(function(doc) {
                    toPersist += model.serialize(doc) + '\n';
                });
                Object.keys(this.db.indexes).forEach(function(fieldName) {
                    if (fieldName != '_id') { // The special _id index is managed by datastore.js, the others need to be persisted
                        toPersist += model.serialize({
                            $$indexCreated: {
                                fieldName: fieldName,
                                unique: self.db.indexes[fieldName].unique,
                                sparse: self.db.indexes[fieldName].sparse
                            }
                        }) + '\n';
                    }
                });

                local.storeSetItem(this.db.name, toPersist, function(error) {
                    if (error) {
                        return callback(error);
                    }
                    return callback();
                });
            };


            /**
             * Queue a rewrite of the datafile
             */
            Persistence.prototype.compactDatafile = function() {
                this.db.executor.push({
                    this: this,
                    fn: this.persistCachedDatabase,
                    arguments: []
                });
            };


            Persistence.prototype.persistNewState = function(newDocs, cb) {
            /**
             * Persist new state for the given newDocs (can be insertion, update or removal)
             * Use an append-only format
             * @param {Array} newDocs Can be empty if no doc was updated/removed
             * @param {Function} cb Optional, signature: error
             */
                var self = this,
                    toPersist = '',
                    callback = cb;

                newDocs.forEach(function(doc) {
                    toPersist += model.serialize(doc) + '\n';
                });

                if (toPersist.length === 0) {
                    return callback();
                }

                local.storeGetItem(self.db.name, function (error, data) {
                    local.storeSetItem(self.db.name, (data || '') + toPersist, callback);
                });
            };


            /**
             * From a database's raw data, return the corresponding
             * machine understandable collection
             */
            Persistence.prototype.treatRawData = function(rawData) {
                var data = rawData.split('\n'),
                    dataById = {},
                    tdata = [],
                    i, indexes = {},
                    corruptItems = -1 // Last line of every data file is usually blank so not really corrupt
                ;

                for (i = 0; i < data.length; i += 1) {
                    var doc;

                    try {
                        doc = model.deserialize(data[i]);
                        if (doc._id) {
                            if (doc.$$deleted === true) {
                                delete dataById[doc._id];
                            } else {
                                dataById[doc._id] = doc;
                            }
                        } else if (doc.$$indexCreated && doc.$$indexCreated.fieldName != undefined) {
                            indexes[doc.$$indexCreated.fieldName] = doc.$$indexCreated;
                        } else if (typeof doc.$$indexRemoved === 'string') {
                            delete indexes[doc.$$indexRemoved];
                        }
                    } catch (errorCaught) {
                        corruptItems += 1;
                        // validate no error occurred
                        local.assert(!corruptItems, errorCaught);
                    }
                }

                Object.keys(dataById).forEach(function(k) {
                    tdata.push(dataById[k]);
                });

                return {
                    data: tdata,
                    indexes: indexes
                };
            };


            /**
             * Load the database
             * 1) Create all indexes
             * 2) Insert all data
             * 3) Compact the database
             * This means pulling data out of the data file or creating it if it doesn't exist
             * Also, all data is persisted right away, which has the effect of compacting the database file
             * This operation is very quick at startup for a big collection (60ms for ~10k docs)
             * @param {Function} cb Optional callback, signature: error
             */
            Persistence.prototype.loadDatabase = function(cb) {
                var callback = cb,
                    self = this;

                self.db.resetIndexes();

                var dir, modeNext, onNext;
                modeNext = 0;
                onNext = function (error) {
                    modeNext = error
                        ? Infinity
                        : modeNext + 1;
                    switch (modeNext) {
                    case 1:
                        local.storeGetItem(self.db.name, function(error, rawData) {
                            try {
                                var treatedData = self.treatRawData(rawData || '');
                            } catch (e) {
                                return onNext(e);
                            }

                            // Recreate all indexes in the datafile
                            Object.keys(treatedData.indexes).forEach(function(key) {
                                self.db.indexes[key] = new Index(treatedData.indexes[key]);
                            });

                            // Fill cached database (i.e. all indexes) with data
                            try {
                                self.db.resetIndexes(treatedData.data);
                            } catch (e) {
                                self.db.resetIndexes(); // Rollback any index which didn't fail
                                return onNext(e);
                            }

                            self.db.persistence.persistCachedDatabase(onNext);
                        });
                        break;
                    default:
                        if (error) {
                            return callback(error);
                        }

                        /**
                         * Queue all tasks in buffer (in the same order they came in)
                         * Automatically sets executor as ready
                         */
                        self.db.executor.ready = true;
                        while (self.db.executor.buffer.length) {
                            self.db.executor.queue.push(self.db.executor.buffer.shift());
                        }

                        return callback();
                    }
                };
                onNext();
            };


            // Interface
            module.exports = Persistence;

        }, {
            "./customUtils": 6,
            "./indexes": 9,
            "./model": 10
        }],
        15: [function(require, module, exports) {
            /**
             * Self-balancing binary search tree using the AVL implementation
             */
            var BinarySearchTree = require('./bst');


            /**
             * Constructor
             * We can't use a direct pointer to the root node (as in the simple binary search tree)
             * as the root will change during tree rotations
             * @param {Boolean}  options.unique Whether to enforce a 'unique' constraint on the key or not
             */
            function AVLTree(options) {
                this.tree = new _AVLTree(options);
            }


            /**
             * Constructor of the internal AVLTree
             * @param {Object} options Optional
             * @param {Boolean}  options.unique Whether to enforce a 'unique' constraint on the key or not
             * @param {Key}      options.key Initialize this BST's key with key
             * @param {Value}    options.value Initialize this BST's data with [value]
             */
            function _AVLTree(options) {
                options = options || {};

                this.left = null;
                this.right = null;
                this.parent = options.parent !== undefined ? options.parent : null;
                if (options.hasOwnProperty('key')) {
                    this.key = options.key;
                }
                this.data = options.hasOwnProperty('value') ? [options.value] : [];
                this.unique = options.unique || false;

            }


            /**
             * Inherit basic functions from the basic binary search tree
             */
            local.inherits(_AVLTree, BinarySearchTree);

            /**
             * Keep a pointer to the internal tree constructor for testing purposes
             */
            AVLTree._AVLTree = _AVLTree;


            /**
             * Check the recorded height is correct for every node
             * Throws if one height doesn't match
             */
            _AVLTree.prototype.checkHeightCorrect = function() {
                var leftH, rightH;

                if (!this.hasOwnProperty('key')) {
                    return;
                } // Empty tree

                if (this.left && this.left.height === undefined) {
                    throw new Error("Undefined height for node " + this.left.key);
                }
                if (this.right && this.right.height === undefined) {
                    throw new Error("Undefined height for node " + this.right.key);
                }
                if (this.height === undefined) {
                    throw new Error("Undefined height for node " + this.key);
                }

                leftH = this.left ? this.left.height : 0;
                rightH = this.right ? this.right.height : 0;

                if (this.height !== 1 + Math.max(leftH, rightH)) {
                    throw new Error("Height constraint failed for node " + this.key);
                }
                if (this.left) {
                    this.left.checkHeightCorrect();
                }
                if (this.right) {
                    this.right.checkHeightCorrect();
                }
            };


            /**
             * Return the balance factor
             */
            _AVLTree.prototype.balanceFactor = function() {
                var leftH = this.left ? this.left.height : 0,
                    rightH = this.right ? this.right.height : 0;
                return leftH - rightH;
            };


            /**
             * Check that the balance factors are all between -1 and 1
             */
            _AVLTree.prototype.checkBalanceFactors = function() {
                if (Math.abs(this.balanceFactor()) > 1) {
                    throw new Error('Tree is unbalanced at node ' + this.key);
                }

                if (this.left) {
                    this.left.checkBalanceFactors();
                }
                if (this.right) {
                    this.right.checkBalanceFactors();
                }
            };


            /**
             * When checking if the BST conditions are met, also check that the heights are correct
             * and the tree is balanced
             */
            _AVLTree.prototype.checkIsAVLT = function() {
                _AVLTree.super_.prototype.checkIsBST.call(this);
                this.checkHeightCorrect();
                this.checkBalanceFactors();
            };
            AVLTree.prototype.checkIsAVLT = function() {
                this.tree.checkIsAVLT();
            };


            /**
             * Perform a right rotation of the tree if possible
             * and return the root of the resulting tree
             * The resulting tree's nodes' heights are also updated
             */
            _AVLTree.prototype.rightRotation = function() {
                var q = this,
                    p = this.left,
                    b, ah, bh, ch;

                if (!p) {
                    return this;
                } // No change

                b = p.right;

                // Alter tree structure
                if (q.parent) {
                    p.parent = q.parent;
                    if (q.parent.left === q) {
                        q.parent.left = p;
                    } else {
                        q.parent.right = p;
                    }
                } else {
                    p.parent = null;
                }
                p.right = q;
                q.parent = p;
                q.left = b;
                if (b) {
                    b.parent = q;
                }

                // Update heights
                ah = p.left ? p.left.height : 0;
                bh = b ? b.height : 0;
                ch = q.right ? q.right.height : 0;
                q.height = Math.max(bh, ch) + 1;
                p.height = Math.max(ah, q.height) + 1;

                return p;
            };


            /**
             * Perform a left rotation of the tree if possible
             * and return the root of the resulting tree
             * The resulting tree's nodes' heights are also updated
             */
            _AVLTree.prototype.leftRotation = function() {
                var p = this,
                    q = this.right,
                    b, ah, bh, ch;

                if (!q) {
                    return this;
                } // No change

                b = q.left;

                // Alter tree structure
                if (p.parent) {
                    q.parent = p.parent;
                    if (p.parent.left === p) {
                        p.parent.left = q;
                    } else {
                        p.parent.right = q;
                    }
                } else {
                    q.parent = null;
                }
                q.left = p;
                p.parent = q;
                p.right = b;
                if (b) {
                    b.parent = p;
                }

                // Update heights
                ah = p.left ? p.left.height : 0;
                bh = b ? b.height : 0;
                ch = q.right ? q.right.height : 0;
                p.height = Math.max(ah, bh) + 1;
                q.height = Math.max(ch, p.height) + 1;

                return q;
            };


            /**
             * Modify the tree if its right subtree is too small compared to the left
             * Return the new root if any
             */
            _AVLTree.prototype.rightTooSmall = function() {
                if (this.balanceFactor() <= 1) {
                    return this;
                } // Right is not too small, don't change

                if (this.left.balanceFactor() < 0) {
                    this.left.leftRotation();
                }

                return this.rightRotation();
            };


            /**
             * Modify the tree if its left subtree is too small compared to the right
             * Return the new root if any
             */
            _AVLTree.prototype.leftTooSmall = function() {
                if (this.balanceFactor() >= -1) {
                    return this;
                } // Left is not too small, don't change

                if (this.right.balanceFactor() > 0) {
                    this.right.rightRotation();
                }

                return this.leftRotation();
            };


            /**
             * Rebalance the tree along the given path. The path is given reversed (as he was calculated
             * in the insert and delete functions).
             * Returns the new root of the tree
             * Of course, the first element of the path must be the root of the tree
             */
            _AVLTree.prototype.rebalanceAlongPath = function(path) {
                var newRoot = this,
                    rotated, i;

                if (!this.hasOwnProperty('key')) {
                    delete this.height;
                    return this;
                } // Empty tree

                // Rebalance the tree and update all heights
                for (i = path.length - 1; i >= 0; i -= 1) {
                    path[i].height = 1 + Math.max(path[i].left ? path[i].left.height : 0, path[i].right ? path[i].right.height : 0);

                    if (path[i].balanceFactor() > 1) {
                        rotated = path[i].rightTooSmall();
                        if (i === 0) {
                            newRoot = rotated;
                        }
                    }

                    if (path[i].balanceFactor() < -1) {
                        rotated = path[i].leftTooSmall();
                        if (i === 0) {
                            newRoot = rotated;
                        }
                    }
                }

                return newRoot;
            };


            /**
             * Insert a key, value pair in the tree while maintaining the AVL tree height constraint
             * Return a pointer to the root node, which may have changed
             */
            _AVLTree.prototype.insert = function(key, value) {
                var insertPath = [],
                    currentNode = this;

                // Empty tree, insert as root
                if (!this.hasOwnProperty('key')) {
                    this.key = key;
                    this.data.push(value);
                    this.height = 1;
                    return this;
                }

                // Insert new leaf at the right place
                while (true) {
                    // Same key: no change in the tree structure
                    if (local.sortCompare(currentNode.key, key) === 0) {
                        if (currentNode.unique) {
                            var error = new Error("Can't insert key " + key + ", it violates the unique constraint");
                            error.key = key;
                            error.errorType = 'uniqueViolated';
                            throw error;
                        } else {
                            currentNode.data.push(value);
                        }
                        return this;
                    }

                    insertPath.push(currentNode);

                    if (local.sortCompare(key, currentNode.key) < 0) {
                        if (!currentNode.left) {
                            insertPath.push(currentNode.createLeftChild({
                                key: key,
                                value: value
                            }));
                            break;
                        } else {
                            currentNode = currentNode.left;
                        }
                    } else {
                        if (!currentNode.right) {
                            insertPath.push(currentNode.createRightChild({
                                key: key,
                                value: value
                            }));
                            break;
                        } else {
                            currentNode = currentNode.right;
                        }
                    }
                }

                return this.rebalanceAlongPath(insertPath);
            };

            // Insert in the internal tree, update the pointer to the root if needed
            AVLTree.prototype.insert = function(key, value) {
                var newTree = this.tree.insert(key, value);

                // If newTree is undefined, that means its structure was not modified
                if (newTree) {
                    this.tree = newTree;
                }
            };


            /**
             * Delete a key or just a value and return the new root of the tree
             * @param {Key} key
             * @param {Value} value Optional. If not set, the whole key is deleted. If set, only this value is deleted
             */
            _AVLTree.prototype.delete = function(key, value) {
                var newData = [],
                    replaceWith, self = this,
                    currentNode = this,
                    deletePath = [];

                if (!this.hasOwnProperty('key')) {
                    return this;
                } // Empty tree

                // Either no match is found and the function will return from within the loop
                // Or a match is found and deletePath will contain the path from the root to the node to delete after the loop
                while (true) {
                    if (local.sortCompare(key, currentNode.key) === 0) {
                        break;
                    }

                    deletePath.push(currentNode);

                    if (local.sortCompare(key, currentNode.key) < 0) {
                        if (currentNode.left) {
                            currentNode = currentNode.left;
                        } else {
                            return this; // Key not found, no modification
                        }
                    } else {
                        // local.sortCompare(key, currentNode.key) is > 0
                        if (currentNode.right) {
                            currentNode = currentNode.right;
                        } else {
                            return this; // Key not found, no modification
                        }
                    }
                }

                // Delete only a value (no tree modification)
                if (currentNode.data.length > 1 && value) {
                    currentNode.data.forEach(function(d) {
                        if (d !== value) {
                            newData.push(d);
                        }
                    });
                    currentNode.data = newData;
                    return this;
                }

                // Delete a whole node

                // Leaf
                if (!currentNode.left && !currentNode.right) {
                    if (currentNode === this) { // This leaf is also the root
                        delete currentNode.key;
                        currentNode.data = [];
                        delete currentNode.height;
                        return this;
                    } else {
                        if (currentNode.parent.left === currentNode) {
                            currentNode.parent.left = null;
                        } else {
                            currentNode.parent.right = null;
                        }
                        return this.rebalanceAlongPath(deletePath);
                    }
                }


                // Node with only one child
                if (!currentNode.left || !currentNode.right) {
                    replaceWith = currentNode.left ? currentNode.left : currentNode.right;

                    if (currentNode === this) { // This node is also the root
                        replaceWith.parent = null;
                        return replaceWith; // height of replaceWith is necessarily 1 because the tree was balanced before deletion
                    } else {
                        if (currentNode.parent.left === currentNode) {
                            currentNode.parent.left = replaceWith;
                            replaceWith.parent = currentNode.parent;
                        } else {
                            currentNode.parent.right = replaceWith;
                            replaceWith.parent = currentNode.parent;
                        }

                        return this.rebalanceAlongPath(deletePath);
                    }
                }


                // Node with two children
                // Use the in-order predecessor (no need to randomize since we actively rebalance)
                deletePath.push(currentNode);
                replaceWith = currentNode.left;

                // Special case: the in-order predecessor is right below the node to delete
                if (!replaceWith.right) {
                    currentNode.key = replaceWith.key;
                    currentNode.data = replaceWith.data;
                    currentNode.left = replaceWith.left;
                    if (replaceWith.left) {
                        replaceWith.left.parent = currentNode;
                    }
                    return this.rebalanceAlongPath(deletePath);
                }

                // After this loop, replaceWith is the right-most leaf in the left subtree
                // and deletePath the path from the root (inclusive) to replaceWith (exclusive)
                while (true) {
                    if (replaceWith.right) {
                        deletePath.push(replaceWith);
                        replaceWith = replaceWith.right;
                    } else {
                        break;
                    }
                }

                currentNode.key = replaceWith.key;
                currentNode.data = replaceWith.data;

                replaceWith.parent.right = replaceWith.left;
                if (replaceWith.left) {
                    replaceWith.left.parent = replaceWith.parent;
                }

                return this.rebalanceAlongPath(deletePath);
            };

            // Delete a value
            AVLTree.prototype.delete = function(key, value) {
                var newTree = this.tree.delete(key, value);

                // If newTree is undefined, that means its structure was not modified
                if (newTree) {
                    this.tree = newTree;
                }
            };


            /**
             * Other functions we want to use on an AVLTree as if it were the internal _AVLTree
             */
            ['getNumberOfKeys', 'search', 'betweenBounds', 'prettyPrint', 'executeOnEveryNode'].forEach(function(fn) {
                AVLTree.prototype[fn] = function() {
                    return this.tree[fn].apply(this.tree, arguments);
                };
            });


            // Interface
            module.exports = AVLTree;

        }, {
            "./bst": 16
        }],
        16: [function(require, module, exports) {
            /**
             * Simple binary search tree
             */

            /**
             * Constructor
             * @param {Object} options Optional
             * @param {Boolean}  options.unique Whether to enforce a 'unique' constraint on the key or not
             * @param {Key}      options.key Initialize this BST's key with key
             * @param {Value}    options.value Initialize this BST's data with [value]
             */
            function BinarySearchTree(options) {
                options = options || {};

                this.left = null;
                this.right = null;
                this.parent = options.parent !== undefined ? options.parent : null;
                if (options.hasOwnProperty('key')) {
                    this.key = options.key;
                }
                this.data = options.hasOwnProperty('value') ? [options.value] : [];
                this.unique = options.unique || false;

            }


            // ================================
            // Methods used to test the tree
            // ================================


            /**
             * Get the descendant with max key
             */
            BinarySearchTree.prototype.getMaxKeyDescendant = function() {
                if (this.right) {
                    return this.right.getMaxKeyDescendant();
                } else {
                    return this;
                }
            };


            /**
             * Get the maximum key
             */
            BinarySearchTree.prototype.getMaxKey = function() {
                return this.getMaxKeyDescendant().key;
            };


            /**
             * Get the descendant with min key
             */
            BinarySearchTree.prototype.getMinKeyDescendant = function() {
                if (this.left) {
                    return this.left.getMinKeyDescendant()
                } else {
                    return this;
                }
            };


            /**
             * Get the minimum key
             */
            BinarySearchTree.prototype.getMinKey = function() {
                return this.getMinKeyDescendant().key;
            };


            /**
             * Check that all nodes (incl. leaves) fullfil condition given by fn
             * test is a function passed every (key, data) and which throws if the condition is not met
             */
            BinarySearchTree.prototype.checkAllNodesFullfillCondition = function(test) {
                if (!this.hasOwnProperty('key')) {
                    return;
                }

                test(this.key, this.data);
                if (this.left) {
                    this.left.checkAllNodesFullfillCondition(test);
                }
                if (this.right) {
                    this.right.checkAllNodesFullfillCondition(test);
                }
            };


            /**
             * Check that the core BST properties on node ordering are verified
             * Throw if they aren't
             */
            BinarySearchTree.prototype.checkNodeOrdering = function() {
                var self = this;

                if (!this.hasOwnProperty('key')) {
                    return;
                }

                if (this.left) {
                    this.left.checkAllNodesFullfillCondition(function(k) {
                        if (local.sortCompare(k, self.key) >= 0) {
                            throw new Error('Tree with root ' + self.key + ' is not a binary search tree');
                        }
                    });
                    this.left.checkNodeOrdering();
                }

                if (this.right) {
                    this.right.checkAllNodesFullfillCondition(function(k) {
                        if (local.sortCompare(k, self.key) <= 0) {
                            throw new Error('Tree with root ' + self.key + ' is not a binary search tree');
                        }
                    });
                    this.right.checkNodeOrdering();
                }
            };


            /**
             * Check that all pointers are coherent in this tree
             */
            BinarySearchTree.prototype.checkInternalPointers = function() {
                if (this.left) {
                    if (this.left.parent !== this) {
                        throw new Error('Parent pointer broken for key ' + this.key);
                    }
                    this.left.checkInternalPointers();
                }

                if (this.right) {
                    if (this.right.parent !== this) {
                        throw new Error('Parent pointer broken for key ' + this.key);
                    }
                    this.right.checkInternalPointers();
                }
            };


            /**
             * Check that a tree is a BST as defined here (node ordering and pointer references)
             */
            BinarySearchTree.prototype.checkIsBST = function() {
                this.checkNodeOrdering();
                this.checkInternalPointers();
                if (this.parent) {
                    throw new Error("The root shouldn't have a parent");
                }
            };


            /**
             * Get number of keys inserted
             */
            BinarySearchTree.prototype.getNumberOfKeys = function() {
                var res;

                if (!this.hasOwnProperty('key')) {
                    return 0;
                }

                res = 1;
                if (this.left) {
                    res += this.left.getNumberOfKeys();
                }
                if (this.right) {
                    res += this.right.getNumberOfKeys();
                }

                return res;
            };



            // ============================================
            // Methods used to actually work on the tree
            // ============================================

            /**
             * Create a BST similar (i.e. same options except for key and value) to the current one
             * Use the same constructor (i.e. BinarySearchTree, AVLTree etc)
             * @param {Object} options see constructor
             */
            BinarySearchTree.prototype.createSimilar = function(options) {
                options = options || {};
                options.unique = this.unique;

                return new this.constructor(options);
            };


            /**
             * Create the left child of this BST and return it
             */
            BinarySearchTree.prototype.createLeftChild = function(options) {
                var leftChild = this.createSimilar(options);
                leftChild.parent = this;
                this.left = leftChild;

                return leftChild;
            };


            /**
             * Create the right child of this BST and return it
             */
            BinarySearchTree.prototype.createRightChild = function(options) {
                var rightChild = this.createSimilar(options);
                rightChild.parent = this;
                this.right = rightChild;

                return rightChild;
            };


            /**
             * Insert a new element
             */
            BinarySearchTree.prototype.insert = function(key, value) {
                // Empty tree, insert as root
                if (!this.hasOwnProperty('key')) {
                    this.key = key;
                    this.data.push(value);
                    return;
                }

                // Same key as root
                if (local.sortCompare(this.key, key) === 0) {
                    if (this.unique) {
                        var error = new Error("Can't insert key " + key + ", it violates the unique constraint");
                        error.key = key;
                        error.errorType = 'uniqueViolated';
                        throw error;
                    } else {
                        this.data.push(value);
                    }
                    return;
                }

                if (local.sortCompare(key, this.key) < 0) {
                    // Insert in left subtree
                    if (this.left) {
                        this.left.insert(key, value);
                    } else {
                        this.createLeftChild({
                            key: key,
                            value: value
                        });
                    }
                } else {
                    // Insert in right subtree
                    if (this.right) {
                        this.right.insert(key, value);
                    } else {
                        this.createRightChild({
                            key: key,
                            value: value
                        });
                    }
                }
            };


            /**
             * Search for all data corresponding to a key
             */
            BinarySearchTree.prototype.search = function(key) {
                if (!this.hasOwnProperty('key')) {
                    return [];
                }

                if (local.sortCompare(this.key, key) === 0) {
                    return this.data;
                }

                if (local.sortCompare(key, this.key) < 0) {
                    if (this.left) {
                        return this.left.search(key);
                    } else {
                        return [];
                    }
                } else {
                    if (this.right) {
                        return this.right.search(key);
                    } else {
                        return [];
                    }
                }
            };


            /**
             * Return a function that tells whether a given key matches a lower bound
             */
            BinarySearchTree.prototype.getLowerBoundMatcher = function(query) {
                var self = this;

                // No lower bound
                if (!query.hasOwnProperty('$gt') && !query.hasOwnProperty('$gte')) {
                    return function() {
                        return true;
                    };
                }

                if (query.hasOwnProperty('$gt') && query.hasOwnProperty('$gte')) {
                    if (local.sortCompare(query.$gte, query.$gt) === 0) {
                        return function(key) {
                            return local.sortCompare(key, query.$gt) > 0;
                        };
                    }

                    if (local.sortCompare(query.$gte, query.$gt) > 0) {
                        return function(key) {
                            return local.sortCompare(key, query.$gte) >= 0;
                        };
                    } else {
                        return function(key) {
                            return local.sortCompare(key, query.$gt) > 0;
                        };
                    }
                }

                if (query.hasOwnProperty('$gt')) {
                    return function(key) {
                        return local.sortCompare(key, query.$gt) > 0;
                    };
                } else {
                    return function(key) {
                        return local.sortCompare(key, query.$gte) >= 0;
                    };
                }
            };


            /**
             * Return a function that tells whether a given key matches an upper bound
             */
            BinarySearchTree.prototype.getUpperBoundMatcher = function(query) {
                var self = this;

                // No lower bound
                if (!query.hasOwnProperty('$lt') && !query.hasOwnProperty('$lte')) {
                    return function() {
                        return true;
                    };
                }

                if (query.hasOwnProperty('$lt') && query.hasOwnProperty('$lte')) {
                    if (local.sortCompare(query.$lte, query.$lt) === 0) {
                        return function(key) {
                            return local.sortCompare(key, query.$lt) < 0;
                        };
                    }

                    if (local.sortCompare(query.$lte, query.$lt) < 0) {
                        return function(key) {
                            return local.sortCompare(key, query.$lte) <= 0;
                        };
                    } else {
                        return function(key) {
                            return local.sortCompare(key, query.$lt) < 0;
                        };
                    }
                }

                if (query.hasOwnProperty('$lt')) {
                    return function(key) {
                        return local.sortCompare(key, query.$lt) < 0;
                    };
                } else {
                    return function(key) {
                        return local.sortCompare(key, query.$lte) <= 0;
                    };
                }
            };


            // Append all elements in toAppend to array
            function append(array, toAppend) {
                var i;

                for (i = 0; i < toAppend.length; i += 1) {
                    array.push(toAppend[i]);
                }
            }


            /**
             * Get all data for a key between bounds
             * Return it in key order
             * @param {Object} query Mongo-style query where keys are $lt, $lte, $gt or $gte (other keys are not considered)
             * @param {Functions} lbm/ubm matching functions calculated at the first recursive step
             */
            BinarySearchTree.prototype.betweenBounds = function(query, lbm, ubm) {
                var res = [];

                if (!this.hasOwnProperty('key')) {
                    return [];
                } // Empty tree

                lbm = lbm || this.getLowerBoundMatcher(query);
                ubm = ubm || this.getUpperBoundMatcher(query);

                if (lbm(this.key) && this.left) {
                    append(res, this.left.betweenBounds(query, lbm, ubm));
                }
                if (lbm(this.key) && ubm(this.key)) {
                    append(res, this.data);
                }
                if (ubm(this.key) && this.right) {
                    append(res, this.right.betweenBounds(query, lbm, ubm));
                }

                return res;
            };


            /**
             * Delete the current node if it is a leaf
             * Return true if it was deleted
             */
            BinarySearchTree.prototype.deleteIfLeaf = function() {
                if (this.left || this.right) {
                    return false;
                }

                // The leaf is itself a root
                if (!this.parent) {
                    delete this.key;
                    this.data = [];
                    return true;
                }

                if (this.parent.left === this) {
                    this.parent.left = null;
                } else {
                    this.parent.right = null;
                }

                return true;
            };


            /**
             * Delete the current node if it has only one child
             * Return true if it was deleted
             */
            BinarySearchTree.prototype.deleteIfOnlyOneChild = function() {
                var child;

                if (this.left && !this.right) {
                    child = this.left;
                }
                if (!this.left && this.right) {
                    child = this.right;
                }
                if (!child) {
                    return false;
                }

                // Root
                if (!this.parent) {
                    this.key = child.key;
                    this.data = child.data;

                    this.left = null;
                    if (child.left) {
                        this.left = child.left;
                        child.left.parent = this;
                    }

                    this.right = null;
                    if (child.right) {
                        this.right = child.right;
                        child.right.parent = this;
                    }

                    return true;
                }

                if (this.parent.left === this) {
                    this.parent.left = child;
                    child.parent = this.parent;
                } else {
                    this.parent.right = child;
                    child.parent = this.parent;
                }

                return true;
            };


            /**
             * Delete a key or just a value
             * @param {Key} key
             * @param {Value} value Optional. If not set, the whole key is deleted. If set, only this value is deleted
             */
            BinarySearchTree.prototype.delete = function(key, value) {
                var newData = [],
                    replaceWith, self = this;

                if (!this.hasOwnProperty('key')) {
                    return;
                }

                if (local.sortCompare(key, this.key) < 0) {
                    if (this.left) {
                        this.left.delete(key, value);
                    }
                    return;
                }

                if (local.sortCompare(key, this.key) > 0) {
                    if (this.right) {
                        this.right.delete(key, value);
                    }
                    return;
                }

                if (!local.sortCompare(key, this.key) === 0) {
                    return;
                }

                // Delete only a value
                if (this.data.length > 1 && value !== undefined) {
                    this.data.forEach(function(d) {
                        if (d !== value) {
                            newData.push(d);
                        }
                    });
                    self.data = newData;
                    return;
                }

                // Delete the whole node
                if (this.deleteIfLeaf()) {
                    return;
                }
                if (this.deleteIfOnlyOneChild()) {
                    return;
                }

                // We are in the case where the node to delete has two children
                if (Math.random() >= 0.5) { // Randomize replacement to avoid unbalancing the tree too much
                    // Use the in-order predecessor
                    replaceWith = this.left.getMaxKeyDescendant();

                    this.key = replaceWith.key;
                    this.data = replaceWith.data;

                    if (this === replaceWith.parent) { // Special case
                        this.left = replaceWith.left;
                        if (replaceWith.left) {
                            replaceWith.left.parent = replaceWith.parent;
                        }
                    } else {
                        replaceWith.parent.right = replaceWith.left;
                        if (replaceWith.left) {
                            replaceWith.left.parent = replaceWith.parent;
                        }
                    }
                } else {
                    // Use the in-order successor
                    replaceWith = this.right.getMinKeyDescendant();

                    this.key = replaceWith.key;
                    this.data = replaceWith.data;

                    if (this === replaceWith.parent) { // Special case
                        this.right = replaceWith.right;
                        if (replaceWith.right) {
                            replaceWith.right.parent = replaceWith.parent;
                        }
                    } else {
                        replaceWith.parent.left = replaceWith.right;
                        if (replaceWith.right) {
                            replaceWith.right.parent = replaceWith.parent;
                        }
                    }
                }
            };


            /**
             * Execute a function on every node of the tree, in key order
             * @param {Function} fn Signature: node. Most useful will probably be node.key and node.data
             */
            BinarySearchTree.prototype.executeOnEveryNode = function(fn) {
                if (this.left) {
                    this.left.executeOnEveryNode(fn);
                }
                fn(this);
                if (this.right) {
                    this.right.executeOnEveryNode(fn);
                }
            };


            /**
             * Pretty print a tree
             * @param {Boolean} printData To print the nodes' data along with the key
             */
            BinarySearchTree.prototype.prettyPrint = function(printData, spacing) {
                spacing = spacing || '';

                console.log(spacing + "* " + this.key);
                if (printData) {
                    console.log(spacing + "* " + this.data);
                }

                if (!this.left && !this.right) {
                    return;
                }

                if (this.left) {
                    this.left.prettyPrint(printData, spacing + "  ");
                } else {
                    console.log(spacing + "  *");
                }
                if (this.right) {
                    this.right.prettyPrint(printData, spacing + "  ");
                } else {
                    console.log(spacing + "  *");
                }
            };




            // Interface
            module.exports = BinarySearchTree;
        }, {}]
    }, {}, [7])(7)
});
/* jslint-ignore-end */



    // run shared js-env code - post-init
    (function () {
        // init indexedDB store
        local.storeInit();
        // re-init local
        Object.keys(local).forEach(function (key) {
            local[key.replace((/.*\//), '')] = local[key];
        });
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init exports
        local.global.Nedb = local.global.utility2_nedb = local;
        local.NODE_ENV = 'undefined';
        break;



    // run node js-env code - post-init
    case 'node':
        // require modules
        local.child_process = require('child_process');
        local.fs = require('fs');
        local.os = require('os');
        // init exports
        module.exports = module['./lib.nedb.js'] = local;
        local.__dirname = __dirname;
        local.NODE_ENV = process.env.NODE_ENV;
        break;
    }
}());
