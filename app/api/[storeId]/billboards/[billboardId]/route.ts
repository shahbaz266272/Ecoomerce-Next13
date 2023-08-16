import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { billboardId: string } }) {
    try {


        if (!params?.billboardId) {
            return new NextResponse("billboard Id is required!", { status: 400 })
        }

        const billboard = await prismadb.bilboard.findUnique({
            where: {
                id: params.billboardId,
            },
        })

        return NextResponse.json(billboard)


    } catch (error) {
        console.log('BILLBOARD_GET', error)
        return new NextResponse("Internal Error!", { status: 500 })
    }
}

// UPDATE BILLBOARD 
export async function PATCH(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const { userId } = auth()

        const body = await req.json()

        const { label, imageUrl } = body

        if (!userId) {
            return new NextResponse("UnAuthorized!", { status: 401 })
        }

        if (!label) {
            return new NextResponse("Label is required!", { status: 400 })
        }
        if (!imageUrl) {
            return new NextResponse("imageUrl is required!", { status: 400 })
        }

        if (!params?.storeId) {
            return new NextResponse("Store Id is required!", { status: 400 })
        }
        if (!params?.billboardId) {
            return new NextResponse("billboard Id is required!", { status: 400 })
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

        const billboard = await prismadb.bilboard.updateMany({
            where: {
                id: params.billboardId,

            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard)


    } catch (error) {
        console.log('{BILLBOARD_PATCH', error)
        return new NextResponse("Internal Error!", { status: 500 })
    }
}

// DELETE BILLBOARD 

export async function DELETE(req: Request, { params }: { params: { storeId: string, billboardId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("UnAuthorized!", { status: 401 })
        }

        if (!params?.billboardId) {
            return new NextResponse("billboard Id is required!", { status: 400 })
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

        const billboard = await prismadb.bilboard.deleteMany({
            where: {
                id: params.billboardId,
            },
        })

        return NextResponse.json(billboard)


    } catch (error) {
        console.log('BILLBOARD_DELETE', error)
        return new NextResponse("Internal Error!", { status: 500 })
    }
}