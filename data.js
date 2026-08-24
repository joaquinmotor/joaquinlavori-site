// Joaquin Lavori — portfolio data
// Edit this file to add, remove or reorder projects. Everything on the
// site is generated from what's in here — no need to touch the HTML.

/* exported NAV, SITE, PROJECTS, INFO_CONTENT, INFO_DESKTOP, SIDE_B */

const NAV = [
  { key: "home", label: "HOME", hash: "#/" },
  { key: "work", label: "WORK", hash: "#/work" },
  { key: "info", label: "INFO", hash: "#/info" },
  { key: "sideb", label: "SIDE B", hash: "#/sideb" },
];

const SITE = {
  name: "Joaquin Lavori",
  tagline: "Branding & Illustration",
  eyebrow: "BUENOS AIRES — ILLUSTRATION & DESIGN",
  email: "hello@joaquin.com",
  phone: "+61 499 372 409",
  instagram: "@joaquinlavori",
  instagramUrl: "https://instagram.com/joaquinlavori",
  location: "NSW, Australia",
  aboutShort:
    "Joaquin Lavori. Graphic designer, born in Buenos Aires, based in Byron Bay. Brand identities for people who'd rather not look like everyone else.",
  featuredIn: [
    "7 Capas Magazine",
    "La Nación",
    "Revista Otra",
    "Mustique Magazine",
    "Porsche Magazine",
  ],
  awards: [
    {
      title: "Realization Award",
      detail:
        "“Eternity” group exhibition curated by Maurizio Cattelan — Art Basel Cities, Buenos Aires. 2018.",
    },
  ],
  aboutLong: [
    "Joaquin Maria Lavori (b. 1987, Buenos Aires) is a graphic designer and illustrator now living and working in Byron Bay, NSW. He trained as a graphic designer at the University of Buenos Aires, and spent several years alongside painters, art critics and curators before moving fully into design and illustration.",
    "His work sits between two disciplines: art direction and brand identity on one side, and hand-drawn illustration on the other, often under his illustration alter ego, Joaquin Motor. He has led visual identity and campaign work for brands including Vans Argentina, and built capsule collections and illustration systems for surf, skate and streetwear labels across Argentina, the US and Australia.",
    "His work has been exhibited individually and in groups in Buenos Aires, New York and Barcelona, including “Eternity”, a group show curated by Maurizio Cattelan for Art Basel Cities in 2018, for which he received a Realization Award.",
  ],
  education: [
    { year: "2013", detail: "Bachelor of Graphic Design, University of Buenos Aires" },
    { year: "2024–now", detail: "Entrepreneur & New Business, Greystone College, Melbourne" },
    { year: "2016–18", detail: "Art critic and painting, Diana Aisenberg, private studio, Buenos Aires" },
    { year: "2018", detail: "Author Curatorship Seminar, University Torcuato Di Tella, Buenos Aires" },
  ],
  roles: [
    { year: "2015–17 / 2022–24", detail: "Vans Argentina — Art Director & Art Ambassador" },
    { year: "2014–15", detail: "Combo Latam — Illustrator & Graphic Designer" },
    { year: "2012–14", detail: "Tiempo de otros tiempos, Mustique Magazine, Porsche Magazine — Graphic Designer" },
  ],
  exhibitions: [
    { year: "2024", detail: "Dermis, solo show — Bardo Factory, Byron Bay" },
    { year: "2018", detail: "Eternity, curated by Maurizio Cattelan — Art Basel Cities, Buenos Aires" },
    { year: "2017", detail: "Memories of them, solo show — Fleur Noire, New York" },
    { year: "2014 / 2012", detail: "Time is Gold / Time is Money, solo shows — Buenos Aires" },
  ],
};

