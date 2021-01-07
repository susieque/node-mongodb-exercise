const MongoClient = require('mongodb').MongoClient; //require mongodb node.js driver, imported in the client object from it.
const assert = require('assert').strict;
const dboper = require('./operations'); //access to the 4 methods in operations module.

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

		dboper.insertDocument(
			db, //Calling Insert Doc function,
			{ name: 'Breadcrumb Trail Campground', description: 'Test' },
			'campsites',
			(result) => {
				console.log('Insert Document:', result.ops); //but in parameter list for insert doc function we're defining a callback function, which wont be called until later(this is function definition)code in it doesn't run at this point in the code.

				dboper.findDocuments(db, 'campsites', (docs) => {
					console.log('Found Documents:', docs);

					dboper.updateDocument(
						db,
						{ name: 'Breadcrumb Trail Campground' },
						{ description: 'Update Test Description' },
						'campsites',
						(result) => {
							console.log('Updated Document Count', result.result.nModified);

							dboper.findDocuments(db, 'campsites', (docs) => {
								console.log('Found Documents:', docs);

								dboper.removeDocument(
									db,
									{ name: 'Breadcrumb Trail Campground' },
									'campsites',
									(result) => {
										console.log('Deleted Document Count:', result.deletedCount);

										client.close(); //close the client. Runs at the end of insert doc function when called. Will have access to the result value later.
									}
								);
							});
						}
					);
				});
			}
		);
	});
});

//Calling a function vs defining a function. With use of callbacks that are definded in line we're mixing up the two. Calling a funciton is different from defining that function, when you define you're saying this is what this function will do when its called. When you call it, youre writing the code inside it.

//We handle any errors using node error callback convention, assert core module to stop the application if any errors occure.
//Pay attention to how the code is structured with a series of nested callback functions.
//Line 16 err, result callback function used a method (line 23-25) that required a callback function (err, result) =>(line 25).
//Then that callback had another callback on line 29 ((err, docs) => {
//Reason for callbacks like this because working with asynchronous operations.
//When commmunicating between Node application and MongoDB server this is not a synchronous operation.
//It takes time for that communication to happen, no matter how small.
//This kind of callback nesting isn't something we really want to do, check out why in the upcoming exercise.
