const { getCollection } = require('../connect');


// Exercise 5: CRUD delete
// In delete-message.js 
// 1. Create an async function: deleteMessage
// with 2 parameters:  fieldId, valueId
// 2. Inside deleteMessage,
// Create a const, db, set its value to getCollection()
// 3. Add a try… catch block
// Inside try, create a constant: results, 
// set its value to the following:
// await db.deleteOne({ fieldId: valueId });
// Log results in the console
// return results
// 4. Inside catch, log errors in the console
// 5. Export deleteMessage
async function deleteMessage(fieldId, valueId) {
    const db = getCollection();
    try {
        const result = await db.deleteOne({ fieldId: valueId });
        console.log("Message deleted: ", result);
        return result;
    } catch(e) {
        console.log(e);
    }
}

module.exports = { deleteMessage }

// Pick one of your messages to delete, and note one of the 
// field and value pairs.
// In index.js
// 6. Comment out the query test code from the previous exercise
// 7. Use require to import deleteMessage from delete-message.js
// 8. Call deleteMessage() passing it string values for fieldId and valueId
// 9. In the terminal run: npm start