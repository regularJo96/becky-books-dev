import React, { useState, useEffect} from "react";

import Book from "../book/Book"

import "../shared/assets/style.css"

function Shelf(props){

  const [shelfHide, setShelfhide] = useState([""]);
  const [expand, setExpand] = useState("more-info hidden");

  useEffect(() => {
    handleBookShelfState();
  }, [props.location]);

  function handleBookShelfState(){
    if(props.location == "search"){
      setShelfhide("hidden")
    }
    else{
      setShelfhide("");
    }
  }

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
        <div className={`container w-75 bg-latte ${shelfHide}`}>
          <div className={`row`}>
          {
            (props.books).map(function(book){
              return (
                <div className="col-4 my-5">
                  <Book book={book} addToShelf={props.addToShelf} deleteBook={props.deleteBook} shelfContext={props.shelfContext} location={props.location}/>
                </div>
              )
            
            })
          }
          </div>
        </div>
      </>
    );
  }
}

export default Shelf;