import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { hashHistory, withRouter } from 'react-router'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import Button from './shared/Button.js'
import * as Actions from '../data/actions/visit.js'
import  * as FC  from './shared/formControls.js'

const getFormValue = formValueSelector('peopleForm');

class VisitEdit extends React.Component {

  constructor(props) {
    super(props);
    const {params} = this.props;
    let editMode = false;
    console.log(' params to visit edit', params);
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
    hashHistory.push('/visits')
  }
  handleSubmit(formValues) {

    ['BedId', 'BuildingId', 'PersonId', 'PayTypeId'].forEach(fn => {
      if (typeof formValues[fn] === 'object') {
        formValues[fn] = formValues[fn].Id;
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
    const beds = this.props.beds.filter(b => currentBuildingId === b.BuildingId);
    const payHistory = this.buildPayments(currentIntake,currentPaySchedule);
    const editMode = false;//this.state.editMode;

    return (
      <div className="w3-row">
        <form className=" w3-container" onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
          <p>
            <Button type="submit">Save</Button>
            <Button
              onClick={()=>hashHistory.push('people/edit')}
              className={editMode ? 'w3-hide' : ''}
            >Add Visitor</Button>
            <Button onClick={this.onCancel}>Cancel</Button>
          </p>
          <div className="w3-third">
            <Field name="Id" hidden={true} component={FC.renderInput} readOnly={true} type="text" placeholder="Visit Id" />
            <Field name="PersonId"
              readOnly={editMode}
              data={people}
              component={FC.renderCombo}
              textField="FullName"
              type="text"
              placeholder="Visitor"/>
            <Field name="BuildingId"
              readOnly={editMode}
              data={buildings}
              component={FC.renderCombo}
              textField="Name"
              type="text"
              placeholder="Building"/>
            <Field name="BedId"
              readOnly={editMode}
              data={beds}
              component={FC.renderCombo}

              textField="Type"
              type="text"
              placeholder="Bed"/>
            <Field name="PayTypeId"
              readOnly={editMode}
              data={[{Id: 1, Desc: 'Weekly'}, {Id: 2, Desc: 'Bi-Weekly'}]}
              component={FC.renderCombo}
              type="text"
              placeholder="Pay Schedule"/>
            <Field name="Cost"
              component={FC.renderInput}
              readOnly={editMode}
              type="number"
              placeholder="Cost"/>
            <Field name="Intake"
              readOnly={editMode}
              component={FC.renderInput}
              type="date"
              placeholder="Date In"/>
            <Field name="Outtake" component={FC.renderInput} type="text" placeholder="Date Out"/>
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
  form:'peopleForm',
  enableReinitialize: true
})(VisitEdit);

VisitEdit = withRouter(VisitEdit)

export default connect((store) => {
  let buildingId =  getFormValue(store, 'BuildingId');
  if (typeof buildingId === 'object') {
    buildingId = buildingId.Id
  }
  let intake = store.visits.current && store.visits.current.Intake;
  intake = moment(intake);

  return {
    initialValues: {
      PayTypeId: 1,
      Cost: 180,
      ...store.visits.current,
      Intake: intake.format('YYYY-MM-DD'),
    },
    buildings: store.buildings.data,
    people: store.people.data,
    beds: store.beds.data,
    currentBuildingId: buildingId,
    currentIntake: getFormValue(store, 'Intake'),
    currentPaySchedule: getFormValue(store, 'PayType')
  }
})(VisitEdit);
