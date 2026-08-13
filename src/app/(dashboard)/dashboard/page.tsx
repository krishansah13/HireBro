"use client"
import { signOut } from "next-auth/react";

export default function Dashboard() {
    return <>
        <h1>Hi i am a seeker</h1>
        <button onClick={()=>signOut()}>Signout</button>
    </>
}