import mongoClient from "@/lib/core/mongodb";
import {ObjectId} from 'mongodb'
import * as objectModel from './objectModel'
import s3Client from "@/lib/core/s3-client";


export async function fetchPhoto(id){
    const client = await mongoClient
    const db = client.db("photoGalleryDB")
    const collection = db.collection("photos")

    const query = {"_id": new ObjectId(id)}
    objectModel.getObjectURL()
    const options = {}

    let fetched_photo = await collection.findOne(query, options)
    fetched_photo.url = await objectModel.getObjectURL(photo.object_key)

    return fetched_photo;
}

export async function listPhotos(){
    const client = await mongoClient
    const db = client.db("photoGalleryDB")
    const collection = db.collection("photos")

    const query = {}
    const options = {
        sort: { "upload_date": -1 }
    }
    let fetched_photos = await collection.find(query, options).toArray()

    for (let photo of fetched_photos) {
        photo.url = await objectModel.getObjectURL(photo.object_key)
    }

    return fetched_photos

}

export async function uploadImage(filename, filetype, filebuffer){
    const client = await mongoClient
    const db = client.db("photoGalleryDB")
    const collection = db.collection("photos")

    let res = await objectModel.uploadObject(filename, filetype, filebuffer);
    if(res.message === "ok"){
        let data = {
            content_type: filetype,
            filename: filename,
            object_key:`benollomo/${filename}`,
            upload_date: new Date()
        }

        try {
            res = await collection.insertOne(data)
            return({ message: "ok" });
        } catch (err) {
            console.error(err);
            return({ message: "fail" });
        }
    }
    else{
        return({ message: "fail" });
    }
}

export async function deletePhotos(id){
    const query = {"_id": new ObjectId(id)}
    let res = await collection.deleteOne(query)


    if (res.deletedCount === 1) {
        return({ message: "ok" });
    } else {
        return({ message: "fail" });
    }
}