
import {deletePhotos} from "@/lib/models/photosModel";
export const dynamic = 'force-dynamic';

export async function DELETE(request, { params }){
    const searchParams = request.nextUrl.searchParams;
    const { id } = await params
    console.log(id);

    const res = await deletePhotos(id);
    let result = {}
    if (res.message === "ok") {
        result.message = "Successfully deleted photo with id " + id;
    }
    else {
        result.message = "fail"
    }

    return new Response(JSON.stringify(result), {
        status: 201,
        headers: {'Content-Type': 'application/json'}
    });
}
