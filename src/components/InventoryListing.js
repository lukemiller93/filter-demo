import _startCase from "lodash.startcase"
import React from "react"

const styles = {
  background: `#eee`,
  padding: `2rem`,
}
const InventoryListing = ({ inventoryItemDetails, id }) => {
  const {
    shedInfo: { size, style, price, sidingType },
    shedStatus,
    shedLocation: {
      salesLotInfo: { pageTitle },
    },
  } = inventoryItemDetails
  return (
    <article style={styles}>
      <h2
        dangerouslySetInnerHTML={{ __html: `${size} ${_startCase(style)}` }}
      />
      <p
        style={{ margin: 0 }}
        dangerouslySetInnerHTML={{ __html: `Price: ${price}` }}
      />
      <p
        style={{ margin: 0 }}
        dangerouslySetInnerHTML={{ __html: `Status: ${shedStatus}` }}
      />
      <p
        style={{ margin: 0 }}
        dangerouslySetInnerHTML={{
          __html: `Siding Type: ${_startCase(sidingType)}`,
        }}
      />
      <p
        style={{ margin: 0 }}
        dangerouslySetInnerHTML={{ __html: `Location: ${pageTitle}` }}
      />
    </article>
  )
}

InventoryListing.propTypes = {}

export default InventoryListing
