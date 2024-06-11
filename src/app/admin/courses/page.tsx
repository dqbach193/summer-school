import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

function CoursesTable(){
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
            <TableBody>
                
            </TableBody>
        </TableHeader>
    </Table>
}