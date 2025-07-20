import axios from "axios";
import { Router } from "next/router";

export const generateRandomId = () => {
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    return randomId;
};

export async function fetchProfile() {
    try {
        const res = await axios.get('http://localhost:8080/api/users/profile', {
            withCredentials: true,
        });
        return res.data 

    } catch (err) {
        console.error("Error fetching profile:", err);
    }
}

export async function logoutUser() {
    try {
        await axios.post('http://localhost:8080/api/auth/logout', {}, {
            withCredentials: true,
        });
        return true;
    } catch (error) {
        console.error("Error during logout:", error);
        return false;
    }
}
