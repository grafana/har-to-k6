import { browser } from 'k6/browser'
import { check } from 'k6'

// Read the standalone.js file in init context
// Path is relative to where k6 is run from (project root)
const standaloneJs = open('../../dist/standalone.js')

// Sample HAR for testing
const sampleHAR = {
  log: {
    entries: [
      {
        request: {
          method: 'GET',
          url: 'https://quickpizza.grafana.com/',
        },
      },
      {
        request: {
          method: 'POST',
          url: 'ttps://quickpizza.grafana.com/api/pizza/',
          headers: [
            {
              name: 'Content-Type',
              value: 'application/json',
            },
          ],
          postData: {
            mimeType: 'application/json',
            text:
              '{"maxCaloriesPerSlice":1000,"mustBeVegetarian":false,"excludedIngredients":[],"excludedTools":[],"maxNumberOfToppings":5,"minNumberOfToppings":2,"customName":""}',
          },
        },
      },
    ],
  },
}

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
      iterations: 1,
    },
  },
}

export default async function () {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('about:blank', { waitUntil: 'load' })

  // Inject standalone.js into the page
  await page.evaluate(standaloneJsCode => {
    // Create a script element and inject the code
    const script = document.createElement('script')
    script.textContent = standaloneJsCode
    document.head.appendChild(script)
  }, standaloneJs)

  // Wait for harToK6 to be available (with timeout)
  try {
    await page.waitForFunction(() => typeof window.harToK6 !== 'undefined', {
      timeout: 5000,
    })
  } catch (error) {
    throw new Error('harToK6 library failed to load: ' + error.message)
  }

  // // Test that harToK6 is available
  const harToK6Available = await page.evaluate(() => {
    return typeof window.harToK6 !== 'undefined'
  })

  check(harToK6Available, {
    'harToK6 library is loaded': val => val === true,
  })

  // Test that liHARToK6Script function exists
  const functionExists = await page.evaluate(() => {
    return (
      typeof window.harToK6 !== 'undefined' &&
      typeof window.harToK6.liHARToK6Script === 'function'
    )
  })

  check(functionExists, {
    'liHARToK6Script function is available': val => val === true,
  })

  // Test invoking the function with sample HAR
  const result = await page.evaluate(async har => {
    if (
      typeof window.harToK6 === 'undefined' ||
      typeof window.harToK6.liHARToK6Script !== 'function'
    ) {
      return { error: 'Function not available' }
    }
    try {
      const result = await window.harToK6.liHARToK6Script(har)
      return { success: true, main: result.main }
    } catch (error) {
      return { error: error.message }
    }
  }, sampleHAR)

  check(result, {
    'liHARToK6Script executed successfully': val => val.success === true,
    'liHARToK6Script returned main script': val =>
      val.success === true &&
      typeof val.main === 'string' &&
      val.main.length > 0,
    'generated script contains expected imports': val =>
      val.success === true && val.main.includes('import'),
    'generated script contains expected function': val =>
      val.success === true && val.main.includes('export default function'),
  })

  await page.close()
  await context.close()
}
