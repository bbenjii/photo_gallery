import s3Client from "@/lib/core/s3-client";
import {fetchPhoto, uploadImage, listPhotos} from "@/lib/models/photosModel";
const path = require("path");

function appendTimestampToFilename(originalName) {
    const extension = path.extname(originalName);             // e.g. '.png'
    const nameWithoutExt = path.basename(originalName, extension); // e.g. 'file1'
    const timestamp = Date.now();                             // e.g. 1711745567890

    return `${nameWithoutExt}_${timestamp}${extension}`;
}

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;

    let response = await listPhotos()
    response.sort((a, b) => b.upload_date - a.upload_date)

    let result = {photos: response}

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    });
}

export async function POST(request) {
    const formData = await request.formData();

    const files = formData.getAll("images");
    if (!files) {
        return Response.json({ error: "No files received." }, { status: 400 });
    }

    // Upload each file
    try{
        for (let i = 0; i < files.length; i++) {
            const filebufferbuffer = Buffer.from(await files[i].arrayBuffer());
            let filename =  files[i].name.replaceAll(" ", "_")
            filename = appendTimestampToFilename(filename)
            const filetype =  files[i].type;

            const res = await uploadImage(filename, filetype, filebufferbuffer);
        }

        let result = {"message": "Successfully uploaded",}
        return new Response(JSON.stringify(result), {
            status: 201,
            headers: {'Content-Type': 'application/json'}
        });
    }
    catch (err) {
        console.error(err);
        return({ message: "fail" });
    }
}