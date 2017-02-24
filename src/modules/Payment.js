import React from 'react'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import moment from 'moment'
import Button from './shared/Button'
import * as Actions from '../data/actions/payment'
import  * as FC  from './shared/formControls'
import { required } from '../fn/form-validate.js'
import PaymentHistory from './PaymentHistory.js'
import { getVisitById } from '../data/store.js'

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
    } else if (params.VisitId) {
      const visitId = parseInt(params.VisitId, 10);
      this.props.dispatch(Actions.get(visitId))
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
    ['VisitId'].forEach(fn => {
      if (typeof formValues[fn] === 'object') {
        formValues[fn] = formValues[fn].Id;
      }
    })
    this.props.dispatch(Actions.save(formValues))
  }

  onVisitChange(visit) {
    if (visit && visit.Id) {
      this.props.dispatch(Actions.get(visit.Id));
    }
  }

  render() {
    const editMode = false;//this.state.editMode;
    const { visits, currentVisit, currentPayments } = this.props;

    return (
      <div className=" w3-padding-top w3-padding-small">
        <form className="" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
          <div  className="w3-padding-bottom w3-cell-row">
            <Button type="submit">Add Payment</Button>
            <Button onClick={this.onCancel}>Cancel</Button>
          </div>
          <div className="w3-third">
            <Field name="Id" hidden={true} component={FC.renderInput} readOnly={true} type="text" placeholder="Visit Id" />
            <Field name="VisitId"
              readOnly={editMode}
              data={visits}
              component={FC.renderCombo}
              validate={required}
              onChangeAction={this.onVisitChange.bind(this)}
              textField="Display"
              type="text"
              placeholder="Visit"/>

            <Field name="Amount"
              component={FC.renderInput}
              readOnly={editMode}
              type="number"
              validate={required}
              placeholder="Payment Amount"/>
            <Field name="PayDate"
              readOnly={editMode}
              component={FC.renderInput}
              type="date"
              validate={required}
              placeholder="Date"/>
          </div>
          <PaymentHistory
            visit={currentVisit}
            payments={currentPayments}

          />
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

export default connect((store, ownProps) => {
  let visitId;
  let currentVisit = getFormValue(store, 'VisitId');
  if (ownProps.params.VisitId) {
    visitId = parseInt(ownProps.params.VisitId, 10);
    if (typeof currentVisit !== 'object') {
      currentVisit = getVisitById(visitId);
    }
  }

  return {
    initialValues: {
      VisitId: visitId,
      PayDate: moment().format('YYYY-MM-DD')
    },
    currentPayments: store.payments.currentPayments,
    currentVisit: currentVisit,
    visits: store.visits.data,
  }
})(Payment);
