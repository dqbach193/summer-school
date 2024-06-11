import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/CourseActions";

export default function AdminCoursesPage(){
    return (
        <>
        <div className="flex justify-between items-center gap-4">
            <PageHeader>Courses</PageHeader>
            <Button asChild>
                <Link href="/admin/courses/new">Add Course</Link>
            </Button>
        </div>
        <CoursesTable />
        </>
    )
}

async function CoursesTable(){
    const courses = await db.course.findMany({
        select: {
            id: true, 
            name: true,
            priceInVND: true, 
            isAvailableForPurchase: true, 
            filePath: true, 
            imagePath: true,
            _count: {select: {orders: true}}
        },
        orderBy: {name: "asc"}
    })

    if(courses.length === 0) return <p>No courses found</p>

    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead className="w-0">
                    <span className="sr-only">Available For Purchase</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {courses.map(course =>(
                <TableRow key={course.id}>
                    <TableCell>
                        {course.isAvailableForPurchase ? (
                        <>
                            <span className="sr-only">Available</span>
                            <CheckCircle2/> 
                        </>)
                            : (
                            <>
                            <span className="sr-only">Unavailable</span>
                            <XCircle className="stroke-destructive"/>
                            </>
                        )}
                    </TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{formatCurrency(course.priceInVND)}</TableCell>
                    <TableCell>{formatNumber(course._count.orders)}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreVertical/>
                                <span className="sr-only">Actions</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <a download href={`/admin/courses/${course.id}/donwload`}>Download</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={`/admin/courses/${course.id}/edit`}>Edit</Link>
                                </DropdownMenuItem>
                                <ActiveToggleDropdownItem id={course.id} isAvailableForPurchase={course.isAvailableForPurchase}/>
                                <DropdownMenuSeparator />
                                <DeleteDropdownItem id={course.id} disabled={course._count.orders > 0}/>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}