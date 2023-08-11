import React, { useState, useEffect} from "react";

import SearchButton from "../searchButton/SearchButton";
import InfoBar from "../infoBar/InfoBar";
import ShelfBar from "../shelf/ShelfBar";
import Shelf from "../shelf/Shelf";
import Blog from "../blog/Blog";

import "../shared/assets/style.css"
import "../shared/assets/background_colors.css"



function App() {

  const [API_URL, setAPI_URL] = useState("https://becky-books-server.herokuapp.com");
  const [books, setBooks] = useState([]);
  const [infoBarContext, setInfoBarContext] = useState("bookshelf");
  const [shelfContext, setShelfContext] = useState("to-read");
  const [location, setLocation] = useState("shelf")

  useEffect(() => {
    getBooks();
  }, [shelfContext]);

  function getBooks() {
      fetch(`${API_URL}/${shelfContext}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setBooks(data);
      });
  }
  
  const addToShelf = (title, author, description, shelf) => {
    if(shelf=="favorite"){
      shelf="to-read";
    } else if(shelf=="menu_book") {
      shelf="am-reading";
    } else if(shelf=="check_circle"){
      shelf="have-read";
    }
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
        alert(`${title} added to ${shelf}`);
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
          <SearchButton addToShelf={addToShelf} location={location} setLocation={setLocation} shelfContext={shelfContext}/>
          <Shelf books={books} addToShelf={addToShelf} deleteBook={deleteBook} shelfContext={shelfContext} location={location}/>
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
