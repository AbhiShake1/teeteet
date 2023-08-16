import {ReactNode} from "react";
import {prisma, Prisma} from "@acme/db";
import {Separator, SidebarNav} from "@acme/components";

interface Props {
    children: ReactNode
}

const AdminLayout = async ({children}: Props) => {
    const tableNames = Object.keys(Prisma.ModelName)
    const sidebarNavItems = tableNames.map(title => ({title, href: `/admin/${title}`}))

    return (
        <>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
                    <p className="text-muted-foreground">
                        Manage your content here
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 px-8">{children}</div>
                </div>
            </div>
        </>
    )
}

export default AdminLayout