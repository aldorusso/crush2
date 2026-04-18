---
title: "Cómo funciona Spotify por dentro: el algoritmo que conoce tu gusto"
slug: "como-funciona-spotify-algoritmo"
description: "Descubre cómo Spotify decide qué canciones aparecen en Discover Weekly, qué datos analiza y por qué a veces parece que te lee la mente."
publishedAt: "2026-04-13T15:06:15Z"
updatedAt: "2026-04-14T15:06:15Z"
author: "pablo-jimenez"
category: "tecnologia"
subcategory: "apps-y-servicios"
tags:
  - "spotify"
  - "algoritmos"
  - "streaming"
  - "musica"
heroImage:
  src: "https://picsum.photos/seed/11/1200/675"
  alt: "Cómo funciona Spotify por dentro: el algoritmo que conoce tu gusto"
  credit: "picsum.photos"
  width: 1200
  height: 675
readingTime: 5
featured: false
breaking: false
---

## La pregunta que todos hacen mal

"¿Cómo sabe Spotify lo que me gusta?"

La respuesta habitual es "te escucha". No te escucha. Lo que hace es más sofisticado y más interesante que eso, y entenderlo cambia la manera en que interactúas con la plataforma.

Spotify usa tres sistemas en paralelo. Ninguno funciona solo; la magia está en combinarlos.

## Sistema 1: filtrado colaborativo

Es el más potente y el más antiguo conceptualmente. La idea: si tú y otra persona tienen gustos muy similares (mismos artistas, mismos géneros, mismas canciones guardadas), probablemente te gusten cosas que a ellos les gustan y tú no has descubierto todavía.

Spotify tiene 600 millones de usuarios. Eso es una cantidad absurda de datos de comportamiento. El algoritmo construye vectores de usuario (representaciones matemáticas de tus gustos) y encuentra usuarios con vectores similares. Lo que ellos escuchan y tú no, entra en el candidato para Discover Weekly.

La señal más fuerte no es que des like a una canción. Es que la escuches hasta el final. O que la pongas en tu propia playlist. O que la pongas en la cola. El comportamiento vale más que los botones.

## Sistema 2: análisis de audio con NLP

En 2014, Spotify compró una empresa llamada The Echo Nest, que había construido tecnología para analizar el audio directamente: tempo, tonalidad, energía, bailabilidad, acústica, instrumentalidad.

Cada canción en el catálogo de Spotify tiene valores numéricos para estas dimensiones. Si consistentemente terminas canciones con energía alta y tempo >130bpm, el algoritmo lo sabe aunque nunca hayas dicho explícitamente que te gusta la música rápida.

Además, Spotify rastrea qué palabras aparecen en playlists donde está cada canción. Si una canción aparece en miles de playlists tituladas "estudio" o "focus", el algoritmo infiere que funciona para concentrarse.

## Sistema 3: el contexto temporal

No escuchas lo mismo un lunes a las 8 de la mañana que un viernes a las 23h. Spotify lo sabe.

El Daily Mix y las radios en tiempo real usan el contexto: hora del día, dispositivo (coche vs auriculares vs altavoz), historial reciente de esa sesión. Si llevas 20 minutos escuchando metal, la siguiente sugerencia no va a ser jazz tranquilo.

## Cómo se genera Discover Weekly

Cada lunes Spotify regenera tu Discover Weekly. El proceso (simplificado):

1. Construye un "perfil temporal" de lo que escuchaste la semana pasada.
2. Encuentra usuarios con perfil similar (colaborativo).
3. Identifica canciones que esos usuarios escuchan mucho que tú no has escuchado.
4. Filtra por análisis de audio: las canciones candidatas deben tener características similares a lo que te gusta.
5. Ordena por probabilidad de que te gusten.
6. Excluye: canciones que ya tienes guardadas, artistas que ya sigues, canciones que skip-easte recientemente.

El resultado: 30 canciones. En teoría, ninguna repetida con la semana anterior.

## Por qué a veces falla

Discover Weekly puede estancarse si escuchas siempre lo mismo. El algoritmo optimiza para lo que ya sabes que te gusta, no para sorprenderte. Si quieres romper el bucle:

- Escucha las radios de artistas que te gustan pero no sigues.
- Sigue playlists editoriales de géneros adyacentes.
- Da "me gusta" a canciones que te gustan aunque no las escuches mucho.

Lo que el algoritmo **no puede hacer**: descubrir artistas completamente nuevos sin comportamiento de referencia. Si una canción no tiene suficientes usuarios que la hayan escuchado, el filtrado colaborativo no la va a generar. Los artistas pequeños tienen una desventaja estructural, independientemente de su calidad.

## El detalle que pocos conocen

Spotify tiene playlists editoriales hechas por humanos (Editorial Playlists como RapCaviar o Today's Top Hits). Entrar en esas playlists es diferente al algoritmo: depende de pitch a editores, relaciones con sellos discográficos, y en algunos casos de inversión publicitaria.

El algoritmo personalizado y las playlists editoriales son dos sistemas separados que a veces se confunden. Discover Weekly es tuyo. RapCaviar es de la industria.
