"use client"

import {useEffect, useState} from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

export function ImageCarousel({images, current, setCurrent, count, setCount}) {
    const [api, setApi] = useState()
    // const [current, setCurrent] = useState(0)
    // const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <div className="mx-auto max-w-xs">
            <Carousel setApi={setApi} className="w-full max-w-xs">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <Card className={""}>
                                <CardContent className="m-0 flex aspect-square items-center justify-center">
                                    <div key={index} className={""}>
                                        <Image
                                            key={index}
                                            src={`/photos/${image}`}
                                            alt={`Image ${index}`}
                                            width={500}
                                            height={500}
                                            // fill
                                            className=""
                                            // style={{ height: "auto", display: "block" }}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}