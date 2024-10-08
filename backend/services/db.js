require("dotenv").config();
const { MongoClient } = require('mongodb');

let singleton

async function connectToDB() {
    if (singleton) return singleton;
    const client = new MongoClient(process.env.MONGO_HOST);

    await client.connect();
    console.log('Conectado ao Server (React-DB)');

    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

async function findDocuments() {
    try {
        const db = await connectToDB();
        return db.collection("dados-fila").find().sort({ ordem: 1 }).toArray();
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
    const db = await connectToDB()
    return db.collection("dados-fila").updateOne({ _id: document._id }, { $set: document });
}

async function updateVoltar(document) {
    const db = await connectToDB()
    const collection = db.collection('dados-fila')
    const ordemAntes = document.ordem

    try {
            await collection.updateMany(
                { posicao: { $gt: 1} },
                { $inc: { posicao: +1 } },
            )
            await collection.updateOne(
                { _id: document._id },
                { $set: { ...document, posicao: 2 }}
            )
    
        return { success: true }
    } catch (err) {
        throw new Error(err)
    }
}

async function updateFila(document) {
    const db = await connectToDB()
    const collection = db.collection('dados-fila')
    const ordemAntes = document.ordem
    
    try {
        if((ordemAntes!== 0) && (ordemAntes!== -1)) {
            await collection.updateMany(
                { ordem: { $gt: ordemAntes} },
                { $inc: { ordem: -1 } },
            );
            await collection.updateMany(
                { ordem: -1 },
                { $set: { ordem: 0 } },
            );
            await collection.updateOne(
                { _id: document._id },
                { $set: { ...document, ordem: -1 }}
            );
        }
        else if(ordemAntes === 0) {
            await collection.updateMany(
                { ordem: -1 },
                { $inc: { ordem: +1 } },
            )
            await collection.updateOne(
                { _id: document._id },
                { $set: { ...document, ordem: -1 }}
            )
        }
        else if(ordemAntes === -1) {
            
        }
        else {
            await collection.updateOne(
                { _id: document._id },
                { $set: document }
            );
        }
    
        return { success: true }
    } catch (err) {
        throw new Error(err)
    }

}

async function removeDocument(document) {
    const db = await connectToDB();
    const collection = db.collection('dados-fila');
    const posicaoRemovido = document.posicao
  
    try {
      await collection.deleteOne({ _id: document._id });
      if (posicaoRemovido > 0) {
        await collection.updateMany(
            { posicao: { $gt: posicaoRemovido } }, //gt = greater than (maior que)
            { $inc: { posicao: -1 } } // incrementa
        )
      }
      return { success: true }
    } catch (err) {
        throw new Error(err)
    }
}

async function chamarFila(document) {
    const db = await connectToDB()
    const collection = db.collection('dados-fila')
    const posicaoAntes = document.posicao
    const statusAntes = document.status
    
    try {
        if((statusAntes !== 1)) {
            const existeStatus1 = await collection.findOne({ status: 1 });
            if (existeStatus1) {
                await collection.updateOne(
                    { _id: existeStatus1._id },
                    { $set: { status: 2, posicao: 0} }
                );
            }
            if (posicaoAntes > 1) {
                await collection.updateMany(
                    { posicao: { $gt: posicaoAntes } }, //gt = greater than (maior que)
                    { $inc: { posicao: -1 } } // incrementa
                )
              }

            await collection.updateOne(
                { _id: document._id },
                { $set: { ...document, status: 1, posicao: 1 }}
            );
        }
    
        return { success: true }
    } catch (err) {
        throw new Error(err)
    }

}

module.exports = {
    connectToDB,
    findDocuments,
    insertDocuments,
    updateDocument,
    removeDocument,
    updateFila,
    updateVoltar,
    chamarFila
};