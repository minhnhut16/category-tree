/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react';

const MultilevelSelectContext = createContext();

const TYPES = {
  ROOT: 'root',
  MERCHANT: 'merchant',
  STORE: 'store',
};

const config = {
  levels: {
    ROOT: {
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

export const MultilevelSelectProvider = ({ children }) => {
  return (
    <MultilevelSelectContext.Provider value={{ TYPES, config }}>
      {children}
    </MultilevelSelectContext.Provider>
  );
};

export const useMultilevelSelect = () => {
  const value = useContext(MultilevelSelectContext);
  return value;
};
