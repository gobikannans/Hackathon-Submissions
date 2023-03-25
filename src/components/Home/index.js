import {Component} from "react"
import {Link} from "react-router-dom"
import {BiSearchAlt2} from "react-icons/bi"
import Header from "../Header"
import SubmissionItem from "../SubmissionItem"
import TabItem from "../TabItem"
import React from 'react';
import "./index.css"

const sortByOptions = [
    {
      id: 0,
      displayText: 'Newest',
      value: 'Newest',
    },
    {
      id: 1,
      displayText: 'Oldest',
      value: 'Oldest',
    },
  ]

  const tabsList = [
    {tabId: 'ALL', displayText: 'All Submissions'},
    {tabId: 'YES', displayText: 'Favorite Submissions'},
  ]  

  const apiStatusConstants = {
    initial: 'INITIAL',
    cartSuccess: 'SUCCESS',
    cartNoView: 'FAILURE',
    cartLoader: 'INPROGRESS',
  }


  
  class Home extends Component{
    state={submissionListData:[],searchValue:'',activeTabId:tabsList[0].tabId,selectedSortByValue:sortByOptions[0].value,apiStatus:apiStatusConstants.initial}

    componentDidMount(){
      this.getSubmissionData()      
    }

    getSubmissionData=()=>{
      const submissionData=JSON.parse(localStorage.getItem("submissionData")) || []
      console.log(submissionData)
      if(submissionData.length===0){
        this.setState({apiStatus:apiStatusConstants.failure})
      }else{
        const submissionItems=submissionData.map(eachItem=>({
          id:eachItem.id,
          title:eachItem.title,
          summary:eachItem.summary,
          description:eachItem.description,
          image:eachItem.image,
          fileName:eachItem.fileName,
          name:eachItem.name,
          startDate:eachItem.startDate,
          endDate:eachItem.endDate,
          githubUrl:eachItem.githubUrl,
          otherLinks:eachItem.otherLinks,
          submissionType:eachItem.submissionType,
          favoriteType:eachItem.favoriteType,
          date:eachItem.date
        }))
        this.setState({submissionListData:submissionItems,apiStatus:apiStatusConstants.success})
      }
    }

    onSearch = event => {
      this.setState({searchValue: event.target.value})
    }    

    updateTab = tabId => {
      this.setState({activeTabId: tabId})
    }

    filterTab = reversed => {
      const {activeTabId} = this.state
  
      const filterApps = reversed.filter(
        eachApp => eachApp.submissionType===activeTabId || eachApp.favoriteType===activeTabId
      )
      return filterApps
    }

    onChangeSort=(event)=>{

      this.setState({selectedSortByValue:event.target.value})
    }
  

    renderSubmissionStatus=()=>{
      const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return null
      default:
        return null
    }
    }

      

    render() {
        const{submissionListData,selectedSortByValue,activeTabId,searchValue}=this.state
        const searchResults = submissionListData.filter(eachItem =>
          eachItem.title.toLowerCase().includes(searchValue.toLowerCase()),
        )
        const filterResults=this.filterTab(searchResults)
        const filteredFormDataList = filterResults.sort((a, b) => {
         if (selectedSortByValue === 'Oldest') {
           return new Date(a.date) - new Date(b.date);
        } else {
           return new Date(b.date) - new Date(a.date);
        }
        });

        return(
            <>
            <Header/>
                <div className="banner-container">
                  <div className="banner-details">  
                    <div>
                        <h1 className="banner-heading">Hackathon Submissions</h1>
                        <p className="banner-para">Lorem ipsum dolor sit amet consectetur. Urna cursus amet pellentesque in parturient purus <br/> feugiat faucibus. Congue laoreet duis porta turpis eget suspendisse ac pharetra amet. Vel <br/> nisl tempus nec vitae. 
                        </p>
                        <Link to="/submission-form" className="links">
                        <button className="banner-btn">Upload Submissions</button>
                        </Link>
                    </div>
                    <div>
                        <img src="https://res.cloudinary.com/dpjowvn70/image/upload/v1679510449/Hand_holding_bulb_3D_c0hlej.png" alt="banner-img" className="banner-img"/>
                    </div>  
                  </div>   
                </div>  

             <div className="home-container">
                <div className="home-titles">
                  <ul className="submission-types">
                    {tabsList.map(eachTab => (
                    <TabItem
                      tabDetails={eachTab}
                      key={eachTab.tabId}
                      updateTab={this.updateTab}
                      isActive={eachTab.tabId === activeTabId}
                      />
                      ))}
                  </ul>
                  <div className="search-types">
                      <div className="search-container">
                        <span><BiSearchAlt2 style={{marginTop:"3px"}} size={20}/></span>
                        <input type="text" placeholder="Search" className="input-search" value={searchValue} onChange={this.onSearch}/>
                      </div>
                      <div className="sort-container">
                      <select
                        className="sort-by-select"
                        value={selectedSortByValue}
                        onChange={this.onChangeSort}
                      >
                        {sortByOptions.map(eachSort => (
                          <option key={eachSort.id} value={eachSort.value}  >{eachSort.displayText}</option>
                        ))}
                      </select>
                      
                      </div>
                  </div>
                </div>
                <ul className="submission-list-container">
                  {filteredFormDataList.map(eachItem=>(
                  <SubmissionItem key={eachItem.id} submissionDetails={eachItem}/>
                  ))}
                </ul>  
            </div>
            </>
        )
    }
}

export default Home