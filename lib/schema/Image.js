'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var PropTypes = require('prop-types');
var React = require('react');

/**
 * Render an image node.
 * @type {React}
 */
var ImageNode = React.createClass({
    displayName: 'ImageNode',

    propTypes: {
        attributes: PropTypes.object.isRequired,
        node: PropTypes.object.isRequired
    },

    render: function render() {
        var _props = this.props,
            attributes = _props.attributes,
            node = _props.node;


        return React.createElement('img', _extends({}, attributes, {
            src: node.data.get('src')
        }));
    }
});

module.exports = ImageNode;