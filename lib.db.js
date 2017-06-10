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



/* istanbul instrument in package db */
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



    // run shared js-env code - init-before
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
        // init exports
        if (local.modeJs === 'browser') {
            local.global.utility2_db = local;
        } else {
            module.exports = local;
            module.exports.__dirname = __dirname;
            module.exports.module = module;
        }
    }());



    // run shared js-env code - function-before
    /* istanbul ignore next */
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
                            // recurse
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
                            // recurse
                            tmp = stringify(element[key]);
                            if (typeof tmp === 'string') {
                                return JSON.stringify(key) + ':' + tmp;
                            }
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
                // recurse
                ? JSON.parse(stringify(element))
                : element, replacer, space);
        };

        local.listShuffle = function (list) {
        /*
         * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
         * this function will inplace shuffle the list, via fisher-yates algorithm
         */
            var ii, random, swap;
            for (ii = list.length - 1; ii > 0; ii -= 1) {
                // coerce to finite integer
                random = (Math.random() * (ii + 1)) | 0;
                swap = list[ii];
                list[ii] = list[random];
                list[random] = swap;
            }
            return list;
        };

        local.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };

        local.normalizeValue = function (type, value, valueDefault) {
        /*
         * this function will normalize the value by type
         */
            switch (type) {
            case 'dict':
                return value && typeof value === 'object' && !Array.isArray(value)
                    ? value
                    : valueDefault || {};
            case 'list':
                return Array.isArray(value)
                    ? value
                    : valueDefault || [];
            case 'number':
                return Number(value) || valueDefault || 0;
            case 'string':
                return typeof value === 'string'
                    ? value
                    : valueDefault || '';
            }
        };

        local.objectSetOverride = function (arg, overrides, depth, env) {
        /*
         * this function will recursively set overrides for items in the arg
         */
            arg = arg || {};
            env = env || (typeof process === 'object' && process.env) || {};
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
                    local.objectSetOverride(arg2, overrides2, depth - 1, env);
                    return;
                }
                // else set arg[key] with overrides[key]
                arg[key] = arg === env
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
                console.error(error);
            }
        };

        local.onErrorWithStack = function (onError) {
        /*
         * this function will create a new callback that will call onError,
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

        local.onParallel = function (onError, onEach, onRetry) {
        /*
         * this function will create a function that will
         * 1. run async tasks in parallel
         * 2. if counter === 0 or error occurred, then call onError with error
         */
            var onParallel;
            onError = local.onErrorWithStack(onError);
            onEach = onEach || local.nop;
            onRetry = onRetry || local.nop;
            onParallel = function (error, data) {
                if (onRetry(error, data)) {
                    return;
                }
                // decrement counter
                onParallel.counter -= 1;
                // validate counter
                console.assert(onParallel.counter >= 0 || error || onParallel.error);
                // ensure onError is run only once
                if (onParallel.counter < 0) {
                    return;
                }
                // handle error
                if (error) {
                    onParallel.error = error;
                    // ensure counter <= 0
                    onParallel.counter = -Math.abs(onParallel.counter);
                }
                // call onError when isDone
                if (onParallel.counter <= 0) {
                    onError(error, data);
                    return;
                }
                onEach();
            };
            // init counter
            onParallel.counter = 0;
            // return callback
            return onParallel;
        };

        local.setTimeoutOnError = function (onError, error, data) {
        /*
         * this function will async-call onError
         */
            if (typeof onError === 'function') {
                setTimeout(function () {
                    onError(error, data);
                });
            }
            return data;
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
            var data, isDone, objectStore, onError2, request, tmp;
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
                    if (isDone) {
                        return;
                    }
                    isDone = true;
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
            options = local.normalizeValue('dict', options);
            this.name = String(options.name);
            // register dbTable in dbTableDict
            local.dbTableDict[this.name] = this;
            this.dbRowList = [];
            this.isDirty = null;
            this.idIndexList = [{ name: '_id', dict: {} }];
            this.onSaveList = [];
            this.sizeLimit = options.sizeLimit || 0;
        };

        local._DbTable.prototype._cleanup = function () {
        /*
         * this function will cleanup soft-deleted records from the dbTable
         */
            var dbRow, ii, list;
            if (!this.isDirty && this.dbRowList.length <= this.sizeLimit) {
                return;
            }
            this.isDirty = null;
            // cleanup dbRowList
            list = this.dbRowList;
            this.dbRowList = [];
            // optimization - for-loop
            for (ii = 0; ii < list.length; ii += 1) {
                dbRow = list[ii];
                // cleanup isRemoved
                if (!dbRow.$meta.isRemoved) {
                    this.dbRowList.push(dbRow);
                }
            }
            if (this.sizeLimit && this.dbRowList.length >= 1.5 * this.sizeLimit) {
                this.dbRowList = this._crudGetManyByQuery(
                    {},
                    this.sortDefault,
                    0,
                    this.sizeLimit
                );
            }
        };

        local._DbTable.prototype._crudGetManyByQuery = function (
            query,
            sort,
            skip,
            limit,
            shuffle
        ) {
        /*
         * this function will get the dbRow's in the dbTable,
         * with the given query, sort, skip, and limit
         */
            var ii, result;
            result = this.dbRowList;
            // get by query
            if (result.length && query && Object.keys(query).length) {
                result = local.dbRowListGetManyByQuery(this.dbRowList, query);
            }
            // sort
            local.normalizeValue('list', sort).forEach(function (element) {
                // bug-workaround - v8 does not have stable-sort
                // optimization - for-loop
                for (ii = 0; ii < result.length; ii += 1) {
                    result[ii].$meta.ii = ii;
                }
                if (element.isDescending) {
                    result.sort(function (aa, bb) {
                        return -local.sortCompare(
                            local.dbRowGetItem(aa, element.fieldName),
                            local.dbRowGetItem(bb, element.fieldName),
                            aa.$meta.ii,
                            bb.$meta.ii
                        );
                    });
                } else {
                    result.sort(function (aa, bb) {
                        return local.sortCompare(
                            local.dbRowGetItem(aa, element.fieldName),
                            local.dbRowGetItem(bb, element.fieldName),
                            aa.$meta.ii,
                            bb.$meta.ii
                        );
                    });
                }
            });
            // skip
            result = result.slice(skip || 0);
            // shuffle
            ((shuffle && local.listShuffle) || local.nop)(result);
            // limit
            result = result.slice(0, limit || Infinity);
            return result;
        };

        local._DbTable.prototype._crudGetOneById = function (idDict) {
        /*
         * this function will get the dbRow in the dbTable with the given idDict
         */
            var id, result;
            idDict = local.normalizeValue('dict', idDict);
            result = null;
            this.idIndexList.some(function (idIndex) {
                id = idDict[idIndex.name];
                // optimization - hasOwnProperty
                if (idIndex.dict.hasOwnProperty(id)) {
                    result = idIndex.dict[id];
                    return result;
                }
            });
            return result;
        };

        local._DbTable.prototype._crudRemoveOneById = function (idDict, circularList) {
        /*
         * this function will remove the dbRow from the dbTable with the given idDict
         */
            var id, result, self;
            if (!idDict) {
                return null;
            }
            self = this;
            circularList = circularList || [idDict];
            result = null;
            self.idIndexList.forEach(function (idIndex) {
                id = idDict[idIndex.name];
                // optimization - hasOwnProperty
                if (!idIndex.dict.hasOwnProperty(id)) {
                    return;
                }
                result = idIndex.dict[id];
                delete idIndex.dict[id];
                // optimization - soft-delete
                result.$meta.isRemoved = true;
                self.isDirty = true;
                if (circularList.indexOf(result) >= 0) {
                    return;
                }
                circularList.push(result);
                // recurse
                self._crudRemoveOneById(result, circularList);
            });
            self.save();
            return result;
        };

        local._DbTable.prototype._crudSetOneById = function (dbRow) {
        /*
         * this function will set the dbRow into the dbTable with the given dbRow._id
         * WARNING - existing dbRow with conflicting dbRow._id will be removed
         */
            var existing, id, normalize, timeNow;
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
            if (!local.modeImport) {
                dbRow._timeUpdated = timeNow;
            }
            // normalize
            normalize(dbRow);
            dbRow = local.jsonCopy(dbRow);
            // remove existing dbRow
            existing = this._crudRemoveOneById(dbRow) || dbRow;
            // init meta
            dbRow.$meta = { isRemoved: null };
            this.idIndexList.forEach(function (idIndex) {
                // auto-set id
                id = local.dbRowSetId(existing, idIndex);
                // copy id from existing to dbRow
                dbRow[idIndex.name] = id;
                // set dbRow
                idIndex.dict[id] = dbRow;
            });
            // update dbRowList
            this.dbRowList.push(dbRow);
            this.save();
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
            var id, result;
            dbRow = local.jsonCopy(local.normalizeValue('dict', dbRow));
            result = null;
            this.idIndexList.some(function (idIndex) {
                id = dbRow[idIndex.name];
                // optimization - hasOwnProperty
                if (idIndex.dict.hasOwnProperty(id)) {
                    result = idIndex.dict[id];
                    return true;
                }
            });
            result = result || {};
            // remove existing dbRow
            this._crudRemoveOneById(result);
            // update dbRow
            dbRow._timeCreated = undefined;
            local.objectSetOverride(result, dbRow, Infinity);
            // replace dbRow
            result = this._crudSetOneById(result);
            return result;
        };

        local._DbTable.prototype.crudCountAll = function (onError) {
        /*
         * this function will count all of dbRow's in the dbTable
         */
            this._cleanup();
            return local.setTimeoutOnError(onError, null, this.dbRowList.length);
        };

        local._DbTable.prototype.crudCountManyByQuery = function (query, onError) {
        /*
         * this function will count the number of dbRow's in the dbTable with the given query
         */
            this._cleanup();
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
            this._cleanup();
            self = this;
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                local.normalizeValue('list', idDictList).map(function (idDict) {
                    return self._crudGetOneById(idDict);
                })
            ));
        };

        local._DbTable.prototype.crudGetManyByQuery = function (options, onError) {
        /*
         * this function will get the dbRow's in the dbTable with the given options.query
         */
            this._cleanup();
            options = local.normalizeValue('dict', options);
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                this._crudGetManyByQuery(
                    options.query,
                    options.sort || this.sortDefault,
                    options.skip,
                    options.limit,
                    options.shuffle
                ),
                options.fieldList
            ));
        };

        local._DbTable.prototype.crudGetOneById = function (idDict, onError) {
        /*
         * this function will get the dbRow in the dbTable with the given idDict
         */
            this._cleanup();
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                this._crudGetOneById(idDict)
            ));
        };

        local._DbTable.prototype.crudGetOneByQuery = function (query, onError) {
        /*
         * this function will get the dbRow in the dbTable with the given query
         */
            var ii, result;
            this._cleanup();
            // optimization - for-loop
            for (ii = 0; ii < this.dbRowList.length; ii += 1) {
                result = local.dbRowListGetManyByQuery([this.dbRowList[ii]], query)[0];
                if (result) {
                    break;
                }
            }
            return local.setTimeoutOnError(onError, null, local.dbRowProject(result));
        };

        local._DbTable.prototype.crudGetOneByRandom = function (onError) {
        /*
         * this function will get a random dbRow in the dbTable
         */
            this._cleanup();
            return local.setTimeoutOnError(onError, null, local.dbRowProject(
                this.dbRowList[Math.floor(Math.random() * this.dbRowList.length)]
            ));
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
                local.normalizeValue('list', idDictList).map(function (dbRow) {
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
                local.normalizeValue('list', dbRowList).map(function (dbRow) {
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
                local.normalizeValue('list', dbRowList).map(function (dbRow) {
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
            tmp = local.jsonCopy(local.normalizeValue('dict', dbRow));
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
            // cancel pending save
            this.timerSave = null;
            while (this.onSaveList.length) {
                this.onSaveList.shift()();
            }
            // reset dbTable
            local._DbTable.call(this, this);
            // clear persistence
            local.storageRemoveItem('dbTable.' + this.name, onError);
        };

        local._DbTable.prototype.export = function (onError) {
        /*
         * this function will export the db
         */
            var result, self;
            this._cleanup();
            self = this;
            result = '';
            self.idIndexList.forEach(function (idIndex) {
                result += self.name + ' idIndexCreate ' + JSON.stringify({
                    isInteger: idIndex.isInteger,
                    name: idIndex.name
                }) + '\n';
            });
            result += self.name + ' sizeLimit ' + self.sizeLimit + '\n';
            result += self.name + ' sortDefault ' + JSON.stringify(self.sortDefault) + '\n';
            self.crudGetManyByQuery({}).forEach(function (dbRow) {
                result += self.name + ' dbRowSet ' + JSON.stringify(dbRow) + '\n';
            });
            return local.setTimeoutOnError(onError, null, result.trim());
        };

        local._DbTable.prototype.idIndexCreate = function (options, onError) {
        /*
         * this function will create an idIndex with the given options.name
         */
            var dbRow, idIndex, ii, name;
            options = local.normalizeValue('dict', options);
            name = String(options.name);
            // disallow idIndex with dot-name
            if (name.indexOf('.') >= 0 || name === '_id') {
                return local.setTimeoutOnError(onError);
            }
            // remove existing idIndex
            this.idIndexRemove(options);
            // init idIndex
            idIndex = {
                dict: {},
                isInteger: options.isInteger,
                name: options.name
            };
            this.idIndexList.push(idIndex);
            // populate idIndex with dbRowList
            // optimization - for-loop
            for (ii = 0; ii < this.dbRowList.length; ii += 1) {
                dbRow = this.dbRowList[ii];
                // auto-set id
                if (!dbRow.$meta.isRemoved) {
                    idIndex.dict[local.dbRowSetId(dbRow, idIndex)] = dbRow;
                }
            }
            this.save();
            return local.setTimeoutOnError(onError);
        };

        local._DbTable.prototype.idIndexRemove = function (options, onError) {
        /*
         * this function will remove the idIndex with the given options.name
         */
            var name;
            options = local.normalizeValue('dict', options);
            name = String(options.name);
            this.idIndexList = this.idIndexList.filter(function (idIndex) {
                return idIndex.name !== name || idIndex.name === '_id';
            });
            this.save();
            return local.setTimeoutOnError(onError);
        };

        local._DbTable.prototype.save = function (onError) {
        /*
         * this function will save the dbTable to storage
         */
            var self;
            self = this;
            if (local.modeImport) {
                return;
            }
            if (onError) {
                self.onSaveList.push(onError);
            }
            // throttle storage-writes to once every 1000 ms
            self.timerSave = self.timerSave || setTimeout(function () {
                self.timerSave = null;
                local.storageSetItem('dbTable.' + self.name + '.json', self.export(), function (
                    error
                ) {
                    while (self.onSaveList.length) {
                        self.onSaveList.shift()(error);
                    }
                });
            }, 1000);
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

        local.dbDrop = function (onError) {
        /*
         * this function will drop the db
         */
            var onParallel;
            onParallel = local.onParallel(function (error) {
                local.setTimeoutOnError(onError, error);
            });
            onParallel.counter += 1;
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
            local.modeImport = true;
            setTimeout(function () {
                local.modeImport = null;
            });
            text.replace((/^(\w\S*?) (\S+?) (\S.*?)$/gm), function (
                match0,
                match1,
                match2,
                match3
            ) {
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
                case 'sizeLimit':
                    dbTable = local.dbTableCreateOne({ isLoaded: true, name: match1 });
                    dbTable.sizeLimit = JSON.parse(match3);
                    break;
                case 'sortDefault':
                    dbTable = local.dbTableCreateOne({ isLoaded: true, name: match1 });
                    break;
                default:
                    local.onErrorDefault(new Error('dbImport - invalid operation - ' + match0));
                }
            });
            local.modeImport = null;
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
                local.normalizeValue('list', data)
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

        local.dbRowListGetManyByOperator = function (dbRowList, fieldName, operator, bb, not) {
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
                    if (not ^ test(fieldValue[jj], bb, typeof fieldValue[jj], typeof2)) {
                        result.push(dbRowList[ii]);
                        break;
                    }
                }
            }
            return result;
        };

        local.dbRowListGetManyByQuery = function (dbRowList, query, fieldName, not) {
        /*
         * this function will get the dbRow's in dbRowList with the given query
         */
            var bb, dbRowDict, result;
            // optimization - convert to boolean
            not = !!not;
            result = dbRowList;
            if (!(query && typeof query === 'object')) {
                result = local.dbRowListGetManyByOperator(result, fieldName, '$eq', query, not);
                return result;
            }
            Object.keys(query).some(function (key) {
                bb = query[key];
                switch (key) {
                case '$not':
                    key = fieldName;
                    not = !not;
                    break;
                case '$or':
                    if (!Array.isArray(bb)) {
                        break;
                    }
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
                    result = local.dbRowListGetManyByOperator(result, fieldName, key, bb, not);
                    return !result.length;
                }
                // recurse
                result = local.dbRowListGetManyByQuery(result, bb, key, not);
                return !result.length;
            });
            return result;
        };

        local.dbRowProject = function (dbRow, fieldList) {
        /*
         * this function will deepcopy and project the dbRow with the given fieldList
         */
            var result;
            if (!dbRow) {
                return null;
            }
            // handle list-case
            if (Array.isArray(dbRow)) {
                return dbRow.map(function (dbRow) {
                    // recurse
                    return local.dbRowProject(dbRow, fieldList);
                });
            }
            // normalize to list
            if (!(Array.isArray(fieldList) && fieldList.length)) {
                fieldList = Object.keys(dbRow);
            }
            result = {};
            fieldList.forEach(function (key) {
                if (key[0] !== '$') {
                    result[key] = dbRow[key];
                }
            });
            return JSON.parse(local.jsonStringifyOrdered(result));
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
                    id = idIndex.isInteger
                        ? (1 + Math.random()) * 0x10000000000000
                        : 'a' + ((1 + Math.random()) * 0x10000000000000).toString(36).slice(1);
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
                local.dbTableDict[key].save(onParallel);
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
            result = local.normalizeValue('list', optionsList).map(function (options) {
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
            options = local.normalizeValue('dict', options);
            // register dbTable
            self = local.dbTableDict[options.name] =
                local.dbTableDict[options.name] || new local._DbTable(options);
            self.sortDefault = options.sortDefault ||
                self.sortDefault ||
                [{ fieldName: '_timeUpdated', isDescending: true }];
            // remove idIndex
            local.normalizeValue('list', options.idIndexRemoveList).forEach(function (index) {
                self.idIndexRemove(index);
            });
            // create idIndex
            local.normalizeValue('list', options.idIndexCreateList).forEach(function (index) {
                self.idIndexCreate(index);
            });
            // upsert dbRow
            self.crudSetManyById(options.dbRowList);
            self.isLoaded = self.isLoaded || options.isLoaded;
            if (!self.isLoaded) {
                local.storageGetItem('dbTable.' + self.name + '.json', function (error, data) {
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

        local.sortCompare = function (aa, bb, ii, jj) {
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
                return ii < jj
                    ? -1
                    : 1;
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



    // run node js-env code - init-after
    case 'node':
        // require modules
        local.fs = require('fs');
        break;
    }
}());
