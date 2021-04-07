<p align="center">
  <!--<img height="200" src="./logo.svg" alt="Moogle logo">-->
  <h1 align="center">Moogle</h1>
</p>
<p align="center">An easy way to "Google" your "Map" using search terms.</p>
<p align="center">
  <a href="https://github.com/drashland/moogle/releases">
    <img src="https://img.shields.io/github/release/drashland/moogle.svg?color=bright_green&label=latest">
  </a>
  <a href="https://github.com/drashland/moogle/actions">
    <img src="https://img.shields.io/github/workflow/status/drashland/moogle/master?label=ci">
  </a>
  <a href="https://discord.gg/SgejNXq">
    <img src="https://img.shields.io/badge/chat-on%20discord-blue">
  </a>
  <a href="https://twitter.com/drash_land">
    <img src="https://img.shields.io/twitter/url?label=%40drash_land&style=social&url=https%3A%2F%2Ftwitter.com%2Fdrash_land">
  </a>
  <!-- <a href="https://rb.gy/vxmeed">
    <img src="https://img.shields.io/badge/Tutorials-YouTube-red">
  </a> -->
</p>

---

The name came from that actually. You G**oogle** a **M**ap, giving you **Moogle**!

## Table of Contents

- [Rationale](#rationale)
- [How It Works](#how-it-works)
- [Guides](#guides)
  - [Starting](#starting)
  - [Creating the Moogle service](#creating-the-moogle-service)

## Rationale

Everyone likes `Array`! But they come with a problem... If you want to find a
specific object and you don't know the index where is stored in the array, you
have to iterate over the array to find it, making it a really slow.

Then let's fix it with a `Map`! Well, it's really fast if you already know the
key, but what if you just know a bit of the key? You have to iterate over all
the keys to find the ones that may match your key. It's a bummer.

What `Moogle` does is joining the best of both worlds! Making it blazing fast!

## How It Works

When `Moogle` is instantiated, it stores the lookup table you provide to it as
its `lookup_table` property. When you add items to your lookup table via
`.addItem()`:

1. Adds the first argument you provide to `.addItem()` as "search terms" and an
   "ID" to its `index` property (a `Map` with search terms and IDs -- the IDs
   are mapped to items in the lookup table); and

2. Adds the second argument you provide to `.addItem()` to the lookup table.

The search term is what you can search for in the index. If your search term
matches anything in the index, `Moogle` will take the IDs associated with the
search term and use them to target items in the lookup table.

For example, if you call `.addItem(["hello"], "world")`, the `index` property
will become the following...

    ```
    ["hello", [0]]
    ```

...and the lookup table will become the following...

    ```
    [0, "world"]
    ```

This means you can search for the following strings ...

    ```
    h
    he
    hel
    hell
    hello
    ```

...and they will all match `["hello", [0]]` in the `index` `Map`. The ID in the
`Map` (`0` in this case) is used to target the lookup table via `.get()` --
returning an item from the lookup table without having to iterate through the
entire lookup table in case it has millions of items.

You should note that each search is cached, so subsequent searches of the same
search term are 2x (sometimes faster) faster than the first search.

## Guides

### Starting

Moogle works in the browser, Node and Deno! How to do it?

In the browser:

```html
<script src="https://unpkg.com/@drashland/moogle@0.0.1"></script>
```

In Node:

```
# Using npm
$ npm install @drashland/moogle

# Using yarn
$ yarn add @drashland/moogle
```

```javascript
// JavaScript
const Moogle = require("@drashland/moogle");
const service = new Moogle();
```

```typescript
// TypeScript
import { Moogle } from "@drashland/moogle";
const service = new Moogle<MyType>();
```

In Deno:

```javascript
// JavaScript
import { Moogle } from "https://deno.land/x/moogle@v0.0.1/mod.ts";
const service = new Moogle();
```

```typescript
// TypeScript
import { Moogle } from "https://deno.land/x/moogle@v0.0.1/mod.ts";
const service = new Moogle<MyType>();
```

### Creating the Moogle service

_This uses TypeScript_

1. Instantiate Moogle.

```typescript
// Create a simple Moogle that stores <unknown> values
const service = new Moogle();
// Create a Moogle that stores a specific value
const service = new Moogle<string>();
```

2. Add items to your lookup table.

```typescript
service.addItem(["hello"], "world"); // adds ["hello", [0]] to the index
service.addItem(["again aga"], "again"); // adds ["again", [1]] and ["aga", [1]] to the index
service.addItem(["hello"], "something"); // changes ["hello", [0]] to ["hello", [0,2]] in the index
```

3. Search your lookup table.

```typescript
const results = service.search("hel");

console.log(results);
// outputs => Map {
//   0 => {
//     id: 0,
//     item: "world",
//     search_term: "hello",
//     search_input: "hel"
//   },
//   2 => {
//     id: 2,
//     item: "something",
//     search_term: "hello",
//     search_input: "hel"
//   },
// }
```
