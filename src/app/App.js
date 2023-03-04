import React, { useState, useEffect} from "react";

import SearchButton from "../searchButton/SearchButton";
import InfoBar from "../infoBar/InfoBar";
import ShelfBar from "../shelf/ShelfBar";
import Shelf from "../shelf/Shelf";
import Blog from "../blog/Blog";

import "../shared/assets/style.css"



function App() {

  const [books, setBooks] = useState([])
  const [infoBarContext, setInfoBarContext] = useState("bookshelf");
  const [shelfContext, setShelfContext] = useState("to-read");

  const API_URL = "http://localhost:3001";

  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    fetch(`${API_URL}/books`)
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
    fetch(`${API_URL}/book`, {
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
  
  if(infoBarContext=="bookshelf"){
    return (
      <>
        <div>
          <InfoBar setInfoBarContext={setInfoBarContext} infoBarContext={infoBarContext}/>
          <ShelfBar setShelfContext={setShelfContext} shelfContext={shelfContext}/>
          <SearchButton />
          <Shelf books={books}/>
        </div>
      </>
    );
  } else{
    return(
      <>
        <div>
          <InfoBar setInfoBarContext={setInfoBarContext} infoBarContext={infoBarContext}/>
          <Blog />
        </div>
      </>
    );
  }

  
}

export default App;