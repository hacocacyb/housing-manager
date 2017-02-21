import React from 'react'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import * as BedActions from '../data/actions/bedActions.js'

import  * as FC  from './shared/formControls.js'

class BedEdit extends React.Component {

  componentWillMount() {
    let {params } = this.props;
    if (params.Id) {
      this.props.dispatch(BedActions.getBed(params.Id))
    } else {
      this.props.dispatch(BedActions.removeCurrentBed());
    }
  }
  componentDidUpdate() {
    if (this.props.params.Id && this.props.paramsId !== this.props.initialValues.Id) {
      console.log('was different ids on update');
    }
  }
  handleSubmit(formValues) {
    console.log(arguments)
    console.log(formValues);
    this.props.dispatch(BedActions.saveBed(formValues))
  }

  render() {
    const bedTypes = this.props.bedTypes;
    const buildings = this.props.buildings;


    return (
      <form className="w3-container" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
        <p>
          <button className="w3-btn w3-padding-tiny w3-margin-right" type="submit">Save</button>
          <button className="w3-btn w3-padding-tiny w3-margin-right" onClick={(e) => hashHistory.push('/beds')}>Cancel</button>
        </p>
        <Field name="Id" component={FC.renderInput} readOnly={true} type="text" placeholder="Bed Id"/>
        <Field name="Name" component={FC.renderInput} type="text" placeholder="Name"/>
        <Field name="TypeId" component={FC.renderCombo}
          data={bedTypes}
          textField="Type"
          type="text"
          placeholder="Bed Type"
        />
        <Field name="BuildingId"
          data={buildings}
          component={FC.renderCombo}
          textField="Name"
          type="text"
          placeholder="Building"/>
        <Field name="Cost" component={FC.renderInput} type="number" placeholder="Cost" />

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
