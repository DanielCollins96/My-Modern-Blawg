---
title: Explaining Neural Network Algorithms
date: 2021-8-31
tags:
  - AI
  - Deep Learning
summary: 'A brief introduction to neural networks and some of the most popular algorithms.'
authors:
  - dancollins
slug: explaining-neural-network-algorithms
---

## Table of Contents

- [Neural Networks and Deep Learning](#neural-networks-and-deep-learning)
- [Perceptron](#perceptron)
- [Neural Network Architecture](#neural-network-architecture)
- [Convolutional Neural Networks](#convolutional-neural-networks)
- [Recurrent Neural Networks](#recurrent-neural-networks)
- [Review](#review)

## Neural Networks and Deep Learning

A Neural Network is a function that is so flexible that it can be used to solve any given problem, just by varying its weights. Gradient descent is a popular algorithm for optimizing these weights.

**Stochastic Gradient Descent** - General way to update weights of a neural network, to make or improve any task

![Training Loop](/static/images/ml-loop.png)

## Perceptron

The Perceptron is a type of linear classifier invented in 1958.

A Perceptron is basically trying to solve a rule based problem through exposure to data and learning a set of parameters.

![Perceptron Equation](/static/images/perceptron.png)

## Neural Network Architecture

Basic Neural Networks are called Multilayer Perceptrons.

Neural Networks are great with:

- Tabular Datasets
- Classification Predictions
- Regression Predictions

## Convolutional Neural Networks

Beyond the simple tasks solved with a simple Neural Network, a Convolutional Neural Network can handle more complex use cases. CNN's have become very popular with computer vision.

The general architecture of a CNN starts with input data, which is passed through filters that emphasize different aspects of the dataset. By focusing on different pieces of information (with filters), the CNN discovers internal structures of the data. After doing this many times with different filters, the CNN collects information about the dataset. The collected information is used along with a multi-layered perceptron in order to make a classification/discrimination on the data.

CNNs work well for data that has a spatial relationship.

Inputs are usually:

- Non-Temporal (Don't have multiple related frames over time)
- Tensors
- Have complex spatial hidden structure

A CNN is great when working with:

- Image Data
- Discovering Hidden Structures

## Recurrent Neural Networks

Recurrent Neural Networks are used in scenarios with temporality (like natural language processing). RNNs pass the results of a network to the next step, basically combine and pass the context of a network to a subsequent timestep. Context can be passed forward or tracked backward (confirming what a previous word was).

RNNs work well for sequence prediction problems. RNNs are great when working with:

- Text data
- Speech data
- Temporal/Delayed Inference

## Review

In Summary:

A multilayer Perceptron can be used for relatively simple tasks in a non neural-network way, i.e. linear regression, logistic regression, and random forest.

A Convolution Neural Network (CNN) can be used for discovering some internal structures of a dataset. This is used prominently in computer vision.

Recurrent Neural Networks (RNN) can be used to discover temporal patterns in data. This is used for natural language processing.
