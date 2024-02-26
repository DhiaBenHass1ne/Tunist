// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import LogReg from "./views/LogReg";
import { Route, Routes } from "react-router-dom";
import UserType from "./views/UserType";

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
    </Routes>
   
    </>
  );
}

export default App;
