import { CourseCard, CourseCardSkeleton } from "@/components/CourseCard";
import db from "@/db/db";
import { Suspense } from "react";

function getCourses(){
    return db.course.findMany({
        where: {isAvailableForPurchase: true},
        orderBy: {name :"asc"},
    })
}

export default function CoursesPage(){
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Suspense fallback={<>
        <CourseCardSkeleton/>
        <CourseCardSkeleton/>
        <CourseCardSkeleton/>
        <CourseCardSkeleton/>
        <CourseCardSkeleton/>
        <CourseCardSkeleton/>
    </>}>
        <CoursesSuspense />
    </Suspense>
</div>
}

async function CoursesSuspense(){
    const courses = await getCourses()
    return courses.map(course => (
        <CourseCard key={course.id} {...course} />
    ))
    
}