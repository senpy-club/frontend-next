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
  import rst2html from "rst2html";
  import { baseURL } from "$lib/api";

  let rst, rstTime;
  let complete = false;

  onMount(async () => {
    rstTime = performance.now();
    rst = await (await fetch(baseURL)).text();
    rstTime = performance.now() - rstTime;
    complete = true;
  });
</script>

<svelte:head>
  <title>API | The Senpy Club</title>
</svelte:head>

<section>
  <h1>API</h1>

  <p>This documentation is auto-generated, there may be errors.</p>

  <p>
    The Senpy Club API can be accessed at
    <a href="https://api.senpy.club" target="_blank">https://api.senpy.club</a>.
  </p>

  {#if !complete}
    <p>Fetching API README...</p>
  {:else}
    {@html rst2html(rst)}
    <p>Double rst_to_html_time = {rstTime}; /* ms */</p>
  {/if}
</section>
