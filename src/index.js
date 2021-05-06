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
    validate(`${validateSchema}`)
  } catch (error) {
    console.log(error)
  }
}

async function run(args) {
  const {
    STEPZEN_ACCOUNT,
    STEPZEN_ADMIN_KEY,
    STEPZEN_FOLDER,
    STEPZEN_NAME,
  } = args.netlifyConfig.build.environment

  if (
    [STEPZEN_ACCOUNT, STEPZEN_ADMIN_KEY, STEPZEN_FOLDER, STEPZEN_NAME].every(
      (element) => !element,
    )
  ) {
    // No parameters, have to not fail.
    return args.utils.status.show(
      'Successfully called the stepzen plugin, but no stepzen configuration found, exiting',
    )
  }

  // Set STEPZEN_FOLDER to a default value
  const STEPZEN_FOLDER_CONFIG = STEPZEN_FOLDER || 'netlify'

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

  if (!STEPZEN_FOLDER_CONFIG) {
    return args.utils.build.failBuild(
      'Failed finding the STEPZEN_FOLDER in the Netlify Environment Variables.',
    )
  }

  if (!STEPZEN_NAME) {
    return args.utils.build.failBuild(
      'Failed finding the STEPZEN_NAME in the Netlify Environment Variables.',
    )
  }

  const endpoint = `${STEPZEN_FOLDER_CONFIG}/${STEPZEN_NAME}`

  console.info(
    `%c Deploying from StepZen account: ${STEPZEN_ACCOUNT}`,
    'color:#ffffff;font-weight: 600;border-color: #8b6091;border-width: 2px 0 0;border-radius:5px',
  )
  console.info(
    `%c Pushing schema to ${endpoint}`,
    'color:#ffffff;font-weight: 600',
  )
  console.info(
    `%c Your endpoint is available at https://${STEPZEN_ACCOUNT}.stepzen.net/${endpoint}/__graphql`,
    'color:#ffffff;font-weight: 600;border-color: #8b6091;border-width: 0 0 2px;border-radius:5px',
  )

  const client = await stepzen.client({
    account: STEPZEN_ACCOUNT,
    adminkey: STEPZEN_ADMIN_KEY,
  })

  await client.upload.schema(endpoint, 'stepzen')

  await client.deploy(endpoint, {
    configurationsets: ['netlify/configuration'],
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
    args.utils.status.show({ summary: 'Success!' })
  },
  async onPostBuild(args) {
    args.utils.status.show({ summary: 'Success!' })
  },
  async onSuccess(args) {
    args.utils.status.show({ summary: 'Success!' })
  },
  async onError(args) {
    args.utils.status.show({ summary: 'Success!' })
  },
  async onEnd(args) {
    args.utils.status.show({ summary: 'Success!' })
  },
}
