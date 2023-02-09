


$(document).ready(function () {
    //what kind of interface we want at the start
    var addCart = document.getElementsByClassName('wish')
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addwishlist);
    }

      function addwishlist(event){
        const APIKEY = "63e4d268478852088da67f27";
        var button = event.target;
        var shopProducts = button.parentElement;
        var hi=shopProducts.parentElement;
        console.log(hi);
        var title = hi.getElementsByClassName("product-title")[0].innerText;
        var price = hi.getElementsByClassName("price")[0].innerText;//
        var productImg = hi.getElementsByClassName("product-img")[0].src;//
        console.log(title,price,productImg);
        var userid;
        if(sessionStorage.getItem("id")!=null){
            userid=sessionStorage.getItem("id")
        }else{
            userid=localStorage.getItem("id")
        }
        let jsondata = {
          "img": productImg,
          "desc": title,
          "price": price,
          "userid": userid
        };
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://interactivedev-e0f0.restdb.io/rest/wish",
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
          });
    }
    function getContacts(limit = 10, all = true) {

      //[STEP 7]: Create our AJAX settings
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://interactivedev-e0f0.restdb.io/rest/wish",
        "method": "GET", //[cher] we will use GET to retrieve info
        "headers": {
          "content-type": "application/json",
          "x-apikey": "63e4d268478852088da67f27",
          "cache-control": "no-cache"
        },
      }
      
      //[STEP 8]: Make our AJAX calls
      //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
      //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links 
      $.ajax(settings).done(function (response) {
        
        let content = "";
        let userid;
        if(sessionStorage.getItem("id")!=null){
            userid=sessionStorage.getItem("id")
        }else{
            userid=localStorage.getItem("id")
        }
        for (var i = 0; i < response.length && i < limit; i++) {
          if(response[i].userid==userid){
            
            var listing = document.getElementsByClassName('box');
            
            for (var n = 0; n <  listing.length; n++){
                var cartItems = listing[n].getElementsByClassName('product-title')
                /* console.log(response[i].desc) */
                
                
                if(cartItems[0].innerText==response[i].desc){
                  var y=listing[n].getElementsByClassName('wish')
                  var z=y[0].getElementsByClassName('bxs-heart')
                  console.log(z[0])
                  z[0].style.display = "block";
                   /* y.classList.add("hide");
                  z.classList.remove("hide");  */
                }
            }
          }
          
        }
      });
      
      
      }
      getContacts();
      
});







