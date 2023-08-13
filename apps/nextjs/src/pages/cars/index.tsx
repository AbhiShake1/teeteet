import {NextPage, GetStaticProps} from "next";
import {prisma, Car} from "@acme/db"

interface Props {
    cars: Car[]
}

export const getStaticProps: GetStaticProps = async () => {
    const cars = await prisma.car.findMany()
    return {props: {cars}}
}

const Index: NextPage<Props> = ({cars}) => {
    return <>{JSON.stringify(cars)}</>
}

export default Index;