---
path: /blog/easy-caching-with-nginx-openresty/
title: Easy Caching with Nginx/OpenResty
date: 08/25/2019
categories: Nginx, OpenResty, Caching
---

Web response time is a metric makers of web use that has a clear impact
on if potential prospects will stay on your site and give you their money or
leave before you even have a chance to woo them. Another very obvious problem is reliability. When
we make an api request, or request a remote stylesheet or javascript asset, we expect it to given to us. These two problems can be addressed very elegantly and succinctly by using nginx out of the box caching capabilities.

Caching is hard and when we begin to work out our caching strategy there are important questions we must answer. Some of these include:

 1. Do we do an in-process cache for one service or an out-of-process cache that multiple services can benefit from

 2. If we want to do out-of-process caching. How do we do it?

 3. What if an upstream service is failing, how can we continue to serve the response if cached?

 4. How to handle cache invalidation?

There a ton of ways we could go about solving each one of these problems using different software packages, caching applications etc. It would also depend on the skills of your team, the throughput demands required by the system, and assuming you are not starting from scratch, leveraging what you have already built would be ideal. If you are starting from scratch... Nice! Have fun!

Let's address the four questions posed above. We will address them by using features that nginx offers us out of the box in the community edition. Certainly, if you have the $$$ check out nginx+, but none of these solutions will require it.

Also for the purposes of this article we will only be focused on caching "safe" requests (`GET`, `HEAD`, `OPTIONS`). Caching non-safe request methods like `POST` requires other considerations when it comes to both fast response time, resilliency, and managing complexity. In these cases you might investigate using a `cache-aside` or `read-through/write-through` pattern. Both of these topics could posts by themselves.

This blog is also focused on eventual consistency not strong consistency caching. If you are unfamiliar with these two terms here is a quick catch-up:

*Strong consistency*: data in a source of record gets updated to all consumers as soon as a write request is made.

*Eventual consistency*: data that gets updated in a source of record that gets updated to all consumers eventually, but not at the time of write neccesarily.

I've found that typically eventual consistency in caching for most web development is typically ok. Also eventual consistency is not so bad since nginx can handle traffic with only a few instances in the majority of cases.

If you are interested in a strongly consistent approach here are a few options:

1. Skip to the bottom of this article where we discuss adding a distributed redis cache.

