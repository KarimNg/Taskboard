import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TasksContext } from '../contexts/TasksContext';

export default function SearchBar() {
  const {searchTerms, setSearchTerms } = useContext(TasksContext)

  const handleSearchInput = (evt: React.ChangeEvent<HTMLInputElement>) => {

    if (setSearchTerms) {
      setSearchTerms(evt.target.value);
    }
  }

  const clearSearch = () => {

    if (setSearchTerms) {
      setSearchTerms("");
    }
  }

  return (
    <div className="inputContainer__searchBar">
        <label htmlFor="searchTerms" className="srOnly">Search for task items</label>
        <input className="taskBoard__searchBar" type="search" name="searchTerms" id="searchTerms" placeholder="search" onChange={handleSearchInput} value={searchTerms} />
        {
          searchTerms ?
          <>
            <label htmlFor="searchBarBtn" className="srOnly">Button to clear the search terms</label>
            <button id="searchBarBtn" className="taskBoard__searchBarBtn" onClick={clearSearch}>
              <FontAwesomeIcon className="taskBoard__searchBarIcon--clear" icon={faTimes} aria-hidden="true"/>
            </button>
          </>
          :
          <FontAwesomeIcon className="taskBoard__searchBarIcon" icon={faSearch} aria-hidden="true"/>
        }
      </div>
  )
}
