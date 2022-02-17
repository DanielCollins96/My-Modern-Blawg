---
title: Software 2.0 by Andrej Karpathy
date: 2021-02-25
tags:
  - AI
  - Machine Learning
summary:
  - Notes on Andrej Karpathy's presentation of Software 2.0
authors:
  - dancollins
---

## Background

Andrej Karpathy is a Sr. Director of AI at Tesla, his team is responsible for all nerual networks for Autopilot. His personal site is [karpathy.ai](https://karpathy.ai/ 'karpathy.ai').

The notes in this post are for Karpathy's 2018 presentation about ["The Software 2.0 Stack"](https://www.youtube.com/watch?v=y57wwucbXR8). I heard about the talk from Jim Keller who mentioned it on episode [#162](https://www.youtube.com/watch?v=G4hL5Om4IJ4&ab_channel=LexFridman '#162') of the Lex Fridman podcast.

## How Software Has Been Developed

Humans have developed fire, agriculture, mechanical machines, and electrical ones.

To develop software requires complex tools (TCP/IP, AWS, Android).

The 1.0 approach for **software** is:

1. Identify a problem
2. Break down a big problem to smaller problems
3. Design algorithms for each individual problem
4. Compose solutions into a system (a 'stack')

### Visual Recognition

One problem is the computer vision problem. It is very difficult to take a bunch of numbers (stored representation of an image) and translate it into a concept like "Is it a cat or not"

In around the 90s machine learning was a good way to solve image problems. Features of the image are extracted and models are trained. The way this software is developed is still through engineered tools for the problem.

In 2012 they decided to move towards laying out a skeleton CNN architecture, and leaving much more to the optimizations (optimizing over weights of the network). This trained the features on its own. They design less and things work better.

The trend in computer vision is that... For best results, as long as you have a evaluation criteria (loss/accuracy in a test set), the best thing to do is to design less and leave more to optimization.

![Computer Vision Chart](/static/images/Computer-Vision-Chart.png)

### AlphaZero vs Stockfish

5:30

The workforce for Software 2.0 consists of labelers and. For Tesla with 'infinite data', the question isnt "how do I train on that data, the question is how do I pick and choose intelligently what I should label, as I have to pay for it".

The problem of determining what is worth labeling, and determining when the network is uncertain and mispredicts, leads to a type of 'data engine'. To fix these problems the data engine combines microservices around the infrastructure and around massaging the data (ie. bubbling up problems from the data sets). A problem for Tesla is avoiding windshield wipers activating in tunnels.

![Data Engine Diagram](/static/images/Karpathy-software-2-0-loop.png)

Lessons learned: The toolchain for the 2.0 stack does not exist yet.

The IDE's for Software 2.0 can use:

- dataset visualization (determine label distribution and some predictions).
- Annotation tools (almost like a photoshop). Full time workers will be labeling data.
- Issue escalation. When a worker is confused they need to escalate an issue and resolve it later.

## Responses

### Chris Lattner

Chris (swift) was interviewed by Lex. Its not clear to Chris that software 2.0 is the answer to every problem, but it is a new paradigm. Programming paradigm shifts like **structured** programming (from go to's to if then's), **functional** programming like lisp (Higher order functions), **object oriented** programming (encapsulation, subclasses, inheritance), **generic** programming (code reuse, instantiations), **differential** programming (functions generate variants/derivatives of another function).

Deep learning is powerful but imperative programming is too. You wouldn't write a computers bootloader with a deep learning model, as DL is hardware and energy intensive. If you care about magnitudes of energy use, other programming paradigms are important.

Software 1.0 includes things like testing, continous integration, deployments, validation.

## Links

- [Image Net](http://www.image-net.org/ 'Image Net')
