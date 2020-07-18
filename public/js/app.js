console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = '';
  fetch(`http://localhost:3001/weather?address=${location}`)
  .then(data => {
    return data.json()
  }).then(data => {
    if(data.error){
      messageOne.textContent = data.error;
      messageTwo.textContent = '';
    }else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    }
  }).catch(ex => {
    console.log(ex);
  });
});
