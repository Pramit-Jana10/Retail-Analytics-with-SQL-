const express = require('express');
const pool = require('../config/db'); // Import the database connection pool

const router = express.Router();

const handleError = (res, error, message) => {
    console.error(`Error executing query: ${message}`);
    console.error('Full error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: message, details: error.message });
};

// 1. Get top 20 selling products at each store
router.get('/top-products-by-store', async (req, res) => {
    try {
        const query = `
            SELECT * FROM (
                SELECT 
                    s.name AS store_name,
                    p.name AS product_name,
                    SUM(ti.quantity) AS total_sold,
                    RANK() OVER (PARTITION BY s.store_id ORDER BY SUM(ti.quantity) DESC) AS rnk
                FROM transaction_item ti
                JOIN "TRANSACTION" t ON ti.transaction_id = t.transaction_id
                JOIN product p ON ti.product_id = p.product_id
                JOIN store s ON t.store_id = s.store_id
                GROUP BY s.store_id, s.name, p.product_id, p.name
            ) ranked_products
            WHERE rnk <= 20
            ORDER BY store_name, rnk;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        handleError(res, error, 'Failed to get top products by store.');
    }
});

// 2. Get top 20 selling products in each state
router.get('/top-products-by-state', async (req, res) => {
    try {
        const query = `
            SELECT * FROM (
                SELECT 
                    st.state,
                    p.name AS product_name,
                    SUM(ti.quantity) AS total_sold,
                    RANK() OVER (PARTITION BY st.state ORDER BY SUM(ti.quantity) DESC) AS rnk
                FROM transaction_item ti
                JOIN "TRANSACTION" t ON ti.transaction_id = t.transaction_id
                JOIN product p ON ti.product_id = p.product_id
                JOIN store st ON t.store_id = st.store_id
                GROUP BY st.state, p.product_id, p.name
            ) ranked_products
            WHERE rnk <= 20
            ORDER BY state, rnk;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        handleError(res, error, 'Failed to get top products by state.');
    }
});

// 3. Get top 5 stores with the most sales this year
router.get('/top-stores-by-sales', async (req, res) => {
    try {
        // Note: Using PostgreSQL EXTRACT function for date operations
        const query = `
            SELECT 
                s.name AS store_name,
                SUM(ti.quantity * ti.price) AS total_sales
            FROM transaction_item ti
            JOIN "TRANSACTION" t ON ti.transaction_id = t.transaction_id
            JOIN store s ON t.store_id = s.store_id
            WHERE EXTRACT(YEAR FROM t.transaction_date) = EXTRACT(YEAR FROM CURRENT_DATE)
            GROUP BY s.store_id, s.name
            ORDER BY total_sales DESC
            LIMIT 5;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        handleError(res, error, 'Failed to get top stores by sales.');
    }
});

// 4. Get the number of stores where Coke outsells Pepsi
router.get('/coke-vs-pepsi', async (req, res) => {
    try {
        const query = `
            SELECT COUNT(*) AS num_stores_coke_outsells_pepsi
            FROM (
                SELECT 
                    s.store_id,
                    SUM(CASE WHEN b.name = 'Coca-Cola' THEN ti.quantity ELSE 0 END) AS coke_sold,
                    SUM(CASE WHEN b.name = 'Pepsi' THEN ti.quantity ELSE 0 END) AS pepsi_sold
                FROM transaction_item ti
                JOIN "TRANSACTION" t ON ti.transaction_id = t.transaction_id
                JOIN product p ON ti.product_id = p.product_id
                JOIN brand b ON p.brand_id = b.brand_id
                JOIN store s ON t.store_id = s.store_id
                GROUP BY s.store_id
            ) sales_comparison
            WHERE coke_sold > pepsi_sold;
        `;
        const result = await pool.query(query);
        res.json(result.rows[0]); // Return the single result object
    } catch (error) {
        handleError(res, error, 'Failed to compare Coke vs. Pepsi sales.');
    }
});

// 5. Get top 3 products bought with milk
router.get('/bought-with-milk', async (req, res) => {
    try {
        const query = `
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
            LIMIT 3;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        handleError(res, error, 'Failed to get products bought with milk.');
    }
});

// 6. Test all database tables and data
router.get('/test-data', async (req, res) => {
    try {
        const queries = {
            product_types: 'SELECT * FROM product_type ORDER BY product_type_id',
            brands: 'SELECT * FROM brand ORDER BY brand_id',
            vendors: 'SELECT * FROM vendor ORDER BY vendor_id',
            products: 'SELECT * FROM product ORDER BY product_id',
            stores: 'SELECT * FROM store ORDER BY store_id',
            customers: 'SELECT * FROM customer ORDER BY customer_id',
            transactions: 'SELECT * FROM "TRANSACTION" ORDER BY transaction_id',
            transaction_items: 'SELECT * FROM transaction_item ORDER BY transaction_id, product_id'
        };

        const results = {};
        for (const [key, query] of Object.entries(queries)) {
            const result = await pool.query(query);
            results[key] = result.rows;
        }

        res.json(results);
    } catch (error) {
        handleError(res, error, 'Failed to get test data.');
    }
});


module.exports = router;