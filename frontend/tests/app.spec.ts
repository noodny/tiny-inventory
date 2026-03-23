import { test, expect } from '@playwright/test';

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
    await expect(page.getByRole('heading', { name: 'Inventory' })).toBeVisible();

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
    await page.getByLabel('Category').fill('Testing');
    await page.getByLabel('Price').fill('9.99');
    await page.getByRole('button', { name: /^create$/i }).click();

    await expect(page.getByText('E2E-TEST-001')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Inventory', () => {
  test('shows inventory page with filter controls', async ({ page }) => {
    await page.goto('/#inventory');
    await expect(page.getByRole('heading', { name: 'Inventory' })).toBeVisible();
    await expect(page.getByLabel('Category')).toBeVisible();
    await expect(page.getByLabel('Min Price')).toBeVisible();
    await expect(page.getByLabel('Max Price')).toBeVisible();
  });
});
