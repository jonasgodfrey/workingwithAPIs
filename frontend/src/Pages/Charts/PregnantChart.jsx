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

const PregnantChart = () => {
  const [pregnancyData, setPregnancyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the Express API
        const response = await axios.get(
          "http://localhost:3000/api/submissions"
        );
        const submissions = response.data;

        // Count the number of pregnant and non-pregnant patients
        const pregnantCount = submissions.filter(
          (item) => item.pregnant === "yes"
        ).length;
        const nonPregnantCount = submissions.filter(
          (item) => item.pregnant === "no"
        ).length;

        // Set the chart data
        setPregnancyData([
          { name: "Pregnant", count: pregnantCount },
          { name: "Non-Pregnant", count: nonPregnantCount },
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 style={{textAlign:"center",color:"red"}}>Pregnancy Data Chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={pregnancyData}>
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

export default PregnantChart;
