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
  import { fetchLanguages } from "$lib/api";

  let languages;
  let complete = false;

  onMount(async () => {
    languages = await fetchLanguages();
    complete = true;
  });
</script>

<svelte:head>
  <title>Languages | The Senpy Club</title>
</svelte:head>

<div class="content">
  {#if !complete}
    <p>Fetching languages ...</p>
  {:else}
    <ul id="language-list">
      {#each languages as language}
        <li>
          <a href={"/language?language=" + encodeURIComponent(language)}>
            {language}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  #language-list {
    column-count: 1;
  }

  @media screen and (min-width: 600px) {
    #language-list {
      column-count: 2;
    }
  }

  @media screen and (min-width: 900px) {
    #language-list {
      column-count: 3;
    }
  }
</style>
