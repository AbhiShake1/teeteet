// src/utils/trpc.ts
import {createTRPCNext} from "@trpc/next";
import {httpBatchLink, loggerLink} from "@trpc/client";
import {inferRouterInputs, inferRouterOutputs} from "@trpc/server";
import type {AppRouter} from "@acme/api";
import {transformer} from "@acme/api/transformer";
import {appRouter, createContext} from "@acme/api";
import {createSSGHelpers} from "@trpc/react-query/ssg"

const getBaseUrl = () => {
    if (typeof window !== "undefined") return ""; // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const api = createTRPCNext<AppRouter>({
    config() {
        return {
            transformer,
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV === "development" ||
                        (opts.direction === "down" && opts.result instanceof Error),
                }),
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                }),
            ],
        };
    },
    ssr: false,
});

export const server = createSSGHelpers<AppRouter>({
    router: appRouter,
    transformer,
    // a trade-off i had to make for now. TODO(AbhiShake1): Give auth once i come across the solution
    ctx: await createContext(undefined),
})

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
