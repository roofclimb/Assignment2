if (sessionStorage.getItem("name")!=null){
    document.getElementById("username").innerHTML=sessionStorage.getItem("name");
    document.getElementById("logout").href="logout.html"; 
}else if(localStorage.getItem("name")!=null){
    document.getElementById("username").innerHTML=localStorage.getItem("name");
    document.getElementById("logout").href="logout.html"; 
}else{
    document.getElementById("username").innerHTML="Guest";
    document.getElementById("logout").href="login.html"; 
}

let menu=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');


menu.onclick=()=>{
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}


window.onscroll=()=>{
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
}