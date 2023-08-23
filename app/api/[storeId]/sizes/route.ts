import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import prismadb from "@/lib/prismadb"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()

        const body = await req.json()
        const { name, value } = body

        if (!userId) {
            return new NextResponse("UnAuthenticated!", { status: 401 })
        }
        if (!name) {
            return new NextResponse("name is required!", { status: 400 })
        }
        if (!value) {
            return new NextResponse("value is required!", { status: 400 })
        }
        if (!params.storeId) {
            return new NextResponse("Store Id is required!", { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        const size = await prismadb.size.create({
            data: {
                name,
                value,
                storeId: params?.storeId
            }
        })
        return NextResponse.json(size)

    } catch (error) {
        console.log('[SIZE_POST]', error)
        return new NextResponse("Internal Server", { status: 500 })
    }
}

// GET ALL BILLBOARDS 
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store Id is required!", { status: 400 })
        }

        const sizes = await prismadb.bilboard.findMany({
            where: {
                storeId: params?.storeId
            }
        })
        return NextResponse.json(sizes)

    } catch (error) {
        console.log('[Sizes_GET]', error)
        return new NextResponse("Internal Server", { status: 500 })
    }
}