"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addCourse } from "../../_actions/courses";
import { useFormState, useFormStatus } from "react-dom";
import { Divide } from "lucide-react";

export function CourseForm(){
    const [error, action] = useFormState(addCourse, {})
    const [priceInVND, setPriceInVND] = useState<number>();

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required></Input>
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
                <Textarea id="description" name="description" required></Textarea>
                {error.description && <div className="text-destructive">{error.description}</div> }
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">File</Label>
                <Input type="file" id="file" name="file" required></Input>
                {error.file && <div className="text-destructive">{error.file}</div> }
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required></Input>
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