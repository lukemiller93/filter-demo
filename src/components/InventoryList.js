import React, { useContext } from "react"
import InventoryListing from "../components/InventoryListing"
import { InventoryFilterContext } from "../contexts/InventoryFilterContext"

const styles = {
  width: `100%`,
  display: `grid`,
  gridGap: `20px`,
  gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
  margin: `5rem auto`,
}
const InventoryList = props => {
  const { inventoryList } = useContext(InventoryFilterContext)
  return (
    <div style={styles}>
      {inventoryList &&
        inventoryList.map(item => <InventoryListing key={item.id} {...item} />)}
    </div>
  )
}

InventoryList.propTypes = {}

export default InventoryList
