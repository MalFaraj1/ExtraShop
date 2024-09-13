import { axiosinstance } from "./axiosInstance";

//add a notification
export const AddNotification = async (data) => {
    try {
        const response = await axiosinstance.post("/api/notifications/notify", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//get all notification by user
export const GetAllNotifications = async () => {
    try {
        const response = await axiosinstance.get("/api/notifications/get-all-notifications");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//delete notification
export const DeleteNotification = async (id) => {
    try {
        const response = await axiosinstance.delete(`/api/notifications/delete-notification/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

//read all notifications by user
export const ReadAllNotification = async () => {
    try {
        const response = await axiosinstance.put("/api/notifications/read-all-notifications");
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};