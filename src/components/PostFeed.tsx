"use client"
import { ExtendedPost } from '@/types/db';
import { FC, useEffect, useRef } from 'react';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { INFINITE_SCROLLING } from '@/config';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Posti from './Posti';

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  subVayuName?: string
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subVayuName }) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  });
  const { data: session } = useSession();
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(['infinite-query'], async ({ pageParam = 1 }) => {
    const query = `/api/posts?limit=${INFINITE_SCROLLING}&page=${pageParam}` + (!!subVayuName ? `&subVayuName=${subVayuName}` : '')
    const { data } = await axios.get(query);
    return data as ExtendedPost[];
  }, {
    getNextPageParam: (_, pages) => {
      return pages.length + 1;
    },
    initialData: { pages: [initialPosts], pageParams: [1] }
  });
  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage() // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;
  return (<ul className='flex flex-col col-span-2 space-y-6'>
     {posts.map((post, index) => {
      const votesAmt = post.votes.reduce((acc, vote) => {
        if (vote.type === "UP") {
          return acc + 1;
        }
        if (vote.type === "DOWN") {
          return acc - 1;
        }
        return acc;
      }, 0);
      const currentVote = post.votes.find((vote) => vote.userId === session?.user.id);
      // Check if subVayu is defined before accessing its name property
      const subVayuName = post.SubVani ? post.SubVani.name : 'react';
      if (index === posts.length - 1) {
        return (<li key={post.id} ref={ref}>
            <Posti key={post.id} currentVote={currentVote} votesAmt={votesAmt} commentAmt={post.comments.length} post={post} subVayuName={subVayuName}/>
          </li>);
      }
      else {
        return <Posti  key={post.id} currentVote={currentVote} votesAmt={votesAmt} commentAmt={post.comments.length} post={post} subVayuName={subVayuName}/>;
      }
    })}
  </ul>);
};

export default PostFeed;
