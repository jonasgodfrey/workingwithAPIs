import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import the Firestore instance
import classes from "./DataTable.module.scss";
import Header from "../Components/Header";

const DataTableFB = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "submissions"));
      const data = querySnapshot.docs.map((doc, index) => ({
        ...doc.data(),
        id: doc.id,
        no: index + 1, 
        // To add numbering in the table
      }
    ));
      setSubmissions(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className={classes.tableComponent}>
        <h2>All Medical Records</h2>
        <table border="1" width="100%" className={classes.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Client</th>
              <th>Age</th>
              <th>Weight</th>
              <th>Diagnosis</th>
              <th>Treatment</th>
              <th>Complaints</th>
              <th>Malaria</th>
              <th>Ward</th>
              <th>Designation</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td>{submission.no}</td>
                <td>{submission.id}</td>
                <td>{submission.client}</td>
                <td>{submission.age}</td>
                <td>{submission.weight}</td>
                <td>{submission.diagnosis}</td>
                <td>{submission.treatment}</td>
                <td>{submission.complaints}</td>
                <td>{submission.malaria}</td>
                <td>{submission.ward}</td>
                <td>{submission.designation}</td>
                <td>{submission.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={classes.totalEntries}>
          Total Entries: {submissions.length}
        </div>
      </div>
    </>
  );
};

export default DataTableFB;
