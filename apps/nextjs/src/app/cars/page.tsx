import Link from "next/link"
import {prisma} from "@acme/db"
import {oneDay} from "@acme/utils";
import {Button, TCard} from "@acme/components";
import {Metadata} from "next";

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
                    <Link
                        href={`/cars/${id}`}
                        target="_blank"
                        className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
                    >
                    </Link>
                </TCard>
            ))
        }
    </div>
}

export default Page;