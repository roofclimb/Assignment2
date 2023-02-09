/* function addProductToCart(title,price,productImg){
  var cartShopBox = document.createElement('div')
  cartShopBox.classList.add('cart-box')
  var cartItems = document.getElementsByClassName('cart-content')[0]
  var cartItemsNames = cartItems.getElementsByClassName('cart-box')
  var cartItemsdetails = cartItems.getElementsByClassName('detail-box')
  console.log(cartItemsdetails[0]);
  console.log(document.getElementById("cartno"));
  
  //cart-product-title
  for (var i = 0; i < cartItemsNames.length; i++){
      console.log(cartItemsdetails[i].getElementsByClassName('cart-product-title')[0].innerText);
      console.log(title);
      if(cartItemsdetails[i].getElementsByClassName('cart-product-title')[0].innerText == title){
          alert("You have already added this item to cart");
          return;
      }
  }
  var cartBoxContent =`<div class="box">
  <img src="images/snacks/haribo.png" class ="product-img"alt="" height="300">
  <span>Snacks</span>
      <h2 class="product-title">Haribo Gummy Candies</h2>
      <p>160g Halal</p>
      <b class="price">$2.95</b>
      <div class="stars">
        <i class='bx bxs-star' ></i>
        <i class='bx bxs-star' ></i>
        <i class='bx bxs-star' ></i>
        <i class='bx bxs-star' ></i>
        <i class='bx bxs-star-half' ></i>
    </div>
      <div class="addcart">
          <i class='bx bx-cart-alt' ></i>
      </div>
      <i class='bx bx-heart' ></i>
      <span class="discount">-25%</span>
  </div>`;
  cartShopBox.innerHTML=cartBoxContent;
  cartItems.append(cartShopBox)
  cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener ('click',removeCartItem);
  cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener ('change',quantityChanged); 
} 
 */
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
    if(response[i].userid==sessionStorage.getItem("id")){
      content = `${content}<div class="box">
  <img src=${response[i].img} class ="product-img"alt="" height="300">
      <h2 class="product-title">${response[i].desc}</h2>
      <b class="price">${response[i].price}</b>
      <div class="delete">
        <i class='bx bxs-trash' data-id='${response[i]._id}' data-desc='${response[i].desc}' ></i>
      </div>
      <span class="discount">-25%</span>
  </div>`;
    }
    
    console.log(response[i]._id)
  }

  //[STEP 9]: Update our HTML content
  //let's dump the content into our table body
  $(".products-container").html(content);
  var deletebutton = document.getElementsByClassName('delete');
  console.log(deletebutton[0]);
  for (var i = 0; i <  deletebutton.length; i++){
      var button =  deletebutton[i];
      button.addEventListener('click', deleteitem);
  }
  function deleteitem(event) {
    var buttonClicked = event.target;
    console.log($(buttonClicked).data("id"))
    let contactId = $(buttonClicked).data("id");
  
    deleteRecord(contactId)
  
  };
  
  function deleteRecord(id) {
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://interactivedev-e0f0.restdb.io/rest/wish/${id}`,
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "x-apikey": "63e4d268478852088da67f27",
        "cache-control": "no-cache"
      },
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
      getContacts();
    });
  }
});


}

getContacts();





