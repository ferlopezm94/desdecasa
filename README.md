<p align="center">
  <a href="https://evacenter.com">
    <img alt="Gatsby" src="https://050767879990-cdn.s3.amazonaws.com/images/logo.png" width="150" />
  </a>
</p>
<h1 align="center">
  Eva's web app starter
</h1>

Kick off a new web application with this template. This starter ships with the main [Gatsby](https://www.gatsbyjs.org) configuration files you might need to get up and running blazing fast and integrates libraries that will automate and enhance the development process.

## Full Documentation

See the [Wiki](https://github.com/eva-tech/web-app-template/wiki) for full documentation, requirements and other information.

## Run the proyect

Assuming git and all the [needed software](https://github.com/eva-tech/web-app-template/wiki#requirements) are installed, clone the repo and run:

```
$ yarn install
$ yarn develop
```

Now you're ready to visit the web app in localhost:8000.

## Create a production build

Run:

```
$ yarn build
```

Gatsby will perform an optimized production build for your site, generating static HTML and per-route JavaScript code bundles. The build will be in the `public` folder.

To serve the production build locally run:

```
$ yarn serve
```

Gatsby starts a local HTML server for testing your built site at localhost:9000.

## How to deploy a new version

We have 2 main branches: `master` and `dev`.

Whenever a new feature needs to be developed you have to create a new branch with a proper name (`add-login`, `fix-cors`, etc).

When your changes are ready open a Pull Request to master or dev and assign at least one team member to review your PR. We always prefer small PRs (create functionality done instead of CRUD) to speed up releases and catch errors earlier.

Once your PR is approved, our CI/CD pipeline will deployed the web app to either `app-name.evacenter.dev` (when pushed to dev) or `app-name.evacenter.com` (when pushed to master).

The `master` branch only accepts PRs coming from `dev`. If there are abnormal conditions aand you need to push a change directly to master, you should ask an administrator to temporarilly unlock `master`.

## Creating good commits

We're using [Commitlint](https://commitlint.js.org/#/) + [Commitizen](http://commitizen.github.io/cz-cli/) in order to maintain a standard, conventional commit system that provides useful yet concise information.

Commitizen creates the commit messages by prompting us to fill in some required fields and Commitlint ensures a given commit message has the appropriate format.

When ready to commit, simply run:

```bash
yarn commit
```

When finished, we run `eslint` and `prettier` validators to ensure our code is formatted properly and with no errors.

### Semantic release

Whenever there's a push to `master` we run [semantic-release](https://semantic-release.gitbook.io/semantic-release/) to:

- determine the next version number based on previous commits and update `package.json`
- generate release notes and update `CHANGELOG.md`
- create a tag version
- create and push to master a commit message for the new version

That's why it's very important to create proper commits based on the changes done.

You don't have to spend time in creating new release versions!
