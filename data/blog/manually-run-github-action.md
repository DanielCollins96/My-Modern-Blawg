---
title: How-To Manually Run a Github Action
summary: How to enable the manual running of a Github Action in a Github repository.
date: 2022-03-21
tags:
  - github
  - devops
---

## Manually Running a Github Action

This posts covers how to add the option of running a workflow though the Actions tab on a Github repository.

### The `workflow_dispatch` Event

**Reading Resource**: [Manually running a workflow](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow)

The `workflow_dispatch` event is used to trigger certain workflows in a repository. By adding a workflow_dispatch event to your workflows yaml file you can then manually run the workflow from the repo's Actions tab on Github.

The following is an example of a Github action file. This runs on:

- On a push to the main branch, and then at a scheduled time based on the cron value.
- Manually from the github website Actions tab

```yaml
name: Fetch Updates

on:
  push:
    branches:
      - main
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch: # <-- This allows for manual workflow dispatch
jobs:
```

You can manually trigger a workflow run using the GitHub API and from GitHub. For more information, see [Manually running a workflow](https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow).

After adding the `workflow_dispatch` event to your workflow file you will notice the 'Run Workflow' button on the Actions tab, as shown below.

![Run Workflow Button](/static/images/Run-Workflow-Action.png)

## Related Reading

### Github Action Syntax

Reading Resource: [Workflow Syntax for Github Actions](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#on)

> A workflow is a configurable automated process made up of one or more jobs. You must create a YAML file to define your workflow configuration.

### Events

Github allows for events to trigger workflows.

Reading Resource: [Events that Trigger Workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)
