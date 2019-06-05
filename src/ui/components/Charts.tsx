import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from '../reducers'
import {
  radarChartConfig,
  pieChartConfig,
  lineChartConfig,
  barChartConfig,
} from './chartConfig'
import { Radar, Line, Doughnut, Bar } from 'react-chartjs-2'
import FullDataset from '../lib/dataset'

type Props = RootState

interface State {
  dataset: {}
}

class Charts extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  componentWillMount() {
    this.setState({
      dataset: this.props.app.dataset,
    })
  }
  render() {
    const totalDatasets = new FullDataset()
    totalDatasets.dataset = this.state.dataset
    totalDatasets.prepareHeaps(10, 10)
    totalDatasets.fillOtherCharts(
      barChartConfig,
      lineChartConfig,
      pieChartConfig,
    )
    totalDatasets.fillRadarChart(radarChartConfig)
    return (
      <div className="container">
        <div className="big-container">
          <br />
          <div className="container">
            <div id="barChart">
              <Bar
                data={barChartConfig.data}
                options={barChartConfig.options}
              />
            </div>
            <div id="radarChart">
              <Radar
                data={radarChartConfig.data}
                options={radarChartConfig.options}
              />
            </div>
          </div>
          <br />
          <br />
          <div className="container">
            <div id="LineChart">
              <Line
                data={lineChartConfig.data}
                options={lineChartConfig.options}
              />
            </div>
            <div id="pieChart">
              <br />
              <Doughnut
                data={pieChartConfig.data}
                options={pieChartConfig.options}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapsStateToProps = (state: RootState) => state
export default connect(mapsStateToProps)(Charts)
