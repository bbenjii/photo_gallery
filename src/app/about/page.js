import Header from "@/components/header";

export default function AboutPage({}) {
    return (
        <div
            className="flex h-screen w-screen items-center  overscroll-y-auto flex-col font-[family-name:var(--font-geist-sans)]">
            <main className="flex items-center flex-col w-full lg:w-250 xl:w-350 2xl:450 px-5 md:px-15 relative ">
                <Header username={"childishbenito"} section={"about"}/>

            </main>
            <footer className="py-5 flex gap-[24px] flex-wrap items-center justify-center">
                <a className="flex items-center gap-2 hover:underline hover:underline-offset-4">
                    @benollomo
                </a>
            </footer>
        </div>
    )
}