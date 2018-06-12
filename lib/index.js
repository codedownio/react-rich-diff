'use strict';

var State = require('./diffing/State');
var RichDiff = require('./components/RichDiff');

var MarkupIt = require("markup-it");
var markdown = require("markup-it/lib/markdown");

RichDiff.State = State;

RichDiff.getMarkupItState = function () {
    return MarkupIt.State.create(markdown);
};

module.exports = RichDiff;