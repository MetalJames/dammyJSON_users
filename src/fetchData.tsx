import axios from "axios";

export const BASE_URL = "https://dummyjson.com/users?limit=0";

export const fetchFromAPI = async (url: string) => {
    const { data } = await axios.get(url);

    //add this to update array and add tag [] to every student
    const updateUserWithTag = data.users.map((user: []) => ({...user, userTag: []}));

    return updateUserWithTag;
};
