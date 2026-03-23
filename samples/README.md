# Sample CSV Files for Inventory Import

These files cross-reference the seed data. Run `npm run db:seed` first.

## import-success.csv
All 20 rows are valid. Uses real store names and product SKUs from seed data.
Mix of creates and updates across 5 active stores.

## import-errors.csv
Designed to trigger every error path:
- Row 2: `Nonexistent Store` — store not found
- Row 3: `FAKE-SKU-999` — product not found
- Row 4: `Tech District Pop-Up` — inactive store (deactivated in seed)
- Row 5: `SW-PASSMANAGER` — inactive product (deactivated in seed)
- Row 6: duplicate of row 1 (same store + SKU)
- Row 7: negative quantity (-10)
- Row 8: empty store name
- Row 9: empty SKU

**Expected**: rows 7-9 fail client-side validation (preview shows errors).
Rows 2-6 pass client-side but fail server-side validation (backend returns errors).
Row 1 is valid but won't import because the batch is all-or-nothing.

## import-mixed.csv
Mix of valid and invalid rows to test the all-or-nothing behavior.
Rows 3 and 5 have errors (unknown store, unknown SKU), so the entire batch is rejected.
