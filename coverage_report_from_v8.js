/* jslint utility2:true */
// init debugInline
if (!globalThis.debugInline) {
    let consoleError;
    consoleError = console.error;
    globalThis.debugInline = function (...argList) {
    /*
     * this function will both print <argList> to stderr and
     * return <argList>[0]
     */
        consoleError("\n\ndebugInline");
        consoleError(...argList);
        consoleError("\n");
        return argList[0];
    };
}
(function () {
    "use strict";
    function coverageReportCreate({
        result
    }) {
        let cwd;
        let tmp;
        //!! fileDict = {};
        cwd = process.cwd().replace((
            /\\/g
        ), "/") + "/";
        result.forEach(function ({
            functions,
            url
        }) {
            let lineList;
            let src;
            if (url.indexOf("file:///") !== 0) {
                return;
            }
            url = url.replace("file:///", "").replace((
                /\\\\/g
            ), "/");
            if (url.indexOf(cwd) !== 0) {
                return;
            }
            debugInline(url);
            src = require("fs").readFileSync(url, "utf8");
            //!! src.replace((
                //!! /^.*?(?:\r\n|\n)
            //!! lineList = src.matchAll((
                //!! /\r\n|\n/g
            //!! )).map(function (ignore, line;
            lineList = [];
            src.replace((
                /.*/g
            ), function (line, offset) {
                lineList.push({
                    count: 0,
                    line,
                    offset,
                    uncoveredList: []
                });
                return "";
            });
            functions.forEach(function ({
                ranges
            }) {
                ranges.forEach(function ({
                    count,
                    endOffset,
                    startOffset
                }) {
                    lineList.forEach(function (elem) {
                        if (
                            elem.offset < startOffset ||
                            elem.offset > endOffset
                        ) {
                            return;
                        }
                        elem.count = Math.max(count, elem.count);
                        if (count === 0) {
                            elem.count = 0;
                        }
                    });
                });
            });
            debugInline(lineList);
        });
    }
    coverageReportCreate(JSON.parse(require("fs").readFileSync(
        ".tmp/coverage-5068-1621146746713-0.json",
        "utf8"
    )));
}());
