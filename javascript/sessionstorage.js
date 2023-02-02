console.log(sessionStorage.getItem("name"))
if (sessionStorage.getItem("name")==null){
    document.getElementById("username").innerHTML="Guest";
    document.getElementById("logout").href="/login.html"; 
}
else{
    document.getElementById("username").innerHTML=sessionStorage.getItem("name");
    document.getElementById("logout").href="/logout.html"; 
}

