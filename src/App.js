import {Routes,Route} from "react-router-dom"

import './App.css'
import Home from "./components/Home"
import SubmissionForm from "./components/SubmissionForm"
import ItemDetails from "./components/ItemDetails"
import EditForm from "./components/EditForm"

const App=()=>(
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/submission-form" element={<SubmissionForm/>}/>
      <Route exact path="/submission/:id" element={<ItemDetails/>}/>
      <Route exact path="/submission/edit/:id" element={<EditForm/>}/>
    </Routes>
)

export default App