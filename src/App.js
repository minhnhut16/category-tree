import 'antd/dist/antd.css';
import CategoryViewer from 'components/CategoryViewer';
import Spacing from 'components/Spacing';
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
          id: uuid(),
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

function App() {
  return (
    <Spacing px="1rem" py="1rem">
      <div className="App">
        <CategoryViewer initialTree={exampleData} />
      </div>
    </Spacing>
  );
}

export default App;
