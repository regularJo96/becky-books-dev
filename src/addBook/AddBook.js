
import React, { useState, useEffect} from "react";

import AddBySearch from "../addBySearch/AddBySearch";
import AddBookManually from "../addBookManually/AddBookManually";

import "../shared/assets/style.css"

function AddBook(props){

//   const [bookCover, setBookCover] = useState()

    const [addBookActive, setAddBookActive] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);

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
                    <div className="button center w-30-px">
                        <span className="material-symbols-outlined pointer" onClick={(() => addOpen(false))}>
                            arrow_back_ios
                        </span>
                    </div>
                    <div id="search" className="button shelf-item rounded border-white text-white bg-wine text-center center pointer w-50" onClick={(() => handleSearchOpen(true))}>
                        <span className="search-prompt pointer" onClick={(() => handleSearchOpen(true))}>Search for a Book</span>
                        <span className="material-symbols-outlined pointer" onClick={(() => handleSearchOpen(true))}>
                            search
                        </span>
                    </div>
                    <div className="button shelf-item rounded border-white text-white bg-wine text-center center pointer w-50" onClick={(() => handleFormOpen(true))}>
                        Add A book manually
                    </div>
                </>
            );

        }
    } else {
        return (
            <>
                <div className="button shelf-item rounded border-white text-white bg-wine text-center center pointer w-50" onClick={(() => addOpen(true))}>
                    Add A Book
                </div>
            </>
        );
    }

}

export default AddBook;