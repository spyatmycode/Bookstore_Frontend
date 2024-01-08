import axios from 'axios'
import toast from 'react-hot-toast';
import { URL } from '../config/config';

//This is to delete a single book

export const deleteBook = async (id, imageFileName, getData, token) => {

  await toast.promise(
    axios.delete(`${URL}/books/${id}?imageFileName=${imageFileName}`, {
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

export const addBook = async (title, year, author, image, getData, token) => {

  const formData = new FormData();
  formData.append("title", title)
  formData.append("publishYear", year)
  formData.append("image", image)
  formData.append("author", author)


 
  await toast.promise(
    axios.post(`${URL}/books`, formData,{
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
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

export const editBook = async (id, title, year, author,image, getData, token) => {
  const formData = new FormData();
  formData.append("title", title)
  formData.append("publishYear", year)
  formData.append("image", image.imageFile)
  formData.append("author", author)
  formData.append("previousImageName", image.fileName);
  formData.append("previousImageURL", image.imageDownLoadUrl);

  await toast.promise(
    axios.put(`${URL}/books/${id}`, formData, {
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

