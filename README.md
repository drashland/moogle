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

## Quickstart

Moogle works in Node, Deno, and in the browser. Follow the appropriate
quickstart guide below to get started quickly. We have quickstart guides for:

- Node - JavaScript
- Node - TypeScript
- Deno - JavaScript
- Deno - TypeScript
- Browser

### Quickstart: Node - JavaScript

1. Initialize your project as a Node project.

   ```shell
   $ npm init -y
   ```

   _Note: `-y` skips all of the prompts._

2. Install Moogle.

   ```
   $ npm install @drashland/moogle
   ```

3. Create your `app.js` file.

   ```javascript
   const { Moogle } = require("@drashland/moogle");
   const service = new Moogle();
   service.addItem(["hello"], "world");

   console.log(service.search("hel")); // Outputs: Map { 0 => { id: 0, item: "world", searchInput: "hel", searchTerm: "hello" } }
   ```

4. Run your `app.js` file.

   ```shell
   $ node app.js
   ```

   You should see the following output:

   ```
   Map(1) {
     0 => { id: 0, item: 'world', searchTerm: 'hello', searchInput: 'hel' }
   }
   ```

### Quickstart: Node - TypeScript

1. Initialize your project as a Node project.

   ```shell
   $ npm init -y
   ```

   _Note: `-y` skips all of the prompts._

2. Install Moogle, TypeScript, and `ts-node`.

   ```
   $ npm install @drashland/moogle
   $ npm install typescript
   $ npm install --global ts-node
   ```

3. Create your `app.ts` file.

   ```typescript
   import { Moogle } from "@drashland/moogle";
   const serviceWithoutTypes = new Moogle();
   // Or use the following syntax to specify a type (in this case, it's a string)
   // const serviceWithTypes = new Moogle<string>();
   serviceWithoutTypes.addItem(["hello"], "world");

   console.log(serviceWithoutTypes.search("hel")); // Outputs: Map { 0 => { id: 0, item: "world", searchInput: "hel", searchTerm: "hello" } }
   ```

4. Run your `app.ts` file.

   ```shell
   $ ts-node app.ts
   ```

   You should see the following output:

   ```
   Map(1) {
     0 => { id: 0, item: 'world', searchTerm: 'hello', searchInput: 'hel' }
   }
   ```

### Quickstart: Deno - JavaScript

1. Create your `app.js` file.

   ```javascript
   import { Moogle } from "https://unpkg.com/@drashland/moogle@0.0.8/lib/esm/Moogle.js";
   const service = new Moogle();
   service.addItem(["hello"], "world");

   console.log(service.search("hel")); // Outputs: Map { 0 => { id: 0, item: "world", searchInput: "hel", searchTerm: "hello" } }
   ```

2. Run your `app.js` file.

   ```shell
   $ deno run app.js
   ```

   You should see the following output:

   ```
   Map(1) {
     0 => { id: 0, item: 'world', searchTerm: 'hello', searchInput: 'hel' }
   }
   ```

### Quickstart: Deno - TypeScript

1. Create your `app.ts` file.

   ```typescript
   import { Moogle } from "https://deno.land/x/moogle@v0.0.8/mod.ts";
   const serviceWithoutTypes = new Moogle();
   // Or use the following syntax to specify a type (in this case, it's a string)
   // const serviceWithTypes = new Moogle<string>();
   serviceWithoutTypes.addItem(["hello"], "world");

   console.log(serviceWithoutTypes.search("hel")); // Outputs: Map { 0 => { id: 0, item: "world", searchInput: "hel", searchTerm: "hello" } }
   ```

2. Run your `app.ts` file.

   ```shell
   $ deno run app.ts
   ```

   You should see the following output:

   ```
   Map(1) {
     0 => { id: 0, item: 'world', searchTerm: 'hello', searchInput: 'hel' }
   }
   ```

### Quickstart: Browser

1. Create your `index.html` file.

   ```html
   <!doctype html>
   <html>
     <head>
       <title>Moogle</title>
     </head>
     <body>
       <p>Open up your console to see Moogle working.</p>
       <script type="module">
         import { Moogle } from "https://unpkg.com/@drashland/moogle@0.0.8/lib/esm/Moogle.js";
         const service = new Moogle();
         service.addItem(["hello"], "world");

         console.log(service.search("hel")); // Outputs: Map { 0 => { id: 0, item: "world", searchInput: "hel", searchTerm: "hello" } }
       </script>
     </body>
   </html>
   ```

2. Open your `index.html` file so that it opens up in your browser and open up
   the console to see Moogle working.

## Advanced Tutorial: Creating A Search Form

In this tutorial, you will create a search form where you can type in search
inputs into a search field and see the results in a results field.

