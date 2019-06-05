import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './components/App'
import Form from './components/Form'
import Custom from './components/Custom'
import Graph from './components/Graph'
import Charts from './components/Charts'
import WordCloud from './components/WorldCloud'
import Map from './components/Map'
// import Settings from './components/Settings'

const appRouter: React.SFC<{}> = () => (
  <BrowserRouter>
    <App>
      <Switch>
        <Route path="/" exact component={Form} />
        <Route path="/template" component={Custom} />
        <Route path="/charts" component={Charts} />
        <Route path="/graph" component={Graph} />
        <Route path="/map" component={Map} />
        <Route path="/wordcloud" component={WordCloud} />
        {/* <Route path="/settings" component={Settings} /> */}
      </Switch>
    </App>
  </BrowserRouter>
)

export default appRouter
