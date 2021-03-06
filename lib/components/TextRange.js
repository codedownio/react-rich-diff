'use strict';

var PropTypes = require('prop-types');
var React = require('react');
var schema = require('../schema');

/**
 * Leaf of a document: text range
 * @type {React}
 */
var TextRange = React.createClass({
    displayName: 'TextRange',

    propTypes: {
        range: PropTypes.object.isRequired,
        attributes: PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
        return {
            attributes: {}
        };
    },
    render: function render() {
        var _props = this.props,
            range = _props.range,
            attributes = _props.attributes;
        var marks = range.marks,
            text = range.text;


        if (marks.isEmpty()) {
            return React.createElement(
                'span',
                attributes,
                range.text
            );
        }

        var i = 0;
        return marks.reduce(function (children, mark) {
            i++;
            var Wrapper = schema.marks[mark.type];

            if (i == marks.size) {
                return React.createElement(
                    Wrapper,
                    { attributes: attributes },
                    children
                );
            }

            return React.createElement(
                Wrapper,
                null,
                children
            );
        }, text);
    }
});

module.exports = TextRange;