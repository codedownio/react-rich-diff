'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _TAGS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PropTypes = require('prop-types');
var React = require('react');
var classNames = require('classnames');

var _require = require('markup-it'),
    BLOCKS = _require.BLOCKS;

var diffToTitle = require('./diffToTitle');

var TAGS = (_TAGS = {}, _defineProperty(_TAGS, BLOCKS.HEADING_1, 'h1'), _defineProperty(_TAGS, BLOCKS.HEADING_2, 'h2'), _defineProperty(_TAGS, BLOCKS.HEADING_3, 'h3'), _defineProperty(_TAGS, BLOCKS.HEADING_4, 'h4'), _defineProperty(_TAGS, BLOCKS.HEADING_5, 'h5'), _defineProperty(_TAGS, BLOCKS.HEADING_6, 'h6'), _TAGS);

var CRITERIAS = [{
    label: 'Tag',
    ignoreUnset: true,
    value: function value(node) {
        return TAGS[node.type];
    }
}, {
    label: 'ID',
    value: function value(node) {
        return node.data.get('id');
    }
}];

/**
 * Render an heading that has been modified.
 * @type {React}
 */
var HeadingNode = React.createClass({
    displayName: 'HeadingNode',

    propTypes: {
        original: PropTypes.object,
        attributes: PropTypes.object.isRequired,
        node: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired
    },

    render: function render() {
        var _props = this.props,
            children = _props.children,
            attributes = _props.attributes,
            node = _props.node,
            original = _props.original;

        var nodeTag = TAGS[node.type];

        var title = diffToTitle(original, node, CRITERIAS);

        return React.createElement(nodeTag, _extends({}, attributes, {
            className: classNames(attributes.className, {
                'tooltipped': title
            }),
            'aria-label': title
        }), children);
    }
});

module.exports = HeadingNode;