import React, { useState, useEffect} from "react";

function Book(props){

  // useEffect(() => {
  //   getBook();
  // }, []);

  // function getBook() {
  //   if(props.key!="none"){
  //     fetch(`https://openlibrary.org${props.key}.json`)
  //       .then(response => {
  //         return response.json();
  //       })
  //       .then(data => {
  //         setBook(data);
  //       });
  //   }
  // }
  
  // if(props.cover)
  let title = props.title;
  let author = props.author;
  let cover_id = "No Cover Found";
  let description = ""

  if(cover_id == "No Cover Found"){
    return(
      <>
        <div className="book">
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
        <div className="book">
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