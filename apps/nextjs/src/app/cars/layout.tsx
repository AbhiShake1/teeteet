import {PropsWithChildren} from "react";

export default function CarLayout({children}: PropsWithChildren) {
    return <div className='flex flex-col'>
        <div className='grid grid-cols-1 gap-16 mx-auto lg:mx-0 md:grid-cols-3 px-16 pt-24'>
            {children}
        </div>
        <div className='h-16'/>
    </div>
}