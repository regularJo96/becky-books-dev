import React, { useState, useEffect} from "react";

import Book from "../book/Book.js"

import coverPlaceholder from "../app/images/the-book-thief.jpg"

import "../shared/assets/style.css"
import "./AddBySearch.css"


function AddBySearch(props){

  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState([])
  const [searchStr, setSearchStr] = useState();
  const [searchHighlight, setSearchHighlight] = useState("bg-wine")

  const handleHighlight = (e, highlight) => {
    if(highlight){
      setSearchHighlight("highlight");
    } 
    else{
      setSearchHighlight("bg-wine")
    }
  }

  const findBooks = async (event) => {
    event.preventDefault();
    setSearchHighlight("bg-wine");
    
    setLoading(true);
    
    await fetch(`https://openlibrary.org/search.json?q=${searchStr}&fields=title,author_alternative_name,author_key,author_name,cover_edition_key,cover_i,first_publish_year,isbn,key&limit=3`)
    .then(response => { 
      return response.json();
    })
    .then(data => {
      setLoading(false);
      setBooks(data);
    })
    .catch (error => {
      setLoading(false);
      console.log(error.message)
    });
  }
  
    if(books.length==0){
      if(loading){
        return(
          <>
            
            <div className="search">
              search OpenLibrary
            </div>
  
            <div className="container w-75">
              <div>
              <form className="search-bar" onSubmit={findBooks}>
                  <div className="form-floating">
                    <input id="search-input" className="form-control" type="text" placeholder='Search for title/author/isbn/etc.' value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                    <label for="search-input">Search for title/author/isbn/etc.</label>
                  </div>
                  <button type="submit" className={`button big border-latte text-white text-center pointer ${searchHighlight}`} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>Retrieve Books</button>
                </form>
              
              </div>
              
              <div className="no-books bg-latte position-absolute">
                finding books...
              </div>
            </div>
          </>
        );
      } else{
        return(
          <>
           
           <div className="search bg-wine">
                search OpenLibrary
              </div>
  
            <div className="container w-75">
              <div>
                <form className="search-bar" onSubmit={findBooks}>
                  <div className="form-floating">
                    <input id="search-input" className="form-control" type="text" placeholder='Search for title/author/isbn/etc.' value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                    <label for="search-input">Search for title/author/isbn/etc.</label>
                  </div>
                  <button type="submit" className={`button big border-latte text-white text-center pointer ${searchHighlight}`} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>Retrieve Books</button>
                </form>
             
              </div>
              
              <div className="no-books bg-latte position-absolute">
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
          
            <div className="search">
              search OpenLibrary
            </div>

            <div className="container w-75">
              <div>
              <form className="search-bar" onSubmit={findBooks}>
                  <div className="form-floating">
                    <input id="search-input" className="form-control" type="text" placeholder='Search for title/author/isbn/etc.' value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                    <label for="search-input">Search for title/author/isbn/etc.</label>
                  </div>
                  <button type="submit" className={`button big border-latte text-white text-center pointer ${searchHighlight}`} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>Retrieve Books</button>
                </form>

              </div>

              <div className="no-books bg-latte position-absolute">
                finding books...
              </div>
            </div>
          </>
        );
      }
      else{

        return (
          <>
         
            <div className="search">
              search OpenLibrary
            </div>

            <div className="container w-75">
              <div>
              <form className="search-bar" onSubmit={findBooks}>
                  <div className="form-floating">
                    <input id="search-input" className="form-control" type="text" placeholder='Search for title/author/isbn/etc.' value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
                    <label for="search-input">Search for title/author/isbn/etc.</label>
                  </div>
                  <button type="submit" className={`button big border-latte text-white text-center pointer ${searchHighlight}`} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>Retrieve Books</button>
                </form>
                
              </div>

              <div className="search-results bg-antiquewhite">
                {
                  (books.docs).map(function(book){
                    let cover = coverPlaceholder;
                    if(book.hasOwnProperty("cover_edition_key")){
                      console.log("YES")
                      cover = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`;
                    }
                    else if(book.cover_i){
                      cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
                    }
                    else if(book.isbn[0]){
                      cover = `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
                    }
                    else{
                      cover = coverPlaceholder;
                    }
                    return (
                    <div className="book-item">
                      <Book book={book} cover={cover} addToShelf={props.addToShelf} location={props.location}/>
                    </div>
                    )
                  })
                }
              </div>
            </div>
          </>
        );
      }
    } 
}
export default AddBySearch;