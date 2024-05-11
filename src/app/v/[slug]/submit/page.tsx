
import { Editor } from '@/components/Editor'
import { Button } from '@/components/ui/Button'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface PageProps {
  params:{
    slug:string
  }
}

const page= async({params}:PageProps) => {
  const subVayu=await db.subVani.findFirst({
    where:{
      name:params.slug,
    }
  })
  if(!subVayu){
    return notFound()
  }
  return <div className='flex flex-col items-start gap-6'>
    <div className='border-b border-gray-200 pb-5'>
      <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
        <h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-gray-900'>Create Post</h3>
        <p className='ml-2 mt-1 truncate text-sm text-gray-700'>in v/{params.slug}</p>
      </div>
    </div>
    {/* form */}
    <Editor subVayuId={subVayu.id} />
    <div className='w-full flex justify-end'>
       <Button type='submit' className='w-full' form='subVayu-post-form'>Post</Button>
    </div>
  </div>
}

export default page