import type {NextPage} from "next";
import Head from "next/head";
import React, {useEffect, useState} from "react";
import {CreateAccountForm} from "../components/forms/CreateAccount";

const Home: NextPage = () => {
    const [coords, setCoords] = useState<GeolocationCoordinates | null>(null)

    useEffect(() => {
        navigator.geolocation.watchPosition(({coords}) => {
            setCoords(coords)
        })
        return () => navigator.geolocation.clearWatch(1)
    }, [])
    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className='flex items-center justify-center'>
                {coords?.latitude} {coords?.longitude}
                <CreateAccountForm/>
            </main>
        </>
    );
}

export default Home