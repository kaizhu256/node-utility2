/* jslint utility2:true */
/**
 * AST ranges are inclusive for start positions and exclusive for end positions.
 * Source maps are also logically ranges over text, though interacting with
 * them is generally achieved by working with explicit positions.
 *
 * When finding the _end_ location of an AST item, the range behavior is
 * important because what we're asking for is the _end_ of whatever range
 * corresponds to the end location we seek.
 *
 * This boils down to the following steps, conceptually, though the source-map
 * library doesn't expose primitives to do this nicely:
 *
 * 1. Find the range on the generated file that ends at, or exclusively
 *    contains the end position of the AST node.
 * 2. Find the range on the original file that corresponds to
 *    that generated range.
 * 3. Find the _end_ location of that original range.
 */
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
        //!! bias: LEAST_UPPER_BOUND
        column: beforeEndMapping.column + 1,
        line: beforeEndMapping.line,
        source: beforeEndMapping.source
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
            column: Infinity,
            line: beforeEndMapping.line,
            source: beforeEndMapping.source
        };
    }
    // Convert the end mapping into the real original position.
    return sourceMap.originalPositionFor(afterEndMapping);
}
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
