import React from 'react'

export const TypeFilter = () => {
  return (
    <div>
      <select className="filter-style">
        <option value="Type">Type</option>
        <option value="HightoLow">High to Low</option>
        <option value="LowtoHigh">Low to High</option>
      </select>
    </div>
  )
}
