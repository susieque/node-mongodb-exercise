const MongoClient = require('mongodb').MongoClient; //require mongodb node.js driver, imported in the client object from it.
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
	//We used that client objects connect method to connect to mongodb server. Connect methods callback gave a client object used to access new campsite database.

	assert.strictEqual(err, null);

	console.log('Connected correctly to server');

	const db = client.db(dbname); //new campsite database

	db.dropCollection('campsites', (err, result) => {
		//deleted or dropped campsites collection from database.
		assert.strictEqual(err, null);
		console.log('Dropped Collection', result);

		const collection = db.collection('campsites');
		//recreated campsite collection by inserting a new document into campsites collection.
		collection.insertOne(
			{ name: 'Breadcrumb Trail Campground', description: 'Test' },
			(err, result) => {
				assert.strictEqual(err, null);
				console.log('Insert Document:', result.ops);

				collection.find().toArray((err, docs) => {
					//collection find method and two array method to console log all documents from campsites collection.
					assert.strictEqual(err, null);
					console.log('Found Documents:', docs);

					client.close(); //close the client.
            });
        });
	});
});

//We handle any errors using node error callback convention, assert core module to stop the application if any errors occure.
//Pay attention to how the code is structured with a series of nested callback functions.
//Line 16 err, result callback function used a method (line 23-25) that required a callback function (err, result) =>(line 25).
//Then that callback had another callback on line 29 ((err, docs) => {
//Reason for callbacks like this because working with asynchronous operations.
//When commmunicating between Node application and MongoDB server this is not a synchronous operation.
//It takes time for that communication to happen, no matter how small. 
//This kind of callback nesting isn't something we really want to do, check out why in the upcoming exercise.
