const PropTypes = require('prop-types');
const React = require('react');

/**
 * Render an image node.
 * @type {React}
 */
const ImageNode = React.createClass({
    propTypes: {
        attributes: PropTypes.object.isRequired,
        node:       PropTypes.object.isRequired
    },

    render() {
        const { attributes, node } = this.props;

        return (
            <img
                {...attributes}
                src={node.data.get('src')}
                />
        );
    }
});

module.exports = ImageNode;
