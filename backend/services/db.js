require("dotenv").config();
const { MongoClient } = require('mongodb');

let singleton

async function connectToDB() {
    if (singleton) return singleton;
    const client = new MongoClient(process.env.MONGO_HOST);

    await client.connect();
    console.log('Connected successfully to MongoDB server');

    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

async function findDocuments() {
    try {
        const db = await connectToDB();
        return db.collection("dados-fila").find().toArray();
    } catch (err) {
        throw new Error(err);
    }
}

async function insertDocuments(document) {
    try {
        const db = await connectToDB();
        return db.collection("dados-fila").insertOne(document)
    } catch (err) {
        throw new Error(err);
    }
}

async function updateDocument(document) {
    try {
        const db = await connectToDB();
        return db.collection('dados-fila').updateOne({ _id: document._id }, { $set: document });
    } catch (err) {
        throw new Error(err);
    }

}

async function removeDocument(document) {
    const db = await connectToDB();
    const collection = db.collection('dados-fila');
    const ordemRemovido = document.ordem
  
    try {
      await collection.deleteOne({ _id: document._id });

      const result = collection.updateMany(
        { ordem: { $gt: ordemRemovido } }, //gt = greater than (maior que)
        { $inc: { ordem: -1 } } // incrementa
      )
      return result
    } catch (err) {
      throw new Error(`Erro ao remover documento e atualizar ordens: ${err.message}`);
    }
}

module.exports = {
    connectToDB,
    findDocuments,
    insertDocuments,
    updateDocument,
    removeDocument,
};