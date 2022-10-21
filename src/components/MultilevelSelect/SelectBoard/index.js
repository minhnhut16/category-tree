import styled from 'styled-components';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Button, Input, Spin, Form } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { useConfig } from 'contexts/config';

const Wrap = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 40px 1fr;
  grid-gap: 20px;
  height: 100%;
`;

const Control = styled.div`
  padding: 10px;
  border: 1px solid #000;
`;

const Selection = styled.div`
  padding: 10px;
  border: 1px solid #000;
`;

const WrapOptions = styled.div`
  padding-top: 10px;
`;

const Option = styled.div`
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  padding: 4px 11px;
  border: 1px solid #fff;

  &:hover {
    color: blue;
    border-color: #d9d9d9;
  }

  p {
    flex: 1;
    margin-bottom: 0;
  }

  .anticon {
    flex: 0;
    line-height: 40px;
  }
`;

const Actions = styled.div`
  grid-column: 1 / -1;
  align-self: center;
  justify-self: end;
`;

const mockOptions = [
  {
    code: '200',
    name: 'Node 1 - 1',
  },
  {
    code: '201',
    name: 'Name 1',
  },
  {
    code: '202',
    name: 'Name 2',
  },
];

// TODO: mock async api, remove after
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function SelectBoard({ node, apiFn }) {
  const [form] = Form.useForm();
  const { config } = useConfig();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const selectedIds = useRef(new Set());

  const loadOptions = useCallback(
    async body => {
      try {
        setIsLoading(true);
        // TODO: handle with real api
        await apiFn(body);
        await sleep(300);
        // remove options had been select
        setOptions(mockOptions.filter(opt => !selectedIds.current.has(opt.code)));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [apiFn]
  );

  const onSave = () => {
    const produce = cloneDeep(node);
    const optionType = config?.levels?.[node.type]?.nextLevel;
    produce.children = selectedOptions.map(opt => ({
      ...opt,
      type: optionType,
    }));

    console.log(produce);
  };

  const debounceSearch = useMemo(
    () => debounce(e => loadOptions({ search: e.target.value }), 300),
    [loadOptions]
  );

  const onInputChange = useCallback(debounceSearch, [debounceSearch]);

  const onClickAdd = option => () => {
    // add
    setSelectedOptions(prev => [
      {
        id: option.code,
        name: option.name,
      },
      ...prev,
    ]);
    // remove in list
    setOptions(pevOptions => pevOptions.filter(opt => opt.code !== option.code));
  };

  const onClickRemove = option => () => {
    setSelectedOptions(prevOptions => prevOptions.filter(opt => opt.id !== option.id));
    // add into list
    setOptions(pevOptions => [
      {
        name: option.name,
        code: option.id,
      },
      ...pevOptions,
    ]);
  };

  useEffect(() => {
    selectedIds.current.clear();
    selectedOptions.map(opt => selectedIds.current.add(opt.id));
  }, [selectedOptions]);

  useEffect(() => {
    setSelectedOptions(node?.children || []);
    loadOptions({ search: '' });
    form.resetFields();
  }, [form, loadOptions, node]);

  if (!node) return null;

  return (
    <Wrap>
      <Actions>
        <Button type="primary" onClick={onSave}>
          Save
        </Button>
      </Actions>

      <Control>
        <Form
          form={form}
          initialValues={{
            searchTerm: '',
          }}
        >
          <Form.Item name="searchTerm" noStyle>
            <Input placeholder="Search ..." size="large" onChange={onInputChange} />
          </Form.Item>
        </Form>

        <WrapOptions>
          <Spin spinning={isLoading}>
            {options?.length > 0 &&
              options.map(option => (
                <Option key={option.code} onClick={onClickAdd(option)}>
                  <p>{option.name}</p>

                  <PlusCircleOutlined />
                </Option>
              ))}
          </Spin>
        </WrapOptions>
      </Control>

      <Selection>
        {selectedOptions.map(item => (
          <Option key={item.id} onClick={onClickRemove(item)}>
            <p>{item.name}</p>

            <MinusCircleOutlined />
          </Option>
        ))}
      </Selection>
    </Wrap>
  );
}

SelectBoard.propTypes = {
  node: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  apiFn: PropTypes.func.isRequired,
};

SelectBoard.defaultProps = {
  node: null,
};

export default SelectBoard;
