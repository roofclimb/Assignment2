let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
//close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

//cart working 35
if (document.readyState =="loading"){
    document.addEventListener("DOMContentLoaded",ready);
} else{
    ready();
}

//making function
function ready(){
    //Remove items from cart 
    var reomveCartButtons = document.getElementsByClassName('cart-remove');
    console.log(reomveCartButtons);
    for (var i = 0; i <  reomveCartButtons.length; i++){
        var button =  reomveCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    //quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add To Cart
    var addCart = document.getElementsByClassName('addcart')
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    document
        .getElementsByClassName('btn-checkout')[0]
        .addEventListener('click',buyButtonClicked);
}

function buyButtonClicked(){
    alert('Your Order is placed')
    modal.style.display = "none";
    var cartContent=document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}


//Remove Items from cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
//Quantity Changes 
function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value)|| input.value <= 0) {
        input.value = 1
    }
    updatetotal();
}
//Add To cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var hi=shopProducts.parentElement;
    console.log(hi);
    var title = hi.getElementsByClassName("product-title")[0].innerText;
    var price = hi.getElementsByClassName("price")[0].innerText;//
    var productImg = hi.getElementsByClassName("product-img")[0].src;//
    console.log(title,price,productImg);
    addProductToCart(title,price,productImg);
    updatetotal();
}
function addProductToCart(title,price,productImg){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemsNames = cartItems.getElementsByClassName('cart-box')
    var cartItemsdetails = cartItems.getElementsByClassName('detail-box')
    console.log(cartItemsdetails[0]);
    console.log(document.getElementById("cartno"));
    
    //cart-product-title
    /* console.log(cartItemsNames[0].getElementsByClassName('cart-product-title')[0].innerText); */
    for (var i = 0; i < cartItemsNames.length; i++){
        console.log(cartItemsdetails[i].getElementsByClassName('cart-product-title')[0].innerText);
        console.log(title);
        if(cartItemsdetails[i].getElementsByClassName('cart-product-title')[0].innerText == title){
            alert("You have already added this item to cart");
            return;
        }
    }
    var cartBoxContent =`<img src="${productImg}" alt="" height="200"  class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- Remove Cart -->
    <i class='bx bxs-trash-alt cart-remove'></i>`;
    cartShopBox.innerHTML=cartBoxContent;
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener ('click',removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener ('change',quantityChanged); 
    /* document.getElementById("cartno").innerHTML=cartItemsNames.length; */
} 



/* var cartBoxContent =`<img src="images/snacks/haribo.png" alt="haribo" height="200"  class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">Haribo</div>
                        <div class="cart-price">$2.85</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>
                    <!-- Remove Cart -->
                    <i class='bx bxs-trash-alt cart-remove'></i>`;
cartShopBox.innerHTML=cartBoxContent
cartItem.append(cartShopBox)
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener ('click',removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener ('change',quantityChanged);
 */

//update Total 
function updatetotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total =0;
    //console.log(cartBoxes.length);
    for (var i = 0; i < cartBoxes.length; i++){
        console.log(cartBoxes.length);
        var cartBox = cartBoxes [i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        // If price Contain some cents value
        total =Math.round(total * 100)/100;
    }
    document.getElementsByClassName('total-price')[0].innerText= "$" + total.toFixed(2);
    document.getElementById("subtotal").innerHTML="$" +total.toFixed(2);
    var deliverycharge=0;
    if(total<=50){
        deliverycharge=5;
    }
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    document.getElementById("deliverycharge").innerHTML="$"+deliverycharge;
    slider.oninput = function() {
        var userpoints=this.value;
        output.innerHTML = userpoints;
        final=total+deliverycharge-Number(userpoints);
        final=Math.round(final * 100)/100;
        document.getElementById("total").innerHTML="$" +final.toFixed(2);
    }
    var final=total+deliverycharge-Number(slider.value);
    /* final=Math.round(final * 100)/100; */
    
    var maxpoints=sessionStorage.getItem("loyalty")
    if(maxpoints>=final){
        maxpoints=Math.floor(final);
    }
    document.getElementById("myRange").setAttribute("max", maxpoints);
    
    document.getElementById("total").innerHTML="$" +final.toFixed(2);
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-box');
    document.getElementById("cartno").innerHTML="("+cartItemsNames.length+")";
    var x=document.getElementsByName("payment");
    var y=document.getElementsByClassName("btn-checkout");
    console.log(y[0]);
    y[0].addEventListener('click', myFunction);
    function myFunction(){
        console.log('hi')
    for(var i = 0; i < x.length; i++){
        if(x[i].checked)
        {
        console.log(x[i].value);
        }
    }
    console.log(slider.value);
    let name=document.forms["myForm"]["fname"].value;
    let email=document.forms["myForm"]["email"].value;
    let address=document.forms["myForm"]["adr"].value;
    let delivery=document.forms["myForm"]["delivery"].value;
     if (sessionStorage.getItem("id")!=null){
            let currentloyalty=sessionStorage.getItem("loyalty")
            let loyalty = parseInt(currentloyalty)-slider.value
            var jsondata = { "loyalty":loyalty};
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://interactivedev-a655.restdb.io/rest/ntuc/${sessionStorage.getItem("id")}`,//update based on the ID
                "method": "PUT",
                "headers": {
                "content-type": "application/json",
                "x-apikey": "63b648ae969f06502871aa3b",
                "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(jsondata)
            }
            $.ajax(settings).done(function () {
                sessionStorage.removeItem("loyalty");
                sessionStorage.setItem("loyalty",loyalty);
                alert("Thank you "+name+" for you purchase\nYour receipt has been sent to "+
                email+"\nYour purchase will be sent to "+address+" on "+delivery+"\nLoyalty points used"+slider.value+
                "\nTotal cost: "+final)
            });
  }/* else if(localStorage.getItem("id")!=null){
    let currentloyalty=localStorage.getItem("loyalty")
    let loyalty = parseInt(currentloyalty)-slider.value
    var jsondata = { "loyalty":loyalty};
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://interactivedev-a655.restdb.io/rest/ntuc/${localStorage.getItem("id")}`,//update based on the ID
        "method": "PUT",
        "headers": {
        "content-type": "application/json",
        "x-apikey": "63b648ae969f06502871aa3b",
        "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    }
    $.ajax(settings).done(function () {
      localStorage.removeItem("loyalty");
      localStorage.setItem("loyalty",loyalty);
      alert("Thank you "+name+" for you purchase\nYour receipt has been sent to "+
      email+"\nYour purchase will be sent to "+address+" on "+delivery+"\nLoyalty points used"+slider.value)
    })
  }else{
    alert("Thank you "+name+" for you purchase\nYour receipt has been sent to "+
      email+"\nYour purchase will be sent to "+address+" on "+delivery)
  } */
}
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


 


Date.prototype.addDays = function(days) {
var date = new Date(this.valueOf());
date.setDate(date.getDate() + days);
return date;
}
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var today = new Date();
var delivery = today.addDays(3);
var day = delivery.getDate();
var mmmm = delivery.getMonth() + 1; //January is 0!
var year = delivery.getFullYear();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
let m=month[today.getMonth()];

if (day < 10) {
  day = '0' + day;
}

if (mmmm < 10) {
  mmmm = '0' + mmmm;
} 
    
today = yyyy + '-' + mmmm + '-' + day;
console.log(today);
document.getElementById("delivery").setAttribute("min", today);
document.getElementById("delivery").setAttribute("value", today);
document.getElementById("today").innerHTML="3 days from today ("+dd+" "+m+" "+yyyy+")";




if (sessionStorage.getItem("name")!=null){
    let contactName = sessionStorage.getItem("name");
    let contactEmail = sessionStorage.getItem("email");
    $("#fname").val(contactName);
      $("#email").val(contactEmail);
}else if(localStorage.getItem("name")!=null){
    console.log(localStorage.getItem("name"));
    let contactName = localStorage.getItem("name");
    let contactEmail = localStorage.getItem("email");
    $("#fname").val(contactName);
    $("#email").val(contactEmail);
}
else{
    document.getElementById('slide').classList.add('hide');
    document.getElementById('pointscount').classList.add('hide');
}