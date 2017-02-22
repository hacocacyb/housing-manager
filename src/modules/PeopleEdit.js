import React from 'react'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field } from 'redux-form'
import Button from './shared/Button.js'
import * as Actions from '../data/actions/person.js'
import  * as FC  from './shared/formControls.js'
import { required, minAge } from '../fn/form-validate.js'

class PeopleEdit extends React.Component {
  constructor(props) {
    super(props);
    const {params} = this.props;
    let editMode = false;
    if (params.Id) {
      editMode = true;
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
      this.props.dispatch(Actions.removeCurrent());
      this.setState({
        editMode: false
      })
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
        <h4>{this.state.editMode ? 'Edit Visitor' : 'Add Visitor'}</h4>
        <p>
          <Button type="submit">Save</Button>
          <Button onClick={this.onCancel}>Cancel</Button>
        </p>
        <Field name="Id" hidden={true} component={FC.renderInput}
            readOnly={true} type="text" placeholder="Person Id" />
        <Field name="First" component={FC.renderInput}
            type="text" placeholder="First"
            validate={required}
        />
        <Field name="Middle" component={FC.renderInput} type="text" placeholder="Middle"

        />
        <Field name="Last" component={FC.renderInput} type="text" placeholder="Last" validate={required}/>
        <Field name="DOB" component={FC.renderInput} type="date" placeholder="Date of Birth" validate={[required, minAge(18)]}/>
        <Field name="Phone" component={FC.renderInput} type="tel" placeholder="Phone Number" validate={required}/>

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
