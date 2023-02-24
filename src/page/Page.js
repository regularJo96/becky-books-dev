import React, { useState, useEffect} from "react";

import SearchButton from "../searchButton/SearchButton";

import "../shared/assets/style.css"

function InfoBar(){
  var defaultTab = "btn border-white text-white text-center pointer";
  var activeTab = "btn border-white btn-clicked text-center pointer";

  const setActive = (e) => {

    document.getElementById("shelves").className = defaultTab;
    document.getElementById("blog").className = defaultTab;

    e.target.className = activeTab;
  }

  return (
    <>
        <div id="menu" className="menu bg-green-light">
            
          <div className="name text-white">
            becky's belles-place
          </div>

          <div id="shelves" className={activeTab} onClick={setActive}>Bookshelves</div>
          <div id="blog" className={defaultTab} onClick={setActive}>blog</div>
        </div>
    </>
  );
}

function Shelf(){

  const [books, setBooks] = useState()
  const [searchStr, setSearchStr] = useState()

  function findBooks(str){
    fetch(`https://openlibrary.org/search.json?q=${str}&limit=20`)
      .then(response => response.json())
      .then(json => setBooks(json))
  }
  
  console.log(books)

  if(books == null){
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
            {/* {
              // will need to query database for books
              (books.docs).map(function(book){
                return <Book book={book}/>
              })
            } */}
          </div>
        
      </>
    );
  }
}

function Page() {

  return (
  <div>
    <div>

      <InfoBar />
      <SearchButton />
      <Shelf />
    </div>
  </div>
  );
}

export default Page;