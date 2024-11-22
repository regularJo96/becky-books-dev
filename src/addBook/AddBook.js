
import React, { useState, useEffect} from "react";

import AddBySearch from "../addBySearch/AddBySearch";
import AddBookManually from "../addBookManually/AddBookManually";

import "../shared/assets/style.css"
import "./AddBook.css"

function AddBook(props){

//   const [bookCover, setBookCover] = useState()

    const [addBookActive, setAddBookActive] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [addBookHighlight, setAddBookHighlight] = useState("bg-wine");
    const [addBookManuallyHighlight, setAddBookManuallyHighlight] = useState("bg-wine");
    const [addBookSearchHighlight, setAddBookSearchHighlight] = useState("bg-wine");


    const handleHighlight = (e, highlight) => {
        if(e.id=="add-book"){
            if(highlight){
                setAddBookHighlight("highlight");
            } 
            else{
                setAddBookHighlight("bg-wine");
            }
        }
        else if(e.id=="add-book-manually"){
            if(highlight){
                setAddBookManuallyHighlight("highlight");
            } 
            else{
                setAddBookManuallyHighlight("bg-wine");
            }
        }
        else if(e.id=="add-book-search"){
            if(highlight){
                setAddBookSearchHighlight("highlight");
            } 
            else{
                setAddBookSearchHighlight("bg-wine");
            }
        }
        else if(e.id=="add-book-search-icon"){
            if(highlight){
                setAddBookSearchHighlight("highlight");
            } 
            else{
                setAddBookSearchHighlight("bg-wine");
            }
        }
    }

    const addOpen = (open) => {
        if(open){
            setAddBookActive(true);
        }
        else{
            setAddBookActive(false);
        }
    }

    const handleSearchOpen = (open) => {
        if(open){
            setAddBookSearchHighlight("bg-wine")
            setSearchOpen(true);
            setFormOpen(false);
            props.setLocation("search");
        } else{
            setSearchOpen(false);
            props.setLocation("shelf")
        }
    }

    const handleFormOpen = (open) => {
        if(open){
            setFormOpen(true);
            setSearchOpen(false);
        } else{
            setFormOpen(false);
        }
    }



// render the AddBySearch component or the AddBookmanually component 
// based on selection
    if(addBookActive){
        if(searchOpen){
            return (
                <>
                    <div className="button center w-30-px">
                        <span className="material-symbols-outlined pointer" onClick={(() => handleSearchOpen(false))}>
                            close
                        </span>
                    </div>
    
                    <AddBySearch addToShelf={props.addToShelf} apiUrl={props.apiUrl} location={props.location} shelfContext={props.shelfContext} />
                </>
            );

        } else if(formOpen){
            return (
                <>
                    <div className="button center w-30-px">
                        <span className="material-symbols-outlined pointer" onClick={(() => handleFormOpen(false))}>
                            close
                        </span>
                    </div>
    
                    <AddBookManually addToShelf={props.addToShelf} apiUrl={props.apiUrl} location={props.location} shelfContext={props.shelfContext} />
                </>
            );
        } else {
            return (
                <>  
                    <div className="button center arrow">
                        <span className="material-symbols-outlined pointer" onClick={(() => addOpen(false))}>
                            arrow_back_ios
                        </span>
                    </div>

                    <div className="add-book-menu">
                        <div id="add-book-search" className={`button rounded border-white text-white text-center pointer ${addBookSearchHighlight}`} onClick={(() => handleSearchOpen(true))} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}} onMouse>
                            <span className="search-prompt pointer" onClick={(() => handleSearchOpen(true))}>Search for a Book</span>
                            <span id="add-book-search-icon" className="material-symbols-outlined pointer" onClick={(() => handleSearchOpen(true))}>
                                search
                            </span>
                        </div>
                        <div id="add-book-manually" className={`button rounded border-white text-white text-center pointer ${addBookManuallyHighlight}`} onClick={(() => handleFormOpen(true))} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
                            Add A book manually
                        </div>
                    </div>
                </>
            );

        }
    } else {
        return (
            <>
                <div className="add-book">
                    <div id="add-book" className={`button rounded border-white text-white text-center center pointer w-50 ${addBookHighlight}`} onClick={(() => addOpen(true))} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
                        Add A Book
                    </div>
                </div>
            </>
        );
    }

}

export default AddBook;