const typingText = document.querySelector(".typing-text p")
const input = document.querySelector(".wrapper .input-field")
const time = document.querySelector(".time span b")
const mistakes = document.querySelector(".mistake span")
const wpm = document.querySelector(".wpm span")
const cpm = document.querySelector(".cpm span")
const btn = document.querySelector("button");

//set values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph = ["All our dreams can come true.", "if we have the courage to pursue them.","The future belongs to those who believe in the beauty of their dreams.","Dreams come true.","Dream as if you'll live forever,","Some men see things as they are and say why."];

const randomIndex = Math.floor(Math.random()*paragraph.length);
typingText.innerHTML="";
for(const char of paragraph[randomIndex]){
    console.log(char);
typingText.innerHTML+= `<span>${char}</span>`;
}
typingText.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown',()=> input.focus());
typingText.addEventListener("click",()=>{
    input.focus()})
}

// Handle inner input
function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft > 0){

        if(isTyping){
            timer = setInterval(initTime, 1000);
            isTyping=true;
        }
        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct")
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");

        }
        charIndex++;
        char[charIndex].classList.add('active');

        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }
    else{
        clearInterval(timer);
        input.valu='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText-timeLeft;
        let wpmVal = Math.round(((charindex-mistake)/5) /(maxTime-timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}
function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText=timeLeft;
    input.value="";
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}
input.addEventListener("input", initTyping)
btn.addEventListener('click',reset);
loadParagraph();