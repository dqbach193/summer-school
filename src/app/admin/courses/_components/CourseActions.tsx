"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteCourse, toggleCourseAvailability } from "../../_actions/courses";
import { useRouter } from "next/navigation";


export function ActiveToggleDropdownItem({id, isAvailableForPurchase} : 
    {id: string, isAvailableForPurchase: boolean}){
    
    const[isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem
            disabled={isPending}
            onClick={() =>{
                startTransition(async () =>{
                    await toggleCourseAvailability(id, !isAvailableForPurchase)
                    router.refresh()
                })
            }}>{isAvailableForPurchase ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
    )
}

export function DeleteDropdownItem({id, disabled} : {id: string, disabled: boolean}){
    const[isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem
            variant="destructive"
            disabled={disabled || isPending}
            onClick={() =>{
                startTransition(async () =>{
                    await deleteCourse(id)
                    router.refresh()
                })
            }}>
            Delete
        </DropdownMenuItem>
    )
}