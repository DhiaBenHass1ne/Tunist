// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import LogReg from "./views/LogReg";
import { Route, Routes } from "react-router-dom";
import UserType from "./views/UserType";
import Tours from "./views/Tours";
import AdminDash from "./views/AdminDash";
import NavBar from "./components/NavBar";
import LandingPage from "./views/LandingPage";
import Blog from "./views/Blog";

function App() {
  const [refresh, setRefresh] = useState(true)

  const updateList = ()=>{
      setRefresh(!refresh);
  }
  return (
    <>
    {/* <NavBar/> */}
    <Routes>
    
    <Route path="/home" element={<LandingPage refreshPage={updateList} />} />
    <Route path="/logreg" element={<LogReg refreshPage={updateList} />} />
    <Route path="/type" element={ <UserType refreshPage={updateList} />}/>
    <Route path="/tours" element={<Tours  refreshPage={updateList}/>}/>
    <Route path="/admin/*" element={<AdminDash  refreshPage={updateList}/>}/>
    <Route path="/blog" element={<Blog  refreshPage={updateList}/>}/>
    </Routes>
   
    </>
  );
}

export default App;
