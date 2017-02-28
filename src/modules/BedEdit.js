import React from 'react'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import * as BedActions from '../data/actions/bed'
import mapIdsFromObject from '../fn/mapIdsFromObject'

import  * as FC  from './shared/formControls'

class BedEdit extends React.Component {

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
    let {params } = this.props;
    if (params.Id) {
      this.props.dispatch(BedActions.getBed(params.Id))
      this.setState({
        editMode: true
      })
    } else {
      this.props.dispatch(BedActions.removeCurrentBed())
      this.setState({
        editMode: false
      })
    }
  }

  handleSubmit(formValues) {
    formValues = mapIdsFromObject(formValues)
    this.props.dispatch(BedActions.saveBed(formValues))
  }

  render() {
    const bedTypes = this.props.bedTypes;
    const buildings = this.props.buildings;


    return (
      <form className="w3-container" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
        <h4>{this.state.editMode ? 'Edit Bed' : 'Add Bed'}</h4>
        <p>
          <button className="w3-btn w3-padding-tiny w3-margin-right" type="submit">Save</button>
          <button className="w3-btn w3-padding-tiny w3-margin-right" onClick={(e) => hashHistory.push('/beds')}>Cancel</button>
        </p>
        <Field name="id" component={FC.renderInput} hidden={true} readOnly={true} type="text" placeholder="Bed Id"/>
        <Field name="name" component={FC.renderInput} type="text" placeholder="Name"/>
        <Field name="buildingId"
            data={buildings}
            component={FC.renderCombo}
            textField="name"
            type="text"
            placeholder="Building"/>


      <Field name="typeId" component={FC.renderCombo}
          data={bedTypes}
          textField="type"
          type="text"
          placeholder="Bed Type"
        />
        </form>
)

  }
}

BedEdit = reduxForm({
  form:'bedForm',
  enableReinitialize: true
})(BedEdit);

BedEdit = withRouter(BedEdit)

export default connect((store) => {
  return {
    bedTypes: store.codes.bedTypes ,
    buildings: store.buildings.data,
    initialValues:  { ...store.beds.currentBed }
  }
})(BedEdit);
