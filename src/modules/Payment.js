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
import mapIdsFromObject from '../fn/mapIdsFromObject'

const getFormValue = formValueSelector('paymentForm');

class Payment extends React.Component {

  componentWillMount() {
    const visitId = this.props.params.VisitId;
    if (visitId) {
      this.props.dispatch(Actions.get(this.props.params.VisitId))
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.VisitId !== this.props.params.VisitId) {
      this.props.dispatch(Actions.get(newProps.params.VisitId))
    }
  }

  onCancel() {
    hashHistory.push('/visits')
  }
  handleSubmit(formValues) {

    formValues = mapIdsFromObject(formValues)
    return this.props.dispatch(Actions.save(formValues))
  }

  onVisitChange(visit) {
    if (visit && visit.id) {
      hashHistory.push('payment/' + visit.id);
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
            <Field name="id" hidden={true} component={FC.renderInput} readOnly={true} type="text" placeholder="Visit Id" />
            <Field name="visitId"
              readOnly={editMode}
              data={visits}
              component={FC.renderCombo}
              validate={required}
              onChangeAction={this.onVisitChange.bind(this)}
              textField="display"
              type="text"
              placeholder="Visit"/>

            <Field name="amount"
              component={FC.renderInput}
              readOnly={editMode}
              type="number"
              validate={[required, (val) => {
                if (val <= 0) {
                  return 'Payment may not be zero or negative'
                }
              }]}
              placeholder="Payment Amount"/>
            <Field name="payDate"
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
  enableReinitialize: true,
  onSubmitSuccess: function(submitResponse, dispatch, props) {
    props.dispatch(props.change('amount', 0))
    props.dispatch(props.untouch('amount'))
    const visitId = props.currentVisit && props.currentVisit.id;
    props.dispatch(Actions.get(visitId));
  }
})(Payment);

Payment = withRouter(Payment)

export default connect((store, ownProps) => {
  let visitId;
  let currentVisit = getFormValue(store, 'visitId');
  if (ownProps.params.VisitId) {
    visitId = parseInt(ownProps.params.VisitId, 10);
    if (typeof currentVisit !== 'object') {
      currentVisit = getVisitById(visitId);
    }
  }
  return {
    initialValues: {
      visitId: visitId,
      payDate: moment().format('YYYY-MM-DD')
    },
    currentPayments: store.payments.currentPayments,
    currentVisit: currentVisit,
    visits: store.visits.data,
  }
})(Payment);
