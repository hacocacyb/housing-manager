import React from 'react'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import Button from './shared/Button.js'
import * as Actions from '../data/actions/person.js'
import  * as FC  from './shared/formControls.js'

class PeopleEdit extends React.Component {

  componentWillMount() {
    let {params} = this.props;
    if (params.Id) {
      this.props.dispatch(Actions.get(params.Id))
    } else {
      this.props.dispatch(Actions.removeCurrent());
    }
  }
  componentDidUpdate() {
    if (this.props.params.Id && this.props.paramsId !== this.props.initialValues.Id) {
      console.log('was different ids on update');
    }
  }

  onCancel() {
    hashHistory.push('/people')
  }
  handleSubmit(formValues) {
    this.props.dispatch(Actions.save(formValues))
  }

  render() {
    return (
      <form className="w3-container" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
        <p>
          <Button type="submit">Save</Button>
          <Button onClick={this.onCancel}>Cancel</Button>
        </p>
        <Field name="Id" hidden={true} component={FC.renderInput} readOnly={true} type="text" placeholder="Person Id" />
        <Field name="First" component={FC.renderInput} type="text" placeholder="First"/>
        <Field name="Middle" component={FC.renderInput} type="text" placeholder="Middle"/>
        <Field name="Last" component={FC.renderInput} type="text" placeholder="Last"/>
        <Field name="Phone" component={FC.renderInput} type="text" placeholder="Phone Number"/>

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
  return {
    initialValues:  { ...store.people.current }
  }
})(PeopleEdit);
