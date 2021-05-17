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
(async function () {
    "use strict";
    let cwd;
    let data;
    let fileDict;
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
    function templateHeader({
        fileList,
        lineList = []
    }) {
        let html;
        html = "";
        html += `<!doctype html>
<html lang="en">
<head>
<title>coverage report</title>
<style>
/* csslint ignore:start */
* {
box-sizing: border-box;
    font-family: consolas, menlo, monospace;
}
/* csslint ignore:end */
body {
    margin: 0;
}
.coverage pre {
    margin: 5px 0;
}
.coverage table {
border-collapse: collapse;
margin-top: 20px;
}
.coverage table:nth-child(1) {
    margin-top: 0;
}
.coverage td,
.coverage th {
    border: 1px solid #777;
    margin: 0;
    padding: 5px;
}
.coverage td span {
    display: inline-block;
    width: 100%;
}
.coverage .bar {
    background: #999;
    height: 10px;
}
.coverage .content {
    padding: 0 5px;
}
.coverage .content a {
    text-decoration: none;
}
.coverage .count {
    margin: 0 5px;
    padding: 0 5px;
}
.coverage .header {
    padding: 20px;
}

.coverage td,
.coverage th {
    background: #fff;
}
.coverage .count {
    background: #9d9;
    color: #777;
}
.coverage .coverageHigh{
    background: #9d9;
}
.coverage .coverageLow{
    background: #ebb;
}
.coverage .coverageMedium{
    background: #fd7;
}
.coverage .header {
    background: #eee;
}
.coverage .lineno {
    background: #ddd;
}
.coverage .uncovered {
    background: #dbb;
}

.coverage pre:hover span,
.coverage tr:hover td {
    background: #bbe;
}
</style>
</head>
<body class="coverage">
<div class="header">
<span>coverage report<span><br>
<table>
<thead>
<tr>
<th>file</th>
<th>lines</th>
</tr>
</thead>
<tbody>`;
        fileList.forEach(function ({
            coverageLevel,
            coveragePct,
            linesCovered,
            linesTotal,
            pathname
        }) {
            pathname = stringHtmlSafe(pathname);
            html += `<tr><td class="${coverageLevel}">` + (
                lineList
                ? (
                    "<a href=\"index.html\">./ </a>" +
                    pathname + "<br>"
                )
                : (
                    "<a href=\"" + pathname + ".html\">./ " +
                    pathname + "</a><br>"
                )
            ) + `<span class="bar"
    style="background: #333; width: ${(coveragePct | 0)}px;"
></span><span class="bar"
    style="width: ${100 - (coveragePct | 0)}px;"
></span>
</td>
<td style="text-align: right;">
        ${coveragePct}%<br>
        (${linesCovered} / ${linesTotal})
    </td>
</tr>`;
        });
        html += `</tbody>
</table>
</div>
<div class="content">
`;
        lineList.forEach(function ({
            count,
            holeList,
            line,
            startOffset
        }, ii) {
            let chunk;
            let inHole;
            let lineId;
            let lineHtml;
            lineHtml = "";
            lineId = "line_" + (ii + 1);
            switch (count) {
            case -1:
            case 0:
                if (holeList.length === 0) {
                    lineHtml += "</span>";
                    lineHtml += "<span class=\"uncovered\">";
                    lineHtml += stringHtmlSafe(line);
                    lineHtml += "</span>";
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
                        lineHtml += stringHtmlSafe(chunk);
                        lineHtml += (
                            isHole
                            ? "</span><span class=\"uncovered\">"
                            : "</span><span>"
                        );
                        chunk = "";
                        inHole = isHole;
                    }
                    chunk += chr;
                });
                lineHtml += stringHtmlSafe(chunk);
                break;
            default:
                lineHtml += stringHtmlSafe(line);
            }
            html += String(`
<pre>
<span class="lineno">
<a href="#${lineId}" id="${lineId}">${String(ii + 1).padStart(5, " ")}.</a>
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
<span>${lineHtml}</span>
</pre>
            `).replace((
                /\n/g
            ), "").trim();
        });
        html += `
</div>
<div class="coverageFooter">
</div>
</body>
</html>`;
        html += "\n";
        return html;
    }
    data = await require("fs").promises.readdir(".coverage/");
    await Promise.all(data.map(async function (file) {
        if ((
            /^coverage-.*?\.json$/
        ).test(file)) {
            data = await require("fs").promises.readFile((
                ".coverage/" + file
            ), "utf8");
        }
    }));
    fileDict = {};
    cwd = process.cwd().replace((
        /\\/g
    ), "/") + "/";
    await Promise.all(JSON.parse(data).result.map(async function ({
        functions,
        url
    }) {
        let coverageLevel;
        let coveragePct;
        let lineList;
        let linesCovered;
        let linesTotal;
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
        src = await require("fs").promises.readFile(pathname, "utf8");
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
        linesCovered = lineList.filter(function ({
            count
        }) {
            return count > 0;
        }).length;
        coveragePct = Math.floor(10000 * linesCovered / linesTotal);
        coverageLevel = (
            coveragePct >= 8000
            ? "coverageHigh"
            : coveragePct >= 5000
            ? "coverageMedium"
            : "coverageLow"
        );
        coveragePct = String(coveragePct).replace((
            /..$/m
        ), ".$&");
        await require("fs").promises.writeFile((
            ".coverage/" + pathname + ".html"
        ), templateHeader({
            fileList: [
                {
                    coverageLevel,
                    coveragePct,
                    linesCovered,
                    linesTotal,
                    pathname
                }
            ],
            lineList
        }));
        fileDict[pathname] = {
            coverageLevel,
            coveragePct,
            lineList,
            linesCovered,
            linesTotal,
            pathname,
            src
        };
    }));
    await require("fs").promises.writeFile((
        ".coverage/index.html"
    ), templateHeader({
        fileList: Object.keys(fileDict).sort().map(function (pathname) {
            return fileDict[pathname];
        })
    }) + String(`
</div>
</body>
</html>
    `).trim() + "\n");
}());
