import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubVayuValidator } from "@/lib/validators/subVayu";
import { z } from "zod";

export async function POST(req:Request){
    try{
        const session=await getAuthSession()
        if(!session?.user){
            return new Response('Unauthorized',{status:401})
        }
        const body=await req.json()
        const {name} =SubVayuValidator.parse(body)
        const SubVayuExists=await db.subVani.findFirst({
            where:{
                name,
            },
        })
        if(SubVayuExists){
            return new Response("SubVayu already exists",{status:409})
        }
        const subVayu=await db.subVani.create({
            data:{
                name,
                creatorId:session.user.id
            }
        })
        await db.subscription.create({
            data:{
                userId:session.user.id,
                subVaniId:subVayu.id
            }
        })
        return new Response(subVayu.name)
    }catch(error){
        if(error instanceof z.ZodError){
            return new Response(error.message,{status:422})
        }
        return new Response('could not create subvayu',{status:500})

    }
}