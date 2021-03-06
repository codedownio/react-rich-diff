'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PropTypes = require('prop-types');
var React = require('react');
var classNames = require('classnames');
var diffToTitle = require('./diffToTitle');

var CRITERIAS = [{
    label: 'Link',
    value: function value(node) {
        return node.data.get('href');
    }
}, {
    label: 'Title',
    value: function value(node) {
        return node.data.get('title');
    }
}];

/**
 * Render a link with a tooltip to signal the change.
 * @type {React}
 */
var LinkNode = React.createClass({
    displayName: 'LinkNode',

    propTypes: {
        attributes: PropTypes.object.isRequired,
        node: PropTypes.object.isRequired,
        original: PropTypes.object,
        children: PropTypes.node
    },

    render: function render() {
        var _props = this.props,
            children = _props.children,
            attributes = _props.attributes,
            node = _props.node,
            original = _props.original;


        var title = diffToTitle(original, node, CRITERIAS);

        return React.createElement(
            'a',
            _extends({}, attributes, {
                className: classNames(attributes.className, {
                    'tooltipped': title
                }),
                href: node.data.get('href'),
                'aria-label': title
            }),
            children
        );
    }
});

module.exports = LinkNode;