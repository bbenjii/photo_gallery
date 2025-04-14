"use client"
import Image from "next/image";
import {ImageCarousel} from "@/components/image-carousel";
import {X, Move} from 'lucide-react';
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"


export default function ImagesContainer({columnsNumber = 2, session}) {
    const [imageFiles, setImageFiles] = useState([])
    const [loading, setLoading] = useState(true);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchImages().then(images => {
            setImageFiles(images)
            setLoading(false)
        })

    }, [])

    useEffect(() => {
        // if(!deleteDialogIsOpen) {setSelectedImage(null);}
    },[deleteDialogIsOpen])

    async function fetchImages(){
        const baseURL = "http://192.168.2.194:3000/";
        const params = new URLSearchParams({});
        const url = "/api/photos?" + params
        const body = JSON.stringify({})


        const response = await fetch(url,{
            method: "GET",
        } )

        const data = await response.json()

        setImageFiles(data.photos)
        setLoading(false)
        console.log(data)


        // console.log(data)
        return data.photos
    }

    async function deletePhoto(id){
        console.log(id)
        const baseURL = "http://localhost:3000/";
        const params = new URLSearchParams({});
        const url = "/api/photos/" + id
        const body = JSON.stringify({})

        const response = await fetch(url,{
            method: "DELETE",
        } )

        const data = await response.json()

        await fetchImages()
    }

    // return <></>

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
        <>
            {
                !loading &&
                <div className={`grid gap-x-4 w-full grid-cols-2 md:grid-cols-2`}>
                    {
                        columns.map((column, index) => {
                            return (
                                <div key={index} className={`grid gap-y-4  `}>
                                    {
                                        column.map((image, index) =>
                                            (
                                                <div key={index} className={`${selectedImage === image ? "" : ""} `}>
                                                    <ImageView image={image} session={session} setDeleteDialogIsOpen={setDeleteDialogIsOpen} setSelectedImage={setSelectedImage} selected={selectedImage === image} />
                                                </div>
                                            ))
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            }
            <DeleteDialog open={deleteDialogIsOpen} setOpen={setDeleteDialogIsOpen} handleDelete={(e)=>{
                e.preventDefault();
                deletePhoto(selectedImage._id).then(()=>{
                    setDeleteDialogIsOpen(false)
                    setSelectedImage(null)
                })

                // fetchImages()
            }}/>
        </>
        )

}

function ImageView({image, index, session, setDeleteDialogIsOpen, setSelectedImage, selected}) {
    return (
        <div key={index} className={"relative border group"} onClick={() => setSelectedImage(image)}>
            {
                session &&
                <div className={`flex justify-between invisible absolute top-0 w-full p-2  group-hover:visible ${selected ? "visible lg:invisible" : ""}`}>
                    <Move color={"black"}  className={"bg-white/90 cursor-pointer p-1 size-10"}/>
                    <X color={"black"}
                       className={"bg-white/90 cursor-pointer p-1 size-10"}
                       onClick={() => {
                           setDeleteDialogIsOpen(true)
                           setSelectedImage(image)
                           // deletePhoto(image._id)
                       }
                    }
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

function DeleteDialog({open, setOpen, handleDelete}){

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <form onSubmit={handleDelete}>
                    <DialogHeader >
                        <DialogTitle>Delete photo</DialogTitle>
                        <DialogDescription className={"flex justify-between"}>
                            <span>Are you sure you want to delete this image?</span>
                            <Button type={"submit"}> Delete</Button>
                        </DialogDescription>
                    </DialogHeader>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

