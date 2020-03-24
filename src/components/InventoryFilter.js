import _startCase from "lodash.startcase"
import React from "react"
import { InventoryFilterContext } from "../contexts/InventoryFilterContext"
import FilterTags from "./FilterTags"
const styles = {
  width: `100%`,
  display: `grid`,
  gridGap: `20px`,
  gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
  margin: `5rem auto`,
}
const Select = ({ name, values }) => {
  const { addFilter, selectedFilters } = React.useContext(
    InventoryFilterContext
  )
  return (
    <select
      onChange={e => addFilter(e)}
      value={selectedFilters[name]}
      name={name}
      id={name}
    >
      <option value="" disabled>
        Choose...
      </option>
      {values &&
        values.map((val, index) => (
          <option key={val + index} value={val}>
            {_startCase(val)}
          </option>
        ))}
    </select>
  )
}

const InventoryFilter = props => {
  const { filters, selectedFilters, clearFilters } = React.useContext(
    InventoryFilterContext
  )
  const hasFiltersSelected =
    Object.values(selectedFilters).filter(v => v !== "").length > 0
  return (
    <>
      <FilterTags />
      <div>
        {filters &&
          filters.map(filter => <Select key={filter.name} {...filter} />)}
      </div>
      {hasFiltersSelected && (
        <button onClick={e => clearFilters()}>Remove All Filters X</button>
      )}
    </>
  )
}

InventoryFilter.propTypes = {}

export default InventoryFilter
