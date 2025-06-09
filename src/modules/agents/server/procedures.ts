import { db } from "@/db";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "../schemas";
import { eq } from "drizzle-orm";
import { Input } from "@/components/ui/input";
import { z } from "zod";

export const agentsRouter = createTRPCRouter({
    //TODO: change `getOne` to use `protectedProcedure`
    getOne: protectedProcedure.input(z.object({id:z.string()})).query(async({input})=> {
        const data = await db
            .select()
            .from(agents)
            .where(eq(agents.id, input.id));
        return data; 
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