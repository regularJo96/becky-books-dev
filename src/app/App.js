import React, { useState, useEffect} from "react";

import AddBookManually from "../addBookManually/AddBookManually";
import AddBook from "../addBook/AddBook";
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
    let id = ""
    let cover = ""
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
        return response.json();
      })
      .then(data => {
        // console.log(data);
        id=data["id"]
        console.log(id)

        alert(`${title} added to ${shelf}`);

      });

    // fetch to add image to book just created
    fetch(`https://openlibrary.org/search.json?q=${title}&fields=title,cover_edition_key&limit=1`, {
      headers : {
        "User-Agent": "BeckyBooks/1.0 Josiah.Anderson27@outlook.com"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
              let cover_id=data.docs[0].cover_edition_key
              // 
              fetch(`https://covers.openlibrary.org/b/olid/${cover_id}-M.jpg`, {
                    method: 'GET',
                      headers: {
                        "User-Agent": "BeckyBooks/1.0 Josiah.Anderson27@outlook.com"
                      }
                })
                  .then(response => {
                      return response.blob();
                  })
                  .then(data => {
                  
                      fetch(`${API_URL}/update-image/${id}`, {
                        method: 'POST',
                        headers: {
                          "Content-Type": "application/octet-stream"
                        },
                        body: data
                      })
                      .then(response => {
                          return response.text();
                      })
                      .then(data => {
                        console.log(data);
                        // alert("added image");

                        getBooks();
                      });
                  });

                });             
  }

  const moveToShelf = (id, shelf) => {
    if(shelf=="favorite"){
      shelf="to-read";
    } else if(shelf=="menu_book") {
      shelf="am-reading";
    } else if(shelf=="check_circle"){
      shelf="have-read";
    }

    fetch(`${API_URL}/move-book`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, shelf}),
    })
    .then(response => {
      return response.json();
    })
    .then(data =>{
      alert(`${data[0]["title"]} moved to ${data[0]["shelf"]}`)
      getBooks();
    })
  }

  function deleteBook(id) {
    
    let result = window.confirm("Delete Book?");
      
    if(result){
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
  }
  
  if(infoBarContext=="bookshelf"){
    return (
      <>
        <div>
          <InfoBar infoBarContext={infoBarContext} setInfoBarContext={setInfoBarContext}/>
          <ShelfBar shelfContext={shelfContext} setShelfContext={setShelfContext}/>
          <AddBook addToShelf={addToShelf} apiUrl={API_URL} location={location} setLocation={setLocation} shelfContext={shelfContext}/>
          <Shelf books={books} moveToShelf={moveToShelf} addToShelf={addToShelf} apiUrl={API_URL} deleteBook={deleteBook} shelfContext={shelfContext} location={location}/>
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
