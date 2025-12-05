-- PostgreSQL Sample Data for DBMS Project

-- Insert Product Types
INSERT INTO PRODUCT_TYPE (NAME, PARENT_TYPE_ID, DESCRIPTION) VALUES 
('Food', NULL, 'General food category'),
('Beverage', 1, 'Drinks and related items'),
('Soda', 2, 'Carbonated soft drinks'),
('Snack', 1, 'Packaged snack items'),
('Dairy', 1, 'Milk and dairy products');

-- Insert Brands
INSERT INTO BRAND (NAME) VALUES 
('Pepsi'),
('Coca-Cola'),
('Lays'),
('Organic Valley');

-- Insert Vendors
INSERT INTO VENDOR (NAME, ADDRESS, EMAIL) VALUES 
('PepsiCo', '700 Anderson Hill Rd, Purchase, NY', 'info@pepsico.com'),
('Coca-Cola Company', 'One Coca-Cola Plaza, Atlanta, GA', 'contact@coca-cola.com'),
('Dairy Distributors', '100 Dairy Lane, Wisconsin', 'sales@dairydist.com');

-- Insert Products (including milk products for the "bought with milk" query)
INSERT INTO PRODUCT (NAME, UPC_CODE, SIZE, PACKAGING, BRAND_ID, PRODUCT_TYPE_ID, VENDOR_ID) VALUES 
('Pepsi 500ml', '012000000001', '500ml', 'Bottle', 1, 3, 1),
('Diet Pepsi 500ml', '012000000002', '500ml', 'Bottle', 1, 3, 1),
('Coca-Cola 500ml', '049000000001', '500ml', 'Bottle', 2, 3, 2),
('Lays Classic Chips 100g', '028400000001', '100g', 'Packet', 3, 4, 1),
('Organic Whole Milk 1L', '076950000001', '1L', 'Carton', 4, 5, 3),
('Low Fat Milk 1L', '076950000002', '1L', 'Carton', 4, 5, 3),
('Chocolate Milk 500ml', '076950000003', '500ml', 'Bottle', 4, 5, 3);

-- Insert Stores
INSERT INTO STORE (NAME, ADDRESS, CITY, STATE, ZIP_CODE, OPENING_HOURS) VALUES 
('SuperMart Downtown', '123 Market St', 'New York', 'NY', '10001', '9AM-9PM'),
('City Grocery', '456 Central Ave', 'Los Angeles', 'CA', '90001', '8AM-10PM'),
('Fresh Foods Market', '789 Oak Street', 'Chicago', 'IL', '60601', '7AM-11PM');

-- Insert Customers
INSERT INTO CUSTOMER (NAME, EMAIL, PHONE, ADDRESS, GENDER) VALUES 
('Alice Johnson', 'alice@example.com', '555-1234', '12 Main St, New York, NY', 'F'),
('Bob Smith', 'bob@example.com', '555-5678', '98 Sunset Blvd, Los Angeles, CA', 'M'),
('Charlie Brown', 'charlie@example.com', '555-2468', '75 Elm St, New York, NY', 'M'),
('Diana Prince', 'diana@example.com', '555-9876', '321 Hero Ave, Chicago, IL', 'F');

-- Insert Transactions (using current year 2025)
INSERT INTO "TRANSACTION" (CUSTOMER_ID, STORE_ID, TRANSACTION_DATE) VALUES 
(1, 1, '2025-01-05'),
(2, 1, '2025-01-06'),
(3, 2, '2025-02-10'),
(1, 2, '2025-03-12'),
(2, 1, '2025-04-01'),
(4, 3, '2025-05-15'),
(3, 3, '2025-06-20'),
(1, 1, '2025-07-10');

-- Insert Transaction Items (including transactions with milk)
-- Using subqueries to get the correct IDs after auto-generation
INSERT INTO TRANSACTION_ITEM (TRANSACTION_ID, PRODUCT_ID, QUANTITY, PRICE) VALUES 
-- Transaction 1: Pepsi + Chips
(1, 1, 2, 1.50),
(1, 4, 1, 2.00),
-- Transaction 2: Diet Pepsi
(2, 2, 3, 1.60),
-- Transaction 3: Coca-Cola + Chips  
(3, 3, 4, 1.70),
(3, 4, 2, 2.00),
-- Transaction 4: Pepsi + Coca-Cola
(4, 1, 1, 1.50),
(4, 3, 2, 1.70),
-- Transaction 5: Diet Pepsi + Chips
(5, 2, 2, 1.60),
(5, 4, 3, 2.00),
-- Transaction 6: Milk + Chips (for "bought with milk" query)
(6, 5, 1, 3.50),
(6, 4, 2, 2.00),
-- Transaction 7: Chocolate Milk + Coca-Cola
(7, 7, 1, 2.50),
(7, 3, 1, 1.70),
-- Transaction 8: Low Fat Milk + Diet Pepsi + Chips
(8, 6, 2, 3.25),
(8, 2, 1, 1.60),
(8, 4, 1, 2.00);

-- Database initialization complete