import React, { useState, useEffect} from "react";

import Book from "../book/Book.js"

import "./AddBySearch.css"
import "../shared/assets/style.css"

function AddBySearch(props){

  
// I think I can try the "hidden" approach like I have with the buttons. Just hide the views when search is active.


var defaultTab = "text-white default";
var activeTab = "text-white active";

  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState([])
  const [searchStr, setSearchStr] = useState();

  const findBooks = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch(`https://openlibrary.org/search.json?q=${searchStr}&fields=title,author_alternative_name,author_key,author_name,cover_edition_key,cover_i,first_publish_year,isbn,key&limit=3`, {
      method: "GET",
      headers : {
        "User-Agent": "BeckyBooks/1.0 Josiah.Anderson27@outlook.com"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
      });


      console.log(books)
  }
  
    if(books.length==0){
      if(loading){
        return(
          <>
            
            <div id="search" className={activeTab}>
              <span className="search-prompt">search OpenLibrary for a book/author/title etc.</span>
            </div>
  
            <div className="container w-75">
              <div>
                <form className="search-bar" onSubmit={findBooks}>
                  <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                  <button type="submit" className="button border-latte bg-wine text-white text-center pointer">Retrieve Books</button>
                </form>
              
              </div>
              
              <div>
                finding books...
              </div>
            </div>
          </>
        );
      } else{
        return(
          <>
           
            <div id="search" className={activeTab}>
            
              <span className="search-prompt">search OpenLibrary for a book/author/title etc.</span>
            </div>
  
            <div className="container w-75">
              <div>
                <form className="search-bar" onSubmit={findBooks}>
                  <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                  <button type="submit" className="button border-latte bg-wine text-white text-center pointer">Retrieve Books</button>
                </form>
             
              </div>
              
              <div className="no-books bg-antiquewhite position-absolute">
                No Books
              </div>
            </div>
          </>
        );
      }

    } 
    else {

      if(loading){
        return (
<>
          
            <div id="search" className={activeTab}>
            
              <span className="search-prompt">search OpenLibrary for a book/author/title etc.</span>
            </div>

            <div className="container w-75">
              <div>
                <form className="search-bar" onSubmit={findBooks}>
                  <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                  <button type="submit" className="button border-latte text-white bg-wine text-center pointer">Retrieve Books</button>
                </form>

              </div>

              <div>
                finding books...
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

            </div>

            <div className="container w-75">
              <div>
                <form className="search-bar" onSubmit={findBooks}>
                  <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                  <button type="submit" className="button border-latte text-white bg-wine text-center pointer">Retrieve Books</button>
                </form>
                
              </div>

              <div className="search-results bg-antiquewhite">
                <div className="row bg-antiquewhite ">
                {
                  (books.docs).map(function(book){

                    return (
                    <div className="col-4 my-5">
                      <Book book={book} addToShelf={props.addToShelf} location={props.location}/>
                    </div>
                    )
                  })
                }
                </div>
              </div>
            </div>
          </>
        );
      }
    } 
}
export default AddBySearch;