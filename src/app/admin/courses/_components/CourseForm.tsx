"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addCourse, updateCourse } from "../../_actions/courses";
import { useFormState, useFormStatus } from "react-dom";
import { Course } from "@prisma/client";
import Image from "next/image";

export function CourseForm({course} : {course?: Course | null}){
    const [error, action] = useFormState(course == null ? addCourse : updateCourse.bind(null, course.id), {})
    const [priceInVND, setPriceInVND] = useState<number | undefined>(course?.priceInVND);

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required defaultValue={course?.name || ""}></Input>
                {error.name && <div className="text-destructive">{error.name}</div> }
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Price in VND</Label>
                <Input type="number" id="priceInVND" name="priceInVND" required 
                value={priceInVND} 
                onChange={e=> setPriceInVND(Number(e.target.value) || undefined)}></Input>
                {error.priceInVND && <div className="text-destructive">{error.priceInVND}</div> }
            </div>
            <div className="text-muted-foreground">
                {formatCurrency(priceInVND || 0)}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required defaultValue={course?.description || ""}></Textarea>
                {error.description && <div className="text-destructive">{error.description}</div> }
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">File</Label>
                <Input type="file" id="file" name="file" required={course == null}></Input>
                {course != null && <div className="text-muted-foreground">{course.filePath}</div> }
                {error.file && <div className="text-destructive">{error.file}</div> }
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required={course == null}></Input>
                {course != null && <Image src={course.imagePath} height="400" width="400" alt="Course image"/>}
                {error.image && <div className="text-destructive">{error.image}</div> }
            </div>
            <SubmitButton />
        </form>
    )
}

function SubmitButton(){
    const {pending} = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}