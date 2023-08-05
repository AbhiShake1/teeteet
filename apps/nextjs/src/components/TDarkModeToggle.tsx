"use client"

import * as React from "react"
import {MoonIcon, SunIcon} from "@radix-ui/react-icons"
import {useTheme} from "next-themes"
import {Button} from "./ui/button";

export function TDarkModeToggle() {
    const {theme} = useTheme()

    return theme == 'dark' ? <LightModeToggle/> : <DarkModeToggle/>
}

const DarkModeToggle = () => {
    const {setTheme} = useTheme()
    return <Button variant='ghost' onClick={() => setTheme('dark')}>
        <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all"/>
    </Button>
}

const LightModeToggle = () => {
    const {setTheme} = useTheme()
    return <Button variant='ghost' onClick={() => setTheme('light')}>
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] transition-all"/>
    </Button>
}
