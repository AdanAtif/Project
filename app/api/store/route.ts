import { NextResponse } from 'next/server'
import prisma from '@/app/config/prismadb'
import { useSession } from 'next-auth/react';


export async function GET(request: Request) {
    try {

        const url = new URL(request.url)

        const id = url.searchParams.get("id")
        console.log("request", id);
        
        if (id) {
            const Products = await prisma.products.findUnique({
                where: {
                    id: id
                }
            })
            if (Products) {
                return NextResponse.json({ status: "Success", Products })
            } else {
                return NextResponse.json({ status: "Failed", message: "this item does not exist" })
            }
        } else {
            return NextResponse.json({ status: "Failed", message: "this item does not exist." })
        }

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
           id,price,quantity,name,image,email
        } = body
            
                const User =await prisma.user.findUnique({
                    where: {
                        email:email
                    }
                })
                if (User) {
                    const totalprice = parseInt(price) * parseInt(quantity)
                    const Cart = await prisma.cart.create({
                        data: {
                            userId: User.id,
                            name: name,
                            quantity,
                            price: totalprice,
                            productsId: id,
                            image:image
                        }
                    })
                    if (Cart) {
                    return NextResponse.json({ status: "Success" })
                    } else{
                return NextResponse.json({ status: "Failed", message: "somthing went wrong" })
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