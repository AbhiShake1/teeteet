"use client"

import {Input} from "@acme/components";
import React from "react";
import {usePathname, useRouter} from "next/navigation";

export function SearchBar() {
    const {replace} = useRouter()
    const path = usePathname()

    const setSearchParams = (search: string) => {
        let query = ""
        if (search.length > 0) {
            query = `?model=${search}`
        }
        replace(`${path}${query}`, {scroll: false})
    }

    return (
        <Input placeholder='Search by Model' onChange={e => setSearchParams(e.target.value)}
               className='max-w-xs bg-transparent backdrop-blur-3xl'/>
    )
}