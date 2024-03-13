import { ChangeEvent, useState } from 'react';
import useDebounce from './useDebounce';

const useSearchInput = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword).trim();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event?.target.value);
  };

  const onReset = () => {
    setSearchKeyword('');
  };

  return {
    searchKeyword,
    onChange,
    onReset,
    debouncedSearchKeyword,
  };
};

export default useSearchInput;
