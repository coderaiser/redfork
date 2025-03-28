# Redfork [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/redfork.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/redfork/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/redfork/workflows/Node%20CI/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/redfork "npm"
[BuildStatusURL]: https://travis-ci.com/coderaiser/redfork "Build Status"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/coderaiser/redfork?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/redfork/badge.svg?branch=master&service=github

CLI tool to run command in multiple subdirectories.

![Refork](https://github.com/coderaiser/redfork/raw/master/img/redfork.svg "Refork")

## Install

```
npm i redfork -g
```

# Usage

```
Usage: redfork [options] [command]
Options:
  -p, --pattern           apply directory pattern, defaults to '*'
  -h, --help              display this help and exit
  -v, --version           output version information and exit
```

You can, for example, run the command `ls -lha` in all directories that located in current `pwd`:

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
