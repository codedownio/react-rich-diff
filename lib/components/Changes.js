'use strict';

var PropTypes = require('prop-types');
var React = require('react');

var _require = require('immutable'),
    List = _require.List;

var TYPES = require('../diffing/TYPES');
var groupChanges = require('../diffing/groupChanges');
var Node = require('./Node');
var NodeWrapper = require('./NodeWrapper');

function classNameForChange(node, change) {
    return 'diff-' + change.type + ' diff-' + node.kind + '-' + change.type;
}

/**
 * Render a change without changed
 * @type {React}
 */
var IdenticalChange = React.createClass({
    displayName: 'IdenticalChange',

    propTypes: {
        change: PropTypes.object.isRequired
    },

    render: function render() {
        var change = this.props.change;

        return React.createElement(Node, { node: change.original });
    }
});

/**
 * Render a change that is being added
 * @type {React}
 */
var AddedRemovedChange = React.createClass({
    displayName: 'AddedRemovedChange',

    propTypes: {
        change: PropTypes.object.isRequired
    },

    render: function render() {
        var change = this.props.change;

        var node = change.type == TYPES.ADDED ? change.modified : change.original;
        var attributes = {
            className: classNameForChange(node, change)
        };

        return React.createElement(Node, { attributes: attributes, node: node });
    }
});

/**
 * Render a modification between two nodes.
 * @type {React}
 */
var ModifiedChange = React.createClass({
    displayName: 'ModifiedChange',

    propTypes: {
        change: PropTypes.object.isRequired
    },

    render: function render() {
        var change = this.props.change;
        var original = change.original,
            modified = change.modified;

        var attributes = {
            className: classNameForChange(modified, change)
        };

        return React.createElement(Changes, {
            Wrapper: function Wrapper(props) {
                return React.createElement(
                    NodeWrapper,
                    {
                        node: modified,
                        original: original,
                        attributes: attributes
                    },
                    props.children
                );
            },
            changes: change.children
        });
    }
});

/**
 * Render a change.
 * @type {React}
 */
var Change = React.createClass({
    displayName: 'Change',

    propTypes: {
        change: PropTypes.object.isRequired
    },

    render: function render() {
        var change = this.props.change;


        switch (change.type) {

            case TYPES.IDENTICAL:
                return React.createElement(IdenticalChange, { change: change });

            case TYPES.MODIFIED:
                return React.createElement(ModifiedChange, { change: change });

            case TYPES.ADDED:
            case TYPES.REMOVED:
                return React.createElement(AddedRemovedChange, { change: change });

        }
    }
});

/**
 * Wrap identical changes in a toggleable div.
 * @type {React}
 */
var ToggleableGroup = React.createClass({
    displayName: 'ToggleableGroup',

    propTypes: {
        changes: PropTypes.object.isRequired
    },

    getInitialState: function getInitialState() {
        return {
            visible: false
        };
    },
    onClick: function onClick() {
        this.setState({
            visible: true
        });
    },
    render: function render() {
        var changes = this.props.changes;
        var visible = this.state.visible;


        if (!visible) {
            return React.createElement('div', null);
        }

        return React.createElement(Changes, {
            changes: changes,
            Wrapper: function Wrapper(props) {
                return React.createElement(
                    'div',
                    null,
                    props.children
                );
            }
        });
    }
});

/**
 * Render a list of changes.
 * @type {React}
 */
var Changes = React.createClass({
    displayName: 'Changes',

    propTypes: {
        changes: PropTypes.object.isRequired,
        Wrapper: PropTypes.func,
        minToWrap: PropTypes.number
    },

    render: function render() {
        var _props = this.props,
            Wrapper = _props.Wrapper,
            changes = _props.changes,
            minToWrap = _props.minToWrap;

        var groups = groupChanges(changes, minToWrap);

        return React.createElement(
            Wrapper,
            null,
            groups.map(function (change, i) {
                return List.isList(change) ? React.createElement(ToggleableGroup, { key: i, changes: change }) : React.createElement(Change, { key: change.key, change: change });
            })
        );
    }
});

module.exports = Changes;