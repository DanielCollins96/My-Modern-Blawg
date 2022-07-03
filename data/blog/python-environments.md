---
title: Using Packages and Virtual Environments in Python
date: 2021-07-3
lastmod: '2022-07-03'
summary: Short post describing how to use packages and virtual environments in Python.
tags:
  - python
  - pip
authors:
  - dancollins
slug: packages-virtual-environments-python
---

## Table of Contents

- [Introduction](#introduction)
- [The `pip` Package/Library Installer](#the-pip-packagelibrary-installer)
- [Virtual Environments](#virtual-environments)
- [Creating and Using a Virtual Environment](#creating-and-using-a-virtual-environment)
  - [Installing `virtualenv` or `venv`](#installing-virtualenv-or-venv)
  - [Creating a Virtual Environment](#creating-a-virtual-environment)
  - [Activating a Virtual Environment](#activating-a-virtual-environment)
- [Leaving the Virtual Environment](#leaving-the-virtual-environment)
- [`pip` Continued](#pip-continued)

## Introduction

_Reading Resource_: [Installing Python Modules](https://docs.python.org/3/installing/index.html)

## The `pip` Package/Library Installer

> `pip` is the standard package manager for python. Python packages are usually installed from the pypi library. Starting with Python 3.4, pypi is included by default with the Python binary installers.

pip:

`pip` is the reference Python package manager. It’s used to install and update packages

pip can be updated on Windows by running:

```cmd
py -m pip install --upgrade pip
```

pip can also be updated on Mac or Linux by running:

```bash
pip install --upgrade pip
```

## Virtual Environments

To install dependencies to an isolated environment separate from your systems libraries, you can use a virtual environment. One reason you may want this is to match a specific dependency for one project you have.

> A virtual environment is a semi-isolated Python environment that allows packages to be installed for use by a particular application, rather than being installed system wide.

_Reading Resource_: [Virtual Environments and Packages](https://docs.python.org/3/tutorial/venv.html)

venv:

> Python applications will often use packages and modules that don’t come as part of the standard library. Applications will sometimes need a specific version of a library to work properly.

The `virtualenv` or `venv` (venv on Python 3.3 or newer) creates a project with a self-contained directory tree that installs a particular version of Python, plus a number of additional packages, and once activated new package installs will download to only that environment. One system can have many virtual environments on it.

## Creating and Using a Virtual Environment

_Reading Resource_: [Installing packages using pip and virtual environments](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

### Installing virtualenv or venv

> **Note**:
> If you are using Python 3.3 or newer, the venv module is the preferred way to create and manage virtual environments and it also comes pre-installed with the standard library. If you are already have venv/virtualenv, you may skip this section.

`virtualenv` is used to manage python packages for different projects. `virtualenv` allows you to avoid installing Python packages globally, which could break other tools or projects.

Installing On macOS and Linux:

`python3 -m pip install virtualenv`

Installing On Windows:

`py -m pip install virtualenv`

You can optionally add the --user flag to install virtualenv for the current user.

### Creating a Virtual Environment

A virtual environment is essentially a isolated Python installation with its own specific packages.

It is generally recommended to use a virtual environment while developing Python applications due to the added isolation and reproducibility.

To create a virtual environment, go to your project’s directory and run venv (or virtualenv for Python 2).

On macOS and Linux:

`python3 -m venv <folder location>`

On Windows:

`py -m venv <folder location>`

### Activating a Virtual Environment

Before you can start installing or using packages in your virtual environment you’ll need to activate it. Activating a virtual environment will put the virtual environment-specific python and pip executables into your shell’s PATH.

On macOS and Linux:

`source env/bin/activate`

On Windows:

`.\env\Scripts\activate`

## Leaving the Virtual Environment

If you want to switch projects or otherwise leave your virtual environment, simply run:

`deactivate`

## Pip Continued

```cmd
Usage:
  pip <command> [options]

Commands:
  install - Install packages.
  download - Download packages.
  uninstall - Uninstall packages.
  freeze - Output installed packages in requirements format.
  list - List installed packages.
  show - Show information about installed packages.
  check - Verify installed packages have compatible dependencies.
  config - Manage local and global configuration.
  search - Search PyPI for packages.
  cache - Inspect and manage pip's wheel cache.
  wheel - Build wheels from your requirements.
  hash - Compute hashes of package archives.
  completion - A helper command used for command completion.
  debug - Show information useful for debugging.
  help - Show help for commands.
```

Use `pip install <library>` to install

Use `pip freeze` or `pip list` to see all libraries installed on your current Python environment.
