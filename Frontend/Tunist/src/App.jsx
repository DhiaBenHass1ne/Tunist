// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import LogReg from "./views/LogReg";
import { Route, Routes } from "react-router-dom";
import UserType from "./views/UserType";
import Tours from "./views/Tours";
import Attraction from "./views/Attraction";
import Article from "./components/Article";

function App() {
  const [refresh, setRefresh] = useState(true)

  const updateList = ()=>{
      setRefresh(!refresh);
  }
  return (
    <>
    <Routes>
    <Route path="/logreg" element={<LogReg refreshPage={updateList} />} />
    <Route path="/type" element={ <UserType refreshPage={updateList} />}/>
    <Route path="/tours" element={<Tours  refreshPage={updateList}/>}/>
    <Route path="/attractions" element={<Attraction  refreshPage={updateList}/>}/>
    <Route path="/article" element={<Article  refreshPage={updateList}/>}/>
    </Routes>
   
    </>
  );
}

export default App;
