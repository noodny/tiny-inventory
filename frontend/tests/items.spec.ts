import { test, expect } from '@playwright/test';

test.describe('Tiny Inventory — E2E', () => {
  test('home page shows the heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /tiny inventory/i })).toBeVisible();
  });

  test('shows the Add Item form', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('form', { name: /add item/i })).toBeVisible();
  });

  test('displays items table when items exist', async ({ page }) => {
    await page.goto('/');
    // Wait for either the table or the "No items" message
    await page.waitForSelector('table, [data-testid="empty-state"], p:text("No items")');
  });
});
