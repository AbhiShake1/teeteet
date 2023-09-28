import {prisma} from '@acme/db'
import {getCarDetail} from "@acme/api";
import {ReactElement} from "react";
import {threeDays} from "@acme/utils";
import {Button} from "@acme/components";

interface Props {
    params: {
        id: string
    }
}

export const revalidate = threeDays

export const generateStaticParams = async () => {
    const cars = await prisma.car.findMany({select: {id: true}})
    return cars.map(({id}) => ({id}))
}

const Page = async ({params: {id}}: Props) => {
    const car = await getCarDetail(id)

    return <div className='flex flex-col space-y-2 mx-4 mt-12'>
        <div className='flex flex-row justify-between'>
            <h1 className="text-3xl font-extrabold tracking-tight">
                {car.model}
            </h1>
            <div className='flex flex-row space-x-12'>
                <h1 className="text-3xl font-extrabold tracking-tight">
                    Rs.{car.price}
                </h1>
                <Button variant='secondary'>Calculate EMI</Button>
            </div>
        </div>
    </div>
}

Page.getLayout = (page: ReactElement) => <div className='bg-red-400'>{page}</div>

export default Page
