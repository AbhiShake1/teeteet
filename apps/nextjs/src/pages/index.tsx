"use client"

import {Button, Card, CardContent, CardHeader, CardTitle, CreateAccountForm} from "@acme/components";
import type {NextPage} from "next";
import Head from "next/head";
import React, {useEffect, useState} from "react";

const Home: NextPage = () => {
    // const [coords, setCoords] = useState<GeolocationCoordinates | null>(null)
    //
    // useEffect(() => {
    //     navigator.geolocation.watchPosition(({coords}) => {
    //         setCoords(coords)
    //     })
    //     return () => navigator.geolocation.clearWatch(1)
    // }, [])

    return (
        <>
            <Head>
                <title>TeeTeet</title>
                <meta name="description" content="sell, buy, car"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className='flex flex-col items-start px-32 py-16 bg-cover bg-no-repeat mix-blend-difference
                    bg-[url(https://wallpapercave.com/wp/wp10472052.jpg)]'>
                <div className='max-w-[40vw] space-y-4'>
                    <h3 className="scroll-m-20 text-4xl font-extrabold tracking-wider lg:text-5xl lg:leading-snug leading-snug">
                        Your ultimate destination to find affordable cars!
                    </h3>
                    <h3 className="scroll-m-20 text-2xl font-semibold text-muted-foreground leading-snug">
                        Embrace Value and Variety - Explore an Array of Pre-Owned Cars with Distinctive Features!
                    </h3>
                    <div className='flex flex-row space-x-8 pt-8'>
                        <Button size='lg'>Buy Now</Button>
                        <Button size='lg' className='scale-110' variant='outline'>Explore</Button>
                    </div>
                </div>
                <div className='pt-[30vh] w-full flex flex-row'>
                    <div className='w-[100vw]'/>
                    <InfoCard/>
                </div>
                {/*{coords?.latitude} {coords?.longitude}*/}
                {/*<CreateAccountForm/>*/}
            </main>
        </>
    );
}

const InfoCard = () => {
    return (
        <Card className='w-full'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Total Revenue
                </CardTitle>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                </p>
            </CardContent>
        </Card>
    )
}

export default Home