const PROJECTS = [
  {
    slug: "the-movement",
    brand: "The Movement",
    category: "Branding",
    blurb:
      "Logo design for The Movement, a new talent and live-show division by Landia, one of the most awarded advertising production companies.",
    body: [
      "Logo design for The Movement, a global creative studio and production company working across the music industry and the brands that work with it. Launched by Landia — one of the most awarded advertising production companies — The Movement needed an identity that could carry its own weight as a new division within the group.",
      "I explored several directions before landing on an organic, handwritten mark: loose, human, and unmistakably tied to music and performance rather than to a traditional agency register. The result is a flexible, relaxed logotype built to move across music videos, branded content, and live shows — giving The Movement the push it needed to launch under its own name.",
    ],
    link: "https://themovement.land/",
    linkLabel: "Visit site",
    hero: "assets/img/the-movement/hero.webp",
    // Home tile cover only (does not affect the Project page hero/gallery
    // order above): el video de hero del proyecto (hero.mp4, nativo 886x1400).
    // Era video-04 hasta el 2026-08-22; al re-sincronizar la carpeta ese archivo
    // dejo de existir, se probo con celu.mp4 y el usuario pidio el del hero.
    // El tile toma la proporcion nativa del video por la regla generica
    // .tile-cover:has(.media-real) de styles.css — NO hardcodear un aspect-ratio
    // por slug, ya paso una vez y dejo el cover recortado a la caja vieja.
    homeCover: { type: "video", src: "assets/img/the-movement/hero.mp4", poster: "assets/img/the-movement/hero-poster.jpg" },
    // A plain array entry inside `gallery` (nested, as opposed to a string
    // or {type:"video"} object) is a "carrusel" group: a set of photos
    // meant to render as one auto-scrolling horizontal filmstrip instead of
    // stacked full-width items — see galleryItemHTML()/marqueeHTML() in
    // script.js and notas.md 2026-08-11.
    // Galeria DERIVADA de los nombres de archivo de assets/work/01-the-movement/,
    // regenerada con scripts/sync-project.py (ver sync-de-proyectos.md), nunca
    // editada a mano. Re-sincronizada 2026-08-22 con el orden nuevo del usuario:
    // desaparecieron los phone-01..08 y video-03/04, entro 11-celu-11.mp4 (sale
    // como celu.mp4) y los dos grupos de carrusel.
    gallery: [
      { type: "video", src: "assets/img/the-movement/hero.mp4", poster: "assets/img/the-movement/hero-poster.jpg" },
      "assets/img/the-movement/logo.webp",
      "assets/img/the-movement/foto-01.webp",
      { type: "video", src: "assets/img/the-movement/video-01.mp4", poster: "assets/img/the-movement/video-01-poster.jpg" },
      [
        "assets/img/the-movement/carrusel1-01.webp",
        "assets/img/the-movement/carrusel1-02.webp",
        "assets/img/the-movement/carrusel1-03.webp",
        "assets/img/the-movement/carrusel1-04.webp",
      ],
      { type: "video", src: "assets/img/the-movement/video-02.mp4", poster: "assets/img/the-movement/video-02-poster.jpg" },
      "assets/img/the-movement/team.webp",
      { type: "video", src: "assets/img/the-movement/celu.mp4", poster: "assets/img/the-movement/celu-poster.jpg" },
      [
        "assets/img/the-movement/carrusel2-01.webp",
        "assets/img/the-movement/carrusel2-02.webp",
        "assets/img/the-movement/carrusel2-03.webp",
      ],
    ],
  },
  {
    slug: "afends",
    brand: "Afends",
    category: "Illustration & Content",
    blurb: "A tattoo flash-inspired capsule collection and documentary content series for Afends' Spring 2026 range.",
    body: [
      "Afends invited Joaquin Motor — Joaquin Lavori's illustration alter ego, built on his tattoo flash artwork — to design a capsule collection around their Off-Script range, a story about breaking out, staying true, and choosing your own way forward. I pulled directly from the symbolism already running through the work — snakes, chains, roses, flames — and translated it into a range spanning womenswear, menswear, and accessories, from oversized tees to six-panel caps. The collaboration went beyond product into Create Not Destroy, a documentary-style content series built around the artist and his studio, treating his tools and space as part of the story rather than a backdrop. The result plays less like a brand collab and more like a flash sheet stretched onto fabric — freedom, the kind you fight for, worn.",
    ],
    link: "https://afends.com/search?q=joaquin+motor&options%5Bprefix%5D=last",
    linkLabel: "View project",
    hero: "assets/img/afends/hero.webp",
    // Gallery order follows assets/work/02-afends/'s own numbering
    // (00-48, re-set by hand 2026-08-12 after a full reorg — see notas.md).
    // Three distinct entry shapes:
    //  - plain string: a single static photo (.project-gallery-item).
    //  - nested array: a "carrusel" group — auto-scrolling filmstrip, all
    //    photos visible side by side (marqueeHTML() in script.js). Also used
    //    for spread-01/02 (the two oversized PNG spreads, 22-carrusel-01 /
    //    24-carrusel-02, ~9MB each, re-optimized to webp) wrapped as their
    //    own 1-item "carrusel" per the user's own framing (2026-08-12): each
    //    is already a wide composite photo, so it loops on itself rather
    //    than sitting statically.
    //  - {type:"slideshow", items:[...]}: a "slide-cut" group — one photo
    //    at a time, hard cut (no fade) to the next every .5s, infinite loop,
    //    no nav/dots (2026-08-12, user request — see slideshowHTML() in
    //    script.js). Distinct from "carrusel": nothing scrolls, only one
    //    photo is ever visible.
    // Galeria DERIVADA de los nombres de archivo de assets/work/02-afends/,
    // regenerada con scripts/sync-project.py (ver sync-de-proyectos.md), nunca
    // editada a mano. Re-sincronizada 2026-08-22: hasta entonces este data.js
    // era anterior al script y usaba nombres propios (spread-01, slidercut4-*),
    // por eso cambiaron TODOS los archivos de la carpeta de imagenes del proyecto.
    // Dos cosas que vienen de como el usuario nombro la carpeta:
    //  - 09/10/11 dicen "slider-cut" (con r); el script lo toma como slide-cut.
    //  - 44-47-48-carrusel-03 repite el numero de grupo de 38-42-carrusel-03,
    //    y como no son consecutivos son dos grupos: el segundo salio carrusel2-*.
    //  - 49-slide-cut-6.webp es un webp ANIMADO y ya trae su propia animacion:
    //    se copia tal cual (ffmpeg no decodifica webp animados) y queda como un
    //    slide-cut de un solo item al final, que es donde lo pone su numero.
    gallery: [
      "assets/img/afends/hero.webp",
      [
        "assets/img/afends/carrusel1-01.webp",
        "assets/img/afends/carrusel1-02.webp",
        "assets/img/afends/carrusel1-03.webp",
        "assets/img/afends/carrusel1-04.webp",
        "assets/img/afends/carrusel1-05.webp",
        "assets/img/afends/carrusel1-06.webp",
        "assets/img/afends/carrusel1-07.webp",
        "assets/img/afends/carrusel1-08.webp",
      ],
      {
        type: "slideshow",
        items: [
          "assets/img/afends/slidecut4-01.webp",
          "assets/img/afends/slidecut4-02.webp",
          "assets/img/afends/slidecut4-03.webp",
        ],
      },
      { type: "video", src: "assets/img/afends/video-01.mp4", poster: "assets/img/afends/video-01-poster.jpg" },
      {
        type: "slideshow",
        items: [
          "assets/img/afends/slidecut6-01.webp",
          "assets/img/afends/slidecut6-02.webp",
          "assets/img/afends/slidecut6-03.webp",
          "assets/img/afends/slidecut6-04.webp",
          "assets/img/afends/slidecut6-05.webp",
          "assets/img/afends/slidecut6-06.webp",
          "assets/img/afends/slidecut6-07.webp",
          "assets/img/afends/slidecut6-08.webp",
        ],
      },
      { type: "video", src: "assets/img/afends/video-02.mp4", poster: "assets/img/afends/video-02-poster.jpg" },
      [
        "assets/img/afends/carrusel01-01.webp",
      ],
      "assets/img/afends/foto-01.webp",
      { type: "video", src: "assets/img/afends/video-03.mp4", poster: "assets/img/afends/video-03-poster.jpg" },
      [
        "assets/img/afends/carrusel02-01.webp",
      ],
      {
        type: "slideshow",
        items: [
          "assets/img/afends/slidecut5-01.webp",
          "assets/img/afends/slidecut5-02.webp",
          "assets/img/afends/slidecut5-03.webp",
          "assets/img/afends/slidecut5-04.webp",
          "assets/img/afends/slidecut5-05.webp",
        ],
      },
      [
        "assets/img/afends/carrusel03-01.webp",
        "assets/img/afends/carrusel03-02.webp",
        "assets/img/afends/carrusel03-03.webp",
        "assets/img/afends/carrusel03-04.webp",
        "assets/img/afends/carrusel03-05.webp",
      ],
      "assets/img/afends/foto-02.webp",
      [
        "assets/img/afends/carrusel2-01.webp",
        "assets/img/afends/carrusel2-02.webp",
        "assets/img/afends/carrusel2-03.webp",
        "assets/img/afends/carrusel2-04.webp",
        "assets/img/afends/carrusel2-05.webp",
      ],
      {
        type: "slideshow",
        items: [
          "assets/img/afends/slidecut1-01.webp",
        ],
      },
    ],
  },
  {
    slug: "lacalle",
    brand: "La Calle Bar",
    category: "Illustration & Environmental Design",
    blurb:
      "An illustrated cocktail menu, neon mural, and crockery for La Calle Bar, each drink built around a street somewhere in the world.",
    body: [
      "La Calle Bar, a bar in Buenos Aires, asked Joaquin Motor — Joaquin Lavori's illustration alter ego — to give shape to a menu built around a single idea: bars as the last wild pockets left in the city, the places where risk, chance, and freedom still exist. Working alongside the bar's own bartenders, Adrián \"Adre\" González and Eze \"El Tano,\" I illustrated each cocktail as its own destination, matching each street's character to what's in the glass. The concept moved off the page into an on-site neon mural and a set of illustrated crockery, carrying the same cast of characters into the physical space. The result turns ordering a cocktail into picking a destination — a menu you travel through as much as drink from.",
    ],
    link: "https://www.instagram.com/lacallebar/",
    linkLabel: "View site",
    hero: "assets/img/lacalle/hero.webp",
    // Gallery order and entry types are DERIVED from assets/work/03-la-calle-bar/'s
    // own file numbering and names — regenerated with scripts/sync-project.py
    // (see sync-de-proyectos.md). The user reorganises that folder often and
    // asks for a re-sync, so this block is regenerated wholesale, never
    // hand-edited. Last rebuild 2026-08-22: slide-cut-3 (the 10 cocktail
    // plates) was dropped, slide-cut-2 went from 18 to 15 spreads, and two
    // loose fotos plus a re-numbered carrusel-3 came in; 08-foto was dropped
    // on 2026-08-22 too, which re-numbered every foto after it. Ultimo rebuild
    // 2026-08-23: entraron 42-foto y 43-foto (foto-08 y foto-09) al final.
    // OJO: 43 venia como "43.png", sin tipo — el script ignora en silencio
    // cualquier archivo que no sea <NN>-<tipo>.<ext>, asi que se renombro a
    // 43-foto.png. Los knobs por grupo se pasan al build con
    // OVERRIDES='{"carrusel2":{"speed":45},"slidecut2":{"height":300,"interval":1000}}'
    // y salen ya puestos en el JS — ver carruseles-y-slideshows.md.
    gallery: [
      { type: "video", src: "assets/img/lacalle/hero.mp4", poster: "assets/img/lacalle/hero-poster.jpg" },
      [
        "assets/img/lacalle/carrusel1-01.webp",
        "assets/img/lacalle/carrusel1-02.webp",
        "assets/img/lacalle/carrusel1-03.webp",
      ],
      "assets/img/lacalle/foto-01.webp",
      "assets/img/lacalle/foto-02.webp",
      "assets/img/lacalle/foto-03.webp",
      {
        type: "carrusel",
        speed: 45,
        items: [
          "assets/img/lacalle/carrusel2-01.webp",
          "assets/img/lacalle/carrusel2-02.webp",
          "assets/img/lacalle/carrusel2-03.webp",
          "assets/img/lacalle/carrusel2-04.webp",
          "assets/img/lacalle/carrusel2-05.webp",
        ],
      },
      "assets/img/lacalle/foto-04.webp",
      "assets/img/lacalle/foto-05.webp",
      "assets/img/lacalle/foto-06.webp",
      { type: "video", src: "assets/img/lacalle/video-01.mp4", poster: "assets/img/lacalle/video-01-poster.jpg" },
      {
        type: "slideshow",
        height: 300,
        interval: 1000,
        items: [
          "assets/img/lacalle/slidecut2-01.webp",
          "assets/img/lacalle/slidecut2-02.webp",
          "assets/img/lacalle/slidecut2-03.webp",
          "assets/img/lacalle/slidecut2-04.webp",
          "assets/img/lacalle/slidecut2-05.webp",
          "assets/img/lacalle/slidecut2-06.webp",
          "assets/img/lacalle/slidecut2-07.webp",
          "assets/img/lacalle/slidecut2-08.webp",
          "assets/img/lacalle/slidecut2-09.webp",
          "assets/img/lacalle/slidecut2-10.webp",
          "assets/img/lacalle/slidecut2-11.webp",
          "assets/img/lacalle/slidecut2-12.webp",
          "assets/img/lacalle/slidecut2-13.webp",
          "assets/img/lacalle/slidecut2-14.webp",
          "assets/img/lacalle/slidecut2-15.webp",
        ],
      },
      "assets/img/lacalle/foto-07.webp",
      [
        "assets/img/lacalle/carrusel3-01.webp",
        "assets/img/lacalle/carrusel3-02.webp",
        "assets/img/lacalle/carrusel3-03.webp",
        "assets/img/lacalle/carrusel3-04.webp",
      ],
      "assets/img/lacalle/foto-08.webp",
      "assets/img/lacalle/foto-09.webp",
    ],
  },
  {
    slug: "ceremonia",
    brand: "Ceremonia",
    category: "Brand Strategy & Identity",
    blurb: "Brand mentorship and logo design for Ceremonia, a handcrafted luxury jewellery house in Byron Bay, Australia.",
    body: [
      "Ceremonia came to me before it had a name for what it was building. Through a mentorship process, I helped shape their brand concept, their voice, and the structure that would become their debut collection — the language they still write in today. Ceremonia is a handcrafted luxury jewellery house in Byron Bay built on the tension between rock and roll attitude and Parisian couture discipline: the raw glamour of 70s rock and early punk, filtered through the precision of designers like Westwood, Margiela, and Galliano. Once that foundation was in place, I moved into developing their logo, translating that same tension into a mark built to carry the weight of the jewellery itself. The result is a brand that reads like the pieces it sells: permanence, weight, presence.",
    ],
    link: "https://weareceremonia.com/",
    linkLabel: "View site",
    hero: "assets/img/ceremonia/hero.webp",
    // Gallery order and entry types are DERIVED from assets/work/04-ceremonia/'s
    // own file numbering and names — regenerated with scripts/sync-project.py
    // (see sync-de-proyectos.md), never hand-edited. Last rebuild 2026-08-22,
    // after the user replaced the three banner strips (02/05/08-carrusel-N).
    // Al re-sincronizar hay que pasar OVERRIDES='{"carrusel1":{"height":30},
    // "carrusel2":{"height":30},"carrusel3":{"height":30},"slidecut4":{"height":460}}'
    // para que el build genere los tres banners a 120px de alto (3x los 30 que se
    // muestran) en vez de sus 266 nativos. Sin eso vuelven a pesar 79x mas pixeles
    // de los que se ven.
    // carrusel1/2/3 sit at height:30 (narrow strips, the user's own call) and
    // the slide-cut group at height:460 because its 5 photos mix aspect ratios.
    gallery: [
      { type: "video", src: "assets/img/ceremonia/hero.mp4", poster: "assets/img/ceremonia/hero-poster.jpg" },
      "assets/img/ceremonia/foto-01.webp",
      {
        type: "carrusel",
        height: 30,
        items: [
          "assets/img/ceremonia/carrusel1-01.webp",
        ],
      },
      "assets/img/ceremonia/foto-02.webp",
      "assets/img/ceremonia/foto-03.webp",
      {
        type: "carrusel",
        height: 30,
        items: [
          "assets/img/ceremonia/carrusel2-01.webp",
        ],
      },
      "assets/img/ceremonia/foto-04.webp",
      "assets/img/ceremonia/foto-05.webp",
      {
        type: "carrusel",
        height: 30,
        items: [
          "assets/img/ceremonia/carrusel3-01.webp",
        ],
      },
      { type: "video", src: "assets/img/ceremonia/video-01.mp4", poster: "assets/img/ceremonia/video-01-poster.jpg" },
      {
        type: "slideshow",
        height: 460,
        items: [
          "assets/img/ceremonia/slidecut4-01.webp",
          "assets/img/ceremonia/slidecut4-02.webp",
          "assets/img/ceremonia/slidecut4-03.webp",
          "assets/img/ceremonia/slidecut4-04.webp",
          "assets/img/ceremonia/slidecut4-05.webp",
        ],
      },
      [
        "assets/img/ceremonia/carrusel4-01.webp",
      ],
    ],
  },
  {
    slug: "roark",
    brand: "Roark & Zero Skateboards",
    category: "Illustration",
    blurb:
      "Knife illustrations for a 50-board limited edition skate deck and apparel collab between Roark and Zero Skateboards, hand-signed and numbered by pro skater Jamie Thomas.",
    body: [
      "Roark met Joaquin Motor — Joaquin Lavori's illustration alter ego — through their Argentine guide Manu Dominguez, on a trip through Buenos Aires with pro skater Jamie Thomas. Roark commissioned a knife illustration built on Motor's own relationship with the tool: not a weapon, but, in his words, \"my best friend and partner when I'm out in the desert or camping.\" The piece became Motor's Blade, paired with Zero's own skull mark on a 50-board limited edition, hand-signed and numbered by Jamie Thomas. From there I designed a series of four knife illustrations that Roark carried onto the Motor's Blade L/S Tee. The boards sold out within hours.",
    ],
    link: "https://au.roark.com/blogs/the-artifacts-of-adventure/a-new-collaboration-with-zero-skateboards",
    linkLabel: "View project",
    hero: "assets/img/roark/hero.webp",
    // Gallery order and entry types follow assets/work/05-roark/'s own file
    // numbering (01-20, renamed by the user 2026-08-22 — the first pass had
    // 02/03/04 used twice, once by carrusel-N and once by slide-cut-1, and a
    // second pass reused carrusel-1/carrusel-2 for two separate runs; the
    // current names are the corrected, unambiguous set). Entry shapes are the
    // same as afends/ceremonia/lacalle — see those projects' comments.
    // Skipped on purpose: the two loose "Screenshot 2026-08-17..." files in
    // the source folder carry no number and no type, so per the user's own
    // convention they are not gallery entries (2026-08-22, confirmed).
    gallery: [
      "assets/img/roark/hero.webp",
      ["assets/img/roark/carrusel1-01.webp", "assets/img/roark/carrusel1-02.webp"],
      // height:200 — single-photo carrusel (the 4 knife illustrations), same
      // 1-item marquee precedent as afends' spreads and Ceremonia's carrusel4.
      // 200px was the first try; the user then asked for "70px menos de alto"
      // (2026-08-22), so 130px.
      { type: "carrusel", items: ["assets/img/roark/carrusel2-01.webp"], height: 130 },
      "assets/img/roark/foto-01.webp",
      {
        type: "slideshow",
        items: ["assets/img/roark/slidecut1-01.webp", "assets/img/roark/slidecut1-02.webp"],
      },
      [
        "assets/img/roark/carrusel3-01.webp",
        "assets/img/roark/carrusel3-02.webp",
        "assets/img/roark/carrusel3-03.webp",
        "assets/img/roark/carrusel3-04.webp",
      ],
      {
        // speed:70 px/s instead of the global MARQUEE_PX_PER_SEC (55)
        // — "carrusel 4 tiene que correr apenas mas rapido" (2026-08-22).
        // ~25% faster; the other three carruseles here keep the default.
        type: "carrusel",
        speed: 70,
        items: [
          "assets/img/roark/carrusel4-01.webp",
          "assets/img/roark/carrusel4-02.webp",
          "assets/img/roark/carrusel4-03.webp",
          "assets/img/roark/carrusel4-04.webp",
        ],
      },
      "assets/img/roark/foto-02.webp",
      "assets/img/roark/foto-03.webp",
    ],
  },
  {
    slug: "vans",
    brand: "Vans Argentina",
    category: "Illustration & Character Design",
    blurb: "A series of illustrations and an original mascot for Vans Argentina, built around skate, surf, music, and street culture.",
    body: [
      "After two years as Vans Argentina's art director, Joaquin Motor — Joaquin Lavori's illustration alter ego — became the brand's artistic ambassador, building a series of illustrations for their campaigns. Vans has defined itself since 1966 in California through creativity, authenticity, and skate culture, later expanding that identity into art, music, and DIY. Each illustration was built around the brand's core pillars — skateboarding, surf, music, and street life — chasing the same mix of irreverence and belonging Vans has always cultivated. Along the way, I developed an original mascot, a mushroom character that became a recurring face across the work and found an audience of its own.",
    ],
    link: "https://www.instagram.com/vansargentina/",
    linkLabel: "View site",
    hero: "assets/img/vans/hero.webp",
    // Realces por pieza (2026-08-23, pedido del usuario: "la foto del hero y
    // la 35 deberian tener una animacion de slideup como hicimos con los
    // textos en la parte de INFO, y deberian tener 50px de margen de cada
    // lado"). La 35 es 35-foto.png en assets/work/06-vans/, que el script
    // saca como foto-06.webp.
    // OJO: esto va FUERA de `gallery` a proposito. Ese bloque se regenera
    // entero con scripts/sync-project.py y cualquier edicion a mano ahi se
    // pierde en la proxima re-sincronizacion; el script solo reemplaza
    // `hero:` + `gallery:`, asi que este campo sobrevive.
    // La clave es el nombre del archivo sin carpeta ni extension.
    // El 2026-08-24 el usuario saco el `inset: 50` que tenian las dos: quedan
    // al ancho normal de la galeria (6px de padding lateral, como el resto) y
    // conservan solo el reveal. El campo `inset` sigue soportado en
    // accentAttrs()/styles.css por si vuelve.
    mediaAccents: {
      hero: { reveal: true },
      "foto-06": { reveal: true },
    },
    // Galeria DERIVADA de los nombres de archivo de assets/work/06-vans/,
    // regenerada con scripts/sync-project.py (ver sync-de-proyectos.md), nunca
    // editada a mano. Re-sincronizada 2026-08-24: el usuario rehizo la carpeta
    // entera — hero nuevo (01-hero.JPG en vez de .png), video nuevo en el 16
    // (16-video2.mov, ya no estan 16-video1*.mp4), las tres fotos sueltas del
    // 18/19/20 pasaron a ser el grupo carrusel-3 (que antes vivia en el 21-24),
    // 33-carrusel.png se movio al 23, se cayo 31-video.m4v (queda solo
    // 31-video-opt.mp4), 35-foto paso de .png a .JPG, y entraron 22-foto,
    // 24-foto y 34-foto.
    // Notas de como esta nombrada la carpeta:
    //  - 23-carrusel.png no lleva numero de grupo, por eso su salida es
    //    carrusel-01.webp (sin digito) en vez de carruselN-01.webp.
    //  - 14-carrusel-2 y 23-carrusel son composiciones anchas envueltas como
    //    carruseles de 1 solo item (mismo precedente que los spreads de
    //    afends): no scrollean contra otras fotos, loopean sobre si mismas.
    //  - "slidecut-1" va sin el guion que usa La Calle Bar; el parser acepta
    //    las dos formas.
    //  - el carrusel del 23 va a height:200 por pedido del usuario
    //    (2026-08-22), que ademas reporto que "salta y se traba". Su archivo se
    //    genera a 600px de alto (3x los 200 que se muestran) en vez de los 660
    //    del default: para una tira de 6:1 eso significaba 4019px de ancho
    //    nativo, 20 MB de textura para pintar 1.9 MB. AL RE-SINCRONIZAR VANS
    //    HAY QUE PASAR OVERRIDES='{"carrusel": {"height": 200}}', si no el
    //    build lo saca a 660 y el override se pierde de data.js.
    gallery: [
      "assets/img/vans/hero.webp",
      [
        "assets/img/vans/carrusel1-01.webp",
        "assets/img/vans/carrusel1-02.webp",
        "assets/img/vans/carrusel1-03.webp",
        "assets/img/vans/carrusel1-04.webp",
        "assets/img/vans/carrusel1-05.webp",
      ],
      {
        type: "slideshow",
        items: [
          "assets/img/vans/slidecut1-01.webp",
          "assets/img/vans/slidecut1-02.webp",
          "assets/img/vans/slidecut1-03.webp",
          "assets/img/vans/slidecut1-04.webp",
          "assets/img/vans/slidecut1-05.webp",
          "assets/img/vans/slidecut1-06.webp",
          "assets/img/vans/slidecut1-07.webp",
        ],
      },
      [
        "assets/img/vans/carrusel2-01.webp",
      ],
      { type: "video", src: "assets/img/vans/video-01.mp4", poster: "assets/img/vans/video-01-poster.jpg" },
      "assets/img/vans/foto-01.webp",
      [
        "assets/img/vans/carrusel3-01.webp",
        "assets/img/vans/carrusel3-02.webp",
        "assets/img/vans/carrusel3-03.webp",
        "assets/img/vans/carrusel3-04.webp",
      ],
      "assets/img/vans/foto-02.webp",
      {
        type: "carrusel",
        height: 200,
        items: [
          "assets/img/vans/carrusel-01.webp",
        ],
      },
      "assets/img/vans/foto-03.webp",
      { type: "video", src: "assets/img/vans/video-02.mp4", poster: "assets/img/vans/video-02-poster.jpg" },
      "assets/img/vans/foto-04.webp",
      { type: "video", src: "assets/img/vans/gif.mp4", poster: "assets/img/vans/gif-poster.jpg" },
      "assets/img/vans/foto-05.webp",
      "assets/img/vans/foto-06.webp",
      [
        "assets/img/vans/carrusel4-01.webp",
      ],
    ],
  },
  {
    slug: "laguitarrita",
    brand: "La Guitarrita",
    category: "Branding & Web Design",
    blurb: "A logo redesign, 60th-anniversary seal, and full identity refresh for La Guitarrita, Buenos Aires' football-founded pizzeria.",
    body: [
      "La Guitarrita asked me to redesign their logo — keeping the identity intact while bringing it up to contemporary standards — and to create a commemorative seal marking their 60th anniversary. Founded in 1963 by two footballers, René Pontoni and Mario Boye, La Guitarrita has carried their spirit across generations and locations throughout Buenos Aires, built around the smell of quebracho colorado wood and the history of football running through the place. The redesign moved beyond the mark itself into their website, printed menu, and pizza box, rebuilding the identity end to end while keeping sixty years of memory intact. The result is a legendary neighborhood pizzeria dressed for its next sixty.",
    ],
    link: "https://laguitarrita.com.ar/",
    linkLabel: "View site",
    hero: "assets/img/laguitarrita/hero.webp",
    // Gallery order and entry types are DERIVED from assets/work/07-la-guitarrita/'s
    // own file numbering and names — generated with scripts/sync-project.py (see
    // sync-de-proyectos.md), never hand-edited. The hero here is a still photo
    // (4500x3000), not a video, so hero.webp is both the tile cover and
    // gallery[0]. slidecut1 carries height:280 because its 3 photos mix 4:3
    // and 3:2 (2026-08-22, applied by default so the box doesn't jump on the
    // cut — a small crop, easy to drop if the user prefers natural size).
    gallery: [
      "assets/img/laguitarrita/hero.webp",
      "assets/img/laguitarrita/foto-01.webp",
      [
        "assets/img/laguitarrita/carrusel1-01.webp",
        "assets/img/laguitarrita/carrusel1-02.webp",
        "assets/img/laguitarrita/carrusel1-03.webp",
      ],
      {
        type: "slideshow",
        height: 280,
        items: [
          "assets/img/laguitarrita/slidecut1-01.webp",
          "assets/img/laguitarrita/slidecut1-02.webp",
          "assets/img/laguitarrita/slidecut1-03.webp",
        ],
      },
      { type: "video", src: "assets/img/laguitarrita/video-01.mp4", poster: "assets/img/laguitarrita/video-01-poster.jpg" },
      [
        "assets/img/laguitarrita/carrusel2-01.webp",
        "assets/img/laguitarrita/carrusel2-02.webp",
        "assets/img/laguitarrita/carrusel2-03.webp",
        "assets/img/laguitarrita/carrusel2-04.webp",
      ],
      { type: "video", src: "assets/img/laguitarrita/video-02.mp4", poster: "assets/img/laguitarrita/video-02-poster.jpg" },
      [
        "assets/img/laguitarrita/carrusel3-01.webp",
        "assets/img/laguitarrita/carrusel3-02.webp",
        "assets/img/laguitarrita/carrusel3-03.webp",
        "assets/img/laguitarrita/carrusel3-04.webp",
        "assets/img/laguitarrita/carrusel3-05.webp",
        "assets/img/laguitarrita/carrusel3-06.webp",
      ],
    ],
  },
  {
    slug: "fatima",
    brand: "Fatima",
    category: "Branding & Illustration",
    blurb:
      "An alternative logo, t-shirt collection, and limited edition surfboard for Fatima Surfboards, hand-shaped between Byron Bay and Buenos Aires.",
    body: [
      "Fatima Surfboards asked Joaquin Motor — Joaquin Lavori's illustration alter ego — to design one of their alternative logos, alongside a t-shirt collection and a limited edition surfboard. Founder Nicolas Fatima hand-shapes boards between Byron Bay, Australia, and Buenos Aires, Argentina, building them around a simple idea: surfboards as instruments of freedom and joy, not objects. Their existing logo was too detailed and rigid to carry that spirit, so I loosened it up, giving the brand a mark closer to what Nicolas actually puts into every board. That same looseness carried through the t-shirt collection and onto a limited edition board, translating the brand's hand-made, unhurried spirit into wearable and rideable pieces.",
    ],
    link: "https://www.instagram.com/fatimasurfboards",
    linkLabel: "View site",
    hero: "assets/img/fatima/hero.webp",
    // Gallery order and entry types are DERIVED from assets/work/08-fatima/'s own
    // file numbering and names — generated with scripts/sync-project.py (see
    // sync-de-proyectos.md), never hand-edited. Notes for this project:
    // "carrusel1/2/3" are written without the hyphen before the group number
    // (the parser accepts that too); carrusel1 and carrusel3 are single
    // panoramic strips (22127x1008 and 23159x1007 in the source) capped to
    // 9600px wide so they stay under mobile browsers' texture limits; and
    // Al re-sincronizar hay que pasar OVERRIDES='{"carrusel1":{"height":50},
    // "carrusel3":{"height":50},"carrusel2":{"height":150,"speed":83},
    // "slidecut1":{"height":474}}' para que el build genere carrusel1/3 a 150px de
    // alto y carrusel2 a 450 (3x lo que se muestran) en vez de 437/417 nativos.
    // carrusel1 and carrusel3 sit at height:50 (2026-08-22, user request:
    // "05 carrusel, 25 carrusel, van de 50px de alto") and carrusel2, the
    // 4-photo group, at height:150 too. 29-gif.gif is copied
    // through as a GIF rather than converted, so the
    // 2-frame animation survives — <img> plays it natively.
    gallery: [
      { type: "video", src: "assets/img/fatima/hero.mp4", poster: "assets/img/fatima/hero-poster.jpg" },
      "assets/img/fatima/foto-01.webp",
      "assets/img/fatima/foto-02.webp",
      { type: "video", src: "assets/img/fatima/video-01.mp4", poster: "assets/img/fatima/video-01-poster.jpg" },
      {
        type: "carrusel",
        height: 50,
        items: [
          "assets/img/fatima/carrusel1-01.webp",
        ],
      },
      {
        type: "slideshow",
        // height:474 — the 6 photos are almost but not quite the same shape
        // (ratios .79 to .81), so at natural size the box grew and shrank by
        // ~12px on every cut (2026-08-22, user: "hay como un salto de tamano
        // en un slide-cut"). 474 is the midpoint of their rendered heights,
        // so the crop is a few pixels either way.
        height: 474,
        items: [
          "assets/img/fatima/slidecut1-01.webp",
          "assets/img/fatima/slidecut1-02.webp",
          "assets/img/fatima/slidecut1-03.webp",
          "assets/img/fatima/slidecut1-04.webp",
          "assets/img/fatima/slidecut1-05.webp",
          "assets/img/fatima/slidecut1-06.webp",
        ],
      },
      { type: "video", src: "assets/img/fatima/video-02.mp4", poster: "assets/img/fatima/video-02-poster.jpg" },
      {
        type: "carrusel",
        height: 150,
        // speed:83 px/s = 1.5x the global MARQUEE_PX_PER_SEC (55) — "0.5 mas
        // rapido" (2026-08-22). The two panoramic strips keep the default.
        speed: 83,
        items: [
          "assets/img/fatima/carrusel2-01.webp",
          "assets/img/fatima/carrusel2-02.webp",
          "assets/img/fatima/carrusel2-03.webp",
          "assets/img/fatima/carrusel2-04.webp",
        ],
      },
      { type: "video", src: "assets/img/fatima/video-03.mp4", poster: "assets/img/fatima/video-03-poster.jpg" },
      "assets/img/fatima/foto-03.webp",
      "assets/img/fatima/foto-04.webp",
      "assets/img/fatima/foto-05.webp",
      "assets/img/fatima/foto-06.webp",
      "assets/img/fatima/foto-07.webp",
      "assets/img/fatima/foto-08.webp",
      "assets/img/fatima/foto-09.webp",
      {
        type: "carrusel",
        height: 50,
        items: [
          "assets/img/fatima/carrusel3-01.webp",
        ],
      },
      { type: "video", src: "assets/img/fatima/video-04.mp4", poster: "assets/img/fatima/video-04-poster.jpg" },
      "assets/img/fatima/foto-10.webp",
      "assets/img/fatima/foto-11.webp",
      "assets/img/fatima/gif.gif",
    ],
  },
  {
    slug: "lightningbolt",
    brand: "Lightning Bolt Argentina",
    category: "Illustration & Apparel Design",
    blurb: "An illustrated capsule collection for Lightning Bolt Argentina — tees, hangtags, and a mug — built around the brand's Hawaiian surf origins.",
    body: [
      "Lightning Bolt Argentina commissioned a full illustrated capsule, Underground Corp, built around a single idea: climbing up to the attic and opening a dusty box of memories, going back to the origin. The concept traces the creative potential of Gerry Lopez and Barry Kanaiaupuni, two friends in Hawaii living out their dream before they ever founded Lightning Bolt. I illustrated a set of tattoo-flash pieces around that world — skulls, snakes, a prowling panther, a co-branded Bolt Motor wordmark — carried across a full run of tees, hangtags, and a mug. The result reads like something pulled out of that same dusty box: old enough to feel found, new enough to wear.",
    ],
    link: "https://www.lightningbolt.com.ar/",
    linkLabel: "View site",
    hero: "assets/img/lightningbolt/hero.webp",
    // Galeria DERIVADA de los nombres de archivo de assets/work/09-bolt/,
    // regenerada con scripts/sync-project.py (ver sync-de-proyectos.md), nunca
    // editada a mano. Subida 2026-08-22.
    // OJO: el usuario nombro TRES grupos de carrusel distintos con el numero 2
    // (16-carrusel-2, 23-carrusel-02, 25/26/27-carrusel-2). El script ahora
    // desambigua y el ultimo salio como carrusel3-*; los nombres de origen
    // quedan como estan, la desambiguacion es solo de salida.
    // Galeria DERIVADA de los nombres de archivo de assets/work/09-bolt/,
    // regenerada con scripts/sync-project.py (ver sync-de-proyectos.md), nunca
    // editada a mano. Re-sincronizada 2026-08-22 con las fotos que optimizo el
    // usuario. Dos cosas de como esta nombrada la carpeta:
    //  - el usuario nombro TRES grupos de carrusel con el numero 2
    //    (16-carrusel-2, 23-carrusel-02, 25/26/27-carrusel-2); el script
    //    desambigua y el ultimo sale como carrusel3-*.
    //  - carrusel2 y carrusel02 son las dos tiras panoramicas, a height:50.
    // Al re-sincronizar hay que pasar
    // OVERRIDES='{"carrusel2": {"height": 50}, "carrusel02": {"height": 50}}'
    // para que el build genere esos dos a 150px de alto (3x los 50 que se
    // muestran) en vez de los 626 nativos: asi salieron 1800x150 y 1499x150 en
    // vez de 7513x626 y 6257x626, que eran ~19 MB de textura cada uno.
    gallery: [
      "assets/img/lightningbolt/hero.webp",
      "assets/img/lightningbolt/foto-01.webp",
      {
        type: "slideshow",
        items: [
          "assets/img/lightningbolt/slidecut1-01.webp",
          "assets/img/lightningbolt/slidecut1-02.webp",
          "assets/img/lightningbolt/slidecut1-03.webp",
          "assets/img/lightningbolt/slidecut1-04.webp",
          "assets/img/lightningbolt/slidecut1-05.webp",
          "assets/img/lightningbolt/slidecut1-06.webp",
          "assets/img/lightningbolt/slidecut1-07.webp",
        ],
      },
      [
        "assets/img/lightningbolt/carrusel1-01.webp",
        "assets/img/lightningbolt/carrusel1-02.webp",
        "assets/img/lightningbolt/carrusel1-03.webp",
        "assets/img/lightningbolt/carrusel1-04.webp",
        "assets/img/lightningbolt/carrusel1-05.webp",
      ],
      "assets/img/lightningbolt/foto-02.webp",
      {
        type: "carrusel",
        height: 50,
        items: [
          "assets/img/lightningbolt/carrusel2-01.webp",
        ],
      },
      {
        type: "slideshow",
        items: [
          "assets/img/lightningbolt/slidecut2-01.webp",
          "assets/img/lightningbolt/slidecut2-02.webp",
          "assets/img/lightningbolt/slidecut2-03.webp",
          "assets/img/lightningbolt/slidecut2-04.webp",
          "assets/img/lightningbolt/slidecut2-05.webp",
          "assets/img/lightningbolt/slidecut2-06.webp",
        ],
      },
      {
        type: "carrusel",
        height: 50,
        items: [
          "assets/img/lightningbolt/carrusel02-01.webp",
        ],
      },
      { type: "video", src: "assets/img/lightningbolt/video-01.mp4", poster: "assets/img/lightningbolt/video-01-poster.jpg" },
      [
        "assets/img/lightningbolt/carrusel3-01.webp",
        "assets/img/lightningbolt/carrusel3-02.webp",
        "assets/img/lightningbolt/carrusel3-03.webp",
      ],
    ],
  },
  {
    slug: "fortyspotted",
    brand: "Forty Spotted",
    category: "Illustration & Brand Artwork",
    blurb:
      "Original illustrations for Forty Spotted Gin, built to run across merchandise and digital.",
    body: [
      "Forty Spotted is the Tasmanian gin from Lark Distilling Co., a brand with a youthful, playful streak, and they came to me with a brief for a series of original illustrations to carry it. I drew a set of vector artworks around the pieces people already associate with the gin: the bottle, the Gin Sonic serve, and the orange garnish that signs off every pour. The line had to stay loose enough to feel drawn by hand but clean enough to hold at any size, because the same artwork had to live on shirts, hats, towels and cups as much as on screen. I worked alongside the Forty Spotted marketing team through each round and delivered final files prepared for every application. The result is a small illustrated vocabulary the brand can keep pulling from, recognisable as Forty Spotted before you read the name.",
    ],
    link: "https://fortyspotted.com/",
    linkLabel: "View site",
    hero: "assets/img/fortyspotted/hero.webp",
    // Galeria DERIVADA de los nombres de archivo de assets/work/17 - Forty Spotted/,
    // generada con scripts/sync-project.py (ver sync-de-proyectos.md), nunca editada
    // a mano. Subida y re-sincronizada 2026-08-22 (el usuario cambio el hero y
    // reordeno fotos: 01-hero y 10-foto se intercambiaron). Dos cosas de como esta nombrada la carpeta:
    //  - 18-carrusel-4 y 24-carrusel-4 repiten el numero de grupo y no son
    //    consecutivos, asi que son dos grupos: el segundo salio carrusel5-*.
    //  - carrusel4-01 es una tira de 2506x95; va a height:25 por pedido del usuario
    //    (2026-08-22). Se habia dejado en 95, su alto nativo, para que los 220px del
    //    default no la agrandaran; el la quiso mas fina todavia.
    gallery: [
      "assets/img/fortyspotted/hero.webp",
      "assets/img/fortyspotted/foto-01.webp",
      [
        "assets/img/fortyspotted/carrusel1-01.webp",
        "assets/img/fortyspotted/carrusel1-02.webp",
        "assets/img/fortyspotted/carrusel1-03.webp",
      ],
      "assets/img/fortyspotted/foto-02.webp",
      "assets/img/fortyspotted/foto-03.webp",
      [
        "assets/img/fortyspotted/carrusel2-01.webp",
      ],
      "assets/img/fortyspotted/foto-04.webp",
      "assets/img/fortyspotted/foto-05.webp",
      "assets/img/fortyspotted/foto-06.webp",
      [
        "assets/img/fortyspotted/carrusel3-01.webp",
        "assets/img/fortyspotted/carrusel3-02.webp",
        "assets/img/fortyspotted/carrusel3-03.webp",
      ],
      "assets/img/fortyspotted/foto-07.webp",
      {
        type: "carrusel",
        height: 25,
        items: [
          "assets/img/fortyspotted/carrusel4-01.webp",
        ],
      },
      {
        type: "slideshow",
        items: [
          "assets/img/fortyspotted/slidecut1-01.webp",
          "assets/img/fortyspotted/slidecut1-02.webp",
          "assets/img/fortyspotted/slidecut1-03.webp",
          "assets/img/fortyspotted/slidecut1-04.webp",
          "assets/img/fortyspotted/slidecut1-05.webp",
        ],
      },
      [
        "assets/img/fortyspotted/carrusel5-01.webp",
      ],
    ],
  },
  {
    slug: "aim",
    brand: "AIM Miami",
    category: "Branding & Web Design",
    blurb: "Brand concept, logo, and web design for AIM Miami, a nonprofit supporting kids through afterschool programs.",
    body: [
      "As creative director, I developed the brand concept and logo for AIM, a Miami-based nonprofit built around a simple mission: helping kids build the practical skills, confidence, and support they need to manage daily life and work toward their personal, academic, and professional goals through afterschool programming. The identity needed to carry that same sense of momentum — AIM's own language is \"let's level up\" — so I built a mark and system that felt encouraging rather than clinical, closer to the kids they serve than to a typical nonprofit look. From there, I helped shape their website, including a donation button built to make recurring giving as simple as signing up. The result gives AIM an identity that matches the confidence it's trying to build in every kid who walks through the door.",
    ],
    link: "https://aimmiami.org/",
    linkLabel: "View site",
    hero: "assets/img/aim/01.png",
    gallery: ["assets/img/aim/01.png", "assets/img/aim/02.png", "assets/img/aim/03.png", "assets/img/aim/04.png"],
  },
  {
    slug: "voicot",
    brand: "Voicot",
    category: "Art Direction & Illustration",
    blurb: "A free street poster for VOICOT, a movement for animal liberation, art directed end to end for public activism.",
    body: [
      "VOICOT commissioned Joaquin Motor — Joaquin Lavori's illustration alter ego — to art direct a street poster from the ground up: copy, illustration, style, and print files. VOICOT is a movement for animal, human, and earth liberation that has always spoken through public material — t-shirts, fanzines, posters — built to counter what they call the lies of advertising. This piece needed to carry that same directness onto the street: a free, 1 x 0.70 meter poster, printed and handed out to anyone willing to paste it up themselves. I wrote the text and built the illustration around a single line, La fuerza está en las plantas — the force is in the plants — framing a plant-based diet not as a restriction but as an act of love. The result is activist material built to travel: pasted on a wall, torn down, put back up somewhere else.",
    ],
    link: "https://www.instagram.com/voicot/",
    linkLabel: "View site",
    hero: "assets/img/voicot/01.jpg",
    gallery: ["assets/img/voicot/01.jpg", "assets/img/voicot/02.jpg", "assets/img/voicot/03.jpg", "assets/img/voicot/04.jpg"],
  },
  {
    slug: "signal",
    brand: "Signal Snowboards",
    category: "Illustration",
    blurb: "Illustration for The Manu Shiv, a 100-board limited edition designed with pro rider Manu Dominguez for Signal Snowboards, California.",
    body: [
      "Signal Snowboards, a Huntington Beach, California company known for pioneering direct-to-consumer snowboards, commissioned an illustration for The Manu Shiv, a limited edition of 100 boards built for professional rider — and close friend — Manu Dominguez. Based on Signal's award-winning Epic shape, the Manu Shiv was mellowed out into a directional deck built to handle park laps, streets, and powder alike, a board Signal itself called a \"Swiss Army knife on the hill.\" I illustrated the top sheet graphic that carried the board through its full run, released as part of Signal's 2017 winter lineup. The result put Manu's name — and mine — on a board built to do a little bit of everything, just like the friendship behind it.",
    ],
    link: "https://www.snowboarder.com/gear/signal-snowboards-launches-round-two-snowboards",
    linkLabel: "View project",
    year: "2017",
    hero: "assets/img/signal/01.jpg",
    gallery: [
      "assets/img/signal/01.jpg",
      "assets/img/signal/02.jpg",
      "assets/img/signal/03.jpg",
      "assets/img/signal/04.jpg",
      "assets/img/signal/05.jpg",
    ],
  },
];

