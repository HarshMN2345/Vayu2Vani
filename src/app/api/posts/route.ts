import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { url } from "inspector";
import { z } from "zod";

export async function GET(req:Request){
    const url=new URL(req.url)
    const session=await getAuthSession()
    let followedCommunitiesIds:string[]=[]
    if(session){
        const followedCommunities=await db.subscription.findMany({
            where:{
                userId:session.user.id,
            },
            include:{
                subVani:true,
            },
        })
        followedCommunitiesIds= followedCommunities.map(({subVani})=>subVani.id)  
    }
    try{
        const { limit, page, subVayuName } = z
        .object({
          limit: z.string(),
          page: z.string(),
          subVayuName: z.string().nullish().optional(),
        })
        .parse({
          subredditName: url.searchParams.get('subredditName'),
          limit: url.searchParams.get('limit'),
          page: url.searchParams.get('page'),
        })
  
      let whereClause = {}
  
      if (subVayuName) {
        whereClause = {
          subVani: {
            name: subVayuName,
          },
        }
      } else if (session) {
        whereClause = {
          subVani: {
            id: {
              in: followedCommunitiesIds,
            },
          },
        }
      }
  
      const posts = await db.post.findMany({
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          SubVani: true,
          votes: true,
          author: true,
          comments: true,
        },
        where: whereClause,
      })
  
      return new Response(JSON.stringify(posts))
    }catch(error){
        return new Response('Could not fetch more posts', { status: 500 })
    }
}