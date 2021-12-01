import { useCallback, useState } from 'react'

export default function useToggle(initialValue: boolean): [boolean, () => void] {
  const [booleanState, setBooleanState] = useState(initialValue);

  const toggleFunction = useCallback(() => setBooleanState(stateValue => !stateValue), []);

  return [booleanState, toggleFunction];
}
