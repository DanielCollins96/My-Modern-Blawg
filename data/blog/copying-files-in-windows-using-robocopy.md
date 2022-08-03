---
title: 'Copying Files in Windows Using Robocopy'
summary: 'Showing how to use the Robocopy Windows command'
date: '2022-05-22'
tags: [windows, how-to, cli]
---

The command `robocopy` is a standard way of copying files between directories in Windows, `robocopy` is an improvement over commands like `copy` and `xcopy`.

[Windows Robocopy Reference](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/robocopy)

`robocopy <source> <destination> [<file>[ ...]] [<options>]`

The following command moves all the files 'c:\reports\yearly-report.mov' to '\\marketing\videos' in a multi-threaded, restartable way.

```dos
robocopy c:\reports '\\marketing\videos' yearly-report.mov /mt /z
```

Important flags include:

- /mt : Creates multiple threads to copy files, which can greatly speed up the copying process.
- /s : Copies subdirectories and automatically excludes empty directories.
- /e : Copies subdirectories and includes empty directories.
- /log: \<logfile> : Outputs the log of the command to the specified logfile location.
- /z : Copies files in restartable mode which will allow a restart from the location an interrupt occurred.

The output of the command goes to the console by default. The information from the output includes the number of files copied, the number of files skipped, the number of files that failed to copy, and the number of files that were skipped due to errors. There is also information on the time the command took and the Bytes copied.
