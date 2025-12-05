SELECT *
FROM (
  SELECT 
    s.store_id,
    s.name AS store_name,
    p.product_id,
    p.name AS product_name,
    SUM(ti.quantity) AS total_sold,
    RANK() OVER (PARTITION BY s.store_id ORDER BY SUM(ti.quantity) DESC) AS rnk
  FROM transaction_item ti
  JOIN transaction t ON ti.transaction_id = t.transaction_id
  JOIN product p ON ti.product_id = p.product_id
  JOIN store s ON t.store_id = s.store_id
  GROUP BY s.store_id, s.name, p.product_id, p.name
)
WHERE rnk <= 20
ORDER BY store_id, rnk;


SELECT *
FROM (
  SELECT 
    st.state,
    p.product_id,
    p.name AS product_name,
    SUM(ti.quantity) AS total_sold,
    RANK() OVER (PARTITION BY st.state ORDER BY SUM(ti.quantity) DESC) AS rnk
  FROM transaction_item ti
  JOIN transaction t ON ti.transaction_id = t.transaction_id
  JOIN product p ON ti.product_id = p.product_id
  JOIN store st ON t.store_id = st.store_id
  GROUP BY st.state, p.product_id, p.name
)
WHERE rnk <= 20
ORDER BY state, rnk;


SELECT 
  s.store_id,
  s.name AS store_name,
  SUM(ti.quantity * ti.price) AS total_sales
FROM transaction_item ti
JOIN transaction t ON ti.transaction_id = t.transaction_id
JOIN store s ON t.store_id = s.store_id
WHERE EXTRACT(YEAR FROM t.transaction_date) = EXTRACT(YEAR FROM SYSDATE)
GROUP BY s.store_id, s.name
ORDER BY total_sales DESC
LIMIT 5;

SELECT COUNT(*) AS num_stores_coke_outsells_pepsi
FROM (
  SELECT 
    s.store_id,
    SUM(CASE WHEN b.name = 'Coca-Cola' THEN ti.quantity ELSE 0 END) AS coke_sold,
    SUM(CASE WHEN b.name = 'Pepsi' THEN ti.quantity ELSE 0 END) AS pepsi_sold
  FROM transaction_item ti
  JOIN transaction t ON ti.transaction_id = t.transaction_id
  JOIN product p ON ti.product_id = p.product_id
  JOIN brand b ON p.brand_id = b.brand_id
  JOIN store s ON t.store_id = s.store_id
  GROUP BY s.store_id
)
WHERE coke_sold > pepsi_sold;


SELECT *
FROM (
  SELECT 
    pt.name AS product_type,
    COUNT(DISTINCT ti2.product_id) AS product_count
  FROM transaction_item ti1
  JOIN transaction_item ti2 
    ON ti1.transaction_id = ti2.transaction_id 
   AND ti2.product_id <> ti1.product_id
  JOIN product p1 ON ti1.product_id = p1.product_id
  JOIN product p2 ON ti2.product_id = p2.product_id
  JOIN product_type pt ON p2.product_type_id = pt.product_type_id
  WHERE LOWER(p1.name) LIKE '%milk%'
  GROUP BY pt.name
  ORDER BY product_count DESC
)
WHERE ROWNUM <= 3;





