import _camelCase from "lodash.camelcase"
import React, { createContext, useReducer, useRef } from "react"
const InventoryFilterContext = createContext()

const InventoryFilterProvider = ({ children, unfilteredInventory }) => {
  const updatedState = useRef(initialFilterState)
  const initialFilterState = {
    itemList: unfilteredInventory.sort(
      (a, b) =>
        Number(a.inventoryItemDetails.shedInfo.sizeAsNum) -
        Number(b.inventoryItemDetails.shedInfo.sizeAsNum)
    ),
    filters: {
      size: "",
      style: "",
      status: "",
      siding: "",
      location: "",
      sortOrder: "",
    },
  }

  const applyFilters = (listings, filters) => {
    let result = listings
    const { size, style, status, siding, location, sortOrder } = filters
    if (size)
      result = result.filter(v => v.inventoryItemDetails.shedInfo.size === size)
    if (style)
      result = result.filter(
        v => v.inventoryItemDetails.shedInfo.style === style
      )
    if (status)
      result = result.filter(v => v.inventoryItemDetails.shedStatus === status)
    if (siding)
      result = result.filter(
        v => v.inventoryItemDetails.shedInfo.sidingType === siding
      )
    if (location)
      result = result.filter(
        v =>
          _camelCase(
            v.inventoryItemDetails.shedLocation.salesLotInfo.pageTitle
          ) === location
      )
    if (sortOrder) {
      if (sortOrder === "highestFirst") {
        result = result.sort(
          (a, b) =>
            Number(b.inventoryItemDetails.shedInfo.price) -
            Number(a.inventoryItemDetails.shedInfo.price)
        )
      }
      if (sortOrder === "lowestFirst") {
        result = result.sort(
          (a, b) =>
            Number(a.inventoryItemDetails.shedInfo.price) -
            Number(b.inventoryItemDetails.shedInfo.price)
        )
      }
    }
    return result
  }
  const reducer = (state, action) => {
    let result
    switch (action.type) {
      case "ADD_FILTER":
        result = {
          ...state,
          filters: {
            ...state.filters,
            [action.item.target.name]: action.item.target.value,
          },
          itemList: applyFilters(initialFilterState.itemList, {
            ...state.filters,
            [action.item.target.name]: action.item.target.value,
          }),
        }
        updatedState.current = result
        return result
      case "REMOVE_FILTER":
        result = {
          ...state,
          filters: {
            ...state.filters,
            [action.item.target.name]: "",
          },
          itemList: applyFilters(initialFilterState.itemList, {
            ...state.filters,
            [action.item.target.name]: "",
          }),
        }
        updatedState.current = result
        return result

      case "CLEAR_FILTERS":
        result = initialFilterState
        updatedState.current = result
        return result
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialFilterState)

  /**
   * Setup filter dropdowns to
   * filter out selected item and push to tag
   */
  const sizes =
    initialFilterState.itemList &&
    initialFilterState.itemList
      .map(
        ({
          inventoryItemDetails: {
            shedInfo: { size },
          },
        }) => size
      )
      .filter((item, i, arr) => arr.indexOf(item) === i)

  const styles =
    initialFilterState.itemList &&
    initialFilterState.itemList
      .map(
        ({
          inventoryItemDetails: {
            shedInfo: { style },
          },
        }) => style
      )
      .filter((item, i, arr) => arr.indexOf(item) === i)
      .sort()
  const sidingTypes =
    initialFilterState.itemList &&
    initialFilterState.itemList
      .map(
        ({
          inventoryItemDetails: {
            shedInfo: { sidingType },
          },
        }) => sidingType
      )
      .filter((item, i, arr) => arr.indexOf(item) === i)
      .sort()

  const shedStatii =
    initialFilterState.itemList &&
    initialFilterState.itemList
      .map(({ inventoryItemDetails: { shedStatus } }) => shedStatus)
      .filter((item, i, arr) => arr.indexOf(item) === i)
      .sort()

  const shedLocations =
    initialFilterState.itemList &&
    initialFilterState.itemList
      .map(
        ({
          inventoryItemDetails: {
            shedLocation: {
              salesLotInfo: { pageTitle },
            },
          },
        }) => _camelCase(pageTitle)
      )
      .filter((item, i, arr) => arr.indexOf(item) === i)
      .sort()
  const filters = [
    {
      name: "size",
      values: sizes,
    },
    {
      name: "style",
      values: styles,
    },
    {
      name: "siding",
      values: sidingTypes,
    },
    {
      name: "status",
      values: shedStatii,
    },
    {
      name: "location",
      values: shedLocations,
    },
    {
      name: "sortOrder",
      values: ["highestFirst", "lowestFirst"],
    },
  ]

  /**
   * These are the dispatch methods used to filter the list
   */

  const addFilter = item => {
    item.persist()
    dispatch({ type: "ADD_FILTER", item })
  }
  const removeFilter = item => {
    item.persist()
    dispatch({ type: "REMOVE_FILTER", item })
  }

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" })
  }
  return (
    <InventoryFilterContext.Provider
      value={{
        inventoryList: state.itemList,
        selectedFilters: state.filters,
        filters,
        addFilter,
        removeFilter,
        clearFilters,
      }}
    >
      {children}
    </InventoryFilterContext.Provider>
  )
}

export { InventoryFilterContext, InventoryFilterProvider }
