//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import axios from "axios";

export const getBooks = async (url) =>{
    const { data } = await axios.get(url)
    return data

}
export const getBookById = async (id) => {
    if(!id){
        throw 'Input parameter id doesnot exist'
    }
    if(typeof id!== 'string'){
        throw 'ID should be of type string'
    }
    if(id.trim() === ''){
        throw 'String should not be just spaces'
    }
    id = id.trim()
    const got_data = await getBooks('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    const book = got_data.find(book => book.id === id)
    if(!book){
        throw 'Didnot find any book for the provided ID'
    }
    return book
   
};

export const booksByPageCount = async (min, max) => {
    if(!min){
        throw 'Parameter doesnot exist'
    }
    if(!max){
        throw 'Parameter doesnot exist'
    }
    if(typeof min!=='number' || typeof max!== 'number'){
        throw 'Parameters should only be numbers'
    }
    if(min < 1 || max < 1){
        throw 'Parameters should be a positive whole number'
    }
    if(min>=max){
        throw 'Min cannot be greater or equal to max'
    }
    const got_data = await getBooks('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    const books_list = got_data.filter(book=> book.pageCount >= min && book.pageCount<=max)
    const result = []
    books_list.forEach(element => {
         
            result.push(element.id)
        
    });
    return result
};

export const sameYear = async (year) => {
    if(!year){
        throw 'Parameter year doesnot exist'
    }
    if(typeof year!== 'number'){
        throw 'Year should be a number'
    }
    if (!Number.isInteger(year)){
        throw 'Year should be an integer'
    }
    if(year%1!==0){
        throw 'Year should be an integer'
    }
    if(!(year>1000 && year< new Date().getFullYear())){
        throw 'Not a valid year'
    }
    if(String(year).length!==4){
        throw 'Not a valid format of year'
    }

    const got_data = await getBooks('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    const books_list = got_data.filter(book=> {
        const year_of_book = new Date(book.publicationDate).getFullYear()
          if(year_of_book === year){
            return true
          }

    })

     return books_list
}

export const minMaxPrice = async () => {
    const got_data = await getBooks('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    let prices = []
    got_data.forEach(element => {
        prices.push(element.price)
    })
    prices = prices.sort((a,b) => a-b)
    let cheapest = prices[0]
    let mostExpensive = prices[prices.length - 1]
    const cheapest_array = got_data.filter(book=> book.price === cheapest)
    const expensive_array = got_data.filter(book=> book.price === mostExpensive)

    let result = {}
    result['cheapest'] = cheapest_array.map(book=> book.id)
    result['mostExpensive'] = expensive_array.map(book=> book.id)
    return result
};

export const searchBooksByPublisher = async (publisher) => {
    if(!publisher){
        throw 'Input parameter doesnot exist'
    }
    if(typeof publisher!== 'string'){
        throw 'Parameter should only be a string'
    }
    if(publisher.trim() === ''){
        throw 'String should not be just empty spaces'
    }
    publisher = publisher.trim().toLowerCase()
    
    const got_data = await getBooks('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    const book_by_authors = got_data.filter(book=> book.publisher.toLowerCase() === publisher)
    
    if(book_by_authors.length === 0){
        throw 'No books found for this publisher'
    }
    
    return book_by_authors.map(book=> book.id)
};
