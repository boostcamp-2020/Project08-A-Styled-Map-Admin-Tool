import React, { ReactElement } from 'react';
import SearchInputPresenter from './SearchInputPresenter';
import SearchInputPropsInterface from './SearchInputPropsInterface';

function SearchInputContainer({
  width,
  height,
}: SearchInputPropsInterface): ReactElement {
  return <SearchInputPresenter width={width} height={height} />;
}

export default SearchInputContainer;
