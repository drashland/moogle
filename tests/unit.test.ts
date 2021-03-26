/*
 * MIT License
 *
 * Copyright (c) 2021 Drash Land
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Moogle } from "../mod.ts";
import { assertEquals } from "../deps.ts";

Deno.test({
  name: "adds an item to the index and lookup table",
  fn: function () {
    const moogle = new Moogle();
    moogle.addItem(["ok"], "ok value");
    moogle.addItem(["hello1"], "hello value 1-1");
    moogle.addItem(["hello1"], "hello value 1-2");
    moogle.addItem(["hello2"], "hello value 2");
    moogle.addItem(["world"], "world value");
    moogle.addItem(["skrrrt"], "skrrrt steak value");
    moogle.addItem(["test"], "test value");

    assertEquals(
      moogle.search("tes"),
      new Map<number, unknown>([
        [
          6,
          {
            id: 6,
            item: "test value",
            searchTerm: "test",
            searchInput: "tes",
          },
        ],
      ]),
    );
  },
});

Deno.test({
  name: "returns the index",
  fn: function () {
    const moogle = new Moogle();
    moogle.addItem(["ok"], "ok value");
    moogle.addItem(["hello1"], "hello value 1-1");
    moogle.addItem(["hello1"], "hello value 1-2");
    moogle.addItem(["hello2"], "hello value 2");
    moogle.addItem(["world"], "world value");
    moogle.addItem(["skrrrt"], "skrrrt steak value");
    moogle.addItem(["test"], "test value");

    assertEquals(
      moogle.getIndex(),
      new Map<string, number[]>([
        ["ok", [0]],
        ["hello1", [1, 2]],
        ["hello2", [3]],
        ["world", [4]],
        ["skrrrt", [5]],
        ["test", [6]],
      ]),
    );
  },
});

Deno.test({
  name: "returns search results",
  fn: function () {
    const moogle = new Moogle();
    moogle.addItem(["ok"], "ok value");
    moogle.addItem(["hello1"], "hello value 1-1");
    moogle.addItem(["hello1"], "hello value 1-2");
    moogle.addItem(["hello2"], "hello value 2");
    moogle.addItem(["world"], "world value");
    moogle.addItem(["skrrrt"], "skrrrt steak value");

    assertEquals(
      moogle.search("hello"),
      new Map<number, unknown>([
        [
          1,
          {
            id: 1,
            item: "hello value 1-1",
            searchInput: "hello",
            searchTerm: "hello1",
          },
        ],
        [
          2,
          {
            id: 2,
            item: "hello value 1-2",
            searchInput: "hello",
            searchTerm: "hello1",
          },
        ],
        [
          3,
          {
            id: 3,
            item: "hello value 2",
            searchInput: "hello",
            searchTerm: "hello2",
          },
        ],
      ]),
    );
  },
});
