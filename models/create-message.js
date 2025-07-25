const { getCollection } = require('../connect');

// Exercise 3: CRUD create 
// In create-message.js: 
// 1. Create an async function: createNewMessage, with 1 parameter: newMessage
// Inside createNewMessage,
// 2. Create a const, db, set its value to getCollection()
// 3. Add a try… catch block
// Inside try, create a constant: result, and set its value to:
// await db.insertOne(newMessage);
// Log result in the console
// return result
// 4. Inside catch, log errors in the console
// 5. Export createNewMessage
async function createNewMessage(newMessage) {
    const db = getCollection();
    try {
        const result = await db.insertOne(newMessage); // .insertOne method
        console.log("Message inserted: ", result);
        return result;
    } catch(e) {
        console.log(e);
    }
}

module.exports = { createNewMessage };