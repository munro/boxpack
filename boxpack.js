/*jslint node: true */

'use strict';

/**
 * @typedef {Rect} {
 *     width: Number,
 *     height: Number
 * }
 */

/**
 * @typedef {Box} {
 *     x: [Number],
 *     y: [Number],
 *     width: [Number],
 *     height: [Number]
 * }
 */

/**
 * @param {Object} {
 *     {Number} width
 *     {Number} height
 *     {Boolean} no_xresize
 * }
 */
function boxpack(opts) {
    var obj = Object.create(boxpack.prototype);
    obj._no_xresize = opts.no_xresize;
    obj._packed = [];
    obj._empty = [{
        x: 0,
        y: 0,
        width: opts.width || Infinity,
        height: opts.height || Infinity
    }];
    return obj;
}

boxpack.prototype = {
    pack: function (rects) {
    }
};

/**
 * Check if a rect fits inside a box.
 * @param {Rect} rect
 * @param {Box} fit
 * @return {Boolean}
 */
var rectFit = boxpack.rectFit = function (rect, bin) {
    return (
        rect.width <= bin.width &&
        rect.height <= bin.height
    );
};

/**
 * Check if a box fits inside another.
 * @param {Rect} a
 * @param {Rect} b
 * @return {Boolean}
 */
var boxFit = boxpack.boxFit = function (a, b) {
    return (
        a.x >= b.x && (a.x + a.width) <= (b.x + b.width) &&
        a.y >= b.y && (a.y + a.height) <= (b.y + b.height)
    );
};

/**
 * Checks if two boxes intersect.
 * @param {Box} a
 * @param {Box} b
 * @return {Boolean}
 */
var intersect = boxpack.intersect = function (a, b) {
    return (
        a.x < (b.x + b.width) && (a.x + a.width) > b.x &&
        a.y < (b.y + b.height) && (a.y + a.height) > b.y
    );
};

/**
 * Split a box horizontally into two, otherwise return nothing.
 * @param {Box} box
 * @param {Number} x
 * @return {Array {Box}}
 */
var divideX = boxpack.divideX = function (box, x) {
    if (x <= box.x || x >= (box.x + box.width)) {
        return [];
    }
    return [
        {x: box.x, y: box.y, width: (x - box.x), height: box.height},
        {x: x, y: box.y, width: (box.x + box.width - x), height: box.height}
    ];
};

/**
 * Split a box vertically into two, otherwise return nothing.
 * @param {Box} box
 * @param {Number} y
 * @return {Array {Box}}
 */
var divideY = boxpack.divideY = function (box, y) {
    if (y <= box.y || y >= (box.y + box.height)) {
        return [];
    }
    return [
        {x: box.x, y: box.y, width: box.width, height: (y - box.y)},
        {x: box.x, y: y, width: box.width, height: (box.y + box.height - y)}
    ];
};

/**
 * Subtract two boxes, returning a list of boxes that make up the surrounding
 * space.
 * @param {Box} sub
 * @param {Box} from
 * @return {Array {Box}}
 */
var subtract = boxpack.subtract = function (sub, from) {
    return [sub].concat(
        divideX(from, sub.x),
        divideX(from, sub.x + sub.width),
        divideY(from, sub.y),
        divideY(from, sub.y + sub.height)
    ).filter(function (box) {
        return !intersect(sub, box);
    });
};

module.exports = boxpack;
