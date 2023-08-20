"use client"

import React, {FunctionComponent, useState} from "react";
import {GridTileImage, TCard} from "@acme/components";
import Link from "next/link";
import {Car} from "@acme/db"

type Props = {
    initialCars: Car[]
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CarList: FunctionComponent<Props> = ({initialCars}) => {
    const [cars, setCars] = useState(initialCars)
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