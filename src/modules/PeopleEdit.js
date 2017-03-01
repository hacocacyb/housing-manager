import React from 'react'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import Button from './shared/Button.js'
import * as Actions from '../data/actions/people.js'
import  * as FC  from './shared/formControls.js'
import moment from 'moment'
import { required, minAge } from '../fn/form-validate.js'

class PeopleEdit extends React.Component {

  componentWillMount() {
    const id = this.props.params.Id;
    if (id) {
      this.props.dispatch(Actions.get(id))
    } else {
      this.props.dispatch(Actions.removeCurrent());
    }
  }

  onCancel() {
    hashHistory.push('/people')
  }
  handleSubmit(formValues) {
    this.props.dispatch(Actions.save(formValues))
  }

  render() {
    const editMode = this.props.params.Id && true;
    return (
      <form className="w3-container" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
        <h4>{editMode ? 'Edit Visitor' : 'Add Visitor'}</h4>
        <p>
          <Button type="submit">Save</Button>
          <Button onClick={this.onCancel}>Cancel</Button>
        </p>
        <Field name="id" hidden={true} component={FC.renderInput}
          readOnly={true} type="text" placeholder="Person Id" />
        <Field name="first"
          component={FC.renderInput}
          type="text"
          placeholder="First"
          validate={required}
        />
        <Field name="middle" component={FC.renderInput} type="text" placeholder="Middle"/>
        <Field name="last" component={FC.renderInput} type="text" placeholder="Last" validate={required}/>
        <Field name="dob" component={FC.renderInput} type="date" placeholder="Date of Birth" validate={[required, minAge(18)]}/>
        <Field name="phone" component={FC.renderInput} type="tel" placeholder="Phone Number" validate={required}/>

      </form>
    )

  }
}

PeopleEdit = reduxForm({
  form:'peopleForm',
  enableReinitialize: true
})(PeopleEdit);

PeopleEdit = withRouter(PeopleEdit)

export default connect((store) => {
  let iv = { ...store.people.current }
  if (iv && iv.dob) {
    iv.dob = moment.utc(iv.dob).format('YYYY-MM-DD')
  }
  return {
    initialValues: iv
  }
})(PeopleEdit);
