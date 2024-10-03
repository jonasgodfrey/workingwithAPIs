import React, { useEffect, useState } from "react";
import axios from "axios"; 
import classes from "./DataTable.module.scss";
import Header from "../Components/Header"; 
import { MaterialReactTable} from "material-react-table";

const DataTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/submissions");
        const data = response.data.map((item, index) => ({
          ...item,
          no: index + 1,
        }));
        setSubmissions(data); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  const columns = [
    {
      accessorKey: "no",
      header: "No",
      size: 50, 
    },
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "client",
      header: "Client",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "weight",
      header: "Weight",
    },
    {
      accessorKey: "diagnosis",
      header: "Diagnosis",
    },
    {
      accessorKey: "treatment",
      header: "Treatment",
    },
    {
      accessorKey: "complaints",
      header: "Complaints",
    },
    {
      accessorKey: "malaria",
      header: "Malaria",
    },
    // You can add more columns if needed
  ];

  return (
    <>
      <Header />
      <div className={classes.tableComponent}>
        <h2 style={{color:"red",textAlign:"center"}}>All Medical Records</h2>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <MaterialReactTable
            columns={columns}
            data={submissions}
            initialState={{ pagination: { pageSize: 10 } }} 
            muiTableProps={{
              
              sx: {
                tableLayout: "auto",
              },
            }}
            muiPaginationProps={{
              rowsPerPageOptions: [5, 10, 20], 
            }}
          />
        )}
        <div className={classes.totalEntries}>
          Total Entries: {submissions.length}
        </div>
      </div>
    </>
  );
};

export default DataTable;
