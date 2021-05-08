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

type SearchResult<T> = {
  id: number;
  item: T;
  searchInput: string;
  searchTerm: string;
};

/**
 * The Moogle service to save your items and search for them, using terms and keep it fast!
 *
 * @class
 * @since 1.0.0
 */
export class Moogle<T> {
  private index = new Map<string, number[]>();
  private lookupTable = new Map<number, T>();
  private cache = new Map<string, Map<number, SearchResult<T>>>();

  /**
   * Use this method to add an item to the Moogle index service
   *
   * @param {string[]} searchTerms - Search terms to be associated to an item
   * @param {T} item - Item we want to add to our Moogle
   *
   * @since 1.0.0
   */
  public addItem(searchTerms: string[], item: T) {
    // Make sure the IDs increment when storing items to the lookup table
    const id = this.lookupTable.size;

    // Add the item to the lookup table
    this.lookupTable.set(id, item);

    // Add all search terms and associate them with the item in the index
    for (const searchTerm of searchTerms) {
      const ids = this.index.get(searchTerm) || [];
      ids.push(id);
      this.index.set(searchTerm, ids);
    }
  }

  /**
   * Use this method to retrieve the current index of Moogle
   *
   *     // Example usage
   *     const moogle = new Moogle();
   *     moogle.addItem(["hello", "value"], "foo");
   *     moogle.addItem(["world", "value"], "bar");
   *     console.log(moogle.getIndex());
   *     // Map {
   *     //   "hello" => [ 0 ],
   *     //   "value" => [ 0, 1 ],
   *     //   "world" => [ 1 ]
   *     // }
   *
   * @returns {Map<string, number[]>} The current index that matches a search pattern to numbers
   *
   * @since 1.0.0
   */
  public getIndex(): Map<string, number[]> {
    return this.index;
  }

  /**
   * Use this method to retrieve the current lookup table of Moogle
   *
   *     // Example usage
   *     const moogle = new Moogle();
   *     moogle.addItem(["hello", "value"], "foo");
   *     moogle.addItem(["world", "value"], "bar");
   *     console.log(moogle.getLookupTable());
   *     // Map {
   *     //   0 => "foo",
   *     //   1 => "bar",
   *     // }
   *
   * @returns {Map<number, T>} The current lookup table that matches numbers to the "thing" you want to save
   *
   * @since 1.0.0
   */
  public getLookupTable(): Map<number, T> {
    return this.lookupTable;
  }

  /**
   * Use this method to search for a previously saved item
   *
   *     // Example usage
   *     const moogle = new Moogle();
   *     moogle.addItem(["hello"], "foo");
   *     moogle.addItem(["some random string"], "some random item");
   *     moogle.addItem(["world"], "bar");
   *     console.log(moogle.searchInput("hel"));
   *     // Map {
   *     //   0 => {
   *     //     id: 0,
   *     //     item: "foo",
   *     //     searchTerm: "hello",
   *     //     searchInput: "hel",
   *     //   },
   *     //   2 => {
   *     //     id: 2,
   *     //     item: "bar",
   *     //     searchTerm: "hello",
   *     //     searchInput: "hel",
   *     //   },
   *     // }
   *
   * @returns {Map<number, SearchResult<T>>} A map with the items that the search input matched
   *
   * @since 1.0.0
   */
  public search(searchInput: string): Map<number, SearchResult<T>> {
    const cachedMap = this.cache.get(searchInput);
    if (cachedMap) {
      return cachedMap;
    }

    const results = new Map<number, SearchResult<T>>();
    for (const [key, ids] of this.index.entries()) {
      if (key.includes(searchInput) === false) {
        continue;
      }
      for (const id of ids) {
        results.set(id, {
          id: id,
          item: this.lookupTable.get(id)!,
          searchTerm: key,
          searchInput: searchInput,
        });
      }
    }

    this.cache.set(searchInput, results);
    return results;
  }
}
