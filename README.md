# Redfork [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/redfork.svg?style=flat
[BuildStatusURL]:           https://github.com/coderaiser/redfork/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]:        https://github.com/coderaiser/redfork/workflows/Node%20CI/badge.svg
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/redfork.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/redfork "npm"
[BuildStatusURL]:           https://travis-ci.com/coderaiser/redfork  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/redfork "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]:              https://coveralls.io/github/coderaiser/redfork?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/redfork/badge.svg?branch=master&service=github

CLI tool to run command in multiple subdirectories.

![Refork](https://github.com/coderaiser/redfork/raw/master/img/redfork.svg "Refork")

## Install

```
npm i redfork -g
```

# Usage

```
redfork 'ls -lha'
```

## Pattern

When you need to filter directories, you can use `-p`, `--pattern` argument:

```
redfork 'ls -lha' -p plugin-*
```

Will show content of all subdirectories.

## Related

- [redrun](https://github.com/coderaiser/redrun) - CLI tool to run multiple npm-scripts fast;
- [madrun](https://github.com/coderaiser/madrun) - CLI tool to run multiple npm-scripts in a madly comfortable way

## License

MIT

