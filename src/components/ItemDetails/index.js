import React, { useState } from "react";
import {Link} from "react-router-dom"
import {useParams } from "react-router-dom";
import {AiFillStar,AiTwotoneCalendar,AiFillGithub} from "react-icons/ai"
import {RiPencilFill} from "react-icons/ri"
import {RxExternalLink} from "react-icons/rx"
import {FaTrash} from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import Header from "../Header" 

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'


import "./index.css"



export default function ItemDetails(props){ 
    const navigate= useNavigate()
    const {id}=useParams();
    const [active,setActive]=useState(false)
    const submissionData=JSON.parse(localStorage.getItem("submissionData")) || []
    const requiredData=submissionData.map(eachItem=>{
        if(eachItem.id===id){
            return eachItem
        }else{
            return null
        }
    })
    const dataList=requiredData.filter(ele=>{
        return ele!=null
    })

    var monthNames = ["Jan", "Feb", "March", "April", "May","June","July", "Aug", "Sep", "Oct", "Nov","Dec"];

    const startDate=new Date(dataList[0].startDate)
    const endDate=new Date(dataList[0].endDate)
    let sd=startDate.getDate()
    let ed=endDate.getDate()
    let sm=monthNames[startDate.getMonth()]
    let em=monthNames[endDate.getMonth()]
    let sy=startDate.getFullYear()
    let ey=endDate.getFullYear()

    const onClickStar=()=>{
        setActive(!active);

        if(!active){
            submissionData.map(eachItem=>{
                if(eachItem.id===id){
                    return eachItem.favoriteType="YES"
                }
                return eachItem
            })
        }
        localStorage.removeItem("submissionData")
        localStorage.setItem("submissionData",JSON.stringify(submissionData))
        navigate("../")
    }

    const onClickRemoveModel=()=>{
        const updatedSubmissionData=submissionData.filter(eachItem=>
            eachItem.id!==id)
        localStorage.setItem('submissionData',JSON.stringify(updatedSubmissionData))
        navigate("../")   
    }
    return (
        <>
        <Header/>
        <div className="details-banner-container">
                  <div className="details-banner">  
                    <div className="top-details">
                        <div className="logo-details">
                            <img src={dataList[0].image} alt="filename" className="details-img"/>   
                            <h1 className="details-heading">{dataList[0].title}</h1>
                        </div>
                        <div className="details-btn-container">
                           <Link to={`/submission/edit/${id}`} className="btn-links">
                            <button className="details-btn" style={{marginBottom:"20px",marginTop:"20px"}}><RiPencilFill size={18} style={{marginRight:"10px"}}/> Edit</button> 
                          </Link>
                            <Popup
                             modal
                             trigger={
                             <button className="details-btn"><FaTrash style={{marginRight:"13px"}}/> Delete</button>
                            }
                            className="popup-content"
                            >
                  {close => (
                    <div className="popup-container">
                      <h1 className="model-name">Delete Model</h1>
                      <p className="model-para">This action is irreversible. Are you sure you want to delete this model?</p>
                      <div className="popup-btn-container">
                        <button className="cancel-btn" onClick={() => close()}>Cancel</button>
                        <button className="delete-btn" onClick={onClickRemoveModel}>Delete</button>
                      </div>
                    </div>
                  )}
                </Popup>
                        </div>
                        </div>
                    </div>
                    <p className="details-para"> {dataList[0].summary}</p>
                    <div className="bottom-details">
                        <div className="star">
                            <button className="star-btn" onClick={onClickStar}> <AiFillStar  size={18} style={{color:active?"yellow":"#ffffff",marginTop:"3px"}}/></button>
                            
                        </div>
                        <div className="hr-line">
                            <p style={{margin:"0px"}}>|</p>
                        </div>
                        <div className="calender">
                            <AiTwotoneCalendar color="#ffffff"/>
                            <span className="calender-details">{sd}</span>
                            <span className="calender-details">{sm}</span>
                        </div>
                    </div>  
                  </div>   
        <div className="details-description-conatiner">
            <div className="description-container">
                <h1 className="desc-title">Description</h1>
                <div style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>
                <p className="desc-para">{dataList[0].description}</p>
                </div>
            </div>
            <div className="other-details">
                <p className="desc-name">Hackathon</p>
                <h1 className="details-name">{dataList[0].name}</h1>
                <p className="date-details"><span style={{marginTop:"3px",marginRight:"5px"}}><AiTwotoneCalendar /></span>  {sd} {sm} {sy} - {ed} {em} {ey} </p>
                <div className="link-container">
                    <button className="links-details-btn" style={{marginBottom:"20px",marginTop:"20px"}}><AiFillGithub size={25} style={{marginRight:"10px"}}/> <a href={dataList[0].githubUrl} target="_blank" rel="noreferrer" className="a-links">Github Repository</a></button> 
                    <button className="links-details-btn"><RxExternalLink style={{marginRight:"13px"}} size={25}/> <a href={dataList[0].otherLinks} target="_blank" rel="noreferrer" className="a-links">Other Link</a></button>
                </div>
            </div>
            
            </div>   
        </>

    )
}
