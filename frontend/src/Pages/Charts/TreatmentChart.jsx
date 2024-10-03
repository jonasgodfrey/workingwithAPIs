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

const TreatmentsChart = () => {
  const [treatmentData, setTreatmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/submissions");
        const submissions = response.data;

        const sulfadoximeCount = submissions.filter(
          (item) => item.treatment === "sulfadoxime"
        ).length;
        const actCount = submissions.filter(
          (item) => item.treatment === "act"
        ).length;
        const artesunateCount = submissions.filter(
          (item) => item.treatment === "artesunate"
        ).length;
        const noneCount = submissions.filter(
          (item) => item.treatment === "none"
        ).length;
        const otherCount = submissions.filter(
          (item) => item.treatment === "other"
        ).length;

        setTreatmentData([
          { name: "Sulfadoxime", count: sulfadoximeCount },
          { name: "ACT", count: actCount },
          { name: "Artesunate", count: artesunateCount },
          { name: "None", count: noneCount },
          { name: "Other", count: otherCount },
        ]);
      } catch (error) {
        console.error("Error fetching treatment data",error)
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Treatment Chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={treatmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default TreatmentsChart;
