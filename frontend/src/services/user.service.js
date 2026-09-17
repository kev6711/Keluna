import api from "./api.js";

export const createProfile = async (profileData) => {
    const response = await api.post("/users/profile", profileData);

    return response.data;
};
