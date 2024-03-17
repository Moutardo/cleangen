# CleanGen CLI Contributing Guide

## Audience

If you are a developer interested in contributing to the CLI, this is the
documentation for you! This guide describes how to be successful in contributing
to our repository.

## Getting Started

### Contribution Process

The preferred means of contribution to the CLI is by creating a branch, pushing your changes, and submitting a Pull Request to the
`main`.

NOTE: Any new files added to the repository **must** be written in TypeScript
and **must** include unit tests. There are very few exceptions to this rule.

After your Pull Request passes the tests and is approved by a CleanGen CLI team
member, they will merge your PR. Thank you for your contribution!

### Setting up your development environment

When working on the CleanGen CLI, you want to work using a clone of the project.

#### Link your local repository to your environment

After cloning the project, use `npm link` to globally link your local
repository:

```bash
git clone git@github.com:Moutardo/cleangen.git
cd cleangen
npm install # must be run the first time you clone
npm link  # installs dependencies, runs a build, links it into the environment
```

This link makes the `cleangen` command execute against the code in your local
repository.

#### Test locally while making changes

After you link your local repository to your environment, you may want to run
`npm run build:watch` in a separate terminal window to watch your local
repository for any changes and rebuild your source code when it does. These
updates will continue to work without having to run `npm link` repeatedly.

#### Unlink your local repository

To un-link `cleangen` from your local repository, you can do any of the
following:

*   run `npm uninstall -g cleangen`
*   run `npm unlink -g cleangen`

# Conventions
We structure our messages like this:

```bash
<type>: <subject>
<body>
```
Example

```bash
feat: new awesome feature
Closes #111
```

List of types:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- build: Changes to the build process or auxiliary tools
- ci: changes related to Continuous Integration (usually yml and other configuration files)
- chore: chore is most likely something that doesn’t fit the other possible types

### Repo structure

| path            | description                                               |
| --------------- | --------------------------------------------------------- |
| `src`           | Contains shared/support code for the commands             |
| `src/bin`       | Contains the runnable script. You shouldn't need to touch this content. |
| `src/commands`  | Contains code for the commands, organized by one-file-per-command with dashes. |
| `src/templates` | Contains static files needed for various reasons |
| `src/test`      | Contains tests. Mirrors the top-level directory structure (i.e., `src/test/commands` contains command tests ...) |