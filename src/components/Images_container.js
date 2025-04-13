import Image from "next/image";
import {ImageCarousel} from "@/components/image-carousel";

async function fetchImages(){
    const baseURL = "http://localhost:3000/";
    const params = new URLSearchParams({});
    const url = baseURL + "/api/photos?" + params
    const body = JSON.stringify({})

    const response = await fetch(url,{
        method: "GET",
    } )

    const data = await response.json()
    // console.log(data)
    return data.photos

}

export default async function ImagesContainer({columnsNumber = 2}) {
    let imageFiles = []
    imageFiles = await fetchImages()


    const gril_col = [
        "grid-cols-1",
        "grid-cols-2",
        "grid-cols-3",
        "grid-cols-4",
    ]
    let cols_class = gril_col[columnsNumber - 1]
    cols_class = `grid-cols-1 lg:grid-col-2 `
    let columns = Array.from({length: columnsNumber}, () => []);
    imageFiles.forEach((image, index) => {
        let col = index % columnsNumber
        columns[col].push(image);
    })

    // return (
    //     <div className={"w-full"}>
    //         <Image
    //             // key={index}
    //             src={`${imageFiles[0].url}`}
    //             alt={`Image `}
    //             width={500}
    //             height={500}
    //             // fill
    //             className=""
    //             // style={{ height: "auto", display: "block" }}
    //         />
    //     </div>
    // )

    return (
        <div className={`grid gap-x-4 w-full grid-cols-1 md:grid-cols-2`}>
            {
                columns.map((column, index) => {
                    return (
                        <div key={index} className="grid gap-y-4">
                            {
                                column.map((image, index) =>
                                    (
                                        <div key={index} className={""}>
                                            <img
                                                key={index}
                                                src={`${image.url}`}
                                                alt={`Image ${index}`}
                                                width={500}
                                                height={500}
                                                // fill
                                                className=""
                                                // style={{ height: "auto", display: "block" }}
                                            />
                                        </div>

                                    ))
                            }
                        </div>
                    )
                })
            }
        </div>)


}

