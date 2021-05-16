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
.coverage .content {
    padding: 20px;
}
.coverage .content a {
    text-decoration: none;
}
.coverage pre {
    margin: 5px 0;
}
.coverage .count {
    margin: 0 5px;
    padding: 0 5px;
}
.coverage .header {
    padding: 20px;
}
.coverage table {
    border-collapse: collapse;
    margin-top: 20px;
    text-align: right;
}
.coverage table:nth-child(1) {
    margin-top: 0;
}
.coverage td span {
    display: inline-block;
    width: 100%;
}
.coverage td,
.coverage th {
    border: 5px solid #bbb;
    margin: 0;
    padding: 5px;
}
.coverage td,
.coverage th {
    background: #fff;
}
.coverage .count {
    background: #9d9;
}
.coverage .lineno {
    background: #fff;
}
.coverage .uncovered {
    background: #d99;
}
.coverage .header {
    background: #eee;
}
.coverage .coverageHigh{
    background: #9d9;
}
.coverage .coverageMedium{
    background: #fd7;
}
.coverage .coverageLow{
    background: #d99;
}
.coverage pre:hover span {
    background: #bbd;
}
</style>
</head>
<body class="coverage">
<div class="header">
<table>
<thead>
<tr>
    <th>file</th>
    <th>
        <span><a href="..">./</a></span><span>${stringHtmlSafe(pathname)}</span>
    </th>
</tr>
</thead>
</table>
<table>
<thead>
<tr>
    <th>% coverage</th>
    <th># lines total</th>
    <th># lines not covered</th>
    <th>lineno not covered</th>
</tr>
</thead>
<tbody>
<tr>
    <td class="${coverageLevel}">${coveragePct}</td>
    <td>${linesTotal}</td>
    <td class="uncovered">${linesUncovered}</td>
    <td></td>
</tr>
</tbody>
</table>
</div>
<div class="content">
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
                html += String(`
<pre>
<span class="lineno">
<a href="#${lineId}" id="${lineId}">${String(ii + 1).padStart(5, " ")}</a>
</span>
<span class="count
                ${(
                    count <= 0
                    ? "uncovered"
                    : ""
                )}"
>
${String(count).padStart(7, " ")}
</span>
<span>
                `).trim().replace((
                    /\n/g
                ), "");
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
                    break;
                default:
                    html += stringHtmlSafe(line);
                }
                html += "</span>";
                html += "</pre>\n";
            });
            html += String(`
</div>
<div class="coverageFooter">
</div>
</body>
</html>
            `).trim();
            require("fs").writeFileSync(".tmp/zz.html", html);
            fileDict[pathname] = {
                lineList,
                linesTotal,
                linesUncovered,
                src
            };
        });
    }
    coverageReportCreate(JSON.parse(require("fs").readFileSync(
        ".tmp/" + require("fs").readdirSync(".tmp/")[0],
        "utf8"
    )));
}());
