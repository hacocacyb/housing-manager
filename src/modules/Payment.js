import React from 'react'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import moment from 'moment'
import Button from './shared/Button'
import * as Actions from '../data/actions/payment'
import  * as FC  from './shared/formControls'

const getFormValue = formValueSelector('paymentForm');

class Payment extends React.Component {

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
      this.props.dispatch(Actions.removeCurrent())
      this.setState({
        editMode: false
      })
    }
  }

  onCancel() {
    hashHistory.push('/visits')
  }
  handleSubmit(formValues) {
console.log('form values from redux', formValues);
    ['VisitId'].forEach(fn => {
      if (typeof formValues[fn] === 'object') {
        formValues[fn] = formValues[fn].Id;
      }
    })
    console.log('payment form', formValues);
    //this.props.dispatch(Actions.save(formValues))
  }

  render() {
    const editMode = false;//this.state.editMode;
    const visits = this.props.visits;
    return (
      <div className="w3-row">
        <form className=" w3-container" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
          <p>
            <Button type="submit">Save</Button>
            <Button onClick={this.onCancel}>Cancel</Button>
          </p>
          <div className="w3-third">
            <Field name="Id" hidden={true} component={FC.renderInput} readOnly={true} type="text" placeholder="Visit Id" />
            <Field name="VisitId"
              readOnly={editMode}
              data={visits}
              component={FC.renderCombo}
              onChangeAction={()=>console.log('combo changed')}
              textField="Display"
              type="text"
              placeholder="Apply Payment for"/>

            <Field name="Amount"
              component={FC.renderInput}
              readOnly={editMode}
              type="number"
              placeholder="Payment Amount"/>
            <Field name="PayDate"
              readOnly={editMode}
              component={FC.renderInput}
              type="date"
              placeholder="Date"/>
          </div>

        </form>
      </div>
    )

  }
}

Payment = reduxForm({
  form:'paymentForm',
  enableReinitialize: true
})(Payment);

Payment = withRouter(Payment)

export default connect((store) => {
  let visitId =  getFormValue(store, 'VisitId');
  if (typeof visitId === 'object') {
    visitId = visitId.Id
  }

  return {
    initialValues: {
      PayDate: moment().format('YYYY-MM-DD')
    },
    visits: store.visits.data,
  }
})(Payment);
