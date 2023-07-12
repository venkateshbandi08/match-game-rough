import {Component} from 'react'
import './index.css'
import TabItem from '../TabItem/index'
import ThumbnailItems from '../ThumbnailItems/index'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList} = this.props
    // const {imagesList} = this.props
    this.state = {
      //   imagesList,
      randomImageItem: this.getRandomImage(),
      activeTabId: tabsList[0].tabId,
      gameScore: 0,
      gameOver: false,
      displayTime: 60,
      isTimeRunning: true,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  getRandomImage = () => {
    const {imagesList} = this.props
    const randNum = Math.ceil(Math.random() * imagesList.length - 1)
    return imagesList[randNum]
  }

  getTabRelatedImages = () => {
    const {activeTabId} = this.state
    const {imagesList} = this.props
    const filteredThumbnails = imagesList.filter(
      eachItem => eachItem.category === activeTabId,
    )
    return filteredThumbnails
  }

  onChangeTab = id => {
    this.setState({
      activeTabId: id,
    })
  }

  onClickThumbnailImage = id => {
    const {randomImageItem} = this.state
    if (randomImageItem.id === id) {
      this.setState(prevState => ({
        randomImageItem: this.getRandomImage(),
        gameScore: prevState.gameScore + 1,
      }))
    } else {
      this.setState({
        gameOver: true,
        isTimeRunning: false,
      })
    }
  }

  tick = () => {
    const {displayTime, gameOver, isTimeRunning} = this.state
    if (!gameOver && isTimeRunning) {
      if (displayTime > 0) {
        this.setState(prevState => ({
          displayTime: prevState.displayTime - 1,
        }))
      } else {
        this.setState(prevState => ({
          gameOver: !prevState.gameOver,
          isTimeRunning: !prevState.isTimeRunning,
        }))
      }
    }
  }

  playAgainGame = () => {
    this.setState({
      gameOver: false,
      displayTime: 60,
      isTimeRunning: true,
      gameScore: 0,
    })
  }

  render() {
    const {tabsList} = this.props
    const {randomImageItem, gameScore, displayTime, gameOver} = this.state
    const randomImageUrl = randomImageItem.imageUrl
    const tabRelatedThumbnails = this.getTabRelatedImages()
    return (
      <div className="match-game-container">
        {gameOver ? (
          <div className="game-over">
            <div className="game-over-container">
              <div className="trophy-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                  alt="trophy"
                  className="trophy-image"
                />
              </div>
              <h1 className="your-score-text"> Your Score </h1>
              <h1 className="score-number"> {gameScore} </h1>
              <button
                className="play-again-button-container"
                onClick={this.playAgainGame}
                type="button"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                />
                <h1 className="play-again-text">PLAY AGAIN</h1>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <nav className="nab-bar-container">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                  alt="website logo"
                  className="match-game-logo"
                />
              </div>
              <div className="score-timer-container">
                <div className="score-count-container">
                  <p className="score-text">
                    Score: <span className="score-count">{gameScore}</span>
                  </p>
                </div>
                <div className="timer-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                    alt="timer"
                    className="timer-icon"
                  />
                  <p className="timer-seconds"> {displayTime} sec </p>
                </div>
              </div>
            </nav>
            <div className="random-image-container">
              <img src={randomImageUrl} className="random-image" alt="match" />
            </div>
            <ul className="tabs-container">
              {tabsList.map(eachTabItem => (
                <TabItem
                  eachTabItemDetails={eachTabItem}
                  onChangeTab={this.onChangeTab}
                  key={eachTabItem.tabId}
                />
              ))}
            </ul>
            <ul className="thumbnails-container">
              {tabRelatedThumbnails.map(eachThumbnail => (
                <ThumbnailItems
                  eachThumbnailDetails={eachThumbnail}
                  onClickThumbnailImage={this.onClickThumbnailImage}
                  key={eachThumbnail.id}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
