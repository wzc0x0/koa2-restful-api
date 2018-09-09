const axios = require('axios')
const instance = axios.create({
    baseURL: "http://localhost:3000"
})


$.get('http://localhost:3000/get-cookie').then(() => {
    console.log(document.cookie)
    $.ajax({
        url: "http://localhost:3000/user",
        data: {
            a: 1
        },
        dataType: 'json',
        type: 'POST',
        crossDomain: true,
        // contentType: "application/json",
        success: function(res) {
            console.log(res)
        }
    })
})