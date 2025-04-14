import {  S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    HeadObjectCommand

} from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from "@/lib/core/s3-client";


const bucketName = process.env._AWS_S3_BUCKET;

export async function getObjectURL(object_key) {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: object_key,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 });
    return await signedUrl

}

export async function uploadObject(filename, filetype, filebuffer) {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `benollomo/${filename}`,
        Body: filebuffer,
        ContentType: filetype,
    });

    try {
        await s3Client.send(command);
        return({ message: "ok" });
    } catch (err) {
        console.error(err);
        return({ message: "fail" });
    }
}

export async function deleteObject() {}

export async function listObject() {}

export async function getObject() {}
