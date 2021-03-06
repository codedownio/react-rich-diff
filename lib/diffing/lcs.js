"use strict";

/**
 * Returns a two-dimensional array (an array of arrays) with dimensions n by m.
 * All the elements of this new matrix are initially equal to x
 * @param  {Number} n number of rows
 * @param  {Number} m number of columns
 * @param  {Mixed} x initial element for every item in matrix
 * @return {Array<Array>}
 */
function makeMatrix(n, m, x) {
    var matrix = [];
    for (var i = 0; i < n; i++) {
        matrix[i] = new Array(m);

        if (x != null) {
            for (var j = 0; j < m; j++) {
                matrix[i][j] = x;
            }
        }
    }

    return matrix;
}

/**
 * Computes the Longest Common Subsequence table
 * @param  {Array} xs
 * @param  {Array} ys
 * @return {Array<Array>}
 */
function computeLcsMatrix(xs, ys, isEqual) {
    var n = xs.length || 0;
    var m = ys.length || 0;
    var a = makeMatrix(n + 1, m + 1, { value: 0 });

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            var result = isEqual(xs[i], ys[j]);

            if (result) {
                a[i + 1][j + 1] = {
                    result: result,
                    value: a[i][j].value + 1
                };
            } else {
                a[i + 1][j + 1] = {
                    value: Math.max(a[i + 1][j].value, a[i][j + 1].value)
                };
            }
        }
    }

    return a;
}

/**
 * Extracts a LCS from matrix M
 * @param  {Array} xs
 * @param  {Array} ys
 * @param  {Array<Array>}matrix LCS Matrix
 * @return {Array<T>} Longest Common Subsequence
 */
function backtrackLcs(xs, ys, matrix, isEqual) {
    var result = [];
    for (var i = xs.length, j = ys.length; i !== 0 && j !== 0;) {
        if (matrix[i][j].value === matrix[i - 1][j].value) {
            i--;
        } else if (matrix[i][j].value === matrix[i][j - 1].value) {
            j--;
        } else {
            var xValue = xs[i - 1];
            var yValue = ys[j - 1];
            var value = isEqual(xValue, yValue);
            if (value) {
                result.push({
                    value: matrix[i][j].result,
                    original: xValue,
                    modified: yValue
                });
                i--;
                j--;
            }
        }
    }
    return result.reverse();
}

module.exports = {
    backtrackLcs: backtrackLcs,
    computeLcsMatrix: computeLcsMatrix
};