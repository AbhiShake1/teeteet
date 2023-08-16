import {prisma, Prisma} from "@acme/db";
import * as React from "react";
import {TTable} from "@acme/components"


interface Props {
    params: {
        tableName: string
    }
}

const Page = async ({params: {tableName}}: Props) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const values = await prisma[tableName].findMany()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {name, fields} = Prisma.dmmf.datamodel.models.find(m => m.name == tableName)!
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const table = {name, fields, values}
    return <TTable {...table}/>
}

export default Page