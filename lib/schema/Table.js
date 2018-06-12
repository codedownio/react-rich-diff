'use strict';

var PropTypes = require('prop-types');
var React = require('react');

/**
 * Render a table.
 * @type {React}
 */
var TableNode = React.createClass({
    displayName: 'TableNode',

    propTypes: {
        attributes: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired
    },

    render: function render() {
        var _props = this.props,
            attributes = _props.attributes,
            children = _props.children;


        return React.createElement(
            'table',
            attributes,
            React.createElement(
                'tbody',
                null,
                children
            )
        );
    }
});

module.exports = TableNode;