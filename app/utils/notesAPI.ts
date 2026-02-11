import axiosInstance from "./axiosInstance";

export const createNote=async(Note:{title:string,content:string,tag:string})=>{
    const response=await axiosInstance.post('/notes',Note)
    return response.data

}

export const getNotes=async(search?: string)=>{
      let query = '';

      if(search){
          const params = new URLSearchParams();
          params.append('search', search);
          query = `?${params.toString()}`; 
        }

    const response=await axiosInstance.get(`/notes${query}`)
    return response.data
}

export const deleteNote=async(id:string)=>{
    const response= await axiosInstance.delete(`/notes/${id}`)
    return response.data
}

export const updateNote=async(Note:{title:string,content:string,tag:string,id:string})=>{
    const response=await axiosInstance.put(`/notes/${Note.id}`,Note)
    return response.data
}