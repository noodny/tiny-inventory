import { describe, it, expect } from 'vitest';
import { parseInventoryCsv } from '../utils/csv-import';

function makeFile(content: string, name = 'test.csv'): File {
  return new File([content], name, { type: 'text/csv' });
}

describe('parseInventoryCsv', () => {
  it('parses valid CSV with 3 rows', async () => {
    const csv = `store_name,sku,quantity
Downtown Store,KB-001,50
Airport Kiosk,HUB-007,25
Mall Outlet,CAM-HD-1080,0`;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.headerError).toBeNull();
    expect(result.validCount).toBe(3);
    expect(result.errorCount).toBe(0);
    expect(result.rows).toHaveLength(3);
    expect(result.rows[0].parsed).toEqual({ storeName: 'Downtown Store', sku: 'KB-001', quantity: 50 });
    expect(result.rows[2].parsed).toEqual({ storeName: 'Mall Outlet', sku: 'CAM-HD-1080', quantity: 0 });
  });

  it('reports missing required columns', async () => {
    const csv = `name,quantity
Store,50`;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.headerError).toContain('store_name');
    expect(result.headerError).toContain('sku');
    expect(result.rows).toHaveLength(0);
  });

  it('reports error for non-numeric quantity', async () => {
    const csv = `store_name,sku,quantity
Store,KB-001,abc`;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.validCount).toBe(0);
    expect(result.errorCount).toBe(1);
    expect(result.rows[0].error).toBeTruthy();
  });

  it('reports error for negative quantity', async () => {
    const csv = `store_name,sku,quantity
Store,KB-001,-5`;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.errorCount).toBe(1);
    expect(result.rows[0].error).toContain('>= 0');
  });

  it('reports error for empty store name', async () => {
    const csv = `store_name,sku,quantity
,KB-001,10`;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.errorCount).toBe(1);
    expect(result.rows[0].error).toBeTruthy();
  });

  it('trims whitespace from values', async () => {
    const csv = `store_name,sku,quantity
  Downtown Store  , KB-001 , 50 `;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.validCount).toBe(1);
    expect(result.rows[0].parsed?.storeName).toBe('Downtown Store');
    expect(result.rows[0].parsed?.sku).toBe('KB-001');
  });

  it('ignores extra columns', async () => {
    const csv = `store_name,sku,quantity,notes
Store,KB-001,50,some note`;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.validCount).toBe(1);
    expect(result.rows[0].parsed).toEqual({ storeName: 'Store', sku: 'KB-001', quantity: 50 });
  });

  it('skips empty rows', async () => {
    const csv = `store_name,sku,quantity
Store,KB-001,50

Store,HUB-007,25
`;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.validCount).toBe(2);
    expect(result.rows).toHaveLength(2);
  });

  it('handles case-insensitive headers', async () => {
    const csv = `Store_Name,SKU,Quantity
Store,KB-001,50`;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.headerError).toBeNull();
    expect(result.validCount).toBe(1);
  });

  it('returns empty result for file with only headers', async () => {
    const csv = `store_name,sku,quantity`;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.headerError).toBeNull();
    expect(result.validCount).toBe(0);
    expect(result.rows).toHaveLength(0);
  });

  it('handles mixed valid and invalid rows', async () => {
    const csv = `store_name,sku,quantity
Store,KB-001,50
,BAD-001,10
Store,HUB-007,-3
Store,CAM-001,25`;

    const result = await parseInventoryCsv(makeFile(csv));
    expect(result.validCount).toBe(2);
    expect(result.errorCount).toBe(2);
    expect(result.rows[0].error).toBeNull();
    expect(result.rows[1].error).toBeTruthy();
    expect(result.rows[2].error).toBeTruthy();
    expect(result.rows[3].error).toBeNull();
  });
});
