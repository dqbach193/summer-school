import { CourseCard, CourseCardSkeleton } from "@/components/CourseCard"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { Course } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

async function getMostPopularCourses(){
    await wait(500) //remove them after debugging
    return db.course.findMany({
            where:{isAvailableForPurchase: true},
            orderBy: {orders: { _count: "desc"}},
            take: 6,
        })
}

async function getNewestCourses(){
    await wait(1000) //remove them after debugging
    return db.course.findMany({
            where:{isAvailableForPurchase: true},
            orderBy: {createdAt: "desc"},
            take: 6,
        })
}

function wait(duration: number){
    return new Promise(resolve => setTimeout(resolve, duration))
}

export default function HomePage(){
    return <main className="space-y-12">
        <CourseGridSection title="Most Popular" coursesFetcher ={getMostPopularCourses}/>
        <CourseGridSection title="Newest" coursesFetcher ={getNewestCourses}/>
    </main>
}

type CourseGridSectionProps = {
    title: string
    coursesFetcher: () => Promise<Course[]>
}

async function CourseGridSection({coursesFetcher, title} : CourseGridSectionProps){
    return (
        <div className="space-y-4"> 
            <div className="flex gap-4">
                <h2 className="text-3xl font-bold">{title}</h2>
                <Button variant="outline" asChild>
                    <Link href="/courses" className="space-x-2">
                        <span> View All</span>
                        <ArrowRight className="size-4"/>
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={<>
                    <CourseCardSkeleton/>
                    <CourseCardSkeleton/>
                    <CourseCardSkeleton/>
                </>}>
                    <CourseSuspense coursesFetcher={coursesFetcher}/>
                </Suspense>
            </div>
        </div>
    )
}

async function CourseSuspense({coursesFetcher} : {coursesFetcher: () => Promise<Course[]>}){
    return (await coursesFetcher()).map(course => (
        <CourseCard key={course.id} {...course}/>
    ))
}