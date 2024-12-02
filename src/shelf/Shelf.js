import React, { useState, useEffect} from "react";

import Book from "../book/Book"
import coverPlaceholder from "../app/images/the-book-thief.jpg"

import "../shared/assets/style.css"
import "./Shelf.css"

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
    else if(props.location == "manual-form-open"){
      setShelfhide("hidden")
    }
    else{
      setShelfhide("");
    }
  }

  if(props.books.length == 0){
    return(
      <>
        <div id="shelf" className="text-center no-books bg-latte text-xlarge text-white">
            no books here
        </div>
      </>
    );
  } else {
    return(
      <>  
        <div id="shelf" className={`book-container w-75 bg-latte ${shelfHide}`}>
      
          {
            (props.books).map(function(book){
              
              let image=null;
              if(book.cover){

                const arrayBuffer = new Uint8Array(book.cover.data).buffer;

                // Access the underlying ArrayBuffer
                // const arrayBuffer = Uint16Array.buffer;

                // console.log(arrayBuffer)
                const blob = new Blob([arrayBuffer], {"type":"image/jpeg"})

                image = URL.createObjectURL(blob)

                // console.log(coverHolder[0])
                
                // book.cover=blob
                // console.log(book.cover)
              } else{
                image = coverPlaceholder;
              }
              
              return (
                <div className="book-item">

                  <Book key={book.id} book={book} cover={image} moveToShelf={props.moveToShelf} addToShelf={props.addToShelf} apiUrl={props.apiUrl} deleteBook={props.deleteBook} shelfContext={props.shelfContext} location={props.location}/>
                </div>
              )
            
            })
          }
          
        </div>
      </>
    );
  }
}

export default Shelf;