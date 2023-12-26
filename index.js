const downloadRepositoryContent = require('./downloadRepositoryContent')

require('dotenv').config()

const ACCESS_GITHUB_TOKEN = process.env.GITHUB_TOKEN
const AUTHOR_NAME = process.env.AUTHOR_NAME
const REPOSITORY_NAME = process.env.REPOSITORY_NAME

const filesFormat = ['.js', '.ts', '.vue', '.html', '.css', '.python']

const repositoryUrl = `https://api.github.com/repos/${AUTHOR_NAME}/${REPOSITORY_NAME}`

downloadRepositoryContent(repositoryUrl, ACCESS_GITHUB_TOKEN, filesFormat)
