-- Delete all blogs in GADGETS category
DELETE FROM blogs WHERE category = 'GADGETS';

-- Update any references to GADGETS category
UPDATE blogs 
SET category = 'TECH' 
WHERE category = 'GADGETS';