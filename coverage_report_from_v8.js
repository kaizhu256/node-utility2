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
    function stringHtmlSafe(str) {
    /*
     * this function will make <str> html-safe
     * https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html
     */
        return str.replace((
            /&/gu
        ), "&amp;").replace((
            /"/gu
        ), "&quot;").replace((
            /'/gu
        ), "&apos;").replace((
            /</gu
        ), "&lt;").replace((
            />/gu
        ), "&gt;").replace((
            /&amp;(amp;|apos;|gt;|lt;|quot;)/igu
        ), "&$1");
    }

    function coverageReportCreate({
        result
    }) {
        let cwd;
        //!! let fileDict;
        //!! fileDict = {};
        cwd = process.cwd().replace((
            /\\/g
        ), "/") + "/";
        result.forEach(function ({
            functions,
            url
        }) {
            let html;
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
                /^.*$/gm
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
            //!! fileDict[url.replace(cwd, "")] = {
                //!! lineList,
                //!! src
            //!! };
            html = "";
            html += (`
<style>
pre {
}
.uncovered {
    background: #f77;
}
</style>
            `);
            html += "<div>\n";
            lineList.forEach(function ({
                count,
                holeList,
                line,
                startOffset
            }) {
                let chunk;
                let inHole;
                switch (count) {
                case -1:
                case 0:
                    if (holeList.length === 0) {
                        html += (
                            "<pre><span class=\"uncovered\">" +
                            stringHtmlSafe(line) +
                            "</span></pre>\n"
                        );
                        break;
                    }
                    line = line.split("").map(function (chr) {
                        return {
                            chr,
                            isHole: undefined
                        };
                    });
                    holeList.forEach(function ([
                        aa, bb
                    ]) {
                        aa = aa - startOffset;
                        bb = Math.min(bb - startOffset, line.length);
                        while (aa < bb) {
                            line[aa].isHole = true;
                            aa += 1;
                        }
                    });
                    chunk = "";
                    html += "<pre>";
                    line.forEach(function ({
                        chr,
                        isHole
                    }) {
                        if (inHole !== isHole) {
                            html += stringHtmlSafe(chunk);
                            html += (
                                isHole
                                ? "<span class=\"uncovered\">"
                                : "</span>"
                            );
                            chunk = "";
                            inHole = isHole;
                        }
                        chunk += chr;
                    });
                    html += stringHtmlSafe(chunk);
                    html += "</pre>\n";
                    break;
                default:
                    html += "<pre>" + stringHtmlSafe(line) + "</pre>\n";
                }
            });
            html += "</div>\n";
            require("fs").writeFileSync(".tmp/zz.html", html);
        });
        //!! debugInline(JSON.stringify(fileDict, undefined, 4));
        //!! Object.entries(fileDict).forEach(function ([
            //!! file, val
        //!! ]) {
        //!! });
    }
    coverageReportCreate(JSON.parse(require("fs").readFileSync(
        ".tmp/" + require("fs").readdirSync(".tmp/")[0],
        "utf8"
    )));
}());
