# Netlify Build Plugin: Deploy a StepZen GraphQL Endpoint using a Netlify Build

Deploy a [StepZen](http://stepzen.com) GraphQL API with any Netlify build.

StepZen enables you easily integrate APIs and data for Jamstack sites by making
it easy to build a GraphQL API that gets the data you need from REST, databases
or any backend. After you've built a GraphQL API to power a site's static assets
or dynamic experiences, the StepZen plugin enables you to easily integrate the
API in a Netlify build. No change is required to the Netlify deployment process.
Your endpoint runs on StepZen, as a service, so that you don't manage any
infrastructure.

## Pre-requisites

- _required_ You have a [Netlify](http://netlify.com) account and site.
- _required_ You have a [StepZen](http://stepzen.com) account, and you know the
  account name and admin API Key.
- _optional, recommended_ You have installed the StepZen CLI tool
  `npm install -g stepzen`
- _optional, recommended_ You have built an API using StepZen. Go
  [here](https://www.stepzen.com/developers) for a quick "how to".

## Usage

The first step is to install this plugin into your Netlify Site. You have two
options.

- Search for `stepzen` in the Netlify plugins
  [directory](https://app.netlify.com/plugins), and click the install button.

Second, you configure the plugin.

- Create a `stepzen` directory containing your API specification. If you have
  built an API using StepZen, you can just copy the directory into your Netlify
  project root folder and name it `stepzen`.
- Add three environment variables, as specified
  [here](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables):
  - `STEPZEN_ACCOUNT` specifies the name of your StepZen account;
  - `STEPZEN_ADMIN_KEY` specifies the admin API Key that enables access to that
    account's endpoint.
  - `STEPZEN_NAME` specifies a name that StepZen will to use for the resources
    related to this project.
- Optionally, you can specify two other environment variables.
  - `STEPZEN_FOLDER` is a folder within StepZen for project resources in (this
    defaults to `netlify`)
  - `STEPZEN_CONFIGURATION_SETS` is a list of StepZen configurationsets to apply
    to your schema definitions. This is specified as a comma separated string,
    and defaults to `netlify/configuration,stepzen/defaults`.
- It's done!

## How does it work?

1. When you push changes to the `main` branch on GitHub (for cases where source
   is stored in GitHub), GitHub calls a Netlify hook. (It works the same way if
   your source materials are in `gitlab`, or `bitbucket`.)

2. The hook triggers a checkout, build, and push on Netlify and results in the
   updated website served by the Netlify CDN.

   1. The build first establishes the build environment specified in the
      `netlify.toml` file, but before triggering the build process, it triggers
      the StepZen plugin.

   2. The build plugin compiles, and pushes the contents of the GraphQL schema
      files (SDLs) contained in the `stepzen` directory to the corresponding
      StepZen account.

   3. The site build process begins. Because the site build process is triggered
      after the StepZen plugin, StepZen APIs are available during the static
      build.

   4. Netlify completes the build and pushes the site to the Netlify CDN. Once
      the push completes successfully, the StepZen endpoint includes the updated
      GraphQL schema (SDL) code and is serving the new API.

## Consequently

StepZen enables you build a GraphQL API that gets the data you need from REST,
databases or any backend. You don't need to be a GraphQL expert, build a GraphQL
server, or understand resolvers. At runtime, StepZen ensures that API keys and
queries are protected when making calls from a browser to retrieve and render
data on the client-side. You don't need to write code to parallelize execution,
store keys safely, handle caching, and more.

The Netlify integration simplifies your deployment. The workflow you use to
deploy changes on Netlify does not change. You manage your GraphQL schemas
(SDLs) in a cohesive way with the rest of the Netlify site and your releases are
coordinated.
