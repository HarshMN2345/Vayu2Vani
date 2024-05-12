import { formatTimeToNow } from '@/lib/utils'
import { Post, User, Vote } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { FC, useRef } from 'react'
import EditorOutput from './EditorOutput'
import PostVoteClient from './post-vote/PostVoteClient'
type PartialVote=Pick<Vote,'type'>

interface PostProps {
 subVayuName:string
 post: Post&{
    author:User
    votes:Vote[]
 }
 commentAmt: number
 votesAmt:number
 currentVote?:PartialVote
}

const Posti: FC<PostProps> = ({subVayuName,post,commentAmt,votesAmt,currentVote}) => {
  return <>
   <div className='rounded-md bg-white shadow'>
      <div className='px-6 py-4 flex justify-between'>
           {/* todo post votes */}
           <PostVoteClient postId={post.id} initialVote={currentVote?.type} initialVotesAmt={votesAmt}/>
           <div className='w-0 flex-1'>
              <div className='max-h-40 mt-1 text-xs text-gray-500'>
                {subVayuName?(<><a href={`/v/${subVayuName}`} className='underline text-zinc-900 text-sm underline-offset-2'>v/{subVayuName}</a>
                <span className='px-1'>.</span>
                </>):null}
                <span>Posted by u/{post.author.name}</span>
                <span className='px-1'>.</span>
                 {formatTimeToNow(new Date(post.createdAt))}
              </div>
              <a href={`/v/${subVayuName}/post/${post.id}`}>
                <h1 className='text-lg font-semibold py-2 leading-6 text-gray-900'>{post.title}</h1>
              </a>
              <div className='relative text-sm max-h-40 w-full overflow-clip'>
                <EditorOutput content={post.content}/>
              <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'></div>
              </div>
           </div>
        </div>
        <div className='bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6'>
        <Link
          href={`/r/${subVayuName}/post/${post.id}`}
          className='w-fit flex items-center gap-2'>
          <MessageSquare className='h-4 w-4' /> {commentAmt} comments
        </Link>
      </div>
    </div>
  </>
}

export default Posti