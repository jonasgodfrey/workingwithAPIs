import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios"; // Using axios to fetch data from the backend

const GenderChart = () => {
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend
        const response = await axios.get(
          "http://localhost:3000/api/submissions"
        );
        const submissions = response.data;

        // Count the number of male and female patients
        const maleCount = submissions.filter(
          (item) => item.sex === "male"
        ).length;
        const femaleCount = submissions.filter(
          (item) => item.sex === "female"
        ).length;

        setGenderData([
          { name: "Male", count: maleCount },
          { name: "Female", count: femaleCount },
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 style={{textAlign:"center",color:"red"}}>Male vs Female</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={genderData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default GenderChart;
