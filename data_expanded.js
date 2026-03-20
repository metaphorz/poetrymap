const POETRY_DATA_EXTRA = {
    "mouse": {
        id: "mouse",
        title: "To a Mouse",
        author: "Robert Burns",
        locationName: "Ayrshire, Scotland",
        locationCoords: "55.4586° N, 4.6292° W",
        lat: 55.4586,
        lng: -4.6292,
        type: "Inscribed Location",
        typeTag: "The Scottish Lyric",
        accuracy: 'approximate',
        era: "1785",
        image: "https://images.unsplash.com/photo-1595083103442-f87c31d1fdd8?w=800&q=80",
        desc: "Written after the poet accidentally destroyed a mouse's nest with his plough.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">Wee, sleekit, cowrin, tim'rous beastie,</p>
                <p class="font-body text-lg leading-[1.8]">O, what a panic's in thy breastie!</p>
                <p class="font-body text-lg leading-[1.8]">Thou need na start awa sae hasty,</p>
                <p class="font-body text-lg leading-[1.8]">Wi' bickering brattle!</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">But Mousie, thou art no thy-lane,</p>
                <p class="font-body text-lg leading-[1.8]">In proving foresight may be vain:</p>
                <p class="font-body text-lg leading-[1.8]">The best laid schemes o' Mice an' Men</p>
                <p class="font-body text-lg leading-[1.8]">Gang aft agley,</p>
                <p class="font-body text-lg leading-[1.8]">An' lea'e us nought but grief an' pain,</p>
                <p class="font-body text-lg leading-[1.8]">For promis'd joy!</p>
            </div>
        `
    },
    "innisfree": {
        id: "innisfree",
        title: "The Lake Isle of Innisfree",
        author: "W. B. Yeats",
        locationName: "Lough Gill, County Sligo, Ireland",
        locationCoords: "54.2562° N, 8.3616° W",
        lat: 54.2562,
        lng: -8.3616,
        type: "Geographic Verse",
        typeTag: "The Celtic Revival",
        accuracy: 'confirmed',
        era: "1890",
        image: "https://images.unsplash.com/photo-1600216172674-8b5eac62b102?w=800&q=80",
        desc: "A lyric poem exploring the speaker's yearning for the tranquility of Innisfree, an uninhabited island within Lough Gill.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">I will arise and go now, and go to Innisfree,</p>
                <p class="font-body text-lg leading-[1.8]">And a small cabin build there, of clay and wattles made;</p>
                <p class="font-body text-lg leading-[1.8]">Nine bean-rows will I have there, a hive for the honey-bee,</p>
                <p class="font-body text-lg leading-[1.8]">And live alone in the bee-loud glade.</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">And I shall have some peace there, for peace comes dropping slow,</p>
                <p class="font-body text-lg leading-[1.8]">Dropping from the veils of the morning to where the cricket sings;</p>
                <p class="font-body text-lg leading-[1.8]">There midnight's all a glimmer, and noon a purple glow,</p>
                <p class="font-body text-lg leading-[1.8]">And evening full of the linnet's wings.</p>
            </div>
        `
    },
    "dover": {
        id: "dover",
        title: "Dover Beach",
        author: "Matthew Arnold",
        locationName: "Dover, Kent, England",
        locationCoords: "51.1279° N, 1.3134° E",
        lat: 51.1279,
        lng: 1.3134,
        type: "Geographic Verse",
        typeTag: "The Victorian Lyric",
        accuracy: 'confirmed',
        era: "1867",
        image: "https://images.unsplash.com/photo-1502094892257-23eebd99616e?w=800&q=80",
        desc: "A melancholy meditation on the ebbing of faith, set against the backdrop of the white cliffs of Dover.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">The sea is calm tonight.</p>
                <p class="font-body text-lg leading-[1.8]">The tide is full, the moon lies fair</p>
                <p class="font-body text-lg leading-[1.8]">Upon the straits; on the French coast the light</p>
                <p class="font-body text-lg leading-[1.8]">Gleams and is gone; the cliffs of England stand,</p>
                <p class="font-body text-lg leading-[1.8]">Glimmering and vast, out in the tranquil bay.</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">Ah, love, let us be true</p>
                <p class="font-body text-lg leading-[1.8]">To one another! for the world, which seems</p>
                <p class="font-body text-lg leading-[1.8]">To lie before us like a land of dreams,</p>
                <p class="font-body text-lg leading-[1.8]">So various, so beautiful, so new,</p>
                <p class="font-body text-lg leading-[1.8]">Hath really neither joy, nor love, nor light,</p>
                <p class="font-body text-lg leading-[1.8]">Nor certitude, nor peace, nor help for pain.</p>
            </div>
        `
    },
    "adlestrop": {
        id: "adlestrop",
        title: "Adlestrop",
        author: "Edward Thomas",
        locationName: "Adlestrop, Gloucestershire",
        locationCoords: "51.942° N, 1.650° W",
        lat: 51.942,
        lng: -1.650,
        type: "Geographic Verse",
        typeTag: "The Georgian Lyric",
        accuracy: 'confirmed',
        era: "1917",
        image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80",
        desc: "A poem capturing a fleeting moment of peace at an empty rural railway station shortly before the outbreak of WWI.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">Yes. I remember Adlestrop—</p>
                <p class="font-body text-lg leading-[1.8]">The name, because one afternoon</p>
                <p class="font-body text-lg leading-[1.8]">Of heat the express-train drew up there</p>
                <p class="font-body text-lg leading-[1.8]">Unwontedly. It was late June.</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">The steam hissed. Someone cleared his throat.</p>
                <p class="font-body text-lg leading-[1.8]">No one left and no one came</p>
                <p class="font-body text-lg leading-[1.8]">On the bare platform. What I saw</p>
                <p class="font-body text-lg leading-[1.8]">Was Adlestrop—only the name.</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">And for that minute a blackbird sang</p>
                <p class="font-body text-lg leading-[1.8]">Close by, and round him, mistier,</p>
                <p class="font-body text-lg leading-[1.8]">Farther and farther, all the birds</p>
                <p class="font-body text-lg leading-[1.8]">Of Oxfordshire and Gloucestershire.</p>
            </div>
        `
    },
    "nightingale": {
        id: "nightingale",
        title: "Ode to a Nightingale",
        author: "John Keats",
        locationName: "Hampstead, London",
        locationCoords: "51.5584° N, 0.1733° W",
        lat: 51.5584,
        lng: -0.1733,
        type: "Inscribed Location",
        typeTag: "The Romantic Ode",
        accuracy: 'compositional',
        era: "1819",
        image: "https://images.unsplash.com/photo-1447012012674-cfa6e61fecbc?w=800&q=80",
        desc: "Written under a plum tree in the garden of Wentworth Place in Hampstead.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">My heart aches, and a drowsy numbness pains</p>
                <p class="font-body text-lg leading-[1.8]">My sense, as though of hemlock I had drunk,</p>
                <p class="font-body text-lg leading-[1.8]">Or emptied some dull opiate to the drains</p>
                <p class="font-body text-lg leading-[1.8]">One minute past, and Lethe-wards had sunk:</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">Thou wast not born for death, immortal Bird!</p>
                <p class="font-body text-lg leading-[1.8]">No hungry generations tread thee down;</p>
                <p class="font-body text-lg leading-[1.8]">The voice I hear this passing night was heard</p>
                <p class="font-body text-lg leading-[1.8]">In ancient days by emperor and clown:</p>
            </div>
        `
    },
    "london": {
        id: "london",
        title: "London",
        author: "William Blake",
        locationName: "Soho, London",
        locationCoords: "51.5136° N, 0.1365° W",
        lat: 51.5136,
        lng: -0.1365,
        type: "Geographic Verse",
        typeTag: "The Urban Critique",
        accuracy: 'confirmed',
        era: "1794",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
        desc: "A bleak, critical view of London during the Industrial Revolution, mapping the chartered streets.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">I wander thro' each charter'd street,</p>
                <p class="font-body text-lg leading-[1.8]">Near where the charter'd Thames does flow.</p>
                <p class="font-body text-lg leading-[1.8]">And mark in every face I meet</p>
                <p class="font-body text-lg leading-[1.8]">Marks of weakness, marks of woe.</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">In every cry of every Man,</p>
                <p class="font-body text-lg leading-[1.8]">In every Infants cry of fear,</p>
                <p class="font-body text-lg leading-[1.8]">In every voice; in every ban,</p>
                <p class="font-body text-lg leading-[1.8]">The mind-forg'd manacles I hear.</p>
            </div>
        `
    },
    "highlands": {
        id: "highlands",
        title: "My Heart's in the Highlands",
        author: "Robert Burns",
        locationName: "The Scottish Highlands",
        locationCoords: "57.12° N, 4.71° W",
        lat: 57.12,
        lng: -4.71,
        type: "Geographic Verse",
        typeTag: "The Scottish Lyric",
        accuracy: 'approximate',
        era: "1789",
        image: "https://images.unsplash.com/photo-1506461883276-594a12b11ac6?w=800&q=80",
        desc: "A passionate expression of longing for the rugged landscapes of northern Scotland.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">My heart's in the Highlands, my heart is not here,</p>
                <p class="font-body text-lg leading-[1.8]">My heart's in the Highlands a-chasing the deer,</p>
                <p class="font-body text-lg leading-[1.8]">A-chasing the wild deer, and following the roe;</p>
                <p class="font-body text-lg leading-[1.8]">My heart's in the Highlands, wherever I go.</p>
            </div>
        `
    },
    "easter": {
        id: "easter",
        title: "Easter, 1916",
        author: "W. B. Yeats",
        locationName: "Dublin, Ireland",
        locationCoords: "53.3498° N, 6.2603° W",
        lat: 53.3498,
        lng: -6.2603,
        type: "Geographic Verse",
        typeTag: "The Historical Lyric",
        accuracy: 'confirmed',
        era: "1916",
        image: "https://images.unsplash.com/photo-1564959130747-897fb406b240?w=800&q=80",
        desc: "Written in response to the Easter Rising in Dublin against British rule.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">I have met them at close of day</p>
                <p class="font-body text-lg leading-[1.8]">Coming with vivid faces</p>
                <p class="font-body text-lg leading-[1.8]">From counter or desk among grey</p>
                <p class="font-body text-lg leading-[1.8]">Eighteenth-century houses.</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">All changed, changed utterly:</p>
                <p class="font-body text-lg leading-[1.8]">A terrible beauty is born.</p>
            </div>
        `
    },
    "stolen": {
        id: "stolen",
        title: "The Stolen Child",
        author: "W. B. Yeats",
        locationName: "Glencar, County Leitrim",
        locationCoords: "54.3361° N, 8.3746° W",
        lat: 54.3361,
        lng: -8.3746,
        type: "Geographic Verse",
        typeTag: "The Celtic Revival",
        accuracy: 'confirmed',
        era: "1889",
        image: "https://images.unsplash.com/photo-1558227691-41ea78d1f631?w=800&q=80",
        desc: "A poem rooted in Irish mythology and the local geography of County Sligo and Leitrim.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">Where dips the rocky highland</p>
                <p class="font-body text-lg leading-[1.8]">Of Sleuth Wood in the lake,</p>
                <p class="font-body text-lg leading-[1.8]">There lies a leafy island</p>
                <p class="font-body text-lg leading-[1.8]">Where flapping herons wake</p>
                <p class="font-body text-lg leading-[1.8]">The drowsy water rats;</p>
            </div>
            <div class="relative py-12 border-l-2 border-secondary/20 pl-8 ml-4 group">
                <div class="absolute -left-[9px] top-12 w-4 h-4 rounded-full bg-secondary shadow-sm"></div>
                <p class="font-body text-lg leading-[1.8] italic text-on-surface-variant">"Come away, O human child!<br>To the waters and the wild<br>With a faery, hand in hand,<br>For the world's more full of weeping than you can understand."</p>
            </div>
        `
    },
    "binsey": {
        id: "binsey",
        title: "Binsey Poplars",
        author: "Gerard Manley Hopkins",
        locationName: "Binsey, Oxford",
        locationCoords: "51.768° N, 1.288° W",
        lat: 51.768,
        lng: -1.288,
        type: "Geographic Verse",
        typeTag: "The Ecological Lyric",
        accuracy: 'confirmed',
        era: "1879",
        image: "https://images.unsplash.com/photo-1542272201-b1ca555f8505?w=800&q=80",
        desc: "An ecological lament for the felling of a row of aspen trees along the River Thames near Oxford.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">My aspens dear, whose airy cages quelled,</p>
                <p class="font-body text-lg leading-[1.8]">Quelled or quenched in leaves the leaping sun,</p>
                <p class="font-body text-lg leading-[1.8]">All felled, felled, are all felled;</p>
                <p class="font-body text-lg leading-[1.8]">Of a fresh and following folded rank</p>
                <p class="font-body text-lg leading-[1.8]">Not spared, not one</p>
                <p class="font-body text-lg leading-[1.8]">That dandled a sandalled</p>
                <p class="font-body text-lg leading-[1.8]">Shadow that swam or sank</p>
                <p class="font-body text-lg leading-[1.8]">On meadow & river & wind-wandering weed-winding bank.</p>
            </div>
        `
    },
    "mariner": {
        id: "mariner",
        title: "The Rime of the Ancient Mariner",
        author: "Samuel Taylor Coleridge",
        locationName: "Watchet, Somerset",
        locationCoords: "51.180° N, 3.327° W",
        lat: 51.180,
        lng: -3.327,
        type: "Inscribed Location",
        typeTag: "The Narrative Ballad",
        accuracy: 'compositional',
        era: "1798",
        image: "https://images.unsplash.com/photo-1506462945848-ac8ea24d2715?w=800&q=80",
        desc: "Conceived while walking with William and Dorothy Wordsworth in the Quantock Hills near the port of Watchet.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">It is an ancient Mariner,</p>
                <p class="font-body text-lg leading-[1.8]">And he stoppeth one of three.</p>
                <p class="font-body text-lg leading-[1.8]">'By thy long grey beard and glittering eye,</p>
                <p class="font-body text-lg leading-[1.8]">Now wherefore stopp'st thou me?</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">Water, water, every where,</p>
                <p class="font-body text-lg leading-[1.8]">And all the boards did shrink;</p>
                <p class="font-body text-lg leading-[1.8]">Water, water, every where,</p>
                <p class="font-body text-lg leading-[1.8]">Nor any drop to drink.</p>
            </div>
        `
    },
    "kubla": {
        id: "kubla",
        title: "Kubla Khan",
        author: "Samuel Taylor Coleridge",
        locationName: "Porlock, Somerset",
        locationCoords: "51.218° N, 3.633° W",
        lat: 51.218,
        lng: -3.633,
        type: "Inscribed Location",
        typeTag: "The Romantic Vision",
        accuracy: 'compositional',
        era: "1797",
        image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80",
        desc: "Written following an opium-influenced dream at a farmhouse near Porlock, famously interrupted by 'a person from Porlock'.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">In Xanadu did Kubla Khan</p>
                <p class="font-body text-lg leading-[1.8]">A stately pleasure-dome decree:</p>
                <p class="font-body text-lg leading-[1.8]">Where Alph, the sacred river, ran</p>
                <p class="font-body text-lg leading-[1.8]">Through caverns measureless to man</p>
                <p class="font-body text-lg leading-[1.8]">Down to a sunless sea.</p>
            </div>
        `
    },
    "grongar": {
        id: "grongar",
        title: "Grongar Hill",
        author: "John Dyer",
        locationName: "Carmarthenshire, Wales",
        locationCoords: "51.848° N, 4.053° W",
        lat: 51.848,
        lng: -4.053,
        type: "Geographic Verse",
        typeTag: "The Topographical Poem",
        accuracy: 'confirmed',
        era: "1726",
        image: "https://images.unsplash.com/photo-1602075432748-82d264e2b463?w=800&q=80",
        desc: "A seminal topographical landscape poem describing the view of the Towy valley from Grongar Hill in Wales.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">Silent Nymph, with curious eye!</p>
                <p class="font-body text-lg leading-[1.8]">Who, the purple ev'ning, lie</p>
                <p class="font-body text-lg leading-[1.8]">On the mountain's lonely van,</p>
                <p class="font-body text-lg leading-[1.8]">Beyond the noise of busy man;</p>
                <p class="font-body text-lg leading-[1.8]">Painting fair the form of things,</p>
                <p class="font-body text-lg leading-[1.8]">While the yellow linnet sings.</p>
            </div>
        `
    },
    "yarrow": {
        id: "yarrow",
        title: "The Braes of Yarrow",
        author: "John Logan",
        locationName: "River Yarrow, Selkirkshire",
        locationCoords: "55.541° N, 2.990° W",
        lat: 55.5414,
        lng: -2.9904,
        type: "Geographic Verse",
        typeTag: "The Scottish Ballad",
        accuracy: 'confirmed',
        era: "1770",
        image: "https://images.unsplash.com/photo-1596404859066-e8d7bb6dc1e7?w=800&q=80",
        desc: "A ballad rooted in the Scottish borders, capturing the tragic folklore of the Yarrow Water.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">Thy braes were bonny, Yarrow stream,</p>
                <p class="font-body text-lg leading-[1.8]">When first on them I met my lover;</p>
                <p class="font-body text-lg leading-[1.8]">Thy braes how dreary, Yarrow stream,</p>
                <p class="font-body text-lg leading-[1.8]">When now thy waves his body cover!</p>
            </div>
        `
    },
    "village": {
        id: "village",
        title: "The Deserted Village",
        author: "Oliver Goldsmith",
        locationName: "Auburn, County Westmeath",
        locationCoords: "53.483° N, 7.783° W",
        lat: 53.4833,
        lng: -7.7833,
        type: "Geographic Verse",
        typeTag: "The Pastoral Elegy",
        accuracy: 'approximate',
        era: "1770",
        image: "https://images.unsplash.com/photo-1498855926480-d98e83099315?w=800&q=80",
        desc: "A condemnation of rural depopulation and the enclosure of common land, inspired by Lissoy in Ireland.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">Sweet Auburn! loveliest village of the plain;</p>
                <p class="font-body text-lg leading-[1.8]">Where health and plenty cheered the labouring swain,</p>
                <p class="font-body text-lg leading-[1.8]">Where smiling spring its earliest visit paid,</p>
                <p class="font-body text-lg leading-[1.8]">And parting summer's lingering blooms delayed.</p>
            </div>
        `
    },
    "bulben": {
        id: "bulben",
        title: "Under Ben Bulben",
        author: "W. B. Yeats",
        locationName: "Ben Bulben, County Sligo",
        locationCoords: "54.366° N, 8.466° W",
        lat: 54.3667,
        lng: -8.4667,
        type: "Inscribed Location",
        typeTag: "The Epitaph",
        accuracy: 'confirmed',
        era: "1938",
        image: "https://images.unsplash.com/photo-1470071131384-001b85755b36?w=800&q=80",
        desc: "Yeats's final poem, containing instructions for his burial in Drumcliff churchyard beneath the shadow of Ben Bulben.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">Under bare Ben Bulben's head</p>
                <p class="font-body text-lg leading-[1.8]">In Drumcliff churchyard Yeats is laid.</p>
                <p class="font-body text-lg leading-[1.8]">An ancestor was rector there</p>
                <p class="font-body text-lg leading-[1.8]">Long years ago, a church stands near,</p>
            </div>
            <div class="relative py-12 border-l-2 border-secondary/20 pl-8 ml-4 group">
                <div class="absolute -left-[9px] top-12 w-4 h-4 rounded-full bg-secondary shadow-sm"></div>
                <p class="font-body text-lg leading-[1.8] italic text-on-surface-variant">"Cast a cold eye<br>On life, on death.<br>Horseman, pass by!"</p>
            </div>
        `
    },
    "convergence": {
        id: "convergence",
        title: "The Convergence of the Twain",
        author: "Thomas Hardy",
        locationName: "Dorchester, England",
        locationCoords: "50.713° N, 2.428° W",
        lat: 50.713,
        lng: -2.428,
        type: "Inscribed Location",
        typeTag: "The Stoic Elegy",
        accuracy: 'compositional',
        era: "1912",
        image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=800&q=80",
        desc: "Written to aid the Titanic Disaster Fund, reflecting Hardy's cosmic pessimism.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">In a solitude of the sea</p>
                <p class="font-body text-lg leading-[1.8]">Deep from human vanity,</p>
                <p class="font-body text-lg leading-[1.8]">And the Pride of Life that planned her, stilly couches she.</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">Steel chambers, late the pyres</p>
                <p class="font-body text-lg leading-[1.8]">Of her salamandrine fires,</p>
                <p class="font-body text-lg leading-[1.8]">Cold currents thrid, and turn to rhythmic tidal lyres.</p>
            </div>
        `
    },
    "ozymandias": {
        id: "ozymandias",
        title: "Ozymandias",
        author: "Percy Bysshe Shelley",
        locationName: "Marlow, Buckinghamshire",
        locationCoords: "51.572° N, 0.775° W",
        lat: 51.572,
        lng: -0.775,
        type: "Inscribed Location",
        typeTag: "The Romantic Sonnet",
        accuracy: 'compositional',
        era: "1818",
        image: "https://images.unsplash.com/photo-1549888834-3ec93abae044?w=800&q=80",
        desc: "Written in friendly competition with Horace Smith while living at Albion House in Marlow.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">I met a traveller from an antique land,</p>
                <p class="font-body text-lg leading-[1.8]">Who said—“Two vast and trunkless legs of stone</p>
                <p class="font-body text-lg leading-[1.8]">Stand in the desert. . . . Near them, on the sand,</p>
                <p class="font-body text-lg leading-[1.8]">Half sunk a shattered visage lies...</p>
            </div>
            <div class="relative py-12 border-l-2 border-secondary/20 pl-8 ml-4 group">
                <div class="absolute -left-[9px] top-12 w-4 h-4 rounded-full bg-secondary shadow-sm"></div>
                <p class="font-body text-lg leading-[1.8] italic text-on-surface-variant">"And on the pedestal, these words appear:<br>My name is Ozymandias, King of Kings;<br>Look on my Works, ye Mighty, and despair!"</p>
            </div>
        `
    },
    "lady": {
        id: "lady",
        title: "The Lady of the Lake",
        author: "Sir Walter Scott",
        locationName: "Loch Katrine, Scotland",
        locationCoords: "56.250° N, 4.500° W",
        lat: 56.25,
        lng: -4.5,
        type: "Geographic Verse",
        typeTag: "The Romantic Narrative",
        accuracy: 'confirmed',
        era: "1810",
        image: "https://images.unsplash.com/photo-1465220153209-7771746200af?w=800&q=80",
        desc: "A sprawling narrative poem that single-handedly catalyzed the tourism industry in the Trossachs.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">The stag at eve had drunk his fill,</p>
                <p class="font-body text-lg leading-[1.8]">Where danced the moon on Monan's rill,</p>
                <p class="font-body text-lg leading-[1.8]">And deep his midnight lair had made</p>
                <p class="font-body text-lg leading-[1.8]">In lone Glenartney's hazel shade;</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">But when the sun his beacon red</p>
                <p class="font-body text-lg leading-[1.8]">Had kindled on Benvoirlich's head,</p>
                <p class="font-body text-lg leading-[1.8]">The deep-mouthed bloodhound's heavy bay</p>
                <p class="font-body text-lg leading-[1.8]">Resounded up the rocky way,</p>
            </div>
        `
    },
    "shalott": {
        id: "shalott",
        title: "The Lady of Shalott",
        author: "Alfred, Lord Tennyson",
        locationName: "Tintagel Castle, Cornwall",
        locationCoords: "50.667° N, 4.758° W",
        lat: 50.667,
        lng: -4.758,
        type: "Geographic Verse",
        typeTag: "The Arthurian Ballad",
        accuracy: 'approximate',
        era: "1832",
        image: "https://images.unsplash.com/photo-1462275646964-a0e0819772ee?w=800&q=80",
        desc: "A vivid Arthurian legend placed in the context of Camelot, heavily associated with the dramatic coastline of Cornwall.",
        textHTML: `
            <div class="space-y-4 max-w-xl">
                <p class="font-body text-lg leading-[1.8] first-letter:text-5xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:text-primary">On either side the river lie</p>
                <p class="font-body text-lg leading-[1.8]">Long fields of barley and of rye,</p>
                <p class="font-body text-lg leading-[1.8]">That clothe the wold and meet the sky;</p>
                <p class="font-body text-lg leading-[1.8]">And through the field the road runs by</p>
                <p class="font-body text-lg leading-[1.8]">To many-towered Camelot.</p>
            </div>
            <div class="space-y-4 max-w-xl pt-8">
                <p class="font-body text-lg leading-[1.8]">There she weaves by night and day</p>
                <p class="font-body text-lg leading-[1.8]">A magic web with colours gay.</p>
                <p class="font-body text-lg leading-[1.8]">She has heard a whisper say,</p>
                <p class="font-body text-lg leading-[1.8]">A curse is on her if she stay</p>
                <p class="font-body text-lg leading-[1.8]">To look down to Camelot.</p>
            </div>
        `
    }
};

Object.assign(POETRY_DATA, POETRY_DATA_EXTRA);
