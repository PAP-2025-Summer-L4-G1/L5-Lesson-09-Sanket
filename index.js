const cors = require('cors');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;


app.use(cors());

//Home route
app.get('/', (req, res) => {
    res.send("Welcome to my API home page!")
    console.log("GET request received on home page")
});

//Subroute
app.get('/message', (req, res) => {
    res.send("Surprise! I am a ninja!")
    console.log("GET request received on message route")
});

//Dynamic route
app.post('/message/:secret', (req, res) => {
    res.json({ secret: "Message received: " + req.params.secret });
    console.log("Secret message received by POST request")
});



//* ********************* Launching the server **************** */

app.listen(port, () => console.log(`Server running on port ${port}...`));