# Say My Name

A Certificate Authority (CA) and REST API updatable DNS for local / internal networks.

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
  - Docker containers don't play nicely with mDNS
- User's have no easy ability to establish trust with names
  - Requires going through a select group of 'Certificate Authorities' that somehow became blessed by...who?
  - No CA will issue certs for local domains like '.local'
  - Creating self-signed certs is a dark art form, and getting browsers and other software to trust and use self-signed certs can be difficult-to-impossible.

# Solution

Create a DNS service that serves local domain names (as well as public domain names), and allows local nodes to request certs and update IP address information on the fly via REST calls.

Create a CA/Certificate service that signs certs for local nodes, with a root certificate that the user can add to their OS/browser/application, or other list of trusted root certificates.

Combine both DNS and Certificate services into one seamless whole.

# How to use

TBD

# Documentation

## Prerequisites

- Docker: https://docs.docker.com/get-docker/
- Unix-like OS: https://en.wikipedia.org/wiki/Unix-like

## How to Download Project

- Click to [Download Zip](https://github.com/matthewjosephtaylor/say-my-name/archive/master.zip)

- Git clone source:

```shell
git clone https://github.com/matthewjosephtaylor/say-my-name.git
```

## Building

```shell
cd say-my-name/scripts
./build
```

## Script Commands

Found in say-my-name/[scripts](./scripts)

Most scripts can be called with `--help` to get usage information.

These scripts also work as examples for how to use the 'Say My Name' services, and sometimes include useful hints on REST API usage.

See say-my-name/[scripts/config](./scripts/config) for configuration settings.

| Description            | command      |
| ---------------------- | ------------ |
| Build Project          | build        |
| Build and Run          | devloop      |
| Run Tests              | tests        |
| DNS lookup             | query-record |
| Update DNS address     | set-record   |
| Start docker container | start        |
| Stop docker container  | stop         |

# Examples

See the [examples](./examples) for a sets of bash scripts and Dockerfiles for how to:

- Setup [nginx](./examples/nginx) with SSL/TLS certs
  - The certs generated by this project still need to be incorporated into whatever software the developer is using. This is an example for how to use 'Say My Name' with nginx to serve a simple web page.
- Use [openssl](./examples/openssl) to create things like CA root certs, and sign node certs.
  - This project should alleviate this tediousness. Good information on how to use openssl to generate/sign certs is tricky to find, I've tested that these methods work.

# Links

For helpful links to things related to this project see [Links](./LINKS.md)

# Road Map

Currently the project is in active development, and is not in a usable form. Feel free to look at the code, but I wouldn't recommend using just yet.

See [Roadmap](./ROADMAP.md) for current project state.

# Later

Things that are not a goal of current project, but are ideas for later projects.

## Thoughts on better trust model for the web

- Have the _user_ trust the CA's that the browser/OS manufacturers currently trust, and remove all root CA's, except for those under the user's direct control, from devices/browsers.
- Remove the browser/OS trusted root CA's and have the user 'OK' each new website visited. The prompt should include details of others who trust the website (like Apple, Microsoft, Google, etc...), but as a _hint_ not as a _mandate_. Allow users to 'always trust' whomever they like, but always let it be the _user's_ choice on who to trust NOT the device/application.

# Blame

Matt Taylor https://mjt.dev created 'Say My Name'. It is released under the MIT license.

# Thanks

- Special thanks to [Liu Song](https://lsong.org/) who created 'dns2' https://github.com/song940/node-dns
  - The backbone of DNS services is built thanks to this library
- See [package.json](./package.json) for the full list of code dependencies.
  - Too many to name, but I wish to thank all those generous enough to share their work so freely.
