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

const DiagnosisChart = () => {
  const [diagnosisData, setDiagnosisData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/submissions/"
        );
        const submissions = response.data;
        const positiveCount = submissions.filter(
          (item) => item.diagnosis === "positive"
        ).length;
        const negativeCount = submissions.filter(
          (item) => item.diagnosis === "negative"
        ).length;

        setDiagnosisData([
          { name: "Positive", count: positiveCount },
          { name: "Negative", count: negativeCount },
        ]);
      } catch (error) {
        console.error("Error fetching diagnosis data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 style={{textAlign:"center",color:"red"}}>Positive vs Negative Diagnosis</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={diagnosisData}>
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

export default DiagnosisChart;
