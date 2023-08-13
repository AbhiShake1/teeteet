import {NextPage, GetStaticProps, InferGetStaticPropsType} from "next";
import {prisma} from "@acme/db"

export const getStaticProps: GetStaticProps = async () => {
    const cars = await prisma.car.findMany()
    return {props: {cars}}
}

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({cars}) => {
    return <>{JSON.stringify(cars)}</>
}

export default Index;