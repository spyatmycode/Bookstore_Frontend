import React from "react";
import axios from "axios";
import Table from "../components/Table";
import { DataContext } from "../provider/DataProvider";
import useDataContext from "../hooks/useDataContext";

const Home = () => {
  const {data} = useDataContext();

  if(!data) return <div> Loading... </div>





  return (
    <div className=" w-full flex items-center justify-center flex-col">
      <div>
        <h1 className="w-full text-cent">MongoDB Tryout / Backend</h1>
      </div>

      {
        (data?.count > 0) ? <Table />:
        <div>
            <h1>
                No availble books at this time
            </h1>
        </div>

      }

      
    </div>
  );
};

export default Home;
