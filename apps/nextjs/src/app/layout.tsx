import "@acme/components/src/styles/globals.css";
import {UserButton} from "@clerk/nextjs";
import React from "react";
import {TNavigationMenu, TThemeProvider} from "@acme/components";
import {Lato} from 'next/font/google'
import {ContextMenuProvider} from "../components/context-menu-provider";
import {AuthProvider} from "../components/auth-provider";
import {NavBar} from "../components/nav-bar";

const font = Lato({
    subsets: ['latin'],
    weight: "900"
})

type AppProps = {
    children: React.ReactNode
}

const RootLayout: React.FunctionComponent<AppProps> = ({children}) => {
    return (
        <html lang="en">
        <body className={font.className}>
        <AuthProvider>
            <ContextMenuProvider>
                <TThemeProvider attribute="class" defaultTheme="dark">
                    <NavBar/>
                    {children}
                </TThemeProvider>
            </ContextMenuProvider>
        </AuthProvider>
        </body>
        </html>
    )
}

export default RootLayout;
