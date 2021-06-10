# Benchmarks

## Table of Contents

- [Benchmark Runs](#benchmark-runs)
  - [performance.now()](#performancenow)
  - [In An HTTP Server](#in-an-http-server)

## Benchmark Runs

### performance.now()

The below benchmarks were run with a set number of items in each `Map`; and
using `performance.now()` to check how long `.forEach()` method took to return a
record. The benchmarks application searched for the last item in each `Map`.
Below are the average times showing how long it took searches to complete and
what method was used.

Command used:

```
$ deno run -A benchmarks/app.ts [map|service] [number of seconds] [number of records to create]
```

#### Results

```
Performing search with 1,000 records(s) for 10s.
Searching took an avg of 0.00002s using Map.forEach().
Searching took an avg of 0.00001s using IndexService.search().

Performing search with 10,000 records(s) for 10s.
Searching took an avg of 0.00014s using Map.forEach().
Searching took an avg of 0.00001s using IndexService.search().

Performing search with 100,000 records(s) for 10s.
Searching took an avg of 0.00136s using Map.forEach().
Searching took an avg of 0.00001s using IndexService.search().

Performing search with 1,000,000 records(s) for 10s.
Searching took an avg of 0.01379s using Map.forEach().
Searching took an avg of 0.00001s using IndexService.search().
```

### In An HTTP Server

The benchmarks below show how the index service performs in an HTTP server. The
dataset that was searched had 10,000,000 records. The search term used was
"Happy"; and the index service had to return records that included the word
"Happy". The index service returned 50,000 records per request.

Command used:

```
$ deno run --allow-net app_http.ts [number of records to create]
$ wrk -c 40 -d 10 http://localhost:8000/{searchTerm}
```

#### Results

```
Running 10s test @ http://localhost:8000/Happy
  2 threads and 40 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.64ms   12.61ms 191.42ms   98.48%
    Req/Sec    15.99k     1.85k   17.19k    94.95%
  315254 requests in 10.01s, 18.34MB read
Requests/sec:  31503.92
Transfer/sec:      1.83MB
```