2. It requires a commercial subscription, but [checkout nginx+ cache clustering](https://www.nginx.com/blog/shared-caches-nginx-plus-cache-clusters-part-1/).

<a id="In-Process-vs-Out-of-Process-Application-Cache"></a>

### In-Process vs Out-of-Process Application Cache

In the world of software architecture. Less is always more! When you are building a solution an important question to ask is, could this be simplier. If you have one node service for example. It might just make sense to have an in memory store in that service to handle the caching as opposed to spinning up an a separate cache. This might be better considering the inherant complexity when you create an in memory cache. I've definitely gotten bitten on a couple occasions from using code that leveraged an in process cache. This I think was due to the over-complexity of the implementation, stemming from what I think is a lack of a standard approach to this problem. There are alot of different ways to set up an in memory cache! In any case simplicity are your best friend! This I think is the huge benefit of setting up caching with nginx.

Another important question to ask is: Will multiple services be making requests to the resource and where is the resource?

If you already have a reverse proxy or an API gateway in front of the service calls (I HOPE YOU DO) then it might just make sense to add a cache to the "front door" for these service calls to avoid duplication. Especially if your team(s) are polyglot!

Will the latency of requests to an out of process cache negate any perforamce gain that it would give you?

You need to make sure that if you are caching a request out of process. The response time it takes to get that request from the cache might negate caching in the first place, on the flip-side if the 99% percentile response time for the upstream service call is not very long then caching might be a waste of developer time to begin with... At that point the main benefit might be having the cache as a fallback for upstream failures. As you will see later, this is a powerful pattern and easy to implement in nginx.

What if you have many application instances?

Back to the eventual vs strong consistency point. The more application instances you have with in-memory stores the more important data consistency might become as each application instance might have different versions of the upstream response. When you use nginx as a central store this is reduced because typically nginx can have fewer instances running with a cache across a few instances than most application servers can such as node.js.

Ultimately remember that simplicity is your friend here. Whatever you do make a conscious effort to make as few components and as little logic as possible, because you or someone else will eventually get confused by the code. It's inevitable! Minimize this.

<a id="Setting-Up-Nginx-Caching"></a>

### Setting Up Nginx Caching

[You can access the completed tutorial repo here](https://github.com/danielbh/openresty-caching-example)

A resource that rarely changes is usually a great candidate for caching. For example: a stylesheet or script. Depending on if your application is exposed to the internet you could put assets behind a CDN like AWS Cloudfront as your users might be distributed around the world. In other cases it could make sense to have certain backend calls for data or assets cached on a cache you control in a proxy to avoid the round trip to upstream services. For the purposes for this example I will assume that you prefer to cache in a proxy that you control. An important thing to consider is consistency of cached items and upstream responses and how you might want to do cache invalidation. You might want the resource cached, but always get the most recent one. We will address this in future sections.

How do we setup an nginx cache?

```conf

http {

  proxy_cache_path /tmp/my_cache keys_zone=my_cache:10m levels=1:2 inactive=600s max_size=100m;

  proxy_cache_valid 200 302 10m;
  proxy_cache_valid 404      1m;
  proxy_cache_methods GET;

  add_header X-Cache $upstream_cache_status;

  server {
      listen 80 default_server;
      location / {
        proxy_cache my_cache;
        proxy_cache_key $uri;
        proxy_pass  http://goapp:8000;
      }
  }
}

```
`proxy_cache_path`: This is how we setup the cache.

- `/tmp/my_cache`: This is the path where a cache exists. The directory you use here is the unique identifer for this cache when used in other directives that you want to apply to it. Here we are calling the cache "my_cache".

- `keys_zone=my_cache:10m`: This is the maxium storage that is is being allocated for cache keys. This allocates 10 mb for cache keys. 10 mb is about 80,000 keys.

- `levels=1:2`: This is the hierarchy of directories being used in the cache for files. Here we have a two level hiearchy. By default nginx uses a one level hiearchy. This is less efficient because items would be retrieved from the same folder which can slowdown file access.

- `inactive=600s`: This is the eviction time for a cache entry. After this duration the entry will be removed from the cache. Note: This is different from `proxy_cache_valid` which states if an item is stale or not.

- ` max_size=100m;`: Upper limit of the size of the cache. It is optional; if not specified it will use all available disk space. When cache limit reached. A process called the cache manager removes the files that were least recently used to bring the cache size back to.

`proxy_cache_valid`: This directive says under what circumstances a request will be cached and how long until an entry is stale.

  - `code`: The http status codes whose corresponding response will be cached.

  - `time`: The amount of time until the cache entry is considered "stale" This is different from `inactive` directive which will remove the item from the cache.

`proxy_cache_methods`: The methods who's responses will be cached.

`add_header X-Cache $upstream_cache_status`: This will tell the consumer of the request the state of the cache. The status can be either "MISS", "BYPASS", "EXPIRED", "STALE", "UPDATING", "REVALIDATED", or "HIT".

`proxy_cache my_cache;`: This is the cache that this location block will use. You can set each location block to use a different cache. In case you want to set different parameters for different location blocks. Perhaps you want to set `inactive` for different location blocks some requests to be evicted sooner than others.

`proxy_cache_key:` This is the cache key for the look up of the response. Above we are using the $uri variable. The $uri is the path used after the host. So for example if you made a request to `website.com/path` the $uri would be `/path`. The $uri variable is one of many convenience variables we can use in our nginx configurations. [Here is the list](http://nginx.org/en/docs/http/ngx_http_core_module.html#var_status).

<a id="Handling-Failing-Upstreams-with-Cache"></a>

### Handling Failing Upstreams with Cache
![handling failing upstreams with cache nginx](handling-failing-upstreams-with-cache.png)

This next feature I'm going to tell you about is hands-down one of my favorite nginx features. I love it because how powerful it is, and how easy it is to do. If you are sending "safe" requests (GET, HEAD, OPTIONS), and the upstream is failing you can set nginx to just return a stale version of the cache. I've seen this work in production and it is beautiful. When you do this just be sure that you have alerting on the failing upstream service so you know there is an issue.

```conf
...

proxy_cache_use_stale error timeout invalid_header updating http_500 http_502 http_503 http_504;
proxy_cache_background_update on;

...

server {
      listen 80 default_server;

      location /cached/ {
        proxy_cache my_cache;
        proxy_cache_key $uri;
        proxy_pass  http://goapp:8000/;
      }

      location / {
        proxy_pass  http://goapp:8000;
      }
  }
```

`proxy_cache_use_stale`: These are all the error situations that you want to fallback to a stale cache.

`proxy_cache_background_update`: Allows starting a background subrequest to update an expired cache item, while a stale cached response is returned to the client. Note that it is necessary to allow the usage of a stale cached response when it is being updated [from docs](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_background_update). This is neccesary so that a stale cache will be used when an upstream is failing.

`/cached/`: This location block will use the cache and will fallback to it when the upstream fails. Notice the trailing slash after `cached` and `http://goapp:8000` This matters!

`/`: This location block remains un-cached.

`http://goapp:8000`: This url maps to a go application that will fail every other request with a 500. It does this on the `/failodd` endpoint.

Let's see this in action:

```shell

# un-cached route

$ curl -D - localhost:8080/failodd

HTTP/1.1 200 OK
Server: openresty/1.15.8.1
Date: Sat, 24 Aug 2019 17:12:08 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 18
Connection: keep-alive

Everything is fine

$ curl -D - localhost:8080/failodd

HTTP/1.1 500 Internal Server Error
Server: openresty/1.15.8.1
Date: Sat, 24 Aug 2019 17:12:11 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 28
Connection: keep-alive

Uh oh something bad happened

# cached route

$ curl -D - localhost:8080/cached/failodd

HTTP/1.1 200 OK
Server: openresty/1.15.8.1
Date: Sat, 24 Aug 2019 17:12:50 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 18
Connection: keep-alive
X-Cache: MISS

Everything is fine

$ curl -D - localhost:8080/cached/failodd

HTTP/1.1 200 OK
Server: openresty/1.15.8.1
Date: Sat, 24 Aug 2019 17:13:17 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 18
Connection: keep-alive
X-Cache: HIT

Everything is fine

```

Notice you can tell that it was cached because the `X-Cache` response header was sent back.

<a id="Cache-Invalidation-and-Bypass"></a>

### Cache Invalidation and Bypass

Ah yes... The bane of every caching strategy. What happens when a cached resource changes and you immediately
want to use the new version. So there is good new and bad news when it comes to Nginx/OpenResty. Bad news first. [Cache invalidation through exposing an endpoint from nginx requires nginx+](https://docs.nginx.com/nginx/admin-guide/content-cache/content-caching/#purge). However, fear not. There are some good work-arounds depending on your situtation. Here we will go through two.

Bypass

For the first one, the pre-requisite is that you don't know if there is a new version of the cached response, but you request it through the use of `proxy_cache_bypass` directive. You could also just send a query string through that would change the cache key, but proxy_cache_bypass is probably easy to read and more standard.

To do this you can use a cookie or header. The cookie is just prefaced with `$cookie_` then you add the name of your cookie. so you could do `$cookie_yourkey` then you add `$arg_cookie`. Similarly if you want use a header just add `$http_`. Below we are using a header called `$http_bypass_cache`. Here the value of the header does not matter, just the key. It must be defined though when you send it. Another important thing to note. YOU MUST have `underscores_in_headers on` enabled. Oh boy Nginx. You done it again. You could also use `$http_cache_control` but that might be confusing for consumers since they might think the value matters... ie `no-cache` vs `max-age=<seconds>` which it does not. Nginx does not have this built in 😭.

```conf
server {
 ...

  underscores_in_headers one;

  ...

  location /cached/ {
    ...
    proxy_cache_bypass $http_bypass_cache;
    proxy_pass  http://goapp:8000/;
  }

  ...
}
```

Let's use the fail-odd example again. This time on the odd number of request we will pass a cache bypass header through and it fail with a 500 even though it's cached.


```bash

$ curl -H "bypass_cache:true" -D - localhost:8080/cached/failodd

HTTP/1.1 200 OK
Server: openresty/1.15.8.1
Date: Sat, 24 Aug 2019 18:03:05 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 18
Connection: keep-alive
X-Cache: BYPASS

Everything is fine

$ curl -H "bypass_cache:true" -D - localhost:8080/cached/failodd

HTTP/1.1 500 Internal Server Error
Server: openresty/1.15.8.1
Date: Sat, 24 Aug 2019 18:03:07 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 28
Connection: keep-alive

Uh oh something bad happened

```

Invalidation of Static Assets

The second method you could use can be used if the request will change if you are caching static assets that change. For example you are fetching a javascript or a stylesheet. Keep in mind best practices recommend that you also be fingerprinting these assets and setting `Cache-Control` control headers for consumers in the proxy. The topic of `Cache-Control` headers is a blog entry all by itself... If you would like to look more into this I recommend [Mozilla Cache-Control Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control). We will use them but not explain them in depth. For the purposes of this blog entry we will be focusing on just caching the assets in nginx cache.

The method I find most interesting to approach this is as follows... Map the path i.e. `/path/` in `/path/script.fingerprint.js` to the last version was last deployed. The version could be a git tag or even git sha. Do this look-up then put the value of this version as a part of the cache key of the request being cached. The ways you do this are many. Let's imagaine you had an up-to-date store somewhere that took a couple of ms or less where you could do this look-up.

To do this we are going to leverage the scripting capabilities of openresty and write us some lua. The lua will code will make a subrequest to an endpoint on a go microservice that will have a random string representing it's version regenerated every 2 seconds. This will allow us to see this method of cache invalidation in action.

Keep in mind that when we use this in production we would want to make sure that the check to see if there was a new deployment was faster than just going and getting the assets. If not there is really no point to doing this. Also, the pattern you are about to see can be applied to other scenarios as well, where the check to see if something has been updated is much faster than going all the way to the origin.

```conf

location ~* \.(js|css)$ {
  rewrite_by_lua_block {
    local deployment_version = ngx.location.capture("/deployment-info").body
    local asset = ngx.location.capture("/get-asset" .. ngx.var.uri, {
      vars = { version = deployment_version }
    })
    ngx.header["Version"] = deployment_version
    ngx.header["X-Cache"] = asset.header["X-Cache"]
    ngx.say(asset.body)
  }
}

location ^~ /get-asset/ {
  internal;

  set_by_lua_block $version {
    return ngx.var.version
  }

  more_set_headers "X-Cache $upstream_cache_status";
  proxy_cache assets_cache;
  proxy_cache_key $uri$version;
  proxy_pass  http://goapp:8000/;
}

location /deployment-info {
  internal;
  proxy_pass  http://goapp:8000;
}

```

`location ~* \.(js|css)$`:

`rewrite_by_lua_block`: This is a block where we can write lua code. Something very subtle is happening here that will be hard to see without explanation. This block needs to be done first and make subrequests to the enclosed `location.capture` invocations. That is because cache_keys are assigned before a rewrite_by_lua_blocks can execute. Now you might ask, why not do a location.capture inside of a set_by_lua_block like we are doing above? You cannot do a location.capture inside of a set_by_lua_block. Why? Because according to [the docs](https://github.com/openresty/lua-nginx-module#set_by_lua) "`ngx_http_rewrite_module` does not support nonblocking I/O in its commands, Lua APIs requiring yielding the current Lua "light thread" cannot work in this directive." So we must do it this weird way. I will explain more as I discuss the other lines of code being used ehre.

`ngx.location.capture("/deployment-info").body`: This directive is what makes a subrequest in lua. In order to use it we must have a valid location block. You will notice none such exists explicity. However match all location block will catch this and send it to the upstream go app. Here we are grabbing the body from the deployment info which is the fake version which we will use as part of our cache key to identify if there has been an update to the code.

`ngx.var.uri`: This is the equivalent of $uri used above. It is just the path being requested in this block.

`vars = { version = deployment_version }`: Here we must pass the deployment version through to the "/get-asset" location block so that we may use it in a cache key.

`ngx.header["X-Cache"] = asset.header["X-Cache"]`: Here we are assigning the `X-Cache` header to the response header of the consumer so they know if the value is cached or not.

`ngx.say(asset.body)`: This is how we are terminating the request and send the aggregate response to the consumer.

`location ^~ /get-asset/ {`: Is a `startsWith` check. The `^~` is important, and we must have it. Otherwise a request to `/something.js` will cause an infinite loop because the `location.capture` will continue to call the `~* \.(js|css)$ ` until it errors out. The regex for the assets takes priority otherwise.

`internal;`: This means the request can only be made internally by nginx.

`set_by_lua_block $version {`: This is taking the ngx.var.version variable passed in in the `location.capture` and defining it within the context of the "/get-asset" location block

`more_set_headers "X-Cache $upstream_cache_status";`: This is required to send the cache status header as a response header to the `location.capture`. [according to the creator of openresty](https://github.com/openresty/lua-nginx-module/issues/68), "the standard ngx_headers (`add_header`) module works only in main requests, and it is a no-op in subrequests. You have to use Lua or ngx_headers_more (`more_set_headers`)" to add the Foo header in location /bar. So... fun.

`proxy_cache assets_cache;`: This is assigning a new cache to this location block specifically for caching assets.

Invalidation of API calls

Now what about API calls backed by a database where strong consistency between the cache and database is desired. For simplicity of this example I again want to emphasize that depending on the use-case and if this proxy handles un-safe requests for these resources (`PUT`, `DELETE`, `POST`, `PATCH`) we might implement a different pattern here with `cache-aside` or `read-through/write-through`.

Also remember that cache-purging requires an nginx commercial license if you want it out of the box, but you still have other options if you would rather build it than buy it.

Also the pre-requisite for these approaches is that on every database write you need to send out a fire and forget web request to an nginx cache invalidation endpoint or, if you elect to use a distributed cache, you send the invalidation request to the cache itself, and the nginx instances would just be connected to it.

Also keep in mind the consequences of purging a shared cache. You might want to add things like authorization to confirm those who attempt to purge the cache are allowed to do so.

Here are some approaches you could take:

1) This guy, FRiCKLE, [created an nginx module that enables cache purging](https://github.com/FRiCKLE/ngx_cache_purge). Disclaimer! I have not used it, but I plan to do some experiments with it. I will update with a post when I've had time to do this.

2) Another alternative could be to use an in process lru implemented in lua with [lua-resty-lrucache](https://github.com/openresty/lua-resty-lrucache) module.

3) Another alternative is to use the nginx or OpenResty redis module. Your microservice that is making updates or inserts to the database could also be connected to an out of process cache, for example... redis. Then you just setup a cache purging endpoint which removes the entry from redis. You would also have logic to read the redis entry. You have a few options here. A disclaimer for these is that I know of only one instance using the lua-resty-redis module in production. The other two I have not tried. I will try to write a blog entry to compare them:

   - [ngx http redis module](https://www.nginx.com/resources/wiki/modules/redis/)
   - [openresty-redis-module](https://github.com/openresty/redis2-nginx-module#readme)
   - [lua-resty-redis](https://github.com/openresty/lua-resty-redis)

<a id="bottom"></a>

### Conclusion

As you can see nginx offers a variety of options for any backend caching strategy that you'd like to create. Most patterns are very simple, but some are complex. All in all, Nginx makes an caching strategy easier and I highly reccommend it.

Nginx OpenResty is a great technology, but it can also be a beast especially when you start customizing and adding logic via lua with OpenResty. I'm an OpenResty specialist. If you would love to help on your project if you are using OpenResty. Drop me a line. Happy to help.

