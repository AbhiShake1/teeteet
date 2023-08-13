import {Prisma} from "@acme/db";
import {TRPCError} from "@trpc/server";
import {z} from "zod";
import {publicProcedure, router} from "../trpc";

export const adminRouter = router({
    allTables: publicProcedure.query(() => {
        return Object.keys(Prisma.ModelName)
    }),
    getDetail: publicProcedure
        .input(z.string())
        .query(async ({ctx, input}) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const values = await ctx.prisma[input].findMany()
            if (!values) throw new TRPCError({code: 'NOT_FOUND'})
            const {name, fields} = Prisma.dmmf.datamodel.models.find(m => m.name == input)!
            return {name, fields, values: values}
        }),
    create: publicProcedure
        .input(z.object({table: z.string().nonempty(), data: z.any()}))
        .mutation(({ctx, input: {data, table}}) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return ctx.prisma[table].create({data});
        }),
})
