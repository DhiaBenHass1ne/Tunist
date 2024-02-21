import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/users',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

class UserService{

    register(data){
        return axiosInstance.post(`/register`, data)
    }

    login(data){
        return axiosInstance.post(`/login`, data)
    }

    logout(){
        return axiosInstance.get(`/logout`)
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