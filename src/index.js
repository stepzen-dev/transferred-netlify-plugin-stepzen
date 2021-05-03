// This is the main file for the Netlify Build plugin stepzen.
const stepzen = require('@stepzen/sdk')
const { validate } = require('@stepzen/transpiler')

async function validateSchema(args) {
  const {
    STEPZEN_FOLDER = 'netlify',
    STEPZEN_NAME,
  } = args.netlifyConfig.build.environment

  const validateSchema = `${STEPZEN_FOLDER}/${STEPZEN_NAME}`
  try {
    validate(validateSchema)
  } catch (error) {
    console.log(error)
  }
}

async function run(args) {
  const {
    STEPZEN_ACCOUNT,
    STEPZEN_ADMIN_KEY,
    STEPZEN_FOLDER = 'netlify',
    STEPZEN_NAME,
  } = args.netlifyConfig.build.environment

  if (!STEPZEN_ACCOUNT) {
    return args.utils.build.failBuild(
      'Failed finding the STEPZEN_ACCOUNT in the Netlify Environment Variables.',
    )
  }

  if (!STEPZEN_ADMIN_KEY) {
    return args.utils.build.failBuild(
      'Failed finding the STEPZEN_ADMIN_KEY in the Netlify Environment Variables.',
    )
  }

  if (!STEPZEN_FOLDER) {
    return args.utils.build.failBuild(
      'Failed finding the STEPZEN_FOLDER in the Netlify Environment Variables.',
    )
  }

  if (!STEPZEN_NAME) {
    return args.utils.build.failBuild(
      'Failed finding the STEPZEN_NAME in the Netlify Environment Variables.',
    )
  }

  const endpoint = `${STEPZEN_FOLDER}/${STEPZEN_NAME}`

  console.log(`using ${STEPZEN_ACCOUNT}`, 'color: #FFFFFF')
  console.log(`pushing schema to ${endpoint}`, 'color: #FFFFFF')

  const client = await stepzen.client({
    account: STEPZEN_ACCOUNT,
    adminkey: STEPZEN_ADMIN_KEY,
  })

  let configurationsets = ['stepzen/default']
  if (args.utils.git.fileMatch('stepzen/config.yaml')) {
    await client.upload.configurationset(endpoint, 'stepzen/config.yaml')
    configurationsets = configurationsets.concat(endpoint)
  }

  await client.upload.schema(endpoint, 'stepzen')

  await client.deploy(endpoint, {
    configurationsets,
    schema: endpoint,
  })
}

module.exports = {
  async onPreBuild(args) {
    console.log('PreBuild')
    await run(args)
    await validateSchema(args)
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
