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
  import { fetchImages } from "$lib/api";
  import { page } from "$app/stores";

  let language = $page.url.searchParams.get("language");
  let images;
  let complete = false;

  onMount(async () => {
    images = await fetchImages(language);
    complete = true;
  });
</script>

<svelte:head>
  <title>{language} | senpy-club</title>
</svelte:head>

<div class="content">
  <h1>{language}</h1>

  {#if !complete}
    <p>Fetching images...</p>
  {:else if images.length === 0}
    <p>Sorry, no images were found for this language.</p>
  {:else}
    <ul class="image-rack">
      {#each images as image}
        <li id="image-rack-item">
          <a href={image}>
            <img
              src={image}
              alt="Image of an anime girl holding a programming book"
            />
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>
