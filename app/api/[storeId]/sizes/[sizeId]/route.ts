import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { sizeId: string } }) {
    try {


        if (!params?.sizeId) {
            return new NextResponse("size Id is required!", { status: 400 })
        }

        const size = await prismadb.bilboard.findUnique({
            where: {
                id: params.sizeId,
            },
        })

        return NextResponse.json(size)


    } catch (error) {
        console.log('SIZE_GET', error)
        return new NextResponse("Internal Error!", { status: 500 })
    }
}

// UPDATE BILLBOARD 
export async function PATCH(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const { userId } = auth()

        const body = await req.json()

        const { name, value } = body

        if (!userId) {
            return new NextResponse("UnAuthorized!", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required!", { status: 400 })
        }
        if (!value) {
            return new NextResponse("Value is required!", { status: 400 })
        }

        if (!params?.storeId) {
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

        const size = await prismadb.size.updateMany({
            where: {
                id: params.billboardId,

            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(size)


    } catch (error) {
        console.log('{SIZE_PATCH', error)
        return new NextResponse("Internal Error!", { status: 500 })
    }
}

// DELETE BILLBOARD 

export async function DELETE(req: Request, { params }: { params: { storeId: string, sizeId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("UnAuthorized!", { status: 401 })
        }

        if (!params?.sizeId) {
            return new NextResponse("Size Id is required!", { status: 400 })
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

        const billboard = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId,
            },
        })

        return NextResponse.json(billboard)


    } catch (error) {
        console.log('SIZE_DELETE', error)
        return new NextResponse("Internal Error!", { status: 500 })
    }
}