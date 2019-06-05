import * as React from 'react'
import { connect } from 'react-redux'
import { ForceGraph3D } from 'react-force-graph'
import { RootState } from '../reducers'

interface Props {
  graphData: object[]
}

class Graph extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    let highlightLink = null
    let highlightNodes = [] as any
    const nodex = {} as any
    const linkx = {} as any
    const nodes = [] as any
    const links = [] as any
    const loadNode = (id, type) => {
      if (!nodex[id]) {
        nodex[id] = { stat: true }
        nodes.push({ id, type })
      }
    }
    const loadLink = (from, to) => {
      if (!linkx[from + '_' + to]) {
        linkx[from + '_' + to] = true
        links.push({ source: from, target: to })
      }
    }
    const graphoutputdata = inputdata => {
      inputdata.shift()
      for (const u in inputdata) {
        if (inputdata.hasOwnProperty(u)) {
          const username = inputdata[u]['username']
          loadNode(username, 'user')
          for (const i of inputdata[u]['hashtags']) {
            loadNode(i, 'hashtag')
            loadLink(username, i)
          }
        }
      }
      return {
        nodes,
        links,
      }
    }
    const data = graphoutputdata(this.props.graphData)
    return (
      <ForceGraph3D
        graphData={data}
        controlType="orbit"
        nodeAutoColorBy="id"
        nodeLabel={node => node.id}
        enableNodeDrag={true}
        nodeOpacity={0.75}
        enableNavigationControls={true}
        linkWidth={link => (link === highlightLink ? 4 : 1)}
        linkDirectionalParticles={link => (link === highlightLink ? 4 : 0)}
        linkDirectionalParticleWidth={4}
        onNodeClick={node => {
          const distRatio = 1 + 300 / Math.hypot(node.x, node.y, node.z)
          node.cameraPosition(
            {
              x: node.x * distRatio,
              y: node.y * distRatio,
              z: node.z * distRatio,
            },
            node,
            3000,
          )
          if (node.val !== 20) {
            console.log(node)
            nodex[node] = node.val
            node.val = 20
          } else {
            node.val = nodex[node]
            delete nodex[node]
          }
          // node.nodeRelSize = 4
        }}
        onNodeHover={node => {
          if (
            (!node && !highlightNodes.length) ||
            (highlightNodes.length === 1 && highlightNodes[0] === node)
          ) {
            return
          }
          highlightNodes = node ? [node] : []
          // node.nodeRelSize = 4
        }}
        onLinkHover={link => {
          if (highlightLink === link) {
            return
          }
          highlightLink = link
          highlightNodes = link ? [link.source, link.target] : []
          // link.nodeRelSize = 4
        }}
      />
    )
  }
}

const mapsStateToProps = (state: RootState) => {
  return {
    graphData: state.app.graphData,
  }
}

export default connect(mapsStateToProps)(Graph)
