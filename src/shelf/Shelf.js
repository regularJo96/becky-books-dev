import React, { useState, useEffect} from "react";

import Book from "../book/Book"

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
            (props.books).map(function(book){
              return <Book book={book} addToShelf={props.addToShelf} deleteBook={props.deleteBook} shelfContext={props.shelfContext} location={props.location}/>
            })
          }
        </div>
      </>
    );
  }
}

export default Shelf;