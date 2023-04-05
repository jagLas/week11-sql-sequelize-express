----------
-- Step 0 - Create a Query 
----------
-- Query: Select all cats that have a toy with an id of 5

    -- Your code here
    SELECT * FROM cats WHERE id IN (
        SELECT cat_id FROM cat_toys WHERE toy_id = 5
    );

-- Paste your results below (as a comment):

    --SEARCH TABLE cats USING INTEGER PRIMARY KEY (rowid=?)
        --LIST SUBQUERY 1
        --SCAN TABLE cat_toys


----------
-- Step 1 - Analyze the Query
----------
-- Query:

    -- Your code here
-- EXPLAIN QUERY PLAN
--     SELECT * FROM cats WHERE id IN (
--         SELECT cat_id FROM cat_toys WHERE toy_id = 5
--     );

-- Paste your results below (as a comment):

    --SEARCH TABLE cats USING INTEGER PRIMARY KEY (rowid=?)
        --LIST SUBQUERY 1
        --SCAN TABLE cat_toys

-- What do your results mean?

    -- Was this a SEARCH or SCAN?
    -- It uses both

    -- What does that mean?
        -- the scan is used to locate the records on the toy_id column
        -- an index is used to return the cat records by cat.id



----------
-- Step 2 - Time the Query to get a baseline
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here
    -- .timer on
    -- SELECT * FROM cats WHERE id IN (
    --     SELECT cat_id FROM cat_toys WHERE toy_id = 5
    -- );

-- Paste your results below (as a comment):
-- Run Time: real 0.001 user 0.000000 sys 0.000534



----------
-- Step 3 - Add an index and analyze how the query is executing
----------

-- Create index:

    -- Your code here
    -- CREATE INDEX idx_toy_id ON cat_toys (toy_id);

-- Analyze Query:
    -- Your code here
    -- EXPLAIN QUERY PLAN
--     SELECT * FROM cats WHERE id IN (
--         SELECT cat_id FROM cat_toys WHERE toy_id = 5
--     );

-- Paste your results below (as a comment):
    --SEARCH TABLE cats USING INTEGER PRIMARY KEY (rowid=?)
        --LIST SUBQUERY 1
        --SEARCH TABLE cat_toys USING INDEX idx_toy_id (toy_id=?)

-- Analyze Results:

    -- Is the new index being applied in this query?
    -- Yes, scan is no longer being used in the subquery, and instead a search is being executed




----------
-- Step 4 - Re-time the query using the new index
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here
    -- SELECT * FROM cats WHERE id IN (
    --     SELECT cat_id FROM cat_toys WHERE toy_id = 5
    -- );
-- Paste your results below (as a comment):
-- 31|Rodger|Lavender|Oregon Rex
-- 77|Jamal|Orange|Sam Sawet
-- 4002|Rachele|Maroon|Foldex Cat

-- Run Time: real 0.000 user 0.000000 sys 0.000127

-- Analyze Results:
    -- Are you still getting the correct query results?
        -- yes

    -- Did the execution time improve (decrease)?
        -- yes

    -- Do you see any other opportunities for making this query more efficient?
        -- no, as a subquery is alrady being utilized, and no other columns are being searched

---------------------------------
-- Notes From Further Exploration
---------------------------------