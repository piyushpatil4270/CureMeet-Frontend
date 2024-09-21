import { useEffect, useState } from "react";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "../src/pages/Home";
import DocAppointments from "../src/pages/Appointments";
import Patients from "../src/pages/Patients";
import Prescriptions from "../src/pages/Prescriptions";
import DoctorHome from "../src/pages/Dochome";
import DocPage from "./pages/DocPage";
import PatAppointments from "./pages/PatientApp";
import PApp from "./components/PApp";
import DApp from "./components/DApp";
import PatProfile from "./pages/PatProfile";
import DocProfile from "./pages/DocProfile";
import Dochome from "../src/pages/Dochome";

function App() {
  const [isAuth, setAuth] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const existingUser = localStorage.getItem("usertype");
    if (existingUser) {
      setUserType(existingUser);
      setAuth(true);
    }
  }, []);

  return (
    <div className="App w-full h-dvh">
      {!isAuth ? (
        <Routes>
          <Route
            path="/"
            element={<Signin setAuth={setAuth} setUserType={setUserType} />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <div className="flex xs:flex-col sm:flex-row h-dvh w-full">
          <div className="sm:fixed xs:w-full xs:h-[60px] sm:w-[18%] sm:h-full lg:w-[15%] bg-[#243459] sm:rounded-r-[22px]">
            <Navbar userType={userType} setAuth={setAuth} />
          </div>

          <div className="flex-1 overflow-auto  sm:ml-[18%] lg:ml-[15%]">
            <Routes>
              <Route
                path="/"
                element={userType === "Patient" ? <Home /> : <Dochome />}
              />
              <Route
                path="/appointments"
                element={
                  userType === "Patient" ? (
                    <PatAppointments />
                  ) : (
                    <DocAppointments />
                  )
                }
              />
              <Route
                path="/appointment/:id"
                element={userType === "Patient" ? <PApp /> : <DApp />}
              />

              <Route path="/doctor/:id" element={<DocPage />} />
              <Route path="/prescriptions" element={<Prescriptions />} />
              <Route
                path="/profile"
                element={
                  userType === "Patient" ? <PatProfile /> : <DocProfile />
                }
              />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
