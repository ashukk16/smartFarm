import {  Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import UserProfile from "./components/UserProfile";
import Farm from "./components/Farm";
import Crop from "./components/Crop";
import Soil from "./components/Soil";
import GovernmentScheme from "./components/GovernmentScheme";
import AddScheme from "./components/AddScheme";
import WeatherViewer from "./components/WeatherViewer";
import FarmerQueries from "./components/FarmerQueries";
import Expert from "./components/Expert";
import CropGuideManager from "./components/CropGuideManager";
import CropGuideView from "./components/CropGuideView";
import AdminNotificationManager from "./components/AdminNotificationManager";
import FarmerNotificationViewer from "./components/FarmerNotificationViewer";
import AdminDashboard from "./components/AdminDashboard";







function App() {
  return(
    
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        
        {/* protected layout route with navbar */}
        <Route element={<Layout/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/farms" element={<Farm/>}/>
        <Route path="/crops" element={<Crop/>}/>
        <Route path="/soil/:farmId" element={<Soil/>}/>
        <Route path="/schemes" element={<GovernmentScheme/>}/>
        <Route path="/schemes/add" element={<AddScheme/>}/>
        <Route path="/weather/:farmId" element={<WeatherViewer/>}/>
        <Route path="/farmerqueries" element={<FarmerQueries/>}/>
        <Route path="/expert" element={<Expert/>}/>
        <Route path="/cropguide" element={<CropGuideManager/>}/>
        <Route path="/cropguideview" element={<CropGuideView/>}/>
        <Route path="/adminNotificationManager" element={<AdminNotificationManager/>}/>
        <Route path="/farmernotificationViewer" element={<FarmerNotificationViewer/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard/>}/>
          </Route>

        
      </Routes>
    
  );
}

export default App;
