"use client"

import {useCallback, useLayoutEffect, useRef, useState} from 'react';

type Options = ConstructorParameters<typeof IntersectionObserver>[1] & {
    onIntersect?: () => void
}

export function useIntersection<T extends HTMLElement>(
    options?: Options
) {
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    const observer = useRef<IntersectionObserver | null>();

    const ref = useCallback(
        (element: T | null) => {
            if (observer.current) {
                observer.current.disconnect()
                observer.current = null
            }

            if (!element) return setEntry(null)

            observer.current = new IntersectionObserver(([_entry]) => {
                setEntry(_entry ?? null)
            }, options)

            observer.current.observe(element)
        },
        [options?.rootMargin, options?.root, options?.threshold]
    )

    useLayoutEffect(() => {
        if (entry?.isIntersecting) {
            options?.onIntersect?.call(undefined)
        }
    }, [entry?.isIntersecting])

    return {ref, entry}
}