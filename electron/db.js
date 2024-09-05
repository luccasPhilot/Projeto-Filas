require("dotenv").config();
const { MongoClient } = require('mongodb');

let singleton

async function connectToDB() {
    if (singleton) return singleton;
    const client = new MongoClient(process.env.MONGO_HOST);

    await client.connect();
    console.log('Conectado ao Server (Electron-DB)');

    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

async function insertDocuments(document) {
    try {
        const db = await connectToDB();
        return db.collection("dados-fila").insertOne(document)
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    connectToDB,
    insertDocuments
};