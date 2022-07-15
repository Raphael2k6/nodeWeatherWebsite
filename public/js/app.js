console.log('hello world');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

    weatherForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const location = search.value;
        messageOne.textContent = 'loading'
        messageTwo.textContent = '';

        fetch(`http://localhost:4000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error
                messageOne.textContent = ''
            } else {
                messageOne.textContent = data.forcast;
                messageTwo.textContent = data.forcast;
            }
        }).catch((err) => {
            console.log(err)
        })
    })

})