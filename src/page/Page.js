import React, { useState, useEffect} from "react";

import SearchButton from "../searchButton/SearchButton";
import Book from "../book/Book"
import Blog from "../blog/Blog"

import "../shared/assets/style.css"

function InfoBar(props){


  var defaultTab = "btn border-white text-white text-center pointer";
  var activeTab = "btn border-white btn-clicked text-center pointer";

  const setActive = (e) => {
    if(e.target.id=="shelves"){
      props.setPageContext("bookshelf")
    }
    else if(e.target.id=="blog"){
      props.setPageContext("blog")
    }
  }

  if(props.pageContext == "bookshelf"){
    return (
      <>
        <div id="menu" className="menu bg-wine">
            
          <div className="name text-white">
            becky's belles-place
          </div>

          <div id="shelves" className={activeTab} onClick={setActive}>Bookshelves</div>
          <div id="blog" className={defaultTab} onClick={setActive}>blog</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="menu" className="menu bg-wine">
            
          <div className="name text-white">
            becky's belles-place
          </div>

          <div id="shelves" className={defaultTab} onClick={setActive}>Bookshelves</div>
          <div id="blog" className={activeTab} onClick={setActive}>blog</div>
        </div>
      </>
    );
  }

}

function Shelf(props){

  if(props.books.length == 0){
    return(
      <>
        <div className="text-center text-xlarge text-white">
            no books
        </div>
      </>
    );
  } else {
    return(
      <>
          <div className="shelf">
            {
              // will need to query database for books
              (props.books).map(function(book){
                return <Book book={book}/>
              })
            }
          </div>
      </>
    );
  }
}

function Page() {

  const [books, setBooks] = useState([])
  const [pageContext, setPageContext] = useState("bookshelf");

  useEffect(() => {
    findBooks();
  }, []);

  function findBooks(){
      fetch(`https://becky-books-server.herokuapp.com/books`)
      .then(response => response.json())
      .then(json => setBooks(json))
  }
  
  if(pageContext=="bookshelf"){
    return (
        <div>
          <div>
            <InfoBar setPageContext={setPageContext} pageContext={pageContext}/>
            <SearchButton />
            <Shelf books={books}/>
          </div>
        </div>
    );
  } else{
    return(
        <>
          <div>
            <InfoBar setPageContext={setPageContext} pageContext={pageContext}/>
            <Blog />
          </div>
        </>
    );
  }

  
}

export default Page;