const INFO_CONTENT = {
  // Pencil's Info Mobile (trYo5) splits this into 3 paragraphs (blank-line
  // separated); Desktop (X8g8f) shows it as one continuous block instead —
  // renderInfo() below splits on the blank lines for mobile rendering.
  bio: "I'm Joaquin, a graphic designer and illustrator. I grew up in Buenos Aires and I'm currently living in Byron Bay.\n\nI've been working in design for over ten years. Most of it is brand identity, helping people grow their brand without losing what made it theirs in the first place. I like it when a project ends up with a character of its own. I ask a lot of questions before I open anything on the computer.\n\nI take photos when I'm not designing. Some of them are in Side B.",
  sections: [
    {
      title: "So, how do I actually help you?",
      body: "By building your identity from the ground up. It shows up as brand mentorship, logos, web design, apparel, and campaign material, for brands across fashion, music, food, action sports, and activism.",
    },
    {
      title: "Where does a brand actually start?",
      body: "With a clear read of the problem. That becomes a direction and a plan of action, so your project grows on stable ground instead of guesswork.",
    },
    {
      title: "Who carries that through to the finished piece?",
      body: "Together working as a team — from first concept to final asset, I'll direct the visual world of your brand through creative direction and campaign work.",
    },
  ],
  // 8 categories, in the exact order/split Pencil's Info Grid uses on
  // mobile (5 in Column A, 3 in Column B — see infoColumnsHTML() in
  // script.js). As of 2026-08-11 this is the SAME canonical set/values
  // INFO_DESKTOP below shows (Pencil unified mobile and desktop content —
  // previously mobile had its own leaner placeholder list here, see
  // notas.md). INFO_DESKTOP now reuses these arrays by index instead of
  // duplicating them, so there's one source of truth per category.
  columns: [
    {
      label: "Areas of Expertise",
      values: ["Creative Direction", "Visual Identity", "Illustration", "Web Design", "Packaging Design"],
    },
    {
      label: "Courses and Workshops Delivered",
      values: ["Ideas to Paper, Palmira Estudios", "Idea to Skin, University of Palermo", "Urban Interventions, Argentine University of Enterprise"],
    },
    {
      label: "Operating Sectors",
      values: ["Fashion", "Food & Drink", "Arts & Culture", "Product Design", "Retail"],
    },
    {
      label: "Core Principles",
      values: ["Active Listening", "Functionality", "Passion", "Authenticity"],
    },
    {
      label: "Media Coverage",
      values: ["Obra Compartida, Ernesto Pesce", "Revista Otra", "Diario de viaje al desierto, Bucle Editorial", "7 Capas Magazine", "Diario La Nación", "Diario Popular"],
    },
    {
      label: "Tools",
      values: ["Adobe Suite", "Procreate", "Resolume", "Pencil", "Figma"],
    },
    {
      label: "Selected Clients",
      values: ["Vans", "Afends", "The Movement", "La Calle Bar", "Zero Skateboards"],
    },
    {
      label: "Awards",
      values: ['Art Basel Cities, "Eternity" by Maurizio Cattelan (2018)', "VET Academic Excellence, Greystone College (2026)"],
    },
  ],
  cta: "For new partnerships and general enquiries, book a free 15-minute consultation. Always happy to hear what people are working on.",
  // La parte de la frase que se vuelve link cuando ctaLinkUrl tiene valor.
  // Tiene que aparecer TAL CUAL adentro de cta o no se linkea nada.
  ctaLinkText: "book a free 15-minute consultation",
  // Calendly. Vacio = la frase se muestra como texto plano (ver infoCtaHTML()
  // en script.js). Poner la URL aca es lo unico que hace falta para prenderlo.
  ctaLinkUrl: "",
};

