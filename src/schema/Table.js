const PropTypes = require('prop-types');
const React = require('react');

/**
 * Render a table.
 * @type {React}
 */
const TableNode = React.createClass({
    propTypes: {
        attributes: PropTypes.object.isRequired,
        children:   PropTypes.node.isRequired
    },

    render() {
        const { attributes, children } = this.props;

        return (
            <table {...attributes}>
                <tbody>
                {children}
                </tbody>
            </table>
        );
    }
});

module.exports = TableNode;
