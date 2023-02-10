const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            if (sessionStorage.getItem("id")!=null){
                let currentloyalty=sessionStorage.getItem("loyalty")
                let loyalty = 3+parseInt(currentloyalty)
                var jsondata = { "loyalty":loyalty};
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": `https://interactivedev-5050.restdb.io/rest/ntuc/${sessionStorage.getItem("id")}`,//update based on the ID
                    "method": "PUT",
                    "headers": {
                    "content-type": "application/json",
                    "x-apikey": "63e5e23c478852088da67fd7",
                    "cache-control": "no-cache"
                    },
                    "processData": false,
                    "data": JSON.stringify(jsondata)
                }
                $.ajax(settings).done(function () {
                    sessionStorage.removeItem("loyalty");
                    sessionStorage.setItem("loyalty",loyalty);
                    alert("Congratulations "+sessionStorage.getItem("name")+"\nLoyalty points credited: 3"+"\nUpdated Loyalty Points: "+loyalty)
                });
              }else if(localStorage.getItem("id")!=null){
                let currentloyalty=localStorage.getItem("loyalty")
                let loyalty = 3+parseInt(currentloyalty)
                var jsondata = { "loyalty":loyalty};
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": `https://interactivedev-5050.restdb.io/rest/ntuc/${localStorage.getItem("id")}`,//update based on the ID
                    "method": "PUT",
                    "headers": {
                    "content-type": "application/json",
                    "x-apikey": "63e5e23c478852088da67fd7",
                    "cache-control": "no-cache"
                    },
                    "processData": false,
                    "data": JSON.stringify(jsondata)
                }
                $.ajax(settings).done(function () {
                  localStorage.removeItem("loyalty");
                  localStorage.setItem("loyalty",loyalty);
                  alert("Congratulations "+localStorage.getItem("name")+"\nLoyalty points credited: 3"+"\nUpdated Loyalty Points: "+loyalty)
                });
              }else{
                alert("Log in to earn points")
              }
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});