import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSWRConfig } from 'swr';
import { parse, ParsedQuery } from 'query-string';
import { SearchBar, SearchBarRef } from '@taoyage/react-mobile-ui';

import { setHistory } from '@/pages/search/utils';
import { searchActions } from '@/pages/search/store';
import api from '@/pages/search/api';

import { setUrlParams, removeUrlParams } from '@/utils/url';
import { useAppSelector, useAppDispatch } from '@/store';

const BookSearchBar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchMode = useAppSelector<boolean>((state) => state.search.searchMode);
  const searchKeyword = useAppSelector<string>((state) => state.search.searchKeyword);

  const searchRef = React.useRef<SearchBarRef>(null);

  const { mutate } = useSWRConfig();

  const onSearch = (value: string) => {
    if (!value) return;
    setHistory(value);
    dispatch(searchActions.setSearchMode(true));
    setUrlParams([['keyword', value]], '/search');
    dispatch(searchActions.setSearchKeyword(value));
    // mutate({ url: api.getSearchList, params: { keyword: value } });
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
