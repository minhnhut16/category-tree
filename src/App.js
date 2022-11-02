import { Button, Modal, Spin } from 'antd';
import 'antd/dist/antd.css';
import MultilevelSelect from 'components/MultilevelSelect';
import Spacing from 'components/Spacing';
import TreeViewer from 'components/TreeViewer';
import { ConfigProvider } from 'contexts/config';
import { useCallback, useEffect, useState } from 'react';
import useAPITree from 'useAPITree';

function App() {
  const [openSelect, setOpenSelect] = useState(false);
  const [treeData, setTreeData] = useState({});
  // just mock
  const { treeData: treeDataAPI, isLoading: fetchLoading } = useAPITree();

  const handleFinish = useCallback(async tree => {
    // fake api update tree
    await new Promise(r => setTimeout(r, 500));
    setTreeData(tree);
    setOpenSelect(false);
  }, []);

  useEffect(() => {
    if (treeDataAPI) {
      setTreeData(treeDataAPI);
    }
  }, [treeDataAPI]);

  if (fetchLoading) {
    return <Spin />;
  }

  return (
    <Spacing px="1rem" py="1rem">
      <div className="App">
        <Button type="primary" onClick={() => setOpenSelect(true)}>
          Open Select
        </Button>

        <TreeViewer treeData={treeData} />

        <Modal
          open={openSelect}
          onCancel={() => setOpenSelect(false)}
          footer={null}
          width="100%"
          closable={false}
        >
          <ConfigProvider>
            <MultilevelSelect initTreeData={treeData} onFinish={handleFinish} />
          </ConfigProvider>
        </Modal>
      </div>
    </Spacing>
  );
}

export default App;
