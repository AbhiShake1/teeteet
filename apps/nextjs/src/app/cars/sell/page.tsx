"use client"

import { NextPage, GetStaticProps } from "next";

interface Props {
    title: string
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return { props: { title: 'Sell' } }
}

const Page: NextPage<Props> = ({title}) => {
    return <>{title}</>
}

export default Page;