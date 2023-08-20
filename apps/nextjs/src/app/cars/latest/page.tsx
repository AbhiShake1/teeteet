import {Metadata} from "next";
import {oneDay} from "@acme/utils";
import {getLatestCars} from "@acme/api";
import React from "react";
import {CarList} from "../../../components/car-list";

export const metadata: Metadata = {
    title: 'Latest Cars',
    description: 'Latest Cars',
}

export const revalidate = oneDay

const Page = async () => {
    const cars = await getLatestCars()

    return (
        <CarList initialCars={cars} fetchMore={getLatestCars}/>
    )
}

export default Page;