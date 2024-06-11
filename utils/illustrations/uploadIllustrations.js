import fs from 'fs'
import path from 'path'

const ILLUSTRATIONS_DIR = 'packages/illustrations/src'
const BASE_URL = 'https://test-bucket-illustrations.s3.fr-par.scw.cloud'

// Add .webp and .svg files to index.ts
const importIllustration = (directory, file, output, illustrations) => {
  const parsedFile = path.parse(file)

  if (parsedFile.ext === '.webp' || parsedFile.ext === '.svg') {
    const filename = parsedFile.name.replace(/-./g, x => x[1].toUpperCase())
    const relativePath = directory.split('packages/illustrations/src/')[1]

    illustrations.push(filename === '404' ? 'notFound' : filename)
    fs.appendFileSync(
      output,
      `const ${filename === '404' ? 'notFound' : filename} = \`\${BASE_URL}/${relativePath.replace(/\\/g, '/')}\`\n`,
    )
  }
}

// Find folders and files of illustrations
const findFiles = (dir, output, illustrations) => {
  const files = fs.readdirSync(dir)
  fs.writeFileSync(output, `const BASE_URL = '${BASE_URL}'\n\n`)

  files.forEach(file => {
    const fullPath = path.join(dir, file)
    const isDirectory = fs.statSync(fullPath).isDirectory()
    if (isDirectory) {
      findFiles(fullPath, output)
    } else {
      importIllustration(fullPath, file, output, illustrations)
    }
  })
}

const exportIllustrations = (output, illustrations) => {
  fs.appendFileSync(output, `\nexport { ${illustrations} }`)
}

// Create index.ts for every illustration folder
// !! only works if depth < 2 (src/sub1/sub2/index.ts will be created but not src/sub1/sub2/sub3/index.ts) !!
const subDirs = fs.readdirSync(ILLUSTRATIONS_DIR)

// Go through first subdirectories (product, various)
subDirs.forEach(subDir => {
  const subDirPath = path.join(ILLUSTRATIONS_DIR, subDir)

  if (
    fs.statSync(subDirPath).isDirectory() &&
    !['__stories__', 'components'].includes(subDir)
  ) {
    const files = fs.readdirSync(subDirPath)

    // Create index for each directory inside the subdirectories
    files.forEach(element => {
      const fullPath = path.join(subDirPath, element)
      if (fs.statSync(fullPath).isDirectory()) {
        const illustrations = []
        findFiles(fullPath, `${fullPath}/index.ts`, illustrations)
        exportIllustrations(`${fullPath}/index.ts`, illustrations)
      }
    })
  }
})

// Export all products in products/index.ts
const PRODUCTS_DIR = `${ILLUSTRATIONS_DIR}/products`
const productsDirs = fs.readdirSync(PRODUCTS_DIR)
const productExports = []
fs.writeFileSync(`${PRODUCTS_DIR}/index.ts`, ``)
productsDirs.forEach(productDir => {
  const fullPath = path.join(PRODUCTS_DIR, productDir)
  if (fs.statSync(fullPath).isDirectory()) {
    fs.appendFileSync(
      `${PRODUCTS_DIR}/index.ts`,
      `\nimport * as ${productDir} from './${productDir}'`,
    )
    productExports.push(productDir)
  }
})
fs.appendFileSync(`${PRODUCTS_DIR}/index.ts`, `\n\nexport { ${productExports}}`)
