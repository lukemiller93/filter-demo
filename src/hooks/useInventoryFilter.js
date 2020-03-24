// import _camelCase from "lodash.camelcase"
// import { useContext, useReducer, useRef } from "react"
// import { InventoryFilterContext } from "../contexts/InventoryFilterContext"

// export const useInventoryFilter = () => {
//   const originalList = useContext(InventoryFilterContext)
//   const initialFilterState = {
//     itemList: originalList.sort(
//       (a, b) =>
//         a.inventoryItemDetails.shedInfo.sizeAsNum -
//         b.inventoryItemDetails.shedInfo.sizeAsNum
//     ),
//     filters: {
//       size: "",
//       style: "",
//       status: "",
//       siding: "",
//       location: "",
//       sortOrder: "",
//     },
//   }

//   const applyFilters = (listings, filters) => {
//     let result = listings
//     const { size, style, status, siding, location, sortOrder } = filters
//     if (size)
//       result = result.filter(v => v.inventoryItemDetails.shedInfo.size === size)
//     if (style)
//       result = result.filter(
//         v => v.inventoryItemDetails.shedInfo.style === style
//       )
//     if (status)
//       result = result.filter(v => v.inventoryItemDetails.shedStatus === status)
//     if (siding)
//       result = result.filter(
//         v => v.inventoryItemDetails.shedInfo.sidingType === siding
//       )
//     if (location)
//       result = result.filter(
//         v =>
//           _camelCase(
//             v.inventoryItemDetails.shedLocation.salesLotInfo.pageTitle
//           ) === location
//       )
//     if (sortOrder) {
//       if (sortOrder === "highestFirst") {
//         result = result.sort(
//           (a, b) =>
//             Number(b.inventoryItemDetails.shedInfo.price) -
//             Number(a.inventoryItemDetails.shedInfo.price)
//         )
//       }
//       if (sortOrder === "lowestFirst") {
//         result = result.sort(
//           (a, b) =>
//             Number(a.inventoryItemDetails.shedInfo.price) -
//             Number(b.inventoryItemDetails.shedInfo.price)
//         )
//       }
//     }
//     return result
//   }

//   const updatedState = useRef(initialFilterState)

//   const reducer = (state, action) => {
//     let result
//     switch (action.type) {
//       case "ADD_FILTER":
//         result = {
//           ...state,
//           filters: {
//             ...state.filters,
//             [action.item.target.name]: action.item.target.value,
//           },
//           itemList: applyFilters(initialFilterState.itemList, {
//             ...state.filters,
//             [action.item.target.name]: action.item.target.value,
//           }),
//         }
//         updatedState.current = result
//         return result
//       case "REMOVE_FILTER":
//         result = {
//           ...state,
//         }
//       case "CLEAR_FILTERS":
//         return {
//           ...state,
//         }
//       default:
//         return (result = state)
//     }
//   }
//   const [state, dispatch] = useReducer(reducer, initialFilterState)
//   const initialList =
//     originalList &&
//     originalList.sort(
//       (a, b) =>
//         a.inventoryItemDetails.shedInfo.sizeAsNum -
//         b.inventoryItemDetails.shedInfo.sizeAsNum
//     )

//   // Setup filter dropdowns
//   const sizes =
//     initialList &&
//     initialList
//       .map(
//         ({
//           inventoryItemDetails: {
//             shedInfo: { size },
//           },
//         }) => size
//       )
//       .filter((item, i, arr) => arr.indexOf(item) === i)

//   const styles =
//     originalList &&
//     originalList
//       .map(
//         ({
//           inventoryItemDetails: {
//             shedInfo: { style },
//           },
//         }) => style
//       )
//       .filter((item, i, arr) => arr.indexOf(item) === i)
//       .sort()

//   const sidingTypes =
//     originalList &&
//     originalList
//       .map(
//         ({
//           inventoryItemDetails: {
//             shedInfo: { sidingType },
//           },
//         }) => sidingType
//       )
//       .filter((item, i, arr) => arr.indexOf(item) === i)
//       .sort()

//   const shedStatii =
//     originalList &&
//     originalList
//       .map(({ inventoryItemDetails: { shedStatus } }) => shedStatus)
//       .filter((item, i, arr) => arr.indexOf(item) === i)
//       .sort()

//   const shedLocations =
//     originalList &&
//     originalList
//       .map(
//         ({
//           inventoryItemDetails: {
//             shedLocation: {
//               salesLotInfo: { pageTitle },
//             },
//           },
//         }) => _camelCase(pageTitle)
//       )
//       .filter((item, i, arr) => arr.indexOf(item) === i)
//       .sort()

//   const filters = [
//     {
//       name: "size",
//       values: sizes,
//     },
//     {
//       name: "style",
//       values: styles,
//     },
//     {
//       name: "siding",
//       values: sidingTypes,
//     },
//     {
//       name: "status",
//       values: shedStatii,
//     },
//     {
//       name: "location",
//       values: shedLocations,
//     },
//     {
//       name: "sortOrder",
//       values: ["highestFirst", "lowestFirst"],
//     },
//   ]

//   /**
//    * These are the filtering methods used to filter the list
//    *
//    */

//   const addFilter = item => {
//     item.persist()
//     dispatch({ type: "ADD_FILTER", item })
//   }
//   const removeFilter = item => {
//     dispatch({ type: "REMOVE_FILTER", item })
//   }

//   const clearFilters = item => {
//     dispatch({ type: "CLEAR_FILTERS", item })
//   }

//   return {
//     state,
//     filters,
//     addFilter,
//     removeFilter,
//     clearFilters,
//   }
// }
