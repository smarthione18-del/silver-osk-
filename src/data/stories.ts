import { Story, AgeCategory, GenreCategory, Epigraph } from '../types';

export const STORIES: Story[] = [
  {
    id: 'clockwork-alchemist',
    title: 'The Clockwork Alchemist of Prague',
    subtitle: 'Where forgotten clock towers whisper the transmutation of time and brass.',
    author: 'Elena Rostova',
    authorTitle: 'Archivist in Residence, Charles University Fellowship',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqXyIK-DNotTvr2GxAYgG2pMMe-jcYLvZDhX6p4pHnQKN7rHIe789zklJkSnkoxzHw0f5D8GOaIG7rJne8HUz4-m8ZFfP1XPFQ_v8m7pqiFiL7_8F_86Ftp25ErfMZIpdP4ALBp2FDyYwJj1kf-BD0-yZATAh4SUn4sXWly7mZLWCUyhZVyKpwxwCiUSdprBrYyQM1NU-EQfOddQvfFiQutGt4aWuzunNI6Ip_Es5VLoOVJ6DiB58z',
    illustrator: 'Jan Ondřej',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ33_3yIw4GZSoC7iKqRgdYmPTZHo9H2JlmtkMqmnIkrTyW3SbFEi-2AYQeORD3xzWnHd-XRbRQYR_OJhV84mcH-1hl84E45upGQoeYbKU40ty44dEiIlccFmTDslfYFxHrA1XnDcZeDS8XSGddfmu21eAo1Kdp9AWhgMtrtvTzAuDOFCgSxDMy2Z-ZTsv9gP6o4rNQs6sF5CxjZcMTh1omhBGL9i2se1e4Vy7tCfX8lDz8RLLvmdD',
    heroBackground: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCostbCC1sAL2fE_URiENKAihmtqFSE9vqOJqi8b7voAqF5DTxXUrTUc1j6dLDZzLNRjl_kpzy4imOFLD2HMhuSwI1l8_ruDwBH-V_8zZ5eH5T8mvEmZExoRU7zhmxXqgsO7WdXOXj4KzrRc2sFwAjchJEH2HTPpBZIjpCkhfGvXIQpQKdhoFYREAN0uUtRE94DtekZl3_XmtfIe5bB2zDjnfb2K7mncACOXcibJ8cEknG6YmrfGUL',
    editionFolio: 'Folio Edition № 142',
    tags: ['Historical Fantasy', 'Bohemian Gothic', 'Automata'],
    genre: 'Historical Fantasy',
    ageBracket: 'young-adult',
    targetAgeLabel: 'Ages 12+ • Middle Grade / YA',
    readingMinutes: 14,
    wordCount: 3420,
    lexile: '850L (Rich Prose)',
    rating: 4.96,
    reviewCount: 1248,
    synopsis: 'Beneath the astronomical dial of the Orloj, Master Vaneck binds the final mercury cog. When the twelve apostles revolve at dusk, they will not merely strike the thirteenth hour—they will open the subterranean chamber of eternal memory.',
    extendedPremise: 'In the fog-draped autumn of 1588, nestled deep beneath the astronomical wonders of Old Town Prague, Master Horologist Marek Vaneck discovers an impossible cog within the astronomical clock’s astrolabe. It is carved not of ordinary iron or alloyed bell metal, but of alchemical quicksilver suspended in frozen resonance. Each tick of its brass teeth does not measure elapsed moments, but consumes them from the shadows cast upon the stones of the square.\n\nWhen Marek disappears inside the tower’s spiraling hollows, his fourteen-year-old daughter Kira—an apprentice mechanician with an ear for harmonic frequencies—must decipher the ciphered blueprints left hidden within copper automata birds. Alongside an eccentric imperial scholar, Kira races to prevent the clock from rewinding the century, realizing that the transmutation of time exacts a price paid directly in human remembrance.',
    format: 'audio',
    audioNarration: {
      narrator: 'Stephen Fry',
      durationMinutes: 28,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: [
      'Alchemy & Hermetic Secrets',
      'Father-Daughter Bond',
      'Renaissance Prague',
      'Mechanical Automata',
      'Consequences of Immortality'
    ],
    suitability: {
      tension: 'Atmospheric Tension: Mild gothic suspense and shadowy clocktowers, without graphic peril or gore.',
      puzzles: 'Intellectual Puzzles: Plot advancement through cipher-solving, mechanical logic, and astronomy.',
      vocabulary: 'Rich Historical Vocabulary: Includes an integrated popover glossary for authentic Renaissance terminology.',
      audience: 'Ages 12 to 102'
    },
    relatedStoryIds: ['glassmakers-sunken-canal', 'scribe-whispering-vaults', 'clay-constellations'],
    featured: true,
    chapters: [
      {
        id: 'clockwork-ch-1',
        number: 1,
        title: 'The Cogs Beneath the Old Town Square',
        wordCount: 1240,
        readingMinutes: 5,
        isUnlocked: true,
        content: `The iron teeth of the great horologe did not sleep, even when the fog from the river rolled up the cobbles and swallowed the spires of the Týn Church whole. Kira pressed her cheek against the cold spruce beam of the maintenance gallery. Through the vibrating timber, she could feel the slow, heavy heartbeat of the escapement wheel—sixty beats for every breath of mortal Prague.

Her father had warned her three winters ago: *never oil the seventh balance while the astronomical ring shows the constellation of the Dragon*. Tonight, however, the golden dragon index hovered in direct opposition to Saturn. And inside the copper casing where the lunar phases pivoted, something was chiming out of cadence. Not the clean ring of tempered bell bronze, but the liquid, whispering slosh of mercury against sealed crystal.

She lowered her tallow lantern. Down through the maze of turning pinions, something was breathing. A slender silhouette made of filigreed armature sat hunched upon the counterweights, polishing a silver sphere that seemed to inhale the very shadows cast by her lantern flame.

"Who climbs the tower past the curfew chime?" Kira whispered, fingers tightening around her brass caliper.

The automaton did not turn with the jerk of crude clockwork. Its neck angled with the eerie liquidity of poured honey. In its chest cavity, where a balance spring should have coiled, spun a glass vessel filled with luminescent Bohemian vapor. As the chime of midnight struck, the creature lifted a parchment scroll sealed with the crest of the Emperor's secret alchemists.`
      },
      {
        id: 'clockwork-ch-2',
        number: 2,
        title: 'Mercury, Brass, and Stolen Starlight',
        wordCount: 1090,
        readingMinutes: 4,
        isUnlocked: false,
        content: `The stairwell spiraled down into chambers uncharted on the city guild maps. Kira counted three hundred and forty copper steps before the smell of oil gave way to the sharp tang of distilled antimony.`
      },
      {
        id: 'clockwork-ch-3',
        number: 3,
        title: "The Golem's Last Pendulum",
        wordCount: 1090,
        readingMinutes: 5,
        isUnlocked: false,
        content: `Underneath the foundations of the Old-New Synagogue, Master Vaneck’s final astronomical compass pointed directly into the mud of the subterranean cellar.`
      }
    ]
  },
  {
    id: 'whispers-banyan-tree',
    title: 'Whispers of the Banyan Tree',
    author: 'Ananya Sen',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpG9ABxAI2uBZ-TdS8SOYsx-YJGzIc6OOMML-5GUT094opvrTCOhPr957p5RCHh6MKq7aCsQ8UsEAvSiSkuEjWGqUkdRWzw-rzDU-8vB9qXIVbhfRwLBJdyMx0kew1niWlFeW05WMyifxEzhFyjfhyv1FsP0yZTA-Q9C__keIwCg7CzuJfCrROWacdUFED3mFCToghYerrsyLBLL_5x6kdFzmn05A5mJXhqlyr2zLiiElWltpf-oCQ',
    tags: ['Folklore', 'All Ages'],
    genre: 'Folklore',
    ageBracket: 'all-ages',
    targetAgeLabel: 'All Ages',
    readingMinutes: 9,
    wordCount: 2150,
    lexile: '680L',
    rating: 4.9,
    reviewCount: 840,
    synopsis: 'For four generations, the elders tied unspilled secrets to the great roots. Tonight, the roots whisper back.',
    format: 'illustrated',
    themes: ['Ancestral Lore', 'Monsoon Nights', 'Sacred Nature'],
    chapters: [
      {
        id: 'banyan-ch-1',
        number: 1,
        title: 'The Knotting of the Red Thread',
        wordCount: 1100,
        readingMinutes: 5,
        isUnlocked: true,
        content: 'When the first monsoon cloud broke over the terracotta roofs of Nadia, the leaves of the five-hundred-year-old banyan began to hum in three-part harmony.'
      }
    ]
  },
  {
    id: 'last-stargazer-andromeda',
    title: 'The Last Stargazer of Andromeda',
    author: 'Marcus Vance',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGnSnhxVuD4A48udKp8aSSTmE25YUiJaC5sjFBs3kml8cmCsb4Jf-2ky9AfzFnO9scedI1JhkzcZcgGl9YRjFdr_UKymTwWuYPqfqdFlOu3asZWZKTPcCWoZSWG80-cp11UfJ15cbVK8jSs05N3pFPWKMvHXLmd4IfH8YWV2dxdcukvZC2EY2zTjVQl0DEb3OypyshAbjjVtGUXSOmiaBxPcvLLPZois5m-vGjI9LhMAnHyIvAIG6r',
    tags: ['Sci-Fi', 'YA 14+'],
    genre: 'Cyberpunk & Sci-Fi Odyssey',
    ageBracket: 'young-adult',
    targetAgeLabel: 'YA 14+',
    readingMinutes: 18,
    wordCount: 4100,
    lexile: '920L',
    rating: 4.9,
    reviewCount: 912,
    synopsis: 'Kael calibrates the antique radio telescope to catch the fading heartbeat of a dying binary star.',
    format: 'text',
    themes: ['Deep Void', 'Solitude', 'Stellar Archaeology'],
    chapters: [
      {
        id: 'stargazer-ch-1',
        number: 1,
        title: 'The Violet Arm of the Spiral',
        wordCount: 1500,
        readingMinutes: 6,
        isUnlocked: true,
        content: 'The brass telescope housing groaned against the vacuum chill of the asteroid belt. Three hundred light-years away, an ancient pulsar blinked its dying code.'
      }
    ]
  },
  {
    id: 'bakers-guide-dragon-bread',
    title: "A Baker's Guide to Dragon Bread",
    author: 'Cecily Bloom',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnQNd9xu0sSmso0IrAr68Wyk08l2PH6r-T_oy6OvcJsvORRDMTfGF_xmft1B9M6nX6AH7dhl1WfNx29IAlMJE8XfNNFmTzKE69erztGVhZ1_GCuwnSXShXDr8NXVR2HnLftBk8u-BDroig9dSUXv16QKbgZVjeAngrSNTEv07C5rKMKEnMvZGNgnNfgwm_IQCiF_VNjsGztQ1CL2d-t48qg0wy3ameHIGSukZtDWrtLzEsfyg34QiX',
    tags: ['Whimsical Cozy', 'Ages 12+'],
    genre: 'Cozy Fantasy & Whimsy',
    ageBracket: 'junior',
    targetAgeLabel: 'Ages 12+',
    readingMinutes: 6,
    wordCount: 1400,
    lexile: '580L',
    rating: 4.9,
    reviewCount: 1104,
    synopsis: 'Rule one: never knead when Barnaby is sneezing. Rule two: honey crust requires an affectionate exhale.',
    format: 'illustrated',
    themes: ['Culinary Magic', 'Companionship', 'Cottage Life'],
    chapters: [
      {
        id: 'dragon-ch-1',
        number: 1,
        title: 'Sourdough and Smoke Rings',
        wordCount: 1400,
        readingMinutes: 6,
        isUnlocked: true,
        content: 'Barnaby curled on the flour barrel, his emerald scales dusted white like powdered sugar. When the dough rose to double its size, he let out a contented yawn of gentle cinnamon smoke.'
      }
    ]
  },
  {
    id: 'shadows-victorian-underground',
    title: 'Shadows of Victorian Underground',
    author: 'Arthur Pendelton',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmUTAiqGRO1L6V-1m2tWgKBqIAT6-_QzXxrbs8uNwcgq1FkX_xaHm0kpd0HvbdCSEAkQz0dLhJpxFbq4YeuwRHfIEPmrgUtBs6AyR6a3Voa3QVf7IxXorLlP4Op49ET7A-n6MLhHPCwPGoaWnv5dSuL0YH5c1g7S5FsEo7wuL9IksJjnvjOarMhlmO-gFubZ5bcIp1iTbttthUr9-QwP_WrPROlcrwb6kpOKTg7SJdh1kdEOHF3Gut',
    tags: ['Mystery', 'YA 14+'],
    genre: 'Eerie Mysteries & Noir',
    ageBracket: 'young-adult',
    targetAgeLabel: 'YA 14+',
    readingMinutes: 22,
    wordCount: 5200,
    lexile: '980L',
    rating: 4.9,
    reviewCount: 752,
    synopsis: 'The discarded train schedule belonged to an engine that vanished from Paddington station forty years ago.',
    format: 'audio',
    themes: ['Victorian London', 'Subterranean Vaults', 'Cold Inquiries'],
    chapters: [
      {
        id: 'victorian-ch-1',
        number: 1,
        title: 'The Discarded Brass Timetable',
        wordCount: 1800,
        readingMinutes: 8,
        isUnlocked: true,
        content: 'The Thames fog tasted of burnt Welsh anthracite and sour mud. Down on the dripping platform of the closed Baker Street spur, footsteps echoed where no tracks remained.'
      }
    ]
  },
  {
    id: 'glassmakers-sunken-canal',
    title: 'The Glassmakers of the Sunken Canal',
    author: 'Giuliano Vane',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT7wBTTVPKq4dIuUHSlWHaMjDmpBrbyDS0IR7EObpCQmGXWnAqPiiXj1BqbDAoF6Bjx2f0mbRlUlTn9Kc_LImea8kASTqM_azt70Vdhf2mCWYM7yPCkv8SrkuPOTtlEZ1QaWJaYPypA6pn9WyCExMmxJ7naeqCqsokKnQYe42HW8zVDPKgtr5co9X5zS7foqI8B7sryVsW5JLZSEW5MvvsmOLFBTbHsjTjoYnHrahUAKTqrG7vC039',
    tags: ['Venetian Gothic Mystery', 'Ages 13+'],
    genre: 'Eerie Mysteries & Noir',
    ageBracket: 'young-adult',
    targetAgeLabel: 'Ages 13+',
    readingMinutes: 18,
    wordCount: 3800,
    lexile: '890L',
    rating: 4.98,
    reviewCount: 630,
    synopsis: 'When mirrors start reflecting the year 1420 instead of the present room, an apprentice artisan must seal the tides.',
    format: 'illustrated',
    themes: ['Venetian Glass', 'Time Reflections', 'Canal Secrets'],
    chapters: [
      {
        id: 'glass-ch-1',
        number: 1,
        title: 'The Mercury Mirror of Murano',
        wordCount: 1200,
        readingMinutes: 5,
        isUnlocked: true,
        content: 'Every mirror blown in Master Bellini’s furnace carried a breath of lagoon fog. But the oval looking glass ordered by the Doge did not reflect the velvet drapes—it reflected a drowning square.'
      }
    ]
  },
  {
    id: 'scribe-whispering-vaults',
    title: 'The Scribe of the Whispering Vaults',
    author: 'Thomas Thorne',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgD92OuvyGpu9IBYst9f1qRwKxGQkZjEpxGBF_CPRlFIUjQBhiPohComHkF4oJYzENuZyty8VDgbnlcAHLxrGoF4kqjkbx1hO2XTwrUtvgQ667H5HE0B09HHRuMZuDPtSJsT7T_pRSHP3YSgfMGzhiZhs4ktCRTqr0EmMzJzD7rwDcfovH4EbaSIwasw_r8mJCYRCLXiHOxzZxgDtqhfm6hoIqGuYbSSHSYbqT8CGzMixiq3Tg33gV',
    tags: ['Steampunk Historical', 'Ages 11+'],
    genre: 'Historical Chronicles',
    ageBracket: 'junior',
    targetAgeLabel: 'Ages 11+',
    readingMinutes: 22,
    wordCount: 4600,
    lexile: '860L',
    rating: 4.95,
    reviewCount: 520,
    synopsis: 'Pneumatic cylinders delivered messages from the underground, but some letters bore postmarks dated thirty years from now.',
    format: 'text',
    themes: ['Pneumatic Tubes', 'Subterranean Library', 'Temporal Correspondence'],
    chapters: [
      {
        id: 'scribe-ch-1',
        number: 1,
        title: 'The Capsule of 1928',
        wordCount: 1400,
        readingMinutes: 6,
        isUnlocked: true,
        content: 'The brass cylinder rattled down the chute with the fury of a trapped pheasant. Thomas unlatched its wax seal, discovering violet ink that was still wet.'
      }
    ]
  },
  {
    id: 'clay-constellations',
    title: 'Clay & Constellations: The Second Golem',
    author: 'Leah Ben-Zion',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhKjeXu8-_MzOijEnsEI_V8GP0dqeRykW6DBByGymNmjGS1a32PaBsRkdBDabgQfzN6dhUSPGsApVHIpC4biEG9158g5sLtQIA1oP-Q36ck0CaBdYFWx3V1XcbVVr8kjUV8z5vcI3HdJbUveC-5pFIQUjmfY4l37AVGlj6cpJ5nfL-rE1ndSDy46dCMVcn5P8U6UfP8yao5qU6yHXgvG0qepdgwLHZHeTWKZiJNfIEFdKpSm2ZF8et',
    tags: ['Mythic Folklore', 'Ages 12+'],
    genre: 'Folklore',
    ageBracket: 'junior',
    targetAgeLabel: 'Ages 12+',
    readingMinutes: 16,
    wordCount: 3500,
    lexile: '870L',
    rating: 4.93,
    reviewCount: 490,
    synopsis: 'In Rabbi Loew’s hidden attic, a second creature waits not for word of protection, but for a lullaby of the stars.',
    format: 'audio',
    themes: ['Prague Golem', 'Hebrew Mysticism', 'Starlight Lullaby'],
    chapters: [
      {
        id: 'golem-ch-1',
        number: 1,
        title: 'The Dust of the Vltava Riverbank',
        wordCount: 1300,
        readingMinutes: 5,
        isUnlocked: true,
        content: 'Under the cobwebbed rafters of the attic, the mound of gray river clay bore two unlit amethysts where eyes should sleep.'
      }
    ]
  },
  // Children / Explore By Age Section stories
  {
    id: 'hedgehog-touch-moon',
    title: 'The Hedgehog Who Wanted to Touch the Moon',
    author: 'Clara H. Finch',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0YY7N7CeIgfF6nNglAGa4VRLqsh3B0c0zYKZaGArILXRyNvQizCAp6qmfM6XhQIdLLaGgQ9b6qWhA7s2KhQuc7CtEuOROiR1KLshLfxgUD0E-CHGX3q6HB1A37NRiTVOvRYg6mzh0m6cT251Et2YDIm46uSRoXKgHsw4iIjisr6CfycYSyMpQ4z94nmCqRsfGwBvekY1gd_LChK-jRZnu9H_4j3BsdR_Xr7LpdwNv-okUA7rJin2d',
    tags: ['Early Reader', 'Ages 5-8', 'Staff Pick'],
    genre: 'Cozy Fantasy & Whimsy',
    ageBracket: 'little-dreamers',
    targetAgeLabel: 'Ages 5–8 • Early Readers',
    readingMinutes: 6,
    wordCount: 950,
    lexile: '340L',
    rating: 4.95,
    reviewCount: 1420,
    synopsis: 'Spikelet realizes that being small doesn’t keep big dreamers on the forest floor when night falls over Briar Hollow.',
    format: 'illustrated',
    themes: ['Courage', 'Big Dreams', 'Bedtime Friendship'],
    chapters: [
      {
        id: 'hedg-ch-1',
        number: 1,
        title: 'The Silver Puddle',
        wordCount: 950,
        readingMinutes: 6,
        isUnlocked: true,
        content: 'Spikelet adjusted his tiny blue nightcap and stretched up on his hind toes. On the branch of the grand oak tree, a round silver pancake rested among the acorn cups.'
      }
    ]
  },
  {
    id: 'barnaby-flying-teapot',
    title: "Barnaby's Flying Teapot",
    author: 'Liam Ross',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzn36Pmh9MP8itgk6wP1dsrNT4FSNMoUrcXaRx7vu3tTKBQfh3No7Szp0rtyzpPBEPsXOr7kiB2rjTgIo0CzW5m4LLdJDi9BCxbVL2nw7zbkEFiphO6tiq21VlMWcEY0zltPMNP-nIYVyGj0cXpMrJsSZCC2MhxLtxzdTFgw3pme8on7pL9gB-5RNVGElJtrpvVHasXRemxFEFSSuCbX5s0aJpwpURFTZribi-jtZNfnruXjKyQAi0',
    tags: ['Audio Narrative', 'Full Cast', 'Chime Cues'],
    genre: 'Cozy Fantasy & Whimsy',
    ageBracket: 'little-dreamers',
    targetAgeLabel: 'Ages 5–8 • Early Readers',
    readingMinutes: 8,
    wordCount: 1100,
    lexile: '380L',
    rating: 4.91,
    reviewCount: 980,
    synopsis: 'Accompanied by whistling kettles and gentle page-turn chimes, Barnaby explores the wind currents above Brambleberry.',
    format: 'audio',
    audioNarration: {
      narrator: 'Liam Ross',
      durationMinutes: 8
    },
    themes: ['Wonder', 'Page-turn Chimes', 'Gentle Inventions'],
    chapters: [
      {
        id: 'barnaby-ch-1',
        number: 1,
        title: 'Steaming Over the Chimneypots',
        wordCount: 1100,
        readingMinutes: 8,
        isUnlocked: true,
        content: '*Ding-dong!* The porcelain spout puffed lavender steam, and the wooden rudder steered gently toward Mrs. Higgins’ sunflower garden.'
      }
    ]
  },
  {
    id: 'little-river-forgot-flow',
    title: 'The Little River That Forgot How to Flow',
    author: 'Mara Sylvan',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqKAQGxVEjuPUN1JqLpg41D_RdOj-nkIVsTIaFHOsk1J11HGbgHe9y7BthdZJIVBPFqv2q6ALNIwRd0Pg0yYXzImyo7XozXwf5uZCTFYHDTzsvVuzOkU86LFe1yLX1DDXatkCfs2p8PCEMm3O2okeb6Yr7L2feDcbnyekEtisyXe8zqgV_dieTv_3AezbjASM_NeX04Qwbl3J46kE6SKNVSjnxlJtRKLazvXFCF6VJ9QKcGxA-C-JS',
    tags: ['Sleep Induction', 'Bedtime Calm', 'Lexile 280L'],
    genre: 'Bedtime & Ambient Drift',
    ageBracket: 'little-dreamers',
    targetAgeLabel: 'Ages 5–8 • Early Readers',
    readingMinutes: 5,
    wordCount: 820,
    lexile: '280L',
    rating: 4.94,
    reviewCount: 1310,
    synopsis: 'A soothing rhythmic tale with slow breath breaks to help busy young minds gently drift off to peaceful dreams.',
    format: 'text',
    themes: ['Restful Breath', 'River Waters', 'Sleep Induction'],
    chapters: [
      {
        id: 'river-ch-1',
        number: 1,
        title: 'Under the Sleepy Willows',
        wordCount: 820,
        readingMinutes: 5,
        isUnlocked: true,
        content: 'Breathe in... like the cool moss beside the quiet stones. Breathe out... like the ripple smoothing into glass under the smiling crescent moon.'
      }
    ]
  },
  {
    id: 'detective-pip-carrot-cake',
    title: 'Detective Pip & The Missing Carrot Cake',
    author: 'Arthur Pendelton',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEi2uVe6XIhc93BIqKLHy9FNfJCYOPhXy1QWz5EI8hKXLV8pO1OMCFtUPacf8fhU0pkk8Bn_8-LYYA1sE1rgO7KD6SdJqI8k-TafnrUF6QxrrijXzcKptAVoKW5wdyL9Nj_jq7K6fSpQyT2x1fpAwnbvgMqivHt-friJF609kuZGaPe3dVj9piH9SaSJ66ZujU06tnYC-mlIEuobQFQqQva2dGd4_Ny8voaAKbAKakdswJXex8ijkZ',
    tags: ['Mini-Mystery', 'Choice-Based', '3 Endings'],
    genre: 'Eerie Mysteries & Noir',
    ageBracket: 'little-dreamers',
    targetAgeLabel: 'Ages 5–8 • Early Readers',
    readingMinutes: 7,
    wordCount: 1150,
    lexile: '390L',
    rating: 4.88,
    reviewCount: 890,
    synopsis: 'Follow orange crumb trails and question garden suspects. Children choose which clues Detective Pip investigates first!',
    format: 'cyoa',
    themes: ['Deductive Reasoning', 'Playful Mystery', 'Choice & Agency'],
    chapters: [
      {
        id: 'pip-ch-1',
        number: 1,
        title: 'The Great Crumbs Mystery',
        wordCount: 1150,
        readingMinutes: 7,
        isUnlocked: true,
        content: 'Pip adjusted his mini tweed cap and placed his brass magnifying glass over the cabbage patch. "Three powdery crumbs lead toward the hedgehog burrow, but two lead to the duck pond! Where shall we inspect first?"'
      }
    ]
  },
  // Genres & Types Showcase Stories
  {
    id: 'weaver-of-solitude',
    title: 'The Weaver of Solitude',
    author: 'Marta Lindqvist',
    authorAvatar: 'ML',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj8_rUPk5J_wdeP4gId55LcMezzFTu8PfGv-S7HPtXmanRRUC6URwuoymrbWGacZOK5zaOWlJiUUoASfn5K2MoH-yCzg1yP2JKc_EXqpiabIdHDLFN2-3kVtNTMuqra4hSKww2tKxuzkF31oV3PPN3S4bdzFUPfoEdp0Vp77bP1V2Sp0-ESZ8WNjWHR2g6xrm9PWR6S8n_vqcnr6VBRg0WbNDGKuWfIVJtI5wZRnE4KZPfNrOEbbAf',
    tags: ['Philosophical Sci-Fi', 'Audio Included'],
    genre: 'Cyberpunk & Sci-Fi Odyssey',
    ageBracket: 'adult-timeless',
    targetAgeLabel: 'Adult & Literary',
    readingMinutes: 18,
    wordCount: 4200,
    lexile: '1050L',
    rating: 4.95,
    reviewCount: 710,
    synopsis: 'At the fringes of the Kuiper belt, one dying custodian repairs the memory spools of humanity’s first voyage into silence.',
    format: 'audio',
    audioNarration: {
      narrator: 'Elizabeth Vance',
      durationMinutes: 18
    },
    themes: ['Stellar Static', 'Human Memory', 'Cosmic Solitude'],
    chapters: [
      {
        id: 'solitude-ch-1',
        number: 1,
        title: 'The Spools of Sector 9',
        wordCount: 1600,
        readingMinutes: 7,
        isUnlocked: true,
        content: 'The magnetic tapes of the early centuries did not rot in the void, but they unspooled like loose strands of silver hair whenever the solar wind shifted.'
      }
    ]
  },
  {
    id: 'foxfire-iron-bells',
    title: 'Foxfire & Iron Bells',
    author: 'Kenji Takahashi',
    authorAvatar: 'KT',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuaK74hn0Cl6Tig8TDGVT2uEbpG6lSjXfKJvdEASdBZTTrRaJMnKXv7kuT0hX4cmJ7j9wjEmf9C1gj7bgbUmKcf4tq4c5BIf1iOG-KqNz42uOZxyfyFwDORkPhbSIg_2z80Bqyz3qfCd1TpKu76A2s1RhOrJLgPNlovV7JIGquIHjJK3-ohiuovUFZSFeU0wrHrlmin4pbOYGG-YFZUOyILKnKnwD6hslf9tV9CWInULpWCCCH7z0n',
    tags: ['Japanese Folklore', '12 Illustrations'],
    genre: 'Folklore',
    ageBracket: 'young-adult',
    targetAgeLabel: 'YA 14+',
    readingMinutes: 12,
    wordCount: 2900,
    lexile: '820L',
    rating: 4.88,
    reviewCount: 640,
    synopsis: 'A disgraced village bell-ringer enters the spirit pass after dusk to negotiate peace before the mountain snow isolates them forever.',
    format: 'illustrated',
    themes: ['Kitsune Lore', 'Temple Bells', 'Mountain Spirit'],
    chapters: [
      {
        id: 'fox-ch-1',
        number: 1,
        title: 'The Nine-Tailed Pass',
        wordCount: 1200,
        readingMinutes: 5,
        isUnlocked: true,
        content: 'The bell had not rung three strokes when the blue flames blossomed across the frozen moss, hovering like floating paper lanterns in the stillness.'
      }
    ]
  },
  {
    id: 'tea-edge-of-world',
    title: 'Tea at the Edge of the World',
    author: 'Blythe Pendelton',
    authorAvatar: 'BP',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6_fUahT15RY-D9BmZ3Khlf1F93oXRKmwVoGyUm9oT2vJBNxq18AW5P1XzcuY54XggUE3yw5AUKkwaeMA4EeFqhcnOcWH3M6bHdE3hW-HHESy1-A_j3CgLAdQNsqXXDfGjk_MvbAKz2l-t-xAgw2s9D99luJWGX_q5jj_edrqFd1Bl1tWkLYpLWtQphEpnuwQ1VbzVg3v4pQrrbyZNb4HINrqtUWAEbBQDbtMnBSGj7Ff3_jG8RkJO',
    tags: ['Cozy Whimsy', 'Bedtime Favorite'],
    genre: 'Cozy Fantasy & Whimsy',
    ageBracket: 'all-ages',
    targetAgeLabel: 'All Ages',
    readingMinutes: 8,
    wordCount: 1950,
    lexile: '690L',
    rating: 4.91,
    reviewCount: 920,
    synopsis: 'Every equinox, migratory birds and traveling cartographers stop for chamomile brew steeped in starlight and candied clover.',
    format: 'text',
    themes: ['Hearthside Comfort', 'Herbal Alchemy', 'Cliffside Teahouse'],
    chapters: [
      {
        id: 'tea-ch-1',
        number: 1,
        title: 'The Steaming Copper Kettle',
        wordCount: 900,
        readingMinutes: 4,
        isUnlocked: true,
        content: 'Miss Blythe swept the porch clear of dried pine needles as the white gulls glided on the updraft from the turquoise waves two hundred feet below.'
      }
    ]
  },
  {
    id: 'memory-architect',
    title: 'The Memory Architect',
    author: "Seraphina O'Connell",
    authorAvatar: 'SO',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcnfKW_uivgTAqI5thwZGNfd5KxVwKnNt_6hMvhi-RdmllMCcW7BhJKh3sxM1Oz7HHhSHU1LuEOoJjGMEyLPY_EMjKGDTB0Z98zWnck3VegUE4vYuztCmMnSEsm8Gm0PN9iHCAvmo9gFZWm-jhhWwsBs8mBiXaDH7TscvWH7ZCzXQIE7oI2MT2WELiqimr9Qvf5xjUPXBda0sZY1CpcdUhwG4HVXA27P3PDp6LiAKksbzViRhp4dg9',
    tags: ['Dystopian Speculative'],
    genre: 'Cyberpunk & Sci-Fi Odyssey',
    ageBracket: 'adult-timeless',
    targetAgeLabel: 'Ages 18+',
    readingMinutes: 22,
    wordCount: 4800,
    lexile: '1020L',
    rating: 4.85,
    reviewCount: 512,
    synopsis: 'In a society that taxes nostalgic reveries, an illegal draughtsman preserves childhood summers behind antique clock mechanisms.',
    format: 'text',
    themes: ['Reverie Preservation', 'Brutalist Archives', 'Prohibited Nostalgia'],
    chapters: [
      {
        id: 'memory-ch-1',
        number: 1,
        title: 'The Glass Cartridge',
        wordCount: 1500,
        readingMinutes: 7,
        isUnlocked: true,
        content: 'The Ministry inspectors carried sensors calibrated to dopamine signatures. But Seraphina had encased the sound of cicadas inside the vacuum chamber of a Russian barometer.'
      }
    ]
  },
  {
    id: 'cinnamon-constellations',
    title: 'A Pocketful of Cinnamon Constellations',
    author: 'Julian Aris',
    authorAvatar: 'JA',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlRz0J-RBopOvAN8iDtQx7imqPDtfnnm5rscduuCPgX3t22xgGH-Yn01bYbHGLTgPds5TeyLQLC3-swHqOmHa-Tr1JTTwTEmc3lqF8VR6PVU1xlI7T_WpWZvpmm4EjumLskT47QWN0vXM-buonEFOORqhdG4g2SbyEvFZBkE49PQSfAGf-gARBYNNCpjx2aSUeftYBGSRZVdG8z0Dj9A8Brt0m-o21BC_qsPQeBaFEZXQ-XMSM9aRN',
    tags: ['Poetic Micro-Fiction', 'Flash Piece'],
    genre: 'Micro-Tales & 3-Min Flash',
    ageBracket: 'all-ages',
    targetAgeLabel: 'All Ages',
    readingMinutes: 3,
    wordCount: 650,
    lexile: '720L',
    rating: 4.79,
    reviewCount: 620,
    synopsis: 'A baker wakes each dawn to discover spice crumbs forming unmapped star charts predicting unwritten encounters.',
    format: 'illustrated',
    themes: ['Stardust Spices', 'Morning Light', 'Poetic Micro-prose'],
    chapters: [
      {
        id: 'cinnamon-ch-1',
        number: 1,
        title: 'Orion on the Flour Board',
        wordCount: 650,
        readingMinutes: 3,
        isUnlocked: true,
        content: 'Between the jar of clove and the bowl of dark brown sugar, seven grains of Ceylon bark formed the precise girdle of the Hunter. Today, someone from across the sea would enter.'
      }
    ]
  },
  {
    id: 'haunting-blackwood-mill',
    title: 'The Haunting of Blackwood Mill',
    author: 'Eleanor Thorne',
    authorAvatar: 'EH',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-WwBF3pdNcFcuoDwXExhK90jyTXvnD0wlHnyn1pFYcuCwAonwd93fyTjTyEk_Yg1D_zG7N9vAqYFT0hoEtEo_ETEd4v_Jj5QImTP6RXooe2ZcRh9htNi83Fh8ZwQGRvjWjfxXYjz6ZFvU0lE4JxGM0HxHdD7waeDDr9UmvrFlQ-d9bbOGO_9KePs-OCOF5LEJqGe9YtH6QQNBVy5r_mNrMJ2XabEG1dVWsYXm4I7rKqMTv9CRWmfZ',
    tags: ['Gothic Mystery', 'Audio Narrated'],
    genre: 'Eerie Mysteries & Noir',
    ageBracket: 'young-adult',
    targetAgeLabel: 'YA 14+',
    readingMinutes: 16,
    wordCount: 3600,
    lexile: '940L',
    rating: 4.9,
    reviewCount: 830,
    synopsis: 'A hydrologist investigating silt deposits discovers the ancient wooden waterwheel keeps turning even when the river runs completely dry.',
    format: 'audio',
    audioNarration: {
      narrator: 'Eleanor Thorne',
      durationMinutes: 16
    },
    themes: ['Dark Waters', 'Gothic Suspense', 'Spectral Mechanics'],
    chapters: [
      {
        id: 'mill-ch-1',
        number: 1,
        title: 'The Dry Millrace',
        wordCount: 1400,
        readingMinutes: 6,
        isUnlocked: true,
        content: 'The bed of the Blackwood Stream had been cracked clay since the drought of August. Yet at two in the morning, the thirty-foot mossy paddles of the waterwheel turned with a measured splash.'
      }
    ]
  }
];

export const SILK_ROAD_ANTHOLOGY = {
  title: 'Folktales of the Silk Road',
  volume: 'Anthology Vol. VIII',
  badge: 'Special Curator Series',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyM_OV2IadW_KLZLCEguvZDMypd5S74ydGVCBUQ7DeuqPyFt7p57ZrG7A0uqTTuKA8dOIHD1_sh-YvUAeWjiPH83mADuNcPKRHiDYENlsz2qbKpq4i2jYNJja6dsMazLgjOPlwTwfudf_uXN7KzQKFjGiT2Tt_y8ITnkgUH8cVg4xEQRKKzXZGpUwVghRQZYNhxXzUZCzlKNQrCyAgYvNE30VbkrWT76xpybUpFZpi2qYljiKSW0Cs',
  updated: 'Updated 2 days ago • 6 Stories',
  description: 'Reconstructed translations of oasis parables, caravanserai fables, and ancient astronomical treatises stretching from Chang’an through the high passes of the Pamirs to the bazaars of Antioch.',
  quote: {
    text: '“The allegorical shift between Samarkand and Chang’an demonstrates how oral traders exchanged not only silk but philosophical parables on grief.”',
    author: 'Dr. Soraya Mirzakhani',
    role: 'Reader & Comparative Literature Scholar',
    annotations: 84
  },
  chapters: [
    {
      roman: 'I',
      title: "The Jade Merchant's Nightingale",
      subtitle: 'Oasis of Dunhuang • 12 min read • Illus. by Lin Yao'
    },
    {
      roman: 'II',
      title: 'The Seven Gates of Samarkand',
      subtitle: 'Sogdian Manuscripts • 19 min read • Audio Narration Included'
    },
    {
      roman: 'III',
      title: 'Salt, Spices, and the Wind Maiden',
      subtitle: 'Levantine Coast • 8 min read • Translated by Tariq Haddad'
    }
  ]
};

export const AGE_CATEGORIES: AgeCategory[] = [
  {
    id: 'tiny-tales',
    label: 'Tiny Tales',
    ageRange: '0 - 4 Years',
    description: 'Bedtime rhymes, fable animals & tactile picture books',
    subgenre: 'Picture Books',
    icon: 'pets',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-Okw3eVdVMTNjLLf8znSLMRcRk1YH5UeugqmBNrDCoiIUP6gmgrqHVz2kewHh50lekcyC63GxCFYtd_klOQCwY6kaqdQjJ-cbR-tOjJqz6giev6DZldYIehibwyIe7Si2eYeNQmc4-1Pvpw22TVmRLQGzwnyGswF4ZsHvcbPAaNLim__CLHTfsCJKl3L3taQGt1yDysSfkmi7FA6y7kMjwWX224koXjAgWQDRcNiZ5Om2-aYofO6'
  },
  {
    id: 'little-dreamers',
    label: 'Little Dreamers',
    ageRange: '5 - 8 Years',
    description: 'Early readers, phonics rhymes & colorful illustrated vignettes',
    subgenre: 'Early Readers',
    icon: 'star',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-Okw3eVdVMTNjLLf8znSLMRcRk1YH5UeugqmBNrDCoiIUP6gmgrqHVz2kewHh50lekcyC63GxCFYtd_klOQCwY6kaqdQjJ-cbR-tOjJqz6giev6DZldYIehibwyIe7Si2eYeNQmc4-1Pvpw22TVmRLQGzwnyGswF4ZsHvcbPAaNLim__CLHTfsCJKl3L3taQGt1yDysSfkmi7FA6y7kMjwWX224koXjAgWQDRcNiZ5Om2-aYofO6'
  },
  {
    id: 'junior-adventurers',
    label: 'Junior Adventurers',
    ageRange: '9 - 12 Years',
    description: 'Hidden realms, mechanical puzzles & courageous companions',
    subgenre: 'Quests & Companions',
    icon: 'explore',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk4DrGXR8qbZvpZBiINWuZmv9897A_bMlxqEE8QB-ZkBiNxZPll5ry_g1XPDuZzkC7U7i5CjZKhaYKcBMc6Di6XaCjFXD0HUlAg_JRvV9BWTQeroIeHPGKoPRIqCMMUdJiroc18KB_OHa49eOQ5Spg8AzVMhvt6c2ikdu98y9TV5KaaE13bOZn7iZqp4xC67UmCcKwCHjrIQsUFK70ErwWyDuX4aJ1mCPUdO7QQvpujmIvs-KiX8Wb'
  },
  {
    id: 'young-adult',
    label: 'Young Adults',
    ageRange: '13 - 17 Years',
    description: 'Dystopian sagas, mythic identity & first philosophical epics',
    subgenre: 'Identity Arcs',
    icon: 'auto_awesome',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPjX6MdaOkHtbWpaj9GgpDfr8m57zHwNVn7d1_rjpjyuE_Plc_vsQrO8fZhYAtL0gGqYFf8eDkb7QGSDGoV96Wv4e2fh7uMyVwRmfmibv73iDEN5eW0LjlecBojzAy-aG0_kQiaKE-dCcJ7oSVqYT4AYwi-lV0P2O-l_zgBP9XTDpXupwWWkxP4F9XuDGdw4s7vLpHCBk9RIBC4snZlkBueuOo0jgeRlk6ELc8_CI-A8ryiKkIdxt0'
  },
  {
    id: 'adult-timeless',
    label: 'Adult & Timeless',
    ageRange: '18+ Years',
    description: 'Dense prose, philosophical speculative fiction, historical mysteries & poetry',
    subgenre: 'Literary & Myth',
    icon: 'menu_book',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATvOEVMR4KGGqXyMlPXlUPIFRD5ZTjRakFRLgYFhqcP9FNcxPPIoA23q9DPrwP70iqUrFyO0TBhw-VHEWQ3UBbT4R09POHaCmmQgBJlTxqMpTQX5V6sPhhE2o8mxBizTjUc8CMKLHFrPiprNxgoBDAdwrbrdTs6KIvSEW5NcfltuU88PEc7bpHuGWj7LX4hkOoabq04VjL7uhJxHhiS3quh0LjIuzazy9pGwehazefV34Dr2NDoJyI'
  }
];

export const GENRE_CATEGORIES: GenreCategory[] = [
  {
    id: 'folklore',
    title: 'Folklore & Ancient Myths',
    storyCount: 240,
    description: 'Fables steeped in smoke, iron runes, and primordial deities.',
    icon: 'cyclone',
    themeColor: '#06102b'
  },
  {
    id: 'cozy-whimsy',
    title: 'Cozy Fantasy & Whimsy',
    storyCount: 185,
    description: 'Taverns in the mist, kettle-warmed magic, and soft woodland spirits.',
    icon: 'cottage',
    themeColor: '#be8222'
  },
  {
    id: 'scifi',
    title: 'Cyberpunk & Sci-Fi Odyssey',
    storyCount: 142,
    description: 'Decaying neon spires, silicon monks, and deep void navigation.',
    icon: 'terminal',
    themeColor: '#1c2541'
  },
  {
    id: 'mystery',
    title: 'Eerie Mysteries & Noir',
    storyCount: 98,
    description: 'Rain slicked pavements, gaslamp shadows, and veiled secrets.',
    icon: 'night_sight_auto',
    themeColor: '#382200'
  },
  {
    id: 'historical',
    title: 'Historical Chronicles',
    storyCount: 115,
    description: 'Court intrigues, lost dynasties, and subterranean ink archives.',
    icon: 'history_edu',
    themeColor: '#06102b'
  },
  {
    id: 'micro',
    title: 'Micro-Tales & 3-Min Flash',
    storyCount: 320,
    description: 'Bite-sized prose with lingering philosophical resonance.',
    icon: 'bolt',
    themeColor: '#1d0f00'
  },
  {
    id: 'bedtime',
    title: 'Bedtime & Ambient Drift',
    storyCount: 84,
    description: 'Hypnotic lullabies and gentle sleep journeys for the nocturnal mind.',
    icon: 'bedtime',
    themeColor: '#be8222'
  }
];

export const DAILY_EPIGRAPH: Epigraph = {
  quote: '“There is no greater agony than bearing an untold story inside you, nor any greater wonder than opening a stranger’s book to find yourself known.”',
  author: "Excerpt from The Weaver's Almanac",
  source: "The Weaver's Almanac",
  year: '1894'
};
