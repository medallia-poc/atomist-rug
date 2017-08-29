# atomist-rug

[![Build Status](https://travis-ci.org/atomist-contrib/atomist-rug.svg?branch=master)](https://travis-ci.org/atomist-contrib/atomist-rug)

[rug]: http://docs.atomist.com/

This [Rug][rug] project contains an Atomist Rug archive project

## Rugs

### MyFirstEditor

a sample Rug TypeScript editor

#### Prerequisites

Put your editor prerequisites here.

#### Parameters

This Rug takes following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`inputParameter` | Yes | | Example input parameter

#### Running

Run this Rug as follows:

```
$ rug edit -C ../project/directory -l MyFirstEditor inputParameter='some value'
```

Explain what your editor does here.

## Support

General support questions should be discussed in the `#support`
channel on our community Slack team
at [atomist-community.slack.com][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist-contrib/atomist-rug/issues

## Contributing

If you are interested in contributing to the Atomist open source
projects, please see our [contributing guidelines][contrib] and
our [code of conduct][code].

[contrib]: https://github.com/atomist-contrib/welcome/blob/master/CONTRIBUTING.md
[code]: https://github.com/atomist-contrib/welcome/blob/master/CODE_OF_CONDUCT.md

## Development

You can build, test, and install the project locally with
the [Rug CLI][cli].

[cli]: https://github.com/atomist/rug-cli

```
$ ( cd .atomist && npm test )
$ rug install
```

To clean up cached files run:

```
$ ( cd .atomist && npm run clean )
```

To return this project to its distributed state run:

```
$ ( cd .atomist && npm run distclean )
```

You will need to install its dependencies again after this:

```
$ ( cd .atomist && npm install )
```

To create a new release of the project, simply push a tag of the form
`M.N.P` where `M`, `N`, and `P` are integers that form the next
appropriate [semantic version][semver] for release.  For example:

[semver]: http://semver.org

```
$ git tag -a 1.2.3
```

The Travis CI build (see badge at the top of this page) will
automatically create a GitHub release using the tag name for the
release and the comment provided on the annotated tag as the contents
of the release notes.  It will also automatically upload the needed
artifacts.

---

Created by [Atomist][atomist].
Need Help?  [Join our Slack team][slack].

[atomist]: https://www.atomist.com/
[slack]: https://join.atomist.com/
