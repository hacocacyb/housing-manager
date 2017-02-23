import React from 'react'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import * as Actions from '../data/actions/building.js'
import  * as FC  from './shared/formControls.js'

class BuildingEdit extends React.Component {

  constructor(props) {
    super(props);
    const {params} = this.props;
    let editMode = false;
    if (params.Id) {
      editMode = true
    }
    this.state = {
      editMode : editMode
    }
  }
  componentWillMount() {
    let {params} = this.props;
    if (params.Id) {
      this.props.dispatch(Actions.get(params.Id))
      this.setState({
        editMode: true
      })
    } else {
      this.props.dispatch(Actions.removeCurrent())
      this.setState({
        editMode: false
      })
    }
  }

  handleSubmit(formValues) {
    this.props.dispatch(Actions.save(formValues))
  }

  render() {
    return (
      <form className="w3-container" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
        <h4>{this.state.editMode ? 'Edit Building' : 'Add Building'}</h4>
        <p>
          <button className="w3-btn w3-padding-tiny w3-margin-right" type="submit">Save</button>
          <button className="w3-btn w3-padding-tiny w3-margin-right" onClick={(e) => hashHistory.push('/buildings')}>Cancel</button>
        </p>
        <Field name="Id" component={FC.renderInput}  hidden={true} readOnly={true} type="text" placeholder="Building Id" />
        <Field name="Name" component={FC.renderInput} type="text" placeholder="Name"/>
        <Field name="Addr1" component={FC.renderInput} type="text" placeholder="Address 1"/>
        <Field name="Addr2" component={FC.renderInput} type="text" placeholder="Address 2"/>
        <Field name="City" component={FC.renderInput} type="text" placeholder="City"/>
        <Field name="State" component={FC.renderInput} type="text" placeholder="State"/>
        <Field name="Zip" component={FC.renderInput} type="text" placeholder="Zip"/>

      </form>
    )

  }
}

BuildingEdit = reduxForm({
  form:'buildingForm',
  enableReinitialize: true
})(BuildingEdit);

BuildingEdit = withRouter(BuildingEdit)

export default connect((store) => {
  return {
    initialValues:  { ...store.buildings.current }
  }
})(BuildingEdit);
