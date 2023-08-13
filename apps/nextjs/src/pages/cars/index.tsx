import {NextPage, GetStaticProps, InferGetStaticPropsType} from "next";
import {prisma} from "@acme/db"
import {oneDay} from "@acme/utils";

export const getStaticProps: GetStaticProps = async () => {
    const cars = await prisma.car.findMany()
    return {props: {cars}, revalidate: oneDay}
}

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({cars}) => {
    return <>{JSON.stringify(cars)}</>
}

export default Index;