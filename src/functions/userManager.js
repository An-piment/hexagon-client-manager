import Axios from "axios";

const USER_URL = "http://localhost:3000/users/"

export const deleteUser = async (id) => await Axios.delete(`${USER_URL}${id}`);

export const getUsers = async () => await Axios
	.get(USER_URL)
	.then (({ data }) => data);


export const updateUser = async (id, data) => Axios.put(`${USER_URL}${id}`, data);

export const addUser = async (id, data) => Axios.post(USER_URL, data);