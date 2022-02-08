// we have three screeen
// first screen is the start screen 
// second screen is the choose caracter screen
// finally the gameboard screen
// get all the three screens
const screens=document.querySelectorAll(".screen");
// select all the choose btns
const choose_btns=document.querySelectorAll(".choose-player-btn");
// get the start btn by id
const start_btn=document.getElementById("start-btn")
// get the game board
const game_container=document.querySelector(".game-container")
// get the time hby id in order to update the time
const time=document.getElementById("time")
// get the score h3 in order to update the score
const score_=document.getElementById("score")
// initial the variables
let score=0
let seconds =0
let selected_victim={};

// when the user click the start btn we move the start to the top (margin -100vh)
start_btn.addEventListener("click",()=>screens[0].classList.add("up"))
//now the user can select his caracter

choose_btns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
      // when we click a choose btn
      // we get the image inside it
      const img=btn.querySelector("img")
      // we get the src attribute of the imae
      const src=img.getAttribute("src")
      // this object represented the choosed caracter
      selected_victim={src,img};
      // now we moved the choosing screen up in order to show the game board
      screens[1].classList.add("up")
      // after 1s we will create  a victim inside the game board
      setTimeout(CreateVictim,1000)
      // start the game
      startGame()
    })
})

function startGame(){
  // start the counter
  setInterval(increaseTime,1000);
}

function increaseTime(){
  let m=Math.floor(seconds/60);
  let s=seconds%60;
  s = s <10 ?`0${s}`:`${s}`;
  m = m <10 ?`0${m}`:`${m}`;
  time.innerHTML=`Time:${m}:${s}`
  seconds++;
}
function CreateVictim(){
  // create a new div that will contain the image of the victim
  const victim=document.createElement("div")
  // we add a victim class to the new div
  victim.classList.add("victim")
  // get a random x and y inside the gameboard
  const {x , y}=getRandomLocation()
  victim.style.left=`${x}px`
  victim.style.top=`${y}px`
  victim.innerHTML=`<img src="${selected_victim.src}" style="transform:rotate(${Math.random()*360}deg)">`
  // when we click the victim div we call the catch victim function
  victim.addEventListener("click",catchVictim)
  // we append the victim div to the game board
  game_container.appendChild(victim)
}

function getRandomLocation()
{
  const width=window.innerWidth;
  const height=window.innerHeight;
  const x=Math.random()*(width-200)+100
  const y=Math.random()*(height-200)+100
  return {x,y}
}

function catchVictim(){
  // we increase the score
   increaseScore();
   // this correspandant to the victim div
   // we add the caught class to make the disapearing effect
   this.classList.add("caught");
   // after 2s we remove it from the dom
   setTimeout(() =>this.remove(),2000);
   // we add to new divs
   addVictims()
}
function addVictims(){
  setTimeout(CreateVictim(), 1000);
  setTimeout(CreateVictim(), 1500);
}
function increaseScore(){
  score++;
  score_.innerHTML=`Score:${score}`;
}