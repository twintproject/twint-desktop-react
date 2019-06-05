import * as React from 'react'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import { connect } from 'react-redux'
import { RootState } from '../reducers'

interface Props {
  geoPoints: object[]
}

class Maps extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    const divstyle = {
      width: window.innerWidth - 50,
      height: window.innerHeight,
      margin: 0,
    }
    const readypoints = {} as any
    const leafletMarkers = this.props.geoPoints.map(marker => {
      const user = marker['user']
      const points = marker['geo_points']
      for (const point of points) {
        if (readypoints[point]) {
          readypoints[point].push(user)
        } else {
          readypoints[point] = [user]
        }
        return (
          <Marker
            position={[point['lat'], point['lon']]}
            key={`marker_${user}`}
          >
            <Popup maxHeight={150}>
              {readypoints[point].map(name => (
                <React.Fragment key={name}>
                  {name}
                  <br />
                </React.Fragment>
              ))}
            </Popup>
          </Marker>
        )
      }
    })
    console.log(readypoints)
    return (
      <div className="map" style={divstyle}>
        <Map center={[51.505, -0.09]} zoom={3} style={divstyle}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {leafletMarkers}
        </Map>
      </div>
    )
  }
}

const mapsStateToProps = (state: RootState) => {
  return {
    geoPoints: state.app.geoPoints,
  }
}
export default connect(mapsStateToProps)(Maps)
