import {  S3Client} from "@aws-sdk/client-s3";
import {MongoClient} from "mongodb";


const region = process.env._AWS_REGION
const accessKeyId = process.env._AWS_ACCESS_KEY_ID
const secretAccessKey =  process.env._AWS_SECRET_ACCESS_KEY

let s3Client;

if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error('Please define the AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, environment variables inside .env.local');
}

if (!global._s3Client) {
    const s3 = new S3Client({
        region: region,
        credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
        },
    });

    global._s3Client = await s3
}

s3Client = global._s3Client


export default s3Client