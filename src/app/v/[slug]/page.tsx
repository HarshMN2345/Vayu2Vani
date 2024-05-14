
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { INFINITE_SCROLLING } from '@/config'
import { notFound } from 'next/navigation'
import MiniPost from '@/components/MiniPost'
import PostFeed from '@/components/PostFeed'

interface PageProps {
  params:{
    slug:string
  }
}

const page=async ({params}:PageProps) => {
    const {slug}=params
    const session=await getAuthSession()
    const subVayu=await db.subVani.findFirst({
        where:{name:slug},
        include:{
            posts:{
                include:{
                    author:true,
                    votes:true,
                    comments:true,
                    SubVani:true,
                },
                take:INFINITE_SCROLLING
            }
        }
    })
    if(!subVayu){
        return notFound()
    }
  return <>
  <h1 className='font-bold text-3xl md:text-4xl h-14'>
    v/{subVayu.name}
  </h1>
  <MiniPost session={session}/> 
  {subVayu &&
  <PostFeed initialPosts={subVayu.posts} subVayuName={subVayu.name}/>
}
  </>
}

export default page