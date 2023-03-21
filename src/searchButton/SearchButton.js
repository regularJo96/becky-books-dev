import React, { useState, useEffect} from "react";

import Book from "../book/Book.js"

import "./SearchButton.css"
import "../shared/assets/style.css"

function SearchButton(props){
  
var defaultTab = "text-white default";
var activeTab = "text-white active";

  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState([])
  const [searchStr, setSearchStr] = useState()

  useEffect(() => {
    changeLocation();
  }, [active]);


  function changeLocation(){
    if(active){
      props.setLocation("search")
    }
    else{
      props.setLocation("shelf")
    }
  }

  const findBooks = (event) => {
    
    event.preventDefault();
    setLoading(true);

    fetch(`https://openlibrary.org/search.json?q=${searchStr}&limit=20`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        
        setBooks(data);
        setLoading(false);
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

          <div className="search-container">
            <div>
              <form className="search-bar" onSubmit={findBooks}>
                <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                <button type="submit" className="btn border-latte bg-wine text-center pointer">Retrieve Books</button>
              </form>
            </div>
            
            <div>
              No Books
            </div>
          </div>
        </>
      );
    } 
    else {

      if(loading){
        return (
<>
            <div id="search" className={activeTab}>
              <span className="search-prompt">search OpenLibrary for a book/author/title etc.</span>
              <span className="material-symbols-outlined pointer" onClick={(() => setActive(false))}>
                close
              </span>
            </div>

            <div className="search-container">
              <div>
                <form className="search-bar" onSubmit={findBooks}>
                  <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                  <button type="submit" className="btn border-latte bg-wine text-center pointer">Retrieve Books</button>
                </form>
              </div>

              <div>
                Finding Books...
              </div>
            </div>
          </>
        );
      }
      else{

        return (
          <>
            <div id="search" className={activeTab}>
              <span className="search-prompt">search OpenLibrary for a book/author/title etc.</span>
              <span className="material-symbols-outlined pointer" onClick={(() => setActive(false))}>
                close
              </span>
            </div>

            <div className="search-container">
              <div>
                <form className="search-bar" onSubmit={findBooks}>
                  <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                  <button type="submit" className="btn border-latte bg-wine text-center pointer">Retrieve Books</button>
                </form>
              </div>

              <div className="shelf">
                {
                  (books.docs).map(function(book){
                    return <Book book={book} addToShelf={props.addToShelf} location={props.location}/>
                  })
                }
              </div>
            </div>
          </>
        );
      }
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