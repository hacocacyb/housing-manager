import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { ButtonToolbar } from 'react-bootstrap'
import { required } from '../../fn/form-validate.js'
import Button from '../../shared/Button.js'
import mapIdsFromObject from '../../fn/mapIdsFromObject'
import * as Actions from '../../data/actions/visit.js'
import * as FC from '../../form/Controls'

const getFormValue = formValueSelector('visitForm');

class VisitEdit extends React.Component {

  componentWillMount() {
    let {params} = this.props;
    if (params.Id) {
      this.props.dispatch(Actions.get(params.Id))
    } else {
      this.props.dispatch(Actions.removeCurrent())
    }
  }

  onCancel() {
    this.props.dispatch(Actions.removeCurrent())
    hashHistory.push('/visits')
  }
  handleSubmit(formValues) {
    formValues = mapIdsFromObject(formValues);
    return this.props.dispatch(Actions.save(formValues))
  }

  buildPayments(intake, schedule) {
    const inc = schedule === 'Bi-Weekly' ? 14 : 7;

    let startDate = moment(intake);
    let payments = [];
    for(let i=0;i<3;i++) {
      payments.push(<li key={i}>{startDate.add(inc, 'days').format('MM/DD/YYYY')}</li>)
    }

    return payments
  }

  render() {
    const { buildings, people, currentBuildingId, currentIntake, currentPaySchedule } = this.props;
    //filtered by the current building
    const beds = this.props.beds.filter(b => currentBuildingId === b.buildingId);
    const payHistory = this.buildPayments(currentIntake,currentPaySchedule);
    const editMode = this.props.params.Id && true;
    let filteredPeople = people;
    if (!editMode) {
      filteredPeople = people.filter((p) => !p.visiting);
    }

    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
          <header className="card-title">{editMode ? 'Edit Visit' : 'Add Visit'}</header>
          <ButtonToolbar>
            <Button type="submit" disabled={this.props.pristine}>Save</Button>
            <Button onClick={this.onCancel.bind(this)}>Cancel</Button>
          </ButtonToolbar>
          <div>
            <Field name="id" hidden={true} component={FC.renderInput} readOnly={true} type="text" placeholder="Visit Id" />
            <Field name="personId"
              readOnly={editMode}
              data={filteredPeople}
              validate={[required, function(value) {
                if (value && value.visiting) {
                  return value.fullName + ' is already visiting';
                }
              }]}
              component={FC.renderCombo}
              textField="fullName"
              type="text"
              placeholder="Visitor"/>
            <Field name="buildingId"
              readOnly={editMode}
              validate={required}
              data={buildings}
              component={FC.renderCombo}
              textField="name"
              type="text"
              placeholder="Building"/>
            <Field name="bedId"
              readOnly={editMode}
              data={beds}
              component={FC.renderCombo}
              validate={[required, function(v) {
                if (v && v.occupied) {
                  return 'Bed is currently occupied'
                }
              }]}
              textField="display"
              type="text"
              placeholder="Bed"/>
            <Field name="rentalPeriodId"
              readOnly={editMode}
              data={[{id: 1, desc: 'Weekly'}, {id: 2, desc: 'Bi-Weekly'}]}
              component={FC.renderCombo}
              type="text"
              validate={required}
              placeholder="Pay Schedule"/>
            <Field name="cost"
              component={FC.renderInput}
              readOnly={editMode}
              type="number"
              validate={required}
              placeholder="Cost"/>
            <Field name="intake"
              readOnly={editMode}
              component={FC.renderInput}
              type="date"
              validate={required}
              placeholder="Date In"/>
            <Field name="outtake" component={FC.renderInput} type="date" placeholder="Date Out"/>
          </div>
          <div>
            <h5>
              Rent Due Dates
            </h5>
            <ol>
              {payHistory}
            </ol>
          </div>
        </form>
      </div>
    )

  }
}

VisitEdit = reduxForm({
  form:'visitForm',
  enableReinitialize: true,
  onSubmitSuccess: function(submitResult, dispatch, props) {
    props.reset()
    dispatch(Actions.removeCurrent())
  }
})(VisitEdit);

VisitEdit = withRouter(VisitEdit)

export default connect((store) => {
  let buildingId =  getFormValue(store, 'buildingId');
  if (buildingId && typeof buildingId === 'object') {
    buildingId = buildingId.id
  }
  let intake = store.visits.current && store.visits.current.intake;
  intake = moment(intake);
  return {
    initialValues: {
      payTypeId: 1,
      cost: 180,
      ...store.visits.current,
      intake: intake.format('YYYY-MM-DD'),
    },
    buildings: store.buildings.data,
    people: store.people.data,
    beds: store.beds.data,
    currentBuildingId: buildingId,
    currentIntake: getFormValue(store, 'intake'),
    currentPaySchedule: getFormValue(store, 'payType')
  }
})(VisitEdit);
