// src/pages/_app.tsx
import "../styles/globals.css";
import type {AppType} from "next/app";
import {ClerkProvider} from "@clerk/nextjs";
import {trpc} from "../utils/trpc";
import {TNavigationMenu} from "../components/TNavigationMenu";
import React from "react";
import {TThemeProvider} from "../components/TThemeProvider";
import {TDarkModeToggle} from "../components/TDarkModeToggle";

const MyApp: AppType = ({Component, pageProps: {...pageProps}}) => {
    return (
        <TThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ClerkProvider {...pageProps}>
                <nav className='flex flex-row space-x-4 items-center justify-center my-4 py-4 mx-8'>
                    <TNavigationMenu/>
                    <TDarkModeToggle className='fixed right-16'/>
                </nav>
                <Component {...pageProps} />
            </ClerkProvider>
        </TThemeProvider>
    );
};

export default trpc.withTRPC(MyApp);
