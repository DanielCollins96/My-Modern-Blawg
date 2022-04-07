---
title: Forwarding Emails to a Domain Address with Cloudflare
date: 2022-04-03
tags:
  - webdev
  - cloudflare
summary:
  - Steps for forwarding emails to an account on a domain with Cloudflare.
---

This post will cover the process of forwarding emails from a personal domain using Cloudflare. I am documenting Cloudflare's process as it is where I usually manage my DNS records.

Once you own a domain address you likely can receive emails sent to accounts aliased under that domain. Domain registrars which utilize a CPanel usually include a Forwarding section, where email addresses for that domain can be routed to another email (your personal gmail inbox for example). For this domain I have it set so I can receive emails to my personal Gmail from the 'dc@dancollins.ca' address and I'll show how that's done.

_Reading Resource_ - [Change your authoritative nameservers (Full setup)](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)

**MX Record** - The DNS Record for the IP Address of the mail server.

## Steps for Forwarding Emails to a Domain Address with Cloudflare

Once your domain's DNS records are set up you can forward emails to your domain very easily, the screenshot below shows the email routing page where you can specify the custom address under your domain and the destination address. When that is configured Cloudflare then generates all the MX Records for you.

![Email Routing](/static/images/Cloudflare-Email-Routing.png)

**Receiving emails is that easy**, but sending emails I have yet to do haha (attempted changing the reply-to settings in Gmail but that was just Reply-to), so I will update If I figure that out.
