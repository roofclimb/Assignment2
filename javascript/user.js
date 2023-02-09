if (sessionStorage.getItem("name")!=null){
    document.getElementById("username").innerHTML=sessionStorage.getItem("name");
    document.getElementById("logout").href="logout.html"; 
    document.getElementById("wishlist").href="wish.html"; 
}else if(localStorage.getItem("name")!=null){
    document.getElementById("username").innerHTML=localStorage.getItem("name");
    document.getElementById("logout").href="logout.html"; 
    document.getElementById("wishlist").href="wish.html"; 
}else{
    document.getElementById("username").innerHTML="Guest";
    document.getElementById("logout").href="login.html"; 
}


function wish(){
    console.log(sessionStorage.getItem("name"));
    if (sessionStorage.getItem("name")==null&&localStorage.getItem("name")==null){
        if (confirm("Please log in first. Redirecting to log in page")){
            setTimeout(document.location.href = 'login.html', 5000);
        }
    }
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