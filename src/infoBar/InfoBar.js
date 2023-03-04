import React, { useState, useEffect} from "react";

function InfoBar(props){
  var defaultTab = "btn border-white text-white text-center pointer";
  var activeTab = "btn border-white btn-clicked text-center pointer";

  const setActive = (e) => {
    if(e.target.id=="shelves"){
      props.setTabContext("bookshelf")
    }
    else if(e.target.id=="blog"){
      props.setTabContext("blog")
    }
  }

  if(props.tabContext == "bookshelf"){
    return (
      <>
        <div id="menu" className="menu bg-wine">
            
          <div className="name text-white">
            becky's belles-place
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