// Info Desktop (X8g8f) — a different layout from Info Mobile, not a reflow
// of it: 3 content columns, each ending in a photo. Reuses INFO_CONTENT.columns
// by index for every category (as of 2026-08-11 mobile and desktop show the
// same 8 categories/values — see the comment on that field above), and adds
// "Say Hello" (desktop-only, no mobile equivalent). See notas.md.
const INFO_DESKTOP = {
  columns: [
    {
      sections: [
        ...INFO_CONTENT.sections,
        { title: "Areas of Expertise", list: INFO_CONTENT.columns[0].values },
        { title: "Courses and Workshops Delivered", list: INFO_CONTENT.columns[1].values },
      ],
    },
    {
      sections: [
        { title: "Core Principles", list: INFO_CONTENT.columns[3].values },
        { title: "Operating Sectors", list: INFO_CONTENT.columns[2].values },
        { title: "Media Coverage", list: INFO_CONTENT.columns[4].values },
        { title: "Tools", list: INFO_CONTENT.columns[5].values },
      ],
    },
    {
      sections: [
        { title: "Selected Clients", list: INFO_CONTENT.columns[6].values },
        { title: "Awards", list: INFO_CONTENT.columns[7].values },
        {
          title: "Say Hello",
          body: "For new partnerships and general enquiries, reach out, always happy to hear what people are working on. hello@joaquin.com or +61 499 372 409. Currently living in NSW, Australia. Got a project in mind? Send a short brief with scope, timeline and budget — I'll get back within two business days to see if it's a fit.",
        },
      ],
    },
  ],
};

