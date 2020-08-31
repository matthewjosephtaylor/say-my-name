# Later

Things to think about for the future.

# Possible evolutions of current project

- Become [ACME](https://tools.ietf.org/html/rfc8555) compliant?

## Thoughts on better trust model for the web

- Have the _user_ trust the CA's that the browser/OS manufacturers currently trust, and remove all root CA's, except for those under the user's direct control, from devices/browsers.
- Remove the browser/OS trusted root CA's and have the user 'OK' each new website visited. The prompt should include details of others who trust the website (like Apple, Microsoft, Google, etc...), but as a _hint_ not as a _mandate_. Allow users to 'always trust' whomever they like, but always let it be the _user's_ choice on who to trust NOT the device/application.
