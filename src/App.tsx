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
import { Missionboard } from "./pages/modules/dashboard/Missionboard"
import Ppnboard from "./pages/modules/dashboard/Ppnboard"
import ContentSuividrdt from "./pages/modules/mission/ordre/ContentSuividrdt"
import Societe from "./pages/modules/pmter/Societe"
import Calendar from "./pages/modules/mission/ordre/Calendar"
import Administrationpage from "./pages/modules/administration/AdministrationPage"
import Societeglobal from "./pages/modules/pmter/Societeglobal"
import Administration from "./pages/modules/administration/Adminpage"
import Ppnboardregional from "./pages/modules/dashboard/Ppnboardregional"
import Autresuivi from "./pages/modules/mission/ordre/suivi/Autresuivi"
import Signalement from "./pages/modules/dashboard/stat/Signalementboard"
// import Signaladmin from "./pages/modules/signal/Signaladmin"
import SignalmentRegion from "./pages/modules/dashboard/stat/SignalmentRegion"
import Account from "./pages/modules/account/Account"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ContentPage />}> 
          <Route path="/dashboardsg" element={<Missionboard />}></Route>
          <Route path="/signalement" element={<Signalement />}></Route>
          <Route path="/missionnaire" element={<Administrationpage />}></Route>
          <Route path="/societe" element={<Societe />}></Route>
          <Route path="/societeglobal" element={<Societeglobal />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/ppnglobal" element={<Ppnboard />}></Route>
          <Route path="/ppnregion" element={<Ppnboardregional />}></Route>
          <Route path="/ordredemission" element={<Ordermission />} />
          <Route path="/ordredemissiondr" element={<OrdermissionUser />} />
          <Route path="/suivimission" element={<ContentSuivi />} />
          <Route path="/suivimission_dr_dt" element={<ContentSuividrdt />} />
          <Route path="/enquete/:id" element={<EnqueteMission />} />
          <Route path="/autresuivi/:id" element={<Autresuivi />} />
          <Route path="/collecteeconomique/:id" element={<CollecteMission />} />
          <Route path="/administration" element={<Administration />} />
          {/* <Route path="/signal/:id/:date" element={<Signaladmin />} /> */}
          <Route path="/signalementregion" element={<SignalmentRegion />} />
          <Route path="/account" element={<Account/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
