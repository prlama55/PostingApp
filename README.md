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
| Starts a Dev server                               | `yarn start`                                                                             |                                                                                        |
| adds or removes 3rd party dependency to workspace | `yarn add/remove <3rd party dependency>`                                                                            |

Note: Do not add package dependencies to the monorepo root package.json, add the dependency to the necessary workspace

Please make sure your code doesn't break any linter rules and passes all unit tests before submitting a PR.

### Updating fork(Featured branch)

1. ####Open Terminal.
2. ####List the current configured remote repository for your fork.
    1. `$ git remote -v`
    2. `> origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)`
    3. `> origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)`
3. ####Specify a new remote upstream repository that will be synced with the fork.
    `$ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git`
4. ####Verify the new upstream repository you've specified for your fork.
    1. `$ git remote -v`
    2. `> origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)`
    3. `> origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)`
    4. `> upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)`
    5. `> upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)`
    
5. #### Cleanup featured branch(Forked branch)
    1. #####Create a copy of your branch to cherry pick commits from
        `git checkout -b <my-branch-name>-2`
    2. #####Checkout develop and reset it to latest upstream (upstream being higi remote)
        1. `git checkout master`
        2. `git fetch upstream`
        3. `git reset --hard upstream/master`
    3. #####Reset feature branch from develop
        1. `git checkout <my-branch-name>`
        2. `git reset --hard upstream/master`
        3. `git checkput <my-branch-name>
        4. `git reset --hard upstream/master`
    4. ##### Compare `<my-branch-name>-2` and add changes to `<my-branch-name>`
    
6. ####Update featured branch from upstream
    1. `git checkout master`
    2. `git reset --hard upstream/master`
    3. `git push origin master`
    4. `git checkput <my-branch-name>`
    5. `git merge master`
