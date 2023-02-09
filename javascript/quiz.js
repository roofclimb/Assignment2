const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement=document.getElementById('question-container')
const questionElement=document.getElementById('question')
const answerButtonElement=document.getElementById('answer-buttons')
var score=0

let shuffledQuestions, currentQuestionIndex
let qnno=1;

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',()=>{
    currentQuestionIndex++
    qnno++
    setNextQuestion()
})

function startGame(){
    startButton.classList.add('hide')
    shuffledQuestions=questions.sort(()=>Math.random()-.5)
    currentQuestionIndex=0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex],currentQuestionIndex)
    console.log(qnno)
}

function showQuestion(question,currentQuestionIndex){
    questionElement.innerText=qnno+") "+question.question
    question.answers.forEach(answer => {
        const button=document.createElement('button')
        button.innerText=answer.text
        button.classList.add('btn1')
        if (answer.correct){
            button.dataset.correct = answer.correct 
        }
        button.addEventListener('click',selectAnswer)
        answerButtonElement.appendChild(button)
        
        
    });
    currentQuestionIndex=currentQuestionIndex
    console.log(currentQuestionIndex)
}

function resetState(){
    clearStatusClass(document.body)
    document.getElementById('text').innerHTML="Choose an option";
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton=e.target
    const correct=selectedButton.dataset.correct
    setStatusClass(document.body,correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    if(document.body.classList.contains('correct')){
        score+=1;
        document.getElementById('text').innerHTML=score+"/5";
    }else{
        document.getElementById('text').innerHTML=score+"/5";
    }

    if (shuffledQuestions.length>currentQuestionIndex+1){
        nextButton.classList.remove('hide')
    }
    else{
        //check if user has logged in
        if (sessionStorage.getItem("id")!=null){
            console.log(sessionStorage.getItem("id"));
            let currentloyalty=sessionStorage.getItem("loyalty")
            console.log("Original score: "+currentloyalty);
            console.log(score)
            console.log(currentloyalty)
            let loyalty = score+parseInt(currentloyalty)
            console.log("Total score: "+loyalty);
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
                console.log("Game score: "+score);
                console.log("Final score: "+loyalty);
                sessionStorage.removeItem("loyalty");
                sessionStorage.setItem("loyalty",loyalty);
                alert("Congratulations "+sessionStorage.getItem("name")+"\nLoyalty points credited: "+score+"\nUpdated Loyalty Points: "+loyalty)
                score=0
            });
          }else if(localStorage.getItem("id")!=null){
            console.log(localStorage.getItem("id"));
            let currentloyalty=localStorage.getItem("loyalty")
            console.log("Original score: "+currentloyalty);
            console.log(score)
            console.log(currentloyalty)
            let loyalty = score+parseInt(currentloyalty)
            console.log("Total score: "+loyalty);
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
                console.log("Game score: "+score);
                console.log("Final score: "+loyalty);
                localStorage.removeItem("loyalty");
                localStorage.setItem("loyalty",loyalty);
                alert("Congratulations "+localStorage.getItem("name")+"\nLoyalty points credited: "+score+"\nUpdated Loyalty Points: "+loyalty)
                score=0
            });
          }else{
            alert("Log in to earn points")
          }
        
        /* if (sessionStorage.getItem("id")!=null){
            console.log(sessionStorage.getItem("id"));
            let userscore=0;
            let id = sessionStorage.getItem("id");//use sessionstorage to retrieve login guest id
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://interactivedev-e51d.restdb.io/rest/ntuc/${id}`,
                "method": "GET",
                "headers": {
                "content-type": "application/json",
                "x-apikey": "63b648b9969f06502871aa3d",
                "cache-control": "no-cache"
                }
            }
            
            $.ajax(settings).done(function (response) {
                console.log("Original score: "+response.loyalty);
                userscore=response.loyalty;
                let loyalty = score+userscore;//add score to existing loyalty points of user
                console.log("Total score: "+loyalty);
                var jsondata = { "loyalty":loyalty};
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": `https://interactivedev-e51d.restdb.io/rest/ntuc/${id}`,//update based on the ID
                    "method": "PUT",
                    "headers": {
                    "content-type": "application/json",
                    "x-apikey": "63b648b9969f06502871aa3d",
                    "cache-control": "no-cache"
                    },
                    "processData": false,
                    "data": JSON.stringify(jsondata)
                }
                $.ajax(settings).done(function () {
                    console.log("Game score: "+score);
                    console.log("Final score: "+loyalty);
                    alert("Congratulations "+response.name+"\nLoyalty points credited: "+score+"\nUpdated Loyalty Points: "+loyalty)
                    score=0
                });
            });
        } */
        startButton.innerText='Restart'
        startButton.classList.remove('hide')
        
    }
    
}

function setStatusClass(element,correct){
    clearStatusClass(element)
    
    if (correct){
        element.classList.add('correct');
    }else{
        element.classList.add('wrong');
        
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
    
}

const questions=[
    {
        question: 'What does NTUC stand for?',
        answers:[
            {text:'National Trades Union Congress',correct:true},
            {text:'National Training Under Centre',correct:false},
            {text:'Nominated Transport Upside Central',correct:false},
            {text:'Navigation Time Under Control',correct:false},
        ]
    },
    {
        question: 'When did FairPrice merge with SEC?',
        answers:[
            {text:'May 1985',correct:false},
            {text:'March 1983',correct:false},
            {text:'May 1983',correct:true},
            {text:'March 1990',correct:false},
        ]
    },
    {
        question:'Which products cannot be found in our website?',
        answers:[
            {text:'Detergent',correct:false},
            {text: 'Durian',correct:false},
            {text: 'Carpet',correct:false},
            {text: 'Wine',correct:true}
        ]
    },
    {
        question:'How big is FairPrice largest branch?',
        answers:[
            {text:'10,000 meter square',correct:false},
            {text: '5,000 meter square',correct:false},
            {text: '7,180 meter square',correct:false},
            {text: '7,150 meter square',correct:true}
        ]
    },
    {
        question:'Where is the largest FairPrice branch?',
        answers:[
            {text:'Toa Payoh Hub',correct:false},
            {text: 'Vivocity',correct:false},
            {text: 'Orchard',correct:false},
            {text: 'Ang Mo Kio Hub',correct:true}
        ]
    }
]