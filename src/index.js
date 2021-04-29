// This is the main file for the Netlify Build plugin stepzen.
const chalk = require('chalk')
const stepzen = require('@stepzen/sdk')

async function run(args) {

  // args
  console.log('args', args)

  const stepzenSecret = args.netlifyConfig.build.environment.STEPZEN_API_KEY
  const stepzenAccount = args.netlifyConfig.build.environment.STEPZEN_ACCOUNT
  const stepzenSchema =
    args.netlifyConfig.build.environment.STEPZEN_SCHEMA || 'schema'
  const stepzenEndpoint =
    args.netlifyConfig.build.environment.STEPZEN_ENDPOINT || 'endpoint'
  const stepzenConfiguration =
    args.netlifyConfig.build.environment.STEPZEN_CONFIGURATIONSETS ||
    'configuration'
  const stepzenFolder =
    args.netlifyConfig.build.environment.STEPZEN_FOLDER || 'netlify'
  console.log(
    chalk.white(
      `pushing schema to ${stepzenFolder}/${stepzenSchema}, and deploying to ${stepzenFolder}/${stepzenEndpoint} using ${stepzenFolder}/${stepzenConfiguration}`,
    ),
  )
  const client = await stepzen.client({
    account: stepzenAccount,
    adminkey: stepzenSecret,
  })
  await client.upload.configurationset(
    `${stepzenFolder}/${stepzenConfiguration}`,
    'stepzen/config.yaml',
  )
  await client.upload.schema(`${stepzenFolder}/${stepzenSchema}`, 'stepzen')
  await client.deploy(`${stepzenFolder}/${stepzenEndpoint}`, {
    configurationsets: [
      `${stepzenFolder}/${stepzenConfiguration}`,
      'stepzen/default',
    ],
    schema: `${stepzenFolder}/${stepzenSchema}`,
  })
}

module.exports = {
  async onPreBuild(args) {
    console.log('PreBuild')
    await run(args)
    args.utils.status.show({ summary: 'Success!' })
  },
  async onBuild(args) {
    console.log('Build')
    args.utils.status.show({ summary: 'Success!' })
  },
  async onPostBuild(args) {},
  async onSuccess(args) {},
  async onError(args) {},
  async onEnd(args) {},
}
