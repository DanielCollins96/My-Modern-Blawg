---
title: AWS Simple Storage Service (S3) Part 2
date: 2021-05-31
tags:
  - aws
  - storage
summary:
  - Second Part of my notes for an introductory review of AWS S3.
---

## Table of Contents

1. [Service Interactions](#service-interactions)
2. [S3 Permissions](#s3-permissions)
3. [Making Requests to S3](#making-requests-to-s3)

---

This is my second part of notes from a AWS learn course. These notes cover some of the ways S3 interacts with other AWS services. It also covers permission types and how to make requests.

## S3 Service Interactions

### S3 and Cloudfront

- Cloudfront is a Content Delivery Network (CDN).
- Customers place commonly used media or web assets in S3, and use CloudFront to distribute the assets globally.
- Cloudfront caches local copies of data in data centers close to viewers requesting the data.

### S3 and Storage Gateway

- Storage Gateway volumes and snapshots are stores in S3 as large objects.
- File gateways mount S3 buckets as Network File Systems (NFS) or Server Message Block (SMB) shares.

### S3 and Snowball

- Snowball moves large amounts of data without using the internet.
- Snowball ships a device full of empty hard drives in a RAID configuration to the customers address.
- AWS imports the data into a designated S3 bucket.

## S3 Permissions

### Access Control Lists (ACLs)

- Applied to buckets and objects
- No interaction with AWS accounts IDs
- Must use an AWS account's email address
- IAM and bucket policies recommended

### Bucket Policies

Similar to IAM resource policies.

- Restrict or grant access to specific resources in a bucket.
- All objects in a prefix can be made public.
- Prefixes can target the bucket policy as a resource so that anyone can GET objects from that prefix.

### AWS Identity and Access Management (IAM)

- IAM resource policies work with bucket policies.
- Requests against a bucket will accumulate all policy statements from IAM and the bucket to evaluate a request.

### Access Points

- Simplify access control for large, shared, or multi-tenant buckets (i.e. data-lakes)
- Allow users to access objects through dedicated access points, as well as through the bucket hostname.

### Permissions Model

- By Default, all S3 resources are set to private.
- The resource owner grants access to other AWS accounts or users through access policies or ACLs.
- Every object uploaded to S3 is owned by the account that uploaded it.
  -Bucket policies do not apply to objects that a bucket owner does not own.

## Making Requests to S3

S3 uses a RESTful API over HTTP with TCP over ports 80 and 443. S3 does not accept UDP traffic.

REST is a set of rules or constraints on how HTTP methods should be used. The API should be using rules designated by the REST constraints.

### HTTP Methods Supported by S3

1. GET
2. PUT
3. HEAD
4. DELETE
5. OPTIONS
6. POST

Reading Resource: [HTTP Request Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

S3 Can only communicate over HTTP. S3 cannot be accessed natively by SMB, NFS, or CIFS.

### Multipart Uploads

- The maximum amount of data for a single PUT request is 5 GB.
- Multipart uploading splits large objects into multiple PUT requests.
- Each PUT request in a multipart upload is considered a 'part' of the upload
- S3 allows a maximum of 10,000 parts per multipart upload.

There is also multipart downloads. Multipart downloads allow for multi-threaded downloads using range GET requests, which speeds up downloading.
