import './index.css'

const TabItem = props => {
  const {tabDetails, updateTab, isActive} = props
  const {tabId, displayText} = tabDetails

  const activeTab = isActive ? 'active-tab' : ''
  const updateApp = () => {
    updateTab(tabId)
  }

  return (
    <li className="tab-container">
      <button
        className={`btn-style ${activeTab}`}
        type="button"
        onClick={updateApp}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem