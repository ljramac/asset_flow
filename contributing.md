# Contributing to the Project

Thank you for your interest in contributing to our project! To ensure a smooth contribution process and maintain the quality of our codebase, please follow the guidelines below.

## Proposals and Tasks

- Every contribution should be associated with a well-defined task within the project management tool. Before submitting a Pull Request (PR), make sure there is a task created that describes the work you intend to do.

## Pull Requests

- Link your PR to the corresponding task from our project management tool. This linkage ensures that all contributions can be traced back to a project task that has been previously discussed and agreed upon.

## Commit Messages

Your commits should adhere to the [Conventional Commits](https://www.conventionalcommits.org/) standard. This means that your commit messages should be structured in a way that they clearly describe the nature of the change and follow the predefined format.

When contributing to the project, it's important to follow our commit message conventions. This ensures our commit history is readable and understandable. Here's how to structure your commit messages:

```
<type>(<scope>): <description> (#<issue-number>)
```

- `<type>`: This indicates the kind of change you're making. Common types include:
  - `feat`: A new feature.
  - `fix`: A bug fix.
  - `docs`: Documentation only changes.
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
  - `refactor`: A code change that neither fixes a bug nor adds a feature.
  - `perf`: A code change that improves performance.
  - `test`: Adding missing tests or correcting existing tests.
  - `chore`: Regular code maintenance.
  - `config`: Changes to configuration files.

- `<scope>`: The scope should indicate the module or feature that is affected by the change.

- `<description>`: A brief description of the change. Use the imperative, present tense: "change" not "changed" nor "changes".

- `(#<issue-number>)`: Include the issue number from GitHub, preceded by a `#`. This links your commit to the corresponding task or issue in the project management tool.

### Example Commit Message

```
:rocket: feat(logs): Add new logging feature (#1)
```

In this example, `:rocket:` is an optional emoji to add a visual cue about the commit type, `feat(logs)` indicates that a new feature has been added related to logging, the description is "Add new logging feature", and `(#123)` links this commit to issue number 123 in the GitHub repository.

## Branching Strategy

- We follow the [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) branching strategy. Please branch off from the `develop` branch for new features and make sure to merge back into it when your feature is completed and ready for testing.

## Readme and Documentation

- Keep the `README.md` file up to date. For each new feature, ensure you add the necessary information to the `README.md` so that other users can understand and use the new functionality effectively.
- If your changes involve architectural changes or need illustrations, include diagrams that are compatible with Markdown. We recommend using [Mermaid](https://mermaid-js.github.io/mermaid/#/) to create diagrams that can be easily integrated and rendered within the `README.md`.

## Questions and Help

- If you have any questions or need assistance, please reach out to the project maintainers.

We appreciate your contributions to our project and look forward to your innovative solutions and improvements.
