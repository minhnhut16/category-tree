import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

const exampleData = {
  name: 'Root Node',
  type: 'root',
  id: uuid(),
  children: [
    {
      name: 'Node 1',
      id: uuid(),
      type: 'merchant',
      children: [
        {
          name: 'Node 1-1',
          id: '200', // mocked fixed id for test
          type: 'store',
        },
        {
          name: 'Node 1-2',
          id: uuid(),
          type: 'store',
        },
        {
          name: 'Node 1-3',
          id: uuid(),
          type: 'store',
        },
      ],
    },
    {
      name: 'Node 2',
      id: uuid(),
      type: 'merchant',
      children: [
        {
          name: 'Node 2-1',
          id: uuid(),
          type: 'store',
        },
        {
          name: 'Node 2-2',
          id: uuid(),
          type: 'store',
        },
        {
          name: 'Node 2-3',
          id: uuid(),
          type: 'store',
        },
      ],
    },
    {
      name: 'Node 3',
      id: uuid(),
      type: 'merchant',
      children: [
        {
          name: 'Node 3-1',
          id: uuid(),
          type: 'store',
          children: [
            {
              name: 'Node 3-1-1',
              id: uuid(),
              type: 'merchant-sub',
            },
            {
              name: 'Node 3-1-2',
              id: uuid(),
              type: 'merchant-sub',
            },
          ],
        },
        {
          name: 'Node 3-2',
          id: uuid(),
          type: 'store',
        },
      ],
    },
    {
      name: 'Node 4',
      id: uuid(),
      type: 'merchant',
    },
  ],
};

export default function useAPITree() {
  const [treeData, setTreeData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTree = async () => {
      setIsLoading(true);
      await new Promise(r => setTimeout(r, 2000));
      setTreeData(exampleData);
      setIsLoading(false);
    };
    getTree();
  }, []);

  return { treeData, isLoading };
}
