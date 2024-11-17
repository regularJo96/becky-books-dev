import axios from "axios";
import React, { useState, useEffect} from "react";

import Book from "../book/Book.js"

import coverPlaceholder from "../app/images/the-book-thief.jpg"

import "../shared/assets/style.css"
import "./AddBySearch.css"


function AddBySearch(props){

  
// I think I can try the "hidden" approach like I have with the buttons. Just hide the views when search is active.


  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState([])
  const [searchStr, setSearchStr] = useState("hi");

  const findBooks = async (event) => {
    event.preventDefault();
    setLoading(true);

    await axios.get(`https://openlibrary.org/search.json?q=${searchStr}&fields=title,author_alternative_name,author_key,author_name,cover_edition_key,cover_i,first_publish_year,isbn,key&limit=3`,{
      headers: {
        "User-Agent": "BeckyBooks/1.0 Josiah.Anderson27@outlook.com",
      }
    })
    .then((response) => {
      setSearchStr(response.status)
      setLoading(false);
      setBooks(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
      setSearchStr(error)
    });;
    

    // try{
    //   await fetch(`https://openlibrary.org/search.json?q=${searchStr}&fields=title,author_alternative_name,author_key,author_name,cover_edition_key,cover_i,first_publish_year,isbn,key&limit=3`, {
    //   method: "GET",
    //   headers : {
    //     "User-Agent": "BeckyBooks/1.0 Josiah.Anderson27@outlook.com"
    //   }
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok ' + response.statusText);
    //       setSearchStr(response);
    //     }
        
    //     return response.json();
    //   })
    //   .then(data => {
    //     setLoading(false);
    //     setBooks(data);
    //   });
    // } catch (error){
    //   setLoading(false);
    //   // setSearchStr(error);
    // }
    
      
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
           
           <div className="search">
              search OpenLibrary
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
          
            <div className="search">
              search OpenLibrary
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
         
            <div className="search">
              search OpenLibrary
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
                    <div className="col-4 my-5">
                      <Book book={book} cover={cover} addToShelf={props.addToShelf} location={props.location}/>
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