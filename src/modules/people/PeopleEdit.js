import React from 'react'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import Button from '../../shared/Button.js'
import * as Actions from '../../data/actions/people.js'
import * as FC from '../../form/Controls'
import moment from 'moment'
import { required, minAge } from '../../fn/form-validate.js'
import Mask from '../../shared/Mask'

import { ButtonToolbar } from 'react-bootstrap'

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
    this.props.dispatch(Actions.removeCurrent());
    hashHistory.push('/people')
  }
  handleSubmit(formValues) {
    return this.props.dispatch(Actions.save(formValues))
  }

  render() {
    const editMode = this.props.params.Id && true;
    return (
      <form className="container" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
        <Mask masked={this.props.submitting}>
          <header className="card-title">{editMode ? 'Edit Visitor' : 'Add Visitor'}</header>
          <ButtonToolbar>
            <Button type="submit" disabled={this.props.pristine}>Save</Button>
            <Button onClick={this.onCancel.bind(this)}>Cancel</Button>
          </ButtonToolbar>
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
        </Mask>
      </form>
    )

  }
}

PeopleEdit = reduxForm({
  form:'peopleForm',
  enableReinitialize: true,
  // validate: function(values, props) {
  //   const errors = {}
  //   console.log(
  //     'validating? ', values, props
  //   )
  //   if (!values.first) {
  //     errors.first = 'Required'
  //   }
  //   if (!values.last) {
  //     errors.last = 'Required'
  //   }
  //   if (!values.dob) {
  //     errors.dob = 'Required'
  //   }
  //   if (!values.phone) {
  //     errors.phone = 'Required'
  //   }
  //   return errors;
  // },
  onSubmitSuccess: function(submitResult, dispatch) {
    dispatch(Actions.removeCurrent());
  }
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
