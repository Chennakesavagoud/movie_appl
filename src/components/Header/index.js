import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import './index.css'
import {IoMdClose, IoMdMenu} from 'react-icons/io'
import {MdHome, MdSchedule} from 'react-icons/md'
import {RxArrowTopRight} from 'react-icons/rx'

const Header = () => {
  const [isShowMenu, setToggle] = useState(false)
  const toggleMenuBtn = () => {
    setToggle(prev => !prev)
  }
  const [searchQuery, setSearchQuery] = useState('')
  const history = useHistory()

  const handleSearch = e => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    history.push(`/search?query=${encodeURIComponent(searchQuery)}`)
    setSearchQuery('')
  }

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="link">
          <h1 className="logo-name">
            <span className="logo-high">MovieDb</span>
          </h1>
        </Link>

        <div className="nav-items-lg">
          <Link to="/" className="link home-link">
            <p className="item-lg">Home</p>
          </Link>

          <Link to="/top-rated" className="link">
            <p className="item-lg">Top Rated</p>
          </Link>

          <Link to="/upcoming" className="link">
            <p className="item-lg">Upcoming</p>
          </Link>

          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Movie Name"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>

        {!isShowMenu ? (
          <button type="button" className="menu-btn" onClick={toggleMenuBtn}>
            <IoMdMenu className="icon" />
          </button>
        ) : (
          <button type="button" className="menu-btn" onClick={toggleMenuBtn}>
            <IoMdClose className="icon" />
          </button>
        )}
      </nav>

      {isShowMenu && (
        <div className="menu-div">
          <div className="nav-items-sm">
            <Link to="/" className="route-link">
              <MdHome className="route-icon" />
              <p className="item">Home</p>
            </Link>
            <Link to="/top-rated" className="route-link">
              <RxArrowTopRight className="route-icon" />
              <p className="item">Top Rated Movies</p>
            </Link>
            <Link to="/upcoming" className="route-link">
              <MdSchedule className="route-icon" />
              <p className="item">Upcoming Movies</p>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
