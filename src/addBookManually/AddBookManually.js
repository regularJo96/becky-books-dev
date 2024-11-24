import React, { useState, useEffect} from "react";

import Book from "../book/Book.js"

import "../shared/assets/style.css"
import "./AddBookManually.css"

function AddBookManually(props){

  const [bookTitle, setBookTitle] = useState();
  const [bookAuthor, setBookAuthor] = useState();
  const [bookDescription, setBookDescription] = useState();
  const [bookShelf, setBookShelf] = useState("Shelf")
  const [formStyle, setFormStyle] = useState({"border": "none", "border-bottom": "2px solid #722f37"});
  const [buttonHighlight, setButtonHighlight] = useState("bg-wine");
//   const [bookCover, setBookCover] = useState()

const handleHighlight = (e, highlight) => {
    if(highlight){
        setButtonHighlight("highlight");
    }
    else {
        setButtonHighlight("bg-wine")
    }
}

const addBook = (event) => {
    event.preventDefault();

    //"favorite", "menu_book", "check_circle"
    if(bookShelf != "favorite" && bookShelf != "menu_book" && bookShelf != "check_circle"){
        alert("FATAL ERROR. Select a shelf!")
    }
    else{
        props.addToShelf(bookTitle, bookAuthor, bookDescription, bookShelf);
    }
  }


    return(
        <>
            <div className="container">
                <div className="form-title">Add Book Manually</div>
                <form className="add-book-custom-form" onSubmit={addBook}>
                    <input style={formStyle} type="text" placeholder='Add Title' value={bookTitle} onChange={e => setBookTitle(e.target.value)}/>
                    <input style={formStyle} type="text" placeholder='Add Author' value={bookAuthor} onChange={e => setBookAuthor(e.target.value)}/>
                    <input style={formStyle} type="text" placeholder='Add Description' value={bookDescription} onChange={e => setBookDescription(e.target.value)}/>
                    <label>
                        <select classname="row justify-content-center" id="shelfSelect" value={bookShelf} onChange={e => setBookShelf(e.target.value)}>
                            <option value="">Select Shelf</option>
                            <option value={"favorite"}>To Read</option>
                            <option value={"menu_book"}>Am Reading</option>
                            <option value={"check_circle"}>Have Read</option>
                        </select>
                    </label>
                    <button type="submit" className={`button border-latte text-white text-center pointer ${buttonHighlight}`} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>Add Book</button>
                </form>
            </div>
        </>
    );

}   

export default AddBookManually;