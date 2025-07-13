import { Route, Routes } from "react-router";
import { Homepage,Layout,Profile,ProtectedPage,Auth,NewWords,FlashCard, Word } from "./Pages/Index";

export default function App() {
  return (
    <Routes>
      <Route>
        <Route element={<Layout/>}>
          <Route index element={<ProtectedPage><Homepage/></ProtectedPage>}/>
          <Route path="profile" element={<ProtectedPage><Profile/></ProtectedPage>}/>
          <Route path="newwords" element={<ProtectedPage><NewWords/></ProtectedPage>}/>
          <Route path="flashcard" element={<ProtectedPage><FlashCard/></ProtectedPage>}/>
          <Route path="word" element={<ProtectedPage><Word/></ProtectedPage>}/>
          <Route path="auth" element={<Auth/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

