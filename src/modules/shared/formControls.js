import React from 'react'
import DropdownList from 'react-widgets/lib/DropdownList'
import Combobox from 'react-widgets/lib/Combobox'

export function renderInput( { className, hidden, placeholder, input, type, readOnly, meta: { touched, error, warning } } ) {
  let classes = 'w3-input w3-border w3-round ';
  if (className) {
    classes += className
  }
  return <div className={hidden ? 'w3-hide' : null}>
    <label>{placeholder}</label>
    <div>
      <input className={classes}
        {...input}
        hidden={hidden}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
      ></input>
    {touched && ((error && <span className="form-error">{error}</span>) || (warning && <span className="form-warning">{warning}s</span>))}
    </div>
  </div>
}

export function renderTextArea(field) {
  return <div>
    <label>{field.placeholder}</label>
    <div>
      <textarea className="w3-input w3-border w3-round"
        {...field.input} type={field.type} placeholder={field.placeholder}
      ></textarea>
    </div>
  </div>
}

export function renderCombo( field ) {
  const { valueField, textField, data, className, hidden, placeholder, input, readOnly, meta: { touched, error, warning } } = field;
  return <div>
    <label>{placeholder}</label>
    <div>
      <Combobox
        {...input}
        readOnly={readOnly}
        hidden={hidden}
        onBlur={input.onBlur()}
        valueField={valueField || 'Id'}
        textField={textField || 'Desc'}
        placeholder={placeholder}
        data={data}
        onChange={(option) => {
          console.log(option);
          let value = option;
          if (valueField) {
            value = option[valueField];
          }
          if (field.onChangeAction !== undefined) {
            field.onChangeAction(value)
          }
          input.onChange(option)
        }}
      />
      {touched && ((error && <span className="form-error">{error}</span>) || (warning && <span className="form-warning">{warning}s</span>))}
    </div>
  </div>
}
