const form = document.querySelector('form');
const messagesContainer = document.querySelector('.messages-container');
const secretBtn = document.querySelector('#show-secret');

const apiGetAll = "http://localhost:3002/";
const apiPostNew = "http://localhost:3002/message";

/*================ Get public or secret messages and show on page ===============*/
const allParams = {
    method: 'GET'
}

function showMessages(messages) {
    messagesContainer.innerHTML = "";
    messages.forEach((message) => {
        const messageHtml = `
        <div class="message">
                <h4>${message.message}</h4>
                <p>${message.user} &nbsp; ${message.date}</p>
        </div>`;
        messagesContainer.innerHTML += messageHtml;
    });
}

async function getMessages(isSecret) {
    try {
        let response = await fetch(apiGetAll + isSecret, allParams);
        let messages = await response.json();
        console.log(messages);
        showMessages(messages);
    } catch (error) {
        console.error(error);
    }
}

getMessages("false");

secretBtn.addEventListener('click', () => {
    console.log("btn clicked");
    getMessages("true");
});

/*================ Post a new message ===============*/

async function newMessage(message) {
    const params = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }
    console.log(message);
    try {
        let response = await fetch(apiPostNew, params);
        console.log(response);
        getMessages(false);
    } catch (error) {
        console.error(error);
    }
}

function formData(e) {
    e.preventDefault();
    //convert the following to json before send
    let message = document.querySelector('#message').value;
    let user = document.querySelector('#user').value;
    let date = new Date().toLocaleDateString();
    let secret = document.querySelector('input[name=secret]:checked').value;
    console.log(Boolean(secret));
    //console.log(message, user, secret, date);
    const data = {
        message: message,
        user: user,
        date: date,
        secret: JSON.parse(secret)
    }
    newMessage(data);
    form.reset();
}

form.addEventListener('submit', formData);