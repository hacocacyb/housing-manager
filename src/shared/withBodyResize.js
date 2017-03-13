import React from 'react'

function withBodyResize(WrappedComponent, params={}) {
  return class extends React.Component {
    constructor(props) {
  		super(props)
  		this.state = {
  			height : props.height || props.minHeight || 100,
        adjustment: params.adjustment
  		};

  		this.updateDimensions = this.updateDimensions.bind(this);
  	}

  	updateDimensions() {
      const bufferZone = this.state.adjustment || 140;
  		this.setState({
  			height: window.innerHeight - bufferZone
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
      let height = this.state.height;

      return <WrappedComponent {...this.props} height={height}/>
    }
  }
}
export default withBodyResize;
