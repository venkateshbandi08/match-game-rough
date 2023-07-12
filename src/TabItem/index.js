import './index.css'

const TabItem = props => {
  const {eachTabItemDetails, onChangeTab} = props
  const {tabId, displayText} = eachTabItemDetails
  const onClickTab = () => {
    onChangeTab(tabId)
  }
  return (
    <li>
      <button className="tab-item-button" type="button" onClick={onClickTab}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
