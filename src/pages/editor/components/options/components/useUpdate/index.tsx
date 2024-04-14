import { useReducer } from 'react';

export default function useUpdate() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  return [forceUpdate];
}
