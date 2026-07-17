import { test, expect } from "@playwright/test"

test("should navigate to dashboard after login", async ({ page }) => {
  await page.goto("http://localhost:3000/login")

  await page.fill('input[name="email"]', "test@example.com")
  await page.fill('input[name="password"]', "password123")
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL("http://localhost:3000/dashboard")
})

test("should create a new resource", async ({ page }) => {
  await page.goto("http://localhost:3000/login")
  await page.fill('input[name="email"]', "test@example.com")
  await page.fill('input[name="password"]', "password123")
  await page.click('button[type="submit"]')

  await page.click("text=Nouvelle ressource")
  await page.fill('input[name="title"]', "Test Resource")
  await page.fill('textarea[name="content"]', "Test Content")
  await page.click('button[type="submit"]')

  await expect(page).toHaveURL("http://localhost:3000/dashboard")
})

test("should delete a resource", async ({ page }) => {
  await page.goto("http://localhost:3000/login")
  await page.fill('input[name="email"]', "test@example.com")
  await page.fill('input[name="password"]', "password123")
  await page.click('button[type="submit"]')

  await page.click("text=Supprimer")
  page.on("dialog", (dialog) => dialog.accept())

  await expect(page).toHaveURL("http://localhost:3000/dashboard")
})
