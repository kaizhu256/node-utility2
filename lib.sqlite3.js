#!/usr/bin/env node
/*
 * lib.sqlite3.js (2020.8.19)
 * https://github.com/kaizhu256/node-sqlite3-lite
 * this zero-dependency package will provide pre-built version of node-sqlite3 (v5.0.0)
 *
 */


/* istanbul instrument in package sqlite3 */
// assets.utility2.header.js - start
/* jslint utility2:true */
/* istanbul ignore next */
// run shared js-env code - init-local
(function () {
    "use strict";
    let isBrowser;
    let isWebWorker;
    let local;
    // init debugInline
    if (!globalThis.debugInline) {
        let consoleError;
        consoleError = console.error;
        globalThis.debugInline = function (...argList) {
        /*
         * this function will both print <argList> to stderr
         * and return <argList>[0]
         */
            consoleError("\n\ndebugInline");
            consoleError(...argList);
            consoleError("\n");
            return argList[0];
        };
    }
    // init isBrowser
    isBrowser = (
        typeof globalThis.XMLHttpRequest === "function"
        && globalThis.navigator
        && typeof globalThis.navigator.userAgent === "string"
    );
    // init isWebWorker
    isWebWorker = (
        isBrowser && typeof globalThis.importScripts === "function"
    );
    // init function
    function assertJsonEqual(aa, bb) {
    /*
     * this function will assert JSON.stringify(<aa>) === JSON.stringify(<bb>)
     */
        function objectDeepCopyWithKeysSorted(obj) {
        /*
         * this function will recursively deep-copy <obj> with keys sorted
         */
            let sorted;
            if (typeof obj !== "object" || !obj) {
                return obj;
            }
            // recursively deep-copy list with child-keys sorted
            if (Array.isArray(obj)) {
                return obj.map(objectDeepCopyWithKeysSorted);
            }
            // recursively deep-copy obj with keys sorted
            sorted = {};
            Object.keys(obj).sort().forEach(function (key) {
                sorted[key] = objectDeepCopyWithKeysSorted(obj[key]);
            });
            return sorted;
        }
        aa = JSON.stringify(objectDeepCopyWithKeysSorted(aa));
        bb = JSON.stringify(objectDeepCopyWithKeysSorted(bb));
        if (aa !== bb) {
            throw new Error(JSON.stringify(aa) + " !== " + JSON.stringify(bb));
        }
    }
    function assertOrThrow(passed, msg) {
    /*
     * this function will throw <msg> if <passed> is falsy
     */
        if (passed) {
            return;
        }
        throw (
            (
                msg
                && typeof msg.message === "string"
                && typeof msg.stack === "string"
            )
            // if msg is err, then leave as is
            ? msg
            : new Error(
                typeof msg === "string"
                // if msg is string, then leave as is
                ? msg
                // else JSON.stringify(msg)
                : JSON.stringify(msg, undefined, 4)
            )
        );
    }
    function coalesce(...argList) {
    /*
     * this function will coalesce null, undefined, or "" in <argList>
     */
        let arg;
        let ii;
        ii = 0;
        while (ii < argList.length) {
            arg = argList[ii];
            if (arg !== undefined && arg !== null && arg !== "") {
                return arg;
            }
            ii += 1;
        }
        return arg;
    }
    function identity(val) {
    /*
     * this function will return <val>
     */
        return val;
    }
    function nop() {
    /*
     * this function will do nothing
     */
        return;
    }
    function objectAssignDefault(tgt = {}, src = {}, depth = 0) {
    /*
     * this function will if items from <tgt> are null, undefined, or "",
     * then overwrite them with items from <src>
     */
        let recurse;
        recurse = function (tgt, src, depth) {
            Object.entries(src).forEach(function ([
                key, bb
            ]) {
                let aa;
                aa = tgt[key];
                if (aa === undefined || aa === null || aa === "") {
                    tgt[key] = bb;
                    return;
                }
                if (
                    depth !== 0
                    && typeof aa === "object" && aa && !Array.isArray(aa)
                    && typeof bb === "object" && bb && !Array.isArray(bb)
                ) {
                    recurse(aa, bb, depth - 1);
                }
            });
        };
        recurse(tgt, src, depth | 0);
        return tgt;
    }
    function onErrorThrow(err) {
    /*
     * this function will throw <err> if exists
     */
        if (err) {
            throw err;
        }
    }
    // bug-workaround - throw unhandledRejections in node-process
    if (
        typeof process === "object" && process
        && typeof process.on === "function"
        && process.unhandledRejections !== "strict"
    ) {
        process.unhandledRejections = "strict";
        process.on("unhandledRejection", function (err) {
            throw err;
        });
    }
    // init local
    local = {};
    local.local = local;
    globalThis.globalLocal = local;
    local.assertJsonEqual = assertJsonEqual;
    local.assertOrThrow = assertOrThrow;
    local.coalesce = coalesce;
    local.identity = identity;
    local.isBrowser = isBrowser;
    local.isWebWorker = isWebWorker;
    local.nop = nop;
    local.objectAssignDefault = objectAssignDefault;
    local.onErrorThrow = onErrorThrow;
}());
// assets.utility2.header.js - end


