terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
  }
    backend "azurerm" {
        resource_group_name  = "terraform"
        storage_account_name = "t3rraf0rm"
        container_name       = "terraform"
        key                  = "terraform.tfstate"
    }

}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "api-management-rg"
  location = "UK West"
}

resource "azurerm_api_management" "apim" {
  name                = "apim-2guxyrz57b67j"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  publisher_name      = "My Company"
  publisher_email     = "admin@example.com"

  sku_name = "Developer_1"
}