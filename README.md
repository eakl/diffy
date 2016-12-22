JSON Diffing Algorithm
======================

### Arrays

1. If an array is a Set (of unique **primitives**), transform it into a hashTable and compare keys
2. If an array is not a Set (contains **primitives** duplicates ):
  - Trim it (common head and tail)
  - Test for singular Insertion / Deletion
  - If it doesn't solve the problem, test for TwoEdits
  - If it doesn't solve the problem, apply the LCS algorithm


https://neil.fraser.name/writing/diff/
