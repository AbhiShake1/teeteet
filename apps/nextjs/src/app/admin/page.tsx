import {oneHour} from "@acme/utils";

export const revalidate = oneHour

const Page = async () => {
    return <h1>Continue by selecting a table you want to view or edit</h1>
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

export default Page;