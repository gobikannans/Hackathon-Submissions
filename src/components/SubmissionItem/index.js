import { Link } from "react-router-dom"
import "./index.css"

export default function SubmissionItem(props){
    const {submissionDetails}=props
    const{id,title,image,summary,date}=submissionDetails   

    const {formatDistanceToNow}=require("date-fns")

    const lastDate=new Date(date)
    const ans=formatDistanceToNow(lastDate)


    return(
        <Link to={`/submission/${id}`}className="item-links" >
        <li className="submission-item-container">
            <div className="submission-details">
                <img src={image} alt="img" className="img-item"/>
                <h1 className="list-heading">{title}</h1>
            </div>
            <div className="list-summary" style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>
                <p>{summary}</p>
            </div>
            <p className="list-date">uploaded {ans} ago </p>
        </li>
        </Link>
    )
}

