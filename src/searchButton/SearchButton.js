import React, { useState, useEffect} from "react";

import Book from "../book/Book.js"

import "./SearchButton.css"
import "../shared/assets/style.css"

function SearchButton(){
  
var defaultTab = "pointer text-white default";
var activeTab = "pointer text-white active";

  const [active, setActive] = useState(false)
  const [books, setBooks] = useState([])
  const [searchStr, setSearchStr] = useState()

  function findBooks(str){
    fetch(`https://openlibrary.org/search.json?q=${str}&limit=20`)
    .then(response => response.json())
    .then(json => setBooks(json))
  }

  function show(){

  }

  if(active){
    if(books.length==0){
      return(
        <>
          <div id="search" className={activeTab} onClick={(() => setActive(false))}>
            <span className="search-prompt">search for a book/author/title etc.</span>
            <span className="material-symbols-outlined">
              close
            </span>
          </div>

          <div className="search-bar search-box">
            <form>
              <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
            </form>
            <div className="btn-sm border-gold text-center pointer" onClick={(() => findBooks(searchStr))}>Retrieve Books</div>

            <p>NO BOOKS</p>
          </div>
        </>
      );
    } 
    else {

      return (
        <>
          <div id="search" className={activeTab} onClick={(() => setActive(false))}>
            <span className="material-symbols-outlined">
              close
            </span>
          </div>

          <div className="search-bar search-box">
            <form>
              <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
            </form>
            <div className="btn-sm border-gold text-center pointer" onClick={(() => findBooks(searchStr))}>Retrieve Books</div>

            {
              // will need to query database for books
              (books.docs).map(function(book){
                return <>
                        <div id="add-book-to-read" onMouseEnter={show()}>Add to 'to read'</div>
                        <Book book={book}/>
                        {/* add to shelf button component */}
                        {/* <Add book={book}/> */}
                      </>
              })
            }
          </div>
        </>
      );
    }
  } 
  else {
    return (
      <>
        <div id="search" className={defaultTab} onClick={(() => setActive(true))}>
          add a book
          <span className="material-symbols-outlined">
            search
          </span>
          
        </div>
      </>
    );
  }

}

export default SearchButton;