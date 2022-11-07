import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function useForceRender() {
  const [, setKey] = useState(uuidv4());

  return useCallback(() => setKey(uuidv4()), []);
}
