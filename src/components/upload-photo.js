"use client";
import {Plus} from 'lucide-react';
import {useState, useEffect} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

async function uploadImages(formData){
    const baseURL = "";
    const params = new URLSearchParams({});
    const url = baseURL + "/api/photos?" + params
    const body = formData

    const response = await fetch(url,{
        method: "POST",
        // headers: {"Content-Type": "multipart/form-data"},
        body: body,
    } )

    const data = await response.json()
    console.log(data)

}

export default function PhotoUpload({}){
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [uploadFormIsOpen, setUploadFormIsOpen] = useState(false);


    return(
        <div className={"fixed bottom-4 right-4 "}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Plus size={40} className={"cursor-pointer border rounded-full bg-background/80 z-10"}/>
                </DropdownMenuTrigger>
                <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
                    <DropdownMenuItem onClick={()=> {
                        setUploadFormIsOpen(true)}}>
                        Upload photo(s)
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <UploadForm uploadFormIsOpen={uploadFormIsOpen} setUploadFormIsOpen={setUploadFormIsOpen}/>
        </div>
    )
}

function UploadForm({uploadFormIsOpen, setUploadFormIsOpen}) {
    return (
        <>
            <Dialog open={uploadFormIsOpen} onOpenChange={setUploadFormIsOpen}>

                <DialogContent>
                    <form onSubmit={(e)=>{
                        e.preventDefault();

                        const files = (e.target.images.files)
                        const formData = new FormData()

                        // Append each file to the FormData
                        for (let i = 0; i < files.length; i++) {
                            formData.append("images", files[i]); // use the same key for all files
                        }
                        // formData.append("images", files)

                        console.log("Files to upload:", formData.get("images"));
                        let data = uploadImages(formData);
                        setUploadFormIsOpen(false);
                        console.log(data)
                    }}>
                    <DialogHeader>
                        <DialogTitle>UPLOAD PHOTOS</DialogTitle>
                        <DialogDescription>
                            Upload one or many photos
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="images">Picture</Label>
                            <Input id="images" name="images" type="file" multiple required/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Upload files</Button>
                    </DialogFooter>
                    </form>
                </DialogContent>


            </Dialog>
        </>
    )
}

