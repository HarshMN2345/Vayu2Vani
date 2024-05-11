import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { SubVayuSubscriptionValidator } from "@/lib/validators/subVayu";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const session = await getAuthSession();
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }
        const body = await req.json();
        const { subVayuId,title,content } = PostValidator.parse(body);
        const subscriptionExists = await db.subscription.findFirst({
            where: {
                subVaniId: subVayuId,
                userId: session?.user.id || '',
            }
        });
        if (!subscriptionExists) {
            return new Response("subscribe to post", { status: 400 });
        }
        await db.post.create({
            data: {
                title,
                content,
                authorId:session.user.id,
                subVaniId:subVayuId
            },
        });
        return new Response("OKay");
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 });
        }
        return new Response('Could not post', { status: 500 });
    }
}
