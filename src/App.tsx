import Dashboard from "./components/Dashboard";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PatientDetails from "./components/PatientDetails";
import { PatientsProvider } from "./contexts/PatientsContext";
import { SearchProvider } from "./contexts/SearchContext";
import { SortedProvider } from "./contexts/SortContext";
import { GenderProvider } from "./contexts/GenderContext";
import { AgeProvider } from "./contexts/AgeContext";

export default function App() {
  return (
    <div className="App">
      <PatientsProvider>
        <SearchProvider>
          <SortedProvider>
            <GenderProvider>
              <AgeProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/patients/:patientId" element={<PatientDetails />} />
                  </Routes>
                </BrowserRouter>
              </AgeProvider>
            </GenderProvider>
          </SortedProvider>
        </SearchProvider>
      </PatientsProvider>
    </div >
  );
}
