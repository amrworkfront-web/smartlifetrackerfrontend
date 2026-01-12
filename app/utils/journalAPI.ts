import axiosInstance from "./axiosInstance";

export const createJournal= async(Journal:{title:string,content:string,mood:string})=>{
    const response= await axiosInstance.post('/journal',Journal)
    return response.data
}

export const getJournals= async()=>{
    const response= await axiosInstance.get('/journal')
    return response.data
}



export const updateJournal= async(Journal:{title:string,content:string,mood:string,id:string})=>{
    const response= await axiosInstance.put(`/journal/${Journal.id}`,Journal)
    return response.data
}