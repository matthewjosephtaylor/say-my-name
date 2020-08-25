

# The loop of names and trust

- User A tells smn to create a cert for a name
  - smn creates a cert and signs it for the given name
- User A installs cert on web server
- User A updates IP (or other record info) as needed via REST calls which provides the cert as proof of ownership
  - IMPORTANT: the web-server or other trusted software under user's control can now update DNS as needed!

- User B will need to add the smn CA to their root CA list _once_
- User B asks smn to resolve a name
  - smn checks internal DB for IP/records and returns it if found
  - smn falls back on 'legacy DNS' 
- Victory!
  - clients can request names and have trust in them
  - servers can update IP (and other record info) as needed in a secure way

# World Domination (Bonus Points)
- Continue using the old system of 'trusted' CA's, now with the ability for users to _easily_ opt in/out of trusting a CA.
  - The vetting the old system does, continues have value, so continue to use it.
    - I trust X and so will update the list of CAs I trust according to who _they_ trust (X being Google, Apple, etc...) (what is the intersection of trust?)
  - Easily integrate new naming systems like namecoin and such, allowing the user to choose what _systems_ of naming they like.