import { NextResponse } from 'next/server'
import prisma from '@/app/config/prismadb'


export async function POST() {
    try {
       const Products = await prisma.products.findMany()   
        return NextResponse.json({ status:"Success",Products})
    } catch (error: any) {
        console.log("-----------------------------------");
        console.log(error.message);
        console.log("-----------------------------------");
        return new NextResponse('Internal Error', { status: 500 })
    }
}