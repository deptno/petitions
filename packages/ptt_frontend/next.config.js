const [_, assetPrefix = ''] = (process.env.GITHUB_REPOSITORY || '').split('/')
const config = {
  env: {
    AA_GRAPHQL_URL: process.env.PTT_GRAPHQL_URL || '/api/graphql'
  },
  assetPrefix: `/${assetPrefix}`
}

console.log('build config:', config)

module.exports = config
