import {Button, Card, CardContent, CardHeader, CardTitle} from "@acme/components";
import type {NextPage} from "next";
import Head from "next/head";
import React from "react";
import {Line, LineChart, ResponsiveContainer} from "recharts"
import {api} from "../utils/trpc";

const Home: NextPage = () => {
    api.post.all.useQuery()
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
                    bg-[url(https://wallpapercave.com/wp/wp10472052.jpg)] h-[88vh]'>
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
                <div className='w-full flex flex-col items-end justify-end'>
                    <div className='flex-shrink'><InfoCard/></div>
                </div>
                {/*{coords?.latitude} {coords?.longitude}*/}
                {/*<CreateAccountForm/>*/}
            </main>
        </>
    );
}


const data = [
    {
        revenue: 10400,
        subscription: 240,
    },
    {
        revenue: 14405,
        subscription: 300,
    },
    {
        revenue: 9400,
        subscription: 200,
    },
    {
        revenue: 8200,
        subscription: 278,
    },
    {
        revenue: 7000,
        subscription: 189,
    },
    {
        revenue: 9600,
        subscription: 239,
    },
    {
        revenue: 11244,
        subscription: 278,
    },
    {
        revenue: 26475,
        subscription: 189,
    },
]

const InfoCard = () => {
    return (
        <Card className='w-96'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">

                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1K+</div>
                <p className="text-xs text-muted-foreground">
                    Happy customers
                </p>
                <div className="h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{top: 5, right: 10, left: 10, bottom: 0}}
                        >
                            <Line
                                type="monotone"
                                strokeWidth={2}
                                dataKey="revenue"
                                dot={{r: 0}}
                                stroke="hsl(0 72.2% 50.6%)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default Home