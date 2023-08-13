import {router} from "../trpc";
import {postRouter} from "./post";
import {authRouter} from "./auth";
import {adminRouter} from "./admin";

export const appRouter = router({
    post: postRouter,
    auth: authRouter,
    admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
