import React from 'react'
//was using this with raw redux-form but react-bootstrap FormControl.Feedback seems to be the way to go for now
function ErrorSpan(props) {
  return <span className="form-error"><span className="glyphicon glyphicon-alert" />{props.children}</span>
}
function WarningSpan(props) {
  return <span className="form-warning"><span className="glyphicon glyphicon-alert" />{props.children}</span>
}
export default function ErrorWarningSpan({ touched, error, warning }) {
  if (touched) {
    console.log('was touched')
    if (error) {
      return <ErrorSpan>{error}</ErrorSpan>
    }
    if (warning) {
      return <WarningSpan>{warning}</WarningSpan>
    }
  }
  return null
}
