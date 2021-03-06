'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var NodeWrapper = require('./NodeWrapper');
var TextRange = require('./TextRange');

/**
 * Render an entire slate node and its children.
 * @type {React}
 */
var Node = React.createClass({
    displayName: 'Node',

    propTypes: {
        node: PropTypes.object.isRequired,
        attributes: PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
        return {
            attributes: {}
        };
    },
    render: function render() {
        var _props = this.props,
            node = _props.node,
            attributes = _props.attributes;


        if (node.kind == 'range') {
            return React.createElement(TextRange, { attributes: attributes, range: node });
        } else if (node.kind == 'text') {
            return React.createElement(
                NodeWrapper,
                { attributes: attributes, node: node },
                node.getRanges().map(function (c, i) {
                    return React.createElement(Node, { key: i, node: c });
                })
            );
        } else {
            return React.createElement(
                NodeWrapper,
                { attributes: attributes, node: node },
                node.nodes.map(function (c) {
                    return React.createElement(Node, { key: c.key, node: c });
                })
            );
        }
    }
});

module.exports = Node;