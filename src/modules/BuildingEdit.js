import React from 'react'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import { required } from '../fn/form-validate.js'
import * as Actions from '../data/actions/building.js'
import  * as FC  from './shared/formControls.js'
import mapIdsFromObject from '../fn/mapIdsFromObject'
import Button from './shared/Button'

class BuildingEdit extends React.Component {

  componentWillMount() {
    let {params} = this.props;
    if (params.Id) {
      this.props.dispatch(Actions.get(params.Id))
    } else {
      this.props.dispatch(Actions.removeCurrent())
    }
  }

  handleSubmit(formValues) {
    console.log('in handle submit')
    formValues = mapIdsFromObject(formValues);
    return this.props.dispatch(Actions.save(formValues))
  }

  render() {
    const editMode = this.props.params.Id;

    return (
      <form className="w3-container" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
        <h4>{editMode ? 'Edit Building' : 'Add Building'}</h4>
        <div  className="w3-bar" style={{marginBottom:8}}>
          <Button type="submit" disabled={this.props.pristine}>Save</Button>
          <Button onClick={(e) => hashHistory.push('/buildings')}>Cancel</Button>
        </div>
        <Field name="id"
          component={FC.renderInput}
          hidden={true}
          readOnly={true}
          type="text"
          placeholder="Building Id" />
        <Field name="name"
          component={FC.renderInput}
          type="text"
          placeholder="Name"
          validate={required}/>
        <Field name="addr1"
          component={FC.renderInput}
          type="text"
          placeholder="Address 1"
          validate={required}/>
        <Field name="addr2"
          component={FC.renderInput}
          type="text"
          placeholder="Address 2"/>
        <Field name="city"
          component={FC.renderInput}
          type="text"
          placeholder="City"
          validate={required}/>
        <Field name="state"
          component={FC.renderInput} type="text" placeholder="State"
          validate={required}/>
        <Field name="zip"
          component={FC.renderInput} type="text" placeholder="Zip"
          validate={required}/>

      </form>
    )

  }
}

BuildingEdit = reduxForm({
  form:'buildingForm',
  enableReinitialize: true,
  onSubmitSuccess: function(submitResult, dispatch, props) {
    props.reset()
  }
})(BuildingEdit);

BuildingEdit = withRouter(BuildingEdit)

export default connect((store) => {
  return {
    initialValues:  { ...store.buildings.current }
  }
})(BuildingEdit);
