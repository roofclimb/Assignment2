function getContacts(limit = 10, all = true) {
  
    //[STEP 7]: Create our AJAX settings
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://interactivedev-5050.restdb.io/rest/ntuc",
      "method": "GET", //[cher] we will use GET to retrieve info
      "headers": {
        "content-type": "application/json",
        "x-apikey": "63e5e23c478852088da67fd7",
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

getContacts();


$("#contact-list").on("click", ".update", function (e) {
    e.preventDefault();
    //update our update form values
    let contactName = $(this).data("name");
    let contactEmail = $(this).data("email");
    let contactMsg = $(this).data("password");
    let contactId = $(this).data("id");
    let loyalty = $(this).data("loyalty");
    console.log($(this).data("password"));

    //[STEP 11]: Load in our data from the selected row and add it to our update contact form 
    $("#update-contact-name").val(contactName);
    $("#update-contact-email").val(contactEmail);
    $("#update-contact-password").val(contactMsg);
    $("#update-contact-id").val(contactId);
    $("#update-loyalty").val(loyalty);
    $("#update-contact-container").show();
    console.log(contactId);
  });//end contact-list listener for update function


$("#update-contact-submit").on("click", function (e) {
    e.preventDefault();
    //retrieve all my update form values
    let contactName = $("#update-contact-name").val();
    let contactEmail = $("#update-contact-email").val();
    let contactMsg = $("#update-contact-password").val();
    let contactId = $("#update-contact-id").val();
    let loyalty = $("#update-loyalty").val();
    console.log($("#update-contact-password").val());
    console.log(contactMsg);

    //[STEP 12a]: We call our update form function which makes an AJAX call to our RESTDB to update the selected information
    updateForm(contactId, contactName, contactEmail, contactMsg,loyalty);
  });//end updatecontactform listener
  $("#contact-list").on("click", ".delete", function (e) {
    e.preventDefault();
    let contactId = $(this).data("id");
    console.log($(this).data("msg"));

    deleteRecord(contactId)

  });
  

  //[STEP 13]: function that makes an AJAX call and process it 
  //UPDATE Based on the ID chosen
  function updateForm(id, contactName, contactEmail, contactMsg,loyalty) {
    //@TODO create validation methods for id etc. 
    console.log(id);
    var jsondata = { "name": contactName, "email": contactEmail, "password": contactMsg ,"loyalty":loyalty};
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://interactivedev-5050.restdb.io/rest/ntuc/${id}`,//update based on the ID
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "x-apikey": "63e5e23c478852088da67fd7",
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
    let id = $(this).data("id");
    $("#delete-student-msg").show().fadeOut(3000);
    $("#delete-contact-container").fadeOut(5000);
  });//end updatecontactform listener

  //[STEP 13]: function that makes an AJAX call and process it 
  //UPDATE Based on the ID chosen
  function deleteRecord(id) {
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://interactivedev-5050.restdb.io/rest/ntuc/${id}`,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-apikey": "63e5e23c478852088da67fd7",
        "cache-control": "no-cache"
      },
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      getContacts();
    });
  }//end updateform function