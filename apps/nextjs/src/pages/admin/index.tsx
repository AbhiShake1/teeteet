import {api} from "../../utils/trpc";
// import {Tabs, TabsContent, TabsList, TabsTrigger} from "@acme/components";
import {FunctionComponent} from "react";
import {NotFound} from "next/dist/client/components/error";
import * as React from "react"
import {ColumnDef} from "@tanstack/react-table"
import {
    Button,
    Checkbox,
    DataTable, Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Label, Input
} from "@acme/components"
import {useForm} from "react-hook-form"
import {ArrowUpDown, Plus} from "lucide-react"
import {ReloadIcon} from "@radix-ui/react-icons"

const Index = () => {
    const tablesQuery = api.admin.allTables.useQuery()

    if (!tablesQuery.isSuccess) return null

    const tables = tablesQuery.data

    return <div className='flex justify-center'>
        {/*<Tabs defaultValue={tables[0]} className='text-center'>*/}
        {/*    <TabsList>*/}
        {/*        {tables.map(table => (*/}
        {/*            <TabsTrigger key={table} value={table}>{table}</TabsTrigger>*/}
        {/*        ))}*/}
        {/*    </TabsList>*/}
        {/*    {tables.map(table => (*/}
        {/*        <TabsContent key={table} value={table}>*/}
        {/*            <Table tableName={table}/>*/}
        {/*        </TabsContent>*/}
        {/*    ))}*/}
        {/*</Tabs>*/}
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
    tableName: string
}

const Table: FunctionComponent<TableProps> = ({tableName}) => {
    const tableDetail = api.admin.getDetail.useQuery(tableName)
    const createMutation = api.admin.create.useMutation()
    const form = useForm()

    if (tableDetail.isLoading) return null
    if (tableDetail.isError) return <NotFound/>

    const {name, fields, values} = tableDetail.data

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
                                table: tableName,
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