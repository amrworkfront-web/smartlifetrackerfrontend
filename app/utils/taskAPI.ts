import axiosInstance from "./axiosInstance";

export const CreateTask=async (taskData:{title:string,description:string,priority:string,deadline:string})=>{
    const response =await axiosInstance.post('/tasks',taskData)
    return response.data

}

// export const getTasks=async()=>{
//     const response=await axiosInstance.get('/tasks')
//     return response.data
// }
export const getTasks = async (filters?: {
  search?: string;
  priority?: string;
  dateFilter?: 'today' | 'upcoming' | 'all';
}) => {
  let query = '';
  if (filters) {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.priority && filters.priority !== 'All') params.append('priority', filters.priority);
    if (filters.dateFilter) params.append('dateFilter', filters.dateFilter);
    query = `?${params.toString()}`;
  }

  const response = await axiosInstance.get(`/tasks${query}`);
  return response.data;
};


export const updateTask=async(taskData:{title:string,description:string,priority:string,deadline:string,id:string,status:boolean})=>{
const response=await axiosInstance.put(`/tasks/${taskData.id}`,taskData)
return response.data
}
export const deleteTask=async(id:string)=>{
    const response =await axiosInstance.delete(`/tasks/${id}`)
    return response.data
}

