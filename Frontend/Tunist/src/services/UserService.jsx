import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/users',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

class UserService{

    async register(data) {
        try {
            const response = await axiosInstance.post(`/register`, data);
            return response;
        } catch (error) {
            console.error("Error during registration:", error);
            throw new Error("Registration failed. Please try again."); // You can customize this error message
        }
    }

    async login(data){  try {
        const response = await axiosInstance.post(`/login`, data);
        return response;
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("Login failed. Please try again."); // You can customize this error message
    }
    }

    test(){
        return axiosInstance.post(`/test-cookie`, )
    }

    async logout(){try {
        const response = await axiosInstance.get(`/logout`);
        return response;
    } catch (error) {
        console.error("Error during logout:", error);
        throw new Error("Logout failed. Please try again."); // You can customize this error message
    }
    }
    // getLogReg(){
    //     return axiosInstance.get("")
    // }

    deleteUser(id){
        return axiosInstance.delete(`/${id}`)
    }

    updateUser(data){
        return axiosInstance.put(`/${data.id}`, data)
    }

    getOneUser(id){
        return axiosInstance.get(`/${id}`)
    }

}

export default new UserService();