import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
    try {


        if (!params?.categoryId) {
            return new NextResponse("categoryId Id is required!", { status: 400 })
        }

        const categories = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
        })

        return NextResponse.json(categories)


    } catch (error) {
        console.log('BCATEGORIES_GET', error)
        return new NextResponse("Internal Error!", { status: 500 })
    }
}

// UPDATE CATEGORY 
export async function PATCH(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        const { userId } = auth()

        const body = await req.json()

        const { name, billboardId } = body

        if (!userId) {
            return new NextResponse("UnAuthorized!", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required!", { status: 400 })
        }
        if (!billboardId) {
            return new NextResponse("billboardId is required!", { status: 400 })
        }

        if (!params?.storeId) {
            return new NextResponse("Store Id is required!", { status: 400 })
        }
        if (!params?.categoryId) {
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

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,

            },
            data: {
                name,
                billboardId
            }
        })

        return NextResponse.json(category)


    } catch (error) {
        console.log('{CATEGORY_PATCH', error)
        return new NextResponse("Internal Error!", { status: 500 })
    }
}

// DELETE BILLBOARD 

export async function DELETE(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("UnAuthorized!", { status: 401 })
        }

        if (!params?.categoryId) {
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

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
            },
        })

        return NextResponse.json(category)


    } catch (error) {
        console.log('CATEGORY_DELETE', error)
        return new NextResponse("Internal Error!", { status: 500 })
    }
}