import React from "react"
import { data } from "../../data"
import InventoryFilter from "../components/InventoryFilter"
import InventoryList from "../components/InventoryList"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { InventoryFilterProvider } from "../contexts/InventoryFilterContext"
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <InventoryFilterProvider unfilteredInventory={data}>
        <InventoryFilter />
        <InventoryList />
      </InventoryFilterProvider>
    </Layout>
  )
}

export default IndexPage
