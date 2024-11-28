// oxlint-disable eslint/no-console

import { promises as fs } from 'node:fs'
import path from 'node:path'

const COMPONENTS = [
  {
    name: 'System Icons',
    suffix: 'Icon',
    input: 'packages/icons/src/components/Icon/assets',
    output: 'packages/icons/src/components/Icon/__generatedIcons__',
  },
  {
    name: 'Product Icons',
    suffix: 'ProductIcon',
    input: 'packages/icons/src/components/ProductIcon/assets',
    output: 'packages/icons/src/components/ProductIcon/__generatedIcons__',
  },
  {
    name: 'Category Icons',
    suffix: 'CategoryIcon',
    input: 'packages/icons/src/components/CategoryIcon/assets',
    output: 'packages/icons/src/components/CategoryIcon/__generatedIcons__',
  },
  {
    name: 'Logo',
    suffix: 'Logo',
    input: 'packages/icons/src/components/Logo/assets',
    output: 'packages/icons/src/components/Logo/__generatedIcons__',
  },
]

const COMMENT_HEADER = `/**
* Provide the icon component for the icon name.
* This file is automatically generated from /scripts/generateIconFiles.ts.
* PLEASE DO NOT EDIT HERE
*/`

const templateIcon = (iconName: string, svg: string) => `${COMMENT_HEADER}
import { Icon } from '../Icon'
import type { IconProps } from '../Icon'

export const ${iconName} = ({
  ...props
}: Omit<IconProps, 'children'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props}>${svg}</Icon>
)
`

const toPascalCase = (str: string) =>
  str.replace(/(^\w|-\w)/g, match => match.replace('-', '').toUpperCase())

const generateVariableName = (filePath: string) => {
  const parsedPath = path.parse(filePath)
  const fileName = toPascalCase(parsedPath.name)
  const parentDir = path.basename(path.dirname(filePath))

  const isOutline = parentDir.includes('outline')
  const iconName = `${fileName}${isOutline ? 'Outline' : ''}`

  return iconName
}

const readDirectoryRecursive = async (dir: string) => {
  let results: string[] = []

  const list = await fs.readdir(dir, { withFileTypes: true })

  for (const file of list) {
    const filePath = path.resolve(dir, file.name)

    if (file.isDirectory()) {
      const subDirResults = await readDirectoryRecursive(filePath)
      results = [...results, ...subDirResults]
    } else if (path.extname(file.name).toLowerCase() === '.svg') {
      results.push(filePath)
    }
  }

  return results
}

const readSvg = async (filePath: string) => {
  const svgContent = await fs.readFile(filePath, 'utf8')
  const innerSvgContent = svgContent.replace(/<svg[^>]*>|<\/svg>/g, '') // Remove <svg ...> and </svg> tags

  // Replace class with className
  const updatedSvgContent = innerSvgContent.replace(/class=/g, 'className=')

  return updatedSvgContent.replace(/`/g, '\\`') // Escape backticks
}

const appendExportToIndex = async (output: string, iconName: string) => {
  const exportStatement = `export { ${iconName} } from './${iconName}'\n`

  try {
    await fs.appendFile(`${output}/index.ts`, exportStatement)
  } catch (error) {
    console.error('Error appending to index file:', error)
  }
}

const resetIconsFolder = async (folderPath: string) => {
  try {
    const files = await fs.readdir(folderPath)
    const deletePromises = files.map(file =>
      fs.unlink(path.join(folderPath, file)),
    )
    await Promise.all(deletePromises)
    console.log(`Deleted all files in ${folderPath}`)
  } catch (error) {
    console.error('Error deleting files in icons folder:', error)
  }
}

const main = async () => {
  for (const component of COMPONENTS) {
    console.log(`Generating ${component.name}...`)
    await resetIconsFolder(component.output) // we clean the folder before generating the new icons

    try {
      await fs.appendFile(`${component.output}/index.ts`, `${COMMENT_HEADER}\n`)
    } catch (error) {
      console.error('Error appending to index file:', error)
    }

    try {
      const files = await readDirectoryRecursive(component.input)
      for (const file of files) {
        if (file.includes('small')) {
          break
        }
        const svgContent = await readSvg(file)
        const generatedName = `${generateVariableName(file)}${component.suffix}`
        const generatedComponent = templateIcon(generatedName, svgContent)
        const filePath = `${component.output}/${generatedName}.tsx`

        try {
          await fs.writeFile(filePath, generatedComponent)
          console.log(`File has been written to ${filePath}`)
          await appendExportToIndex(component.output, generatedName)
        } catch (error) {
          console.error('Error writing to file:', error)
        }
      }
    } catch (error) {
      console.error('Error reading directory:', error)
    }
  }
}

await main()
