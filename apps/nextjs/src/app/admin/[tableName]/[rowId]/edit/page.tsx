"use client"

import {useParams} from "next/navigation";

const Page = () => {
    const {rowId} = useParams()
    return <h1>{rowId as string}</h1>
}

export default Page