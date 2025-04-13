import {fetchPhoto, uploadImage, listPhotos} from "@/lib/models/photosModel";

export async function DELETE(request, { params }){
    const searchParams = request.nextUrl.searchParams;

    const { photo_id } = await params
    console.log(photo_id);

    let result = { "message":"Succesfully Deleted" + photo_id};

    return new Response(JSON.stringify(result), {
        status: 201,
        headers: {'Content-Type': 'application/json'}
    });
}
