"use client"
import Image from "next/image";
import {ImageCarousel} from "@/components/image-carousel";
import {X, Move} from 'lucide-react';
import {useEffect, useState} from "react";

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

async function deletePhoto(id){

    console.log(id)
    return

    const baseURL = "http://localhost:3000/";
    const params = new URLSearchParams({});
    const url = baseURL + "/api/photos/" + id
    const body = JSON.stringify({})

    const response = await fetch(url,{
        method: "DELETE",
    } )

    const data = await response.json()
    // console.log(data)
    return data.photos
}

export default function ImagesContainer({columnsNumber = 2, session}) {
    const [imageFiles, setImageFiles] = useState([])

    useEffect(() => {

        fetchImages().then(images => setImageFiles(images))

    }, [])





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

    return (
        <div className={`grid gap-x-4 w-full grid-cols-2 md:grid-cols-2`}>
            {
                columns.map((column, index) => {
                    return (
                        <div key={index} className="grid gap-y-4">
                            {
                                column.map((image, index) =>
                                    (
                                        <div key={index}>
                                            <ImageView image={image} session={session} />

                                        </div>
                                    ))
                            }
                        </div>
                    )
                })
            }
        </div>)

}

function ImageView({image, index, session}) {
    return (
        <div key={index} className={"relative border group"}>
            {
                session &&
                <div className={"flex justify-between absolute top-0 w-full p-2 invisible group-hover:visible"}>
                    <Move color={"black"}  className={"bg-white/90 cursor-pointer p-1 size-10"}/>
                    <X color={"black"}
                       className={"bg-white/90 cursor-pointer p-1 size-10"}
                       onClick={() => { deletePhoto(image)}}
                    />
                </div>
            }

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
    )
}

