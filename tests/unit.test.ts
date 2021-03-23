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
