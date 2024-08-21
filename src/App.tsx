import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import './index.css'
import './css/personaly.css'
import Ordermission from "./pages/modules/mission/ordre/Ordermission"
import ContentPage from "./pages/content/ContentPage"
import { OrdermissionUser } from "./pages/modules/mission/ordre/OrdermissionUser"
import ContentSuivi from "./pages/modules/mission/ordre/ContentSuivi"
import EnqueteMission from "./pages/modules/mission/ordre/suivi/EnqueteMission"
import CollecteMission from "./pages/modules/mission/ordre/suivi/CollecteMission"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ContentPage />}> 
          <Route path="/ordredemission" element={<Ordermission />} />
          <Route path="/ordredemissiondr" element={<OrdermissionUser />} />
          <Route path="/suivimission" element={<ContentSuivi />} />
          <Route path="/enquete/:id" element={<EnqueteMission />} />
          <Route path="/collecteeconomique" element={<CollecteMission />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
