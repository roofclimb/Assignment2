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
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const d=new Date();
let day = d.getDate();
let m=month[d.getMonth()];
let year = d.getFullYear();
document.getElementById("demo").innerHTML=day+" "+m+" "+year;

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