// Side B — experiments, discarded directions, off-cuts. Placeholder set,
// reuses existing project imagery until dedicated Side B material is ready.
const SIDE_B = {
  // Short kicker-style intro shown on mobile (matches Pencil's Side B Mobile,
  // yi8Jx). `intro` (below) is the longer version used on Desktop (Side B
  // Desktop, BI3ZW) — Desktop layout itself isn't built yet, see notas.md.
  introMobile:
    "Experiments, dropped ideas, and pieces that never found a home. The collection keeps every day.",
  intro:
    "Here you will find an assorted mix of experiments, some failed and some discarded, ideas I loved and then dropped, offshoots of finished projects, half-formed thoughts, and typographic play that never found a home. I keep them here because even the pieces nobody used still carry something worth looking at. The collection keeps growing as I keep making things on the side.",
  // El material propio del usuario (assets/side-b/), nombrado con la MISMA
  // convencion que un proyecto: <NN>-<tipo>[-<grupo>]. Se procesa con
  // scripts/sync-project.py ../side-b side-b --build. Reemplaza a los 6
  // `items` con titulo/categoria/blurb que habia antes: ese texto era
  // inventado y las imagenes eran jpgs de 300px de la era placeholder de
  // vans/lacalle/fatima/laguitarrita/lightningbolt, que se renderizaban
  // borrosas apenas se prendia cada proyecto (2026-08-23).
  gallery: [
    "assets/img/side-b/foto-01.webp",
    "assets/img/side-b/foto-02.webp",
    "assets/img/side-b/foto-03.webp",
    {
      type: "slideshow",
      items: [
        "assets/img/side-b/slidecut1-01.webp",
        "assets/img/side-b/slidecut1-02.webp",
        "assets/img/side-b/slidecut1-03.webp",
      ],
    },
    { type: "video", src: "assets/img/side-b/video-01.mp4", poster: "assets/img/side-b/video-01-poster.jpg" },
    [
      "assets/img/side-b/carrusel1-01.webp",
      "assets/img/side-b/carrusel1-02.webp",
    ],
    {
      type: "slideshow",
      items: [
        "assets/img/side-b/slidecut2-01.webp",
        "assets/img/side-b/slidecut2-02.webp",
        "assets/img/side-b/slidecut2-03.webp",
        "assets/img/side-b/slidecut2-04.webp",
      ],
    },
    "assets/img/side-b/foto-04.webp",
    "assets/img/side-b/foto-05.webp",
    "assets/img/side-b/foto-06.webp",
    "assets/img/side-b/foto-07.webp",
    "assets/img/side-b/foto-08.webp",
    "assets/img/side-b/foto-09.webp",
    { type: "video", src: "assets/img/side-b/video-02.mp4", poster: "assets/img/side-b/video-02-poster.jpg" },
    "assets/img/side-b/foto-10.webp",
    "assets/img/side-b/foto-11.webp",
    {
      type: "slideshow",
      items: [
        "assets/img/side-b/slidecut3-01.webp",
        "assets/img/side-b/slidecut3-02.webp",
        "assets/img/side-b/slidecut3-03.webp",
      ],
    },
    "assets/img/side-b/foto-12.webp",
    "assets/img/side-b/foto-13.webp",
    {
      type: "slideshow",
      items: [
        "assets/img/side-b/slidecut4-01.webp",
        "assets/img/side-b/slidecut4-02.webp",
        "assets/img/side-b/slidecut4-03.webp",
        "assets/img/side-b/slidecut4-04.webp",
        "assets/img/side-b/slidecut4-05.webp",
      ],
    },
    "assets/img/side-b/foto-14.webp",
    "assets/img/side-b/foto-15.webp",
    "assets/img/side-b/foto-16.webp",
    "assets/img/side-b/foto-17.webp",
    {
      type: "slideshow",
      items: [
        "assets/img/side-b/slidecut5-01.webp",
        "assets/img/side-b/slidecut5-02.webp",
        "assets/img/side-b/slidecut5-03.webp",
        "assets/img/side-b/slidecut5-04.webp",
      ],
    },
    "assets/img/side-b/foto-18.webp",
    "assets/img/side-b/foto-19.webp",
    {
      type: "slideshow",
      items: [
        "assets/img/side-b/slidecut6-01.webp",
        "assets/img/side-b/slidecut6-02.webp",
        "assets/img/side-b/slidecut6-03.webp",
        "assets/img/side-b/slidecut6-04.webp",
      ],
    },
    "assets/img/side-b/foto-20.webp",
    "assets/img/side-b/foto-21.webp",
    "assets/img/side-b/foto-22.webp",
    "assets/img/side-b/foto-23.webp",
  ],
};
