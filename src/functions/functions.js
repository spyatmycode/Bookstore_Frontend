import axios from 'axios'
import toast from 'react-hot-toast';
import { URL } from '../config/config';

//This is to delete a single book

export const deleteBook = async (id, getData, token) => {

  await toast.promise(
    axios.delete(`${URL}/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        getData();
      }),
    {
      loading: 'Loading',
      success: 'Book deleted succesfully',
      error: (err) => err.response.data.message
    }
  )

}

//This is to add a single book

export const addBook = async (title, year, author, imageUrl, getData, token) => {
  console.log(token);
  await toast.promise(
    axios.post(`${URL}/books`, {
      title: title,
      publishYear: Number(year),
      author: author,
      imageUrl:imageUrl
    },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      getData();
    }),
    {
      loading: 'Adding book...',
      success: 'Book added successfully',
      error: (err) => {
        console.error('Error adding book:', err);
        return 'Failed to add the book';
      },
    }
  );
};

//This is to edit a book

export const editBook = async (id, title, year, author,imageUrl, getData, token) => {
  await toast.promise(
    axios.put(`${URL}/books/${id}`, {
      title: title,
      publishYear: Number(year),
      author: author,
      imageUrl:imageUrl
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      getData();
    }),
    {
      loading: 'Updating book...',
      success: 'Book updated successfully',
      error: (err) => {
        console.error('Error adding book:', err);
        return 'Failed to add the book';
      },
    }
  );
};

//This is to get a specific book

export const getBook = async (id, token) => {

  const book = await axios.get(`${URL}/books/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

  const data = await book.data


  return data;

};

export function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

