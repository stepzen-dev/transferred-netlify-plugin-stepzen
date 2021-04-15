// This is the main file for the Netlify Build plugin stepzen.
const stepzen = require('@stepzen/sdk')

module.exports = {
  async onPreBuild( args ) {
    console.log('PreBuild')
    console.log('Netlify configuration', args.netlifyConfig)
    const stepzenSecret = args.netlifyConfig.build.environment.STEPZEN_ADMIN_KEY
    const stepzenAccount = args.netlifyConfig.build.environment.STEPZEN_ACCOUNT
    const client = await stepzen.client({
      account: stepzenAccount,
      adminKey: stepzenSecret,
    })
    args.utils.status.show({ summary: 'Success!' })
  },
  async onBuild( args )
  {
    console.log('Build')
    args.utils.status.show({summary: 'Success!'})
  },
  /*
  {
    netlifyConfig, inputs, error,
    constants: { CONFIG_PATH, PUBLISH_DIR, FUNCTIONS_SRC, FUNCTIONS_DIST, IS_LOCAL, NETLIFY_BUILD_VERSION, SITE_ID, },
    utils: { build, status, cache, run, git, functions, },
  }
  // Before build commands are executed
  onPreBuild() {},
  // Build commands are executed
  onBuild() {},
  // After Build commands are executed
  onPostBuild() {},
  // Runs on build success
  onSuccess() {},
  // Runs on build error
  onError() {},
  // Runs on build error or success
  onEnd() {},
  */
}
