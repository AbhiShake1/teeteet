"use client"

import {Input} from "@acme/components";
import React from "react";

export function SearchBar() {
    return (
        <Input placeholder='Search...' className='max-w-xs bg-transparent backdrop-blur-3xl'/>
    )
}