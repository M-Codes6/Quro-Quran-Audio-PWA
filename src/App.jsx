import { Routes, Route, useLocation } from "react-router-dom"
import { useState } from "react"
import { Analytics } from "@vercel/analytics/react"

import Home from "./pages/Home"
import Surahs from "./pages/Surahs"
import Nasheeds from "./pages/Nasheeds"
import Profile from "./pages/Profile"
import QariSurahs from "./pages/QariSurahs"

import { FEATURES } from "./config/features"

import BottomNav from "./components/BottomNav"
import MiniPlayer from "./components/MiniPlayer"
import SearchBar from "./components/SearchBar"
import InstallPrompt from "./components/InstallPrompt"

function App(){

const [search,setSearch] = useState("")
const location = useLocation()

const showSearch =
location.pathname === "/surahs" ||
location.pathname === "/nasheeds"

return(

<>

{showSearch && (
<SearchBar search={search} setSearch={setSearch}/>
)}

<Routes>

<Route path="/" element={<Home/>}/>
<Route path="/surahs" element={<Surahs search={search}/>}/>
<Route path="/nasheeds" element={<Nasheeds search={search}/>}/>
<Route path="/profile" element={<Profile/>}/>

{FEATURES.QARI_RECITERS && (
<Route path="/qari/:id" element={<QariSurahs/>}/>
)}

</Routes>

<MiniPlayer/>
<BottomNav/>
<InstallPrompt/>
<Analytics/>

</>

)

}

export default App