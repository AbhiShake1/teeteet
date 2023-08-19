import {Metadata} from "next";
import {oneDay} from "@acme/utils";
import {CarService} from "@acme/api";
import {GridTileImage, TCard} from "@acme/components";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: 'Popular Cars',
    description: 'Popular Cars',
}
export const revalidate = oneDay

const Page = async () => {
    const cars = await CarService.getPopular()
    return (
        cars.map(({id, model, price, imageUrl}) => (
            <TCard key={id}>
                <Link href={`/cars/${id}`}
                      className='relative flex flex-col items-center gap-4 duration-700 group h-[30vh]'>
                    <GridTileImage
                        isInteractive
                        alt={model}
                        label={{
                            title: model,
                            amount: Number(price).toString(),
                            currencyCode: 'NRS'
                        }}
                        src={imageUrl}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                </Link>
            </TCard>
        ))
    )
}

export default Page;