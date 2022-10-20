import 'antd/dist/antd.css';
import CategoryViewer from 'CategoryViewer';
import Spacing from 'components/Spacing';
import { v4 as uuid } from 'uuid';

const exampleData = {
  name: 'Root Node',
  id: uuid(),
  children: [
    {
      name: 'Node 1',
      id: uuid(),
      children: [
        {
          name: 'Node 1-1',
          id: uuid(),
        },
        {
          name: 'Node 1-2',
          id: uuid(),
        },
        {
          name: 'Node 1-3',
          id: uuid(),
        },
      ],
    },
    {
      name: 'Node 2',
      id: uuid(),
      children: [
        {
          name: 'Node 2-1',
          id: uuid(),
        },
        {
          name: 'Node 2-2',
          id: uuid(),
        },
        {
          name: 'Node 2-3',
          id: uuid(),
        },
      ],
    },
    {
      name: 'Node 3',
      id: uuid(),
      children: [
        {
          name: 'Node 3-1',
          id: uuid(),
        },
      ],
    },
    {
      name: 'Node 4',
      id: uuid(),
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
