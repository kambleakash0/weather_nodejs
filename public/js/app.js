const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const img = document.querySelector('img')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loc = search.value
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('/weather?address='+loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
                msg2.textContent = ''
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.weather + '. The current temperature is ' + data.temp + ' degrees, but feels like ' + data.feelslike + ' degrees.'
            }
        })

    })


})