import {oneDay} from "@acme/utils";
import {Metadata} from "next";
import React from "react";
import {CarService} from "@acme/api";
import {CarList} from "../../components/car-list";

export const metadata: Metadata = {
    title: 'Cars',
    description: 'Cars',
}

export const revalidate = oneDay

const Page = async () => {
    const cars = await CarService.getRecommended()
    return (
        <CarList initialCars={cars}/>
    )
}

export default Page;