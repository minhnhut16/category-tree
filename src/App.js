import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal, Spin } from 'antd';
import 'antd/dist/antd.css';

import MultilevelSelect from 'components/MultilevelSelect';
import Spacing from 'components/Spacing';
import TreeViewer from 'components/TreeViewer';
import { ConfigProvider } from 'contexts/config';
import { Tree } from 'entities/Tree';
import useAPITree from 'useAPITree';

function App() {
  const [openSelect, setOpenSelect] = useState(false);
  const treeIns = useRef(new Tree())?.current;

  // just mock
  const { treeData: treeDataAPI, isLoading: fetchLoading } = useAPITree();

  const handleFinish = useCallback(
    async tree => {
      // fake api update tree
      await new Promise(r => setTimeout(r, 500));
      treeIns.setTree(tree);
      setOpenSelect(false);
    },
    [treeIns]
  );

  useEffect(() => {
    if (treeDataAPI) {
      treeIns.setTree(treeDataAPI);
    }
  }, [treeDataAPI, treeIns]);

  if (fetchLoading) {
    return <Spin />;
  }

  return (
    <Spacing px="1rem" py="1rem">
      <div className="App">
        <Button type="primary" onClick={() => setOpenSelect(true)}>
          Open Select
        </Button>

        <TreeViewer treeIns={treeIns} />

        <Modal
          open={openSelect}
          onCancel={() => setOpenSelect(false)}
          footer={null}
          width="100%"
          closable={false}
        >
          <ConfigProvider>
            <MultilevelSelect treeData={treeDataAPI} onFinish={handleFinish} />
          </ConfigProvider>
        </Modal>
      </div>
    </Spacing>
  );
}

export default App;
