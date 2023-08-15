"use client"

import {NextPage, GetStaticProps, InferGetStaticPropsType} from "next";
import Link from "next/link"
import {prisma} from "@acme/db"
import {oneDay} from "@acme/utils";
import {Button} from "@acme/components";

export const getStaticProps: GetStaticProps = async () => {
    const cars = await prisma.car.findMany()
    return {props: {cars}, revalidate: oneDay}
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({cars}) => {
    return <div className='flex flex-col justify-center space-y-4'>
        {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cars.map(car => (
                <Button key={car.id}>
                    <Link href={`/cars/${car.id}`}>
                        {JSON.stringify(car)}
                    </Link>
                </Button>
            ))
        }
    </div>
}

export default Page;