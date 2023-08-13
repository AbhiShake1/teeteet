import {NextPage, GetStaticProps, GetStaticPaths} from 'next'
import {oneDay} from "@acme/utils";
import {prisma, Car} from '@acme/db'

interface Props {
    car: Car
}

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
    const id = params?.id as string
    const car = await prisma.car.findUniqueOrThrow({where: {id}})
    return {props: {car}, revalidate: oneDay}
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await prisma.car.findMany()
    return {paths: posts?.map(({id}) => ({params: {id}})) ?? [], fallback: false}
}

const Index: NextPage<Props> = ({car}) => {
    return <div className='flex flex-col space-y-2 ml-4'>
        <code>hello</code>
        <div>hello</div>
        <div>{JSON.stringify(car)}</div>
    </div>
}

export default Index
