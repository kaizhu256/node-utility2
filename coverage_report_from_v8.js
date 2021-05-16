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
        let fileDict;
        fileDict = {};
        cwd = process.cwd().replace((
            /\\/g
        ), "/") + "/";
        result.forEach(function ({
            functions,
            url
        }) {
            let coverageLevel;
            let coveragePct;
            let html;
            let lineList;
            let linesTotal;
            let linesUncovered;
            let pathname;
            let src;
            if (url.indexOf("file:///") !== 0) {
                return;
            }
            pathname = url.replace("file:///", "").replace((
                /\\\\/g
            ), "/");
            if (pathname.indexOf(cwd) !== 0) {
                return;
            }
            pathname = pathname.replace(cwd, "");
            src = require("fs").readFileSync(pathname, "utf8");
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
                        /*
                        debugInline(
                            count,
                            [elem.startOffset, startOffset],
                            [elem.endOffset, endOffset],
                            elem.line
                        );
                        */
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
            linesTotal = lineList.length;
            linesUncovered = lineList.filter(function ({
                count
            }) {
                return count <= 0;
            }).length;
            coveragePct = Math.floor(
                10000 - 10000 * linesUncovered / linesTotal
            );
            coverageLevel = (
                coveragePct >= 80
                ? "coverageHigh"
                : coveragePct >= 50
                ? "coverageMedium"
                : "coverageLow"
            );
            coveragePct = String(coveragePct).replace((
                /..$/m
            ), ".$&") + "%";
            fileDict[pathname] = {
                lineList,
                linesTotal,
                linesUncovered,
                src
            };
            html = String(`
<!doctype html>
<html lang="en">
<head>
<title>coverage</title>
<style>
* {
    box-sizing: border-box;
    font-family: consolas, menlo, monospace;
}
body {
    margin: 0;
}
.coverageCode {
    padding: 5px;
}
.coverageCode a {
    text-decoration: none;
}
.coverageCode pre,
.coverageHeader pre {
    margin: 5px 0;
}
.coverageCode .count {
    background: #9d9;
    margin: 0 5px;
    padding: 0 5px;
}
.coverageCode .lineno {
    background: #fff;
}
.coverageCode .uncovered,
.coverageHeader .uncovered {
    background: #d99;
}
.coverageHeader table {
    border-collapse: collapse;
    text-align: right;
}
.coverageHeader td span {
    display: inline-block;
    width: 100%;
}
.coverageHeader td,
.coverageHeader th {
    border: 1px solid #777;
    margin: 0;
    padding: 5px;
}
.coverageHeader {
    background: #ddd;
    padding: 5px;
    width: 100%;
}
.coverageHeader .coverageHigh{
    background: #9d9;
}
.coverageHeader .coverageMedium{
    background: #9d9;
}
.coverageHeader .coverageLow{
    background: #d99;
}
.coverageCode pre:hover span {
    background: #bbd;
}
</style>
</head>
<body>
<div class="coverageHeader">
<div>
file:
<span><a href="..">./</a></span><span>${stringHtmlSafe(pathname)}</span>
</div>
<table>
<thead>
<tr>
    <th>coverage %</th>
    <th>lines total</th>
    <th>lines uncovered</th>
</tr>
</thead>
<tbody>
<tr>
    <td class="${coverageLevel}">${coveragePct}</td>
    <td>${linesTotal}</td>
    <td class="uncovered">${linesUncovered}</td>
</tr>
</tbody>
</table>
</div>
<div class="coverageCode">
<pre><span> line</span><span class="count">  count</span><span>code</span></pre>
            `).trim();
            lineList.forEach(function ({
                count,
                holeList,
                line,
                startOffset
            }, ii) {
                let chunk;
                let inHole;
                let lineId;
                lineId = "line_" + (ii + 1);
                html += "<pre>";
                html += "<span class=\"lineno\">";
                html += `<a href="#${lineId}" id="${lineId}">`;
                html += String(ii + 1).padStart(5, " ");
                html += "</a>";
                html += "</span>";
                html += (
                    count <= 0
                    ? "<span class=\"count uncovered\">"
                    : "<span class=\"count\">"
                );
                html += String(count).padStart(7, " ");
                html += "</span>";
                html += "<span>";
                switch (count) {
                case -1:
                case 0:
                    if (holeList.length === 0) {
                        html += "</span>";
                        html += "<span class=\"uncovered\">";
                        html += stringHtmlSafe(line);
                        html += "</span>";
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
                        aa = Math.max(aa - startOffset, 0);
                        bb = Math.min(bb - startOffset, line.length);
                        while (aa < bb) {
                            line[aa].isHole = true;
                            aa += 1;
                        }
                    });
                    chunk = "";
                    line.forEach(function ({
                        chr,
                        isHole
                    }) {
                        if (inHole !== isHole) {
                            html += stringHtmlSafe(chunk);
                            html += (
                                isHole
                                ? "</span><span class=\"uncovered\">"
                                : "</span><span>"
                            );
                            chunk = "";
                            inHole = isHole;
                        }
                        chunk += chr;
                    });
                    html += stringHtmlSafe(chunk);
                    html += "</span>";
                    break;
                default:
                    html += stringHtmlSafe(line);
                    html += "</span>";
                }
                html += "</pre>\n";
            });
            html += "</div>\n</body>\n</html>\n";
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
