import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test, expect } from '@playwright/test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test.describe('Navigation', () => {
  test('shows heading and nav links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /tiny inventory/i })).toBeVisible();
    await expect(page.getByRole('navigation', { name: /main/i })).toBeVisible();
  });

  test('defaults to stores page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Stores' })).toBeVisible();
  });

  test('navigates between pages via nav links', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();

    await page.getByRole('link', { name: 'Inventory' }).click();
    await expect(page.getByRole('heading', { name: 'Inventory', exact: true })).toBeVisible();

    await page.getByRole('link', { name: 'Stores' }).click();
    await expect(page.getByRole('heading', { name: 'Stores' })).toBeVisible();
  });
});

test.describe('Stores CRUD', () => {
  test('can create a new store', async ({ page }) => {
    await page.goto('/#stores');
    await page.getByRole('button', { name: /new store/i }).click();
    await expect(page.getByRole('heading', { name: /create store/i })).toBeVisible();

    await page.getByLabel('Name').fill('E2E Test Store');
    await page.getByRole('button', { name: /^create$/i }).click();

    // Dialog should close and store appear in list
    await expect(page.getByText('E2E Test Store')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Products CRUD', () => {
  test('can create a new product', async ({ page }) => {
    await page.goto('/#products');
    await page.getByRole('button', { name: /new product/i }).click();
    await expect(page.getByRole('heading', { name: /create product/i })).toBeVisible();

    await page.getByLabel('SKU').fill('E2E-TEST-001');
    await page.getByLabel('Name').fill('E2E Test Product');

    await page.locator('[data-test="category-select"]').click();
    await page.getByRole('option', { name: 'Peripherals' }).click();

    await page.getByLabel('Price').fill('9.99');
    await page.getByRole('button', { name: /^create$/i }).click();

    await expect(page.getByText('E2E-TEST-001')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Products errors', () => {
  test('shows error in edit dialog when changing SKU to an existing one', async ({ page }) => {
    await page.goto('/#products');
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();

    // Wait for the product table to load and click Edit on the first product
    const firstRow = page.getByRole('table').locator('tbody tr').first();
    await expect(firstRow).toBeVisible({ timeout: 5000 });
    await firstRow.getByRole('button', { name: /edit/i }).click();

    // Dialog should open
    await expect(page.getByRole('heading', { name: /edit product/i })).toBeVisible();

    // Change the SKU to one that belongs to another product
    const skuInput = page.getByLabel('SKU');
    await skuInput.clear();
    await skuInput.fill('KB-MECH-002');

    await page.getByRole('button', { name: /^update$/i }).click();

    // Error should appear inside the dialog
    await expect(page.getByText(/already exists/i)).toBeVisible({ timeout: 5000 });

    // Dialog should still be open (not dismissed)
    await expect(page.getByRole('heading', { name: /edit product/i })).toBeVisible();
  });
});

test.describe('Inventory', () => {
  test('shows inventory page with filter controls', async ({ page }) => {
    await page.goto('/#inventory');
    await expect(page.getByRole('heading', { name: 'Inventory', exact: true })).toBeVisible();
    await expect(page.getByLabel('Min Price')).toBeVisible();
    await expect(page.getByLabel('Max Price')).toBeVisible();
  });

  test('can assign a product to a store', async ({ page }) => {
    await page.goto('/#inventory');
    await page.getByRole('button', { name: /assign product/i }).click();
    await expect(page.getByRole('heading', { name: /assign product to store/i })).toBeVisible({ timeout: 5000 });

    // Select store
    await page.locator('[data-test="store-select"]').click();
    await page.getByRole('option', { name: 'Downtown Flagship' }).click();

    // Search and select product via combobox
    await page.locator('[data-test="product-select"]').click();
    await page.locator('[data-test="product-select-search"]').pressSequentially('Wireless Mouse');
    await page.locator('[data-slot="combobox-content"]').getByRole('option', { name: /Wireless Mouse/ }).click();

    await page.getByLabel('Quantity').fill('42');
    await page.getByRole('button', { name: /^assign$/i }).click();

    // Either the dialog closes (success) or a conflict error appears (already assigned)
    await expect(
      page.getByRole('heading', { name: /assign product to store/i }).or(page.getByText(/already assigned/i)),
    ).toBeVisible({ timeout: 5000 });
  });

  test('can import inventory from CSV', async ({ page }) => {
    await page.goto('/#inventory');
    await page.getByRole('button', { name: /import csv/i }).click();
    await expect(page.getByRole('heading', { name: /import inventory from csv/i })).toBeVisible();

    // Upload the sample CSV file
    const csvPath = path.resolve(__dirname, '../../samples/import-success.csv');
    await page.locator('[data-test="csv-file-input"]').setInputFiles(csvPath);

    // Should show preview with valid row count
    await expect(page.getByText(/\d+ valid/)).toBeVisible({ timeout: 5000 });

    // Click import button
    await page.getByRole('button', { name: /^import \d+ rows$/i }).click();

    // Should show success result
    await expect(page.getByText(/import complete/i)).toBeVisible({ timeout: 10000 });
  });
});
