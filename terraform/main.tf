provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "api-management-rg"
  location = "UK West"
}

resource "azurerm_api_management" "apim" {
  name                = "myApiManagement"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  publisher_name      = "My Company"
  publisher_email     = "admin@example.com"

  sku_name = "Developer_1"
}