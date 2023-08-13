import {prisma} from "@acme/db";
import {type inferAsyncReturnType} from "@trpc/server";
import {type CreateNextContextOptions} from "@trpc/server/adapters/next";
import {getAuth} from "@clerk/nextjs/server";
import type {
    SignedInAuthObject,
    SignedOutAuthObject,
} from "@clerk/nextjs/api";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type AuthContextProps = {
    // a trade-off i had to make for now. TODO(AbhiShake1): Remove undefined from type once i come across the solution
    auth: SignedInAuthObject | SignedOutAuthObject | undefined;
};

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = async ({auth}: AuthContextProps) => {
    return {
        auth,
        prisma,
    };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions | undefined) => {
    return await createContextInner({auth: opts ? getAuth(opts.req) : undefined});
};

export type Context = inferAsyncReturnType<typeof createContext>;
