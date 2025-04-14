import mongoClient from "@/lib/core/mongodb";

export async function fetchUser(email){
    const client = await mongoClient()
    const db = client.db("photoGalleryDB")
    const collection = db.collection("users")

    const query = {"email": email, "admin": true}
    const options = {}
    return await collection.findOne(query, options)
}