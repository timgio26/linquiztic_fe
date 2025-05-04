import { Route, Routes } from "react-router";
import {Layout} from './Pages/Layout'
import { Homepage } from "./Pages/Homepage";
import { Profile } from "./Pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route>
        <Route element={<Layout/>}>
          <Route index element={<Homepage/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

