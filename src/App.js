import {Route, Switch} from 'react-router-dom'

import './App.css'

import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import Search from './components/Search'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/movie/:id" component={MovieDetails} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/upcoming" component={Upcoming} />
    <Route exact path="/search" component={Search} />
  </Switch>
)

export default App
