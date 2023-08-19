import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import prismadb from "@/lib/prismadb"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth()

        const body = await req.json()
         const { name, billboardId } = body

        if (!userId) {
            return new NextResponse("UnAuthenticated!", { status: 401 })
        }
        if (!name) {
            return new NextResponse("Name is required!", { status: 400 })
        }
        if (!billboardId) {
            return new NextResponse("Billboard Id is required!", { status: 400 })
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

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params?.storeId
            }
        })
        return NextResponse.json(category)

    } catch (error) {
        console.log('[CATEGORY_POST]', error)
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