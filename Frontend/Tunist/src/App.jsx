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
import Profile from "./views/Profile";
import SignUp from "./views/SignUp";
import Carousel from "./components/Signup/Carousel";
// import Attractions from "./views/Attractions";
import MapTest from "./views/MapTest";
import NewAttraction from "./views/NewAttraction";
import PublicTours from "./views/PublicTours";
import Chat from "./views/Chat";
import OneArticle from "./views/OneArticle";
import Houses from "./views/Houses";
import Guides from "./views/Guides";


function App() {
  const [refresh, setRefresh] = useState(true)

  const updateList = ()=>{
      setRefresh(!refresh);
  }
  return (
    <>
    {/* <NavBar/> */}
    <Routes>
    <Route path="/article/:id" element={<OneArticle/>} />
    <Route path="/chatapp" element={<Chat/>} />
    <Route path="/houses" element={<Houses/>} />
    <Route path="/home" element={<LandingPage refreshPage={updateList} />} />
    <Route path="/logreg" element={<LogReg refreshPage={updateList} />} />
    <Route path="/type" element={ <UserType refreshPage={updateList} />}/>
    <Route path="/tours" element={<Tours  refreshPage={updateList}/>}/>
    <Route path="/admin/*" element={<AdminDash  refreshPage={updateList}/>}/>
    <Route path="/blog" element={<Blog  refreshPage={updateList}/>}/>
    {/* <Route path="/attractions" element={<Attractions  refreshPage={updateList}/>}/> */}
    <Route path="/profile/:user_id" element={<Profile  refreshPage={updateList}/>}/>
    <Route path="/signup" element={<SignUp refreshPage={updateList}/>}/>
    <Route path="/carousel" element={<Carousel/>}/>
    <Route path="/map" element={<MapTest></MapTest>}/>
    <Route path="/attractions" element={<NewAttraction></NewAttraction>}/>
    <Route path="/publicTours" element={<PublicTours></PublicTours>}/>
    <Route path="/guides" element={<Guides></Guides>}/>
    </Routes>
   
    </>
  );
}

export default App;
