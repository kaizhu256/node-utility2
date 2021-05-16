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
            src = require("fs").readFileSync(url, "utf8");
            lineList = [{}];
            src.replace((
                /^.*(?:\r\n|\n|$)/gm
            ), function (line, startOffset) {
                lineList[lineList.length - 1].endOffset = startOffset - 1;
                lineList.push({
                    count: -1,
                    endOffset: 0,
                    holeList: [],
                    line,
                    startOffset
                });
                return "";
            });
            lineList.shift();
            lineList[lineList.length - 1].endOffset = src.length;
            functions.reverse().forEach(function ({
                ranges
            }) {
                ranges.reverse().forEach(function ({
                    count,
                    endOffset,
                    startOffset
                }, ii, list) {
                    lineList.forEach(function (elem) {
                        //!! debugInline(
                            //!! count,
                            //!! [startOffset, elem.startOffset],
                            //!! [elem.endOffset, endOffset],
                            //!! elem.line
                        //!! );
                        if (!(
                            (
                                elem.startOffset <= startOffset &&
                                startOffset <= elem.endOffset
                            ) || (
                                elem.startOffset <= endOffset &&
                                endOffset <= elem.endOffset
                            ) || (
                                startOffset <= elem.startOffset &&
                                elem.endOffset <= endOffset
                            )
                        )) {
                            return;
                        }
                        // handle root-range
                        if (ii + 1 === list.length) {
                            if (elem.count === -1) {
                                elem.count = count;
                            }
                            return;
                        }
                        // handle non-root-range
                        if (elem.count !== 0) {
                            elem.count = Math.max(count, elem.count);
                        }
                        if (count === 0) {
                            elem.count = 0;
                            elem.holeList.push([
                                startOffset, endOffset
                            ]);
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
