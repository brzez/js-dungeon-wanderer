# Dungeon Wanderer

A game made for the https://a-k-apart.com/ contest.

Uses nodejs (express) backend.
User data is stored in a memory session.

Js is optional. If no js present - everything will be rendered server-side.

If js is present - server will send the view data and templates to the client.
Templates are cached client-side.

Uses [js-view-engine](https://github.com/brzez/js-view-engine) for the template rendering.

### Tested in
 - lynx 2.8.8pre.4
 - chrome
 - ffx
 - ie 11 10 9
 - ie8 (no xhr mode)

### Build

```npm install```
```npm run build```

### Run

```node server.js```
