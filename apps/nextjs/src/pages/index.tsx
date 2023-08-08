import {Button, Card, CardContent, CardHeader, CardTitle} from "@acme/components";
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
                    <div className='flex-1'/>
                    <div className='flex-shrink'><InfoCard/></div>
                </div>
                {/*{coords?.latitude} {coords?.longitude}*/}
                {/*<CreateAccountForm/>*/}
            </main>
        </>
    );
}

const InfoCard = () => {
    return (
        <Card className='w-full pr-16'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">

                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1K+</div>
                <p className="text-xs text-muted-foreground">
                    Happy customers
                </p>
            </CardContent>
        </Card>
    )
}

export default Home