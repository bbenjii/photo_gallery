import Image from "next/image";
import { Menu } from 'lucide-react';
import Header from "../components/header"
import ImagesContainer from "@/components/Images_container";
import { auth, signIn } from "@/auth"
import {signin} from "@/app/actions/auth";
import PhotoUpload from "@/components/upload-photo";



export default async function Home() {
    const session = await auth()


    return (
    <div className="flex h-screen w-screen items-center  overscroll-y-auto flex-col font-[family-name:var(--font-geist-sans)]">
      <main className="flex items-center flex-col md:w-200 lg:w-250 xl:w-350 2xl:450 px-5 md:px-15 relative ">
          {session && <PhotoUpload/>}
          <Header section={"photos"} session={session} />
          <div className={"py-10"}>
              <ImagesContainer columnsNumber={2} session={session}/>
          </div>

      </main>
          <footer className="py-5 flex gap-[24px] flex-wrap items-center justify-center">
              <a className="flex items-center gap-2 hover:underline hover:underline-offset-4">
                  @benollomo
              </a>
        </footer>
    </div>
    );
}
