import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubVayuSubscriptionValidator } from "@/lib/validators/subVayu";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }
        const body = await req.json();
        const { subVayuId } = SubVayuSubscriptionValidator.parse(body);
        const subscriptionExists = await db.subscription.findFirst({
            where: {
                subVaniId: subVayuId,
                userId: session?.user.id || '',
            }
        });
        if (!subscriptionExists) {
            return new Response("You are not subscribed to this community", { status: 400 });
        }
        const subVayu=await db.subVani.findFirst({
            where:{
                id:subVayuId,
                creatorId:session.user.id
            }
        })
        if(subVayu){
            return new Response('you cant unsubscribe',{status:400})
        }
       await db.subscription.delete({
        where:{
            userId_subVaniId:{
                subVaniId:subVayuId,
                userId:session.user.id
            }
        }
       })
        return new Response(subVayuId);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 });
        }
        return new Response('Could not unsubscribe', { status: 500 });
    }
}
