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
<script lang="ts">
  import { onMount } from "svelte";
  import rst2html from "rst2html";
  import { baseURL } from "$lib/api";

  let rst: string;
  let complete = false;

  onMount(async () => {
    rst = await (await fetch(baseURL)).text();
    complete = true;
  });
</script>

<svelte:head>
  <title>API | The Senpy Club</title>
</svelte:head>

<section>
  <p>
    The Senpy Club API can be accessed through <a
      href="https://api.senpy.club"
      target="_blank"
    >
      REST
    </a>
    and
    <a href="https://github.com/senpy-club/graphql-api" target="_blank"
      >GraphQL</a
    >
    (<a href="https://graphql.senpy.club/playground" target="_blank">
      Playground</a
    >)
  </p>

  {#if !complete}
    <p>Fetching API README ...</p>
  {:else}
    {@html rst2html(rst)}
  {/if}
</section>
