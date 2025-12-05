import React from 'react';
import './App.css';

// --- Mock Data (Based on thw SQL queries) ---

// 1. Top 20 selling products at each store
const topProductsByStore = [
  { store_name: 'SuperMart Downtown (NY)', product_name: 'Lay\'s Classic Chips 100g', total_sold: 350 },
  { store_name: 'SuperMart Downtown (NY)', product_name: 'Coca-Cola 500ml', total_sold: 320 },
  { store_name: 'SuperMart Downtown (NY)', product_name: 'Pepsi 500ml', total_sold: 280 },
  { store_name: 'City Grocery (CA)', product_name: 'Diet Pepsi 500ml', total_sold: 410 },
  { store_name: 'City Grocery (CA)', product_name: 'Coca-Cola 500ml', total_sold: 395 },
];

// 2. Top 20 selling products in each state
const topProductsByState = [
  { state: 'NY', product_name: 'Lay\'s Classic Chips 100g', total_sold: 890 },
  { state: 'NY', product_name: 'Coca-Cola 500ml', total_sold: 750 },
  { state: 'CA', product_name: 'Diet Pepsi 500ml', total_sold: 1100 },
  { state: 'CA', product_name: 'Coca-Cola 500ml', total_sold: 950 },
];

// 3. Top 5 stores with the most sales so far this year
const topStoresBySales = [
  { store_name: 'City Grocery (CA)', total_sales: 125430.50 },
  { store_name: 'SuperMart Downtown (NY)', total_sales: 98760.75 },
  { store_name: 'Westside Market (CA)', total_sales: 85210.00 },
  { store_name: 'East End Grocers (NY)', total_sales: 76543.20 },
  { store_name: 'Central Foods (TX)', total_sales: 65432.10 },
];

// 4. In how many stores does Coke outsell Pepsi?
const cokeVsPepsiStoresCount = 8;

// 5. Top 3 types of product that customers buy in addition to milk
const productsBoughtWithMilk = [
    { product_type: 'Snack', product_count: 124 },
    { product_type: 'Cereal', product_count: 98 },
    { product_type: 'Juice', product_count: 76 },
];


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Retailer Database Analytics 📊</h1>
        <p>Displaying query results from the Retailer Database project.</p>
      </header>
      
      <main className="dashboard">
        
        {/* Query 1 Result */}
        <div className="card">
          <h2>Top Selling Products per Store</h2>
          <table>
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Product Name</th>
                <th>Total Units Sold</th>
              </tr>
            </thead>
            <tbody>
              {topProductsByStore.map((item, index) => (
                <tr key={index}>
                  <td>{item.store_name}</td>
                  <td>{item.product_name}</td>
                  <td>{item.total_sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Query 2 Result */}
        <div className="card">
          <h2>Top Selling Products per State</h2>
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>Product Name</th>
                <th>Total Units Sold</th>
              </tr>
            </thead>
            <tbody>
              {topProductsByState.map((item, index) => (
                <tr key={index}>
                  <td>{item.state}</td>
                  <td>{item.product_name}</td>
                  <td>{item.total_sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Query 3 Result */}
        <div className="card">
          <h2>Top 5 Stores by Sales This Year</h2>
           <table>
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Total Sales ($)</th>
              </tr>
            </thead>
            <tbody>
              {topStoresBySales.map((item, index) => (
                <tr key={index}>
                  <td>{item.store_name}</td>
                  <td>{item.total_sales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="small-cards-container">
            {/* Query 4 Result */}
            <div className="card small-card">
              <h2>Coke vs. Pepsi 🥤</h2>
              <p className="metric">{cokeVsPepsiStoresCount}</p>
              <p>stores where Coke outsold Pepsi.</p>
            </div>

            {/* Query 5 Result */}
            <div className="card small-card">
              <h2>Frequently Bought with Milk 🥛</h2>
              <ol>
                {productsBoughtWithMilk.map((item, index) => (
                  <li key={index}>
                    {item.product_type} <span>({item.product_count} times)</span>
                  </li>
                ))}
              </ol>
            </div>
        </div>

      </main>
    </div>
  );
}

export default App;