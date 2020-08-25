# Say My Name

- A better name resolution (DNS) and trust model (TLS) that puts the user back in charge.

# Problems with the exiting model

- User's are unable to publish their own names easily
  - Requires going through an official Registrar that 'owns' the TLD (Top Level Domain)
- User's have no easy ability to establish trust with names
  - Requires going through a select group of 'Certificate Authorities' that somehow became blessed by...who?

# Solution
- Use the DNS _protocol_ (port 53) but replace the back end with a solution that allows for _writing_ names as well as _reading_ them.
  - If possible extend the protocol in a backwards-compatible way so publishing does not require any additional ports
- Create _one_ single CA that is under the user's total control with easy actions to add/remove trust to names (no monkeying with openssl and wrangling with web servers, just a click, or single command)
  - All existing TLS certs on web should continue to work.

# Later (Not a goal of current project, but thoughts on better trust model for the web)
  - Next step: have the _user_ trust the CA's that the browser/OS manufacturers currently trust and remove all root CA's except for the user's.
  - Final step: Remove the browser/OS trusted CA's and have the user 'OK' each new website visited. The prompt should include details like if the OS/browser trusts the website, but as a _hint_ not as a _mandate_.
