import React, { useState } from 'react';
import './ShowUrlTree.css'; // We'll create this file next

let allNames = {}
/**
 * ShowUrlTree component that renders a navigable tree structure
 * @param {Object} props.tree - The tree structure generated by buildUrlTree function
 */
const ShowUrlTree = ({ tree, title = '', names }) => {
  if (!tree) return <div>No tree data available</div>;
  return (
    <div className="url-tree-container">
      <h3>{title}</h3>
      <div className="tree-view">
        <TreeNode node={tree} level={0} names={names} />
      </div>
    </div>
  );
};

/**
 * TreeNode component that recursively renders each node and its children
 */
const TreeNode = ({ node, level, names }) => {
  console.log('what names', names);
  const [isExpanded, setIsExpanded] = useState(false); // Auto-expand first two levels
  const [isSelected, setIsSelected] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  // Extract the last part of the path for display
  const getDisplayName = () => {

    if (node.text && node.text !== "Root") return node.text;
    if (names?.[node?.url]) return names[node.url];
    // console.log(node.url, names)
    try {
      const url = new URL(node.url);
      const pathParts = url.pathname.split('/').filter(Boolean);
      return pathParts.length > 0 ? pathParts[pathParts.length - 1] : url.hostname;
    } catch (e) {
      return node.url;
    }
  };
  console.log(`${node.url} || ${!!names?.[node.url]}`)
  console.dir(names)

  return (
    <div className="tree-node" style={{ marginLeft: `${level * 20}px` }}>
      <div
        className={`node-content ${isSelected ? 'selected' : ''}`}
        onClick={handleSelect}
      >
        {hasChildren && (
          <span className="toggle-icon" onClick={handleToggle}>
            {isExpanded ? '▼' : '▶'}
          </span>
        )}

        <span className="node-label" title={node.url}>
          {allNames?.[node.url] ||  getDisplayName()}
        </span>
        <a
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            className=""
            onClick={(e) => e.stopPropagation()}
            style={{fontSize: '0.6em'}}
          >
            {node.url.replace('https://drupal.org/docs', '')}
          </a>
        {/* {isSelected && (
          <a
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            className=""
            onClick={(e) => e.stopPropagation()}
          >
            {node.url.replace('https://drupal.org/docs', '')}
          </a>
        )} */}
      </div>

      {hasChildren && isExpanded && (
        <div className="children-container">
          {node.children.map((child, index) => (
            <TreeNode
              key={`${child.url}-${index}`}
              node={child}
              level={level + 1}
              names={names}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowUrlTree;
