import { db } from "@/db";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { Input } from "@/components/ui/input";
import { z } from "zod";

export const agentsRouter = createTRPCRouter({
    //TODO: change `getOne` to use `protectedProcedure`
    getOne: protectedProcedure
        .input(z.object({id:z.string()}))
        .query(async({input})=> {
        const [existingAgent] = await db
            .select({
                // TODO: change to actual count
                meetingsCount: sql<number>`5`,
                ...getTableColumns(agents),
            }
            )
            .from(agents)
            .where(eq(agents.id, input.id))
            .limit(1)
        return existingAgent;
    }),
    //TODO: change `getMany` to use `protectedProcedure`
    getMany: protectedProcedure.query(async()=> {
        const data = await db.select().from(agents);
        return data; 
    }),
    create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({input, ctx})=> {
        const [createdAgent] = await db
        .insert(agents)
        .values({
            ...input,
            userId: ctx.auth.user.id
        })
        .returning();

        return createdAgent;
    }),
});