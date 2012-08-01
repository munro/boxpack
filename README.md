# Boxpack—Bin packing algorithm! [![Build Status](https://secure.travis-ci.org/munro/boxpack.png?branch=master)](http://travis-ci.org/munro/boxpack)

*Under development!*

## Abstract

## Downloads

Tested to work against Internet Explorer 6+, Safari 3+, Google Chrome 1+, Firefox 3+, and Opera 10+!

[Development Version (0.0.0)](https://raw.github.com/munro/boxpack/master/boxpack.js) — 6.5 KiB, uncompressed with comments.

[Production Version (0.0.0)](https://raw.github.com/munro/boxpack/master/boxpack.min.js) — 715 bytes, minified and gzipped.

## Documentation

## API
* `boxpack({Object} options) -> {Bin}` — Creates a new bin for packing rects into.
* `boxpack.rectFit({Rect}, {Box}) -> {Boolean}`
* `boxpack.boxFit({Box}, {Box}) -> {Boolean}`
* `boxpack.intersect({Box}, {Box}) -> {Boolean}`
* `boxpack.divideX({Box}, {Number}) -> {Array {Box}}`
* `boxpack.divideY({Box}, {Number}) -> {Array {Box}}`
* `boxpack.subtract({Box}, {Box}) -> {Array {Box}}`

## License

MIT
