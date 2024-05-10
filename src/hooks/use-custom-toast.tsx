import { buttonVariants } from "@/components/ui/Button"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"


export default function useCustomToast() {
  const loginTest=()=>{
     const {dismiss}=toast({
        title:'Login Required.',
        description:'you need to be signin first',
        variant:'destructive',
        action:(
            <Link href='/sign-in' onClick={()=>dismiss()} className={buttonVariants({variant:'outline'})}>Login</Link>
        )
     })
  }
  return {loginTest}
}
