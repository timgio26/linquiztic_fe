import { Route, Routes } from "react-router";
import {Layout} from './Pages/Layout'
import { Homepage } from "./Pages/Homepage";
import { Profile } from "./Pages/Profile";
import { ProtectedPage } from "./Pages/ProtectedPage";
import { Auth } from "./Pages/Auth";

export default function App() {
  return (
    <Routes>
      <Route>
        <Route element={<Layout/>}>
          <Route index element={<ProtectedPage><Homepage/></ProtectedPage>}/>
          <Route path="profile" element={<ProtectedPage><Profile/></ProtectedPage>}/>
          <Route path="auth" element={<Auth/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

