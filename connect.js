// Require .env using .config()
require('dotenv').config({ path: './.env'});
// Create variables for all the DB environment variables using process.env
const atlasURI = process.env.DB_CONNECTION;
const db = process.env.DB_NAME;
const coll = process.env.DB_COLLECTION_NAME;

// Exercise 3: 
// Import mongodb using require, assign it a constant
const { MongoClient } = require('mongodb');

// Create a new instance of MongoClient
const client = new MongoClient(atlasURI)

// Async function
async function connectMongoDB() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected to the database");
    } catch(e) {
        console.error(e);
    }
};

connectMongoDB();

// Exercise 2: Connecting to the collection
// Inside connect.js:
// 1. Create an arrow function expression and assign it a constant:
// getCollection
// 2. Inside the arrow function, return the collection by passing db() and collection() the variables you assigned when importing the environment variables for DB_NAME and DB_COLLECTION_NAME
// return client.db(_____).collection(_____);
// 3. Add getCollection to your module.exports
// 4. Inside the files 
// create-message.js, 
// read-messages.js, 
// update-message.js, 
// delete-message.js:
// Use require to import getCollection from connect.js
// const { getCollection } = require('../connect');
const getCollection = () => {
    return client.db(db).collection(coll);
}

module.exports = { connectMongoDB, getCollection };