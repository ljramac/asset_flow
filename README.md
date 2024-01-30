# asset_flow

Assets and Jobs multipurpose project

## Installation

Remember to use the correct version of Node.js, for which I recommend using nvm with the .nvmrc file.
```pwsh
$ nvm use|install
```
Depending on whether we already have the version, we will use use or install

Next, we must install the modules:
```pwsh
$ npm i
```
## Usage

```pwsh
$ npm start
```

## Features

 - File upload
 - Asset processing
 - Asset/Job search
 - Bulk data to data warehouse
 - OpenSearch data indexing

## Contributing

To maintain quality and consistency within our codebase, please adhere to the following guidelines:

1. **Issue Linking**: Every Pull Request (PR) must be linked to a detailed task in our [Github Project](https://github.com/users/ljramac/projects/1/views/1). This ensures that all changes are traceable to a specific objective and discussion.

2. **Commits**: Your commits should follow the [Conventional Commits](https://www.conventionalcommits.org/) standard, which helps in the automated generation of changelogs and maintains a readable history.

3. **Branching Strategy**: Our project uses [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) as its branching strategy. Please make sure to create feature branches off the `develop` branch and prepare your PRs accordingly.

For more details on how to contribute, please refer to our [Contributing Guidelines](./contributing.md).


### Links
[Assets V1](http://localhost:8080/api/v1/assets)

[Assets V2](http://localhost:8080/api/v2/assets)

[Swagger](http://localhost:8080/api/docs/)

[OpenSearch](https://opensearch:9200/)

[OpenSearch Dashboards](http://0.0.0.0:5601/app/home#/)
