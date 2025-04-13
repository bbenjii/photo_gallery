import mongoClient from "@/lib/core/mongodb";

const client = await mongoClient
const db = client.db("photoGalleryDB")
const collection = db.collection("users")


export async function fetchUser(email){
    const query = {"email": email, "admin": true}
    const options = {}
    return await collection.findOne(query, options)
}