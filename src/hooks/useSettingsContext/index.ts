import { useContext } from 'react';
import { SettingsContext } from '../../contexts';

export default function useSettingsContext() {
  return useContext(SettingsContext);
}
