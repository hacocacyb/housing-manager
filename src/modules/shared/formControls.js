import React from 'react'
import DropdownList from 'react-widgets/lib/DropdownList'
import Combobox from 'react-widgets/lib/Combobox'

export function renderInput(field) {
  let classes = 'w3-input w3-border w3-round ';
  if (field.className) {
    classes += field.className
  }
  return <div className={field.hidden ? 'w3-hide' : null}>
    <label>{field.placeholder}</label>
    <div>
      <input className={classes}
        {...field.input}
        hidden={field.hidden}
        type={field.type}
        placeholder={field.placeholder}
        readOnly={field.readOnly}
      ></input>
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

export function renderCombo(field) {
  return <div>
    <label>{field.placeholder}</label>
    <div>
      <Combobox
        {...field.input}
        readOnly={field.readOnly}
        onBlur={() => field.input.onBlur()}
        valueField={field.valueField || 'Id'}
        textField={field.textField || 'Desc'}
        placeholder={field.placeholder}
        data={field.data}/>
    </div>
  </div>
}
