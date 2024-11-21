import React, { useState, useEffect, useRef } from "react";

import "../shared/assets/style.css";

// const MyInput = forwardRef(({ value, onChange }, ref) => {}

function ShelfBar (props){
var defaultStyle = "button shelf-item rounded border-white text-black text-center pointer";
var activeStyle = "button shelf-item rounded border-white text-white bg-wine text-center pointer";


  // shelfContext can be set with props.setShelfContext
  const [shelf, setShelf] = useState("to-read");
  const [toReadActiveStyle, setToReadActiveStyle] = useState("button shelf-item rounded border-white text-white bg-wine text-center pointer")
  const [amReadingActiveStyle, setAmReadingActiveStyle] = useState("button shelf-item rounded border-white text-white bg-wine text-center pointer")
  const [haveReadActiveStyle, setHaveReadActiveStyle] = useState("button shelf-item rounded border-white text-white bg-wine text-center pointer")
  const [toReadHighlight, setToReadHighlight] = useState("");
  const [amReadingHighlight, setAmReadingHighlight] = useState("");
  const [haveReadHighlight, setHaveReadHighlight] = useState("")
  
  const myRef = useRef(null)

  const handleHighlight = (e, highlight) => {
    if(e.id=="am-reading"){
      if(highlight){
        setAmReadingHighlight("highlight");
      } else{
        setAmReadingHighlight("");
      }
    } 
    else if (e.id=="to-read"){
      if(highlight){
        setToReadHighlight("highlight");
      } else{
        setToReadHighlight("");
      }
    }
    else if (e.id=="have-read"){
      if(highlight){
        setHaveReadHighlight("highlight");
      } else{
        setHaveReadHighlight("");
      }
    }
  }

  const scrollToAddBook = (id) => {
    const element = document.getElementById(id);

    // Get the position
    const rect = element.getBoundingClientRect();

    let offset = window.innerHeight*.02;

    if(window.innerWidth<800){
      window.scrollBy({top: rect.top-offset, left: 0, behavior: 'smooth'})
    }
    
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
          <div id="to-read" className={activeStyle} onClick={() => handleShelfChange("to-read")} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
            <span className="material-symbols-outlined" onClick={() => handleShelfChange("to-read")}>favorite</span>
            To Read
            <span className="material-symbols-outlined" onClick={() => handleShelfChange("to-read")}>favorite</span>
          </div>
          <div id="am-reading" className={`${defaultStyle} ${amReadingHighlight}`} onClick={() => handleShelfChange("am-reading")} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
            <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("am-reading")}>menu_book</span>
            Am Reading
            <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("am-reading")}>menu_book</span>
          </div>
          <div ref={myRef} id="have-read" className={`${defaultStyle} ${haveReadHighlight}`} onClick={() => handleShelfChange("have-read")} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
          <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("have-read")}>check_circle</span>
            Have Read
            <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("have-read")}>check_circle</span>
          </div>
        </div>
      </>
    );

  } else if(shelf=="am-reading"){
    return(
      <>
        <div className="shelf-menu">
          <div id="to-read" className={`${defaultStyle} ${toReadHighlight}`} onClick={() => handleShelfChange("to-read")} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
            <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("to-read")}>favorite</span>
            To Read
            <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("to-read")}>favorite</span>
          </div>
          <div id="am-reading" className={activeStyle} onClick={() => handleShelfChange("am-reading")} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
          <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("am-reading")}>menu_book</span>
            Am Reading
            <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("am-reading")}>menu_book</span>
          </div>
          <div ref={myRef} id="have-read" className={`${defaultStyle} ${haveReadHighlight}`} onClick={() => handleShelfChange("have-read")} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
          <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("have-read")}>check_circle</span>
            Have Read
            <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("have-read")}>check_circle</span>
          </div>
        </div>
      </>
    );

  } else{
    return(
      <>
        <div className="shelf-menu">
          <div id="to-read" className={`${defaultStyle} ${toReadHighlight}`} onClick={() => handleShelfChange("to-read")} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
            <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("to-read")}>favorite</span>
            To Read
            <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("to-read")}>favorite</span>
          </div>
          <div id="am-reading" className={`${defaultStyle} ${amReadingHighlight}`} onClick={() => handleShelfChange("am-reading")} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
          <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("am-reading")}>menu_book</span>
            Am Reading
            <span className="material-symbols-outlined" style={{"z-index": "-1"}} onClick={() => handleShelfChange("am-reading")}>menu_book</span>
          </div>
          <div ref={myRef} id="have-read" className={activeStyle} onClick={() => handleShelfChange("have-read")} onMouseEnter={e => {handleHighlight(e.target, true)}} onMouseLeave={e => {handleHighlight(e.target, false)}} onTouchEnd={e => {handleHighlight(e.target, false)}}>
          <span className="material-symbols-outlined" onClick={() => handleShelfChange("have-read")}>check_circle</span>
            Have Read
            <span className="material-symbols-outlined" onClick={() => handleShelfChange("have-read")}>check_circle</span>
          </div>
        </div>
      </>
    );

  }
};

export default ShelfBar;