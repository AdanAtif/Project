import { NextResponse } from 'next/server'
import prisma from '@/app/config/prismadb'
// @ts-ignore
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            email,
            name,
            password,
            image,
        } = body
        if (!name || !email || !password||!image) {
            return NextResponse.json({ status:"Failed",message:"Please fill all the fields"})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashpassword:hashedPassword,
                image,
            }});
        return NextResponse.json({ status:"Success",user:user})
    } catch (error: any) {
        console.log("-----------------------------------");
        console.log(error.message);
        console.log("-----------------------------------");
        return new NextResponse('Internal Error', { status: 500 })
    }
}