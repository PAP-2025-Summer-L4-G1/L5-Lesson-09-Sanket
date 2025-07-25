const form = document.querySelector('form');
const messagesContainer = document.querySelector('.messages-container');
const secretBtn = document.querySelector('#show-secret');

const apiGetAll = "http://localhost:3002/";
const apiPostNew = "http://localhost:3002/message";
const apiUpdateOne = "http://localhost:3002/message/";
const apiDeleteOne = "http://localhost:3002/message/";


/*================ Get public or secret messages and show on page ===============*/

function showMessages(messages) {
    messagesContainer.innerHTML = "";
    messages.forEach((message) => {
        const messageHtml = `
        <div class="message">
            <h4>${message.message}</h4>
                <div class="edit-message">
                    <button class="button-confirm-edit" data-message-id="${message._id}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29 5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"/></svg>
                </button>
                <button class="button-cancel-edit">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13.89 8.7L12 10.59 10.11 8.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 8.7 13.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l1.89 1.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l1.89-1.89c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.38-1.41 0zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                </button>
                </div>
            <div class="meta">
                <p>
                    ${message.user}
                    &nbsp;
                    ${message.date}
                </p>
                <div class="edit">
                    <button class="button-edit" title="edit">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path></svg>
                    </button>
                    <button class="button-trash" data-message-id="${message._id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
                </svg>
                </button>
                </div>
            </div>
        </div>`;
        messagesContainer.innerHTML += messageHtml;
    });
    messagesContainer.querySelectorAll('.button-trash').forEach(function (button) {
        button.addEventListener('click', function () {
            console.log(this.dataset.messageId);
            deleteMessage(this.dataset.messageId);
        })
    });
    messagesContainer.querySelectorAll('.button-edit').forEach(function (button) {
        button.addEventListener('click', function () {
            this.style.display = "none";
            this.parentNode.parentNode.parentNode.querySelector('.edit-message').style.display = "block";
            const messageElem = this.parentNode.parentNode.parentNode.querySelector('h4');
            messageElem.dataset.original = messageElem.textContent;
            messageElem.setAttribute('contenteditable', 'true');
            messageElem.focus();
        })
    });
    messagesContainer.querySelectorAll('.button-cancel-edit').forEach(function (button) {
        button.addEventListener('click', function () {
            this.parentNode.style.display = "none";
            this.parentNode.parentNode.querySelector('.meta > .edit > .button-edit').style.display = "inline-block";
            const messageElem = this.parentNode.parentNode.querySelector('h4');
            messageElem.textContent = messageElem.dataset.original;
            messageElem.setAttribute('contenteditable', 'false');
        })
    });
    messagesContainer.querySelectorAll('.button-confirm-edit').forEach(function (button) {
        button.addEventListener('click', function () {
            this.parentNode.style.display = "none";
            this.parentNode.parentNode.querySelector('.meta > .edit > .button-edit').style.display = "inline-block";
            const messageElem = this.parentNode.parentNode.querySelector('h4');
            //console.log(messageElem.textContent);
            delete messageElem.dataset.original;
            updateMessage(this.dataset.messageId, messageElem.textContent);
            messageElem.setAttribute('contenteditable', 'false');
        })
    });
}

async function getMessages(isSecret) {
    try {
        let response = await fetch(apiGetAll + isSecret, {
            method: 'GET'
        });
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
        getMessages(document.querySelector('input[name=secret]:checked').value);
    } catch (error) {
        console.error(error);
    }
}


/*================ Update an existing message ===============*/

async function updateMessage(messageId, newMessage) {
    try {
        let response = await fetch(apiDeleteOne + messageId, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            body: JSON.stringify({
                message: newMessage,
                date: new Date()
            })
        });
        console.log(response);
        getMessages(document.querySelector('input[name=secret]:checked').value);
    } catch (error) {
        console.error(error);
    }
}


/*================ Delete an existing message ===============*/

async function deleteMessage(messageId) {
    try {
        let response = await fetch(apiDeleteOne + messageId, {
            method: 'DELETE'
        });
        console.log(response);
        getMessages(document.querySelector('input[name=secret]:checked').value);
    } catch (error) {
        console.error(error);
    }
}

/*================ Message form handling ===============*/

function formData(e) {
    e.preventDefault();
    //convert the following to json before send
    let message = document.querySelector('#message').value;
    let user = document.querySelector('#user').value;
    let date = new Date();
    let secret = document.querySelector('input[name=secret]:checked').value;
    //console.log(message, user, secret, date);
    const data = {
        message: message,
        user: user,
        date: date,
        secret: JSON.parse(secret)
    }
    newMessage(data);
    this.reset();
}

form.addEventListener('submit', formData);