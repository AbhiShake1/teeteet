"use client"

import {NextPage, GetStaticProps, GetStaticPaths, InferGetServerSidePropsType} from 'next'
import {oneDay} from "@acme/utils";
import {prisma} from '@acme/db'

export const getStaticProps: GetStaticProps = async ({params}) => {
    const id = params?.id as string
    const car = await prisma.car.findUniqueOrThrow({where: {id}})
    return {props: {car}, revalidate: oneDay}
}

export const getStaticPaths: GetStaticPaths = async () => {
    const cars = await prisma.car.findMany({select: {id: true}})
    return {paths: cars.map(({id}) => ({params: {id}})), fallback: false}
}

const Page: NextPage<InferGetServerSidePropsType<typeof getStaticProps>> = ({car}) => {
    return <div className='flex flex-col space-y-2 ml-4'>
        <code>hello</code>
        <div>hello</div>
        <div>{JSON.stringify(car)}</div>
    </div>
}

export default Page
