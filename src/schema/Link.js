const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');
const diffToTitle = require('./diffToTitle');

const CRITERIAS = [
    {
        label: 'Link',
        value: (node => node.data.get('href'))
    },
    {
        label: 'Title',
        value: (node => node.data.get('title'))
    }
];

/**
 * Render a link with a tooltip to signal the change.
 * @type {React}
 */
const LinkNode = React.createClass({
    propTypes: {
        attributes: PropTypes.object.isRequired,
        node:       PropTypes.object.isRequired,
        original:   PropTypes.object,
        children:   PropTypes.node
    },

    render() {
        const { children, attributes, node, original } = this.props;

        const title = diffToTitle(original, node, CRITERIAS);

        return (
            <a
                {...attributes}
                className={classNames(attributes.className, {
                    'tooltipped': title
                })}
                href={node.data.get('href')}
                aria-label={title}
            >
                {children}
            </a>
        );
    }
});

module.exports = LinkNode;
