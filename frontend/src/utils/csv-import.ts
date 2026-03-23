import Papa from 'papaparse';
import { InventoryBatchItemSchema } from 'tiny-inventory-shared';
import type { InventoryBatchItem } from 'tiny-inventory-shared';

export interface ParsedRow {
  rowNumber: number;
  raw: Record<string, string>;
  parsed: InventoryBatchItem | null;
  error: string | null;
}

export interface CsvParseResult {
  rows: ParsedRow[];
  headerError: string | null;
  validCount: number;
  errorCount: number;
}

const REQUIRED_HEADERS = ['store_name', 'sku', 'quantity'] as const;

export function parseInventoryCsv(file: File): Promise<CsvParseResult> {
  return new Promise((resolve) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: (h) => h.trim().toLowerCase(),
      complete: (results) => {
        const headers = results.meta.fields ?? [];
        const missing = REQUIRED_HEADERS.filter((h) => !headers.includes(h));
        if (missing.length > 0) {
          resolve({
            rows: [],
            headerError: `Missing required columns: ${missing.join(', ')}. Expected: store_name, sku, quantity`,
            validCount: 0,
            errorCount: 0,
          });
          return;
        }

        const rows: ParsedRow[] = [];
        let validCount = 0;
        let errorCount = 0;

        for (let i = 0; i < results.data.length; i++) {
          const raw = results.data[i];
          const rowNumber = i + 2; // row 1 is header, data is 0-indexed

          const candidate = {
            storeName: (raw['store_name'] ?? '').trim(),
            sku: (raw['sku'] ?? '').trim(),
            quantity: Number(raw['quantity']),
          };

          const result = InventoryBatchItemSchema.safeParse(candidate);
          if (result.success) {
            rows.push({ rowNumber, raw, parsed: result.data, error: null });
            validCount++;
          } else {
            const msg = result.error.issues.map((issue) => issue.message).join('; ');
            rows.push({ rowNumber, raw, parsed: null, error: msg });
            errorCount++;
          }
        }

        resolve({ rows, headerError: null, validCount, errorCount });
      },
      error: (err) => {
        resolve({
          rows: [],
          headerError: `Failed to parse CSV: ${err.message}`,
          validCount: 0,
          errorCount: 0,
        });
      },
    });
  });
}
