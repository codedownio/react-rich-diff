'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var schema = require('../schema');

/**
 * Rendering for a slate node. It doesn't consider children.
 *
 * @type {React}
 */
var NodeWrapper = React.createClass({
    displayName: 'NodeWrapper',

    propTypes: {
        node: PropTypes.object.isRequired,
        attributes: PropTypes.object.isRequired,
        original: PropTypes.object,
        children: PropTypes.node
    },

    render: function render() {
        var _props = this.props,
            node = _props.node,
            attributes = _props.attributes,
            original = _props.original,
            children = _props.children;


        var Renderer = schema.nodes[node.type] || (node.kind == 'block' ? schema.defaultBlock : schema.defaultInline);

        return React.createElement(
            Renderer,
            { node: node, attributes: attributes, original: original },
            children
        );
    }
});

module.exports = NodeWrapper;