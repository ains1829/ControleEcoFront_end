import { Route, Routes } from "react-router-dom"
import Login from "./pages/auth/Login"
import './index.css'
import './css/personaly.css'
import Typeproduct from "./pages/modules/mission/ordre/Ordermission"
import ContentPage from "./pages/content/ContentPage"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ContentPage />}> 
          <Route path="/ordredemission" element={<Typeproduct />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
