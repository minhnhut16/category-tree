export const TYPES = {
  ROOT: 'root',
  MERCHANT: 'merchant',
  STORE: 'store',
};

export const config = {
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
