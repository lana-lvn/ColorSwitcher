
const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};


let intervalColor = null;

refs.start.addEventListener('click', onStartClick);

refs.stop.addEventListener('click', onStopClick);



function onStartClick(evt) {

  refs.start.disabled = true;
  intervalColor = setInterval(() => { refs.body.style.backgroundColor = getRandomHexColor() }, 1000);
  

};


function onStopClick() { 
   refs.start.disabled = false;
  clearInterval(intervalColor);

};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};