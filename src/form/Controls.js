import React from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import Combobox from 'react-widgets/lib/Combobox'

function validationState(meta) {
  const { touched, error, warning } = meta;
  if (touched) {
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
  const  { hidden, placeholder, input, type, readOnly, meta } = field
  return (
    <FormGroup
      controlId={input.name}
      validationState={validationState(meta)}
      hidden={hidden}
    >
      <ControlLabel>{placeholder}</ControlLabel>
      <FormControl type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        value={input.value}
        onChange={input.onChange}
      />
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
