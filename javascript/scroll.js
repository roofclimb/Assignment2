let calcScrollValue=()=>{
    let scrollProgress=document.getElementById('progress');
    let progressValue=document.getElementById('progress-value');
    let pos=document.documentElement.scrollTop;
    let calcHeight=
    document.documentElement.scrollHeight-
    document.documentElement.clientHeight;
    let scrollValue=Math.round((pos*100)/calcHeight);
    if (pos>100){
        scrollProgress.style.display='grid';
    }
    else{
        scrollProgress.style.display='none';
    }
    scrollProgress.addEventListener('click',()=>{
        document.documentElement.scrollTop=0;

    });
    scrollProgress.style.background=`conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`
};



window.onscroll=calcScrollValue;
window.onload=calcScrollValue;


/* let user = document.querySelector('.user');
let register1 = document.querySelector('.user.register');

document.querySelector('#user-icon').onclick = () =>{
    user.classList.toggle('active');
    register1.classList.toggle('active');
}
document.querySelector('#register').onclick = () =>{
    user.classList.toggle('active');
    register1.classList.toggle('active');
} 
document.querySelector('#login').onclick = () =>{
    user.classList.toggle('active');
    register1.classList.toggle('active');
}

document.querySelector('#user-icon').onclick = () =>{
    user.classList.toggle('active');
} */

console.log(sessionStorage.getItem("name"))
/* if (sessionStorage.getItem("name")==null){
    document.getElementById("username").innerHTML="Guest";
    document.getElementById("logout").href="/login.html"; 
}
else{
    document.getElementById("username").innerHTML=sessionStorage.getItem("name");
    document.getElementById("logout").href="/logout.html"; 
} */


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

