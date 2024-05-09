"use client"
import { cn } from "@/lib/utils"
import { Button } from "./ui/Button"
import { useState } from "react"
import {signIn} from 'next-auth/react'
import React from "react"
import { Icons } from "./Icons"
import { useToast } from "./ui/use-toast"


const UserAuthForm = () => {
    const [isLoading,setIsloading]=useState<boolean>(false)
    const {toast}=useToast()
    const loginwithgoogle=async()=>{
        setIsloading(true)
        try{
          await signIn('google')
        }catch(error){
            toast({
                title:'there was a problem',
                description:'there was a hindrance logging in with google',
                variant:'destructive'
            })

        }finally{
            setIsloading(false)
        }
    }
  return (
    <div className='flex justify-center'>
       <Button onClick={loginwithgoogle} isLoading={isLoading} size='sm' className="w-full">
        {isLoading?null:<Icons.google className="h-4 w-4 pr-1"/>}
        Google</Button>
    </div>
  )
}

export default UserAuthForm