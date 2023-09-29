# Todz 📋

## Project Overview 🚀

Todz is a command-line tool designed to help you stay organized by managing your tasks efficiently.

## Project Status 🛠️

Todz is currently under active development. Stay tuned for updates as we build and refine this exciting new tool!

## Features 🚀

- Create and manage tasks.
- Mark tasks as complete or incomplete.
- List all tasks or filter by status.
- Simple and intuitive command-line interface.

## Installation 📦

You can install Todz globally using npm or yarn:

```shell
npm install -g todz
# or
yarn global add todz
```

## Usage 📋

Todz offers a variety of commands to help you manage your tasks effectively:

### Initialization 🌟

Initializes the task database. You can specify a custom path for the database file.

```shell
todz init [--path <path: string>]
```

### Adding Tasks 🌟

Adds a new task with the given description.

```shell
todz add <description: string>
```

### Editing Tasks 🌟

Edits the description of the task with the provided ID.

```shell
todz edit <id: number> <new-description: string>
```

### Listing Tasks 🌟

Lists all tasks. You can filter tasks by their completion status.

```shell
todz list [--status <completed|incomplete>]
```

### Marking Tasks as Complete 🌟

Marks the task with the given ID as complete.

```shell
todz complete <id: number>
```

### Marking Tasks as Incomplete 🌟

Marks the task with the given ID as incomplete.

```shell
todz incomplete <id: number>
```

### Removing Tasks 🌟

Removes the task with the given ID.

```shell
todz remove <id: number>
```

### Help 🌟

Displays tool information (incomplete feature).

```shell
todz help
```

## Examples 🌟

Here are some examples of how to use Todz:

- To add a new task: `todz add "Complete project report."`

- To list all incomplete tasks: `todz list --status incomplete`

- To mark a task as complete: `todz complete 1`

## Changes Log

For a detailed history of changes to this project, please refer to the [changes.log](changes.log) file in the root directory.

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Get Started 🏁

Get started with Todz today and keep your tasks organized!
