// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Routes, Route, useLocation  } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login";
import DeviceList from "./scenes/devicelist";
import DeviceAppointList from "./scenes/deviceappointlist";
import DeviceBarGraph from "./scenes/devicebargraph";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import DeviceDaily from "./scenes/devicedaily";





function App() {

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const location = useLocation();
  const excludedRoutes = ['/login'];  // top,side 포함하지 않는 주소값 정하기


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!excludedRoutes.includes(location.pathname) && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!excludedRoutes.includes(location.pathname) &&<Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/devicelist" element={<DeviceList />} />
              <Route path="/deviceappointlist" element={<DeviceAppointList />} />
              <Route path="/devicebargraph" element={<DeviceBarGraph />} />
              <Route path="/devicedaily" element={<DeviceDaily />} />

              
              
            
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );



}

export default App;
