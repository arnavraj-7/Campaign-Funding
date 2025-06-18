"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const page = async() => {
    const {campaign} = await useParams();
  return (
    <div>
        
    </div>
  )
}

export default page