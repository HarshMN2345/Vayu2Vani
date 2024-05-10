import Link from "next/link"
import { Icons } from "./Icons"
import UserAuthForm from "./UserAuthForm"


const SignUp = () => {
    return (
        <div className=" container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className=" flex flex-col space-y-2 text-center">
                <Icons.logo className="mx-auto h-12 w-12"/>
                <h1 className="text-2xl font-semibold tracking-tight">Register for an Account</h1>
                <p className="text-sm max-w-xs mx-auto">by continuing you are registering for a VayuVani account,you agree our terms and conditions</p>
            </div>
            <UserAuthForm/>
            <p className="px-8 text-center text-sm text-zinc-700">
                Already have an account?{' '}
                <Link href='/sign-in' className="hover:text-zinc-800 text-sm underline underline-offset-4">
                    Sign in
                </Link>
            </p>
            </div>
    )
}

export default SignUp