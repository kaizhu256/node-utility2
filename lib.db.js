/*
 * assets.db-lite.js
 *
 * this zero-dependency package will provide a persistent, in-browser database
 *
 * browser example:
 *     <script src="assets.db-lite.js"></script>
 *     <script>
 *     var dbTable1;
 *     dbTable1 = window.dbTable1 = window.utility2_db.dbTableCreateOne({ name: "dbTable1" });
 *     dbTable1.idIndexCreate({ name: "field1" });
 *     dbTable1.crudSetOneById({ field1: "hello", field2: "world" });
 *     console.log(dbTable1.crudGetManyByQuery({
 *         limit: Infinity,
 *         query: { field1: "hello" },
 *         skip: 0,
 *         sort: [{ fieldName: 'field1', isDescending: false }]
 *     }));
 *     </script>
 *
 * node example:
 *     var db, dbTable1;
 *     utility2_db = require("./assets.db-lite.js");
 *     dbTable1 = global.dbTable1 = utility2_db.dbTableCreateOne({ name: "dbTable1" });
 *     dbTable1.idIndexCreate({ name: "field1" });
 *     dbTable1.crudSetOneById({ field1: "hello", field2: "world" });
 *     console.log(dbTable1.crudGetManyByQuery({
 *         limit: Infinity,
 *         query: { field1: "hello" },
 *         skip: 0,
 *         sort: [{ fieldName: 'field1', isDescending: false }]
 *     }));
 */



