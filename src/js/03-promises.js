import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) { 
  evt.preventDefault();

  let delay = Number(refs.delayInput.value);
  let step = Number(refs.stepInput.value);
  let amount = Number(refs.amountInput.value);
  let position = 0;


 if (delay <= 0 && step < 0 && amount < 0) {
   return;
  };



  for (let i = 1; i <= amount; i += 1) { 
    position = i;
    
  createPromise(position, delay).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
    }).catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
    });
    delay += step;
  };

  refs.form.reset();


};


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    
    
    setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
    
  });
};

