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

  const findBooks = (event) => {
    event.preventDefault();

    fetch(`https://openlibrary.org/search.json?q=${searchStr}&limit=20`)
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
            <span className="search-prompt">search OpenLibrary for a book/author/title etc.</span>
            <span className="material-symbols-outlined">
              close
            </span>
          </div>

          <div className="search-box">
            <form className="search-bar" onSubmit={findBooks}>
              <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
              <button type="submit" className="btn border-latte bg-wine text-center pointer">Retrieve Books</button>
            </form>
            

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
            <form className="search-bar" onSubmit={findBooks}>
              <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
              <button type="submit" className="btn border-latte bg-wine text-center pointer">Retrieve Books</button>
            </form>

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