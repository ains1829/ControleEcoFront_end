import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import './index.css'
import './css/personaly.css'
import Ordermission from "./pages/modules/mission/ordre/Ordermission"
import ContentPage from "./pages/content/ContentPage"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ContentPage />}> 
          <Route path="/ordredemission" element={<Ordermission />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
