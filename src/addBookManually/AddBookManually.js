import React, { useState, useEffect} from "react";

import Book from "../book/Book.js"

import "../shared/assets/style.css"

function AddBookManually(props){

  const [bookTitle, setBookTitle] = useState("add title");
  const [bookAuthor, setBookAuthor] = useState("add author");
  const [bookDescription, setBookDescription] = useState("add description");
  const [bookShelf, setBookShelf] = useState("Shelf")
//   const [bookCover, setBookCover] = useState()

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
            <div className="container w-25">
                <form className="add-book-custom-form" onSubmit={addBook}>
                    <input type="text" value={bookTitle} onChange={e => setBookTitle(e.target.value)}/>
                    <input type="text" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)}/>
                    <input type="text" value={bookDescription} onChange={e => setBookDescription(e.target.value)}/>
                    <label>
                        <select id="shelfSelect" value={bookShelf} onChange={e => setBookShelf(e.target.value)}>
                            <option value="">Select Shelf</option>
                            <option value={"favorite"}>To Read</option>
                            <option value={"menu_book"}>Am Reading</option>
                            <option value={"check_circle"}>Have Read</option>
                        </select>
                    </label>
                    <button type="submit" className="button border-latte bg-wine text-white text-center pointer">Add Book</button>
                </form>
            </div>
        </>
    );

}   

export default AddBookManually;