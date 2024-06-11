"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addCourse } from "../../_actions/courses";

export function CourseForm(){
    const [priceInVND, setPriceInVND] = useState<number>();

    return (
        <form action={addCourse} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required></Input>
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Price in VND</Label>
                <Input type="number" id="priceInVND" name="priceInVND" required 
                value={priceInVND} 
                onChange={e=> setPriceInVND(Number(e.target.value) || undefined)}></Input>
            </div>
            <div className="text-muted-foreground">
                {formatCurrency(priceInVND || 0)}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required></Textarea>
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">File</Label>
                <Input type="file" id="file" name="file" required></Input>
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required></Input>
            </div>
            <Button type="submit">Save</Button>
        </form>
    )
}

