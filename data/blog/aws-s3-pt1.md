---
title: AWS Simple Storage Service (S3) Part 1
date: 2021-05-31
tags:
  - aws
  - storage
summary:
  - First Part of my notes for an introductory review of AWS S3.
authors: ['dancollins']
---

## Table of Contents

1. [Terminology](#terminology)
2. [Storage Classes](#storage-classes)
3. [S3 Bucket Features](#s3-bucket-features)
4. [S3 Batch Operations](#s3-batch-operations)
5. [S3 Access Points](#s3-access-points)
6. [S3 Select](#s3-select)
7. [S3 Access Control (Block Public Access)](#s3-access-control-block-public-access)
8. [S3 Common Limits](#s3-common-limits)

---

**S3 is a flat object store, S3 is not a 'filesystem'.**

In object storage, each object consists of data, metadata, and a key.

_Reading Resources_:

- [Amazon S3 Resources](https://aws.amazon.com/s3/developer-resources/)
- [File storage, block storage, or object storage?](https://www.redhat.com/en/topics/data-storage/file-block-object-storage)
- [What is Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

## Terminology

### Buckets

- Identify where an object belongs
- Objects are store in buckets in lexicographical order

### Object

- Logical entities or containers with information used to store data on S3 (like files)
- Can contain any data, usually bytes in a specific order

### Prefix

- Name or characters before an object name
- Ends with a forward slash (/)
- Example: bucketName/\<prefix>/objectName.jpg

### Key

- Unique name and path to an object in S3
- Excludes the bucket name

### Value

- Literal character that correspond to a key
- Example: \<key> : \<value>

### Version ID

- When enables, allows multiple copies of an object using the same object name, each with a unique version ID

### Metadata

- Key-Value pairs that describe an object
- Standard HTTP metadata includes object content type
- Custom metadata can be specified

### Access Control

- Originally used before Identity Access Management (IAM) for controlling access to objects

## Storage Classes

Amazon S3 offers a range of storage classes designed for different use cases.

_Reading Resources_:

- [Amazon S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
- [Amazon S3 pricing](https://aws.amazon.com/s3/pricing/)

Storage Types:

- S3 Standard (The default, good for frequent access)
- S3 Intelligent-Tiering
- S3 Standard-Infrequent Access
- S3 One Zone-Infrequent Access
- S3 Glacier
- S3 Glacier Deep Archive (Cheapest option, retrieval can take up to 12 hours)

## S3 Bucket Features

### S3 Bucket Properties Tab

#### **Versioning**

_Reading Resource_: [Using Versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)

Once versioning is enabled, every new object get a version ID.

#### **Server Access Logging**

Provides detailed records of requests for a bucket.

_Reading Resource_: [Logging requests using server access logging](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ServerLogs.html)

#### **Static Web Hosting**

_Reading Resource_: [Static Web Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

Web pages contain static content and some client-side scripts.

#### **Object-level Logging**

_Reading Resource_: [CloudTrail Event Logging](https://docs.aws.amazon.com/AmazonS3/latest/userguide/enable-cloudtrail-logging-for-s3.html)

This allows AWS CloudTrail to log data events for objects in an S3 bucket.

#### **Default Encryption**

_Reading Resource_: [Enabling Encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html)

Automatically encrypt new objects with selected encryption type. Options of S3 server-side encryption, AWS managed encryption key, or AWS managed encryption key. The default encrypts the customers data at rest.

#### **Advanced Settings**

Includes:

- [Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html), locking an object until a specific date.
- [Tags](https://docs.aws.amazon.com/AmazonS3/latest/userguide/CostAllocTagging.html), track the storage cost or other criteria for individual projects.
- Transfer Acceleration
- [Events](https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html), trigger actions based on an event, like a lambda function
- Requester Pays, requestor pays cost of retrieving an object

### S3 Bucket Management Tab

- [Lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html), transition objects into other storage classes
- [Replication](https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html)
- [Analytics](https://docs.aws.amazon.com/AmazonS3/latest/userguide/analytics-storage-class.html)
- [Metrics](https://docs.aws.amazon.com/AmazonS3/latest/userguide/metrics-configurations.html), CloudWatch Metrics.
- [Inventory](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html#storage-inventory-contents)

## S3 Batch Operations

_Reading Resource_: [Performing large-scale batch operations on Amazon S3 objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops.html)

> You can use S3 Batch Operations to perform large-scale batch operations on Amazon S3 objects. S3 Batch Operations can perform a single operation on lists of Amazon S3 objects that you specify. A single job can perform a specified operation on billions of objects containing exabytes of data. Amazon S3 tracks progress, sends notifications, and stores a detailed completion report of all actions, providing a fully managed, auditable, and serverless experience. You can use S3 Batch Operations through the AWS Management Console, AWS CLI, AWS SDKs, or REST API.

S3 Batch Operations can set a job to execute batch operations on a list of S3 objects contained in a manifest object.

## S3 Access Points

- Simplifies access control for large, shared, or multi-tenant buckets.
- Allow applications or users to interact with a multi-tenant bucket via a dedicated access point and with custom permissions.

_Reading Resource_: [Managing data access with Amazon S3 access points](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html)

> Amazon S3 access points simplify managing data access at scale for shared datasets in S3. Access points are named network endpoints that are attached to buckets that you can use to perform S3 object operations, such as GetObject and PutObject. Each access point has distinct permissions and network controls that S3 applies for any request that is made through that access point. Each access point enforces a customized access point policy that works in conjunction with the bucket policy that is attached to the underlying bucket.

## S3 Select

- The S3 Select feature can run SQL queries in place against CSV and JSON objects.

_Reading Resource_: [Filtering and retrieving data using Amazon S3 Select](https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html)

> With Amazon S3 Select, you can use simple structured query language (SQL) statements to filter the contents of an Amazon S3 object and retrieve just the subset of data that you need. By using Amazon S3 Select to filter this data, you can reduce the amount of data that Amazon S3 transfers, which reduces the cost and latency to retrieve this data.

### S3 Select Requirements and Limits

- You must have `s3:GetObject` permission for the object you are querying.
- You must use `https` and provide the encryption key when the object you are querying is encrypted (SSE-C).
- Max length of a SQL expression is 256kb.
- S3 Select can only emit nested data using the JSON output format.

### S3 Select Errors

Amazon S3 Select returns an error code and an error message when an issue is encountered.

_Reading Resource_: [List of SELECT Object Content Error Codes](https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html#SelectObjectContentErrorCodeList)

### S3 Select SQL Reference

_Reading Resource_: [SQL reference for Amazon S3 Select and S3 Glacier Select](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-glacier-select-sql-reference.html)

## S3 Access Control (Block Public Access)

Public Access is granted through access control lists (ACLs), bucket policies, access point policies, or a combination.

_Reading Resource_: [Blocking public access to your Amazon S3 storage
](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html)

> With S3 Block Public Access, account administrators and bucket owners can easily set up centralized controls to limit public access to their Amazon S3 resources that are enforced regardless of how the resources are created.

## S3 Common Limits

- Hard limit of 1,000 buckets per account
- No limit to the amount of data/objects in a bucket
- Hard limit of a 100 event notifications and 1,000 lifecycle rules per bucket
- Bucket policies are limited to 20KB
- Maximum object size is 5TB
- Maximum HTTP put request size is 5GB
- Maximum size for a multi-part upload is 5GB
- Maximum number of parts for a multi-part upload is 10,000

_Reading Resource_: [Best practices design patterns: optimizing Amazon S3 performance](https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html)

> Your applications can easily achieve thousands of transactions per second in request performance when uploading and retrieving storage from Amazon S3. Amazon S3 automatically scales to high request rates. For example, your application can achieve at least 3,500 PUT/COPY/POST/DELETE or 5,500 GET/HEAD requests per second per prefix in a bucket. There are no limits to the number of prefixes in a bucket. You can increase your read or write performance by parallelizing reads.
