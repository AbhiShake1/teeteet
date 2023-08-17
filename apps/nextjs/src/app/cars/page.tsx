import Link from "next/link"
import {prisma} from "@acme/db"
import {oneDay} from "@acme/utils";
import {GridTileImage, TCard} from "@acme/components";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: 'Cars',
    description: 'Cars',
}

export const revalidate = oneDay

const Page = async () => {
    const cars = await prisma.car.findMany()
    return <div className='grid grid-cols-1 gap-16 mx-auto lg:mx-0 md:grid-cols-3 px-16 pt-24'>
        {
            cars.map(({id}) => (
                <TCard key={id}>
                    <Link href={`/cars/${id}`} className='relative flex flex-col items-center gap-4 duration-700 group h-[30vh]'>
                        <GridTileImage
                            isInteractive
                            alt='Car 1'
                            label={{
                                title: 'Car 1',
                                amount: '120000',
                                currencyCode: 'NRS'
                            }}
                            src='/bg.png'
                            fill
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        />
                    </Link>
                </TCard>
            ))
        }
    </div>
}

export default Page;