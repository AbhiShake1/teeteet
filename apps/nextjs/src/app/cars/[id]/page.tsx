import {oneDay} from "@acme/utils";
import {prisma} from '@acme/db'

interface Props {
    params: {
        id: string
    }
}

export const revalidate = oneDay

export const generateStaticParams = async () => {
    const cars = await prisma.car.findMany({select: {id: true}})
    return cars.map(({id}) => ({id}))
}

const Page = async ({params: {id}}: Props) => {
    const car = await prisma.car.findUniqueOrThrow({where: {id}})

    return <div className='flex flex-col space-y-2 ml-4'>
        <code>hello</code>
        <div>hello</div>
        <div>{JSON.stringify(car)}</div>
    </div>
}

export default Page
