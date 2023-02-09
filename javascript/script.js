//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
    //what kind of interface we want at the start 
    const APIKEY = "63b648b9969f06502871aa3d";
    getContacts();
    $("#update-contact-container").hide();
    $("#add-update-msg").hide();
  
    //[STEP 1]: Create our submit form listener
    $("#contact-submit").on("click", function (e) {
      //prevent default action of the button 
      e.preventDefault();
  
      //[STEP 2]: let's retrieve form data
      //for now we assume all information is valid
      //you are to do your own data validation
      let contactName = $("#contact-name").val();
      let contactEmail = $("#contact-email").val();
      let contactPassword = $("#contact-password").val();
      let confirmPassword = $("#confirm-password").val();
      let loyalty=0;
      console.log(contactEmail.search("@"))
      if(contactName==""||contactEmail==""||contactPassword==""){
        document.getElementById('nomatch').innerHTML="Please fill up all fields";
      }
      else if(contactEmail.search("@")==-1){
        document.getElementById('nomatch').innerHTML="Email must contain @";
      }
      else if (contactEmail.search(".com")==-1){
        document.getElementById('nomatch').innerHTML="Email must contain .com";
      }
      else{
        if(contactPassword==confirmPassword){
          let jsondata = {
              "name": contactName,
              "email": contactEmail,
              "password": contactPassword,
              "loyalty": loyalty
            };
        
            //[STEP 4]: Create our AJAX settings. Take note of API key
            let settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://interactivedev-e51d.restdb.io/rest/ntuc",
              "method": "POST", //[cher] we will use post to send info
              "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
              },
              "processData": false,
              "data": JSON.stringify(jsondata),
              "beforeSend": function(){
                //@TODO use loading bar instead
                //disable our button or show loading bar
                $("#contact-submit").prop( "disabled", true);
                //clear our form using the form id and triggering it's reset feature
                $("#add-contact-form").trigger("reset");
              }
              
  
          }
          
        //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
          $.ajax(settings).done(function (response) {
              console.log(response);
              
              $("#contact-submit").prop( "disabled", false);
              
              //@TODO update frontend UI 
              $("#add-update-msg").show().fadeOut(3000);
      
              //update our table 
              getContacts();
          });
          
          document.getElementById('nomatch').innerHTML="Registration successful\nProceed to log in";
          let hide=document.getElementById('registerlottie');
          hide.classList.remove('hide');
        //[STEP 3]: get form values when user clicks on send
        //Adapted from restdb api
        
        }
        else{
          console.log("Password");
          console.log(document.getElementById('nomatch'));
          document.getElementById('nomatch').innerHTML="Passwords do not match";
      }
      }

  
    });//end click 
  
  
    //[STEP] 6
    //let's create a function to allow you to retrieve all the information in your contacts
    //by default we only retrieve 10 results
    function getContacts(limit = 10, all = true) {
  
      //[STEP 7]: Create our AJAX settings
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://interactivedev-e51d.restdb.io/rest/ntuc",
        "method": "GET", //[cher] we will use GET to retrieve info
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
      }
  
      //[STEP 8]: Make our AJAX calls
      //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
      //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links 
      $.ajax(settings).done(function (response) {
        
        let content = "";
  
        for (var i = 0; i < response.length && i < limit; i++) {
          //console.log(response[i]);
          //[METHOD 1]
          //let's run our loop and slowly append content
          //we can use the normal string append += method
          /*
          content += "<tr><td>" + response[i].name + "</td>" +
            "<td>" + response[i].email + "</td>" +
            "<td>" + response[i].message + "</td>
            "<td>Del</td><td>Update</td</tr>";
          */
  
          //[METHOD 2]
          //using our template literal method using backticks
          //take note that we can't use += for template literal strings
          //we use ${content} because -> content += content 
          //we want to add on previous content at the same time
          content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
          <td>${response[i].email}</td>
          <td>${response[i].password}</td>
          <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td>
          <a href='#update-contact-container' class='update' data-id='${response[i]._id}' data-password='${response[i].password}' data-name='${response[i].name}' data-email='${response[i].email}' data-loyalty='${response[i].loyalty}'>Update</a></td></tr>`;
          console.log(response[i]._id)
        }
  
        //[STEP 9]: Update our HTML content
        //let's dump the content into our table body
        $("#contact-list tbody").html(content);
  
        $("#total-contacts").html(response.length);
      });
  
  
    }
  
    //[STEP 10]: Create our update listener
    //here we tap onto our previous table when we click on update
    //this is a delegation feature of jquery
    //because our content is dynamic in nature, we listen in on the main container which is "#contact-list". For each row we have a class .update to help us
    /* $("#contact-list").on("click", ".update", function (e) {
      e.preventDefault();
      let contactName = $(this).data("name");
      let contactEmail = $(this).data("email");
      let contactPassword = $(this).data("password");
      let contactId = $(this).data("id");
      console.log($(this).data("password"));
      $("#update-contact-name").val(contactName);
      $("#update-contact-email").val(contactEmail);
      $("#update-contact-password").val(contactPassword);
      $("#update-contact-id").val(contactId);
      $("#update-contact-container").show();
      console.log(contactId);
    }); */
  /* 
    $("#update-contact-submit").on("click", function (e) {
      e.preventDefault();
      let loyalty = loyalty+5;
      let contactId = "63d6759aaa86075000023450";
      
      updateForm(contactId, loyalty);
    });
    
    $("#contact-list").on("click", ".delete", function (e) {
      e.preventDefault();
      let contactId = $(this).data("id");
      console.log($(this).data("msg"));
  
      deleteRecord(contactId)
  
    }); */

    //[STEP 13]: function that makes an AJAX call and process it 
    //UPDATE Based on the ID chosen
    function updateForm(id, loyalty) {
      //@TODO create validation methods for id etc. 
      console.log(id);
      var jsondata = { "loyalty":loyalty};
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://interactivedev-e51d.restdb.io/rest/ntuc/${id}`,//update based on the ID
        "method": "PUT",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
      }
  
      //[STEP 13a]: send our AJAX request and hide the update contact form
      $.ajax(settings).done(function (response) {
        console.log(response);
        
        $("#update-contact-container").fadeOut(5000);
        //update our contacts table
        getContacts();
      });
    }//end updateform function

    $("#contact-list").on("click", ".delete",function (e) {
      e.preventDefault();
      console.log("delete")
      let contactId = $(this).data("id");
      $("#delete-student-msg").show().fadeOut(3000);
      $("#delete-contact-container").fadeOut(5000);
    });//end updatecontactform listener
  
    //[STEP 13]: function that makes an AJAX call and process it 
    //UPDATE Based on the ID chosen
    function deleteRecord(id) {
      var settings = {
        async: true,
        crossDomain: true,
        url: `https://interactivedev-e51d.restdb.io/rest/ntuc/${id}`,
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        getContacts();
      });
    }//end updateform function
  
    
    function myFunction() {
      let text;
      let admin = prompt("Please enter admin password:");
      if(admin=="password"){
        setTimeout(document.location.href = 'admin.html', 0);
      }else{
        text="No unauthorized access"
      }
      document.getElementById('wrong').innerHTML=text;
    }

   $("#login-submit").on("click", function (e)  {
    let hide=document.getElementById('loginlottie');
    hide.classList.remove('hide');
    e.preventDefault();
    const checkbox=document.getElementById("check")
    console.log(checkbox.checked)
    let loginEmail = $("#check-email").val();
    let loginPassword = $("#check-password").val();
    

    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://interactivedev-e51d.restdb.io/rest/ntuc",
        "method": "GET", //[cher] we will use GET to retrieve info
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
      }
  
      //[STEP 8]: Make our AJAX calls
      //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
      //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links 
      $.ajax(settings).done(function (response) {
        
        let content = "";
        const limit=10;
        for (var i = 0; i < response.length && i < limit; i++) {
            console.log(response[i].email);
            if (loginEmail==response[i].email){
                let correctPassword = response[i].password;
                console.log('correct email');
                if (loginPassword==correctPassword){
                    document.getElementById('wrong').innerHTML="Log In successful.";
                    
                    if(checkbox.checked){//remember me
                      localStorage.setItem("name",response[i].name);
                      localStorage.setItem("id",response[i]._id);
                      localStorage.setItem("loyalty",response[i].loyalty);
                      localStorage.setItem("email",response[i].email);
                    }else{
                      sessionStorage.setItem("name",response[i].name);
                      sessionStorage.setItem("id",response[i]._id);
                      sessionStorage.setItem("loyalty",response[i].loyalty);
                      sessionStorage.setItem("email",response[i].email);
                    }
                    
                    if (confirm("Welcome "+response[i].name+". \nYou have "+response[i].loyalty+" points. \nHappy shopping.\nRedirecting to home page.")){
                        setTimeout(document.location.href = 'index.html', 5000);
                    }
                    break;
                }
                else{
                    console.log(correctPassword);
                    hide.classList.add('hide');
                    document.getElementById('wrong').innerHTML="Wrong password entered.";
                    break;
                }
            }
            else if(loginEmail=="admin"){
              if (loginPassword=="password"){
                hide.classList.add('hide');
                myFunction();
                break;
              }
              else{
                hide.classList.add('hide');
                document.getElementById('wrong').innerHTML="Wrong password entered.";
              }
            }
            else{
                hide.classList.add('hide');
                document.getElementById('wrong').innerHTML="Account does not exist";
            }
        }
        
  
      });

  
/* 
    //update our update form values
    let contactName = $(this).data("name");
    let contactEmail = $(this).data("email");
    let contactPassword = $(this).data("password");
    let contactId = $(this).data("id");
    console.log($(this).data("password"));

    //[STEP 11]: Load in our data from the selected row and add it to our update contact form 
    $("#update-contact-name").val(contactName);
    $("#update-contact-email").val(contactEmail);
    $("#update-contact-password").val(contactPassword);
    $("#update-contact-id").val(contactId);
    $("#update-contact-container").show();
    console.log(contactId);
  });//end contact-list listener for update function

  //[STEP 12]: Here we load in our contact form data
  //Update form listener
  $("#update-contact-submit").on("click", function (e) {
    e.preventDefault();
    //retrieve all my update form values
    let contactName = $("#update-contact-name").val();
    let contactEmail = $("#update-contact-email").val();
    let contactPassword = $("#update-contact-msg").val();
    let contactId = $("#update-contact-id").val();

    console.log($("#update-contact-msg").val());
    console.log(contactMsg);

    //[STEP 12a]: We call our update form function which makes an AJAX call to our RESTDB to update the selected information
    updateForm(contactId, contactName, contactEmail, contactPassword); */
  });
})



