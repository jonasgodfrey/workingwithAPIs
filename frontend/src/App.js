import DataTable from "./Pages/DataTable";
import axios from "axios";
import GenderChart from "./Pages/Charts/GenderChart";
import PregnantChart from "./Pages/Charts/PregnantChart";
import ITNChart from "./Pages/Charts/ITNChart";
import DiagnosisChart from "./Pages/Charts/DiagnosisChart";
import OutcomeVisitChart from "./Pages/Charts/OutcomeVisitChart";
import LabInvestigationsChart from "./Pages/Charts/LabInvestigationsChart";
import TreatmentsChart from "./Pages/Charts/TreatmentChart";
function App() {
  async function fetchData() {
    try {
      const response = await axios.get("'http://localhost:4000/proxy'");
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }
  fetchData();
  return (
    <>
      <DataTable />
      <GenderChart />
      <PregnantChart />
      <ITNChart />
      <DiagnosisChart/>
      <LabInvestigationsChart/>
      <TreatmentsChart/>
      <OutcomeVisitChart/>
    </>
  );
}

export default App;
