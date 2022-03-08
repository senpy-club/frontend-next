// This file is part of frontend-next <https://github.com/senpy-club/frontend-next>.
// Copyright (C) 2022-2022 Fuwn <contact@fuwn.me>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.
//
// Copyright (C) 2022-2022 Fuwn <contact@fuwn.me>
// SPDX-License-Identifier: GPL-3.0-only

const baseUrl = "https://senpy-club-api-worker.fuwn.workers.dev/v2";

interface RandomImage {
  language: string;
  image: string;
}

export async function fetchImages(language: string): Promise<string[]> {
  language = language.replace("#", "%23");

  const response = await fetch(`${baseUrl}/language/${language}`);

  return await response.json();
}

export async function fetchLanguages(): Promise<string[]> {
  const response = await fetch(`${baseUrl}/languages`);

  return await response.json();
}

export async function fetchRandomImage(): Promise<RandomImage> {
  const response = await fetch(`${baseUrl}/random`);

  return await response.json();
}
