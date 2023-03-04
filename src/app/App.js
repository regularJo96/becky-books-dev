import React, { useState, useEffect} from "react";

import SearchButton from "../searchButton/SearchButton";
import InfoBar from "../infoBar/InfoBar";
import Shelf from "../shelf/Shelf";
import Blog from "../blog/Blog";

import "../shared/assets/style.css"



function App() {

  const [books, setBooks] = useState([])
  const [tabContext, setTabContext] = useState("bookshelf");

  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    fetch('http://localhost:3001/books')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setBooks(data);
      });
  }
  
  function setCover(id){
    console.log("WORKED")
  }
  
  
  function addToRead(author, title) {
    console.log(author + "" +title)
    fetch("https//localhost:3001/book", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({author, title}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
      });
  }
  
  if(tabContext=="bookshelf"){
    return (
      <>
        <div>
          <InfoBar setTabContext={setTabContext} tabContext={tabContext}/>
          <SearchButton />
          <Shelf books={books}/>
        </div>
      </>
    );
  } else{
    return(
      <>
        <div>
          <InfoBar setTabContext={setTabContext} tabContext={tabContext}/>
          <Blog />
        </div>
      </>
    );
  }

  
}

export default App;