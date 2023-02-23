import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.SERVER_API_BASE_URL || " https://server1.rishati.com",

        prepareHeaders: async (headers, {getState, endpoint}) =>{
            
            const token = await getState()?.auth?.token 
            if(token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers;
        }
    }),
    tagTypes: [],
    endpoints:(builder) =>({ }),
})