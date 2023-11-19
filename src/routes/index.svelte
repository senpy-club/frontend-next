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

  let image;
  let complete = false;

  onMount(async () => {
    image = await fetchRandomImage();
    complete = true;
  });
</script>

<svelte:head>
  <title>Home | The Senpy Club</title>
</svelte:head>

<section>
  {#if !complete}
    <p>Fetching a random image ...</p>
  {:else}
    <div class="highlight-image">
      <a href={`/language?language=${image.language}&image=${image.image}`}>
        <img src={image.image} alt="An anime girl holding a programming book" />
      </a>
    </div>
  {/if}

  <h2>Related Projects</h2>

  <ul>
    <li>
      <a href="https://github.com/senpy-club/api-worker" target="_blank">API</a>
      &mdash; The Senpy Club API
    </li>
    <li>
      <a href="https://github.com/senpy-club/frontend-next" target="_blank">
        Frontend
      </a> &mdash; You are here!
    </li>
    <li>
      <a href="https://github.com/senpy-club/cli" target="_blank">CLI</a> &mdash;
      Access The Senpy Club API from your terminal! (and export it to files too!)
    </li>
    <li>
      <a href="https://docs.rs/senpy" target="_blank"><code>senpy-rs</code></a>
      &mdash; Access The Senpy Club API from
      <a href="https://www.rust-lang.org/">Rust</a>!
    </li>
    <li>
      <a href="https://docs.rs/senpy-ffi" target="_blank">
        <code>senpy-ffi</code>
      </a>
      &mdash; Access The Senpy Club API from any programming language!
    </li>
    <li>
      <a href="https://github.com/senpy-club/graphql-api" target="_blank">
        GraphQL API
      </a>
      &mdash; GraphQL access to The Senpy Club API! (<a
        href="https://graphql.senpy.club/playground">Playground</a
      >)
    </li>
  </ul>
</section>
