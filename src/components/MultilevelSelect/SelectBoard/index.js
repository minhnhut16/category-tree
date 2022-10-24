import styled from 'styled-components';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Button, Input, Spin, Form, Divider } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';

import { useConfig } from 'contexts/config';
import Spacing from 'components/Spacing';

const Wrap = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 55px 1fr;
  grid-gap: 20px 25px;
  height: 100%;
  border-radius: 4px;
  background-color: #f8fafb;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.13);
  padding-bottom: 20px;
`;

const Control = styled.div`
  border: 1px solid #e9eff5;
  border-radius: 2px;
  margin-left: 16px;
  background-color: #fff;
`;

const Selection = styled.div`
  padding: 10px;
  border: 1px solid #e9eff5;
  border-radius: 2px;
  margin-right: 16px;
  background-color: #fff;
`;

const WrapOptions = styled.div`
  padding: 0 10px 10px;
`;

const Option = styled.div`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  padding: 4px 11px;
  border: 1px solid #fff;
  border-radius: 2px;

  &:hover {
    border-color: #bfbfbf;
  }

  p {
    flex: 1;
    margin-bottom: 0;
  }

  .anticon {
    flex: 0;
    line-height: 30px;

    // add-icon
    &.anticon-plus-circle {
      color: #40a9ff;
    }

    // remove-icon
    &.anticon-minus-circle {
      color: #c41d7f;
    }
  }
`;

const Actions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 16px;
`;

const Heading = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-transform: capitalize;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 12px;
  margin: 0;
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

  const nextLevel = config?.levels?.[node.type]?.nextLevel || '';

  const loadOptions = useCallback(
    async body => {
      try {
        setIsLoading(true);
        // TODO: handle with real api
        await apiFn(body);
        await sleep(300);
        setOptions(mockOptions);
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
    setOptions(pevOptions => {
      const hadOption = pevOptions.find(opt => opt.code === option.id);

      if (hadOption) return pevOptions;
      return [
        {
          code: option.id,
          name: option.name,
        },
        ...pevOptions,
      ];
    });
  };

  const renderOptions = () => {
    if (!options?.length) return null;
    const selectedIds = new Set();
    selectedOptions.map(opt => selectedIds.add(opt.id));

    return options.map(option => {
      if (selectedIds.has(option.code)) return null;

      return (
        <Option key={option.code} onClick={onClickAdd(option)}>
          <p>{option.name}</p>

          <PlusCircleOutlined />
        </Option>
      );
    });
  };

  useEffect(() => {
    setSelectedOptions(node?.children || []);
    loadOptions({ search: '' });
    form.resetFields();
  }, [form, loadOptions, node]);

  if (!node) return null;

  return (
    <Wrap>
      <Actions>
        <Heading>Customize {nextLevel}</Heading>

        <Button type="primary" onClick={onSave}>
          Save
        </Button>
      </Actions>

      <Control>
        <Spacing px="10px" pt="10px">
          <div>
            <Title>Filter {nextLevel}</Title>

            <Form
              form={form}
              initialValues={{
                searchTerm: '',
              }}
            >
              <Form.Item name="searchTerm" noStyle>
                <Input prefix={<SearchOutlined />} size="large" onChange={onInputChange} />
              </Form.Item>
            </Form>
          </div>
        </Spacing>

        <Spacing mt="20px" mb="16px">
          <Divider type="horizontal" />
        </Spacing>

        <WrapOptions>
          <Spin spinning={isLoading}>{renderOptions()}</Spin>
        </WrapOptions>
      </Control>

      <Selection>
        <Title>Selected</Title>
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
