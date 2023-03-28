import React from "react"
import{v4 as uuidv4} from "uuid"
import Header from "../Header"
import { useState,useEffect} from "react"
import { MdCloudUpload} from 'react-icons/md'
import "./index.css"
import { useNavigate } from "react-router-dom"

export default function SubmissionForm(){
  const navigate= useNavigate()

  const [description,setdescription]=useState("")
  const[title,setTitle]=useState("")
  const[summary,setSummary]=useState("")
  const[name,setName]=useState("")
  const[startDate,setStartDate]=useState("")
  const[endDate,setEndDate]=useState("")
  const[githubUrl,setGithubUrl]=useState("")
  const[otherLinks,setOtherLinks]=useState("")
  const [count,setCount=3000]=React.useState("0")

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")
  const [formError,setFormError]=useState(false)



  const onSubmitForm=(event)=>{
    event.preventDefault()
    const submissionData=JSON.parse(localStorage.getItem('submissionData'))|| []

    if(title==="" || summary==="" || description==="" || image==="" || name==="" || startDate==="" || endDate==="" || githubUrl==="" || otherLinks===""){
      setFormError(true)
    }
    else{
      const newSubmission={
        id:uuidv4(),
        title,
        summary,
        description,
        image,
        fileName,
        name,
        startDate,
        endDate,
        githubUrl,
        otherLinks,
        submissionType:"ALL",
        favoriteType:"NO",
        count,
        date:new Date()
      }
      submissionData.push(newSubmission)
      localStorage.setItem("submissionData",JSON.stringify(submissionData))
      navigate('../')
    }


    
  }



  const onChangeTitle=event=>{
    setTitle(event.target.value)
  }

  const onChangeSummary=event=>{
    setSummary(event.target.value)
  }

  const onChangeName=event=>{
    setName(event.target.value)
  }

  const onChangeStartDate=event=>{
    setStartDate(event.target.value)
  }

  const onChangeEndDate=event=>{
    setEndDate(event.target.value)
  }

  const onChangeGithubUrl=event=>{
    setGithubUrl(event.target.value)
  }

  const onChangeLinks=event=>{
    setOtherLinks(event.target.value)
  }


  const onChangeDescription=event=>{
    setdescription(event.target.value)
    setCount(event.target.value.length)
  }

  
  const onChangeImg=(e)=>{
    const data=new FileReader()
    data.addEventListener('load',()=>{ 
      setImage(data.result)
      setFileName(e.target.files[0].name)
    })
    if(e.target.files && e.target.files[0]){
      data.readAsDataURL(e.target.files[0])
    }else{
      setImage(null)
    }
  }

  const imageUploader=()=>{
     return( 
       <main>
         <form novalidate className="form" onClick={() => document.querySelector(".input-field").click() }>
          <input type="file" accept='image/*' className='input-field' hidden 
            onChange={onChangeImg}
         />
          {image ?
            <div className='img-container'>
              <div className='uploaded-img'>
      
              <img src={image} className="img" alt={fileName} />
              <p>{fileName}</p>
            </div>
            <div className='reupload-image'>
              <p style={{color:"#858585"}}>ReUpload</p>
              <p style={{marginLeft:"5px"}}><MdCloudUpload  color="#858585" size={30}/></p>
            </div>
           </div>
            : 
           <div className='no-image-container'>
            <img src="https://res.cloudinary.com/dpjowvn70/image/upload/v1679552225/Vector_5_qwlkfw.png" alt="upload"/>
           </div>
          }
        </form>
        
      </main>
    )
  }

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])  


        return(
            <>
            <Header/>
            <div className="form-bg-container">
                <div className="form-container">
                    <h1 className="form-heading">New Hackathon Submission</h1>
                    <form className="main-container"   onSubmit={onSubmitForm}>
                      <div className="form-item-container">  
                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" placeholder="Title of your submission" value={title} onChange={onChangeTitle} className="input" />
                        
                      </div>

                      <div className="form-item-container">  
                        <label htmlFor="summary">Summary</label>
                        <input id="summary" type="text" placeholder="A short summary of your submission (this will be visible with your submission)" value={summary} onChange={onChangeSummary} className="input" />
                      </div>

                      <div className="form-item-container">  
                        <label>Description</label>
                        <textarea id="description" rows={5} placeholder="Write a long description of your project. You can describe your idea and approach here." className="input-description" maxLength={3000} onChange={onChangeDescription} value={description}/>
                        <p className="extra-lines" >{count}/3,000 characters</p>
                      </div>

                      <div className="form-item-container">  
                        <label htmlFor="image">Cover Image</label>
                        <p className="cover-lines">Minimum resolution: 360px X 360px </p>
                        {imageUploader()}
                      </div>

                      <div className="form-item-container">  
                        <label htmlFor="Hackathon-name">Hackathon Name</label>
                        <input id="Hackathon-name" type="text" placeholder="Enter the name of the hackathon" value={name} onChange={onChangeName} className="input"/>
                      </div>

                      <div className="form-date-container">  
                        <div className="date-container">
                          <label htmlFor="start-date">Hackathon Start Date</label>
                          <input id="start-date" form="novalidateform" type="date" placeholder="Select start date" value={startDate} onChange={onChangeStartDate} className="input-date" required/>

                        </div>
                        <div className="date-container">
                          <label htmlFor="end-date">Hackathon End Date</label>
                          <input id="end-date" form="novalidateform" type="date" placeholder="Select end date" value={endDate} onChange={onChangeEndDate} className="input-date" required/>
                        </div>
                      </div>

                      <div className="form-item-container">  
                        <label htmlFor="github">GitHub Repository</label>
                        <input id="github" type="text" placeholder="Enter your submission’s public GitHub repository link" value={githubUrl} onChange={onChangeGithubUrl} className="input"/>
                      </div>

                      <div className="form-item-container">  
                        <label htmlFor="other-links">Other Links</label>
                        <input id="other-links" type="text" placeholder="You can upload a video demo or URL of you demo app here." value={otherLinks} onChange={onChangeLinks} className="input"/>
                      </div>

                      <button className="form-btn" type="submit" >Upload Submission</button>
                      <p className="error-msg">{formError? "*Please fill all the required Details":" "} </p>
                    </form>
                </div>
            </div>
            </>
        )
    

}

