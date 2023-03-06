import React, { useState, useEffect} from "react";

import Book from "../book/Book.js"

import "./SearchButton.css"
import "../shared/assets/style.css"

function SearchButton(props){
  
var defaultTab = "text-white default";
var activeTab = "text-white active";

  const [active, setActive] = useState(false)
  const [books, setBooks] = useState([])
  const [searchStr, setSearchStr] = useState()

  const findBooks = (event) => {
    event.preventDefault();

    fetch(`https://openlibrary.org/search.json?q=${searchStr}&limit=20`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setBooks(data);
      });

  }

  if(active){
    if(books.length==0){
      return(
        <>
          <div id="search" className={activeTab}>
            <span className="search-prompt">search OpenLibrary for a book/author/title etc.</span>
            <span className="material-symbols-outlined pointer" onClick={(() => setActive(false))}>
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
          <div id="search" className={activeTab}>
            <span className="search-prompt">search OpenLibrary for a book/author/title etc.</span>
            <span className="material-symbols-outlined pointer" onClick={(() => setActive(false))}>
              close
            </span>
          </div>

          <div className="search-bar search-box">
            <form className="search-bar" onSubmit={findBooks}>
              <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
              <button type="submit" className="btn border-latte bg-wine text-center pointer">Retrieve Books</button>
            </form>

            {
              (books.docs).map(function(book){
                // const book = {
                //   title : item.title,
                //   author : item.author_name[0],
                //   description : "none",
                //   shelf : "to-read"
                // }
                return <Book book={book} addToToRead={props.addToToRead} location={props.location}/>
                      
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
        <div id="search" className={defaultTab}>
          <span className="search-prompt">add book</span>
          <span className="material-symbols-outlined pointer" onClick={(() => setActive(true))}>
            search
          </span>
          
        </div>
      </>
    );
  }

}

export default SearchButton;