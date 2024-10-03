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

const OutcomeVisitChart = () => {
  const [outcomeData, setOutcomeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/submissions"
        );
        const submissions = response.data;

        const treatedCount = submissions.filter(
          (item) => item.outcome_visit === "treated"
        ).length;
        const notTreatedCount = submissions.filter(
          (item) => item.outcome_visit === "not_treated"
        ).length;
        const admittedCount = submissions.filter(
          (item) => item.outcome_visit === "admitted"
        ).length;
        const referralCount = submissions.filter(
          (item) => item.outcome_visit === "referral"
        ).length;
        const deathCount = submissions.filter(
          (item) => item.outcome_visit === "death"
        ).length;

        setOutcomeData([
          { name: "Treated", count: treatedCount },
          { name: "Not Treated", count: notTreatedCount },
          { name: "Admitted", count: admittedCount },
          { name: "Referral", count: referralCount },
          { name: "Death", count: deathCount },
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 style={{textAlign:"center",color:"red"}}>Outcome of Visit Chart</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={outcomeData}>
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

export default OutcomeVisitChart;
