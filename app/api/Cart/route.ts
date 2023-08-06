import { NextResponse } from 'next/server'
import prisma from '@/app/config/prismadb'
import { useSession } from 'next-auth/react';


export async function GET() {
    try {
       const carts = await prisma.cart.findMany()   
        return NextResponse.json({ status:"Success",carts})
    } catch (error: any) {
        console.log("-----------------------------------");
        console.log(error.message);
        console.log("-----------------------------------");
        return new NextResponse('Internal Error', { status: 500 })
    }
}
export async function POST(request: Request) {
    try {
        
        const body = await request.json();
        const {
          id,
        } = body
            const session = useSession()
            if (session?.data?.user?.email) {
                const User =await prisma.user.findUnique({
                    where: {
                        email: session.data.user.email
                    }
                })
                if (User) {
                  
                    
                    if (Cart) {
                    return NextResponse.json({ status: "Success" })
                    } else{
                return NextResponse.json({ status: "Failed", message: "somthing went wrong" })
                    }
                } else {
                return NextResponse.json({ status: "Failed", message: "unautherizated User" })

                }

            } else {
                return NextResponse.json({ status: "Failed", message: "unautherizated User" })
            }
        

    } catch (error: any) {
        console.log("-----------------------------------");
        console.log(error);
        console.log("-----------------------------------");
        return new NextResponse('Internal Error', { status: 500 })
    }
}