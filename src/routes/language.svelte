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

  let language = $page.url.searchParams.get("language");
  let images, fetchTime, image, imageSize;
  let complete = false;
  let imageQuery = $page.url.searchParams.get("image");
  let languageEncoded = language.replaceAll("#", "%23");

  onMount(async () => {
    fetchTime = performance.now();
    images = await fetchImages(language);
    fetchTime = performance.now() - fetchTime;
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

      let xhr = new XMLHttpRequest();

      xhr.open("HEAD", image, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            imageSize = `${xhr.getResponseHeader("Content-Length") / 1024}`;
          } else {
            imageSize = "Error";
          }
        }
      };
      xhr.send(null);
    }
  });
</script>

<svelte:head>
  <title>{language} | The Senpy Club</title>
</svelte:head>

<div class="content">
  <h1>{language}</h1>

  {#if !complete}
    <p>Fetching images...</p>
  {:else if images.length === 0}
    <p>Sorry, no images were found for this language.</p>
  {:else if image}
    {#if errorImages.includes(image)}
      <div class="highlight-image">
        <p>
          <i>Could not locate that specific image!</i>
          Wanna go
          <a href={`/language?language=${languageEncoded}`} target="_blank"
            >back</a
          >
          to language homepage?
        </p>

        <a href={image}>
          <img src={image} alt="A confused anime girl" />
        </a>
      </div>
    {:else if image}
      <div class="highlight-image">
        <p>
          Wanna go
          <a href={`/language?language=${languageEncoded}`} target="_blank"
            >back</a
          >
          to language homepage?
        </p>

        <a href={image}>
          <img src={image} alt="An anime girl holding a programming book" />
        </a>

        <h2>Information</h2>
        <p>
          Want to know more information about this specific anime scene? Like
          what anime and episode it's from, frame, studio, where you can watch
          it, and a bunch of other information); Visit
          <a href={`https://trace.moe/?url=${image}`} target="_blank"> this </a>
          link!
        </p>

        <h2>Attributes</h2>
        <p>
          Attributes attributes = &lbrace;<br />
          &ensp;direct_link: "<a href={image}>url</a>",<br />
          &ensp;size: {imageSize}, /* kb */<br />
          &ensp;fetch_time: {fetchTime}, /* ms */<br />
          &rbrace;;
        </p>

        <h3>Development Information</h3>
        <p>
          The aforementioned link does have an API which can provide direct data
          about images and could be integrated directly into this website,
          however, there is a ratelimit of around one-thousand, low-tier
          requests per month without a paid subscription, which is why the link
          is outbound.
        </p>
        <p>
          Integrating the API into this website is a future goal, however, it is
          not financially viable at the moment for this project. If you'd like
          to support the project to reach future goals, you can donate at
          <a href="https://github.com/sponsors/senpy-club" target="_blank">
            github.com/sponsors/senpy-club
          </a>.
        </p>
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
            target="_blank"
          >
            <img src={image} alt="An anime girl holding a programming book" />
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</div>
