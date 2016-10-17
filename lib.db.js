/*
 * assets.db-lite.js
 *
 * this package will run a standalone, browser-compatible version of the db v1.8.0 database
 * with zero npm-dependencies
 *
 * browser example:
 *     <script src="assets.db-lite.js"></script>
 *     <script>
 *     var dbTable1 = window.db_lite.dbTableCreate({ name: "dbTable1" });
 *     dbTable1.crudInsertMany([{ field1: 'hello', field2: 'world'}], console.log.bind(console));
 *     </script>
 *
 * node example:
 *     var db = require('./assets.db-lite.js');
 *     var dbTable1 = window.db_lite.dbTableCreate({ name: "dbTable1" });
 *     dbTable1.crudInsertMany([{ field1: 'hello', field2: 'world'}], console.log.bind(console));
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
        local.db = {};
        local.db.local = local;
    }());



    // run shared js-env code - function
    (function () {
        local.db.assert = function (passed, message) {
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

        local.db.dbClear = function (onError) {
        /*
         * this function will clear db and its persistence
         */
            Object.keys(local.db.dbTableDict).forEach(function (key) {
                // clear dbTable
                local.db.dbTableDict[key].dbTableClear();
            });
            // clear persistence
            local.db.dbStorageClear(onError);
        };

        local.db.dbExport = function () {
        /*
         * this function will export db as a serialized dbTableList
         */
            var data;
            data = '';
            Object.keys(local.db.dbTableDict).forEach(function (key) {
                data += local.db.dbTableDict[key].dbTableExport() + '\n\n\n\n';
            });
            return data.slice(0, -2);
        };

        local.db.dbImport = function (dbTableList) {
        /*
         * this function will import the serialized dbTableList
         */
            dbTableList.trim().split('\n\n\n\n').forEach(function (dbTable) {
                local.db.dbTableCreate({
                    imported: true,
                    name: JSON.parse((/"name":("[^"].*?")/).exec(dbTable)[1])
                }).dbTableImport(dbTable);
            });
        };

        local.db.dbStorageClear = function (onError) {
        /*
         * this function will clear dbStorage
         */
            local.db.dbStorageDefer({ action: 'clear' }, onError);
        };

        local.db.dbStorageDefer = function (options, onError) {
        /*
         * this function will defer options.action until dbStorage is ready
         */
            var data, done, objectStore, onError2, request, tmp;
            if (!local.db.dbStorage) {
                local.db.dbStorageDeferList.push(function () {
                    local.db.dbStorageDefer(options, onError);
                });
                return;
            }
            switch (local.modeJs) {
            case 'browser':
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
                    objectStore = local.db.dbStorage
                        .transaction('db', 'readwrite')
                        .objectStore('db');
                    break;
                default:
                    objectStore = local.db.dbStorage
                        .transaction('db', 'readonly')
                        .objectStore('db');
                }
                switch (options.action) {
                case 'clear':
                    request = objectStore.clear();
                    break;
                case 'getItem':
                    request = objectStore.get(options.key);
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
                    request = objectStore.delete(options.key);
                    break;
                case 'setItem':
                    request = objectStore.put(options.value, options.key);
                    break;
                }
                ['onabort', 'onerror', 'onsuccess'].forEach(function (handler) {
                    request[handler] = request[handler] || onError2;
                });
                // debug request
                local.db._debugDbStorageRequest = request;
                break;
            case 'node':
                switch (options.action) {
                case 'clear':
                    local.child_process.spawn('sh', ['-c', 'rm ' + local.db.dbStorage + '/*'], {
                        stdio: ['ignore', 1, 2]
                    }).once('exit', function () {
                        onError();
                    });
                    break;
                case 'getItem':
                    local.db.assert(typeof options.key === 'string', options.key);
                    local.fs.readFile(
                        local.db.dbStorage + '/' + encodeURIComponent(options.key),
                        'utf8',
                        // ignore error
                        function () {
                            onError();
                        }
                    );
                    break;
                case 'keys':
                    local.fs.readdir(local.db.dbStorage, function (error, data) {
                        onError(error, data && data.map(decodeURIComponent));
                    });
                    break;
                case 'length':
                    local.fs.readdir(local.db.dbStorage, function (error, data) {
                        onError(error, data && data.length);
                    });
                    break;
                case 'removeItem':
                    local.db.assert(typeof options.key === 'string', options.key);
                    local.fs.unlink(
                        local.db.dbStorage + '/' + encodeURIComponent(options.key),
                        // ignore error
                        function () {
                            onError();
                        }
                    );
                    break;
                case 'setItem':
                    local.db.assert(typeof options.key === 'string', options.key);
                    local.db.assert(typeof options.value === 'string', options.value);
                    tmp = local.os.tmpdir() + '/' + Date.now() + Math.random();
                    // save to tmp
                    local.fs.writeFile(tmp, options.value, function (error) {
                        // validate no error occurred
                        local.db.assert(!error, error);
                        // rename tmp to key
                        local.fs.rename(
                            tmp,
                            local.db.dbStorage + '/' + encodeURIComponent(options.key),
                            onError
                        );
                    });
                    break;
                }
                break;
            }
        };

        local.db.dbStorageDeferList = [];

        local.db.dbStorageGetItem = function (key, onError) {
        /*
         * this function will get the item with the given key from dbStorage
         */
            local.db.assert(typeof key === 'string');
            local.db.dbStorageDefer({ action: 'getItem', key: key }, onError);
        };

        local.db.dbStorageInit = function () {
        /*
         * this function will init dbStorage
         */
            var options, request;
            options = {};
            local.db.onNext(options, function (error) {
                // validate no error occurred
                local.db.assert(!error, error);
                if (local.modeJs === 'browser') {
                    local.db.dbStorage = local.global.db_storage;
                }
                switch (options.modeNext) {
                case 1:
                    if (local.db.dbStorage) {
                        options.onNext();
                        return;
                    }
                    switch (local.modeJs) {
                    case 'browser':
                        // init indexedDB
                        try {
                            request = local.global.indexedDB.open('db');
                            request.onerror = options.onNext;
                            request.onsuccess = function () {
                                local.global.db_storage = request.result;
                                options.onNext();
                            };
                            request.onupgradeneeded = function () {
                                if (!request.result.objectStoreNames.contains('db')) {
                                    request.result.createObjectStore('db');
                                }
                            };
                        } catch (ignore) {
                        }
                        break;
                    case 'node':
                        // mkdirp dbStorage
                        local.db.dbStorage = 'tmp/db.persistence.' + local.db.NODE_ENV;
                        local.child_process.spawnSync('mkdir', ['-p', local.db.dbStorage], {
                            stdio: ['ignore', 1, 2]
                        });
                        options.onNext();
                        break;
                    }
                    break;
                // run deferred actions
                case 2:
                    while (local.db.dbStorageDeferList.length) {
                        local.db.dbStorageDeferList.shift()();
                    }
                    break;
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.db.dbStorageKeys = function (onError) {
        /*
         * this function will get all the keys in dbStorage
         */
            local.db.dbStorageDefer({ action: 'keys' }, onError);
        };

        local.db.dbStorageLength = function (onError) {
        /*
         * this function will get the number of items in dbStorage
         */
            local.db.dbStorageDefer({ action: 'length' }, onError);
        };

        local.db.dbStorageRemoveItem = function (key, onError) {
        /*
         * this function will remove the item with the given key from dbStorage
         */
            local.db.assert(typeof key === 'string');
            local.db.dbStorageDefer({ action: 'removeItem', key: key }, onError);
        };

        local.db.dbStorageSetItem = function (key, value, onError) {
        /*
         * this function will set the item with the given key and value to dbStorage
         */
            local.db.assert(typeof key === 'string');
            local.db.assert(typeof value === 'string');
            local.db.dbStorageDefer({ action: 'setItem', key: key, value: value }, onError);
        };

        local.db.dbTableCreate = function (options, onError) {
        /*
         * this function will create a dbTable with the given options
         */
            var self;
            options = local.db.objectSetDefault({}, options);
            local.db.onNext(options, function (error, data) {
                switch (options.modeNext) {
                case 1:
                    self = local.db.dbTableDict[options.name] =
                        local.db.dbTableDict[options.name] || new local.db._DbTable(options);
                    // import persistence
                    if (!self.imported) {
                        local.db.dbStorageGetItem(self.name, options.onNext);
                        return;
                    }
                    options.onNext();
                    break;
                default:
                    // validate no error occurred
                    local.db.assert(!error, error);
                    if (!self.imported) {
                        self.dbTableImport(data);
                    }
                    if (onError) {
                        onError(error, self);
                    }
                }
            });
            options.modeNext = 0;
            options.onNext();
            return self;
        };

        local.db.dbTableDict = {};

        local.db.isNullOrUndefined = function (arg) {
        /*
         * this function will test if the arg is null or undefined
         */
            return arg === null || arg === undefined;
        };

        local.db.jsonCopy = function (arg) {
        /*
         * this function will return a deep-copy of the JSON-arg
         */
            return arg === undefined
                ? undefined
                : JSON.parse(JSON.stringify(arg));
        };

        local.db.jsonStringifyOrdered = function (element, replacer, space) {
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

        local.db.nop = function () {
        /*
         * this function will do nothing
         */
            return;
        };

        local.db.objectSetDefault = function (arg, defaults, depth) {
        /*
         * this function will recursively set defaults for undefined-items in the arg
         */
            arg = arg || {};
            defaults = defaults || {};
            Object.keys(defaults).forEach(function (key) {
                var arg2, defaults2;
                arg2 = arg[key];
                defaults2 = defaults[key];
                if (defaults2 === undefined) {
                    return;
                }
                // init arg[key] to default value defaults[key]
                if (!arg2) {
                    arg[key] = defaults2;
                    return;
                }
                // if arg2 and defaults2 are both non-null and non-array objects,
                // then recurse with arg2 and defaults2
                if (depth > 1 &&
                        // arg2 is a non-null and non-array object
                        arg2 &&
                        typeof arg2 === 'object' &&
                        !Array.isArray(arg2) &&
                        // defaults2 is a non-null and non-array object
                        defaults2 &&
                        typeof defaults2 === 'object' &&
                        !Array.isArray(defaults2)) {
                    local.db.objectSetDefault(arg2, defaults2, depth - 1);
                }
            });
            return arg;
        };

        local.db.onErrorDefault = function (error) {
        /*
         * this function will print error.stack or error.message to stderr
         */
            // if error is defined, then print error.stack
            if (error && !local.global.__coverage__) {
                console.error('\nonErrorDefault - error\n' +
                    error.message + '\n' + error.stack + '\n');
            }
        };

        local.db.onNext = function (options, onError) {
        /*
         * this function will wrap onError inside the recursive function options.onNext,
         * and append the current stack to any error
         */
            options.onNext = function (error, data, meta) {
                try {
                    options.modeNext = error
                        ? Infinity
                        : options.modeNext + 1;
                    onError(error, data, meta);
                } catch (errorCaught) {
                    // throw errorCaught to break infinite recursion-loop
                    if (options.errorCaught) {
                        throw options.errorCaught;
                    }
                    options.errorCaught = errorCaught;
                    options.onNext(errorCaught, data, meta);
                }
            };
            return options;
        };

        local.db.onParallel = function (onError, onDebug) {
        /*
         * this function will return a function that will
         * 1. run async tasks in parallel
         * 2. if counter === 0 or error occurred, then call onError with error
         */
            var self;
            onDebug = onDebug || local.db.nop;
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

        local.db.queryCompare = function (operator, aa, bb) {
        /*
         * this function will query-compare aa vs bb
         */
            return local.db.tryCatchOnError(function () {
                switch (operator) {
                case '$elemMatch':
                    // If match for array element, return true
                    return (Array.isArray(aa)
                        ? aa
                        : []).some(function (element) {
                        return local.db.queryMatch(element, bb);
                    });
                case '$eq':
                    return local.db.sortCompare(aa, bb) === 0;
                case '$exists':
                    return !((!aa) ^ (!bb));
                case '$gt':
                    return local.db.sortCompare(aa, bb) > 0;
                case '$gte':
                    return local.db.sortCompare(aa, bb) >= 0;
                case '$in':
                    return Array.isArray(bb) && bb.some(function (cc) {
                        return local.db.sortCompare(aa, cc) === 0;
                    });
                case '$lt':
                    return local.db.sortCompare(aa, bb) < 0;
                case '$lte':
                    return local.db.sortCompare(aa, bb) <= 0;
                case '$ne':
                    return local.db.sortCompare(aa, bb) !== 0;
                case '$nin':
                    return Array.isArray(bb) && bb.every(function (cc) {
                        return local.db.sortCompare(aa, cc) !== 0;
                    });
                case '$regex':
                    return bb.test(aa);
                case '$size':
                    return (Array.isArray(aa) && aa.length === bb);
                default:
                    return false;
                }
            }, function (error) {
                local.db.onErrorDefault(error);
                return false;
            });
        };

        local.db.sortCompare = function (aa, bb) {
        /*
         * this function will sort-compare aa vs bb
         */
            var type1, type2;
            if (aa === undefined) {
                aa = null;
            }
            if (bb === undefined) {
                bb = null;
            }
            // compare equal
            if (aa === bb) {
                return 0;
            }
            // reverse compare null
            if (aa === null) {
                return 1;
            }
            if (bb === null) {
                return -1;
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

        local.db.tryCatchOnError = function (fnc, onError) {
        /*
         * this function will try to run the fnc in a try-catch block,
         * else call onError with the errorCaught
         */
            try {
                local.db._debugTryCatchErrorCaught = null;
                return fnc();
            } catch (errorCaught) {
                local.db._debugTryCatchErrorCaught = errorCaught;
                return onError(errorCaught);
            }
        };

        // legacy
        local.db.isRegExp = function (obj) {
            return Object.prototype.toString.call(obj) === '[object RegExp]';
        };
        local.db.listUnique = function (list) {
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



// init lib db
// https://github.com
// /louischatriot/db/blob/cadf4ef434e517e47c4e9ca1db5b89e892ff5981/browser-version/out/db.js
    (function () {
        var modifierFunctions = {},
            lastStepModifierFunctions = {},
            logicalOperators = {};

        function checkKey(key, value) {
        /*
         * Check a key, throw an error if the key is non valid
         * @param {String} key
         * @param {Model} value, needed to treat the Date edge case
         * Non-treatable edge cases here:
         * if part of the object if of the form { $$date: number } or { $$deleted: true }
         * Its serialized-then-deserialized version it will transformed into a Date object
         * But you really need to want it to trigger such behaviour,
         *    even when warned not to use '$' at the beginning of the field names...
         */
            if (typeof key === 'number') {
                key = key.toString();
            }

            if (key[0] === '$' &&
                    !(key === '$$date' &&
                    typeof value === 'number') &&
                    !(key === '$$deleted' && value === true) &&
                    !(key === '$$indexCreated') &&
                    !(key === '$$indexRemoved')) {
                throw new Error('Field names cannot begin with the $ character');
            }

            if (key.indexOf('.') !== -1) {
                throw new Error('Field names cannot contain a .');
            }
        }
        local.db.dbRowValidate = function (dbRow) {
        /*
         * Check a DB object and throw an error if it's not valid
         * Works by applying the above checkKey function to all fields recursively
         */
            if (Array.isArray(dbRow)) {
                dbRow.forEach(function (element) {
                    local.db.dbRowValidate(element);
                });
            }
            if (dbRow && typeof dbRow === 'object') {
                Object.keys(dbRow).forEach(function (key) {
                    checkKey(key, dbRow[key]);
                    local.db.dbRowValidate(dbRow[key]);
                });
            }
        };
        local.db.dbRowDeepCopy = function (obj, strictKeys) {
        /*
         * Deep copy a DB object
         * The optional strictKeys flag (defaulting to false)
         * indicates whether to copy everything or only fields
         * where the keys are valid, i.e. don't begin with $ and don't contain a .
         */
            var res;

            if (typeof obj === 'boolean' ||
                    typeof obj === 'number' ||
                    typeof obj === 'string' ||
                    obj === null) {
                return obj;
            }

            if (Array.isArray(obj)) {
                res = [];
                obj.forEach(function (o) {
                    res.push(local.db.dbRowDeepCopy(o, strictKeys));
                });
                return res;
            }

            if (typeof obj === 'object') {
                res = {};
                Object.keys(obj).forEach(function (key) {
                    if (!strictKeys || (key[0] !== '$' && key.indexOf('.') === -1)) {
                        res[key] = local.db.dbRowDeepCopy(obj[key], strictKeys);
                    }
                });
                return res;
            }

            // For now everything else is undefined. We should probably throw an error instead
            return undefined;
        };
        // ==============================================================
        // Updating dbRow's
        // ==============================================================

        /*
         * The signature of modifier functions is as follows
         * Their structure is always the same:
         * recursively follow the dot notation while creating
         * the nested dbRow's if needed, then apply the 'last step modifier'
         * @param {Object} obj The model to modify
         * @param {String} field Can contain dots,
         * in that case that means we will set a subfield recursively
         * @param {Model} value
         */

        lastStepModifierFunctions.$set = function (obj, field, value) {
        /*
         * Set a field to a new value
         */
            obj[field] = value;
        };
        lastStepModifierFunctions.$unset = function (obj, field) {
        /*
         * Unset a field
         */
            delete obj[field];
        };
        lastStepModifierFunctions.$push = function (obj, field, value) {
        /*
         * Push an element to the end of an array field
         * Optional modifier $each instead of value to push several values
         * Optional modifier $slice to slice the resulting array,
         * see https://docs.mongodb.org/manual/reference/operator/update/slice/
         * Différeence with MongoDB:
         * if $slice is specified and not $each, we act as if value is an empty array
         */
            // Create the array if it doesn't exist
            if (!obj.hasOwnProperty(field)) {
                obj[field] = [];
            }

            if (!Array.isArray(obj[field])) {
                throw new Error("Can't $push an element on non-array values");
            }

            if (value !== null &&
                    typeof value === 'object' &&
                    value.$slice &&
                    value.$each === undefined) {
                value.$each = [];
            }

            if (value !== null && typeof value === 'object' && value.$each) {
                if (Object.keys(value).length >= 3 ||
                        (Object.keys(value).length === 2 &&
                        value.$slice === undefined)) {
                    throw new Error(
                        'Can only use $slice in cunjunction with $each when $push to array'
                    );
                }
                if (!Array.isArray(value.$each)) {
                    throw new Error('$each requires an array value');
                }

                value.$each.forEach(function (value) {
                    obj[field].push(value);
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
        lastStepModifierFunctions.$addToSet = function (obj, field, value) {
        /*
         * Add an element to an array field only if it is not already in it
         * No modification if the element is already in the array
         * Note that it doesn't check whether the original array contains duplicates
         */
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
                    throw new Error('$each requires an array value');
                }

                value.$each.forEach(function (value) {
                    lastStepModifierFunctions.$addToSet(obj, field, value);
                });
            } else {
                obj[field].forEach(function (value) {
                    if (local.db.sortCompare(value, value) === 0) {
                        addToSet = false;
                    }
                });
                if (addToSet) {
                    obj[field].push(value);
                }
            }
        };
        lastStepModifierFunctions.$pop = function (obj, field, value) {
        /*
         * Remove the first or last element of an array
         */
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
        lastStepModifierFunctions.$pull = function (obj, field, value) {
        /*
         * Removes all instances of a value from an existing array
         */
            var arr, ii;

            if (!Array.isArray(obj[field])) {
                throw new Error("Can't $pull an element from non-array values");
            }

            arr = obj[field];
            for (ii = arr.length - 1; ii >= 0; ii -= 1) {
                if (local.db.queryMatch(arr[ii], value)) {
                    arr.splice(ii, 1);
                }
            }
        };
        lastStepModifierFunctions.$inc = function (obj, field, value) {
        /*
         * Increment a numeric field's value
         */
            if (typeof value !== 'number') {
                throw new Error(value + ' must be a number');
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

        lastStepModifierFunctions.$max = function (obj, field, value) {
        /*
         * Updates the value of the field,
         * only if specified field is greater than the current value of the field
         */
            if (obj[field] === undefined) {
                obj[field] = value;
            } else if (value > obj[field]) {
                obj[field] = value;
            }
        };

        lastStepModifierFunctions.$min = function (obj, field, value) {
        /*
         * Updates the value of the field,
         * only if specified field is smaller than the current value of the field
         */
            if (obj[field] === undefined) {
                obj[field] = value;
            } else if (value < obj[field]) {
                obj[field] = value;
            }
        };

        // Given its name, create the complete modifier function
        function createModifierFunction(modifier) {
            return function (obj, field, value) {
                var fieldParts = typeof field === 'string' ? field.split('.') : field;

                if (fieldParts.length === 1) {
                    lastStepModifierFunctions[modifier](obj, field, value);
                } else {
                    if (obj[fieldParts[0]] === undefined) {
                        // Bad looking specific fix,
                        // needs to be generalized modifiers
                        // that behave like $unset are implemented
                        if (modifier === '$unset') {
                            return;
                        }
                        obj[fieldParts[0]] = {};
                    }
                    modifierFunctions[modifier](
                        obj[fieldParts[0]],
                        fieldParts.slice(1),
                        value
                    );
                }
            };
        }

        // Actually create all modifier functions
        Object.keys(lastStepModifierFunctions).forEach(function (modifier) {
            modifierFunctions[modifier] = createModifierFunction(modifier);
        });
        local.db.dbRowModify = function (obj, updateQuery) {
        /*
         * Modify a DB object according to an update query
         */
            var keys, dollarFirstChars, firstChars, modifiers, newDoc;
            keys = Object.keys(updateQuery);
            firstChars = keys.map(function (item) {
                return item[0];
            });
            dollarFirstChars = firstChars.filter(function (cc) {
                return cc === '$';
            });

            if (keys.indexOf('_id') !== -1 && updateQuery._id !== obj._id) {
                throw new Error("You cannot change a dbRow's _id");
            }

            if (dollarFirstChars.length !== 0 &&
                    dollarFirstChars.length !== firstChars.length) {
                throw new Error('You cannot mix modifiers and normal fields');
            }

            if (dollarFirstChars.length === 0) {
                // Simply replace the object with the update query contents
                newDoc = local.db.jsonCopy(updateQuery);
                newDoc._id = obj._id;
            } else {
                // Apply modifiers
                modifiers = local.db.listUnique(keys);
                newDoc = local.db.jsonCopy(obj);
                modifiers.forEach(function (m) {

                    if (!modifierFunctions[m]) {
                        throw new Error('Unknown modifier ' + m);
                    }

                    // Can't rely on Object.keys throwing on non objects since ES6
                    // Not 100% satisfying as non objects can be interpreted as objects
                    // but no false negatives so we can live with it
                    if (typeof updateQuery[m] !== 'object') {
                        throw new Error('Modifier ' + m + "'s argument must be an object");
                    }

                    Object.keys(updateQuery[m]).forEach(function (key) {
                        modifierFunctions[m](newDoc, key, updateQuery[m][key]);
                    });
                });
            }

            // Check result is valid and return it
            local.db.dbRowValidate(newDoc);

            if (obj._id !== newDoc._id) {
                throw new Error("You can't change a dbRow's _id");
            }
            return newDoc;
        };
        // ==============================================================
        // Finding dbRow's
        // ==============================================================

        local.db.queryGetDotValue = function (obj, field) {
        /*
         * Get a value from object with dot notation
         * @param {Object} obj
         * @param {String} field
         */
            var ii, objs;
            field = typeof field === 'string'
                ? field.split('.')
                : field;

            // field cannot be empty so that means we should return undefined
            // so that nothing can match
            if (!obj) {
                return undefined;
            }

            if (field.length === 0) {
                return obj;
            }

            if (field.length === 1) {
                return obj[field[0]];
            }

            if (Array.isArray(obj[field[0]])) {
                // If the next field is an integer, return only this item of the array
                ii = parseInt(field[1], 10);
                if (typeof ii === 'number' && !isNaN(ii)) {
                    return local.db.queryGetDotValue(
                        obj[field[0]][ii],
                        field.slice(2)
                    );
                }

                // Return the array of values
                objs = [];
                for (ii = 0; ii < obj[field[0]].length; ii += 1) {
                    objs.push(local.db.queryGetDotValue(
                        obj[field[0]][ii],
                        field.slice(1)
                    ));
                }
                return objs;
            }
            return local.db.queryGetDotValue(obj[field[0]], field.slice(1));
        };
        function areThingsEqual(aa, bb) {
        /*
         * Check whether 'things' are equal
         * Things are defined as any native types (string, number, boolean, null, date)
         * and objects
         * In the case of object, we check deep equality
         * Returns true if they are, false otherwise
         */
            var aKeys, bKeys, ii;

            // Strings, booleans, numbers, null
            if (aa === null ||
                    typeof aa === 'string' ||
                    typeof aa === 'boolean' ||
                    typeof aa === 'number' ||
                    bb === null ||
                    typeof bb === 'string' ||
                    typeof bb === 'boolean' ||
                    typeof bb === 'number') {
                return aa === bb;
            }

            // Arrays (no match since arrays are used as aa $in)
            // undefined (no match since they mean field doesn't exist and can't be serialized)
            if ((!(Array.isArray(aa) &&
                    Array.isArray(bb)) &&
                    (Array.isArray(aa) || Array.isArray(bb))) ||
                    aa === undefined ||
                    bb === undefined) {
                return false;
            }

            // General objects (check for deep equality)
            // aa and bb should be objects at this point
            try {
                aKeys = Object.keys(aa);
                bKeys = Object.keys(bb);
            } catch (errorCaught) {
                return false;
            }

            if (aKeys.length !== bKeys.length) {
                return false;
            }
            for (ii = 0; ii < aKeys.length; ii += 1) {
                if (bKeys.indexOf(aKeys[ii]) === -1) {
                    return false;
                }
                if (!areThingsEqual(aa[aKeys[ii]], bb[aKeys[ii]])) {
                    return false;
                }
            }
            return true;
        }
        logicalOperators.$or = function (obj, query) {
        /*
         * Match any of the subqueries
         * @param {Model} obj
         * @param {Array of Queries} query
         */
            var ii;

            if (!Array.isArray(query)) {
                throw new Error('$or operator used without an array');
            }

            for (ii = 0; ii < query.length; ii += 1) {
                if (local.db.queryMatch(obj, query[ii])) {
                    return true;
                }
            }

            return false;
        };
        logicalOperators.$and = function (obj, query) {
        /*
         * Match all of the subqueries
         * @param {Model} obj
         * @param {Array of Queries} query
         */
            var ii;

            if (!Array.isArray(query)) {
                throw new Error('$and operator used without an array');
            }

            for (ii = 0; ii < query.length; ii += 1) {
                if (!local.db.queryMatch(obj, query[ii])) {
                    return false;
                }
            }

            return true;
        };
        logicalOperators.$not = function (obj, query) {
        /*
         * Inverted match of the query
         * @param {Model} obj
         * @param {Query} query
         */
            return !local.db.queryMatch(obj, query);
        };
        logicalOperators.$where = function (obj, fnc) {
        /*
         * Use a function to match
         * @param {Model} obj
         * @param {Query} query
         */
            var result;

            if (typeof fnc !== 'function') {
                throw new Error('$where operator used without a function');
            }

            result = fnc.call(obj);
            if (typeof result !== 'boolean') {
                throw new Error('$where function must return boolean');
            }

            return result;
        };
        local.db.queryMatch = function (obj, query) {
        /*
         * Tell if a given dbRow matches a query
         * @param {Object} obj dbRow to check
         * @param {Object} query
         */
            function matchQueryPart(obj, queryKey, queryValue, treatObjAsValue) {
            /*
             * Match an object against a specific { key: value } part of a query
             * if the treatObjAsValue flag is set, don't try to match every part separately,
             * but the array as a whole
             */
                var objValue, ii, keys, firstChars, dollarFirstChars, tmp;

                objValue = local.db.queryGetDotValue(obj, queryKey);

                // Check if the value is an array if we don't force a treatment as value
                if (Array.isArray(objValue) && !treatObjAsValue) {
                    // If the queryValue is an array, try to perform an exact match
                    if (Array.isArray(queryValue)) {
                        return matchQueryPart(obj, queryKey, queryValue, true);
                    }

                    // Check if we are using an array-specific comparison function
                    if (queryValue !== null &&
                            typeof queryValue === 'object' &&
                            !local.db.isRegExp(queryValue)) {
                        tmp = Object.keys(queryValue).some(function (key) {
                            switch (key) {
                            case '$elemMatch':
                            case '$size':
                                return matchQueryPart(obj, queryKey, queryValue, true);
                            }
                        });
                        if (tmp) {
                            return tmp;
                        }
                    }

                    // If not, treat it as an array of { obj, query }
                    // where there needs to be at least one match
                    for (ii = 0; ii < objValue.length; ii += 1) {
                        if (matchQueryPart({
                                key: objValue[ii]
                            }, 'key', queryValue)) {
                            return true;
                        } // key here could be any string
                    }
                    return false;
                }

                // queryValue is an actual object.
                // Determine whether it contains comparison operators
                // or only normal fields. Mixed objects are not allowed
                if (queryValue !== null &&
                        typeof queryValue === 'object' &&
                        !local.db.isRegExp(queryValue) &&
                        !Array.isArray(queryValue)) {
                    keys = Object.keys(queryValue);
                    firstChars = keys.map(function (item) {
                        return item[0];
                    });
                    dollarFirstChars = firstChars.filter(function (cc) {
                        return cc === '$';
                    });

                    if (dollarFirstChars.length !== 0 &&
                            dollarFirstChars.length !== firstChars.length) {
                        throw new Error('You cannot mix operators and normal fields');
                    }

                    // queryValue is an object of this form:
                    // { $comparisonOperator1: value1, ... }
                    if (dollarFirstChars.length > 0) {
                        return keys.every(function (key) {
                            return local.db.queryCompare(key, objValue, queryValue[key]);
                        });
                    }
                }

                // Using regular expressions with basic querying
                if (local.db.isRegExp(queryValue)) {
                    return local.db.queryCompare('$regex', objValue, queryValue);
                }

                // queryValue is either a native value or a normal object
                // Basic matching is possible
                if (!areThingsEqual(objValue, queryValue)) {
                    return false;
                }

                return true;
            }

            // Primitive query against a primitive type
            // This is a bit of a hack since we construct an object with an arbitrary key
            // only to dereference it later
            // But I don't have time for a cleaner implementation now
            if (local.db.isNullOrUndefined(obj) ||
                    typeof obj === 'boolean' ||
                    typeof obj === 'number' ||
                    typeof obj === 'string' ||
                    Array.isArray(obj) ||
                    local.db.isNullOrUndefined(query) ||
                    typeof query === 'boolean' ||
                    typeof query === 'number' ||
                    typeof query === 'string' ||
                    Array.isArray(query)) {
                return matchQueryPart({ needAKey: obj }, 'needAKey', query);
            }

            // Normal query
            return Object.keys(query).every(function (key) {
                if (key[0] === '$') {
                    if (!logicalOperators[key]) {
                        throw new Error('Unknown logical operator ' + key);
                    }
                    if (!logicalOperators[key](obj, query[key])) {
                        return;
                    }
                } else if (!matchQueryPart(obj, key, query[key])) {
                    return;
                }
                return true;
            });
        };
        // Interface
        /*
         * Handle models (i.e. docs)
         * Serialization/deserialization
         * Copying
         * Querying, update
         */
        local.db._DbTree = function (options) {
        /*
         * Constructor of the internal DbTree (AvlTree implementation)
         *
         * @param {Object} options Optional
         * @param {Key}      options.key Initialize this DbTree's key with key
         * @param {Node}     options.parent Parent node
         * @param {Boolean}  options.unique Whether to enforce a 'unique' constraint
         * on the key or not
         * @param {Value}    options.value Initialize this DbTree's data with [value]
         */
            if (options.hasOwnProperty('key')) {
                this.key = options.key;
            }
            this.parent = options.parent;
            this.unique = options.unique;
            this.data = options.hasOwnProperty('value')
                ? [options.value]
                : [];

        };
        // ============================================
        // Methods used to actually work on the tree
        // ============================================

        local.db._DbTree.prototype.insert = function (key, value) {
        /*
         * Insert a key, value pair in the tree while maintaining the DbTree height constraint
         * Return a pointer to the root node, which may have changed
         */
            var nodeCurrent, pathList;
            // validate value
            local.db.assert(value, value);
            nodeCurrent = this;
            pathList = [];
            // coerce undefined to null
            if (key === undefined) {
                key = null;
            }
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
                if (local.db.sortCompare(nodeCurrent.key, key) === 0) {
                    local.db.assert(
                        !nodeCurrent.unique,
                        'insert - unique-key ' + key + ' already exists'
                    );
                    nodeCurrent.data.push(value);
                    return this;
                }
                pathList.push(nodeCurrent);
                if (local.db.sortCompare(key, nodeCurrent.key) < 0) {
                    if (!nodeCurrent.left) {
                        nodeCurrent.left = new local.db._DbTree({
                            key: key,
                            parent: nodeCurrent,
                            unique: nodeCurrent.unique,
                            value: value
                        });
                        pathList.push(nodeCurrent.left);
                        break;
                    }
                    nodeCurrent = nodeCurrent.left;
                } else {
                    if (!nodeCurrent.right) {
                        nodeCurrent.right = new local.db._DbTree({
                            key: key,
                            parent: nodeCurrent,
                            unique: nodeCurrent.unique,
                            value: value
                        });
                        pathList.push(nodeCurrent.right);
                        break;
                    }
                    nodeCurrent = nodeCurrent.right;
                }
            }
            return this.rebalanceAlongPath(pathList);
        };

        local.db._DbTree.prototype.delete = function (key, value) {
        /*
         * Delete a key or just a value and return the new root of the tree
         * @param {Key} key
         * @param {Value} value Optional. If not set, the whole key is deleted.
         * If set, only this value is deleted
         */
            var newData, nodeCurrent, pathList, replaceWith;
            newData = [];
            nodeCurrent = this;
            pathList = [];
            // Empty tree
            if (!this.hasOwnProperty('key')) {
                return this;
            }
            // Either no match is found and the function will return from within the loop
            // Or a match is found and pathList will contain the path
            // from the root to the node to delete after the loop
            while (local.db.sortCompare(key, nodeCurrent.key) !== 0) {
                pathList.push(nodeCurrent);
                if (local.db.sortCompare(key, nodeCurrent.key) < 0) {
                    if (nodeCurrent.left) {
                        nodeCurrent = nodeCurrent.left;
                    } else {
                        return this; // Key not found, no modification
                    }
                } else {
                    // local.db.sortCompare(key, nodeCurrent.key) is > 0
                    if (nodeCurrent.right) {
                        nodeCurrent = nodeCurrent.right;
                    } else {
                        return this; // Key not found, no modification
                    }
                }
            }
            // Delete only a value (no tree modification)
            if (nodeCurrent.data.length > 1 && value) {
                nodeCurrent.data.forEach(function (d) {
                    if (d !== value) {
                        newData.push(d);
                    }
                });
                nodeCurrent.data = newData;
                return this;
            }
            // Delete a whole node
            // Leaf
            if (!nodeCurrent.left && !nodeCurrent.right) {
                if (nodeCurrent === this) { // This leaf is also the root
                    delete nodeCurrent.key;
                    nodeCurrent.data = [];
                    delete nodeCurrent.height;
                    return this;
                }
                if (nodeCurrent.parent.left === nodeCurrent) {
                    nodeCurrent.parent.left = null;
                } else {
                    nodeCurrent.parent.right = null;
                }
                return this.rebalanceAlongPath(pathList);
            }
            // Node with only one child
            if (!nodeCurrent.left || !nodeCurrent.right) {
                replaceWith = nodeCurrent.left || nodeCurrent.right;
                // This node is also the root
                if (nodeCurrent === this) {
                    replaceWith.parent = null;
                    // height of replaceWith is necessarily 1
                    // because the tree was balanced before deletion
                    return replaceWith;
                }
                if (nodeCurrent.parent.left === nodeCurrent) {
                    nodeCurrent.parent.left = replaceWith;
                    replaceWith.parent = nodeCurrent.parent;
                } else {
                    nodeCurrent.parent.right = replaceWith;
                    replaceWith.parent = nodeCurrent.parent;
                }
                return this.rebalanceAlongPath(pathList);
            }
            // Node with two children
            // Use the in-order predecessor (no need to randomize since we actively rebalance)
            pathList.push(nodeCurrent);
            replaceWith = nodeCurrent.left;
            // Special case: the in-order predecessor is right below the node to delete
            if (!replaceWith.right) {
                nodeCurrent.key = replaceWith.key;
                nodeCurrent.data = replaceWith.data;
                nodeCurrent.left = replaceWith.left;
                if (replaceWith.left) {
                    replaceWith.left.parent = nodeCurrent;
                }
                return this.rebalanceAlongPath(pathList);
            }
            // After this loop, replaceWith is the right-most leaf in the left subtree
            // and pathList the path from the root (inclusive) to replaceWith (exclusive)
            while (true) {
                if (replaceWith.right) {
                    pathList.push(replaceWith);
                    replaceWith = replaceWith.right;
                } else {
                    break;
                }
            }
            nodeCurrent.key = replaceWith.key;
            nodeCurrent.data = replaceWith.data;
            replaceWith.parent.right = replaceWith.left;
            if (replaceWith.left) {
                replaceWith.left.parent = replaceWith.parent;
            }
            return this.rebalanceAlongPath(pathList);
        };

        local.db._DbTree.prototype.list = function () {
        /*
         * this function will return the list of all values in dbTree
         */
            var result;
            result = [];
            this.some(function (dbRow) {
                result.push(dbRow);
            });
            return result;
        };

        local.db._DbTree.prototype.length = function () {
        /*
         * this function will return the length of dbTree
         */
            var result;
            result = 0;
            this.some(function () {
                result += 1;
            });
            return result;
        };

        local.db._DbTree.prototype.search = function (key) {
        /*
         * Search for all data corresponding to a key
         */
            if (!this.hasOwnProperty('key')) {
                return [];
            }

            if (local.db.sortCompare(this.key, key) === 0) {
                return this.data;
            }

            if (local.db.sortCompare(key, this.key) < 0) {
                if (this.left) {
                    return this.left.search(key);
                }
                return [];
            }
            if (this.right) {
                return this.right.search(key);
            }
            return [];
        };
        local.db._DbTree.prototype.getLowerBoundMatcher = function (query) {
        /*
         * Return a function that tells whether a given key matches a lower bound
         */
            // No lower bound
            if (!query.hasOwnProperty('$gt') && !query.hasOwnProperty('$gte')) {
                return function () {
                    return true;
                };
            }

            if (query.hasOwnProperty('$gt') && query.hasOwnProperty('$gte')) {
                if (local.db.sortCompare(query.$gte, query.$gt) === 0) {
                    return function (key) {
                        return local.db.sortCompare(key, query.$gt) > 0;
                    };
                }

                if (local.db.sortCompare(query.$gte, query.$gt) > 0) {
                    return function (key) {
                        return local.db.sortCompare(key, query.$gte) >= 0;
                    };
                }
                return function (key) {
                    return local.db.sortCompare(key, query.$gt) > 0;
                };
            }

            if (query.hasOwnProperty('$gt')) {
                return function (key) {
                    return local.db.sortCompare(key, query.$gt) > 0;
                };
            }
            return function (key) {
                return local.db.sortCompare(key, query.$gte) >= 0;
            };
        };
        local.db._DbTree.prototype.getUpperBoundMatcher = function (query) {
        /*
         * Return a function that tells whether a given key matches an upper bound
         */
            // No lower bound
            if (!query.hasOwnProperty('$lt') && !query.hasOwnProperty('$lte')) {
                return function () {
                    return true;
                };
            }

            if (query.hasOwnProperty('$lt') && query.hasOwnProperty('$lte')) {
                if (local.db.sortCompare(query.$lte, query.$lt) === 0) {
                    return function (key) {
                        return local.db.sortCompare(key, query.$lt) < 0;
                    };
                }

                if (local.db.sortCompare(query.$lte, query.$lt) < 0) {
                    return function (key) {
                        return local.db.sortCompare(key, query.$lte) <= 0;
                    };
                }
                return function (key) {
                    return local.db.sortCompare(key, query.$lt) < 0;
                };
            }

            if (query.hasOwnProperty('$lt')) {
                return function (key) {
                    return local.db.sortCompare(key, query.$lt) < 0;
                };
            }
            return function (key) {
                return local.db.sortCompare(key, query.$lte) <= 0;
            };
        };
        // Append all elements in toAppend to array
        function append(array, toAppend) {
            var ii;

            for (ii = 0; ii < toAppend.length; ii += 1) {
                array.push(toAppend[ii]);
            }
        }
        local.db._DbTree.prototype.betweenBounds = function (query, lbm, ubm) {
        /*
         * Get all data for a key between bounds
         * Return it in key order
         * @param {Object} query Mongo-style query
         * where keys are $lt, $lte, $gt or $gte (other keys are not considered)
         * @param {Functions} lbm/ubm matching functions calculated at the first recursive step
         */
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

        local.db._DbTree.prototype.some = function (fnc) {
        /*
         * Execute a function on every node of the tree, in key order
         * @param {Function} fnc Signature: node.
         * Most useful will probably be node.key and node.data
         */
            if (this.left && this.left.some(fnc)) {
                return true;
            }
            if (this.data.some(fnc)) {
                return true;
            }
            if (this.right && this.right.some(fnc)) {
                return true;
            }
            return false;
        };

        local.db._DbTree.prototype.balanceFactor = function () {
        /*
         * Return the balance factor
         */
            return ((this.left && this.left.height) || 0) -
                ((this.right && this.right.height) || 0);
        };

        local.db._DbTree.prototype.rightRotation = function () {
        /*
         * Perform a right rotation of the tree if possible
         * and return the root of the resulting tree
         * The resulting tree's nodes' heights are also updated
         */
            var bb, pp, qq;
            pp = this.left;
            qq = this;
            // No change
            if (!pp) {
                return this;
            }
            bb = pp.right;
            // Alter tree structure
            if (qq.parent) {
                pp.parent = qq.parent;
                if (qq.parent.left === qq) {
                    qq.parent.left = pp;
                } else {
                    qq.parent.right = pp;
                }
            } else {
                pp.parent = null;
            }
            pp.right = qq;
            qq.parent = pp;
            qq.left = bb;
            if (bb) {
                bb.parent = qq;
            }
            // Update heights
            qq.height = Math.max((bb && bb.height) || 0, (qq.right && qq.right.height) || 0) +
                1;
            pp.height = Math.max((pp.left && pp.left.height) || 0, qq.height) + 1;
            return pp;
        };
        local.db._DbTree.prototype.leftRotation = function () {
        /*
         * Perform a left rotation of the tree if possible
         * and return the root of the resulting tree
         * The resulting tree's nodes' heights are also updated
         */
            var bb, pp, qq;
            pp = this;
            qq = this.right;
            // No change
            if (!qq) {
                return this;
            }
            bb = qq.left;
            // Alter tree structure
            if (pp.parent) {
                qq.parent = pp.parent;
                if (pp.parent.left === pp) {
                    pp.parent.left = qq;
                } else {
                    pp.parent.right = qq;
                }
            } else {
                qq.parent = null;
            }
            qq.left = pp;
            pp.parent = qq;
            pp.right = bb;
            if (bb) {
                bb.parent = pp;
            }
            // Update heights
            pp.height = Math.max((pp.left && pp.left.height) || 0, (bb && bb.height) || 0) + 1;
            qq.height = Math.max((qq.right && qq.right.height) || 0, pp.height) + 1;
            return qq;
        };

        local.db._DbTree.prototype.rightTooSmall = function () {
        /*
         * Modify the tree if its right subtree is too small compared to the left
         * Return the new root if any
         */
            if (this.balanceFactor() <= 1) {
                return this;
            } // Right is not too small, don't change

            if (this.left.balanceFactor() < 0) {
                this.left.leftRotation();
            }

            return this.rightRotation();
        };

        local.db._DbTree.prototype.leftTooSmall = function () {
        /*
         * Modify the tree if its left subtree is too small compared to the right
         * Return the new root if any
         */
            if (this.balanceFactor() >= -1) {
                return this;
            } // Left is not too small, don't change

            if (this.right.balanceFactor() > 0) {
                this.right.rightRotation();
            }

            return this.leftRotation();
        };

        local.db._DbTree.prototype.rebalanceAlongPath = function (path) {
        /*
         * Rebalance the tree along the given path.
         * The path is given reversed (as it was calculated
         * in the insert and delete functions).
         * Returns the new root of the tree
         * Of course, the first element of the path must be the root of the tree
         */
            // Empty tree
            var ii, rootCurrent, rotated;
            rootCurrent = this;
            if (!this.hasOwnProperty('key')) {
                delete this.height;
                return this;
            }
            // Rebalance the tree and update all heights
            for (ii = path.length - 1; ii >= 0; ii -= 1) {
                path[ii].height = 1 + Math.max(path[ii].left
                    ? path[ii].left.height
                    : 0, path[ii].right
                    ? path[ii].right.height
                    : 0);
                if (path[ii].balanceFactor() > 1) {
                    rotated = path[ii].rightTooSmall();
                    if (ii === 0) {
                        rootCurrent = rotated;
                    }
                }
                if (path[ii].balanceFactor() < -1) {
                    rotated = path[ii].leftTooSmall();
                    if (ii === 0) {
                        rootCurrent = rotated;
                    }
                }
            }
            return rootCurrent;
        };

        function projectForUnique(elt) {
        /*
         * Type-aware projection
         */
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
        local.db._DbIndex = function (options) {
        /*
         * Create a new index
         * All methods on an index guarantee that either
         * the whole operation was successful and the index changed
         * or the operation was unsuccessful and an error is thrown
         * while the index is unchanged
         * @param {String} options.fieldName On which field should the index apply
         * (can use dot notation to index on sub fields)
         * @param {Boolean} options.unique Optional,
         * enforce a unique constraint (default: false)
         * @param {Boolean} options.sparse Optional, allow a sparse index
         * (we can have dbRow's for which fieldName is undefined) (default: false)
         */
            this.fieldName = options.fieldName;
            this.integer = options.integer;
            this.sparse = options.sparse;
            this.unique = options.unique;
            // init dbTree
            this.dbTree = new local.db._DbTree({ unique: this.unique });
        };
        local.db._DbIndex.prototype.insert = function (dbRow) {
        /*
         * Insert a new dbRow in the index
         * If an array is passed, we insert all its elements
         * (if one insertion fails the index is not modified)
         * O(log(n))
         */
            var key, keys, ii, failingI, error, self = this;

            if (Array.isArray(dbRow)) {
                self.insertMultipleDocs(dbRow);
                return;
            }

            key = local.db.queryGetDotValue(dbRow, self.fieldName);

            // We don't index dbRow's that don't contain the field if the index is sparse
            if (self.sparse && local.db.isNullOrUndefined(key)) {
                return;
            }

            // auto-create keyUnique
            if (self.unique && !(key === 0 || key) && self.fieldName.indexOf('.') < 0) {
                while (true) {
                    key = self.integer
                        ? Math.floor(Math.random() * 0x20000000000000)
                        : ('a' +
                            Math.random().toString(36).slice(2) +
                            Math.random().toString(36).slice(2)).slice(0, 16);
                    if (!self.getMatching(key).length) {
                        break;
                    }
                }
                dbRow[self.fieldName] = key;
            }

            if (!Array.isArray(key)) {
                self.dbTree = self.dbTree.insert(key, dbRow);
            } else {
                // If an insert fails due to a unique constraint,
                // roll back all inserts before it
                keys = local.db.listUnique(key).map(projectForUnique);

                for (ii = 0; ii < keys.length; ii += 1) {
                    try {
                        self.dbTree = self.dbTree.insert(keys[ii], dbRow);
                    } catch (errorCaught) {
                        error = errorCaught;
                        failingI = ii;
                        break;
                    }
                }

                if (error) {
                    for (ii = 0; ii < failingI; ii += 1) {
                        self.dbTree = self.dbTree.delete(keys[ii], dbRow);
                    }

                    throw error;
                }
            }
        };
        local.db._DbIndex.prototype.insertMultipleDocs = function (dbRowList) {
        /*
         * Insert an array of dbRow's in the index
         * If a constraint is violated, the changes should be rolled back and an error thrown
         *
         * @API private
         */
            var ii, error, failingI;

            for (ii = 0; ii < dbRowList.length; ii += 1) {
                try {
                    this.insert(dbRowList[ii]);
                } catch (errorCaught) {
                    error = errorCaught;
                    failingI = ii;
                    break;
                }
            }

            if (error) {
                for (ii = 0; ii < failingI; ii += 1) {
                    this.remove(dbRowList[ii]);
                }

                throw error;
            }
        };
        local.db._DbIndex.prototype.remove = function (dbRow) {
        /*
         * Remove a dbRow from the index
         * If an array is passed, we remove all its elements
         * The remove operation is safe with regards to the 'unique' constraint
         * O(log(n))
         */
            var key, self = this;

            if (Array.isArray(dbRow)) {
                dbRow.forEach(function (d) {
                    self.remove(d);
                });
                return;
            }

            key = local.db.queryGetDotValue(dbRow, self.fieldName);

            if (self.sparse && local.db.isNullOrUndefined(key)) {
                return;
            }

            if (!Array.isArray(key)) {
                self.dbTree = self.dbTree.delete(key, dbRow);
            } else {
                local.db.listUnique(key).map(projectForUnique).forEach(function (_key) {
                    self.dbTree = self.dbTree.delete(_key, dbRow);
                });
            }
        };
        local.db._DbIndex.prototype.updateMultipleDocs = function (pairs) {
        /*
         * Update multiple dbRow's in the index
         * If a constraint is violated, the changes need to be rolled back
         * and an error thrown
         * @param {Array of oldDoc, newDoc pairs} pairs
         *
         * @API private
         */
            var ii, failingI, error;

            for (ii = 0; ii < pairs.length; ii += 1) {
                this.remove(pairs[ii].oldDoc);
            }

            for (ii = 0; ii < pairs.length; ii += 1) {
                try {
                    this.insert(pairs[ii].newDoc);
                } catch (errorCaught) {
                    error = errorCaught;
                    failingI = ii;
                    break;
                }
            }

            // If an error was raised, roll back changes in the inverse order
            if (error) {
                for (ii = 0; ii < failingI; ii += 1) {
                    this.remove(pairs[ii].newDoc);
                }

                for (ii = 0; ii < pairs.length; ii += 1) {
                    this.insert(pairs[ii].oldDoc);
                }

                throw error;
            }
        };
        local.db._DbIndex.prototype.getMatching = function (value) {
        /*
         * Get all dbRow's in index whose key match value (if it is a Thing)
         * or one of the elements of value (if it is an array of Things)
         * @param {Thing} value Value to match the key against
         * @return {Array of dbRow's}
         */
            var self = this, _res = {}, res = [];
            if (!Array.isArray(value)) {
                return self.dbTree.search(value);
            }
            value.forEach(function (value) {
                self.getMatching(value).forEach(function (dbRow) {
                    _res[dbRow._id] = dbRow;
                });
            });

            Object.keys(_res).forEach(function (_id) {
                res.push(_res[_id]);
            });

            return res;
        };
        local.db.Cursor = function (db, query, onError) {
        /*
         * Create a new cursor for this dbTable
         * @param {Datastore} db - The datastore this cursor is bound to
         * @param {Query} query - The query this cursor will operate on
         * @param {Function} onError - Handler to be executed after cursor has found
         * the results and before the callback passed to find/findOne/update/remove
         */
            this.db = db;
            this.query = query || {};
            if (onError) {
                this.onError = onError;
            }
        };
        local.db.Cursor.prototype.limit = function (limit) {
        /*
         * Set a limit to the number of results
         */
            this._limit = limit;
            return this;
        };
        local.db.Cursor.prototype.project = function (candidates) {
        /*
         * Apply the projection
         */
            var res = [], self = this, keepId, action, keys;

            if (self._projection === undefined || Object.keys(self._projection).length === 0) {
                return candidates;
            }

            keepId = self._projection._id === 0 ? false : true;

            // Check for consistency
            keys = Object.keys(self._projection).filter(function (key) {
                return key !== '_id';
            });
            keys.forEach(function (key) {
                if (action !== undefined && self._projection[key] !== action) {
                    throw new Error("Can't both keep and omit fields except for _id");
                }
                action = self._projection[key];
            });

            // Do the actual projection
            candidates.forEach(function (candidate) {
                var toPush;
                if (action === 1) { // pick-type projection
                    toPush = {
                        $set: {}
                    };
                    keys.forEach(function (key) {
                        toPush.$set[key] = local.db.queryGetDotValue(candidate, key);
                        if (toPush.$set[key] === undefined) {
                            delete toPush.$set[key];
                        }
                    });
                    toPush = local.db.dbRowModify({}, toPush);
                } else { // omit-type projection
                    toPush = {
                        $unset: {}
                    };
                    keys.forEach(function (key) {
                        toPush.$unset[key] = true;
                    });
                    toPush = local.db.dbRowModify(candidate, toPush);
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
        local.db.Cursor.prototype._exec = function (_onError) {
        /*
         * Get all matching elements
         * Will return pointers to matched elements (shallow copies),
         * returning full copies is the role of find or findOne
         * This is an internal function, use exec which uses the executor
         *
         * @param {Function} onError - Signature: error, results
         */
            var res = [], added = 0, skipped = 0, self = this;

            function onError(error) {
                if (self.onError) {
                    return self.onError(error, res, _onError);
                }
                return _onError(error, res);
            }

            self.db.dbIndexCullMany(self.query, function (error, candidates) {
                var criteria, limit, skip;
                if (error) {
                    return onError(error);
                }

                try {
                    candidates.some(function (element) {
                        if (local.db.queryMatch(element, self.query)) {
                            // If a sort is defined, wait for the results to be sorted
                            // before applying limit and skip
                            if (!self._sort) {
                                if (self._skip && self._skip > skipped) {
                                    skipped += 1;
                                } else {
                                    res.push(element);
                                    added += 1;
                                    if (self._limit && self._limit <= added) {
                                        return true;
                                    }
                                }
                            } else {
                                res.push(element);
                            }
                        }
                    });
                } catch (errorCaught) {
                    return onError(errorCaught);
                }

                // Apply all sorts
                if (self._sort) {

                    // Sorting
                    criteria = [];
                    Object.keys(self._sort).forEach(function (key) {
                        criteria.push({
                            key: key,
                            direction: self._sort[key]
                        });
                    });
                    res.sort(function (aa, bb) {
                        var criterion, compare, ii;
                        for (ii = 0; ii < criteria.length; ii += 1) {
                            criterion = criteria[ii];
                            compare = criterion.direction * local.db.sortCompare(
                                local.db.queryGetDotValue(aa, criterion.key),
                                local.db.queryGetDotValue(bb, criterion.key)
                            );
                            if (compare !== 0) {
                                return compare;
                            }
                        }
                        return 0;
                    });

                    // Applying limit and skip
                    limit = self._limit || res.length;
                    skip = self._skip || 0;

                    res = res.slice(skip, skip + limit);
                }

                // Apply projection
                try {
                    res = self.project(res);
                } catch (errorCaught) {
                    error = errorCaught;
                }

                return onError(error);
            });
        };

        local.db._DbTable = function (options) {
        /*
         * this function will create a dbTable
         */
            this.name = options.name;
            // validate name
            local.db.assert(
                this.name && typeof this.name === 'string',
                'invalid name - ' + this.name
            );
            // validate unique name
            local.db.assert(
                local.db.dbTableDict[this.name] === this || !local.db.dbTableDict[this.name],
                'non-unique name - ' + this.name
            );
            // register dbTable in dbTableDict
            local.db.dbTableDict[this.name] = this;
            // init dbIndexDict
            this.dbIndexDict = {
                _id: new local.db._DbIndex({ fieldName: '_id', unique: true }),
                createdAt: new local.db._DbIndex({ fieldName: 'createdAt' }),
                updatedAt: new local.db._DbIndex({ fieldName: 'updatedAt' })
            };
            this.dbIndexTtlDict = {};
        };

        local.db._DbTable.prototype.crudCountMany = function (options, onError) {
        /*
         * this function will count the number of dbRow's in dbTable with the given options
         */
            var result, self;
            self = this;
            options = local.db.objectSetDefault({}, options);
            options = local.db.objectSetDefault(options, { query: {} });
            local.db.onNext(options, function (error, data) {
                data = data || [];
                switch (options.modeNext) {
                case 1:
                    result = 0;
                    self.dbIndexCullMany(options.query, options.onNext);
                    break;
                case 2:
                    data.forEach(function (dbRow) {
                        if (local.db.queryMatch(dbRow, options.query)) {
                            result += 1;
                        }
                    });
                    options.onNext();
                    break;
                default:
                    onError(error, result);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.db._DbTable.prototype.crudFindMany = function (options, onError) {
        /*
         * this function will find all dbRow's in dbTable with the given options
         */
            var limit, projection, result, self, skip, sort, tmp;
            self = this;
            options = local.db.objectSetDefault({}, options);
            options = local.db.objectSetDefault(options, {
                limit: Infinity,
                projection: {},
                query: {},
                skip: 0,
                sort: {}
            });
            local.db.onNext(options, function (error, data) {
                data = data || [];
                switch (options.modeNext) {
                case 1:
                    result = [];
                    self.dbIndexCullMany(options.query, options.onNext);
                    break;
                case 2:
                    sort = Object.keys(options.sort).map(function (key) {
                        return {
                            key: key,
                            direction: options.sort[key]
                        };
                    });
                    // optimization - no sort
                    if (!sort.length) {
                        limit = options.limit;
                        skip = options.skip;
                        data.some(function (dbRow) {
                            if (!local.db.queryMatch(dbRow, options.query)) {
                                return;
                            }
                            skip -= 1;
                            if (skip >= 0) {
                                return;
                            }
                            result.push(dbRow);
                            limit -= 1;
                            if (limit <= 0) {
                                return true;
                            }
                        });
                        options.onNext();
                        return;
                    }
                    // sort
                    result = data;
                    result = result.filter(function (dbRow) {
                        return local.db.queryMatch(dbRow, options.query);
                    });
                    result = result.sort(function (aa, bb) {
                        sort.some(function (element) {
                            tmp = element.direction * local.db.sortCompare(
                                local.db.queryGetDotValue(aa, element.key),
                                local.db.queryGetDotValue(bb, element.key)
                            );
                            return tmp;
                        });
                        return tmp;
                    });
                    // limit and skip
                    result = result.slice(options.skip, options.skip + options.limit);
                    options.onNext();
                    break;
                case 4:
                    // projection
                    projection = Object.keys(options.projection);
                    if (!projection.list) {
                        options.onNext();
                        return;
                    }
                    // pick-type projection
                    if (options.projection[projection.list[0]] === 1) {
                        result = result.map(function (dbRow) {
                            tmp = {};
                            projection.forEach(function (key) {
                                tmp[key] = dbRow[key];
                            });
                            return tmp;
                        });
                    // omit-type projection
                    } else {
                        result = result.map(function (dbRow) {
                            tmp = {};
                            Object.keys(dbRow).forEach(function (key) {
                                if (!options.projection.hasOwnProperty(key)) {
                                    tmp[key] = dbRow[key];
                                }
                            });
                            return tmp;
                        });
                    }
                    options.onNext();
                    break;
                default:
                    onError(error, result);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.db._DbTable.prototype.crudFindOne = function (options, onError) {
        /*
         * this function will find one dbRow in dbTable with the given options
         */
            this.crudFindMany({
                limit: 1,
                query: options.query
            }, function (error, data) {
                onError(error, data[0] || null);
            });
        };

        local.db._DbTable.prototype.crudRemoveMany = function (options, onError) {
        /*
         * this function will remove many dbRow's in dbTable with the given options
         */
            var removedList, result, self;
            self = this;
            options = local.db.objectSetDefault({}, options);
            options = local.db.objectSetDefault(options, { query: {} });
            local.db.onNext(options, function (error, data) {
                data = data || [];
                switch (options.modeNext) {
                case 1:
                    removedList = [];
                    result = 0;
                    self.dbIndexCullMany(options.query, options.onNext);
                    break;
                case 2:
                    data.some(function (dbRow) {
                        if (local.db.queryMatch(dbRow, options.query)) {
                            result += 1;
                            removedList.push({
                                $$deleted: true,
                                _id: dbRow._id
                            });
                            self.dbIndexList().forEach(function (dbIndex) {
                                dbIndex.remove(dbRow);
                            });
                            if (options.one) {
                                return true;
                            }
                        }
                    });
                    self.dbTablePersist();
                    options.onNext();
                    break;
                default:
                    onError(error, result);
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.db._DbTable.prototype.crudRemoveOne = function (options, onError) {
        /*
         * this function will remove one dbRow in dbTable with the given options
         */
            options = local.db.objectSetDefault({}, options);
            options = local.db.objectSetDefault(options, { one: true });
            this.crudRemoveMany(options, onError);
        };

        local.db._DbTable.prototype.dbIndexCreate = function (options) {
        /*
         * this function will create an index for the given dbTable
         */
        /*
         * Create an index is for this field. Same parameters as lib/indexes
         * For now this function is synchronous, we need to test how much time it takes
         * We use an async API for consistency with the rest of the code
         * @param {String} options.fieldName
         * @param {Boolean} options.unique
         * @param {Boolean} options.sparse
         * @param {Number} options.expireAfterSeconds - Optional, if set this index
         *     becomes a TTL index (only works on Date fields, not arrays of Date)
         * @param {Function} onError - callback, signature: error
         */
            var dbIndex, self;
            // validate fieldName
            local.db.assert(!(options.fieldName &&
                options.fieldName === '_id' &&
                options.fieldName === 'createdAt' &&
                options.fieldName === 'updatedAt'), 'invalid fieldName ' + options.fieldName);
            self = this;
            dbIndex = self.dbIndexDict[options.fieldName] = new local.db._DbIndex(options);
            // With this implementation index creation is not necessary to ensure TTL
            // but we stick with MongoDB's API here
            if (options.expireAfterSeconds !== undefined) {
                self.dbIndexTtlDict[options.fieldName] = options.expireAfterSeconds;
            }
            dbIndex.insert(self.dbRowList());
            // We may want to force all options to be persisted including defaults,
            // not just the ones passed the index creation function
            self.dbTablePersist();
        };

        local.db._DbTable.prototype.dbIndexList = function () {
        /*
         * this function will list all dbIndex's in dbTable
         */
            var self;
            self = this;
            return Object.keys(self.dbIndexDict).map(function (key) {
                return self.dbIndexDict[key];
            });
        };

        local.db._DbTable.prototype.dbIndexRemove = function (options) {
        /*
         * this function will remove the dbIndex from dbTable with the given options
         */
            // validate fieldName
            local.db.assert(!(options.fieldName &&
                options.fieldName === '_id' &&
                options.fieldName === 'createdAt' &&
                options.fieldName === 'updatedAt'), 'invalid fieldName ' + options.fieldName);
            delete this.dbIndexDict[options.fieldName];
            this.dbTablePersist();
        };

        local.db._DbTable.prototype.dbRowList = function () {
        /*
         * this function will return the list of all dbRow's in dbTable
         */
            return this.dbIndexDict._id
                ? this.dbIndexDict._id.dbTree.list()
                : [];
        };

        local.db._DbTable.prototype.dbTableClear = function () {
        /*
         * this function will clear dbTable
         */
            var self;
            self = this;
            delete self.timerDbTableSave;
            self.dbIndexList().forEach(function (dbIndex) {
                dbIndex.dbTree = new local.db._DbTree({ unique: dbIndex.unique });
            });
            // clear persistence
            local.db.dbStorageRemoveItem(self.name, local.db.onErrorDefault);
        };

        local.db._DbTable.prototype.dbTableExport = function () {
        /*
         * this function will export dbTable
         */
            var data, self;
            self = this;
            data = '####\n';
            data += JSON.stringify({ name: self.name }) + '\n';
            data += '#\n';
            self.dbIndexList().forEach(function (dbIndex) {
                switch (dbIndex.fieldName) {
                case '_id':
                case 'createdAt':
                case 'updatedAt':
                    return;
                }
                data += JSON.stringify({
                    fieldName: dbIndex.fieldName,
                    integer: dbIndex.integer,
                    unique: dbIndex.unique,
                    sparse: dbIndex.sparse
                }) + '\n';
            });
            data += '#\n';
            self.dbRowList().forEach(function (dbRow) {
                data += JSON.stringify(dbRow) + '\n';
            });
            data += '####';
            return data;
        };

        local.db._DbTable.prototype.dbTableImport = function (data) {
        /*
         * this function will import the data into dbTable
         */
            var self;
            self = this;
            self.imported = true;
            if (!data) {
                return;
            }
            delete self.timerDbTableSave;
            data = data
                .replace((/^####/gm), '')
                .split('\n#')
                .map(function (element) {
                    return element
                        .trim()
                        .split('\n')
                        .filter(function (element) {
                            return element;
                        })
                        .map(function (element) {
                            return JSON.parse(element);
                        });
                });
            data[1].forEach(function (dbIndex) {
                dbIndex = self.dbIndexDict[dbIndex.fieldName] = new local.db._DbIndex(dbIndex);
                dbIndex.insert(self.dbRowList());
            });
            // insert data
            self.dbIndexList().forEach(function (dbIndex) {
                dbIndex.insert(data[2]);
            });
        };

        local.db._DbTable.prototype.dbTablePersist = function () {
        /*
         * this function will persist dbTable to dbStorage
         */
            var self;
            self = this;
            // throttle dbStorage writes to 2 every 1000 ms
            if (self.timerDbTableSave) {
                return;
            }
            self.timerDbTableSave = setTimeout(function () {
                delete self.timerDbTableSave;
                local.db.dbStorageSetItem(
                    self.name,
                    self.dbTableExport(),
                    local.db.onErrorDefault
                );
            }, 1000);
            local.db.dbStorageSetItem(self.name, self.dbTableExport(), local.db.onErrorDefault);
        };

        local.db._DbTable.prototype.dbIndexCullMany = function (query, onError) {
        /*
         * Return the dbRowList for a given query
         * Crude implementation for now, we return the dbRowList given
         * by the first usable index if any
         * We try the following query types,
         * in this order: basic match, $in match, comparison match
         * One way to make it better would be to enable the use of multiple indexes
         * if the first usable index
         * returns too much data. I may do it in the future.
         *
         * Returned dbRowList will be scanned to find and remove all expired dbRow's
         *
         * @param {Query} query
         * @param {Function} onError Signature error, dbRowList
         */
            var self = this,
                onParallel,
                options,
                usableQueryKeys;
            options = {};
            local.db.onNext(options, function (error, data) {
                switch (options.modeNext) {
                // STEP 1: get dbRowList list by checking indexes
                // from most to least frequent usecase
                case 1:
                    // For a basic match
                    usableQueryKeys = [];
                    Object.keys(query).forEach(function (key) {
                        if (typeof query[key] === 'string' ||
                                typeof query[key] === 'number' ||
                                typeof query[key] === 'boolean' ||
                                query[key] === null) {
                            usableQueryKeys.push(key);
                        }
                    });
                    usableQueryKeys = usableQueryKeys.filter(function (element) {
                        return self.dbIndexDict.hasOwnProperty(element);
                    });
                    if (usableQueryKeys.length > 0) {
                        return options.onNext(null, self.dbIndexDict[usableQueryKeys[0]]
                            .getMatching(query[usableQueryKeys[0]]));
                    }

                    // For a $in match
                    usableQueryKeys = [];
                    Object.keys(query).forEach(function (key) {
                        if (query[key] && query[key].hasOwnProperty('$in')) {
                            usableQueryKeys.push(key);
                        }
                    });
                    usableQueryKeys = usableQueryKeys.filter(function (element) {
                        return self.dbIndexDict.hasOwnProperty(element);
                    });
                    if (usableQueryKeys.length > 0) {
                        return options.onNext(
                            null,
                            self.dbIndexDict[usableQueryKeys[0]]
                                .getMatching(query[usableQueryKeys[0]].$in)
                        );
                    }

                    // For a comparison match
                    usableQueryKeys = [];
                    Object.keys(query).forEach(function (key) {
                        if (query[key] && (query[key].hasOwnProperty('$lt') ||
                                query[key].hasOwnProperty('$lte') ||
                                query[key].hasOwnProperty('$gt') ||
                                query[key].hasOwnProperty('$gte'))) {
                            usableQueryKeys.push(key);
                        }
                    });
                    usableQueryKeys = usableQueryKeys.filter(function (element) {
                        return self.dbIndexDict.hasOwnProperty(element);
                    });
                    if (usableQueryKeys.length > 0) {
                        return options.onNext(
                            null,
                            self.dbIndexDict[usableQueryKeys[0]].dbTree.betweenBounds(
                                query[usableQueryKeys[0]]
                            )
                        );
                    }

                    // By default, return all the DB data
                    return options.onNext(null, self.dbRowList());
                // STEP 2: remove all expired dbRow's
                default:
                    // validate no error occurred
                    local.db.assert(!error, error);
                    var validDocs = [],
                        dbIndexTtlDictFieldNames = Object.keys(self.dbIndexTtlDict);
                    onParallel = local.db.onParallel(function (error) {
                        onError(error, validDocs);
                    });
                    onParallel.counter += 1;
                    data.forEach(function (dbRow) {
                        var valid = true;
                        dbIndexTtlDictFieldNames.forEach(function (ii) {
                            if (dbRow[ii] !== undefined &&
                                    Date.now() > new Date(dbRow[ii]).getTime() +
                                    self.dbIndexTtlDict[ii] * 1000) {
                                valid = false;
                            }
                        });
                        if (valid) {
                            validDocs.push(dbRow);
                        } else {
                            onParallel.counter += 1;
                            self.crudRemoveOne({ query: { _id: dbRow._id } }, onParallel);
                        }
                    });
                    onParallel();
                }
            });
            options.modeNext = 0;
            options.onNext();
        };

        local.db._DbTable.prototype.crudInsertMany = function (dbRowList, onError) {
        /*
         * Insert a new dbRow
         * @param {Function} onError - callback, signature: error, insertedDoc
         *
         * @api private Use Datastore.crudInsertMany which has the same signature
         */
            var self, timeNow;
            self = this;
            timeNow = new Date().toISOString();
            dbRowList = dbRowList.map(function (dbRow) {
                dbRow = local.db.jsonCopy(dbRow);
                dbRow.createdAt = dbRow.createdAt || timeNow;
                dbRow.updatedAt = dbRow.updatedAt || timeNow;
                local.db.dbRowValidate(dbRow);
                return dbRow;
            });
            // add to indexes
            self.dbIndexList().forEach(function (dbIndex) {
                dbIndex.insert(dbRowList);
            });
            setTimeout(function () {
                self.dbTablePersist();
                onError(null, local.db.jsonCopy(dbRowList));
            }, 10);
        };

        local.db._DbTable.prototype.crudSetMany = function (dbRowList, onError) {
        /*
         * this function will set many dbRow's into dbTable
         */
            var self, timeNow;
            self = this;
            timeNow = new Date().toISOString();
            dbRowList = dbRowList.map(function (dbRow) {
                dbRow = local.db.jsonCopy(dbRow);
                dbRow.createdAt = dbRow.createdAt || timeNow;
                dbRow.updatedAt = dbRow.updatedAt || timeNow;
                local.db.dbRowValidate(dbRow);
                return dbRow;
            });
            // add to indexes
            self.dbIndexList().forEach(function (dbIndex) {
                dbIndex.insert(dbRowList);
            });
            setTimeout(function () {
                self.dbTablePersist();
                onError(null, local.db.jsonCopy(dbRowList));
            }, 10);
        };

        local.db._DbTable.prototype.crudUpdate = function (
            query,
            updateQuery,
            options,
            onError
        ) {
        /*
         * Update all docs matching query
         * @param {Object} query
         * @param {Object} updateQuery
         * @param {Object} options Optional options
         * options.multi If true, can update multiple dbRow's (defaults to false)
         * options.upsert If true, dbRow is inserted if the query doesn't match anything
         * @param {Function} onError - callback, signature:
         * (error, numAffected, affectedDocuments, upsert)
         *    If update was an upsert, upsert flag is set to true
         *    affectedDocuments can be one of the following:
         *      * For an upsert, the upserted dbRow
         *      * For an update, the array of updated dbRow's
         *
         * WARNING: The API was changed between v1.7.4 and v1.8,
         * for consistency and readability reasons. Prior and including to v1.7.4,
         * the onError signature was (error, numAffected, updated)
         * where updated was the updated dbRow in case of an upsert
         * or the array of updated dbRow's for an update. That meant that the type of
         * affectedDocuments in a non multi update depended
         * on whether there was an upsert or not, leaving only two ways for the
         * user to check whether an upsert had occured:
         * checking the type of affectedDocuments or running another find query on
         * the whole dataset to check its size. Both options being ugly,
         * the breaking change was necessary.
         *
         * @api private Use Datastore.crudUpdate which has the same signature
         */
            var self = this, numReplaced = 0, multi, upsert, ii;

            multi = options.multi !== undefined ? options.multi : false;
            upsert = options.upsert !== undefined ? options.upsert : false;

            options = {};
            local.db.onNext(options, function () {
                var cursor, modifiedDoc, modifications, createdAt;
                switch (options.modeNext) {
                case 1:
                    // If upsert option is set, check whether we need to insert the dbRow
                    if (!upsert) {
                        return options.onNext();
                    }

                    // Need to use an internal function not tied to the executor
                    // to avoid deadlock
                    cursor = new local.db.Cursor(self, query);
                    cursor.limit(1)._exec(function (error, docs) {
                        if (error) {
                            return onError(error);
                        }
                        if (docs.length === 1) {
                            return options.onNext();
                        }
                        var toBeInserted;

                        try {
                            local.db.dbRowValidate(updateQuery);
                            // updateQuery is a simple object with no modifier,
                            // use it as the dbRow to insert
                            toBeInserted = updateQuery;
                        } catch (errorCaught) {
                            // updateQuery contains modifiers, use the find query as the base,
                            // strip it from all operators and update it
                            // according to updateQuery
                            toBeInserted = local.db.dbRowModify(
                                local.db.dbRowDeepCopy(query, true),
                                updateQuery
                            );
                        }

                        toBeInserted = [toBeInserted];
                        local.db.assert(!toBeInserted[0] || !Array.isArray(toBeInserted[0]));
                        return self.crudInsertMany(toBeInserted, function (error, newDoc) {
                            if (error) {
                                return onError(error);
                            }
                            return onError(null, 1, newDoc, true);
                        });
                    });
                    break;
                default:
                    // Perform the update
                    modifications = [];

                    self.dbIndexCullMany(query, function (error, dbRowList) {
                        if (error) {
                            return onError(error);
                        }

                        // Preparing update (if an error is thrown here neither the datafile nor
                        // the in-memory indexes are affected)
                        try {
                            for (ii = 0; ii < dbRowList.length; ii += 1) {
                                if (local.db.queryMatch(dbRowList[ii], query) &&
                                        (multi ||
                                        numReplaced === 0)) {
                                    numReplaced += 1;
                                    createdAt = dbRowList[ii].createdAt;
                                    modifiedDoc = local.db.dbRowModify(
                                        dbRowList[ii],
                                        updateQuery
                                    );
                                    modifiedDoc.createdAt = createdAt;
                                    modifiedDoc.updatedAt = new Date().toISOString();
                                    modifications.push({
                                        oldDoc: dbRowList[ii],
                                        newDoc: modifiedDoc
                                    });
                                }
                            }
                        } catch (errorCaught) {
                            return onError(errorCaught);
                        }

                        // Change the docs in memory
                        // update indexes
                        self.dbIndexList().forEach(function (dbIndex) {
                            dbIndex.updateMultipleDocs(modifications);
                        });
                        // Update the datafile
                        var updatedDocs, updatedDocsDC;
                        updatedDocs = modifications.map(function (element) {
                            return element.newDoc;
                        });
                        updatedDocsDC = [];
                        updatedDocs.forEach(function (dbRow) {
                            updatedDocsDC.push(local.db.jsonCopy(dbRow));
                        });
                        setTimeout(function () {
                            self.dbTablePersist();
                            onError(null, numReplaced, updatedDocsDC);
                        });
                    });
                }
            });
            options.modeNext = 0;
            options.onNext();
        };
    }());
    switch (local.modeJs) {



    // run browser js-env code - post-init
    case 'browser':
        // init exports
        local.global.db_lite = local.global.utility2_db = local.db;
        local.db.NODE_ENV = 'undefined';
        break;



    // run node js-env code - post-init
    case 'node':
        // require modules
        local.child_process = require('child_process');
        local.fs = require('fs');
        local.os = require('os');
        // init exports
        module.exports = module['./lib.db.js'] = local.db;
        local.db.__dirname = __dirname;
        local.db.NODE_ENV = process.env.NODE_ENV;
        break;
    }



    // run shared js-env code - post-init
    (function () {
        // init dbStorage
        local.db.dbStorageInit();
    }());
}());
