/* jslint utility2:true */
// given a start column and end column in absolute offsets within
// a source file (0 - EOF), returns the relative line column positions.
function offsetToOriginalRelative (sourceMap, startCol, endCol) {
    const lines = this.lines.filter(function (line, i) {
        return startCol <= line.endCol && endCol >= line.startCol;
    });
    if (!lines.length) {
        return {};
    }

    const start = originalPositionTryBoth(
        Math.max(0, startCol - lines[0].startCol),
        lines[0].line,
        sourceMap
    );
    let end = originalEndPositionFor(
        sourceMap,
        lines[lines.length - 1].line,
        endCol - lines[lines.length - 1].startCol
    );

    if (!(start && end)) {
        return {};
    }

    if (!(start.source && end.source)) {
        return {};
    }

    if (start.source !== end.source) {
        return {};
    }

    if (start.line === end.line && start.column === end.column) {
        end = sourceMap.originalPositionFor({
            bias: LEAST_UPPER_BOUND,
            column: endCol - lines[lines.length - 1].startCol,
            line: lines[lines.length - 1].line
        });
        end.column -= 1;
    }

    return {
        endLine: end.line,
        relEndCol: end.column,
        relStartCol: start.column,
        source: start.source,
        startLine: start.line
    };
}