(function (local) {
"use strict";


/* istanbul ignore next */
// run shared js-env code - init-before
(function () {
// init local
local = (
    globalThis.utility2_rollup
    // || globalThis.utility2_rollup_old
    // || require("./assets.utility2.rollup.js")
    || globalThis.globalLocal
);
// init exports
if (local.isBrowser) {
    globalThis.utility2_sqlite3 = local;
} else {
    module.exports = local;
    module.exports.__dirname = __dirname;
}
// init lib main
local.sqlite3 = local;


/* validateLineSortedReset */
/*
 * shell-command to download-and-install prebuilt-binary:
node lib.sqlite3.js install
 */
if (local.isBrowser) {
    return;
}
if (
    module === require.main
    && process.argv[2] === "install"
    && require("path").basename(process.argv[1]) === "lib.sqlite3.js"
) {
    let dict;
    dict = {};
    [
        "x64", process.arch
    ].forEach(function (arch) {
        [
            "darwin", "linux", "win32", process.platform
        ].forEach(function (platform) {
            let file;
            file = "napi-v3-" + platform + "-" + arch;
            if (dict.hasOwnProperty(file)) {
                return;
            }
            dict[file] = true;
            console.error(
                "sqlite3 - fetching "
                + "https://mapbox-node-binary.s3.amazonaws.com/sqlite3/v5.0.0/"
                + file + ".tar.gz"
            );
            require("child_process").spawnSync((
                "curl -A \"chrome\" -Lf "
                + "https://mapbox-node-binary.s3.amazonaws.com/sqlite3/v5.0.0/"
                + file + ".tar.gz "
                + "| tar -O -xz " + file + "/node_sqlite3.node "
                + "> .node_sqlite3-v5.0.0-" + file + ".node"
            ), {
                encoding: "utf8",
                shell: true,
                stdio: [
                    "ignore", 1, 2
                ]
            });
        });
    });
    return;
}
/* jslint ignore:start */
(function () {
"use strict";
let EventEmitter = require('events').EventEmitter;
let path = require('path');
let util = require('util');
let exports_mapbox_node_sqlite3_lib_sqlite3 = {};
let exports_mapbox_node_sqlite3_lib_sqlite3_binding = {};
// hack-sqlite3 - require binding
let sqlite3_binding_file = (
    ".node_sqlite3-v5.0.0-napi-v3-"
    + process.platform + "-" + process.arch
    + ".node"
);
if (!require("fs").existsSync(__dirname + "/" + sqlite3_binding_file)) {
    return;
}
exports_mapbox_node_sqlite3_lib_sqlite3_binding = require(
    "./" + sqlite3_binding_file
);
let exports_mapbox_node_sqlite3_lib_trace = {};
/*
repo https://github.com/mapbox/node-sqlite3/tree/v5.0.0
committed 2020-06-02T12:27:30Z
*/


/*
file https://github.com/mapbox/node-sqlite3/blob/v5.0.0/lib/trace.js
*/
// Inspired by https://github.com/tlrobinson/long-stack-traces
// var util = require('util');

function extendTrace(object, property, pos) {
    if (!Object.getOwnPropertyDescriptor(object, property).writable) {
        return;
    }
    var old = object[property];
    object[property] = function() {
        var error = new Error();
        var name = object.constructor.name + '#' + property + '(' +
            Array.prototype.slice.call(arguments).map(function(el) {
                return util.inspect(el, false, 0);
            }).join(', ') + ')';

        if (typeof pos === 'undefined') pos = -1;
        if (pos < 0) pos += arguments.length;
        var cb = arguments[pos];
        if (typeof arguments[pos] === 'function') {
            arguments[pos] = function replacement() {
                var err = arguments[0];
                if (err && err.stack && !err.__augmented) {
                    err.stack = filter(err).join('\n');
                    err.stack += '\n--> in ' + name;
                    err.stack += '\n' + filter(error).slice(1).join('\n');
                    err.__augmented = true;
                }
                return cb.apply(this, arguments);
            };
        }
        return old.apply(this, arguments);
    };
}
exports_mapbox_node_sqlite3_lib_trace.extendTrace = extendTrace;


function filter(error) {
    return error.stack.split('\n').filter(function(line) {
        return line.indexOf(__filename) < 0;
    });
}


/*
file https://github.com/mapbox/node-sqlite3/blob/v5.0.0/lib/sqlite3.js
*/
// var path = require('path');
// var sqlite3 = exports_mapbox_node_sqlite3_lib_sqlite3_binding;
// var EventEmitter = require('events').EventEmitter;
// hack-sqlite3 - init exports
let sqlite3 = exports_mapbox_node_sqlite3_lib_sqlite3_binding;

function normalizeMethod (fn) {
    return function (sql) {
        var errBack;
        var args = Array.prototype.slice.call(arguments, 1);
        if (typeof args[args.length - 1] === 'function') {
            var callback = args[args.length - 1];
            errBack = function(err) {
                if (err) {
                    callback(err);
                }
            };
        }
        var statement = new Statement(this, sql, errBack);
        return fn.call(this, statement, args);
    };
}

function inherits(target, source) {
    for (var k in source.prototype)
        target.prototype[k] = source.prototype[k];
}

sqlite3.cached = {
    Database: function(file, a, b) {
        if (file === '' || file === ':memory:') {
            // Don't cache special databases.
            return new Database(file, a, b);
        }

        var db;
        file = path.resolve(file);
        function cb() { callback.call(db, null); }

        if (!sqlite3.cached.objects[file]) {
            db = sqlite3.cached.objects[file] = new Database(file, a, b);
        }
        else {
            // Make sure the callback is called.
            db = sqlite3.cached.objects[file];
            var callback = (typeof a === 'number') ? b : a;
            if (typeof callback === 'function') {
                if (db.open) process.nextTick(cb);
                else db.once('open', cb);
            }
        }

        return db;
    },
    objects: {}
};


var Database = sqlite3.Database;
var Statement = sqlite3.Statement;
var Backup = sqlite3.Backup;

inherits(Database, EventEmitter);
inherits(Statement, EventEmitter);
inherits(Backup, EventEmitter);

// Database#prepare(sql, [bind1, bind2, ...], [callback])
Database.prototype.prepare = normalizeMethod(function(statement, params) {
    return params.length
        ? statement.bind.apply(statement, params)
        : statement;
});

// Database#run(sql, [bind1, bind2, ...], [callback])
Database.prototype.run = normalizeMethod(function(statement, params) {
    statement.run.apply(statement, params).finalize();
    return this;
});

// Database#get(sql, [bind1, bind2, ...], [callback])
Database.prototype.get = normalizeMethod(function(statement, params) {
    statement.get.apply(statement, params).finalize();
    return this;
});

// Database#all(sql, [bind1, bind2, ...], [callback])
Database.prototype.all = normalizeMethod(function(statement, params) {
    statement.all.apply(statement, params).finalize();
    return this;
});

// Database#each(sql, [bind1, bind2, ...], [callback], [complete])
Database.prototype.each = normalizeMethod(function(statement, params) {
    statement.each.apply(statement, params).finalize();
    return this;
});

Database.prototype.map = normalizeMethod(function(statement, params) {
    statement.map.apply(statement, params).finalize();
    return this;
});

// Database#backup(filename, [callback])
// Database#backup(filename, destName, sourceName, filenameIsDest, [callback])
Database.prototype.backup = function() {
    var backup;
    if (arguments.length <= 2) {
        // By default, we write the main database out to the main database of the named file.
        // This is the most likely use of the backup api.
        backup = new Backup(this, arguments[0], 'main', 'main', true, arguments[1]);
    } else {
        // Otherwise, give the user full control over the sqlite3_backup_init arguments.
        backup = new Backup(this, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    }
    // Per the sqlite docs, exclude the following errors as non-fatal by default.
    backup.retryErrors = [sqlite3.BUSY, sqlite3.LOCKED];
    return backup;
};

Statement.prototype.map = function() {
    var params = Array.prototype.slice.call(arguments);
    var callback = params.pop();
    params.push(function(err, rows) {
        if (err) return callback(err);
        var result = {};
        if (rows.length) {
            var keys = Object.keys(rows[0]), key = keys[0];
            if (keys.length > 2) {
                // Value is an object
                for (var i = 0; i < rows.length; i++) {
                    result[rows[i][key]] = rows[i];
                }
            } else {
                var value = keys[1];
                // Value is a plain value
                for (i = 0; i < rows.length; i++) {
                    result[rows[i][key]] = rows[i][value];
                }
            }
        }
        callback(err, result);
    });
    return this.all.apply(this, params);
};

var isVerbose = false;

var supportedEvents = [ 'trace', 'profile', 'insert', 'update', 'delete' ];

Database.prototype.addListener = Database.prototype.on = function(type) {
    var val = EventEmitter.prototype.addListener.apply(this, arguments);
    if (supportedEvents.indexOf(type) >= 0) {
        this.configure(type, true);
    }
    return val;
};

Database.prototype.removeListener = function(type) {
    var val = EventEmitter.prototype.removeListener.apply(this, arguments);
    if (supportedEvents.indexOf(type) >= 0 && !this._events[type]) {
        this.configure(type, false);
    }
    return val;
};

Database.prototype.removeAllListeners = function(type) {
    var val = EventEmitter.prototype.removeAllListeners.apply(this, arguments);
    if (supportedEvents.indexOf(type) >= 0) {
        this.configure(type, false);
    }
    return val;
};

// Save the stack trace over EIO callbacks.
sqlite3.verbose = function() {
    if (!isVerbose) {
// hack-sqlite3 - require module
        var trace = exports_mapbox_node_sqlite3_lib_trace;
        [
            'prepare',
            'get',
            'run',
            'all',
            'each',
            'map',
            'close',
            'exec'
        ].forEach(function (name) {
            trace.extendTrace(Database.prototype, name);
        });
        [
            'bind',
            'get',
            'run',
            'all',
            'each',
            'map',
            'reset',
            'finalize',
        ].forEach(function (name) {
            trace.extendTrace(Statement.prototype, name);
        });
        isVerbose = true;
    }

    return this;
};
// hack-sqlite3 - init exports
let trace           = exports_mapbox_node_sqlite3_lib_trace;
Object.assign(local, sqlite3, { sqlite3_binding_file });
}());


/*
file none
*/
/* jslint ignore:end */
}());
}());
