// This is the main file for the Netlify Build plugin stepzen.
const chalk = require('chalk')
const stepzen = require('@stepzen/sdk')

function run( args ) {
    if(!args.netlifyConfig.build.environment.STEPZEN_ADMIN_KEY) {
      return args.utils.build.failBuild('Failed finding the STEPZEN_ADMIN_KEY in the Netlify Environment Variables.')
    }
    const stepzenSecret = args.netlifyConfig.build.environment.STEPZEN_ADMIN_KEY
    if(!args.netlifyConfig.build.environment.STEPZEN_ACCOUNT) {
      return utils.build.failBuild('Failed finding the STEPZEN_ADMIN_KEY in the Netlify Environment Variables.')
    }
    const stepzenAccount = args.netlifyConfig.build.environment.STEPZEN_ACCOUNT
    const stepzenSchema = args.netlifyConfig.build.environment.STEPZEN_SCHEMA_NAME || 'schema'
    const stepzenEndpoint = args.netlifyConfig.build.environment.STEPZEN_ENDPOINT || 'endpoint'
    const stepzenConfiguration = args.netlifyConfig.build.environment.STEPZEN_CONFIGURATIONSETS || 'configuration'
    const stepzenFolder = args.netlifyConfig.build.environment.STEPZEN_FOLDER || 'netlify'

    console.log(chalk.white(`using ${stepzenAccount}`))
    console.log('update for testing deploy')
    console.log(chalk.white(`pushing schema to ${stepzenFolder}/${stepzenSchema}, and deploying to ${stepzenFolder}/${stepzenEndpoint} using ${stepzenFolder}/${stepzenConfiguration}`))
    const client = await stepzen.client({
      account: stepzenAccount,
      adminkey: stepzenSecret,
    })
    await client.upload.schema(`${stepzenFolder}/${stepzenSchema}`, "stepzen")
    await client.deploy(
      `${stepzenFolder}/${stepzenEndpoint}`,
      {
        configurationsets: [`${stepzenFolder}/${stepzenConfiguration}`],
        schema: `${stepzenFolder}/${stepzenSchema}`,
      },
    )
}

module.exports = {
  async onPreBuild( args ) {
    console.log('PreBuild')
    run(args)
    args.utils.status.show({ summary: 'Success!' })
  },
  async onBuild( args ) {
    console.log('Build')
    args.utils.status.show({summary: 'Success!'})
  },
  async onPostBuild( args ) {},
  async onSuccess( args ) {},
  async onError( args ) {},
  async onEnd( args ) {},
}
