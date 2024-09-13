import { axiosinstance } from "./axiosInstance";

//register user
export const RegisterUser = async (payload) => {
    try {
        const response  = await axiosinstance.post("/api/users/register", payload);
        return response.data;
    } catch (error) {
        return error.message
    }
}

//login user
export const LoginUser = async (payload) => {
    try {
        const response  = await axiosinstance.post("/api/users/login", payload);
        return response.data;
    } catch (error) {
        return error.message
    }
}

//get current user
export const GetCurrentUser = async () => {
    try {
        const response = await axiosinstance.get("/api/users/get-current-user");
        return response.data; 
    } catch (error) {
        return error.message;
    }
};

//get all users
export const GetAllUsers = async () => {
    try {
        const response = await axiosinstance.get("/api/users/get-users");
        return response.data;
    } catch (error) {
        return error.message;
    }
};

//update user status
export const UpdateUserStatus = async (id, status) => {
    try {
        const response = await axiosinstance.put(`/api/users/update-user-status/${id}`, { status });
        return response.data;
    } catch (error) {
        return error.message;
    }
}; 