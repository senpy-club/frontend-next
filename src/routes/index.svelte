<!-- This file is part of api-worker <https://github.com/senpy-club/api-worker>.
Copyright (C) 2022-2022 Fuwn <contact@fuwn.me>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

Copyright (C) 2022-2022 Fuwn <contact@fuwn.me>
SPDX-License-Identifier: GPL-3.0-only -->
<script>
  import { onMount } from "svelte";
  import { fetchRandomImage } from "$lib/api";

  let image, fetchTime;
  let complete = false;

  onMount(async () => {
    fetchTime = performance.now();
    image = (await fetchRandomImage()).image;
    fetchTime = performance.now() - fetchTime;

    complete = true;
  });
</script>

<svelte:head>
  <title>home | senpy-club</title>
</svelte:head>

<section>
  <h1>Home</h1>

  {#if !complete}
    <p>Fetching a random image...</p>
  {:else}
    <div id="random-image">
      <a href={image}>
        <img
          src={image}
          alt="Image of an anime girl holding a programming book"
        />
      </a>
    </div>
    <small>Fetch time: {fetchTime}ms</small>
  {/if}

  <h2>Contributing</h2>
  <p>
    If you'd like to support the project in any way, check out the repositories:
  </p>
  <ul>
    <li><a href="https://github.com/senpy-club/api-worker">API</a></li>
    <li><a href="https://github.com/senpy-club/frontend-next">Frontend</a></li>
  </ul>
</section>
