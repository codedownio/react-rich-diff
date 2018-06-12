'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var Changes = require('./Changes');

/**
 * Render an entire diff from a state.
 * @type {React}
 */
var RichDiff = React.createClass({
    displayName: 'RichDiff',

    propTypes: {
        className: PropTypes.string,
        state: PropTypes.object.isRequired,
        minToWrap: PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: '',
            minToWrap: 3
        };
    },
    render: function render() {
        var _props = this.props,
            state = _props.state,
            className = _props.className,
            minToWrap = _props.minToWrap;


        return React.createElement(Changes, {
            Wrapper: function Wrapper(props) {
                return React.createElement(
                    'div',
                    { className: 'RichDiff ' + className },
                    props.children
                );
            },
            changes: state.changes,
            minToWrap: minToWrap
        });
    }
});

module.exports = RichDiff;