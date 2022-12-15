Publishes to npm should occur from the 'release' branch.

The 'master' branch is pulled into repos that have not yet been updated to use the es6 exports that the release branch uses. These rely on namespaces instead of es6 exports.

## TODO

Update all dependent repos to use the @launchedla/subscriptions-api-types npm package instead of pulling in the master branch of this repo directly.
