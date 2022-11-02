import { useCallback, useState } from 'react';

export default function useExpand() {
  const [expandedNodes, setExpandedNodes] = useState([]);

  const togleExpandedNode = useCallback(nodeId => {
    setExpandedNodes(prevExpandedNodes => {
      if (prevExpandedNodes.includes(nodeId)) {
        return prevExpandedNodes.filter(id => id !== nodeId);
      }

      return [...prevExpandedNodes, nodeId];
    });
  }, []);

  const setExpandedNode = useCallback((nodeId, isExpanded = false) => {
    setExpandedNodes(prevExpandedNodes => {
      if (isExpanded && !prevExpandedNodes.includes(nodeId)) {
        return [...prevExpandedNodes, nodeId];
      }

      if (!isExpanded && prevExpandedNodes.includes(nodeId)) {
        return prevExpandedNodes.filter(id => id !== nodeId);
      }

      return prevExpandedNodes;
    });
  }, []);

  return { expandedNodes, togleExpandedNode, setExpandedNode };
}
