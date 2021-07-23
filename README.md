# Netlify Build Plugin: Deploy a StepZen GraphQL Endpoint Alongside a Netlify Build

The StepZen Netlify Build Pluign allows you to deploy a GraphQL API to
[StepZen](http://stepzen.com) during a Netlify build.

StepZen enables you integrate APIs and data into a single GraphQL API that forms
the backend of your Jamstack site. You can populate your API with data from
REST, databases or any backend. The StepZen plugin enables you to easily deploy
and integrate the API in a Netlify build. No change is required to the Netlify
deployment process. Your endpoint runs on StepZen, as a service, so that you
don't manage any infrastructure.

> For a full tutorial walkthrough showing how to build a Jamstack site using the
> StepZen Netlify Build Plugin, check our tutorial
> "[How to build a database-driven Jamstack site](https://www.netlify.com/blog/2021/06/10/how-to-build-a-database-driven-jamstack-site/)"
> on the Netlify Blog.

## Pre-requisites

- _required_ You have a [Netlify](http://netlify.com) account and site.
- _required_ You have a [StepZen](http://stepzen.com) account.
- _optional, recommended_ You have installed the StepZen CLI tool
  `npm install -g stepzen`
- _optional, recommended_ You have built an API using StepZen. Go
  [here](https://www.stepzen.com/developers) for a quick "how to".

## Usage

The first step is to install this plugin into your Netlify Site.

- Search for `stepzen` in the Netlify plugins
  [directory](https://app.netlify.com/plugins), and click the install button.

Next, configure the plugin.

- Create a `stepzen` directory within your Netlify project root containing your
  API specification.
- Add the environment variables (For options on how to add environment variables
  to Netlify, refer to
  [their documentation](https://docs.netlify.com/configure-builds/environment-variables/#declare-variables)):
  - `STEPZEN_ACCOUNT` specifies the name of your StepZen account. This can be
    found on the [My Account page](https://stepzen.com/account) on StepZen.com;
  - `STEPZEN_ADMIN_KEY` specifies the admin API Key that enables access to
    deploy APIs on your account on StepZen. This can be found on the
    [My Account page](https://stepzen.com/account) on StepZen.com
  - `STEPZEN_NAME` specifies the endpoint name for your API. This will determine
    the URL that your endpoint will deployed to. For example, a user with the
    account name `biggs` and a endpoint name of `my-api` will deploy as
    `https://biggs.stepzen.net/netlify/my-api/__graphql` (note that this assumes
    the dealt `STEPZEN_FOLDER` value is used).
- Optionally, you can specify additional environment variables.
  - `STEPZEN_FOLDER` is a folder name under which your endpoint will be deployed
    (this defaults to `netlify`). StepZen generates the endpoint URL using a
    pattern of `https://[account].stepzen.com/[folder]/[endpoint name]`.
  - Any environment variable that starts with `STEPZEN_` are available in your
    `config.yaml`, so set your API keys here. [Find out more about adding API
    keys and other Secrets to your `config.yaml` safely](DOCS LINK HERE) on
    StepZen.com

## How does it work?

The StepZen GraphQL API is deployed whenever a site build is triggered (for
example, if you push into your connected git repository). You'll be able to view
progress via the Netlify deploy log. For example, a successful deploy will
output something similar to the following in the deploy log:

```bash
3:34:14 PM: ❯ Loading plugins
3:34:14 PM:    - netlify-plugin-stepzen@1.0.2 from Netlify app
3:34:14 PM: ​
3:34:14 PM: ────────────────────────────────────────────────────────────────
3:34:14 PM:   1. onPreBuild command from netlify-plugin-stepzen
3:34:14 PM: ────────────────────────────────────────────────────────────────
3:34:14 PM: ​
3:34:14 PM:  Deploying from StepZen account: biggs
3:34:14 PM:  using configuration sets netlify/configuration,stepzen/defaults
3:34:14 PM:  Pushing schema to netlify/my-api
3:34:16 PM:  Your endpoint is available at https://biggs.stepzen.net/netlify/my-api/__graphql
3:34:16 PM: ​
3:34:16 PM: (netlify-plugin-stepzen onPreBuild completed in 1.9s)
```

The API is deployed to StepZen _prior_ to the site build step. This enables you
to access data in your GraphQL API during the build process, allowing you to
pre-render pages off of dynamic data from the API.

## Where To Go From Here

You can learn more about build GraphQL APIs using StepZen via the
[StepZen documentation](https://stepzen.com/docs) or via the
[StepZen blog](https://stepzen.com/blog).
