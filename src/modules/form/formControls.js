
import React from 'react'


function Label( props ) {
  return <label style={{
      width: 120 || props.labelWidth
    }}>{props.placeholder}</label>
}
function ErrorSpan(props) {
  return <span className="form-error"><span className="glyphicon glyphicon-alert" />{props.children}</span>
}
function WarningSpan(props) {
  return <span className="form-warning"><span className="glyphicon glyphicon-alert" />{props.children}</span>
}
function ErrorWarningSpan({ touched, error, warning }) {
  if (touched) {
    if (error) {
      return <ErrorSpan>{error}</ErrorSpan>
    }
    if (warning) {
      return <WarningSpan>{warning}</WarningSpan>
    }
  }
  return null
}
export function renderInput( field ) {
  let  { hidden, placeholder, input, type, readOnly, meta } = field
  return <div hidden={hidden}>
    <Label {...field}/>
    <input style={{
        width: 300 || field.width
      }}
      {...input}
      hidden={hidden}
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
    ></input>
    <ErrorWarningSpan {...meta} />
  </div>
}

export function renderCombo( field ) {
  const { data, hidden, placeholder, input, readOnly, meta } = field;
  let { valueField, textField } = field;
  valueField = valueField || 'id'
  textField = textField || 'desc'
  const options = data.map((d, ix) => {
    const value = d[valueField]
    const desc = d[textField]
    return <option key={ix} value={value}>{desc}</option>
  })
  return <div>
    <Label {...field}/>
    <select
      style={{
        width: 300 || field.width,
        padding: '2px 0 2px 0'
      }}
      readOnly={readOnly}
      hidden={hidden}
      placeholder={placeholder}
      {...input}
      onChange={(option) => {
        if (field.onChangeAction !== undefined) {
          field.onChangeAction(option)
        }
        input.onChange(option)
      }}
    >
      <option value="" disabled>{"Choose a " + placeholder + "..."}</option>
      {options}
    </select>
    <ErrorWarningSpan {...meta} />

    </div>
}
