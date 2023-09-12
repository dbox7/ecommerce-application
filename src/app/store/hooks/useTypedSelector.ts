import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { rootState } from '../reducers';

export const useTypedSelector: TypedUseSelectorHook<rootState> = useSelector;