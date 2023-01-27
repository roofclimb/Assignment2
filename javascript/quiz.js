const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement=document.getElementById('question-container')
const questionElement=document.getElementById('question')
const answerButtonElement=document.getElementById('answer-buttons')
var score=0

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',()=>{
    currentQuestionIndex++
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
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText=question.question
    question.answers.forEach(answer => {
        const button=document.createElement('button')
        button.innerText=answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct 
        }
        button.addEventListener('click',selectAnswer)
        answerButtonElement.appendChild(button)
    });
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
    if (shuffledQuestions.length>currentQuestionIndex+1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText='Restart'
        startButton.classList.remove('hide')
        score=0
    }
    
}

function setStatusClass(element,correct){
    clearStatusClass(element)
    
    if (correct){
        element.classList.add('correct');
    }else{
        element.classList.add('wrong');
        
    }

    if(document.body.classList.contains('correct')){
        score+=1;
        document.getElementById('text').innerHTML=score+"/25";
    }else{
        document.getElementById('text').innerHTML=score+"/25";
    }

}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
    
}

const questions=[
    {
        question:'Which singer is from Singapore?',
        answers:[
            {text:'JJ Lin',correct:true},
            {text:'Jay Chou',correct:false},
            {text:'Eric Chou',correct:false},
            {text:'Mayday',correct:false},
        ]
    },
    {
        question:'Which celebrity is not from Singapore?',
        answers:[
            {text:'Rebecca Lim',correct:false},
            {text:'Zoe Tay',correct:false},
            {text:'Liu Ling Ling',correct:false},
            {text:'Donnie Yen',correct:true},
        ]
    },
    {
        question:'Which show was not produced in Singapore?',
        answers:[
            {text:'A Quest to Heal',correct:false},
            {text: 'With Love, Becks',correct:false},
            {text: 'Healing Heros',correct:false},
            {text: 'Ip Man',correct:true}
        ]
    },
    {
        question:'Which director is from Singapore?',
        answers:[
            {text:'Steven Spielberg',correct:false},
            {text: 'John Ford',correct:false},
            {text: 'Chen Kaige',correct:false},
            {text: 'Jack Neo',correct:true}
        ]
    },
    {
        question:'Which movie was not produced in Singapore?',
        answers:[
            {text:'Ah Boys to Men',correct:false},
            {text: 'Long long time ago',correct:false},
            {text: 'Ilo ilo',correct:false},
            {text: 'Crazy Rich Asians',correct:true}
        ]
    }
]