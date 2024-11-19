import React, { useState, useEffect, useRef } from "react";

import "../shared/assets/style.css";

// const MyInput = forwardRef(({ value, onChange }, ref) => {}

function ShelfBar (props){
var defaultStyle = "button shelf-item rounded border-white text-white text-center pointer";
var activeStyle = "button shelf-item rounded border-white text-white bg-wine text-center pointer";


  // shelfContext can be set with props.setShelfContext
  const [toReadTab, setToReadTab] = useState(activeStyle);
  const [amReadingTab, setAmReadingTab] = useState(defaultStyle);
  const [haveReadTab, setHaveReadTab] = useState(defaultStyle);
  const [shelf, setShelf] = useState("to-read");

  const myRef = useRef(null)

  // useEffect(() => {
  //   scrollToAddBook(shelf);
  // }, [shelf]);

  const scrollToAddBook = (id) => {
    const element = document.getElementById(id);

    // Get the position
    const rect = element.getBoundingClientRect();

    let offset = window.innerHeight*.02;

    window.scrollBy({top: rect.top-offset, left: 0, behavior: 'smooth'})
  };

  const handleShelfChange = (id) =>  {

    props.setShelfContext(id);
    setShelf(id);
    scrollToAddBook(shelf);
  }

  if(shelf=="to-read"){
    return(
      <>
        <div className="shelf-menu">
          <div id="to-read" className={activeStyle} onClick={() => handleShelfChange("to-read")}>
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("to-read")}>favorite</span>
            To Read
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("to-read")}>favorite</span>
          </div>
          <div id="am-reading" className={defaultStyle} onClick={() => handleShelfChange("am-reading")}>
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("am-reading")}>menu_book</span>
            Am Reading
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("am-reading")}>menu_book</span>
          </div>
          <div ref={myRef} id="have-read" className={defaultStyle} onClick={() => handleShelfChange("have-read")}>
          <span class="material-symbols-outlined" onClick={() => handleShelfChange("have-read")}>check_circle</span>
            Have Read
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("have-read")}>check_circle</span>
          </div>
        </div>
      </>
    );

  } else if(shelf=="am-reading"){
    return(
      <>
        <div className="shelf-menu">
          <div id="to-read" className={defaultStyle} onClick={() => handleShelfChange("to-read")}>
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("to-read")}>favorite</span>
            To Read
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("to-read")}>favorite</span>
          </div>
          <div id="am-reading" className={activeStyle} onClick={() => handleShelfChange("am-reading")}>
          <span class="material-symbols-outlined" onClick={() => handleShelfChange("am-reading")}>menu_book</span>
            Am Reading
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("am-reading")}>menu_book</span>
          </div>
          <div ref={myRef} id="have-read" className={defaultStyle} onClick={() => handleShelfChange("have-read")}>
          <span class="material-symbols-outlined" onClick={() => handleShelfChange("have-read")}>check_circle</span>
            Have Read
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("have-read")}>check_circle</span>
          </div>
        </div>
      </>
    );

  } else{
    return(
      <>
        <div className="shelf-menu">
          <div id="to-read" className={defaultStyle} onClick={() => handleShelfChange("to-read")}>
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("to-read")}>favorite</span>
            To Read
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("to-read")}>favorite</span>
          </div>
          <div id="am-reading" className={defaultStyle} onClick={() => handleShelfChange("am-reading")}>
          <span class="material-symbols-outlined" onClick={() => handleShelfChange("am-reading")}>menu_book</span>
            Am Reading
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("am-reading")}>menu_book</span>
          </div>
          <div ref={myRef} id="have-read" className={activeStyle} onClick={() => handleShelfChange("have-read")}>
          <span class="material-symbols-outlined" onClick={() => handleShelfChange("have-read")}>check_circle</span>
            Have Read
            <span class="material-symbols-outlined" onClick={() => handleShelfChange("have-read")}>check_circle</span>
          </div>
        </div>
      </>
    );

  }

};

export default ShelfBar;