// src/pages/_app.tsx
import "@acme/components/src/styles/globals.css";
import type {AppType} from "next/app";
import {ClerkProvider, useAuth, UserButton} from "@clerk/nextjs";
import {trpc} from "../utils/trpc";
import React from "react";
import {useTheme} from "next-themes"
import {dark} from '@clerk/themes';
import {TDarkModeToggle, TNavigationMenu, TThemeProvider} from "@acme/components";

type AppProps = {
    children: React.ReactNode
}

const MyApp: AppType = ({Component, pageProps: {...pageProps}}) => {
    return (
        <TThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <App>
                <Component {...pageProps} />
            </App>
        </TThemeProvider>
    );
}

const App: React.FunctionComponent<AppProps> = ({children}) => {
    const {theme} = useTheme()
    console.log(theme)

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
    const {isSignedIn} = useAuth()

    return (
        <nav className='flex flex-row items-center justify-center my-4 py-4 mx-8'>
            <TNavigationMenu/>
            <div className='fixed right-16'>{isSignedIn && <UserButton/>}</div>
            <TDarkModeToggle className='fixed right-36'/>
        </nav>
    )
}

export default trpc.withTRPC(MyApp);
