import axios from "axios";

const apiToken = import.meta.env.VITE_API_TOKEN;
export const fetchMoviesFromApi = async (url: string, params: any) => {
    try {
        const response = await axios.get(`/api/${url}`, {
            params,
            headers: {
                Authorization: `Bearer ${apiToken}`,
                accept: "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
