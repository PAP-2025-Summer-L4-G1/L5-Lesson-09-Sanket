const cors = require('cors');
const express = require('express');
const { createNewMessage } = require('./models/create-message') // Lesson 11 Exercise 2
const { connectMongoDB } = require('./connect')

const app = express();  
const port = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Exercise 4: Import and pass getAllMessages() false
// const { getAllMessages } = require('./models/read-messages');
// getAllMessages(false);

// Exercise 5: Import updateMessage()
// const { updateMessage } = require('./models/update-messages');
// updateMessage("Sanket", "Hello, I love pizza");

// Exercise 6: Import deleteMessage()
// const { deleteMessage } = require('./models/delete-messages');
// deleteMessage("Sanket", "Hello, I love pizza");

// In index.js, just above the start function: 
// 6. Add a comment to mark an area for adding your query test scripts so you can easily find them later 
// (we will eventually remove these)
// 7. Use require to import createNewMessage from create-message.js
// 8. Create a constant: newMessage, set its value to one of the message objects from messages.txt (copy & paste)
// 9. Call createNewMessage() passing it newMessage
// 10. In the terminal run: npm start
// const { createNewMessage } = require('./models/create-message')
// const newMessage = {
//         message: "Hello, I like pizza.",
//         user: "Sanket",
//         date: "7/23/2025",
//         secret: false
//     };
// createNewMessage(newMessage);

// Home route with db query (GET)
const { getAllMessages } = require('./models/read-messages');
app.get('/:secret', async (req, res) => {
    const results = await getAllMessages(req.params.secret);
    res.send(results);
    console.log("GET request received on home page")
});

// Subroute (GET)
app.get('/message', (req, res) => {
    res.send("Surprise! I am a ninja!")
    console.log("GET request received on message route")
});

// Dynamic route (POST)
app.post('/message/:secret', (req, res) => {
    res.json({ secret: "Message received: " + req.params.secret });
    console.log("Secret message received by POST request")
});

// Lesson 11, Exercise 2
app.post('/message'), async (req, res) => {
    const newMessage = req.body;
    const results = await createNewMessage(newMessage);
    res.sendStatus(201);
}

//* ********************* Launching the server **************** */

// app.listen(port, () => console.log(`Server running on port ${port}...`));

// Exercise 4: Async arrow function
const start = async () => {
    try {
        await connectMongoDB();
        app.listen(port, () => console.log(`Server running on port ${port}...`));
    } catch (e) {
        console.error(e);
    }
}

start();