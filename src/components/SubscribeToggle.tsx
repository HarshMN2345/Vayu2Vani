"use client"
import React, { FC, Suspense, startTransition } from 'react'
import { Button } from './ui/Button'
import { useMutation} from '@tanstack/react-query'
import { SubscribeToSubVayuPayload } from '@/lib/validators/subVayu'
import axios, { AxiosError } from 'axios'
import useCustomToast from '@/hooks/use-custom-toast'
import { toast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

interface SubscribeToggleProps {
    subVayuId:string
    subVayuName:string
    isSubscribed:boolean
}

const SubscribeToggle: FC<SubscribeToggleProps> = ({subVayuId,subVayuName,isSubscribed,}) => {
    const router=useRouter()
    const {loginTest}=useCustomToast()
    const {mutate:subscribe,isLoading:isSubLoading}=useMutation({
        mutationFn:async()=>{
           const payload:SubscribeToSubVayuPayload={
            subVayuId
           }
           const {data}=await axios.post('/api/subVayu/subscribe',payload)
           return data as string
        },
        onError:(err)=>{
            if(err instanceof AxiosError){
                if(err.response?.status===401){
                    return loginTest()
                }
            }
            return toast({
                title:'there was a problem',
                description:'something went wrong and its your fault',
                variant:'destructive'
            })
        },
        onSuccess:()=>{
            startTransition(()=>{
                router.refresh()

            })
            return toast({
                title:'Subscribed',
                description:`you are now a member of this community v/${subVayuName}`
            })
        }
    })
    const {mutate:unsubscribe,isLoading:isUnsubLoading}=useMutation({
        mutationFn:async()=>{
           const payload:SubscribeToSubVayuPayload={
            subVayuId
           }
           const {data}=await axios.post('/api/subVayu/unsubscribe',payload)
           return data as string
        },
        onError:(err)=>{
            if(err instanceof AxiosError){
                if(err.response?.status===401){
                    return loginTest()
                }
            }
            return toast({
                title:'there was a problem',
                description:'something went wrong and its your fault',
                variant:'destructive'
            })
        },
        onSuccess:()=>{
            startTransition(()=>{
                router.refresh()

            })
            return toast({
                title:'UnSubscribed',
                description:`you are now a enemy of this community v/${subVayuName}`
            })
        }
    })
    return isSubscribed ? <Button onClick={()=>unsubscribe()} isLoading={isUnsubLoading} className='w-full mt-1 mb-4'>Leave Community</Button> : <Button isLoading={isSubLoading} onClick={()=>{subscribe()}} className='w-full mt-1 mb-4'>Join to Post</Button>
}

export default SubscribeToggle