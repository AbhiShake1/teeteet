"use client"

// src/pages/_app.tsx
import "@acme/components/src/styles/globals.css";
import {ClerkProvider, useAuth, UserButton} from "@clerk/nextjs";
import {api} from "../utils/trpc";
import React, {useMemo} from "react";
import {useTheme} from "next-themes"
import {dark} from '@clerk/themes';
import {
    TThemeProvider,
    TNavigationMenu,
    TDarkModeToggle,
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@acme/components";
import {TContextMenu} from "@acme/components/src/core/TContextMenu";
import {useRouter} from 'next/navigation';
import {Lato} from 'next/font/google'
import {NextPage} from "next";

const font = Lato({
    subsets: ['latin'],
    weight: "900"
})

type AppProps = {
    children: React.ReactNode
}

const RootLayout: NextPage<AppProps> = ({children}) => {
    const {back, forward, refresh} = useRouter()
    const canGoBack = useMemo(() => {
        if (typeof window == 'undefined') return false
        // since 1 can be new tab
        return window.history.length > 2
    }, [])
    const canGoForward = useMemo(() => {
        if (typeof window == 'undefined') return false
        return window.history.length > window.history.state.index + 1
    }, [])

    return (
        <main className={font.className}>
            <TContextMenu canGoBack={canGoBack} canGoForward={canGoForward} onBack={back} onReload={refresh}
                          onForward={forward}>
                <TThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    <App>
                        {children}
                    </App>
                </TThemeProvider>
            </TContextMenu>
        </main>
    );
}

const App: React.FunctionComponent<AppProps> = ({children}) => {
    const {theme} = useTheme()

    return (
        <>
            <TNavBar/>
            {children}
        </>
    )

    return (
        <ClerkProvider appearance={{
            baseTheme: theme == 'dark' ? dark : undefined,
        }}>
            <TNavBar/>
            {children}
        </ClerkProvider>
    )
}

const TNavBar = () => {
    // const {isSignedIn} = useAuth()
    const isSignedIn = false

    return (
        <nav className='flex flex-row items-center justify-center my-4 py-4 mx-8'>
            <TNavigationMenu/>
            <div className='fixed right-16'>{isSignedIn && <UserButton/>}</div>
            {/*<TDarkModeToggle className='fixed right-36'/>*/}
        </nav>
    )
}

export default api.withTRPC(RootLayout);