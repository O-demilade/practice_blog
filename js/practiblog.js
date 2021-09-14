/**
 * Created by Demi on 15-Jul-21.
 */
"use strict";

const global ={
  // select all the buttons that pertains to adding a post
  addBtn : document.querySelector("header>button"),
  clsBtn : document.querySelector("#cls_add"),
  postBtn : document.querySelector(".post"),
};

window.addEventListener("DOMContentLoaded", function(){  
  let practiBlogTitlesStores = JSON.parse(localStorage.getItem("practiBlogTitles"));

  //initialize the practiblog titles local storage
  if(localStorage.getItem("practiBlogTitles")){
    // do nothing
  }
  else{
    let practiBlogTitlesStore = [];
    window.localStorage.setItem("practiBlogTitles", JSON.stringify(practiBlogTitlesStore))};

  //populate the posts display
  let artCount;
  if(practiBlogTitlesStores.length >= 5){artCount = 5}else{artCount = practiBlogTitlesStores.length};
  if(artCount>0){document.querySelector(".output").innerHTML = ""}
  while (artCount > 0) {
    document.querySelector(".output").innerHTML += addDisplay(practiBlogTitlesStores[artCount-1]);
    artCount -= 1;
  }
  
  //populate the list of titles *move this to the bottom of the listener to prevent initial sorting
  practiBlogTitlesStores.sort().forEach(element => {
    document.querySelector(".titles").innerHTML += `<a href="">${element}</a>`;
  });
  console.info("DOM content loaded" );

  editPost();
});

global.addBtn.addEventListener("click", function(d){
  document.querySelector(".input").style.display="block";
});

global.clsBtn.addEventListener("click", function(d){
  document.querySelector(".input").style.display="none";
  if (document.querySelector(".input").classList.contains("editMode")){
    document.querySelector(".input").classList.toggle("editMode");
  };
});

global.postBtn.addEventListener("click", function(d){
  const postCont = d.currentTarget.parentNode;
  const post = {
    title:postCont.querySelector("#post_title").value,
    writeup:postCont.querySelector("#post_writeup").value,
    author:postCont.querySelector("#post_author").value,
    timeStamp: new Date,
  };
  // console.log(global.practiBlogTitles);
  // Add post title to titles list
  let practiBlogTitlesStores = JSON.parse(localStorage.getItem("practiBlogTitles"));

  if (document.querySelector(".input").classList.contains("editMode")){
    let a = practiBlogTitlesStores.indexOf(post.title);
    practiBlogTitlesStores.splice(a,1);
    document.querySelector(".input").classList.toggle("editMode");
  };


  practiBlogTitlesStores.push(post.title);
  console.log(practiBlogTitlesStores);
  // store the post data as a string in browser memory
  localStorage.setItem(post.title, JSON.stringify(post));
  localStorage.setItem("practiBlogTitles", JSON.stringify(practiBlogTitlesStores));
});

function addDisplay(title){
  let outPost = localStorage.getItem(title);

  //.. convert the Storage data back from a string
  let outTemp = JSON.parse(outPost);
  let title_ = "";
  let writeup_ = "";
  let author_ = "";
  let display_ = "";

  if (outPost && outTemp.title !== "" && outTemp.writeup !== "") {
    title_ = outTemp.title;
    writeup_ = outTemp.writeup;
    author_ = "- " + outTemp.author;
    display_ = "block";
  };
  return(
    `<div class="output">
      <h1 class="title">${title_}</h1>
      <div class="writeup">${writeup_}</div>
      <h3 class="author">${author_}</h3>
      <button id="edit" style="display: ${display_};">edit post</button>
  </div>`);
};
function editPost(){
  let editBtns = document.querySelectorAll("#edit");
  editBtns.forEach(function(item){
    item.addEventListener("click", function(d){
      console.log("clicked", item.parentNode);
      let editForm = document.querySelector(".input");
      editForm.style.display="block";
      editForm.classList.toggle("editMode");
      editForm.querySelector("#post_title").value = item.parentNode.querySelector(".title").innerText;
      editForm.querySelector("#post_writeup").value = item.parentNode.querySelector(".writeup").innerText;
      editForm.querySelector("#post_author").value = item.parentNode.querySelector(".author").innerText.slice(2);
    })
  });
};
