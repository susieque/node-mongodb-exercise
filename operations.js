exports.insertDocument = (db, document, collection) => {
	const coll = db.collection(collection); 
	return coll.insertOne(document); //insertOne will return a promise as its return value. Return will pass that same promise as the return value for the insertDocument method.
};

exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);
    return coll.find().toArray();
};


exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
	const coll = db.collection(collection);
	return coll.updateOne(document, { $set: update }, null);
};
//analogous to the four crud operations. Inserrt being create, find being read, update to update, & remove being delete. 
