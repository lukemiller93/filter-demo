import _startCase from "lodash.startcase"
import React from "react"
import { InventoryFilterContext } from "../contexts/InventoryFilterContext"
const FilterTags = props => {
  const { selectedFilters, removeFilter } = React.useContext(
    InventoryFilterContext
  )
  return (
    <div>
      {Object.entries(selectedFilters)
        .filter(tag => tag[1] !== "" && tag[0] !== "sortOrder")
        .map(tag => (
          <button key={tag[0]} name={tag[0]} onClick={e => removeFilter(e)}>
            {_startCase(tag[1])} X
          </button>
        ))}
    </div>
  )
}

FilterTags.propTypes = {}

export default FilterTags
