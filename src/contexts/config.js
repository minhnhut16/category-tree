/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';

const ConfigContext = createContext();

const TYPES = {
  ROOT: 'root',
  MERCHANT: 'merchant',
  STORE: 'store',
};

const config = {
  levels: {
    [TYPES.ROOT]: {
      label: 'ROOT',
      type: TYPES.ROOT,
      nextLevel: TYPES.MERCHANT,
    },
    [TYPES.MERCHANT]: {
      type: TYPES.MERCHANT,
      label: 'Add Merchant',
      nextLevel: TYPES.STORE,
    },
    [TYPES.STORE]: {
      label: 'Add Store',
      type: TYPES.STORE,
      nextLevel: null,
    },
  },
};

export const ConfigProvider = ({ children }) => {
  return <ConfigContext.Provider value={{ TYPES, config }}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  const value = useContext(ConfigContext);

  if (typeof value === 'undefined') {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return value;
};
