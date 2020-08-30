# Say My Name

A Certificate Authority (CA) and REST updatable DNS for local / internal networks.

- Local name resolution (DNS) for local domains ('.local', '.home', '.corp', etc...)
- Local root CA for SSL/TLS (https) certificate creation and management via API.

# Why?

For the _public internet_ there are a _wide_ variety of DNS services and Certificate
Authorities to choose from.

There is a lack of choices for _local network_ that are easy to use, and robust enough to be trustworthy.

# Problems with the existing model

- User's are unable to publish their own names easily
  - Requires going through an official Registrar that 'owns' the TLD (Top Level Domain)
  - No DNS registrar for local reserved domains like '.local'
- User's have no easy ability to establish trust with names
  - Requires going through a select group of 'Certificate Authorities' that somehow became blessed by...who?
  - No CA will issue certs for local domains like '.local'

# Solution

Create a DNS service that serves local domain names (as well as public domain names), and allows local nodes to request certs and update IP address information on the fly via REST calls.

Create a CA/Certificate service that signs certs for local nodes, with a root certificate that the user can add to their OS/browser/application, or other list of trusted root certificates.

Combine both DNS and Certificate services into one seem-less whole.

# How to use

TBD

# Documentation

TBD

# Links

For helpful links to things related to this project see [Links](./Links.md)

# Later (Not a goal of current project, but thoughts on better trust model for the web)

- Have the _user_ trust the CA's that the browser/OS manufacturers currently trust, and remove all root CA's, except for those under the user's direct control, from devices/browsers.
- Remove the browser/OS trusted root CA's and have the user 'OK' each new website visited. The prompt should include details of others who trust the website (like Apple, Microsoft, Google, etc...), but as a _hint_ not as a _mandate_. Allow users to 'always trust' whomever they like, but always let it be the _user's_ choice on who to trust NOT the device/application.

# Blame

Matt Taylor https://mjt.dev created 'Say My Name'. It is released under the MIT license.

# Thanks

- Special thanks to @song940 who created 'dns2' https://github.com/song940/node-dns
  - The backbone of DNS services is built thanks to this library
- See [package.json](./package.json) for the full list of code dependencies.
  - Too many to name, but I wish to thank all those generous enough to share their work so freely.
