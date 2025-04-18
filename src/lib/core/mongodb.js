import { MongoClient } from 'mongodb';


export default async function mongoClient(){
    const uri = process.env.MONGODB_URI; // keep it in your .env file
    const options = {};

    let client;
    let mongoClient;
    if (!process.env.MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    }

    if (!global._mongoClient) {
        client = new MongoClient(uri)
        global._mongoClient = await client.connect()
    }

    mongoClient = await global._mongoClient
    return mongoClient
}


