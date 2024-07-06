import axios from "axios"
//import md5

export const searchMoviesByName = async (title) => {
  /*Function to make an axios call to search the api and return up to 20 movies matching the title param
  API endpoint: http://www.omdbapi.com/?apikey=CS546&s={title}
  */
  if(!title){
  throw 'Title Not Provided'
   //return { error: 'Title Not Provided' };
  }
  if(typeof title!== "string"){
    throw 'Title should be a string'
  }
  if(title.trim() === ""){
    throw 'String should not be just empty spaces'
  }
  const apikey = "CS546";
  const movies_list1 = await axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${title}`);
  const array_of_movies = movies_list1.data.Search || [];
  const movies_list2 = await axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${title}&page=2`);
  const array_of_movies1 = movies_list2.data.Search || [];
  for(let i of array_of_movies1){
    array_of_movies.push(i);
  }

  return array_of_movies;

};

export const searchMovieById = async (id) => {
  /*Function to make an axios call to the the api matching the id
 API endpoint: http://www.omdbapi.com/?apikey=CS546&i={id}
  */
if(!id){
  throw 'ID should be of type string'
}
if(typeof id!== "string"){
  throw 'ID should be of type string'
}
if(id.trim()===""){
  throw 'ID should not be only spaces'
}
const apikey = "CS546";
const movie = await axios.get(`http://www.omdbapi.com/?apikey=${apikey}&i=${id}`);
return movie.data;

};
