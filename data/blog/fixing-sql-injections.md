---
title: Finding and Fixing a SQL Injection in My Website
date: 2023-09-24
tags:
  - sql
  - security
  - webdev
summary:
  - Fixing my websites SQL injection vulnerability
---

_This post is a quick run through of how I confirmed a SQL Injection vulnerability I had and how I resolved it_

This weekend, I added draft data to my NHL website project ([link](https://www.the-nhl.com/)) and in the process confirmed a sneaking suspicion I had. To my alarm, but not entirely to my surprise, I uncovered SQL Injection vulnerabilities on my site, which queries a Postgres database for the stats, including team and player data.

In the process of lazily adding another raw database query to my Next.js projects lib folder, I decided I might as well try and inject some "malicious" SQL into my sites URL, I then promptly crashed my live application, simply from selecting all on a 500k+ row table.

## SQL Injection Background

For those unfamiliar with SQL Injections it should be known that they are consistently ranked among the top risk listed by OWASP (Open Web Application Security Project). Any site that uses strings and string concatenation to construct a query which includes user input is at risk.

**Resource** - [OWASP Cheat Sheet SQL Injection](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

The primary defense against SQL Injections is the use of prepared statements, which bind user input into a well-defined query. This approach, also known as parameterized queries, stop common SQL injection techniques, such as making a statement always true (adding `OR 1 = 1`) or batching on a second query with a semicolon (`;DROP TABLE users`).

## My Site's SQL Injection

My NHL Stats site has several pages that take a number input (usually set in the route or the query parameters) for database filtering. This is one such query used on the player page to pull in all fields related to a player's personal info:

```sql
-- Raw SQL used in my Javascript backend
SELECT *
FROM staging1.player p
WHERE p.id = ${id}
```

The query above is susceptible to SQL Injection, if an attacker knows how to manipulate the `${id}` variable from the front end than they can cause the database to run malicious code.

Heres the URL that links to that SQL Query:
`https://www.the-nhl.com/players/8480849`

And heres a malicious URL (browser will fill while space):
`https://www.the-nhl.com/players/8480849 OR 1= 1`

In the second example, the addition of `OR 1=1` makes the query select from the entire table, causing the application to crash with a 504 timeout-error.

## How I Fixed It

Luckily I was using a robust and widely adopted Javascript package for querying Postgres, called 'pg' ([Github Repo Here](https://github.com/brianc/node-postgres)). With the node-postgres package I quickly switched my previous insecure code, shown here:

```js
// insecure query
const stats = `
  SELECT *
  FROM staging1.player p
  WHERE p.id = ${id}
  `
let result = await conn.query(stats)
```

With parameterized code:

```js
const stats = `
  SELECT *
  FROM staging1.player p
  WHERE p.id = $1
  `
// id is parameterized and safe from SQL Injection
let result = await conn.query(stats, [id])
```

## Conclusion

It really was as simple as changing `${id}` to `$1` and providing the paramater in the second argument.
