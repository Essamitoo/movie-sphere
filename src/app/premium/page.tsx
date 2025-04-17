"use client";
import PremiumButton from "@/components/button-premium/PremiumButton" ;
import { useAuthContext } from '@/contexts/authContext'
const PremiumPage:React.FC=()=>{
    const { user} = useAuthContext()
    console.log(user)
    return(
        <div className="h-screen w-full flex justify-center items-center">
            {user&&user.id&&<PremiumButton userId={Number(user.id)} />}
        </div>
    )
}
export default PremiumPage;