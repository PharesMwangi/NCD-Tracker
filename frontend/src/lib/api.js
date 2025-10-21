import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const client = axios.create(
    {
        baseURL: API,
        headers: {
            "Content-Type" : "application/json"
        }
    }
);

// patients endoints
export const PatientsAPI = {
    list: async (userId) =>{
        const res = await client.get(`/api/patients`, {params: userId ? { userId } : {}});
        return res.data;
    },

    create: async (payload) =>{
        const res = await client.post(`/api/patients`, payload);
        return res.data;
    },

    update: async (Id, payload) =>{
        const res = await client.put(`/api/patients/${Id}`, payload);
        return res.data;
    },

    delete: async (Id) =>{
        const res = await client.delete(`/api/patients/${Id}`);
        return res.data;
    }
};