import Link from "next/link"
import {prisma} from "@acme/db"
import {oneDay} from "@acme/utils";
import {Button} from "@acme/components";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Cars',
    description: 'Cars',
}

export const revalidate = oneDay

const Page = async () => {
    const cars = await prisma.car.findMany()
    return <div className='flex flex-col justify-center space-y-4'>
        {
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