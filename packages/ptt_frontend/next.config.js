const [_, assetPrefix = ''] = (process.env.GITHUB_REPOSITORY || '').split('/')
const config = {
  env: {
    PTT_GRAPHQL_URL: process.env.PTT_GRAPHQL_URL || 'http://localhost:4000'
  },
  assetPrefix: `/${assetPrefix}`
}

console.log('build config:', config)

module.exports = config