1. Create your `index.html` file with the search and results fields. _Note: This
   file uses Tailwind CSS to make the UI look better._

   ```html
   <!doctype html>
   <html class="w-full h-full">

     <head>
       <title>Moogle</title>
       <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
     </head>

     <body class="p-10 w-full h-full">
       <h1 class="mb-5 text-2xl">Moogle</h1>
       <div class="mb-10 w-full">
         <p class="mb-2">Search</p>
         <input
           class="search border-solid border-2 mb-2 w-full p-2"
           type="text"
           placeholder="Search for something"
         >
         <p class="italic">Try the following searches: one, two, red, blue, fish, sh, ish, ue, ed</p>
       </div>
       <div class="w-full">
         <p class="mb-2">Results</p>
         <textarea
           class="results font-mono text-xs border-solid border-2 p-2 w-full"
           rows="15"
         >[]</textarea>
       </div>
     </body>
   </html>
   ```
2. Add the following script before the closing `</body>` tag.
   ```html
   <script type="module">
     import { Moogle } from "https://unpkg.com/@drashland/moogle@0.0.8/lib/esm/Moogle.js";

     // Set up Moogle and add some items you can search for
     const service = new Moogle();
     service.addItem(["one fish", "one", "fish"], "ONE_FISH");
     service.addItem(["two fish", "two", "fish"], "TWO_FISH");
     service.addItem(["red fish", "red", "fish"], "RED_FISH");
     service.addItem(["blue fish", "blue", "fish"], "BLUE_FISH");

     // Set up event handlers for the DOM
     const searchElement = document.querySelector(".search");
     searchElement.addEventListener("keyup", search);

     /**
      * Search for an item in Moogle's lookup table.
      */
     function search() {
       let results = [];
       const searchInput = searchElement.value.trim();

       if (searchInput == "") {
         return setResults(results);
       }

       const resultsFromService = service.search(searchInput);

       resultsFromService.forEach((item) => {
         results.push(item);
       });

       setResults(results);
     }

     /**
      * Set the given results in the results textarea DOM element.
      */
     function setResults(results) {
       const resultsElement = document.querySelector(".results");
       resultsElement.value = JSON.stringify(results, null, 4);
     }
   </script>
   ```
   This script will set up Moogle, add items to Moogle's lookup table so that
   you can search for them, and set up event handlers in the DOM so that the
   search field and results field work as expected.

3. Open up the `index.html` to load it in your browser.

4. Enter some search terms in the browser and see the results you get in the
   results element.

## Why Use Moogle?

Everyone likes `Array`, but they come with a problem. If you want to find an
item in an array and you don't know the index of that item, then you have to
iterate over the entire array to find the item. This is slow.

To make the process faster, you can use `Map`. You can quickly find an item in a
`Map` if you know the key to the item. However, if you only know a bit of the
key, then the process of finding that item is just like the array -- you have to
iterate over the entire map to find your item.

So... introducing Moogle! Moogle takes `Maps` to another level -- making them
searchable and blazing fast!

## How It Works

### At a high level

When you instantiate the `Moogle` class, it sets up an index, a lookup table,
and a cache table. From there, you add items to your index and lookup table
using `addItem()`. On initial lookups, Moogle will search the lookup table. On
subsequent lookups (using the same search terms), Moogle will use the cache
table -- making subsequent searches faster. The index is where Moogle stores
associations between search terms and items in the lookup table.

When you add items via `addItem()`, you are providing the function with two
arguments: (1) an array of search terms and (2) the item associated with the
search terms. This makes it so that you can search for the item using the search
terms (or parts of the search terms if you do not know the full search terms).

### At a low level

Let us say you have instantiated Moogle via `const m = new Moogle()`. If you
call `m.addItem(["hello", "world"], "world");`, Moogle will take the array of
search terms and assign them an ID in the index like so:

```
// This is what the index looks like as of now
["hello", [0]]
["world", [0]]
```

After that, Moogle will take the ID it used for the search terms and assign it
to the item like so:

```
// This is what the lookup table looks like as of now
[0, "world"]
```

These associations mean you can search for the following strings ...

```
h
he
hel
hell
hello
w
wo
wor
worl
world
```

... and they will all match `["hello", [0]]` or `["world", [0]]` in the index.

The assigned ID comes into play when the actual search in Moogle happens. Say
you have searched for `hel`. Moogle will match `hel` to `["hello", [0]]` in the
index. It will then take the ID associated with the search term and match it to
an item in the lookup table using `lookupTable.get(0)`. In this case, the
`.get()` call will be matched to `[0, "world"]` in the lookup table. So what you
get back is a search result in the following schema:

```typescript
Map {
  0 => {
    id: 0,
    item: "world",
    searchInput: "hel",
    searchTerm: "hello"
  }
}
```

In short, Moogle takes the search term, uses the ID associated with that search
term in a `.get()` call on the lookup table, and returns the item associated
with the ID -- all without having to iterate through the entire lookup table in
case it has millions of items. This is why Moogle is quick.

Again, each search is cached, so subsequent searches of the same search terms
are faster than the first search.
