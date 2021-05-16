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
            //!! bias: LEAST_UPPER_BOUND,
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
function originalEndPositionFor (sourceMap, line, column) {
    // Given the generated location, find the original location of the mapping
    // that corresponds to a range on the generated file that overlaps the
    // generated file end location. Note however that this position on its
    // own is not useful because it is the position of the _start_ of the range
    // on the original file, and we want the _end_ of the range.
    const beforeEndMapping = originalPositionTryBoth(
        sourceMap,
        line,
        Math.max(column - 1, 1)
    );
    if (beforeEndMapping.source === null) {
        return null;
    }
    // Convert that original position back to a generated one, with a bump
    // to the right, and a rightward bias. Since 'generatedPositionFor' searches
    // for mappings in the original-order sorted list, this will find the
    // mapping that corresponds to the one immediately after the
    // beforeEndMapping mapping.
    const afterEndMapping = sourceMap.generatedPositionFor({
        source: beforeEndMapping.source,
        line: beforeEndMapping.line,
        column: beforeEndMapping.column + 1,
        bias: LEAST_UPPER_BOUND
    });
    if (
    // If this is null, it means that we've hit the end of the file,
    // so we can use Infinity as the end column.
        afterEndMapping.line === null ||
            // If these don't match, it means that the call to
            // 'generatedPositionFor' didn't find any other original mappings on
            // the line we gave, so consider the binding to extend to infinity.
            sourceMap.originalPositionFor(afterEndMapping).line !==
                    beforeEndMapping.line
    ) {
        return {
            source: beforeEndMapping.source,
            line: beforeEndMapping.line,
            column: Infinity
        };
    }
    // Convert the end mapping into the real original position.
    return sourceMap.originalPositionFor(afterEndMapping);
}
