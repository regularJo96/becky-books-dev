import React, { useState, useEffect} from "react";

function Book(props){

  const [book, setBook] = useState([])

  useEffect (() => {
    fetch('https://openlibrary.org'+props.book.key+".json")
    .then(response => response.json())
    .then(json => setBook(json))
  }, [])

  let title = "";
  let isbn = "";
  let author = "";
  let cover_id = "";
  let description = ""

  if(book.description == undefined){
    description = "No Description Found"
  } else if (book.description.value == undefined){
    description = book.description
  } else {
    description = book.description.value
  }

  if(props.book.cover_i != undefined){
    cover_id = props.book.cover_i
  } else{
    cover_id = "No Cover Found"
  }

  if(props.book.isbn != undefined){
    isbn = props.book.isbn[0]
  } else{
    isbn = "No ISBN Found"
  }

  if(props.book.title != undefined){
    title = props.book.title
  } else{
    title = "No Title Found"
  }

  if(props.book.author_name != undefined){
    author = props.book.author_name
  } else{
    author = "No Author Found"
  }

  if(cover_id == "No Cover Found"){
    return(
      <>
        <div class="book">
          
          <div className="book-item text-bold default-image bg-green-dark border-gold pointer">{title}
            <div className="tooltip">{title}</div>
          </div>
          
          <div id="title" className="book-item text-bold overflow-title">{title}</div>
          {/* <p>{description}</p> */}
          <div id="author" className="book-item overflow-title">{author}</div>
          {/* <div className="book-item">ISBN: {isbn}</div> */}
        </div>
      </>
    );
  } else{
    return(
      <>
        <div class="book">
        <div className="tooltip">{title}</div>
          <img className="book-item border-gold pointer" src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`} alt={`${title}`} height="209px;" width="140px;"></img>
          <div id="title" className="book-item text-bold overflow-title">{title}</div>
          {/* <p>{description}</p> */}
          <div className="book-item overflow-title">{author}</div>
          {/* <div className="book-item">ISBN: {isbn}</div> */}
        </div>
      </>
    );
  }
}

export default Book;