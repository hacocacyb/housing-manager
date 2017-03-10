import React from 'react'
import { FormGroup, ControlLabel, FormControl, Tooltip, OverlayTrigger } from 'react-bootstrap'
import Combobox from 'react-widgets/lib/Combobox'
import './tooltip.css'
function validationState(meta) {
  const { touched, dirty, error, warning } = meta;
  console.log('touched', touched)
  if (dirty) {
    if (error) {
      return 'error'
    }
    if (warning) {
      return 'warning'
    }
  }
  return null;
}
export function renderInput( field ) {
  console.log('field', field.input.name, 'Touched?: ', field.meta.touched, ' dirty? ', field.meta.dirty)
  const  { hidden, placeholder, input, type, readOnly, meta } = field
  console.log('render', input.name, meta.error)
  let control = (
    <FormControl
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      value={input.value}
      onChange={input.onChange}
    />
  )
  if (meta.dirty && meta.error) {
    const tooltip = <Tooltip className="red-tooltip" id={input.name + '-tooltip'}>{meta.error}</Tooltip>
    control = (
      <OverlayTrigger placement="top" overlay={tooltip} >
        {control}
      </OverlayTrigger>
    )
  }
  return (
    <FormGroup
      controlId={input.name}
      validationState={validationState(meta)}
      hidden={hidden}
    >
      <ControlLabel>{placeholder}</ControlLabel>
      {control}
      <FormControl.Feedback />
    </FormGroup>
  )
}

export function renderCombo( field ) {
  const { valueField, textField, data, hidden, placeholder, input, readOnly, meta } = field;
  return (
    <FormGroup
      controlId={input.name}
      validationState={validationState(meta)}
      hidden={hidden}
    >
      <ControlLabel>{placeholder}</ControlLabel>

      <Combobox
        {...input}
        readOnly={readOnly}
        disabled={readOnly}
        hidden={hidden}
        onBlur={() => input.onBlur()}
        valueField={valueField || 'id'}
        textField={textField || 'desc'}
        placeholder={placeholder}
        data={data}
        onChange={(option) => {
          if (field.onChangeAction !== undefined) {
            field.onChangeAction(option)
          }
          input.onChange(option)
        }}
      />
      <FormControl.Feedback className="select-feedback"/>
    </FormGroup>
  )
}
