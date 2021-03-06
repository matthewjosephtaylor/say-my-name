# Say My Name

A Certificate Authority (CA) and DNS for local / internal networks

- Local name resolution (DNS) for local domains ('.local', '.home', '.corp', etc...)
- Local root CA for SSL/TLS (https) certificate creation and management
- Both names and certificates managed via REST API

# Status

PRE-ALPHA! Feel free to examine code, but things aren't quite ready for release yet. SEE [ROADMAP](./ROADMAP.md)

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

1. Build the project (see Building)
2. Start the docker container on a host
3. Use host IP as the DNS server for nodes and devices

- Example: `docker --dns 10.0.0.42`

4. Configure nodes to `POST /claim { address : "{ip-address}" }` a DNS name and set IP address for name via the REST API

- Returns signed certificate, and private-key:

```json
{
  "cert": "{BASE-64-encoded}",
  "key": "{BASE-64-encoded}"
}
```

- Certificate and key MUST be base-64 decoded before they can be used.

5. Configure nodes with signed cert,private-key pair that was obtained in `/claim` REST API call (see [examples/nginx](./examples/nginx))
6. Periodically update IP address for DNS name via `POST /name { "address" : "{ip-address}"}`
7. Obtain your local 'Say My Name' root CA cert via `GET /root` or from a browser like `https://{docker-host}:5444/root` (cert should download from browser)

- Install and trust the root CA on devices/applications connected to the local network
  - MacOS: (Example TBD)
  - Windows: (Example TBD)
  - Linux: (Example TBD)
  - Node: (Example TBD)
  - Java: (Example TBD)

# Documentation

See [Html DOCS](https://matthewjosephtaylor.github.io/say-my-name/html/index.html) for source documentation in HTML format

See [Markdown DOCS](https://github.com/matthewjosephtaylor/say-my-name/blob/master/docs/markdown/README.md) for source documentation in Markdown format

See [API](API.md) for API documentation.

## Prerequisites

- Docker: https://docs.docker.com/get-docker/
- Unix-like OS: https://en.wikipedia.org/wiki/Unix-like

## How to Download Project

- Click to [Download Zip](https://github.com/matthewjosephtaylor/say-my-name/archive/master.zip)

- Git clone source:

```shell
$ git clone https://github.com/matthewjosephtaylor/say-my-name.git
```

## Building

```shell
$ cd say-my-name/scripts
$ ./build
```

## Starting

```shell
$ cd say-my-name/scripts
$ ./build
```

## Backups

Backups are suggested but not required.

In the event that the root CA key is lost, no new node certs can be generated with that key. Existing node certs will continue to work fine until they expire.

In the event that the root server is lost, re-install a new server at the same location, and install the new 'Say My Name Root CA' certificate on internal network devices.

Nodes with existing keys will 'claim' new names without interruption, as long as the root server is at the same location.

All server data is stored in the `data` directory

### A simple backup procedure for backing up data

```shell
$ cd say-my-name/data
$ tar -cvzf <backups-folder>/private-key-backups.tgz .
```

### A simple restore procedure for backed up data

```shell
$ cd say-my-name/data
$ tar -xvf <backups-folder>/private-key-backups.tgz .
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
| Generate Docs          | docs         |
| DNS lookup             | query-record |
| Update DNS address     | set-record   |
| Start docker container | start        |
| Stop docker container  | stop         |
| Show container logs    | logs         |
| Shell into container   | shell        |

## API

See [API](API.md) for API documentation.

# Examples

See the [examples](./examples) for a sets of bash scripts and Dockerfiles for how to:

- Setup [nginx](./examples/nginx) with SSL/TLS certs
  - The certs generated by this project still need to be incorporated into whatever software the developer is using. This is an example for how to use 'Say My Name' with nginx to serve a simple web page.
- Use [openssl](./examples/openssl) to create things like CA root certs, and sign node certs.
  - This project should alleviate this tediousness. Good information on how to use openssl to generate/sign certs is tricky to find, I've tested that these methods work.

# Links

For helpful links to things related to this project see [LINKS](./LINKS.md)

# Road Map

Currently the project is in active development, and is not in a usable form. Feel free to look at the code, but I wouldn't recommend using just yet.

See [ROADMAP](./ROADMAP.md) for current project state.

# Later

For ideas on how this project, or other related projects, might progress see [LATER](./LATER.md)

# Blame

Matt Taylor https://mjt.dev created 'Say My Name'. It is released under the MIT license.

# Thanks

- Special thanks to [Liu Song](https://lsong.org/) who created 'dns2' https://github.com/song940/node-dns
  - The backbone of DNS services is built thanks to this library
- See [package.json](./package.json) for the full list of code dependencies.
  - Too many to name, but I wish to thank all those generous enough to share their work so freely.
