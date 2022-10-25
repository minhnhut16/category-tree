import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import MultilevelSelect from 'components/MultilevelSelect';
import Spacing from 'components/Spacing';
import { ConfigProvider } from 'contexts/config';
import { useState } from 'react';
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

function App() {
  const [openSelect, setOpenSelect] = useState(false);

  return (
    <Spacing px="1rem" py="1rem">
      <div className="App">
        <Button type="primary" onClick={() => setOpenSelect(true)}>
          Open Select
        </Button>

        <Modal
          open={openSelect}
          onCancel={() => setOpenSelect(false)}
          footer={null}
          width="100%"
          title="Multilevel select"
        >
          <ConfigProvider>
            <MultilevelSelect treeData={exampleData} />
          </ConfigProvider>
        </Modal>
      </div>
    </Spacing>
  );
}

export default App;
