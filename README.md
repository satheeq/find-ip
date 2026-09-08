# find-ip

A small test project for finding a machine's **private (LAN) IP** and **public (internet-facing) IP** addresses from Node.js.

It's split into two independent, standalone examples:

```
find-ip/
├── private-ip/          # Reads the local network interfaces (no external calls, no deps)
└── public-ip/
    ├── node14/           # CommonJS example, for Node <= 14 (require)
    └── node18/           # ESM example, for Node >= 18 (import/await)
```

## private-ip

Finds the device's private IPv4 address by inspecting the OS network interfaces — no network request is made and no dependencies are required.

- [`ip-address.js`](private-ip/ip-address.js) — exports `ip.address()`, which:
  - Enumerates all network interfaces via `os.networkInterfaces()`
  - Filters out loopback (`127.x.x.x`, `::1`, etc.) and non-IPv4 entries
  - Returns the first matching address, falling back to `192.168.0.1` if none is found
- [`main.js`](private-ip/main.js) — simple entry point that requires `ip-address.js` and prints the result

### Run

```bash
cd private-ip
node main.js
```

`ip-address.js` also logs its own result when run directly:

```bash
cd private-ip
node ip-address.js
```

## public-ip

Finds the device's public IPv4/IPv6 address (as seen from the internet) using the [`public-ip`](https://www.npmjs.com/package/public-ip) package, which queries external IP-lookup services. Two variants are included because `public-ip` dropped CommonJS support in later major versions:

### node18 (ESM, `public-ip` v8)

- [`runner.js`](public-ip/node18/runner.js) — uses `import` and top-level `await`

```bash
cd public-ip/node18
npm install
node runner.js
```

Requires Node.js 18+ (ESM module, `"type": "module"` in [package.json](public-ip/node18/package.json)).

### node14 (CommonJS, `public-ip` v4.0.4)

- [`runner.js`](public-ip/node14/runner.js) — uses `require` and an async IIFE

```bash
cd public-ip/node14
npm install
node runner.js
```

Works on older Node.js versions (CommonJS module).

## Notes

- Both `public-ip` examples require internet access at runtime, since they call out to external services to determine the public-facing address.
- `private-ip` works fully offline.
