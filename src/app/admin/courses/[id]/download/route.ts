import fs from "fs/promises"
import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params: {id}} : {params: {id: string}}){
    const course = await db.course.findUnique({where: {id}, select: {filePath: true, name: true}})
    if(course == null) return notFound()
    const {size} = await fs.stat(course.filePath)
    const file = await fs.readFile(course.filePath)
    const extension = course.filePath.split(".").pop()

    return new NextResponse(file, {headers: {
        "Content-Disposition" : `attachment; filename="${course.name}.${extension}"`,
        "Content-Length": size.toString(),
    },})
}