import React from 'react'
import { useForm } from 'react-hook-form'

export const CustomForm = ({ template, onSubmit }) => {
  const { register, handleSubmit } = useForm()
  const { title, fields, formClassName, btnClass } = template

  const renderFields = (fields) => {
    return fields.map((field, i) => {
      const { title, type, name, options, className } = field

      switch (type) {
        case 'text':
          return (
            <div key={i}>
              <label htmlFor={name}>{title}</label>
              <input
                className={className}
                type="text"
                {...register(name, { required: true })}
              />
            </div>
          )
        case 'select':
          return (
            <div key={i}>
              <label htmlFor={name}>{title}</label>

              <select className={className}>
                <option selected>Choose...</option>
                {options.map((item, index) => {
                  // console.log(item, "item.value");
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                })}
              </select>
              {/* <input className={className} type="select" {...register(name, { required: true })} /> */}
            </div>
          )
        case 'textarea':
          return (
            <div key={i}>
              <label htmlFor={name}>{title}</label>
              <textarea
                className={className}
                {...register(name, { required: true })}
              />
            </div>
          )
        case 'checkbox':
          return (
            <div key={i}>
              <label htmlFor={name}>{title}</label>
              <input
                className={className}
                type="checkbox"
                {...register(name, { required: true })}
              />
            </div>
          )
        case 'radio':
          return (
            <div key={i}>
              <label htmlFor={name}>{title}</label>
              <input
                className={className}
                type="radio"
                {...register(name, { required: true })}
              />
            </div>
          )
        case 'url':
          return (
            <div key={i}>
              <label htmlFor={name}>{title}</label>
              {/* <checkbox className={className}  */}
              <input
                className={className}
                type="url"
                {...register(name, { required: true })}
              />
            </div>
          )
        case 'email':
          return (
            <div key={i}>
              <label htmlFor={name}>{title}</label>
              <input
                className={className}
                type="email"
                {...register(name, { required: true })}
              />
            </div>
          )
        case 'file':
          return (
            <div key={i}>
              <label htmlFor={name}>{title}</label>
              <input
                className={className}
                type="file"
                {...register(name, { required: true })}
              />
            </div>
          )
        default:
          return (
            <div>
              <span className="red-text">Invalid field</span>
            </div>
          )
      }
    })
  }

  //  =============================== jsx start ====================================
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={formClassName}>
        <h5>{title}</h5>
        {renderFields(fields)}
        <br />
        <button type="submit" className={btnClass}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default CustomForm
