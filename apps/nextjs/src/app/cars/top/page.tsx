import {Metadata} from "next";
import {oneDay} from "@acme/utils";
import {getTopSellingCars} from "@acme/api";
import React from "react";
import {CarList} from "../../../components/car-list";

export const metadata: Metadata = {
    title: 'Top Cars',
}
export const revalidate = oneDay

const Page = async () => {
    const cars = await getTopSellingCars()

    return (
        <CarList initialCars={cars} fetchMore={getTopSellingCars}/>
    )
}
export default Page;