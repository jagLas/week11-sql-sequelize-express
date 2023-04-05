----------
-- Step 0 - Create a Query 
----------
-- Query: Find a count of `toys` records that have a price greater than
    -- 55 and belong to a cat that has the color "Olive".

    -- Your code here
-- SELECT COUNT(*) FROM toys
--     WHERE price > 55 AND id IN (
--         SELECT toy_id FROM cat_toys JOIN cats ON cats.id = cat_id
--             WHERE color = 'Olive'
--     ); 


-- Paste your results below (as a comment):

-- 212
-- readme indicates that it should be 215, but I would argue that is only true if you are
-- selecting a count of all toys, not toys records

-- The query they probably wanted was
-- SELECT COUNT(*) FROM cat_toys JOIN toys ON toy_id = toys.id
--     JOIN cats ON cats.id = cat_id
--     WHERE price > 55 AND cats.color = 'Olive';

-- which yields 215
-- or instead using subqueries

-- SELECT COUNT(*) FROM cat_toys 
--     WHERE cat_id IN (
--         SELECT id FROM cats WHERE color = 'Olive'
--     ) AND toy_id IN (
--         SELECT id FROM toys WHERE price > 55
--     );


----------
-- Step 1 - Analyze the Query
----------
-- Query:

    -- Your code here
-- EXPLAIN QUERY PLAN 
-- SELECT COUNT(*) FROM cat_toys 
--     WHERE cat_id IN (
--         SELECT id FROM cats WHERE color = 'Olive'
--     ) AND toy_id IN (
--         SELECT id FROM toys WHERE price > 55
--     );

-- Paste your results below (as a comment):
-- QUERY PLAN
    --SCAN TABLE cat_toys
        --LIST SUBQUERY 1
            --SCAN TABLE cats
        --LIST SUBQUERY 2
            --SCAN TABLE toys

-- What do your results mean?

    -- Was this a SEARCH or SCAN?
        -- this uses scan

    -- What does that mean?
    -- it means indexes can be used to improve efficiency




----------
-- Step 2 - Time the Query to get a baseline
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here

    -- SELECT COUNT(*) FROM cat_toys 
    -- WHERE cat_id IN (
    --     SELECT id FROM cats WHERE color = 'Olive'
    -- ) AND toy_id IN (
    --     SELECT id FROM toys WHERE price > 55
    -- );

-- Paste your results below (as a comment):
-- 215
-- Run Time: real 0.003 user 0.002993 sys 0.000000



----------
-- Step 3 - Add an index and analyze how the query is executing
----------

-- Create index:

    -- Your code here
    -- CREATE INDEX idx_cats_color ON cats (color);
    -- CREATE INDEX idx_toys_price ON toys (price);
    -- CREATE INDEX idx_cat_toys_cat_id_toy_id ON cat_toys (cat_id, toy_id);

-- Analyze Query:
    -- Your code here
    -- EXPLAIN QUERY PLAN
    -- SELECT COUNT(*) FROM cat_toys 
    -- WHERE cat_id IN (
    --     SELECT id FROM cats WHERE color = 'Olive'
    -- ) AND toy_id IN (
    --     SELECT id FROM toys WHERE price > 55
    -- );

-- Paste your results below (as a comment):

-- QUERY PLAN
-- |--SEARCH TABLE cat_toys USING COVERING INDEX idx_cat_toys_cat_id_toy_id (cat_id=? AND toy_id=?)
-- |--LIST SUBQUERY 1
-- |  `--SEARCH TABLE cats USING COVERING INDEX idx_cats_color (color=?)
-- `--LIST SUBQUERY 2
--    `--SEARCH TABLE toys USING COVERING INDEX idx_toys_price (price>?)

-- Analyze Results:

    -- Is the new index being applied in this query?
    -- yes, it is being used instead of the scans




----------
-- Step 4 - Re-time the query using the new index
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here

    SELECT COUNT(*) FROM cat_toys 
    WHERE cat_id IN (
        SELECT id FROM cats WHERE color = 'Olive'
    ) AND toy_id IN (
        SELECT id FROM toys WHERE price > 55
    );

-- Paste your results below (as a comment):
-- 215
-- Run Time: real 0.132 user 0.130969 sys 0.000414


-- Analyze Results:
    -- Are you still getting the correct query results?
    -- yes


    -- Did the execution time improve (decrease)?
    -- no, it decreased


    -- Do you see any other opportunities for making this query more efficient?
    -- removing indexes may respeed up performance


---------------------------------
-- Notes From Further Exploration
---------------------------------
