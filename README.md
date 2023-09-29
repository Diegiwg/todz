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

You can install Todz globally using npm:

```shell
npm install -g todz
```

## Usage 🧑‍💻

### Create the Database

To create the default database, run the following command:

```shell
todz init
# print: Successfully created database.
```

#### Set the Database Path

You can set the database path using the `--path` flag:

```shell
todz init --path <db_path:json file>
# print: Successfully created database.
```

### Add a New Task

To add a new task, use the following command:

```shell
todz add "Task description goes here"
# print: Successfully added task, with ID: <task_id:number>.
```

### List Tasks

To list all tasks, use:

```shell
todz list
# print(list): <task_id:number>: Task description goes here.
```

### Mark Task as Complete

Mark a task as complete by specifying its ID:

```shell
todz complete <task_id:number>
# print: Successfully completed task, with ID: <task_id:number>.
```

### Mark Task as Incomplete

Mark a task as incomplete by specifying its ID:

```shell
todz incomplete <task_id:number>
# print: Successfully marked task as incomplete, with ID: <task_id:number>.
```

### Filter Tasks

You can filter tasks by status (complete or incomplete) using the `--status` flag:

```shell
todz list --status complete
# print(list): <task_id:number>: Task description goes here.
```

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Get Started 🏁

Get started with Todz today and keep your tasks organized!
