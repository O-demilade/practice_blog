/**
 * Created by Demi on 15-Jul-21.
 */
"use strict";
const global ={
  // select all the buttons that pertains to adding a post
  addBtn : document.querySelector("header>button"),
  clsBtn : document.querySelector("#cls_add"),
  postBtn : document.querySelector(".post"),

  // assign the elements for the articles display 
  outTitle : document.querySelector(".title"),
  outWriteup : document.querySelector(".writeup"),
  outAuthor : document.querySelector(".author"),
  editButn : document.querySelector("#edit"),
    
  postTitles : [],
  display : "",

  postLinks : document.querySelector(".titles>a")
};

window.addEventListener("DOMContentLoaded", function(d){

  console.log("loaded");
  

  function populatePostTitles(){
    // get all the blog post titles from Storage
    if (window.localStorage.getItem("practiBlogTitles") === null){
      window.localStorage.setItem("practiBlogTitles", JSON.stringify(global.postTitles));
    }
    else {
      // get list of all titles available in storage
      global.postTitles = (JSON.parse(window.localStorage.getItem("practiBlogTitles")));
    }
    // assign each post title a link on the Posts pane
    global.postTitles.sort();
    global.postTitles.forEach(
      function log(item){
        let link = (`<a href="">${item}</a>`);
        document.querySelector(".titles").innerHTML += link;
      }
    );
  };
  
  populatePostTitles();
  // // select the last post and display it 
  // if (global.postTitles.length !== 0){
  //   global.display = global.postTitles[(global.postTitles["length"]-1)];
  //    addDisplay(global.display);
  // };

  // const outPost = localStorage.getItem(global.display);

  // //.. convert the Storage data back from a string
  // let outTemp = JSON.parse(outPost);

  // if (outPost && outTemp.title !== "" && outTemp.writeup !== "") {

  //   global.outTitle.innerText = outTemp.title;
  //   global.outWriteup.innerText = outTemp.writeup;
  //   global.outAuthor.innerText = "- " + outTemp.author;
  //   global.editButn.style.display = "block";
  // };

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

  if(global.postTitles.length >= 5){
    devptDisplay("> 5");
    for(let i=1; i<6; i++){
      document.querySelector(".display").innerHTML += addDisplay(global.postTitles[(global.postTitles["length"]-i)]);
    };};
    
  if(global.postTitles.length < 5){
    devptDisplay("> 5");
    for(let i=1; i<(global.postTitles["length"]+1); i++){
      devptDisplay(i);
      document.querySelector(".display").innerHTML += addDisplay(global.postTitles[(global.postTitles["length"]-i)]);
    };};
  // }else{
  //   devptDisplay("< 5" + global.postTitles["length"]);
    // for(let i=1; i<global.postTitles["length"]; i++){
    //   document.querySelector(".display").innerHTML += addDisplay(global.postTitles[(global.postTitles["length"]-i)]);
    // };
  // };
  /*
  * * * * * * * * * * * * * * * * * * *
  * * *  Buttons actions section  * * *
  * * * * * * * * * * * * * * * * * * * 
  */
  global.addBtn.addEventListener("click", function(d){
    document.querySelector(".input").style.display="block";
  });

  global.clsBtn.addEventListener("click", function(d){
    document.querySelector(".input").style.display="none";
  });

  global.postBtn.addEventListener("click", function(d){
    
    const postCont = d.currentTarget.parentNode;
    const post = {
      title:postCont.querySelector("#post_title").value,
      writeup:postCont.querySelector("#post_writeup").value,
      author:postCont.querySelector("#post_author").value,
      timeStamp: new Date,
    };

    // Add post title to titles list
    global.postTitles.push(post.title);

    // store the post data as a string in browser memory
    localStorage.setItem(post.title, JSON.stringify(post));
    localStorage.setItem("practiBlogTitles", JSON.stringify(global.postTitles));
  });
});