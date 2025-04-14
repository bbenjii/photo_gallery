// "use client";
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import {signin} from "@/app/actions/auth";
import { signIn } from "@/auth"
import {redirect} from "next/navigation";
import { LoginForm } from "@/components/login-form"


async function handleSubmit(formData) {
    "use server"
    console.log("function called")
    let user =  await signIn("credentials", formData)


}

export default function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm  />
            </div>
        </div>
    )
}