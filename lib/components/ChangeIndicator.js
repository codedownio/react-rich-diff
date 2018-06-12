'use strict';

var PropTypes = require('prop-types');
var React = require('react');

/**
 * Render an indicator for a change (added, modified, etc) with the right class name.
 * @type {ReactClass}
 */
var ChangeIndicator = React.createClass({
    displayName: 'ChangeIndicator',

    propTypes: {
        kind: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        children: PropTypes.node
    },

    render: function render() {
        var _props = this.props,
            kind = _props.kind,
            type = _props.type,
            children = _props.children;

        var className = 'diff-' + kind + '-' + type;

        if (kind == 'block') {
            return React.createElement(
                'div',
                { className: className },
                children
            );
        } else {
            return React.createElement(
                'span',
                { className: className },
                children
            );
        }
    }
});

module.exports = ChangeIndicator;