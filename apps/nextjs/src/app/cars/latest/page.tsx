import {Metadata} from "next";
import {oneDay} from "@acme/utils";
import {CarService} from "@acme/api";
import React from "react";
import {CarList} from "../../../components/car-list";

export const metadata: Metadata = {
    title: 'Latest Cars',
    description: 'Latest Cars',
}

export const revalidate = oneDay

const Page = async () => {
    const cars = await CarService.getLatest()
    return (
        <CarList initialCars={cars}/>
    )
}

export default Page;