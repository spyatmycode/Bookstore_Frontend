import React, { useState } from "react";
import {FaEdit, FaTrash} from 'react-icons/fa'
import { DataContext } from "../provider/DataProvider";
import { DeleteModal, EditModal } from "./Modals";
import { Link } from "react-router-dom";
import useDataContext from "../hooks/useDataContext";

const Table = () => {

  const {data} = useDataContext()

  const [show, setShow] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [id, setID] = useState(null);
  const [imageName, setImageName] = useState(null)



  return (
    <div>

      <DeleteModal show={show} setShow={setShow} imageFileName={imageName} id={id}/>
      <EditModal setShow={setEditModal} show={editModal} id={id}/>

      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      id
                    </th>
                    <th scope="col" className="px-6 py-4">
                      title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date Created
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date Updated
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                      
                    </th>

                  </tr>
                </thead>
                <tbody>


                  {data?.books.map((dataItem) => {

                    const {
                      _id,
                      author,
                      createdAt,
                      publishYear,
                      updatedAt,
                      title,
                      image

                    } = dataItem

                    return (<tr className="border-b dark:border-neutral-500" key={_id}>

                      <td className="whitespace-nowrap px-6 py-4"><Link to={`/books/${_id}`}>{_id}</Link></td>
                      <td className="whitespace-nowrap px-6 py-4">{title}</td>
                      <td className="whitespace-nowrap px-6 py-4">{author}</td>
                      <td className="whitespace-nowrap px-6 py-4">{publishYear}</td>
                      <td className="whitespace-nowrap px-6 py-4">{createdAt}</td>
                      <td className="whitespace-nowrap px-6 py-4">{updatedAt}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-2 cursor-pointer">
                          <span onClick={()=>{setID(_id);setEditModal(true);}}><FaEdit className="text-emerald-500"/></span>
                          <span onClick={()=>{setID(_id);setShow(true); setImageName(image.fileName)}}><FaTrash className="text-red-500"/></span>
                        </div>
                      </td>
                    </tr>)
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>





  )
}



export default Table;
