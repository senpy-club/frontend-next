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

  const errorImages = [
    "https://www.pngarts.com/files/8/Confused-Anime-Transparent-Image.png",
    "https://cdn130.picsart.com/246838980018212.png?r1024x1024",
    "https://toppng.com/public/uploads/thumbnail/confused-anime-png-anime-question-png-gif-11563638774nccphyut3x.png",
    "https://linuxreviews.org/images/8/8d/Blond-anime-girl-with-red-questionmark.png",
    "https://external-preview.redd.it/VNfYgsb6Pqn4xlEBpYl11534fIpOfN1XeMe7NrzgmQs.png?width=282&auto=webp&s=3247341e1cb8a6d6f63b7b3d63809e52ca0558fd",
    "https://i.ya-webdesign.com/images/confused-anime-png-5.png",
    "https://www.pngarts.com/files/8/Confused-Anime-PNG-Picture.png",
    "https://64.media.tumblr.com/20fb900f57db568393387211c9c4760c/tumblr_olanyyuuQZ1tbejoso2_400.png",
    "https://stickershop.line-scdn.net/stickershop/v1/product/7982958/LINEStorePC/main.png;compress=true",
    "https://emoji.gg/assets/emoji/8573_Shikiconfused.png",
    "https://i.imgur.com/TOgxESH.jpg",
  ];

  let images;
  let complete = false;
  
  $: language = $page.url.searchParams.get("language");
  $: languageEncoded = encodeURIComponent(
    $page.url.searchParams.get("language")
  );
  $: imageQuery = $page.url.searchParams.get("image");
  $: image = imageQuery
    ? imageQuery < images
      ? images[imageQuery]
      : null
    : null;

  onMount(async () => {
    images = await fetchImages(language);
    complete = true;

    if (imageQuery) {
      // If the `imageQuery` is a string
      if (Number.isNaN(Number(imageQuery))) {
        image = images.filter((i) => i.includes(imageQuery));

        // Make sure that if there are no exact matches to the `imageQuery`;
        // show error page
        if (image[0] !== imageQuery) {
          image[0] = undefined;
        }

        if (!image[0]) {
          image =
            "https://www.pngarts.com/files/8/Confused-Anime-Transparent-Image.png";
          image = errorImages[Math.floor(Math.random() * errorImages.length)];
        }
      } else {
        image = images[imageQuery];
      }
    }
  });
</script>

<svelte:head>
  <title>{language} | The Senpy Club</title>
</svelte:head>

<div class="content">
  <h1>
    <a href={`/language?language=${languageEncoded}`}>{language}</a>
  </h1>

  {#if !complete}
    <p>Fetching girls ...</p>
  {:else if images.length === 0}
    <p>No images were found for this language.</p>
  {:else if image}
    {#if errorImages.includes(image)}
      <div class="highlight-image">
        <p>
          <i>This image could not be found.</i>
        </p>

        <a href={image}>
          <img src={image} alt="A confused anime girl" />
        </a>
      </div>
    {:else if image}
      <div class="highlighted-image">
        <a href={image} target="_blank">
          <img src={image} alt="An anime girl holding a programming book" />
        </a>
      </div>
    {/if}
  {:else}
    <ul class="image-rack">
      {#each images as image}
        <li id="image-rack-item">
          <a
            href={`/language?language=${languageEncoded}&image=${images.indexOf(
              image
            )}`}
          >
            <img src={image} alt="An anime girl holding a programming book" />
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .highlighted-image img {
    height: 75vh;
    transition: 0.25s;
  }
  .highlighted-image img:hover {
    height: 72.5vh;
    opacity: 0.75;
  }
  .highlighted-image a:hover {
    border-bottom: none;
  }
</style>
