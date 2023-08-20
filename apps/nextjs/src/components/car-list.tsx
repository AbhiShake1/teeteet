"use client"

import React, {FunctionComponent, useState} from "react";
import {CarLoadingSkeleton, GridTileImage, TCard} from "@acme/components";
import Link from "next/link";
import {PaginatedRequest} from "@acme/api";
import {Car} from '@acme/db'
import {useSearchParams} from "next/navigation";
import {useAfterLayoutEffect, useDebouncedValue, useIntersection} from "@acme/hooks";

type Props = {
    initialCars: Car[]
    fetchMore: ({page, search}: PaginatedRequest) => Promise<Car[]>
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CarList: FunctionComponent<Props> = ({initialCars, fetchMore}) => {
    const [cars, setCars] = useState(initialCars)
    const [page, setPage] = useState(1)
    const {ref} = useIntersection({
        threshold: 1,
        onIntersect() {
            fetchMore({page: page + 1, search: debouncedSearch}).then(cars => {
                if (cars.length > 0) {
                    setCars(c => [...c, ...cars])
                }
            })
            setPage(p => p + 1)
        }
    })

    const search = useSearchParams().get('model') ?? ''
    const [debouncedSearch] = useDebouncedValue(search)

    useAfterLayoutEffect(() => {
        fetchMore({search: debouncedSearch}).then(res => {
            if (res.length > 0) {
                setCars(res)
            }
        })
    }, [debouncedSearch])

    return ([
        ...cars.map(({id, model, price, imageUrl}) => (
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
        )),
        <>{Array.from({length: 3}).map((_, i) => (<div ref={ref} key={i}><CarLoadingSkeleton/></div>))}</>
    ])
}