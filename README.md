# PostingApp

## Contributing

### Pre-requisites

All you need is [_yarn_](https://yarnpkg.com/en/docs/install) 💙

Yarn can be installed with the link above (recommended) or using npm with `npm install -g yarn`
Lerna can be installed using npm with `npm install -g lerna`
(might require sudo if you're on macOS).

### Setup

Posting is actually a monorepo containing several workspaces (`/packages`). It utilizes[ yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and lerna(https://lerna.js.org/) to manage dependencies and workspaces and handle cross-dependencies.

Installation from root:

1. `yarn install` installs lerna dependency
2. `lerna bootstrap` installs dependencies of all workspaces
3. `yarn run dev` starts dev server concurrently

Note: You can run `lerna` scripts from anywhere in the monorepo.

### Other lerna scripts

| Result                                                 | Command              |
| ------------------------------------------------------ | -------------------- |
| Runs tests once for all packages                       | `lerna run test`     |
| Runs the script for all packages that have that script | `lerna run <script>` |
| removes node_modules from all packages                 | `lerna clean`        |

If you run `lerna clean`, you'll need to run `lerna bootstrap` to reinstall dependencies

### individual package dev processes (`cd packages/<package>`)

if you wish to see verbose builds and testing, you can cd into a package and run scripts using yarn.

| Result                                            | Command                                                                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Starts a Dev server                               | `yarn start` (admin-portal-react only)                                                                              |                                                                                        |
| adds or removes 3rd party dependency to workspace | `yarn add/remove <3rd party dependency>`                                                                            |

Note: Do not add package dependencies to the monorepo root package.json, add the dependency to the necessary workspace

Please make sure your code doesn't break any linter rules and passes all unit tests before submitting a PR.
