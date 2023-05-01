-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_productName_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_productTypeName_fkey`;

-- DropForeignKey
ALTER TABLE `ProductData` DROP FOREIGN KEY `ProductData_dataTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductData` DROP FOREIGN KEY `ProductData_fieldName_fkey`;

-- DropForeignKey
ALTER TABLE `ProductData` DROP FOREIGN KEY `ProductData_productId_fkey`;

-- DropForeignKey
ALTER TABLE `_ColorToProduct` DROP FOREIGN KEY `_ColorToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ColorToProduct` DROP FOREIGN KEY `_ColorToProduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `_FieldToProductType` DROP FOREIGN KEY `_FieldToProductType_A_fkey`;

-- DropForeignKey
ALTER TABLE `_FieldToProductType` DROP FOREIGN KEY `_FieldToProductType_B_fkey`;
