import React, { useState, useEffect} from "react";

import SearchButton from "../searchButton/SearchButton";
import InfoBar from "../infoBar/InfoBar";
import ShelfBar from "../shelf/ShelfBar";
import Shelf from "../shelf/Shelf";
import Blog from "../blog/Blog";

import "../shared/assets/style.css"



function App() {

  const [API_URL, setAPI_URL] = useState("http://localhost:3001");
  const [books, setBooks] = useState([]);
  const [infoBarContext, setInfoBarContext] = useState("bookshelf");
  const [shelfContext, setShelfContext] = useState("to-read");
  const [location, setLocation] = useState("shelf")

  // TODO: fire the useEffect when shelfContext changes? pass in shelfContext as string arg to getBooks() to 
  // display books connected to that shelf. Need also update server to filter by argument sent along in body
  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    fetch(`${API_URL}/`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setBooks(data);
      });
  }
  
  function addToToRead(title, author, description, shelf){

    fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, author, description, shelf}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(`${title} added`);
        getBooks();
      });
  }

  function deleteBook(id) {
    fetch(`${API_URL}/books/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert("book removed from shelf");
        getBooks();
      });
  }
  
  if(infoBarContext=="bookshelf"){
    return (
      <>
        <div>
          <InfoBar infoBarContext={infoBarContext} setInfoBarContext={setInfoBarContext}/>
          <ShelfBar shelfContext={shelfContext} setShelfContext={setShelfContext}/>
          <SearchButton addToToRead={addToToRead} location={location} setLocation={setLocation} shelfContext={shelfContext}/>
          <Shelf books={books} addToToRead={addToToRead} deleteBook={deleteBook} shelfContext={shelfContext} location={location}/>
        </div>
      </>
    );
  } else{
    return(
      <>
        <div>
          <InfoBar infoBarContext={infoBarContext} setInfoBarContext={setInfoBarContext}/>
          <Blog />
        </div>
      </>
    );
  }

  
}

export default App;