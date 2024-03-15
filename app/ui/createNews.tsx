"use client"

import { useState } from "react"
import { NewsMassageC } from "../lib/definitions"
import { CreateNewsForm } from "./crNewsForm";
  

export default function CreateNews( {news}:{news:NewsMassageC[]}) {
    const [isForm, setIsForm]=useState(false)
    
    return (
        <>
            <button
                className="btn"
                onClick={()=>setIsForm(prev=>!prev)}
            >Create news</button>
                        {
             isForm && <CreateNewsForm setIsForm={setIsForm}/>

            }
        </>
    )
}