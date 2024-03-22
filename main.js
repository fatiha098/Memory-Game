let beginner = document.querySelector("#level1");
let intermediate = document.querySelector("#level2");
let advanced = document.querySelector("#level3");

beginner.addEventListener("click", function(){
  // Open a new page
  window.open("beginner.html", "_self");
})

intermediate.addEventListener("click", function(){
  // Open a new page
  window.open("intermediate.html", "_self");
})

advanced.addEventListener("click", function(){
  // Open a new page
  window.open("advanced.html", "_self");
})

