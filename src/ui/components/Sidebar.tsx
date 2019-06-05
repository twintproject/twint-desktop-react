import * as React from 'react'
import { NavLink } from 'react-router-dom'

class Sidebar extends React.Component {
  render() {
    return (
      <section>
        <div className="icon-bar">
          <NavLink
            to="/"
            exact
            activeClassName="active"
            className="fas fa-database"
            title="Connect to Elasticsearch"
          />
          <NavLink
            to="/template"
            activeClassName="active"
            className="fas fa-code"
            title="Search"
          />
          <NavLink
            to="/charts"
            activeClassName="active"
            className="fas fa-tachometer-alt"
            title="Charts"
          />
          <NavLink
            to="/graph"
            activeClassName="active"
            className="fas fa-sitemap"
            title="Graph"
          />
          <NavLink
            to="/map"
            activeClassName="active"
            className="fas fa-map-marked-alt"
            title="Map"
          />
          <NavLink
            to="/wordcloud"
            activeClassName="active"
            className="fas fa-edit"
            title="Wordcloud"
          />
          <NavLink
            to="/settings"
            activeClassName="active"
            className="fas fa-cog"
            title="Settings"
          />
          <a href="#">
            <i className="fas fa-envelope" title="Support" />
          </a>
        </div>
      </section>
    )
  }
}

export default Sidebar
