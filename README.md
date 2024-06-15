
# Warehouse Pallet Management System

This JavaScript application is designed to optimize the process of managing products, orders, and pallets in a warehouse environment. It includes functionality for processing orders from an Excel file, organizing products into different types of pallets (full, skvett, and mix), and calculating the most efficient way to stack and ship these pallets.

## Features

- **Excel Order Processing**: Reads orders from an Excel file, extracting product IDs and quantities.
- **Product and Pallet Management**: Supports various types of pallets (Empty, Full, Skvett, Mix) and products, allowing for detailed specifications including dimensions and stack heights.
- **Order Fulfillment Optimization**: Calculates how to fulfill orders using full pallets, skvett pallets (partial pallets), and mix pallets (mixed product pallets) to minimize shipping costs and space.
- **Efficient Pallet Stacking**: Implements a Best Fit Descending algorithm to stack skvett pallets efficiently, ensuring the least possible number of pallets are shipped.
- **Dynamic Order Adjustment**: Dynamically adjusts orders based on available stock and the most efficient packing method.

## Classes and Their Functions

- `EmptyPallet`: Represents an empty pallet with dimensions.
- `Box`: Represents a box with dimensions, maximum stack height, and other properties.
- `Product`: Represents a product, including its name, ID, and associated box.
- `SkvettPall`: Represents a skvett pallet, which is a partially filled pallet.
- `FullPall`: Represents a fully loaded pallet with a specific product.
- `MixProduct`: Represents a product that is part of a mix pallet (pallet with mixed products).
- `Order`: Represents an order with a product ID and quantity.
- `processExcel`: Processes an Excel file to extract orders.
- `fixaPlockListan`: Main function that organizes orders into pallets based on the most efficient packing method.
- `getProduct`, `getFullPall`: Utility functions to fetch products and full pallets by ID.
- `handleSkvettOrMixPall`: Determines whether an order should be fulfilled using a skvett or mix pallet.
- `combinePallets`: Combines skvett pallets using a Best Fit Descending algorithm to minimize the number of pallets.
- `calculatePlatser`: Calculates the total number of shipping "platser" (spaces) needed based on the pallet arrangement.
- `displayResults`: Displays the results of the pallet organization in the UI.

## Usage

To use this application:

1. Ensure you have an Excel file with orders, including columns for "Artikelnummer" (Product ID) and "Beställda DFP" (Ordered Quantity).
2. Call the `processExcel` function with the Excel file's ArrayBuffer to load the orders.
3. Execute the `fixaPlockListan` function to organize the orders into pallets and calculate the most efficient shipping arrangement.
4. Review the output in the designated output area in your HTML.

## Note

This application is designed to be part of a larger warehouse management system and requires a specific setup, including an HTML environment for displaying results and a set of predefined products and pallets.