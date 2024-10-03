import React, { useEffect, useState } from "react";
import axios from "axios";
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

const LabInvestigationsChart = () => {
  const [labData, setLabData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your MongoDB API
        const response = await axios.get(
          "http://localhost:3000/api/submissions"
        );
        const submissions = response.data;

        const microscopeCount = submissions.filter(
          (item) => item.lab_investigation === "microscope"
        ).length;
        const rdtCount = submissions.filter(
          (item) => item.lab_investigation === "rdt"
        ).length;
        const noTestCount = submissions.filter(
          (item) => item.lab_investigation === "no_test"
        ).length;

        setLabData([
          { name: "Microscope", count: microscopeCount },
          { name: "RDT", count: rdtCount },
          { name: "No Test", count: noTestCount },
        ]);
      } catch (error) {
        console.error("Error fetching submissions data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {" "}
      <h1 style={{ textAlign: "center", color: "red" }}>
        Lab Investigations Chart
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={labData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default LabInvestigationsChart;
