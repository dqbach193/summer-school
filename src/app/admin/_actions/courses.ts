"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"


const fileSchema = z.instanceof(File, {
    message: "Required"
})
const imageSchema = fileSchema.refine(
    file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    priceInVND: z.coerce.number().int().min(1),
    file: fileSchema.refine(file => file.size > 0, "Required"),
    image: imageSchema.refine(file => file.size > 0, "Required")
})

export async function addCourse(prevState: unknown, formData: FormData){
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("courses", { recursive: true })
    const filePath = `courses/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/courses", {recursive: true})
    const imagePath = `/courses/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    
    await db.course.create({
        data: {
            isAvailableForPurchase: false,
            name: data.name,
            description: data.description,
            priceInVND: data.priceInVND,
            filePath,
            imagePath,
        },
      })

    redirect("/admin/courses")
}

const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional()
})

export async function updateCourse(id: string, prevState: unknown, formData: FormData){
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    if(result.success === false){
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const course = await db.course.findUnique({where: {id}})

    if(course == null) return notFound()

    let filePath = course.filePath
    if(data.file != null && data.file.size > 0){
        await fs.unlink(course.filePath)
        filePath = `courses/${crypto.randomUUID()}-${data.file.name}`
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
    }

    let imagePath = course.imagePath
    if(data.image != null && data.image.size > 0){
        await fs.unlink(`public${course.imagePath}`)
        imagePath = `/courses/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()))
    }

    await db.course.update({
        where: {id},
        data: {
            name: data.name,
            description: data.description,
            priceInVND: data.priceInVND,
            filePath,
            imagePath,
        },
      })

    redirect("/admin/courses")
}

export async function toggleCourseAvailability(id: string, isAvailableForPurchase: boolean){
    await db.course.update({where: {id}, data:{isAvailableForPurchase}})
}

export async function deleteCourse(id: string){
    const course = await db.course.delete({where: {id}})
    if(course == null) return notFound()

    await fs.unlink(course.filePath)
    await fs.unlink(`public${course.imagePath}`)
}