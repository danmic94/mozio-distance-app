import React, { Fragment } from 'react';
import SearchForm from './components/SearchForm';

interface SearchPageProps {
}

const SearchPageComponent:React.FC<SearchPageProps> = () => {

  return (
    <Fragment>
        <span>This is the search page</span>
        <br/>
        <SearchForm/>
    </Fragment>
  )

}

export default SearchPageComponent