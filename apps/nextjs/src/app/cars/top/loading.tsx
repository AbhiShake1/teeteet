import {Skeleton, TCard} from "@acme/components";
import React from "react";

export default function Loading() {
    return (
        Array.from({length: 12}).map((_, idx) => (
            <TCard key={idx}>
                <Skeleton className='h-[30vh]'/>
            </TCard>
        ))
    )
}