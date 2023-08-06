"use client"

import {CreateAccountForm} from "@acme/components";
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
            <main className='flex flex-col items-center justify-center'>
                {/*{coords?.latitude} {coords?.longitude}*/}
                <CreateAccountForm/>
            </main>
        </>
    );
}

export default Home