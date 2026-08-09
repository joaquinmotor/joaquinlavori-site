// Joaquin Lavori — portfolio data
// Edit this file to add, remove or reorder projects. Everything on the
// site is generated from what's in here — no need to touch the HTML.

/* exported NAV, SITE, PROJECTS, INFO_CONTENT, SIDE_B */

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
  instagram: "instagram.com/joaquin.motor",
  instagramUrl: "https://instagram.com/joaquin.motor",
  location: "Byron Bay, NSW, Australia",
  aboutShort:
    "Joaquin Lavori is a graphic designer and illustrator from Buenos Aires, now based in Byron Bay, Australia. His practice moves between art direction, branding and hand-drawn illustration for surf, skate and streetwear brands, bars and independent businesses.",
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
      "Logo design for The Movement, a global creative studio and production company working across the music industry and the brands that work with it. Launched by Landia — one of the most awarded advertising production companies — The Movement needed an identity that could carry its own weight as a new division within the group. I explored several directions before landing on an organic, handwritten mark: loose, human, and unmistakably tied to music and performance rather than to a traditional agency register. The result is a flexible, relaxed logotype built to move across music videos, branded content, and live shows — giving The Movement the push it needed to launch under its own name.",
    ],
    link: "https://themovement.land/",
    linkLabel: "Visit site",
    hero: "assets/img/the-movement/hero.webp",
    gallery: [
      "assets/img/the-movement/hero.webp",
      "assets/img/the-movement/logo.webp",
      "assets/img/the-movement/team.webp",
      { type: "video", src: "assets/img/the-movement/video-01.mp4", poster: "assets/img/the-movement/video-01-poster.jpg" },
      { type: "video", src: "assets/img/the-movement/video-02.mp4", poster: "assets/img/the-movement/video-02-poster.jpg" },
      { type: "video", src: "assets/img/the-movement/video-03.mp4", poster: "assets/img/the-movement/video-03-poster.jpg" },
      { type: "video", src: "assets/img/the-movement/video-04.mp4", poster: "assets/img/the-movement/video-04-poster.jpg" },
      "assets/img/the-movement/phone-01.webp",
      "assets/img/the-movement/phone-02.webp",
      "assets/img/the-movement/phone-03.webp",
      "assets/img/the-movement/phone-04.webp",
      "assets/img/the-movement/phone-05.webp",
      "assets/img/the-movement/phone-06.webp",
      "assets/img/the-movement/phone-07.webp",
      "assets/img/the-movement/phone-08.webp",
    ],
  },
  {
    slug: "afends",
    brand: "Afends",
    category: "Illustration & Content",
    blurb: "A tattoo flash-inspired capsule collection and documentary content series for Afends' Off-Script range.",
    body: [
      "Afends invited Joaquin Motor — Joaquin Lavori's illustration alter ego, built on his tattoo flash artwork — to design a capsule collection around their Off-Script range, a story about breaking out, staying true, and choosing your own way forward. I pulled directly from the symbolism already running through the work — snakes, chains, roses, flames — and translated it into a range spanning womenswear, menswear, and accessories, from oversized tees to six-panel caps. The collaboration went beyond product into Create Not Destroy, a documentary-style content series built around the artist and his studio, treating his tools and space as part of the story rather than a backdrop. The result plays less like a brand collab and more like a flash sheet stretched onto fabric — freedom, the kind you fight for, worn.",
    ],
    link: "https://afends.com/search?q=joaquin+motor&options%5Bprefix%5D=last",
    linkLabel: "View project",
    hero: "assets/img/afends/01.webp",
    gallery: [
      "assets/img/afends/01.webp",
      "assets/img/afends/02.webp",
      "assets/img/afends/03.webp",
      "assets/img/afends/04.webp",
      "assets/img/afends/05.webp",
      "assets/img/afends/06.webp",
      "assets/img/afends/07.webp",
      "assets/img/afends/08.webp",
      "assets/img/afends/09.webp",
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
    hero: "assets/img/lacalle/hero.jpg",
    gallery: [
      "assets/img/lacalle/02.jpg",
      "assets/img/lacalle/hero.jpg",
      "assets/img/lacalle/03.jpg",
      "assets/img/lacalle/04.jpg",
      "assets/img/lacalle/05.jpg",
      "assets/img/lacalle/06.jpg",
      "assets/img/lacalle/07.jpg",
      "assets/img/lacalle/08.jpg",
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
    hero: "assets/img/ceremonia/01.webp",
    gallery: [
      "assets/img/ceremonia/01.webp",
      "assets/img/ceremonia/logo.png",
      "assets/img/ceremonia/02.webp",
      "assets/img/ceremonia/04.webp",
      "assets/img/ceremonia/03.jpg",
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
    hero: "assets/img/roark/01.jpg",
    gallery: [
      "assets/img/roark/01.jpg",
      "assets/img/roark/06.jpg",
      "assets/img/roark/02.jpg",
      "assets/img/roark/03.jpg",
      "assets/img/roark/07.jpg",
      "assets/img/roark/04.jpg",
      "assets/img/roark/05.jpg",
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
    hero: "assets/img/vans/hero.jpg",
    gallery: [
      "assets/img/vans/hero.jpg",
      "assets/img/vans/02.jpg",
      "assets/img/vans/03.jpg",
      "assets/img/vans/04.jpg",
      "assets/img/vans/05.jpg",
      "assets/img/vans/06.jpg",
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
    hero: "assets/img/laguitarrita/hero.jpg",
    gallery: ["assets/img/laguitarrita/hero.jpg", "assets/img/laguitarrita/02.jpg"],
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
    hero: "assets/img/fatima/hero.jpg",
    gallery: [
      "assets/img/fatima/hero.jpg",
      "assets/img/fatima/02.jpg",
      "assets/img/fatima/03.jpg",
      "assets/img/fatima/04.jpg",
      "assets/img/fatima/05.jpg",
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
    hero: "assets/img/lightningbolt/hero.jpg",
    gallery: [
      "assets/img/lightningbolt/hero.jpg",
      "assets/img/lightningbolt/02.jpg",
      "assets/img/lightningbolt/03.jpg",
      "assets/img/lightningbolt/04.jpg",
      "assets/img/lightningbolt/05.jpg",
      "assets/img/lightningbolt/06.jpg",
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
  sections: [
    {
      number: "1.",
      title: "Introduction",
      body: "My practice moves between branding, illustration, and art direction — building brand identities from the ground up, then carrying that same thinking into illustrated work, often under my alter ego, Joaquin Motor. The work spans logos, web design, apparel, and campaign material for clients across fashion, music, food, action sports, and activism.",
    },
    {
      number: "2.",
      title: "Method",
      body: "My method starts with a conversation. I listen to how a client sees their own project until we land on what's actually right for it — not just what looks good. From there, I treat graphic design as a powerful tool for capturing something harder to put into words: the feeling a brand carries, even before anyone's said it out loud.",
    },
    {
      number: "3.",
      title: "Collaboration",
      body: "Alongside my independent practice, I've worked as art director and creative ambassador for brands like Vans Argentina, and partner directly with founders and teams to help shape brand concepts from the beginning, not just execute them.",
    },
  ],
  specs: [
    {
      number: "2. 1",
      label: "Areas of Expertise",
      values: ["Creative Direction", "Visual Identity", "Illustration", "Storytelling"],
    },
    {
      number: "2. 2",
      label: "Operating Sectors",
      values: ["Fashion", "Product", "Arts", "Hospitality", "Retail"],
    },
    {
      number: "2. 3",
      label: "Core Principles",
      values: ["Active Listening", "Functionality", "Passion", "Authenticity"],
    },
  ],
  cta: "For new partnerships and general enquiries, reach out on:",
};

// Side B — experiments, discarded directions, off-cuts. Placeholder set,
// reuses existing project imagery until dedicated Side B material is ready.
const SIDE_B = {
  eyebrow: "PROCESS, SKETCHES & EXPERIMENTS",
  intro:
    "This is where the loose ends live: experiments that didn't make the cut, ideas I loved and then dropped, offshoots of finished projects, half-formed thoughts, and typographic play that never found a home. I keep them here because even the pieces nobody used still carry something worth looking at. The collection keeps growing as I keep making things on the side.",
  items: [
    {
      title: "Sketch — Vans",
      category: "Sketchbook",
      blurb: "Unused sketch from an ongoing series.",
      cover: "assets/img/vans/03.jpg",
      gallery: ["assets/img/vans/03.jpg", "assets/img/vans/04.jpg", "assets/img/vans/05.jpg"],
    },
    { title: "Alt direction — La Calle", category: "Study", blurb: "Discarded direction, kept for reference.", cover: "assets/img/lacalle/04.jpg" },
    { title: "Study — Lightning Bolt", category: "Study", blurb: "Loose linework study, never used.", cover: "assets/img/lightningbolt/05.jpg" },
    {
      title: "Color test — Fatima",
      category: "Color Study",
      blurb: "Palette exploration, branched from the main capsule.",
      cover: "assets/img/fatima/02.jpg",
      gallery: ["assets/img/fatima/02.jpg", "assets/img/fatima/03.jpg", "assets/img/fatima/04.jpg"],
    },
    { title: "Layout test — Afends", category: "Study", blurb: "An early layout, dropped before final.", cover: "assets/img/afends/03.webp" },
    { title: "Type study — La Guitarrita", category: "Type Study", blurb: "Typographic alchemy, kept for the archive.", cover: "assets/img/laguitarrita/02.jpg" },
  ],
};
