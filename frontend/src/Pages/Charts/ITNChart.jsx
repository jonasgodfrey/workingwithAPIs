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
import axios from "axios";

const ITNChart = () => {
  const [itnData, setITNData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/submissions"
        );
        const submissions = response.data;

        const itnYesCount = submissions.filter(
          (item) => item.itn === "yes"
        ).length;
        const itnNoCount = submissions.filter(
          (item) => item.itn === "no"
        ).length;

        setITNData([
          { name: "Yes", count: itnYesCount },
          { name: "No", count: itnNoCount },
        ]);
      } catch (error) {
        console.error("Error Fetching ITNData", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "red" }}>ITN Chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={itnData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default ITNChart;
