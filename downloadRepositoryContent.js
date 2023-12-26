const { PDFDocument, StandardFonts } = require('pdf-lib')
const getFileExtension = require('./getFileExtension')
const prettier = require('prettier')
const fetch = require('node-fetch')
const fs = require('fs')

module.exports = async function downloadRepositoryContent(
  repositoryUrl,
  ACCESS_GITHUB_TOKEN,
  filesFormat
) {
  try {
    const headers = {
      Authorization: `Bearer ${ACCESS_GITHUB_TOKEN}`,
    }

    const response = await fetch(`${repositoryUrl}/contents`, { headers })

    const data = await response.json()

    if (!Array.isArray(data)) {
      console.error('Error fetching repository content.')
      return
    }

    const pdfDoc = await PDFDocument.create()
    const fontSize = 10

    const processFile = async (file) => {
      const isFileFormatValid = filesFormat.some((format) =>
        file.name.endsWith(format)
      )

      if (file.type === 'file' && isFileFormatValid) {
        const fileResponse = await fetch(file.download_url, { headers })
        const fileContent = await fileResponse.text()

        try {
          let formattedCode = fileContent

          switch (getFileExtension(file.name)) {
            case 'js':
              formattedCode = prettier.format(fileContent, {
                parser: 'babel',
              })
              break
            case 'ts':
              formattedCode = prettier.format(fileContent, {
                parser: 'ts',
              })
              break
            case 'vue':
              formattedCode = prettier.format(fileContent, {
                parser: 'vue',
              })
              break
            case 'html':
              formattedCode = prettier.format(fileContent, {
                parser: 'html',
              })
              break
            case 'css':
              formattedCode = prettier.format(fileContent, {
                parser: 'css',
              })
              break
            case 'python':
              formattedCode = execSync(`black -`, {
                input: fileContent,
              }).toString()
              break
            default:
              console.warn(
                `Unsupported file type: ${getFileExtension(file.name)}`
              )
              return
          }

          const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
          const page = pdfDoc.addPage()

          page.setFont(font)
          page.setFontSize(fontSize)

          const lines = formattedCode.split('\n')
          lines.forEach((line, index) => {
            try {
              page.drawText(line, {
                x: 50,
                y: page.getHeight() - 50 - index * 10,
                maxWidth: 500,
                maxHeight: page.getHeight() - 100,
                lineBreak: true,
              })
            } catch (drawError) {
              console.warn(
                `Skipping line ${index + 1} in file "${
                  file.name
                }" due to drawing error:`,
                drawError.message
              )
            }
          })
        } catch (error) {
          console.error(
            `Failed to format code for file "${file.name}". Error:`,
            error.message
          )
        }
      } else if (file.type === 'dir') {
        const dirResponse = await fetch(file.url, { headers })
        const dirData = await dirResponse.json()

        if (!Array.isArray(dirData)) {
          console.error(`Error retrieving content for folder "${file.name}".`)
          return
        }

        for (const nestedFile of dirData) {
          await processFile(nestedFile)
        }
      }
    }

    for (const file of data) {
      await processFile(file)
    }

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('repository_content.pdf', pdfBytes)

    console.log(
      'Repository content saved in the file "repository_content.pdf".'
    )
  } catch (error) {
    console.error('Error:', error)
  }
}
