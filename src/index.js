// This is the main file for the Netlify Build plugin stepzen.
const lodash = require('lodash')
const stepzen = require('@stepzen/sdk')

module.exports = {
  async onPreBuild( args ) {
    console.log('PreBuild')
    args.utils.status.show({ summary: 'Success!' })
  },
  async onBuild( args ) {
    console.log('Build')
    const stepzenSecret = args.netlifyConfig.build.environment.STEPZEN_ADMIN_KEY
    const stepzenAccount = args.netlifyConfig.build.environment.STEPZEN_ACCOUNT
    const stepzenSchema = args.netlifyConfig.build.environment.STEPZEN_SCHEMA_NAME
    const stepzenEndpoint = args.netlifyConfig.build.environment.STEPZEN_ENDPOINT
    const stepzenConfiguration = args.netlifyConfig.build.environment.STEPZEN_CONFIGURATIONSETS
    console.log(`pushing schema to ${stepzenSchema}, and deploying to ${stepzenEndpoint} using ${stepzenConfiguration}`)
    const client = await stepzen.client({
      account: stepzenAccount,
      adminkey: stepzenSecret,
    })
    args.utils.status.show({summary: 'Success!'})
  },
  async onPostBuild( args ) {
  },
  async onSuccess( args ) {
  },
  async onError( args ) {
  },
  async onended( args ) {
  },
}
