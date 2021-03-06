import React from 'react'
import {connect} from 'react-redux'
import {hashHistory, withRouter} from 'react-router'
import {reduxForm, Field} from 'redux-form'
import {ButtonToolbar} from 'react-bootstrap'
import {required} from '../../fn/form-validate.js'
import * as BedActions from '../../data/actions/bed'
import mapIdsFromObject from '../../fn/mapIdsFromObject'
import Button from '../../shared/Button.js'
import Mask from '../../shared/Mask'
import withBodyResize from '../../shared/withBodyResize'
import * as FC from '../../form/Controls'

class BedEdit extends React.Component {

  componentWillMount() {
    let {params} = this.props;
    if (params.Id) {
      this.props.dispatch(BedActions.getBed(params.Id))
    } else {
      this.props.dispatch(BedActions.removeCurrentBed())
    }
  }

  handleSubmit(formValues) {
    formValues = mapIdsFromObject(formValues)
    return this.props.dispatch(BedActions.saveBed(formValues))
  }

  render() {
    const bedTypes = this.props.bedTypes;
    const buildings = this.props.buildings;
    const editMode = this.props.params.Id && true;

    return (

      <form
        style={{
          height: this.props.height,
          position: 'relative'
        }}
        className="container"
        onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
        <Mask masked={this.props.submitting}>
          <header className="card-title">{editMode
              ? 'Edit Bed'
              : 'Add Bed'}
          </header>

          <ButtonToolbar>
            <Button type="submit" disabled={this.props.pristine}>Save</Button>
            <Button
              onClick={(e) => {
                this.props.reset();
                this.props.dispatch(BedActions.removeCurrentBed());
                hashHistory.push('/beds');
              }}>Cancel</Button>
          </ButtonToolbar>
          <Field
            name="id"
            component={FC.renderInput}
            hidden={true}
            readOnly={true}
            type="text"
            placeholder="Bed Id"/>
          <Field
            name="name"
            component={FC.renderInput}
            type="text"
            placeholder="Name"
            validate={required}/>
          <Field
            name="buildingId"
            data={buildings}
            validate={required}
            component={FC.renderCombo}
            textField="name"
            type="text"
            placeholder="Building"/>
          <Field
            name="typeId"
            component={FC.renderCombo}
            data={bedTypes}
            validate={required}
            textField="type"
            type="text"
            placeholder="Bed Type"/>
        </Mask>
      </form>
    )
  }
}

BedEdit = withBodyResize(BedEdit, {adjustment: 61})
BedEdit = reduxForm({
  form: 'bedForm',
  enableReinitialize: true,

  onSubmitSuccess: function(submitResult, dispatch, props) {
    props.reset()
  }
})(BedEdit);

BedEdit = withRouter(BedEdit)

export default connect((store) => {
  return {
    bedTypes: store.codes.bedTypes,
    buildings: store.buildings.data,
    initialValues: {
      ...store.beds.current
    }
  }
})(BedEdit);