var LoginForm = document.getElementById("LoginForm")
var RegForm = document.getElementById("RegForm")
var Indicator=document.getElementById("Indicator")

function register(){
    RegForm.style.transform="translateX(0px)";
    LoginForm.style.transform="translateX(0px)";
    Indicator.style.transform="translateX(100px)";
}


function login(){
    RegForm.style.transform="translateX(300px)";
    LoginForm.style.transform="translateX(300px)";
    Indicator.style.transform="translateX(0px)";
}

if (sessionStorage.getItem("name")!=null){
  document.getElementById("data").innerHTML="Name: "+sessionStorage.getItem("name");
  document.getElementById("points").innerHTML="Loyalty points: "+sessionStorage.getItem("loyalty");
}else if(localStorage.getItem("name")!=null){
  console.log(localStorage.getItem("name"));
  document.getElementById("data").innerHTML="Name: "+localStorage.getItem("name");
  document.getElementById("points").innerHTML="Loyalty points: "+localStorage.getItem("loyalty");
}


function logout(){
  if (sessionStorage.getItem("name")!=null){
    if (confirm("Thank you "+sessionStorage.getItem("name")+" You have successfully logged out.")){
      setTimeout(document.location.href = '/index.html', 5000);
      sessionStorage.clear();
    }
  }else if(localStorage.getItem("name")!=null){
    if (confirm("Thank you "+localStorage.getItem("name")+" You have successfully logged out.")){
      setTimeout(document.location.href = '/index.html', 5000);
      localStorage.clear();
    }
  }
  
  
}


function myFunction(){
  var x=document.getElementById("check-password");
  var y=document.getElementById("hide1");
  var z=document.getElementById("hide2");
  if(x.type=='password'){
      x.type="text";
      y.classList.add("hide");
      z.classList.remove("hide");
  }
  else{
      x.type="password";
      y.classList.remove("hide");
      z.classList.add("hide");
  }
}

function myFunction1(){
  var x=document.getElementById("contact-password");
  var y=document.getElementById("hide3");
  var z=document.getElementById("hide4");
  if(x.type=='password'){
      x.type="text";
      y.classList.add("hide");
      z.classList.remove("hide");
  }
  else{
      x.type="password";
      y.classList.remove("hide");
      z.classList.add("hide");
  }
}

function myFunction2(){
  var x=document.getElementById("confirm-password");
  var y=document.getElementById("hide5");
  var z=document.getElementById("hide6");
  if(x.type=='password'){
      x.type="text";
      y.classList.add("hide");
      z.classList.remove("hide");
  }
  else{
      x.type="password";
      y.classList.remove("hide");
      z.classList.add("hide");
  }
}