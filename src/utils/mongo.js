const MongoClient = require('mongodb').MongoClient;
const { mongoConfig, activeLogs } = require('./config');
const { getObjectID } = require('./utilities');



let client = new MongoClient(mongoConfig.host, mongoConfig.mongoOptions);

const initConnectionDB = async () => {
    await client.connect();
    if (activeLogs) {
        console.log('|       Connected to mongoDB         |');
        console.log("--------------------------------------");
    }
}

initConnectionDB();

exports.dataConnection = {
    getOne: () =>
        new Promise(async (resolve, reject) => {
            try {
                const db = await client.db(mongoConfig.database);
                const collection = await db.collection(mongoConfig.collection);
                const data = await collection.find({}).toArray();
                resolve(data[0]);
            } catch (err) {
                reject(err);
            }
        }),
    update: (dataUpdated, idParam) =>
        new Promise(async (resolve, reject) => {
            try {
                // let id = getObjectID(idParam);
                const db = await client.db(mongoConfig.database);
                const collection = await db.collection(mongoConfig.collection);
                const data = await collection.updateOne({ _id: idParam }, { $set: { counter_entry: dataUpdated } });
                resolve(data);
            } catch (err) {
                reject(err);
            }
        })
};
