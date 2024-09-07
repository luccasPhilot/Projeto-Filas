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

async function findMaxOrder() {
    try {
        const db = await connectToDB();
        const result = await db.collection("dados-fila").findOne({}, { sort: { ordem: -1 }, projection: { ordem: 1 } });
        return result ? result.ordem : 0; // Retorna o maior valor de ordem ou 0 se não houver nenhum
    } catch (err) {
        throw new Error('Erro ao buscar o maior valor de ordem:', err);
    }
}
  

module.exports = {
    connectToDB,
    insertDocuments,
    findMaxOrder
};