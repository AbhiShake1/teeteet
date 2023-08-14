import {api} from "../../utils/trpc";
import {
    Button,
    Checkbox,
    DataTable,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@acme/components";
import * as React from "react";
import {FunctionComponent} from "react";
import {ColumnDef} from "@tanstack/react-table"
import {useForm} from "react-hook-form"
import {ArrowUpDown, Plus} from "lucide-react"
import {ReloadIcon} from "@radix-ui/react-icons"
import {Prisma, prisma} from '@acme/db'
import {GetStaticProps, InferGetStaticPropsType, NextPage} from "next";
import {oneHour} from "@acme/utils";

export const getStaticProps: GetStaticProps = async () => {
    const tableNames = Object.keys(Prisma.ModelName)
    const tablesPromise = tableNames.map(async (table) => {
        const {name, fields} = Prisma.dmmf.datamodel.models.find(m => m.name == table)!
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const values = await prisma[name].findMany()
        return {name, fields, values}
    })
    const tables = await Promise.all(tablesPromise)

    return {
        props: {tables},
        revalidate: oneHour,
    }
}

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({tables}) => {
    return <div className='flex justify-center'>
        <Tabs defaultValue={tables[0].name} className='text-center'>
            <TabsList>
                {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    tables.map(({name}) => (
                        <TabsTrigger key={name} value={name}>{name}</TabsTrigger>
                    ))
                }
            </TabsList>
            {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                tables.map((table) => (
                    <TabsContent key={table.name} value={table.name} className='text-left'>
                        <Table {...table}/>
                    </TabsContent>
                ))
            }
        </Tabs>
    </div>
}

// <DropdownMenu>
// <DropdownMenuTrigger asChild>
// <Button variant="ghost" className="h-8 w-8 p-0">
//     <span className="sr-only">Open menu</span>
// <MoreHorizontal className="h-4 w-4"/>
// </Button>
// </DropdownMenuTrigger>
// <DropdownMenuContent align="end">
//     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//     <DropdownMenuItem
//         onClick={() => navigator.clipboard.writeText(payment.id)}
//     >
//         Copy payment ID
//     </DropdownMenuItem>
//     <DropdownMenuSeparator/>
//     <DropdownMenuItem>View customer</DropdownMenuItem>
//     <DropdownMenuItem>View payment details</DropdownMenuItem>
// </DropdownMenuContent>
// </DropdownMenu>

interface TableProps {
    name: string,
    fields: Prisma.DMMF.Field[],
    values: any
}

const Table: FunctionComponent<TableProps> = ({name, fields, values}) => {
    const createMutation = api.admin.create.useMutation()
    const form = useForm()

    const cols: ColumnDef<typeof values>[] = [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        ...fields.map(field => ({
            id: field.name,
            accessorKey: field.name,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            header: ({column}) => {
                return (
                    <Button
                        className='capitalize'
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        {field.name}
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cell: ({row}) => (
                <div className="capitalize">{row.getValue(field.name)}</div>
            ),
            enableHiding: true,
            enableSorting: true,
        })),
        {
            id: "select",
            header: () => (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size='sm' className='scale-75'><Plus/></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add {name}</DialogTitle>
                            <DialogDescription>
                                Add new {name} here. Click Add {name} when you are done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {
                                fields.map(({name, isId, isRequired, type}) => {
                                    return !isId && <div key={name} className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor={name} className="text-right capitalize">{name}</Label>
                                        {type == 'String' &&
                                            <Input id={name} className="col-span-3" required={isRequired}/>}
                                        {type == 'Int' && <Input id={name} className="col-span-3" required={isRequired}
                                                                 type="number"/>}
                                    </div>
                                })
                            }
                        </div>
                        <DialogFooter>
                            {!createMutation.isLoading && <Button type="submit" onClick={() => createMutation.mutate({
                                table: name,
                                data: {}
                            })}>Add {name}</Button>}
                            {createMutation.isLoading && <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                Adding {name}...
                            </Button>}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            ),
        },
    ]

    return <div className='mt-16'>
        <DataTable data={values} columns={cols}/>
    </div>
}

export default Index;