/**
 * TODO/ outdated script with vitest migration
 **/

import type { Meta } from '@storybook/react'
import { composeStories } from '@storybook/react'
import { renderWithTheme } from '@utils/test'
import fs from 'fs'
import { toHaveNoViolations } from 'jest-axe'
import { axe } from 'vitest-axe'
import * as path from 'path'
import * as process from 'process'
import type { JSX } from 'react'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'

const testedComponents = [
  'Alert',
  'Avatar',
  'Loader',
  'Badge',
  'Bullet',
  'Button',
  'Carousel',
  'Checkbox',
  'MarkDown',
  'Skeleton',
  'Separator',
  'Stack',
  'Status',
  'Stepper',
  'Switch',
  'SelectableCard',
  'StepList',
  'Toaster',
  'Tag',
  'TagInput',
  'TextInput',
  'Tooltip',
  'Radio',
  'VerificationCode',
  'DatInput',
  'NumberInput',
  'Toggle',
  'Snippet',
  'SwitchButton',
]

const foundFiles: string[] = []

const searchFileFromDir = (
  startPath: string,
  filter: string,
  exclude?: string[],
) => {
  const files = fs.readdirSync(startPath)

  for (const fileName of files) {
    const filePath = path.join(startPath, fileName)
    const stat = fs.lstatSync(filePath)

    if (stat.isDirectory()) {
      // recursive search in case if directory
      searchFileFromDir(filePath, filter, exclude)
    } else if (
      filePath.includes(filter) &&
      !exclude?.find(e => filePath.includes(e))
    ) {
      const isTested = testedComponents.some(component =>
        filePath.match(`^packages/ui/src/components/${component}/`),
      )

      if (isTested) {
        foundFiles.push(filePath.replace('packages/ui/src/', '../'))
      }
    }
  }
}
// Check if a path was given as input argument, if not we check all stories
if (process.argv[4]) {
  searchFileFromDir(process.argv[4], '.stories.tsx', ['index', 'Template'])
} else {
  searchFileFromDir('packages/ui/src/components', '.stories.tsx', [
    'index',
    'Template',
  ])
}

expect.extend(toHaveNoViolations)

describe(
  'A11y',
  () => {
    beforeEach(() => {
      console.log = jest.fn()
      console.warn = jest.fn()
      console.error = jest.fn()
    })

    const moduleArray: Promise<{
      default: Meta
      __esModule?: boolean
    }>[] = []

    beforeAll(async () => {
      for await (const file of foundFiles) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        moduleArray.push(await import(file))
      }
    })

    foundFiles.forEach((file, index) => {
      describe(`${file.split('/')[2]}`, () =>
        test(file.split('/')[4].split('.')[0], async () => {
          const module = {
            // @ts-expect-error grab the first named export and pretend that module is a default export
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            default: (await moduleArray[index])[0],
          }
          const components = composeStories(module)

          for await (const componentName of Object.keys(components)) {
            if (componentName !== 'default') {
              const ComponentToRender = components[
                componentName
              ] as () => JSX.Element
              const { container } = renderWithTheme(<ComponentToRender />)

              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const results = await axe(container)
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              expect(results).toHaveNoViolations()
            }
          }
        }))
    })
  },
  {
    timeout: 120000,
  },
)