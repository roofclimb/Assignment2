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
    /* document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click',buyButtonClicked); */
}

function buyButtonClicked(){
    alert('Your Order is placed')
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
    document.getElementsByClassName('total-price')[0].innerText= "$" + total;
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-box');
    document.getElementById("cartno").innerHTML=cartItemsNames.length;
}