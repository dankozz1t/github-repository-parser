### GitHub Repository Parser

The GitHub Repository Parser is a tool designed to download and format the content of a GitHub repository. Below are the main components and functionalities of this tool, based on the files found in the repository:

1. **[index.js](https://github.com/dankozz1t/github-repository-parser/blob/main/index.js):** This is the entry point of the application. It requires the 'dotenv' package for environment variables, sets up necessary constants like the GitHub token, author name, and repository name, and calls the `downloadRepositoryContent` function with the repository URL and file formats to be downloaded.

2. **[downloadRepositoryContent.js](https://github.com/dankozz1t/github-repository-parser/blob/main/downloadRepositoryContent.js):** This script is responsible for downloading the content from the specified GitHub repository. It uses the 'pdf-lib' package to create PDFs of the repository content, 'prettier' for formatting the code, and 'node-fetch' for making HTTP requests. The function iterates over each file in the repository, formats the content if it's a supported file type, and adds it to a PDF document.

3. **[getFileExtension.js](https://github.com/dankozz1t/github-repository-parser/blob/main/getFileExtension.js):** A utility function to extract the file extension from a filename.

4. **[package.json](https://github.com/dankozz1t/github-repository-parser/blob/main/package.json):** Contains metadata about the project and lists its dependencies, including 'dotenv', 'fs', 'node-fetch', 'nodemon', 'pdf-lib', and 'prettier'.

5. **[.env.example](https://github.com/dankozz1t/github-repository-parser/blob/main/.env.example):** An example environment file that outlines the necessary environment variables, such as the GitHub token, author name, and repository name.

6. **[.prettierrc](https://github.com/dankozz1t/github-repository-parser/blob/main/.prettierrc):** Configuration file for Prettier, a code formatter.

### How to Use

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your `.env` file based on the `.env.example`.
4. Run the script using `npm start` or `node index.js`.
---
