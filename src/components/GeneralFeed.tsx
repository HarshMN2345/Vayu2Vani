import { INFINITE_SCROLLING } from '@/config'
import { db } from '@/lib/db'
import React from 'react'
import PostFeed from './PostFeed'

const GeneralFeed = async () => {
 const posts=await db.post.findMany({
    orderBy:{
        createdAt:'desc',

    },
    include:{
        votes:true,
        author:true,
        comments:true,
        SubVani:true
    },
    take:INFINITE_SCROLLING,
 })
 return <PostFeed initialPosts={posts}></PostFeed>
}

export default GeneralFeed