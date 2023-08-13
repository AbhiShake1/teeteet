import { NextPage, GetStaticProps } from "next";

interface Props {
    title: string
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return { props: { title: 'Recommendations' } }
}

const Index: NextPage<Props> = ({title}) => {
    return <>{title}</>
}

export default Index;