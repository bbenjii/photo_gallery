"use client";
import {useEffect, useState} from "react";
import {Menu, X} from 'lucide-react';
import Link from "next/link";
import {signIn, signOut} from "next-auth/react"
import { toast } from "sonner"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header({section, session}) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    // Disable body scroll when menu is open
    useEffect(() => {
        if (menuIsOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Clean up just in case
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuIsOpen]);

    return (

        <div
            className={`flex flex-col w-full overscroll-none sticky top-0 bg-background ${menuIsOpen ? "h-screen overscroll-none" : ""}`}>
            <div className={"flex justify-between h-25 w-full items-center relative"}>
                <ProfileMenu session={session}/>
                <div className={"flex collapse md:visible gap-5 items-end absolute right-0 h-full"}>
                    <div
                        className={`flex items-center pb-4  w-fit ${section === "photos" ? "border-b border-white" : ""}`}>
                        <Link href={"/"} className={"text-xl cursor-pointer"}>PHOTOS</Link>
                    </div>
                    <div
                        className={`flex items-center pb-4 w-fit ${section === "collections" ? "border-b border-white" : ""}`}>
                        <Link href={"/collections"} className={"text-xl cursor-pointer"}>COLLECTIONS</Link>
                    </div>
                    <div
                        className={`flex items-center pb-4 w-fit ${section === "about" ? "border-b border-white" : ""}`}>
                        <Link href={"/about"} className={"text-xl cursor-pointer"}>ABOUT</Link>
                    </div>
                </div>
                <div className={"flex h-full items-end pb-4 visible md:collapse absolute right-0 cursor-pointer "}
                     onClick={() => setMenuIsOpen(!menuIsOpen)}>
                    {menuIsOpen ? <X/> : <Menu/>}
                </div>
            </div>

            {
                menuIsOpen &&
                <div className={""}>
                    <div className={"flex flex-col gap-5 md:collapse h-full"}>
                        <div className={`flex items-center w-fit ${section === "photos" ? "font-bold" : ""}`}>
                            <Link href={"/"} className={"text-xl cursor-pointer"}>PHOTOS</Link>
                        </div>
                        <div className={`flex items-center w-fit ${section === "collections" ? "font-bold" : ""}`}>
                            <Link href={"/collections"} className={"text-xl cursor-pointer"}>COLLECTIONS</Link>
                        </div>
                        <div className={`flex items-center w-fit ${section === "about" ? "font-bold" : ""}`}>
                            <Link href={"/about"} className={"text-xl cursor-pointer"}>ABOUT</Link>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

function ProfileMenu({session}) {
    return (
        <div className={"flex items-end h-full pb-4"}>
            <DropdownMenu className={"relative"}>
                <DropdownMenuTrigger className={" flex items-end text-3xl cursor-pointer"}>
                    <p>{session?.user?.displayName ?? "childishbenito"}</p>
                    {session && <p className={"ml-2 text-sm"}>{"(admin)"}</p>}
                </DropdownMenuTrigger>
                <DropdownMenuContent className={""} align="start" onCloseAutoFocus={(e) => e.preventDefault()}>
                    <DropdownMenuLabel>
                        Admin
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    {!session &&
                        <DropdownMenuItem onClick={() => signIn()}>
                            Sign in
                        </DropdownMenuItem>
                    }
                    {session &&
                        <DropdownMenuItem onClick={() => {
                            signOut({})

                        }}>
                            Sign Out
                        </DropdownMenuItem>
                    }

                </DropdownMenuContent>


            </DropdownMenu>
            {/*<a className={"flex items-end h-full pb-4 text-3xl cursor-pointer"}>{username}</a>*/}
        </div>
    )
}