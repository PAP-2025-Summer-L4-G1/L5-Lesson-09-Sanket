const { getCollection } = require('../connect');

// Exercise 4: CRUD Read
// In read-messages.js 
// 1. Create an async function: getAllMessages
// with 1 parameter: isSecret
// 2. Inside getAllMessages,
// Create a const, db, set its value to getCollection()
// 3. Add a try… catch block
// Inside try, create a constant: results, and set its value to:
// await db.find({secret: isSecret}).toArray();
// Log results in the console
// return results
// 4. Inside catch, log errors in the console
// 5. Export getAllMessages

// Lesson 10: Practice Session
// 1. Inside getAllMessages(), before the existing code, check to make sure isSecret contains a boolean value. If it doesn't, convert it to a boolean.
// 2. Uncomment the test code in index.html, test getAllMessages() sending it a string "true" or "false". Make sure your code works before you submit it.
async function getAllMessages(isSecret) {
    // Practice Session
    if (isSecret === "true" || isSecret == true) {
        isSecret = true;
    } else if (isSecret === "false" || isSecret == false) {
        isSecret = false;
    }
    // Log the value of isSecret
    console.log("isSecret:", isSecret);

    const db = getCollection();
    try {
        const result = await db.find({secret: isSecret}).toArray(); // .find() method
        console.log("Message fetched: ", result);
        return result;
    } catch(e) {
        console.error(e);
    }
}

module.exports = { getAllMessages }

// In index.js
// 6. Comment out the query test code from the previous exercise
// 7. Use require to import getAllMessages from read-messages.js
// 8. Call getAllMessages() passing it false
// 9. In the terminal run: npm start