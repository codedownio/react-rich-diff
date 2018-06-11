const State = require('./diffing/State');
const RichDiff = require('./components/RichDiff');

const MarkupIt = require("markup-it");
const markdown = require("markup-it/lib/markdown");

RichDiff.State = State;

RichDiff.getMarkupItState = function() {
    return MarkupIt.State.create(markdown);
};

module.exports = RichDiff;
