/*Here, you can export the data functions
to get the comapnies, people, getCompanyByID, getPersonById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/
import axios from "axios";

export const getCompanies = async () => {
    let url = "https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json"
    const companies_coll = await axios.get(url);

    return companies_coll.data;    

};

export const getPeople = async () => {
    let url = "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
    const people_list = await axios.get(url)
    
    return people_list.data
};

export const getCompanyById = async (id) => {
    let url = "https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json"
    
    const companies_coll = await axios.get(url);
    let fetched_data = companies_coll.data
    const c =  fetched_data.find(company => company.id === id); 
    return c 
};

export const getPersonById = async (id) => {
    let url = "https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json"
    
    const people_list = await axios.get(url)
    const fetched_data = people_list.data
    const p =  fetched_data.find(people=>people.id === id); 
    return p
};