/* istanbul instrument in package db-lite */
/*jslint
    bitwise: true,
    browser: true,
    maxerr: 8,
    maxlen: 96,
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
        local = {};
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
        // init utility2_rollup
        local = local.global.utility2_rollup || local;
        // init lib
        local.local = local.db = local;
    }());



    /* istanbul ignore next */
    // run shared js-env code - pre-function
    (function () {
        local.jsonCopy = function (arg) {
        /*
         * this function will return a deep-copy of the JSON-arg
         */
            return arg === undefined
                ? undefined
                : JSON.parse(JSON.stringify(arg));
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

        local.normalizeDict = function (dict) {
        /*
         * this function will normalize the dict
         */
            return dict && typeof dict === 'object' && !Array.isArray(dict)
                ? dict
                : {};
        };

        local.normalizeList = function (list) {
        /*
         * this function will normalize the list
         */
            return Array.isArray(list)
                ? list
                : [];
        };

        local.objectSetOverride = function (arg, overrides, depth) {
        /*
         * this function will recursively set overrides for items the arg
         */
            arg = arg || {};
            overrides = overrides || {};
            Object.keys(overrides).forEach(function (key) {
                var arg2, overrides2;
                arg2 = arg[key];
                overrides2 = overrides[key];
                if (overrides2 === undefined) {
                    return;
                }
                // if both arg2 and overrides2 are non-null and non-array objects,
                // then recurse with arg2 and overrides2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        (arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2)) &&
                        // overrides2 is a non-null and non-array object
                        (overrides2 &&
                        typeof overrides2 === 'object' &&
                        !Array.isArray(overrides2))) {
                    local.objectSetOverride(arg2, overrides2, depth - 1);
                    return;
                }
                // else set arg[key] with overrides[key]
                arg[key] = arg === local.env
                    // if arg is env, then overrides falsey value with empty string
                    ? overrides2 || ''
                    : overrides2;
            });
            return arg;
        };

        local.onErrorDefault = function (error) {
        /*
         * this function will if error exists, then print error.stack to stderr
         */
            if (error && !local.global.__coverage__) {
                console.error(error.stack);
            }
        };

        local.onErrorWithStack = function (onError) {
        /*
         * this function will return a new callback that will call onError,
         * and append the current stack to any error
         */
            var stack;
            stack = new Error().stack.replace((/(.*?)\n.*?$/m), '$1');
            return function (error, data, meta) {
                if (error &&
                        error !== local.errorDefault &&
                        String(error.stack).indexOf(stack.split('\n')[2]) < 0) {
                    // append the current stack to error.stack
                    error.stack += '\n' + stack;
                }
                onError(error, data, meta);
            };
        };

        local.onParallel = function (onError, onDebug) {
        /*
         * this function will return a function that will
         * 1. run async tasks in parallel
         * 2. if counter === 0 or error occurred, then call onError with error
         */
            var self;
            onError = local.onErrorWithStack(onError);
            onDebug = onDebug || local.nop;
            self = function (error) {
                onDebug(error, self);
                // if previously counter === 0 or error occurred, then return
                if (self.counter === 0 || self.error) {
                    return;
                }
                // handle error
                if (error) {
                    self.error = error;
                    // ensure counter will decrement to 0
                    self.counter = 1;
                }
                // decrement counter
                self.counter -= 1;
                // if counter === 0, then call onError with error
                if (self.counter === 0) {
                    onError(error);
                }
            };
            // init counter
            self.counter = 0;
            // return callback
            return self;
        };
    }());



    // run shared js-env code - lib.storage.js
    (function (local) {
        var child_process,
            clear,
            defer,
            deferList,
            fs,
            getItem,
            init,
            keys,
            length,
            modeJs,
            os,
            removeItem,
            setItem,
            storage,
            storageDir;

        // init modeJs
        modeJs = (function () {
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
        storageDir = 'tmp/storage.' + (local.modeJs === 'browser'
            ? 'undefined'
            : process.env.NODE_ENV);
        switch (modeJs) {
        case 'node':
            // require modules
            child_process = require('child_process');
            fs = require('fs');
            os = require('os');
            break;
        }

        clear = function (onError) {
        /*
         * this function will clear storage
         */
            defer({ action: 'clear' }, onError);
        };

        defer = function (options, onError) {
        /*
         * this function will defer options.action until storage is ready
         */
            var data, done, objectStore, onError2, request, tmp;
            onError = onError || function (error) {
                // validate no error occurred
                console.assert(!error, error);
            };
            if (!storage) {
                deferList.push(function () {
                    defer(options, onError);
                });
                init();
                return;
            }
            switch (modeJs) {
            case 'browser':
                onError2 = function () {
                    /* istanbul ignore next */
                    if (done) {
                        return;
                    }
                    done = true;
                    onError(
                        request && (request.error || request.transaction.error),
                        data || request.result || ''
                    );
                };
                switch (options.action) {
                case 'clear':
                case 'removeItem':
                case 'setItem':
                    objectStore = storage
                        .transaction(storageDir, 'readwrite')
                        .objectStore(storageDir);
                    break;
                default:
                    objectStore = storage
                        .transaction(storageDir, 'readonly')
                        .objectStore(storageDir);
                }
                switch (options.action) {
                case 'clear':
                    request = objectStore.clear();
                    break;
                case 'getItem':
                    request = objectStore.get(String(options.key));
                    break;
                case 'keys':
                    data = [];
                    request = objectStore.openCursor();
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
                    request = objectStore.count();
                    break;
                case 'removeItem':
                    request = objectStore.delete(String(options.key));
                    break;
                case 'setItem':
                    request = objectStore.put(options.value, String(options.key));
                    break;
                }
                ['onabort', 'onerror', 'onsuccess'].forEach(function (handler) {
                    request[handler] = request[handler] || onError2;
                });
                // debug request
                local._debugStorageRequest = request;
                break;
            case 'node':
                switch (options.action) {
                case 'clear':
                    child_process.spawnSync(
                        'sh',
                        ['-c', 'rm -f ' + storage + '/*'],
                        { stdio: ['ignore', 1, 2] }
                    );
                    setTimeout(onError);
                    break;
                case 'getItem':
                    fs.readFile(
                        storage + '/' + encodeURIComponent(String(options.key)),
                        'utf8',
                        // ignore error
                        function (error, data) {
                            onError(error && null, data || '');
                        }
                    );
                    break;
                case 'keys':
                    fs.readdir(storage, function (error, data) {
                        onError(error, data && data.map(decodeURIComponent));
                    });
                    break;
                case 'length':
                    fs.readdir(storage, function (error, data) {
                        onError(error, data && data.length);
                    });
                    break;
                case 'removeItem':
                    fs.unlink(
                        storage + '/' + encodeURIComponent(String(options.key)),
                        // ignore error
                        function () {
                            onError();
                        }
                    );
                    break;
                case 'setItem':
                    tmp = os.tmpdir() + '/' + Date.now() + Math.random();
                    // save to tmp
                    fs.writeFile(tmp, options.value, function (error) {
                        // validate no error occurred
                        console.assert(!error, error);
                        // rename tmp to key
                        fs.rename(
                            tmp,
                            storage + '/' + encodeURIComponent(String(options.key)),
                            onError
                        );
                    });
                    break;
                }
                break;
            }
        };

        deferList = [];

        getItem = function (key, onError) {
        /*
         * this function will get the item with the given key from storage
         */
            defer({ action: 'getItem', key: key }, onError);
        };

        init = function () {
        /*
         * this function will init storage
         */
            var onError, request;
            onError = function (error) {
                // validate no error occurred
                console.assert(!error, error);
                if (modeJs === 'browser') {
                    storage = window[storageDir];
                }
                while (deferList.length) {
                    deferList.shift()();
                }
            };
            if (modeJs === 'browser') {
                storage = window[storageDir];
            }
            if (storage) {
                onError();
                return;
            }
            switch (modeJs) {
            case 'browser':
                // init indexedDB
                try {
                    request = window.indexedDB.open(storageDir);
                    // debug request
                    local._debugStorageRequestIndexedDB = request;
                    request.onerror = onError;
                    request.onsuccess = function () {
                        window[storageDir] = request.result;
                        onError();
                    };
                    request.onupgradeneeded = function () {
                        if (!request.result.objectStoreNames.contains(storageDir)) {
                            request.result.createObjectStore(storageDir);
                        }
                    };
                } catch (ignore) {
                }
                break;
            case 'node':
                // mkdirp storage
                storage = storageDir;
                child_process.spawnSync(
                    'mkdir',
                    ['-p', storage],
                    { stdio: ['ignore', 1, 2] }
                );
                onError();
                break;
            }
        };

        keys = function (onError) {
        /*
         * this function will get all the keys in storage
         */
            defer({ action: 'keys' }, onError);
        };

        length = function (onError) {
        /*
         * this function will get the number of items in storage
         */
            defer({ action: 'length' }, onError);
        };

        removeItem = function (key, onError) {
        /*
         * this function will remove the item with the given key from storage
         */
            defer({ action: 'removeItem', key: key }, onError);
        };

        setItem = function (key, value, onError) {
        /*
         * this function will set the item with the given key and value to storage
         */
            defer({ action: 'setItem', key: key, value: value }, onError);
        };

        // init local
        local.storage = storage;
        local.storageClear = clear;
        local.storageDefer = defer;
        local.storageDeferList = deferList;
        local.storageDir = storageDir;
        local.storageGetItem = getItem;
        local.storageInit = init;
        local.storageKeys = keys;
        local.storageLength = length;
        local.storageRemoveItem = removeItem;
        local.storageSetItem = setItem;
    }(local));



    // run shared js-env code - lib.dbTable.js
    (function () {
        local._DbTable = function (options) {
        /*
         * this function will create a dbTable
         */
            options = local.normalizeDict(options);
            this.name = String(options.name);
            // register dbTable in dbTableDict
            local.dbTableDict[this.name] = this;
            this.dbRowCount = 0;
            this.dbRowList = [];
            this.isDirty = null;
            this.idIndexList = [{ name: '_id', dict: {} }];
        };

        local._DbTable.prototype._cleanup = function () {
        /*
         * this function will cleanup soft-deleted records from the dbTable
         */
            var self, tmp;
            self = this;
            if (!self.isDirty) {
                return;
            }
            self.isDirty = null;
            // cleanup dbRowList
            self.dbRowList = self.dbRowList.filter(function (dbRow) {
                return !dbRow.$meta.isRemoved;
            });
            // cleanup idIndexList
            self.idIndexList.forEach(function (dict, ii) {
                tmp = dict.dict;
                dict = self.idIndexList[ii].dict = {};
                Object.keys(tmp).forEach(function (id) {
                    if (!tmp[id].$meta.isRemoved) {
                        dict[id] = tmp[id];
                    }
                });
            });
        };

        local._DbTable.prototype._crudGetManyByQuery = function (query) {
        /*
         * this function will get the dbRow's in the dbTable with the given query
         */
            this._cleanup();
            return local.dbRowListGetManyByQuery(this.dbRowList, local.normalizeDict(query));
        };

        local._DbTable.prototype._crudGetOneById = function (idDict) {
        /*
         * this function will get the dbRow in the dbTable with the given idDict
         */
            var id, result, self;
            self = this;
            idDict = local.normalizeDict(idDict);
            result = null;
            self.idIndexList.some(function (idIndex) {
                id = idDict[idIndex.name];
                // optimization - hasOwnProperty
                if (idIndex.dict.hasOwnProperty(id)) {
                    result = idIndex.dict[id];
                    result = result.$meta.isRemoved
                        ? null
                        : result;
                    return result;
                }
            });
            return result;
        };

        local._DbTable.prototype._crudRemoveOneById = function (idDict) {
        /*
         * this function will remove the dbRow from the dbTable with the given idDict
         */
            var existing, id, result, self;
            self = this;
            idDict = local.normalizeDict(idDict);
            result = null;
            self.idIndexList.forEach(function (idIndex) {
                id = idDict[idIndex.name];
                // optimization - hasOwnProperty
                if (idIndex.dict.hasOwnProperty(id)) {
                    existing = idIndex.dict[id];
                    if (!existing.$meta.isRemoved) {
                        result = result || existing;
                        // decrement dbRowCount
                        self.dbRowCount -= 1;
                        // optimization - soft-delete
                        existing.$meta.isRemoved = true;
                        self.isDirty = true;
                        // recurse
                        self._crudRemoveOneById(existing);
                    }
                }
            });
            // persist
            self._persist();
            return result;
        };

        local._DbTable.prototype._crudSetOneById = function (dbRow) {
        /*
         * this function will set the dbRow into the dbTable with the given dbRow._id
         * WARNING - existing dbRow with conflicting dbRow._id will be removed
         */
            var existing, id, normalize, timeNow, self;
            self = this;
            normalize = function (dbRow) {
            /*
             * this function will recursively normalize dbRow
             */
                if (dbRow && typeof dbRow === 'object') {
                    Object.keys(dbRow).forEach(function (key) {
                        // remove invalid property
                        if (key[0] === '$' || key.indexOf('.') >= 0 || dbRow[key] === null) {
                            // optimization - soft-delete
                            dbRow[key] = undefined;
                            return;
                        }
                        // recurse
                        normalize(dbRow[key]);
                    });
                }
            };
            dbRow = local.jsonCopy(dbRow && typeof dbRow === 'object'
                ? dbRow
                : {});
            // update timestamp
            timeNow = new Date().toISOString();
            dbRow._timeCreated = dbRow._timeCreated || timeNow;
            dbRow._timeUpdated = timeNow;
            // normalize
            normalize(dbRow);
            dbRow = local.jsonCopy(dbRow);
            // remove existing dbRow
            existing = self._crudRemoveOneById(dbRow) || dbRow;
            // init meta
            dbRow.$meta = {};
            // increment dbRowCount
            self.dbRowCount += 1;
            self.idIndexList.forEach(function (idIndex) {
                // auto-set id
                id = local.dbRowSetId(existing, idIndex);
                // copy id from existing to dbRow
                dbRow[idIndex.name] = id;
                // set dbRow
                idIndex.dict[id] = dbRow;
            });
            // update dbRowList
            self.dbRowList.push(dbRow);
            // persist
            self._persist();
            return dbRow;
        };

        local._DbTable.prototype._crudUpdateOneById = function (dbRow) {
        /*
         * this function will update the dbRow in the dbTable,
         * if it exists with the given dbRow._id
         * WARNING
         * existing dbRow's with conflicting unique-keys (besides the one being updated)
         * will be removed
         */
            var id, result, self;
            self = this;
            dbRow = local.jsonCopy(local.normalizeDict(dbRow));
            result = null;
            self.idIndexList.some(function (idIndex) {
                id = dbRow[idIndex.name];
                // optimization - hasOwnProperty
                if (idIndex.dict.hasOwnProperty(id)) {
                    result = idIndex.dict[id];
                    result = result.$meta.isRemoved
                        ? null
                        : result;
                    if (result) {
                        // remove existing dbRow
                        self._crudRemoveOneById(result);
                        // update dbRow
                        dbRow._timeCreated = undefined;
                        result = local.objectSetOverride(result, dbRow, Infinity);
                        return true;
                    }
                }
            });
            if (result) {
                // replace dbRow
                result = self._crudSetOneById(result);
            }
            return result;
        };

        local._DbTable.prototype._persist = function () {
        /*
         * this function will persist the dbTable to storage
         */
            var self;
            self = this;
            // throttle storage-writes to once every 1000 ms
            if (self.timerPersist) {
                return;
            }
            self.timerPersist = setTimeout(function () {
                if (self.timerPersist) {
                    self.timerPersist = null;
                    self._save();
                }
            }, 1000);
        };

        local._DbTable.prototype._save = function (onError) {
        /*
         * this function will save the dbTable to storage
         */
            local.storageSetItem('dbTable.' + this.name, this.export(), onError);
        };

        local.dbCrudRemoveAll = function (onError) {
        /*
         * this function will remove all dbRow's from the db
         */
            var onParallel;
            onParallel = local.onParallel(function (error) {
                local.setTimeoutOnError(onError, error);
            });
            onParallel.counter += 1;
            Object.keys(local.dbTableDict).forEach(function (key) {
                onParallel.counter += 1;
                local.dbTableDict[key].crudRemoveAll(onParallel);
            });
            onParallel();
        };

        local._DbTable.prototype.crudCountAll = function (onError) {
        /*
         * this function will count all of dbRow's in the dbTable
         */
            return local.setTimeoutOnError(onError, null, this.dbRowCount);
        };

        local._DbTable.prototype.crudCountManyByQuery = function (query, onError) {
        /*
         * this function will count the number of dbRow's in the dbTable with the given query
         */
            return local.setTimeoutOnError(
                onError,
                null,
                this._crudGetManyByQuery(query).length
            );
        };

        local._DbTable.prototype.crudGetManyById = function (idDictList, onError) {
        /*
         * this function will get the dbRow's in the dbTable with the given idDictList
         */
            var self;
            self = this;
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                local.normalizeList(idDictList).map(function (idDict) {
                    return self._crudGetOneById(idDict);
                })
            ));
        };

        local._DbTable.prototype.crudGetManyByQuery = function (options, onError) {
        /*
         * this function will get the dbRow's in the dbTable with the given options.query
         */
            var result;
            options = local.normalizeDict(options);
            // get dbRow's with the given options.query
            result = this._crudGetManyByQuery(options.query);
            // sort dbRow's with the given options.sort
            local.normalizeList(options.sort).forEach(function (element) {
                if (element.isDescending) {
                    result.sort(function (aa, bb) {
                        return -local.sortCompare(
                            local.dbRowGetItem(aa, element.fieldName),
                            local.dbRowGetItem(bb, element.fieldName)
                        );
                    });
                } else {
                    result.sort(function (aa, bb) {
                        return local.sortCompare(
                            local.dbRowGetItem(aa, element.fieldName),
                            local.dbRowGetItem(bb, element.fieldName)
                        );
                    });
                }
            });
            // skip and limit dbRow's with the given options.skip and options.limit
            result = result.slice(
                options.skip || 0,
                (options.skip || 0) + (options.limit || Infinity)
            );
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                result,
                options.projection
            ));
        };

        local._DbTable.prototype.crudGetOneById = function (idDict, onError) {
        /*
         * this function will get the dbRow in the dbTable with the given idDict
         */
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                this._crudGetOneById(idDict)
            ));
        };

        local._DbTable.prototype.crudGetOneByQuery = function (query, onError) {
        /*
         * this function will get the dbRow in the dbTable with the given query
         */
            var result, self;
            self = this;
            self._cleanup();
            self.dbRowList.some(function (dbRow) {
                result = local.dbRowListGetManyByQuery([dbRow], query)[0];
                return result;
            });
            return local.setTimeoutOnError(onError, null, local.dbRowProject(result));
        };

        local._DbTable.prototype.crudRemoveAll = function (onError) {
        /*
         * this function will remove all of the dbRow's from the dbTable
         */
            var idIndexList;
            // save idIndexList
            idIndexList = this.idIndexList;
            // reset dbTable
            local._DbTable.call(this, this);
            // restore idIndexList
            local.dbTableCreateOne({
                name: this.name,
                idIndexCreateList: idIndexList
            }, onError);
        };

        local._DbTable.prototype.crudRemoveManyById = function (idDictList, onError) {
        /*
         * this function will remove the dbRow's from the dbTable with the given idDictList
         */
            var self;
            self = this;
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                local.normalizeList(idDictList).map(function (dbRow) {
                    return self._crudRemoveOneById(dbRow);
                })
            ));
        };

        local._DbTable.prototype.crudRemoveManyByQuery = function (query, onError) {
        /*
         * this function will remove the dbRow's from the dbTable with the given query
         */
            var self;
            self = this;
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                self._crudGetManyByQuery(query).map(function (dbRow) {
                    return self._crudRemoveOneById(dbRow);
                })
            ));
        };

        local._DbTable.prototype.crudRemoveOneById = function (idDict, onError) {
        /*
         * this function will remove the dbRow from the dbTable with the given idDict
         */
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                this._crudRemoveOneById(idDict)
            ));
        };

        local._DbTable.prototype.crudSetManyById = function (dbRowList, onError) {
        /*
         * this function will set the dbRowList into the dbTable
         */
            var self;
            self = this;
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                local.normalizeList(dbRowList).map(function (dbRow) {
                    return self._crudSetOneById(dbRow);
                })
            ));
        };

        local._DbTable.prototype.crudSetOneById = function (dbRow, onError) {
        /*
         * this function will set the dbRow into the dbTable with the given dbRow._id
         */
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                this._crudSetOneById(dbRow)
            ));
        };

        local._DbTable.prototype.crudUpdateManyById = function (dbRowList, onError) {
        /*
         * this function will update the dbRowList in the dbTable,
         * if they exist with the given dbRow._id's
         */
            var self;
            self = this;
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                local.normalizeList(dbRowList).map(function (dbRow) {
                    return self._crudUpdateOneById(dbRow);
                })
            ));
        };

        local._DbTable.prototype.crudUpdateManyByQuery = function (query, dbRow, onError) {
        /*
         * this function will update the dbRow's in the dbTable with the given query
         */
            var result, self, tmp;
            self = this;
            tmp = local.jsonCopy(local.normalizeDict(dbRow));
            result = self._crudGetManyByQuery(query).map(function (dbRow) {
                tmp._id = dbRow._id;
                return self._crudUpdateOneById(tmp);
            });
            return local.setTimeoutOnError(onError, null, result);
        };

        local._DbTable.prototype.crudUpdateOneById = function (dbRow, onError) {
        /*
         * this function will update the dbRow in the dbTable,
         * if it exists with the given dbRow._id
         */
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                this._crudUpdateOneById(dbRow)
            ));
        };

        local._DbTable.prototype.drop = function (onError) {
        /*
         * this function will drop the dbTable
         */
            console.error('dropping dbTable ' + this.name + ' ...');
            // reset dbTable
            local._DbTable.call(this, this);
            // cancel pending persist
            this.timerPersist = null;
            // clear persistence
            local.storageRemoveItem('dbTable.' + this.name, onError);
        };

        local._DbTable.prototype.export = function (onError) {
        /*
         * this function will export the db
         */
            var result, self;
            self = this;
            self._cleanup();
            result = '';
            self.idIndexList.forEach(function (idIndex) {
                result += self.name + ' idIndexCreate ' + JSON.stringify({
                    isInteger: idIndex.isInteger,
                    name: idIndex.name
                }) + '\n';
            });
            self.dbRowList.forEach(function (dbRow) {
                result += self.name + ' dbRowSet ' +
                    JSON.stringify(local.dbRowProject(dbRow)) + '\n';
            });
            return local.setTimeoutOnError(onError, null, result.trim());
        };

        local._DbTable.prototype.idIndexCreate = function (options, onError) {
        /*
         * this function will create an idIndex with the given options.name
         */
            var idIndex, name, self;
            self = this;
            options = local.normalizeDict(options);
            name = String(options.name);
            // disallow idIndex with dot-name
            if (name.indexOf('.') >= 0 || name === '_id') {
                return local.setTimeoutOnError(onError);
            }
            // remove existing idIndex
            self.idIndexRemove(options);
            // init idIndex
            idIndex = {
                dict: {},
                isInteger: options.isInteger,
                name: options.name
            };
            self.idIndexList.push(idIndex);
            Object.keys(self.idIndexList[0].dict).forEach(function (dbRow) {
                dbRow = self.idIndexList[0].dict[dbRow];
                // auto-set id
                if (!dbRow.$meta.isRemoved) {
                    idIndex.dict[local.dbRowSetId(dbRow, idIndex)] = dbRow;
                }
            });
            // persist
            self._persist();
            return local.setTimeoutOnError(onError);
        };

        local._DbTable.prototype.idIndexRemove = function (options, onError) {
        /*
         * this function will remove the idIndex with the given options.name
         */
            var name, self;
            self = this;
            options = local.normalizeDict(options);
            name = String(options.name);
            self.idIndexList = self.idIndexList.filter(function (idIndex) {
                return idIndex.name !== name || idIndex.name === '_id';
            });
            // persist
            self._persist();
            return local.setTimeoutOnError(onError);
        };

        local.dbDrop = function (onError) {
        /*
         * this function will drop the db
         */
            var onParallel;
            onParallel = local.onParallel(function (error) {
                local.setTimeoutOnError(onError, error);
            });
            onParallel.counter += 1;
            local.storageClear(onParallel);
            Object.keys(local.dbTableDict).forEach(function (key) {
                onParallel.counter += 1;
                local.dbTableDict[key].drop(onParallel);
            });
            onParallel();
        };

        local.dbExport = function (onError) {
        /*
         * this function will export the db as serialized text
         */
            var result;
            result = '';
            Object.keys(local.dbTableDict).forEach(function (key) {
                result += local.dbTableDict[key].export();
                result += '\n\n';
            });
            return local.setTimeoutOnError(onError, null, result.trim());
        };

        local.dbImport = function (text, onError) {
        /*
         * this function will import the serialized text into the db
         */
            var dbTable;
            text.replace((/^(\w\S*?) (\S+?) (\S+?)$/gm), function (
                match0,
                match1,
                match2,
                match3
            ) {
                try {
                    // jslint-hack
                    local.nop(match0);
                    switch (match2) {
                    case 'dbRowSet':
                        dbTable = local.dbTableCreateOne({ isLoaded: true, name: match1 });
                        dbTable.crudSetOneById(JSON.parse(match3));
                        break;
                    case 'idIndexCreate':
                        dbTable = local.dbTableCreateOne({ isLoaded: true, name: match1 });
                        dbTable.idIndexCreate(JSON.parse(match3));
                        break;
                    default:
                        throw new Error('dbImport - invalid operation - ' + match0);
                    }
                } catch (errorCaught) {
                    local.onErrorDefault(errorCaught);
                }
            });
            return local.setTimeoutOnError(onError);
        };

        local.dbLoad = function (onError) {
        /*
         * this function will load the db from storage
         */
            var onParallel;
            onParallel = local.onParallel(function (error) {
                local.setTimeoutOnError(onError, error);
            });
            local.storageKeys(function (error, data) {
                onParallel.counter += 1;
                onParallel.counter += 1;
                onParallel(error);
                local.normalizeList(data)
                    .filter(function (key) {
                        return key.indexOf('dbTable.') === 0;
                    })
                    .forEach(function (key) {
                        onParallel.counter += 1;
                        local.storageGetItem(key, function (error, data) {
                            onParallel.counter += 1;
                            onParallel(error);
                            local.dbImport(data, onParallel);
                        });
                    });
                onParallel();
            });
        };

        local.dbRowGetItem = function (dbRow, key) {
        /*
         * this function will get the item with the given key from dbRow
         */
            var ii, value;
            value = dbRow;
            key = String(key).split('.');
            // optimization - for-loop
            for (ii = 0; ii < key.length && value && typeof value === 'object'; ii += 1) {
                value = value[key[ii]];
            }
            return value === undefined
                ? null
                : value;
        };

        local.dbRowListGetManyByOperator = function (dbRowList, fieldName, operator, bb) {
        /*
         * this function will get the dbRow's in dbRowList with the given operator
         */
            var ii, jj, result, fieldValue, test, typeof2;
            result = [];
            typeof2 = typeof bb;
            if (bb && typeof2 === 'object') {
                switch (operator) {
                case '$in':
                case '$nin':
                case '$regex':
                    break;
                default:
                    return result;
                }
            }
            switch (operator) {
            case '$eq':
                test = function (aa, bb) {
                    return aa === bb;
                };
                break;
            case '$exists':
                bb = !bb;
                test = function (aa, bb) {
                    return !((aa === null) ^ bb);
                };
                break;
            case '$gt':
                test = function (aa, bb, typeof1, typeof2) {
                    return typeof1 === typeof2 && aa > bb;
                };
                break;
            case '$gte':
                test = function (aa, bb, typeof1, typeof2) {
                    return typeof1 === typeof2 && aa >= bb;
                };
                break;
            case '$in':
                if (bb && typeof bb.indexOf === 'function') {
                    if (typeof2 === 'string') {
                        test = function (aa, bb, typeof1, typeof2) {
                            return typeof1 === typeof2 && bb.indexOf(aa) >= 0;
                        };
                    } else {
                        test = function (aa, bb) {
                            return bb.indexOf(aa) >= 0;
                        };
                    }
                }
                break;
            case '$lt':
                test = function (aa, bb, typeof1, typeof2) {
                    return typeof1 === typeof2 && aa < bb;
                };
                break;
            case '$lte':
                test = function (aa, bb, typeof1, typeof2) {
                    return typeof1 === typeof2 && aa <= bb;
                };
                break;
            case '$ne':
                test = function (aa, bb) {
                    return aa !== bb;
                };
                break;
            case '$nin':
                if (bb && typeof bb.indexOf === 'function') {
                    if (typeof2 === 'string') {
                        test = function (aa, bb, typeof1, typeof2) {
                            return typeof1 === typeof2 && bb.indexOf(aa) < 0;
                        };
                    } else {
                        test = function (aa, bb) {
                            return bb.indexOf(aa) < 0;
                        };
                    }
                }
                break;
            case '$regex':
                if (bb && typeof bb.test === 'function') {
                    test = function (aa, bb) {
                        return bb.test(aa);
                    };
                }
                break;
            case '$typeof':
                test = function (aa, bb, typeof1) {
                    // jslint-hack
                    local.nop(aa);
                    return typeof1 === bb;
                };
                break;
            }
            if (!test) {
                return result;
            }
            // optimization - for-loop
            for (ii = dbRowList.length - 1; ii >= 0; ii -= 1) {
                fieldValue = local.dbRowGetItem(dbRowList[ii], fieldName);
                // normalize to list
                if (!Array.isArray(fieldValue)) {
                    fieldValue = [fieldValue];
                }
                // optimization - for-loop
                for (jj = fieldValue.length - 1; jj >= 0; jj -= 1) {
                    if (test(fieldValue[jj], bb, typeof fieldValue[jj], typeof2)) {
                        result.push(dbRowList[ii]);
                        break;
                    }
                }
            }
            return result;
        };

        local.dbRowListGetManyByQuery = function (dbRowList, query, fieldName) {
        /*
         * this function will get the dbRow's in dbRowList with the given query
         */
            var bb, dbRowDict, result;
            result = dbRowList;
            if (!result.length) {
                return result;
            }
            if (!(query && typeof query === 'object')) {
                result = local.dbRowListGetManyByOperator(result, fieldName, '$eq', query);
                return result;
            }
            Object.keys(query).some(function (key) {
                bb = query[key];
                if (key === '$or' && Array.isArray(bb)) {
                    dbRowDict = {};
                    bb.forEach(function (query) {
                        // recurse
                        local.dbRowListGetManyByQuery(result, query).forEach(function (dbRow) {
                            dbRowDict[dbRow._id] = dbRow;
                        });
                    });
                    result = Object.keys(dbRowDict).map(function (id) {
                        return dbRowDict[id];
                    });
                    return !result.length;
                }
                if (key[0] === '$') {
                    result = local.dbRowListGetManyByOperator(result, fieldName, key, bb);
                    return !result.length;
                }
                // recurse
                result = local.dbRowListGetManyByQuery(result, bb, key);
                return !result.length;
            });
            return result;
        };

        local.dbRowProject = function (dbRow, projection) {
        /*
         * this function will project and deepcopy the dbRow
         */
            var result;
            if (!dbRow) {
                return null;
            }
            // handle list-case
            if (Array.isArray(dbRow)) {
                return dbRow.map(function (dbRow) {
                    // recurse
                    return local.dbRowProject(dbRow, projection);
                });
            }
            // normalize to list
            if (!(Array.isArray(projection) && projection.length)) {
                projection = Object.keys(dbRow);
            }
            result = {};
            projection.forEach(function (key) {
                if (key[0] !== '$') {
                    result[key] = dbRow[key];
                }
            });
            return local.jsonCopy(result);
        };

        local.dbRowSetId = function (dbRow, idIndex) {
        /*
         * this function will set a random and unique id into dbRow for the given idIndex,
         * if it does not exist
         */
            var id;
            id = dbRow[idIndex.name];
            if (typeof id !== 'number' && typeof id !== 'string') {
                do {
                    id = Math.floor(Math.random() * 0x1ffffffffffffe);
                    if (!idIndex.isInteger) {
                        id = 's' + ('00000000000' + id.toString(36)).slice(-11);
                    }
                // optimization - hasOwnProperty
                } while (idIndex.dict.hasOwnProperty(id));
                dbRow[idIndex.name] = id;
            }
            return id;
        };

        local.dbSave = function (onError) {
        /*
         * this function will save the db to storage
         */
            var onParallel;
            onParallel = local.onParallel(function (error) {
                local.setTimeoutOnError(onError, error);
            });
            onParallel.counter += 1;
            Object.keys(local.dbTableDict).forEach(function (key) {
                onParallel.counter += 1;
                local.dbTableDict[key]._save(onParallel);
            });
            onParallel();
        };

        local.dbTableCreateMany = function (optionsList, onError) {
        /*
         * this function will set the optionsList into the db
         */
            var onParallel, result;
            onParallel = local.onParallel(function (error) {
                local.setTimeoutOnError(onError, error, result);
            });
            onParallel.counter += 1;
            result = local.normalizeList(optionsList).map(function (options) {
                onParallel.counter += 1;
                return local.dbTableCreateOne(options, onParallel);
            });
            return local.setTimeoutOnError(onParallel, null, result);
        };

        local.dbTableCreateOne = function (options, onError) {
        /*
         * this function will create a dbTable with the given options
         */
            var self;
            options = local.normalizeDict(options);
            // register dbTable
            self = local.dbTableDict[options.name] =
                local.dbTableDict[options.name] || new local._DbTable(options);
            // remove idIndex
            local.normalizeList(options.idIndexRemoveList).forEach(function (index) {
                self.idIndexRemove(index);
            });
            // create idIndex
            local.normalizeList(options.idIndexCreateList).forEach(function (index) {
                self.idIndexCreate(index);
            });
            // upsert dbRow
            self.crudSetManyById(options.dbRowList);
            self.isLoaded = self.isLoaded || options.isLoaded;
            if (!self.isLoaded) {
                local.storageGetItem('dbTable.' + self.name, function (error, data) {
                    // validate no error occurred
                    console.assert(!error, error);
                    if (!self.isLoaded) {
                        local.dbImport(data);
                    }
                    self.isLoaded = true;
                    local.setTimeoutOnError(onError, null, self);
                });
                return self;
            }
            return local.setTimeoutOnError(onError, null, self);
        };

        local.dbTableDict = {};

        local.setTimeoutOnError = function (onError, error, data) {
        /*
         * this function will asynchronously call onError
         */
            if (typeof onError === 'function') {
                setTimeout(function () {
                    onError(error, data);
                });
            }
            return data;
        };

        local.sortCompare = function (aa, bb) {
        /*
         * this function will compare aa vs bb and return:
         * -1 if aa < bb
         *  0 if aa === bb
         *  1 if aa > bb
         * the priority for comparing different typeof's is:
         * null < boolean < number < string < object < undefined
         */
            var typeof1, typeof2;
            if (aa === bb) {
                return 0;
            }
            if (aa === null) {
                return -1;
            }
            if (bb === null) {
                return 1;
            }
            typeof1 = typeof aa;
            typeof2 = typeof bb;
            if (typeof1 === typeof2) {
                return typeof1 === 'object'
                    ? 0
                    : aa > bb
                    ? 1
                    : -1;
            }
            if (typeof1 === 'boolean') {
                return -1;
            }
            if (typeof2 === 'boolean') {
                return 1;
            }
            if (typeof1 === 'number') {
                return -1;
            }
            if (typeof2 === 'number') {
                return 1;
            }
            if (typeof1 === 'string') {
                return -1;
            }
            if (typeof2 === 'string') {
                return 1;
            }
            return 0;
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init exports
        local.global.utility2_db = local;
        break;



    // run node js-env code - post-init
    case 'node':
        // require modules
        local.fs = require('fs');
        // init exports
        module.exports = module['./lib.db.js'] = local;
        local.__dirname = __dirname;
        break;
    }
}());
