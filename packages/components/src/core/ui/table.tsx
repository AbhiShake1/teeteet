"use client"

import * as React from "react"

import {cn} from "@acme/utils"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    Table,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table"
import {
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "."
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    Cross2Icon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    MixerHorizontalIcon
} from "@radix-ui/react-icons"

const Table = React.forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement>
>(({className, ...props}, ref) => (
    <div className="w-full overflow-auto">
        <table
            ref={ref}
            className={cn("w-full caption-bottom text-sm", className)}
            {...props}
        />
    </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
    <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0", className)}
        {...props}
    />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
    <tfoot
        ref={ref}
        className={cn("bg-primary font-medium text-primary-foreground", className)}
        {...props}
    />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({className, ...props}, ref) => (
    <tr
        ref={ref}
        className={cn(
            "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
            className
        )}
        {...props}
    />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
    <th
        ref={ref}
        className={cn(
            "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        {...props}
    />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
    <td
        ref={ref}
        className={cn(
            "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        {...props}
    />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
>(({className, ...props}, ref) => (
    <caption
        ref={ref}
        className={cn("mt-4 text-sm text-muted-foreground", className)}
        {...props}
    />
))
TableCaption.displayName = "TableCaption"

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>
}

export function DataTableViewOptions<TData>({table}: DataTableViewOptionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    <MixerHorizontalIcon className="mr-2 h-4 w-4"/>
                    View
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" && column.getCanHide()
                    )
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// interface DataTableFacetedFilter<TData, TValue> {
//     column?: Column<TData, TValue>
//     title?: string
//     options: {
//         label: string
//         value: string
//         icon?: React.ComponentType<{ className?: string }>
//     }[]
// }
//
// export function DataTableFacetedFilter<TData, TValue>({column, title, options}: DataTableFacetedFilter<TData, TValue>) {
//     const facets = column?.getFacetedUniqueValues()
//     const selectedValues = new Set(column?.getFilterValue() as string[])
//
//     return (
//         <Popover>
//             <PopoverTrigger asChild>
//                 <Button variant="outline" size="sm" className="h-8 border-dashed">
//                     <PlusCircledIcon className="mr-2 h-4 w-4"/>
//                     {title}
//                     {selectedValues?.size > 0 && (
//                         <>
//                             <Separator orientation="vertical" className="mx-2 h-4"/>
//                             <Badge
//                                 variant="secondary"
//                                 className="rounded-sm px-1 font-normal lg:hidden"
//                             >
//                                 {selectedValues.size}
//                             </Badge>
//                             <div className="hidden space-x-1 lg:flex">
//                                 {selectedValues.size > 2 ? (
//                                     <Badge
//                                         variant="secondary"
//                                         className="rounded-sm px-1 font-normal"
//                                     >
//                                         {selectedValues.size} selected
//                                     </Badge>
//                                 ) : (
//                                     options
//                                         .filter((option) => selectedValues.has(option.value))
//                                         .map((option) => (
//                                             <Badge
//                                                 variant="secondary"
//                                                 key={option.value}
//                                                 className="rounded-sm px-1 font-normal"
//                                             >
//                                                 {option.label}
//                                             </Badge>
//                                         ))
//                                 )}
//                             </div>
//                         </>
//                     )}
//                 </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-[200px] p-0" align="start">
//                 <Command>
//                     <CommandInput placeholder={title}/>
//                     <CommandList>
//                         <CommandEmpty>No results found.</CommandEmpty>
//                         <CommandGroup>
//                             {options.map((option) => {
//                                 const isSelected = selectedValues.has(option.value)
//                                 return (
//                                     <CommandItem
//                                         key={option.value}
//                                         onSelect={() => {
//                                             if (isSelected) {
//                                                 selectedValues.delete(option.value)
//                                             } else {
//                                                 selectedValues.add(option.value)
//                                             }
//                                             const filterValues = Array.from(selectedValues)
//                                             column?.setFilterValue(
//                                                 filterValues.length ? filterValues : undefined
//                                             )
//                                         }}
//                                     >
//                                         <div
//                                             className={cn(
//                                                 "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
//                                                 isSelected
//                                                     ? "bg-primary text-primary-foreground"
//                                                     : "opacity-50 [&_svg]:invisible"
//                                             )}
//                                         >
//                                             <CheckIcon className={cn("h-4 w-4")}/>
//                                         </div>
//                                         {option.icon && (
//                                             <option.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
//                                         )}
//                                         <span>{option.label}</span>
//                                         {facets?.get(option.value) && (
//                                             <span
//                                                 className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
//                         {facets.get(option.value)}
//                       </span>
//                                         )}
//                                     </CommandItem>
//                                 )
//                             })}
//                         </CommandGroup>
//                         {selectedValues.size > 0 && (
//                             <>
//                                 <CommandSeparator/>
//                                 <CommandGroup>
//                                     <CommandItem
//                                         onSelect={() => column?.setFilterValue(undefined)}
//                                         className="justify-center text-center"
//                                     >
//                                         Clear filters
//                                     </CommandItem>
//                                 </CommandGroup>
//                             </>
//                         )}
//                     </CommandList>
//                 </Command>
//             </PopoverContent>
//         </Popover>
//     )
// }

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({table}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {/*{table.getColumn("status") && (*/}
                {/*    <DataTableFacetedFilter*/}
                {/*        column={table.getColumn("status")}*/}
                {/*        title="Status"*/}
                {/*        options={statuses}*/}
                {/*    />*/}
                {/*)}*/}
                {/*{table.getColumn("priority") && (*/}
                {/*    <DataTableFacetedFilter*/}
                {/*        column={table.getColumn("priority")}*/}
                {/*        title="Priority"*/}
                {/*        options={priorities}*/}
                {/*    />*/}
                {/*)}*/}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4"/>
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table}/>
        </div>
    )
}

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export function DataTablePagination<TData>({
                                               table,
                                           }: DataTablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize}/>
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
    )
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table}/>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table}/>
        </div>
    )
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
}
