import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar, SearchBarRef } from '@taoyage/react-mobile-ui';

import { setHistory } from '@/pages/search/utils';
import { searchActions } from '@/pages/search/store';

import { setUrlParams, removeUrlParams } from '@/utils/url';
import { useAppSelector, useAppDispatch } from '@/store';

const BookSearchBar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchKeyword = useAppSelector<string>((state) => state.search.searchKeyword);

  const searchRef = React.useRef<SearchBarRef>(null);

  const onSearch = (value: string) => {
    if (!value) return;
    setHistory(value);
    dispatch(searchActions.setSearchMode(true));
    setUrlParams([['keyword', value]], '/search');
    dispatch(searchActions.setSearchKeyword(value));
  };

  const onCancel = () => {
    navigate(-1);
  };

  const onChange = (value: string) => {
    if (!value) {
      removeUrlParams(['keyword'], '/search');
      dispatch(searchActions.setSearchMode(false));
    }
  };

  const onClear = () => {
    removeUrlParams(['keyword'], '/search');
    dispatch(searchActions.setSearchMode(false));
  };

  React.useEffect(() => {
    searchRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (searchKeyword) {
      dispatch(searchActions.setSearchMode(true));
    }
  }, []);

  return (
    <div>
      <SearchBar
        value={searchKeyword}
        placeholder="搜索书籍、作者"
        ref={searchRef}
        showCancel
        onSearch={onSearch}
        onCancel={onCancel}
        onClear={onClear}
        onChange={onChange}
      />
    </div>
  );
});

export default BookSearchBar;
