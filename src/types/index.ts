
export type campaign = {id:number, owner: string; title: string; target: number; deadline: number;donated?: number; 
    amountCollected: number; metadata: string; exists: boolean;donators:string[] };

export type ProcessedCampaign = {
    id: number;
    owner: string;
    title: string;
    target: string;
    deadlineDate: Date;
    amountCollected: string;
    description:string;
    tag:string;
    imageUrl:string;
    metadata: string;
    donators: string[];

}