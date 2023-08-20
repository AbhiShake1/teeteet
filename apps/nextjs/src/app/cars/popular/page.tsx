import {Metadata} from "next";
import {oneDay} from "@acme/utils";
import {getPopularCars} from "@acme/api";
import React from "react";
import {CarList} from "../../../components/car-list";

export const metadata: Metadata = {
    title: 'Popular Cars',
    description: 'Popular Cars',
}

export const revalidate = oneDay

const Page = async () => {
    const cars = await getPopularCars()

    return (
        <CarList initialCars={cars} fetchMore={getPopularCars}/>
    )
}

export default Page;