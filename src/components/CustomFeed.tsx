import { db } from '@/lib/db'
import React from 'react'
import PostFeed from './PostFeed'
import { INFINITE_SCROLLING } from '@/config'
import { getAuthSession } from '@/lib/auth'

const CustomFeed = async() => {
    const session=await getAuthSession()
    const followedCommunities=await db.subscription.findMany({
        where:{
            userId:session?.user.id,
        },
        include:{
            subVani:true,
        },
    })
    const posts = await db.post.findMany({
        where: {
          SubVani: {
            name: {
              in: followedCommunities.map((sub) => sub.subVani.name),
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          votes: true,
          author: true,
          comments: true,
          SubVani: true,
        },
        take: INFINITE_SCROLLING,
      })
     return <PostFeed initialPosts={posts}></PostFeed>
}

export default CustomFeed