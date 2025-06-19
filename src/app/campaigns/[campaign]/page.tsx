"use client"
import { useContractStore } from '@/stores/contractsStore'
import { ProcessedCampaign } from '@/types'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
   const {allCampaigns,isfetching}= useContractStore();
   const [currentCampain,setCurrent]=useState<ProcessedCampaign|null>(null);
    const {campaign} = useParams();
    useEffect(()=>{
        if(allCampaigns===null) return;
       const isCurrent = allCampaigns.find((camp:ProcessedCampaign)=>camp.id===Number(campaign));
       if(!isCurrent) return;
       setCurrent(isCurrent);
       console.log(isCurrent.donators);
    
    },[allCampaigns])
    if(isfetching) return <h1>Loading...</h1>
  return (

    <div>
        {currentCampain && <h1>{currentCampain.title}</h1>}
        {currentCampain&&currentCampain.donators.map((donator,index)=>{
            return <div key={index}>{donator}</div>
        })}    

    </div>
  )
}

export default page