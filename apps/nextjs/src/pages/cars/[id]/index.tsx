import {NextPage, GetStaticProps, GetStaticPaths} from 'next'
import {api, server} from "../../../utils/trpc";
import {oneDay} from "@acme/utils";
import {prisma} from '@acme/db'

interface Props {
    id: string
}

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
    const id = params?.id as string
    // await server.car.byId.prefetch({id})
    return {props: {id, /*trpcState: server.dehydrate()*/}, revalidate: oneDay}
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await prisma?.post.findMany()
    return {paths: posts?.map(({id}) => ({params: {id}})) ?? [], fallback: false}
}

const Index: NextPage<Props> = ({id}) => {
    const posts = api.post.byId.useQuery(id)

    if (!posts.isSuccess) return null

    return <div className='flex flex-col space-y-2 ml-4'>
        <code>hello</code>
        <div>hello</div>
        <div>{JSON.stringify(posts.data)}</div>
    </div>
}

export default Index
