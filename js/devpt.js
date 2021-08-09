"use strict";

function devptDisplay(display){
  let screen = document.querySelector("#devpt-display");
  
  
  if (display !== (null, "") && display){
    screen.style.display = "block";
    screen.textContent = display;
  };
};

const storage = {
  image: window.localStorage,
  len: window.localStorage.length,
  titles: window.localStorage.getItem("practiBlogTitles")
};

let out1 = window.localStorage.getItem("My store");

let out = (out1 === null);

// devptDisplay(storage.titles);
// devptDisplay(global.postLinks);

// window.localStorage.clear();


// addDisplay("First")