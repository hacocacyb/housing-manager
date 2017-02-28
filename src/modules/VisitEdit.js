import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import Button from './shared/Button.js'
import * as Actions from '../data/actions/visit.js'
import  * as FC  from './shared/formControls.js'

const getFormValue = formValueSelector('visitForm');

class VisitEdit extends React.Component {

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

    ['bedId', 'buildingId', 'personId', 'rentalPeriodId'].forEach(fn => {
      if (typeof formValues[fn] === 'object') {
        formValues[fn] = formValues[fn].id;
      }
    })
    this.props.dispatch(Actions.save(formValues))
  }

  buildPayments(intake, schedule) {
    const inc = schedule === 'Bi-Weekly' ? 14 : 7;

    let startDate = moment(intake);
    let payments = [];
    for(let i=0;i<10;i++) {
      payments.push(<li key={i}>{startDate.add(inc, 'days').format('YYYY-MM-DD')}</li>)
    }

    return payments
  }

  render() {
    const { buildings, people, currentBuildingId, currentIntake, currentPaySchedule } = this.props;
    //filtered by the current building
    console.log(this.props.beds);
    const beds = this.props.beds.filter(b => currentBuildingId === b.buildingId);
    const payHistory = this.buildPayments(currentIntake,currentPaySchedule);
    const editMode = false;//this.state.editMode;

    return (
      <div className="w3-container">
        <form className="" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
          <h4>{this.state.editMode ? 'Edit Visit' : 'Add Visit'}</h4>
          <div  className="w3-padding-bottom w3-cell-row">
            <Button type="submit">Save</Button>
            <Button
              onClick={()=>hashHistory.push('people/edit')}
              className={editMode ? 'w3-hide' : ''}
            >Add Visitor</Button>
            <Button onClick={this.onCancel}>Cancel</Button>
          </div>
          <div className="w3-third">
            <Field name="id" hidden={true} component={FC.renderInput} readOnly={true} type="text" placeholder="Visit Id" />
            <Field name="personId"
              readOnly={editMode}
              data={people}
              validate={function(value) {
                if (value && value.Visiting) {
                  return value.fullName + ' is already visiting';
                }
              }}
              component={FC.renderCombo}
              textField="fullName"
              type="text"
              placeholder="Visitor"/>
            <Field name="buildingId"
              readOnly={editMode}
              data={buildings}
              component={FC.renderCombo}
              textField="name"
              type="text"
              placeholder="Building"/>
            <Field name="bedId"
              readOnly={editMode}
              data={beds}
              component={FC.renderCombo}
              validate={function(v) {
                if (v && v.occupied) {
                  return 'Bed is currently occupied'
                }
              }}
              textField="display"
              type="text"
              placeholder="Bed"/>
            <Field name="rentalPeriodId"
              readOnly={editMode}
              data={[{id: 1, desc: 'Weekly'}, {id: 2, desc: 'Bi-Weekly'}]}
              component={FC.renderCombo}
              type="text"
              placeholder="Pay Schedule"/>
            <Field name="cost"
              component={FC.renderInput}
              readOnly={editMode}
              type="number"
              placeholder="Cost"/>
            <Field name="intake"
              readOnly={editMode}
              component={FC.renderInput}
              type="date"
              placeholder="Date In"/>
            <Field name="outtake" component={FC.renderInput} type="text" placeholder="Date Out"/>
          </div>
          <div className="w3-rest w3-panel ">
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
  enableReinitialize: true
})(VisitEdit);

VisitEdit = withRouter(VisitEdit)

export default connect((store) => {
  let buildingId =  getFormValue(store, 'buildingId');
  if (typeof buildingId === 'object') {
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
