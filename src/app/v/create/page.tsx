"use client"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {useMutation} from "@tanstack/react-query"
import axios, { AxiosError } from 'axios'
import { CreateSubVayuPayload } from "@/lib/validators/subVayu"
import { toast } from "@/components/ui/use-toast"
import useCustomToast from "@/hooks/use-custom-toast"
const Page = () => {
    const [input,setInput]=useState<string>('')
    const router=useRouter()
    const {loginTest} =useCustomToast()
    const {mutate:createCommunity,isLoading}=useMutation({
        mutationFn:async()=>{
            const payload:CreateSubVayuPayload={
                name:input
            }
            const {data} = await axios.post('/api/subVayu',payload)
            return data as string
        },
        onError:(err)=>{
            if(err instanceof AxiosError){
                if(err.response?.status===409){
                    return toast({
                        title:'SubVani Already exists',
                        description:"Please choose a different name,aapse guzarish hai ",
                        variant:'destructive',
                    })
                }
                if(err.response?.status===422){
                    return toast({
                        title:'SubVani name is invalid',
                        description:"Please choose a name between 3 to 21 characters",
                        variant:'destructive',
                    })
                }
                if(err.response?.status===401){
                    return loginTest()
                }
            }
            toast({
                title:'there is an error',
                description:'cant create community',
                variant:'destructive'
            })
        },
        onSuccess:(data)=>{
            router.push(`/v/${data}`)
        }
    })
    return <div className="container flex items-center h-full max-w-3xl mx-auto">
        <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Create a Community</h1>
            </div>
            <hr className="bg-zinc-500 h-px"></hr>
            <div>
                <p className="text-lg font-medium">Name</p>
                <p className="text-xs pb-2">Community names can't be changed</p>
                <div className="relative">
                    <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
                        v/
                    </p>
                    <Input className="pl-6" value={input} onChange={(e)=>setInput(e.target.value)}/>
                </div>
            </div>
            <div className=" flex justify-end gap-4">
                <Button variant='subtle' onClick={()=>router.back()}>Cancel</Button>
                <Button isLoading={isLoading} disabled={input.length===0} onClick={()=>{createCommunity()}}>Create Community</Button>

            </div>
        </div>
    </div>
}

export default Page