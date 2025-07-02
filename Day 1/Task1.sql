-- Step 1: Create the Clients Table
CREATE TABLE clients (
   client_id SERIAL PRIMARY KEY,
   first_name VARCHAR(100) NOT NULL,
   last_name VARCHAR(100) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMPTZ,
   is_active BOOLEAN DEFAULT true
);

-- Step 2: Select All Clients
SELECT * FROM clients;

-- Step 3: Drop the Clients Table If Exists
DROP TABLE IF EXISTS clients;

-- Step 4: Add a New Column
ALTER TABLE clients ADD COLUMN phone_number VARCHAR(15);

-- Step 5: Drop the Newly Added Column
ALTER TABLE clients DROP COLUMN phone_number;

-- Step 6: Rename Columns
ALTER TABLE clients RENAME COLUMN email TO email_id;
ALTER TABLE clients RENAME COLUMN email_id TO email;

-- Step 7: Rename Table
ALTER TABLE clients RENAME TO customers;
ALTER TABLE customers RENAME TO clients;

-- Step 8: Create Purchases Table
CREATE TABLE purchases (
    purchase_id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(client_id),
    purchase_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    purchase_code VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL
);

-- Step 9: Insert a Single Record in Clients
INSERT INTO clients(first_name, last_name, email, created_at, updated_at, is_active)
VALUES ('Parthiv', 'Chudasama', 'parthivchudasama5@gmail.com', NOW(), NULL, true);

-- Step 10: Insert Multiple Clients
INSERT INTO clients (first_name, last_name, email, created_at, updated_at, is_active) VALUES
  ('Anjali', 'Mehta', 'anjali.mehta@example.com', NOW(), NULL, true),
  ('Vikas', 'Gupta', 'vikas.gupta@example.com', NOW(), NULL, true),
  ('Neha', 'Singh', 'neha.singh@example.com', NOW(), NULL, true),
  ('Karan', 'Kumar', 'karan.kumar@example.com', NOW(), NULL, false),
  ('Divya', 'Rai', 'divya.rai@example.com', NOW(), NULL, true),
  ('Arjun', 'Verma', 'arjun.verma@example.com', NOW(), NULL, false);

-- Step 11: Insert Purchases
INSERT INTO purchases (client_id, purchase_date, purchase_code, amount) VALUES
  (1, '2024-01-01', 'PC001', 120.00),
  (2, '2024-01-01', 'PC002', 95.75),
  (3, '2024-01-01', 'PC003', 60.00),
  (1, '2024-01-02', 'PC004', 150.50),
  (1, '2024-01-04', 'PC005', 200.00),
  (2, '2024-01-05', 'PC006', 85.00),
  (4, '2024-01-06', 'PC007', 40.25);

-- Step 12: Basic Select Queries
SELECT first_name FROM clients;
SELECT first_name, last_name, email FROM clients;
SELECT * FROM clients;

-- Step 13: Order By Queries  
SELECT first_name, last_name FROM clients ORDER BY first_name ASC;
SELECT first_name, last_name FROM clients ORDER BY last_name DESC;
SELECT client_id, first_name, last_name FROM clients ORDER BY first_name ASC, last_name DESC;

-- Step 14: WHERE Clause Examples
SELECT first_name, last_name FROM clients WHERE first_name = 'Neha';
SELECT client_id, first_name FROM clients WHERE first_name IN ('Ravi', 'Anjali', 'Arjun');
SELECT first_name, last_name FROM clients WHERE first_name ILIKE '%VI%';

-- Step 15: Join Examples
SELECT * FROM purchases p INNER JOIN clients c ON p.client_id = c.client_id;
SELECT * FROM clients c LEFT JOIN purchases p ON c.client_id = p.client_id;

-- Step 16: Aggregation with GROUP BY
SELECT c.client_id, c.first_name, c.last_name, c.email,
       COUNT(p.purchase_id) AS total_orders,
       SUM(p.amount) AS total_spent
FROM clients c
INNER JOIN purchases p ON c.client_id = p.client_id
GROUP BY c.client_id;

-- Step 17: GROUP BY with HAVING
SELECT c.client_id, c.first_name, c.last_name, c.email,
       COUNT(p.purchase_id) AS total_orders,
       SUM(p.amount) AS total_spent
FROM clients c
INNER JOIN purchases p ON c.client_id = p.client_id
GROUP BY c.client_id
HAVING COUNT(p.purchase_id) > 2;

-- Step 18: Subqueries
-- Subquery with IN
SELECT * FROM purchases WHERE client_id IN (
  SELECT client_id FROM clients WHERE is_active = true
);

-- Subquery with EXISTS
SELECT client_id, first_name, last_name
FROM clients
WHERE EXISTS (
  SELECT 1 FROM purchases WHERE purchases.client_id = clients.client_id
);

-- Step 19: Update Statement
UPDATE clients
SET first_name = 'Ravindra', email = 'ravindra.sharma@example.com'
WHERE client_id = 1;

-- Step 20: Delete Statement
DELETE FROM clients WHERE client_id = 6;
