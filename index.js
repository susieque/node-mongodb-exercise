const MongoClient = require('mongodb').MongoClient; //require mongodb node.js driver, imported in the client object from it.
const dboper = require('./operations'); //access to the 4 methods in operations module.

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => { //MongoClient.connect method returns a promise. If it fails it gets caught in the catch method at the bottom. If connects, inside connect method will first try to drop campsites connection if it exists. It will console.log the collection was dropped. If rejected error console.log No collection to drop
	
	console.log('Connected correctly to server');

	const db = client.db(dbname); //new campsite database

	db.dropCollection('campsites') //this method now returns a promise
	.then(result => {
		console.log('Dropped Collection', result);
	})
	.catch(err => console.log('No collection to drop.'));  //chain to this promise it's own personal catch block, if a collection named campsites doesn't exist in this database, this promise will return error that we can catch. But not important error, don't want to stop rest of application from running so console.log about this error. But we wont close the connection.

	dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites')
	.then(result => {
        console.log('Insert Document:', result.ops);

		return dboper.findDocuments(db, 'campsites');
	})
	.then(docs => {
		console.log('Found Document:', docs);

		return dboper.updateDocument(db, { name: 'Breadcrumb Trail Campground' },
			{ description: 'Update Test Description' }, 'campsites');
	})
	.then(result => {
		console.log('Updated Document Count', result.result.nModified);

		return dboper.findDocuments(db, 'campsites'); 
	})
	.then(docs => {
		console.log('Found Documents:', docs);

		return dboper.removeDocument(db, { name: 'Breadcrumb Trail Campground' },
			'campsites');
		
	})
	.then(result => {
		console.log('Deleted Document Count:', result.deletedCount);

		return client.close(); //close the client. Runs at the end of insert doc function when called. Will have access to the result value later.
	})
	.catch(err => {
		console.log(err);
		client.close();
	});

})
.catch(err => console.log(err));
