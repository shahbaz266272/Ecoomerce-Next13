import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import prismadb from "@/lib/prismadb"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()

        const body = await req.json()
        console.log(body)
        const { label, imageUrl } = body

        if (!userId) {
            return new NextResponse("UnAuthenticated!", { status: 401 })
        }
        if (!label) {
            return new NextResponse("Label is required!", { status: 400 })
        }
        if (!imageUrl) {
            return new NextResponse("Image URL is required!", { status: 400 })
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

        const billboard = await prismadb.bilboard.create({
            data: {
                label,
                imageUrl,
                storeId: params?.storeId
            }
        })
        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARD_POST]', error)
        return new NextResponse("Internal Server", { status: 500 })
    }
}

// GET ALL BILLBOARDS 
export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) {
            return new NextResponse("Store Id is required!", { status: 400 })
        }

        const billboards = await prismadb.bilboard.findMany({
            where: {
                storeId: params?.storeId
            }
        })
        return NextResponse.json(billboards)

    } catch (error) {
        console.log('[BILLBOARD_GET]', error)
        return new NextResponse("Internal Server", { status: 500 })
    }
}