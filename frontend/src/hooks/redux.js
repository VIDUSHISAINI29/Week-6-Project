import { useDispatch, useSelector } from 'react-redux';

// A custom hook for dispatch
export const useAppDispatch = () => useDispatch();

// A custom hook for selector
export const useAppSelector = useSelector;
