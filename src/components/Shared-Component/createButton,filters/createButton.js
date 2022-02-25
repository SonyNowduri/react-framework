import { Button } from '@material-ui/core'
import rightArrowBlack from '../../../assets/images/rightArrow.png'
import React from 'react'

export const CreateButton = (props) => {
  const { btnName,btnType } = props
  return (
    <Button
      type={btnType ? btnType : "button"}
      style={{ height: '27px',background: '#FFFFFF' }}
      className="create-support-ticket-btn"
      // onClick={props?.handleClick}
    >
      {btnName}
      <img
        style={{ marginLeft: '10px' }}
        src={rightArrowBlack}
        alt={rightArrowBlack}
      />
    </Button>
  )
}
