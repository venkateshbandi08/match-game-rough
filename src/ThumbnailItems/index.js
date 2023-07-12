import './index.css'

const ThumbnailItems = props => {
  const {eachThumbnailDetails, onClickThumbnailImage} = props
  const {id, thumbnailUrl} = eachThumbnailDetails
  const onClickThumbnail = () => {
    onClickThumbnailImage(id)
  }
  return (
    <li>
      <button
        className="each-thumbnail-button"
        onClick={onClickThumbnail}
        type="button"
      >
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}

export default ThumbnailItems
