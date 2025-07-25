const { getCollection } = require('../connect');

// Exercise 5: CRUD Update

// In update-message.js 
// 1. Create an async function: updateMessage
// with 2 parameters: userName, newMessage
// 2. Inside updateMessage,
// Create a const, db, set its value to getCollection()
// 3. Add a try… catch block
// Inside try, create a constant: results, 
// set its value to the following:
// await db.updateOne({user: userName }, { $set: { message: newMessage }} );
// Log results in the console
// return results
// 4. Inside catch, log errors in the console
// 5. Export updateMessage
async function updateMessage(userName, newMessage) {
    const db = getCollection();
    try {
        const result = await db.updateOne({ user: userName },
                                          { $set: { message: newMessage }}); // .updateOne method
        console.log("Message updated: ", result);
        return result;
    } catch(e) {
        console.log(e);
    }
}

module.exports = { updateMessage };

// Pick one of your messages to update, and note the value of the 
// user field. Also, think a new message to write.
// In index.js
// 6. Comment out the query test code from the previous exercise
// 7. Use require to import updateMessage from update-message.js
// 8. Call updateMessage() passing it string values for userName and newMessage
// 9. In the terminal run: npm start