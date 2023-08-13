import { NextPage, GetStaticProps } from "next";

interface Props {
    title: string
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return { props: { title: 'Popular' } }
}

const Index: NextPage<Props> = ({title}) => {
    return <>{title}</>
}

export default Index;