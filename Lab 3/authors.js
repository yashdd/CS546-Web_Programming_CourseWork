//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import axios from "axios";
import {getBookById,getBooks}  from "./books.js"

const get_authors = async (url) => {
    try {
        const { data } = await axios.get(url)
        return data
    } catch (error) {
        console.log(error)
    }
    
}
export const getAuthorById = async (id) => {
    if(!id){
        throw 'Input parameter id doesnot exist'
    }
    if(typeof id!== 'string'){
        throw 'id should be of type string'
    }
    if(id.trim() === ''){
        throw 'String should not be just spaces'
    }
    id = id.trim()
    const got_data = await get_authors('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
    const author = got_data.find(author => author.id === id)
    if(!author){
        throw 'Didnot find any author for the provided ID'
    }
    return author
   
   
 };

export const searchAuthorsByAge = async (age) => {
    if(!age){
        throw 'Input parameter age doesnot exist'
    }
    if(typeof age!== 'number'){
        throw 'Age should be of type number'
    }
    if(age > 100 || age < 1){
        throw 'Age should be between 1 to 100'
    }
    const got_data = await get_authors('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
    const dob = got_data.filter(author => {
        const currrent_date = new Date();
        const dob_year = new Date(author.date_of_birth).getFullYear();
        let age1 =  currrent_date.getFullYear() - dob_year
        const month = new Date(author.date_of_birth).getMonth() - currrent_date.getMonth();
        if(month > 0 || month === 0 && (currrent_date.getDate() - new Date(author.date_of_birth).getDate()) < 0 ){
            age1 = age1 - 1
        }
        return age1 >= age

     })

     if(dob.length === 0){
        throw 'No Authors found for this age'
     }

    return dob.map(author => `${author.first_name} ${author.last_name}`)
};

export const getBooksByState = async (state) => {

    if(!state){
        throw 'Input parameter doesnot exist'
    }
    if(typeof state!== 'string'){
        throw 'Input parameter should be a string'
    }
    if(state.trim() == ''){
        throw 'String cannot be just empty spaces'
    }

    state = state.trim()

    if(state.length!==2){
        throw 'State abberivation should only be of 2 characters'
    }
    

    const author_data = await get_authors('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
    const books_data = await getBooks('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    const authors = author_data.filter(author=> author.HometownState.toLowerCase() === state.toLowerCase())
    if(authors.length === 0){
        throw 'No Authors found from the given state, hence no books found'
    }
    const result = []

    authors.forEach(element => {
        let books = books_data.filter(book=> book.authorId === element.id)
        books.forEach(book => result.push(book.title))
            
        
    });

    return result

};

export const searchAuthorsByHometown = async (town, state) => {
    if(!town){
        throw 'Town Parameter doesnot exist'
    }
    if(!state){
        throw 'State Parameter doesnot exist'
    }
    if(typeof town!=='string' || typeof state!= 'string'){
        throw 'Parameters should only be string'
    }
    if(town.trim() === '' || state.trim() === ''){
        throw 'Strings cannot be just empty spaces'
    }
    town = town.trim()
    state = state.trim()

    if(state.length!==2){
        throw 'State string should be of length 2'
    }
    
    const author_data = await get_authors('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
    const town_exists = author_data.some(town_1=> town_1.HometownCity.toLowerCase() === town.toLowerCase()) 
    if(!town_exists){
        throw 'This town is not present in the data'
    }
    const state_exists = author_data.some(state_1=> state_1.HometownState.toLowerCase() === state.toLowerCase()) 
    if(!state_exists){
        throw 'This state is not present in the data'
    }
    const authors = author_data.filter(author=> author.HometownState.toLowerCase() === state.toLowerCase() && author.HometownCity.toLowerCase() === town.toLowerCase()) 
    
    if(authors.length === 0){
        throw 'No Authors found from the given state and city'
    }
    let result = []
    authors.forEach(element => {
        let a = `${element.first_name} ${element.last_name}`
        result.push(a)
    })
    const sort_lastnames = (a,b) =>{
        const a1 = a.split(' ')[1]
        const a2 = b.split(' ')[1]
        return a1.localeCompare(a2)
    }
    result.sort(sort_lastnames)

    return result
};

export const getAuthorBooks = async (authorid) => {

    if(!authorid){
        throw 'Parameter authorid doesnot exist'
    }
    if(typeof authorid!== 'string'){
        throw 'Parameter authorid should be of type string'
    }
    if(authorid.trim() === ''){
        throw 'Parameter authorid should not contain only spaces'
    }
    authorid = authorid.trim()

    const author_data = await get_authors('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
    const author_of_books = author_data.find(author => author.id === authorid )
    if(!author_of_books){
        throw 'No Author found for the given authorid'
    }
    const book_ids = author_of_books.books || []
    //console.log(book_ids)
    let result = []
    for(let i=0;i<book_ids.length;i++){
        const book_name = await getBookById(`${book_ids[i]}`)
        result.push(book_name.title)
        
    }
  
    return result
};
 