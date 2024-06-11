import db from "@/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import { CourseForm } from "../../_components/CourseForm";

export default async function EditCoursePage({params :{id},}: {params: {id: string}}){
    const course = await db.course.findUnique({where: {id}})
    return (
        <>
        <PageHeader>Edit Course</PageHeader>
        <CourseForm course = {course} />
        </>
    )
}