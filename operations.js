const assert = require('assert').strict;

exports.insertDocument = (db, document, collection, callback) => {
	//Will be called at the end of each method.
	const coll = db.collection(collection); //in body for this method declare a constant variable named coll(colletion). Collection arguement will be string(like campsites as a string).
	//use that string as an arguement in db.collection method to obtain reference to collection named campsites thats stored in mongodb server.
	//can use coll constant to interact w/a specific collection in mongodb server.
	coll.insertOne(document, (err, result) => {
		//insertOne & collection methods interact with the database (part of mongoDB node driver API). insertOne takes 2 arguments-document(form of a JS object)2nd is callback function that define inline with 2 parameters(err, result)
		assert.strictEqual(err, null);
		callback(result); //callback from somewhere else in the code. Where a call to this insert doc is made. From index.js file
	});
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    });
};


exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.updateDocument = (db, document, update, collection, callback) => {
	const coll = db.collection(collection);
	coll.updateOne(document, { $set: update }, null, (err, result) => {
		//updateOne has 4 parameters. document, info about updates to make(update operator to pass to mongodb) its $set with the update object. To write over existing info. 3rd is to pass in vertain optional config that we dont need so pass null.4th is callback function that gives error or result of operation.
		assert.strictEqual(err, null);
		callback(result);
	});
};
//analogous to the four crud operations. Inserrt being create, find being read, update to update, & remove being delete. 