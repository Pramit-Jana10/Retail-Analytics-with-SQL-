INSERT INTO PRODUCT_TYPE (PRODUCT_TYPE_ID, NAME, PARENT_TYPE_ID, DESCRIPTION)
VALUES (1, 'Food', NULL, 'General food category'),
(2, 'Beverage', 1, 'Drinks and related items'),
(3, 'Soda', 2, 'Carbonated soft drinks'),
(4, 'Snack', 1, 'Packaged snack items');


INSERT INTO BRAND (BRAND_ID, NAME)
VALUES (1, 'Pepsi'),
(2, 'Coca-Cola'),
(3, 'Lays');

INSERT INTO VENDOR (VENDOR_ID, NAME, ADDRESS, EMAIL)
VALUES (1, 'PepsiCo', '700 Anderson Hill Rd, Purchase, NY','info@pepsico.com'),
(2, 'Coca-Cola Company', 'One Coca-Cola Plaza, Atlanta, GA','contact@coca-cola.com');

INSERT INTO PRODUCT (PRODUCT_ID, NAME, UPC_CODE, SIZE, PACKAGING, BRAND_ID, PRODUCT_TYPE_ID, VENDOR_ID)
VALUES (1, 'Pepsi 500ml', '012000000001', '500ml', 'Bottle', 1, 3, 1),
(2, 'Diet Pepsi 500ml', '012000000002', '500ml', 'Bottle', 1, 3, 1),
(3, 'Coca-Cola 500ml', '049000000001', '500ml', 'Bottle', 2, 3, 2),
(4, 'Lay''s Classic Chips 100g', '028400000001', '100g', 'Packet', 3, 4, 1);


INSERT INTO STORE (STORE_ID, NAME, ADDRESS, CITY, STATE, ZIP_CODE, OPENING_HOURS)
VALUES (1, 'SuperMart Downtown', '123 Market St', 'New York', 'NY', '10001', '9AM-9PM'),
(2, 'City Grocery', '456 Central Ave', 'Los Angeles', 'CA', '90001', '8AM-10PM');


INSERT INTO CUSTOMER (CUSTOMER_ID, NAME, EMAIL, PHONE, ADDRESS, GENDER)
VALUES (1, 'Alice Johnson', 'alice@example.com', '555-1234', '12 Main St, New York, NY', 'F'),
(2, 'Bob Smith', 'bob@example.com', '555-5678', '98 Sunset Blvd, Los Angeles, CA', 'M'),
(3, 'Charlie Brown', 'charlie@example.com', '555-2468', '75 Elm St, New York, NY', 'M');


INSERT INTO TRANSACTION (TRANSACTION_ID, CUSTOMER_ID, STORE_ID, TRANSACTION_DATE)
VALUES (1, 1, 1, TO_DATE('2025-01-05','YYYY-MM-DD')),
(2, 2, 1, TO_DATE('2025-01-06','YYYY-MM-DD')),
(3, 3, 2, TO_DATE('2025-02-10','YYYY-MM-DD')),
(4, 1, 2, TO_DATE('2025-03-12','YYYY-MM-DD')),
(5, 2, 1, TO_DATE('2025-04-01','YYYY-MM-DD'));


INSERT INTO TRANSACTION_ITEM (TRANSACTION_ID, PRODUCT_ID, QUANTITY, PRICE)
VALUES (1, 1, 2, 1.50),
(1, 4, 1, 2.00),
(2, 2, 3, 1.60),
(3, 3, 4, 1.70),
(3, 4, 2, 2.00),
(4, 1, 1, 1.50),
(4, 3, 2, 1.70),
(5, 2, 2, 1.60),
(5, 4, 3, 2.00);
