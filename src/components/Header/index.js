import {Link} from "react-router-dom"
import "./index.css"


const Header=()=>(
    <nav className="nav-container">
        <div className="logo-container">
            <Link to="/">
              <img src="https://res.cloudinary.com/dpjowvn70/image/upload/v1679510449/AI_Planet_Logo_yndny5.png" alt="logo"/>
           </Link>
         </div>
    </nav>
)

export default Header