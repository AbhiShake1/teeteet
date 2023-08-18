import {Skeleton} from "@acme/components";
import * as React from "react";

export default function Loading() {
    return <div className='flex flex-col space-y-4 mt-16'>
        <div className='flex flex-row justify-between'>
            <Skeleton className='h-8 w-[150px] lg:w-[250px]'/>
            <Skeleton className="ml-auto hidden h-8 w-24 lg:flex"/>
        </div>
        <Skeleton className='h-[36rem]'/>
        <div className='flex flex-row space-x-2'>
            <Skeleton className='h-8 w-[150px]'/>
            <div className='flex-1'/>
            <Skeleton className='h-8 w-[150px]'/>
            <div className='px-8'><Skeleton className='h-8 w-24'/></div>
            <Skeleton className='h-8 w-8'/>
            <Skeleton className='h-8 w-8'/>
            <Skeleton className='h-8 w-8'/>
            <Skeleton className='h-8 w-8'/>
        </div>
    </div>
}