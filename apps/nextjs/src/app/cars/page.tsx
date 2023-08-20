import {oneDay} from "@acme/utils";
import {Metadata} from "next";
import React from "react";
import {CarList} from "../../components/car-list";
import {getRecommendedCars} from "@acme/api";

export const metadata: Metadata = {
    title: 'Cars',
    description: 'Cars',
}

export const revalidate = oneDay

const Page = async () => {
    const cars = await getRecommendedCars({page: 1})

    return (
        <CarList initialCars={cars} fetchMore={getRecommendedCars}/>
    )
}

export default Page;