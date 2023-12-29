import React, { useContext } from 'react'
import { DataContext } from '../provider/DataProvider'

const useDataContext = () => {

    const context = useContext(DataContext)

    if(!context){
        throw Error("Please use the data context inside the data context scope")
    }

    return context;
  
}

export default useDataContext
