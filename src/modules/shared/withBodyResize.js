import React from 'react'

function withBodyResize(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
  		super(props)
  		this.state = {
  			selectedId : null,
  			gridHeight : 100
  		};

  		this.updateDimensions = this.updateDimensions.bind(this);
  	}

  	updateDimensions() {
  		this.setState({
  			gridHeight: window.innerHeight - 125
  		})
  	}

  	componentWillMount() {
  		this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    render() {
      let height = this.state.gridHeight;

      return <WrappedComponent {...this.props} height={height}/>
    }
  }
}
export default withBodyResize;
