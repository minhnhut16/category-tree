import { useCallback, useState } from 'react';

export default function useExpand() {
  const [expandedNodes, setExpandedNodes] = useState([]);

  const toggleExpandedNode = useCallback(nodeId => {
    setExpandedNodes(prevExpandedNodes => {
      if (prevExpandedNodes.includes(nodeId)) {
        return prevExpandedNodes.filter(id => id !== nodeId);
      }

      return [...prevExpandedNodes, nodeId];
    });
  }, []);

  return { expandedNodes, toggleExpandedNode };
}
