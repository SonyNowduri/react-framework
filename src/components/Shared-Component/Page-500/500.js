import React from 'react'

export const InternalServerError500 = (props) => {
  props
  return (
    <div className="container internal-server-error">
      <h1>Oops Internal Server Error ! <br/> Please contact your administrator!</h1>
      <button type="button" className="custom-btn">
        Go Back
      </button>
    </div>
  )
}
