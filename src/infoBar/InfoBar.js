import React, { useState, useEffect} from "react";

function InfoBar(props){
  var defaultTab = "btn rounded border-white text-white text-center pointer";
  var activeTab = "btn rounded border-white btn-clicked text-center pointer";

  const setActive = (e) => {
    if(e.target.id=="shelves"){
      props.setInfoBarContext("bookshelf")
    }
    else if(e.target.id=="blog"){
      props.setInfoBarContext("blog")
    }
  }

  if(props.infoBarContext == "bookshelf"){
    return (
      <>
        <div id="menu" className="menu bg-wine">
            
          <div className="name text-white">
            becky's belles-lettres
          </div>

          <div id="shelves" className={activeTab} onClick={setActive}>Bookshelves</div>
          <div id="blog" className={defaultTab} onClick={setActive}>blog</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="menu" className="menu bg-wine">
            
          <div className="name text-white">
            becky's belles-place
          </div>

          <div id="shelves" className={defaultTab} onClick={setActive}>Bookshelves</div>
          <div id="blog" className={activeTab} onClick={setActive}>blog</div>
        </div>
      </>
    );
  }

}

export default InfoBar;