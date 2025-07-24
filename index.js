const cors = require('cors');
const express = require('express');
const connectMongoDB = require('./connect')
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

// Exercise 4: Async arrow function
const start = async () => {
    try {
        await connectMongoDB();
        app.listen(port, () => console.log(`Server running on port ${port}...`));
    } catch (e) {
        console.error(e);
    }
}

// In index.js, just above the start function: 
// 6. Add a comment to mark an area for adding your query test scripts so you can easily find them later 
// (we will eventually remove these)
// 7. Use require to import createNewMessage from create-message.js
// 8. Create a constant: newMessage, set its value to one of the message objects from messages.txt (copy & paste)
// 9. Call createNewMessage() passing it newMessage
// 10. In the terminal run: npm start
const { createNewMessage } = require('./models/create-message')
const newMessage = {
        message: "Hello, I like pizza.",
        user: "Sanket",
        date: "7/23/2025",
        secret: false
    };
createNewMessage(newMessage);

start();

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to my API home page!")
    console.log("GET request received on home page")
});

// Subroute
app.get('/message', (req, res) => {
    res.send("Surprise! I am a ninja!")
    console.log("GET request received on message route")
});

// Dynamic route
app.post('/message/:secret', (req, res) => {
    res.json({ secret: "Message received: " + req.params.secret });
    console.log("Secret message received by POST request")
});



//* ********************* Launching the server **************** */

// app.listen(port, () => console.log(`Server running on port ${port}...`));