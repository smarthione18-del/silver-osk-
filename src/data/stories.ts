import { Story, AgeCategory, GenreCategory, Epigraph } from '../types';

export const STORIES: Story[] = [
  {
    id: 'clever-crow',
    title: 'The Clever Crow & The Water Pitcher',
    hindiTitle: 'चतुर कौवा और घड़ा (पंचतंत्र)',
    subtitle: 'Where there is a will, there is a way — how small pebbles quench deep thirst.',
    hindiSubtitle: 'जहाँ चाह, वहाँ राह — नन्हें कंकड़ों से कैसे बुझी कौवे की प्यास',
    author: 'पंडित विष्णु शर्मा (Vishnu Sharma)',
    authorTitle: 'प्राचीन भारतीय नीति-कथाकार (Ancient Sage of Panchatantra)',
    coverImage: '/src/assets/images/clever_crow_pitcher_1790509747650.jpg',
    tags: ['पंचतंत्र', 'Moral Story', 'Indian Folk', 'Children & Family', 'Kids Special'],
    genre: 'Folklore & Mythology',
    ageBracket: 'little-dreamers',
    ageCategory: 'kids_3_7',
    musicPreset: 'sitar',
    targetAgeLabel: '3-7 वर्ष (छोटे बच्चे) • Kids (Ages 3-7)',
    readingMinutes: 4,
    wordCount: 750,
    lexile: '420L (Easy Hindi & English)',
    rating: 4.98,
    reviewCount: 2340,
    synopsis: 'On a blazing summer afternoon, a thirsty crow discovers an earthen pot with water sitting far below the rim. Instead of crying or flying away, he puts his clever mind to work pebble by pebble.',
    hindiSynopsis: 'एक चिलचिलाती गर्मी के दिन, एक प्यासा कौवा पानी की तलाश में उड़ता रहा। उसे एक बगीचे में सुराही मिली, पर पानी बहुत नीचे था। कौवे ने हिम्मत नहीं हारी और अपनी समझदारी से कंकड़ डालकर पानी ऊपर ला दिया।',
    moral: 'Where there is a will, there is a way. Patience and thinking carefully solve any difficult situation.',
    hindiMoral: 'सीख: जहाँ चाह, वहाँ राह। बुद्धि और धैर्य से कठिन से कठिन समस्या भी हल हो जाती है।',
    format: 'audio',
    audioNarration: {
      narrator: 'गुलज़ार शैली (Gulzar-style Voice)',
      durationMinutes: 5,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['बुद्धि का बल (Wisdom)', 'धैर्य (Patience)', 'दृढ़ संकल्प (Determination)'],
    chapters: [
      {
        id: 'crow-ch-1',
        number: 1,
        title: 'The Thirst Under the Scorching Sun',
        hindiTitle: 'भीषण गर्मी और प्यासा कौवा',
        wordCount: 400,
        readingMinutes: 2,
        isUnlocked: true,
        image: '/src/assets/images/clever_crow_pitcher_1790509747650.jpg',
        imageCaption: 'The thirsty crow discovering the deep earthen water pitcher in the courtyard',
        hindiImageCaption: 'बगीचे में रखे मिट्टी के घड़े में कंकड़ डालकर पानी ऊपर लाता चतुर कौवा',
        content: `It was peak summer across the vast plains of Northern India. The rivers had dried into glistening sandbanks, and not a single drop of dew rested upon the banyan leaves. A black crow named Kalu flew tiredly from village to village, his beak parched and dry.
        
Just as he felt his wings growing heavy, he saw an old earthen pitcher resting beneath a neem tree in an abandoned courtyard. He hurried downward, beating his wings with joy. "At last, water!" he cawed softly.`,
        hindiContent: `जेठ की दोपहरी थी। चारों ओर धूप तप रही थी। नदियां और तालाब सूख चुके थे। कालू नाम का एक कौवा सुबह से पानी की एक बूंद के लिए भटक रहा था। उसकी प्यास के मारे जीभ सूख रही थी।
        
उड़ते-उड़ते उसे एक पुराने नीम के पेड़ के नीचे एक मिट्टी का घड़ा (सुराही) दिखाई दिया। कालू खुश होकर तुरंत घड़े के पास उतरा और झांक कर देखा। उसमें पानी तो था, पर पानी घड़े के बिल्कुल तल में था।`
      },
      {
        id: 'crow-ch-2',
        number: 2,
        title: 'The Pebbles and the Triumph',
        hindiTitle: 'कंकड़ों की तरकीब और जीत',
        wordCount: 350,
        readingMinutes: 2,
        isUnlocked: true,
        image: '/src/assets/images/clever_crow_pitcher_1790509747650.jpg',
        imageCaption: 'The water rises to the brim as Kalu drinks to his heart content',
        hindiImageCaption: 'घड़े के मुंह तक आया ठंडा जल और प्यास बुझाकर उड़ता विजयी कौवा',
        content: `Kalu stretched his neck as far as he could, but his beak could not reach the water. He tried pushing the heavy earthen pitcher over, but it was too sturdy. Any lesser bird would have given up and flown away despairing.
        
But Kalu looked around carefully. He noticed hundreds of smooth river pebbles scattered near the courtyard wall. A bright spark of an idea struck him! One by one, he picked up a pebble in his beak and dropped it into the pitcher: *Plop! Plop! Plop!*
        
With every stone, the water rose millimeter by millimeter until it touched the very rim. Kalu drank to his heart's content, refreshed his feathers, and flew back into the sky, rejoicing in his victory.`,
        hindiContent: `कालू ने घड़े में अपनी चोंच डाली, पर चोंच पानी तक नहीं पहुंच सकी। उसने घड़े को पलटने की कोशिश की, पर घड़ा भारी था। 
        
कालू थोड़ी देर सोच में पड़ गया। तभी उसकी नज़र पास पड़े छोटे-छोटे कंकड़ों पर गई। उसके दिमाग में एक विचार आया! उसने एक-एक कंकड़ अपनी चोंच में उठाया और घड़े में डालना शुरू किया। 'टप! टप! टप!'
        
धीरे-धीरे कंकड़ नीचे बैठते गए और पानी ऊपर चढ़ने लगा। देखते ही देखते पानी घड़े के मुंह तक आ गया! कालू ने छक कर ठंडा पानी पिया, अपनी प्यास बुझाई और कांव-कांव करते हुए खुशी से आसमान में उड़ गया।`
      }
    ]
  },
  {
    id: 'panchatantra-jackal-drum',
    title: 'Panchatantra: The Jackal & The War Drum',
    hindiTitle: 'पंचतंत्र: गोमायु गीदड़ और ढोल (नगाड़ा)',
    subtitle: 'Do not fear hollow noise until you discover the truth behind the sound.',
    hindiSubtitle: 'जंगल में गूंजती भारी आवाज़ से डरे बिना जब गीदड़ ने जाना नगाड़े का रहस्य',
    author: 'पंडित विष्णु शर्मा (Vishnu Sharma)',
    authorTitle: 'पंचतंत्र के अमर नीति-कथाकार',
    coverImage: '/src/assets/images/jackal_war_drum_1790509877244.jpg',
    tags: ['पंचतंत्र', 'Moral Story', 'Animal Fable', 'Kids Special'],
    genre: 'Folklore & Mythology',
    ageBracket: 'little-dreamers',
    ageCategory: 'kids_3_7',
    musicPreset: 'sitar',
    targetAgeLabel: '3-7 वर्ष (छोटे बच्चे) • Kids (Ages 3-7)',
    readingMinutes: 4,
    wordCount: 720,
    lexile: '440L',
    rating: 4.97,
    reviewCount: 1840,
    synopsis: 'A starving jackal named Gomayu hears a terrifying boom in the deep forest. Instead of fleeing in panic, he creeps forward to investigate and finds an abandoned battle drum being struck by wind-blown branches.',
    hindiSynopsis: 'एक भूखा गीदड़ जंगल में भटक रहा था। अचानक उसे किसी राक्षस जैसी भारी आवाज़ सुनाई दी—धम! धम! गीदड़ पहले तो डर गया, पर हिम्मत जुटाकर पास गया तो देखा हवा से पेड़ की टहनी एक पुराने युद्ध-नगाड़े से टकरा रही थी।',
    moral: 'Never be terrified by loud, empty noise. Courage and inquiry reveal the truth behind every fear.',
    hindiMoral: 'सीख: बिना जांच-परख किए केवल ऊंची आवाज़ या शोर से नहीं डरना चाहिए। निडरता और समझदारी से हर रहस्य का सच सामने आ जाता है।',
    format: 'audio',
    audioNarration: {
      narrator: 'कथा मंजरी (Panchatantra Storyteller)',
      durationMinutes: 5,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['डर पर विजय (Conquering Fear)', 'साहस (Courage)', 'जिज्ञासा (Curiosity)'],
    chapters: [
      {
        id: 'jackal-ch-1',
        number: 1,
        title: 'The Thunder in the Silent Woods',
        hindiTitle: 'जंगल में गूंजता भयंकर धमाका',
        wordCount: 360,
        readingMinutes: 2,
        isUnlocked: true,
        image: '/src/assets/images/jackal_war_drum_1790509877244.jpg',
        imageCaption: 'Gomayu the jackal cautiously peeking at the strange leather drum',
        hindiImageCaption: 'पेड़ों के बीच फंसे नगाड़े को हैरानी से देखता भूखा गीदड़ गोमायु',
        content: `Deep within a dense sal forest, Gomayu the jackal was prowling in search of food. His ribs showed through his grey fur; he had not eaten for two full days.
        
Suddenly, a deep, booming roar echoed through the glade: *DHUM! DHUM! DHADHAM!*
        
The jackal leaped into the air with fright. "Alas!" thought Gomayu, his knees trembling. "What monstrous demon has entered my territory? The sound is loud enough to shake the earth. Surely I am doomed if I do not flee!"`,
        hindiContent: `एक घने जंगल में गोमायु नाम का एक सियार (गीदड़) भूख से बेहाल होकर इधर-उधर भटक रहा था। उसे दो दिन से खाने को कुछ नहीं मिला था।
        
अचानक सन्नाटे में एक बहुत भारी गूंजती आवाज़ आई: 'धम! धम! धड़ाम!'
        
गीदड़ डर के मारे उछल पड़ा। उसके पैर कांपने लगे: 'अरे बाप रे! यह कौन सा भयानक दानव जंगल में आ गया? इतनी भारी आवाज़ तो मैंने आज तक नहीं सुनी! अगर मैं यहां रुका तो वह मुझे एक ही कौर में निगल जाएगा!'`
      },
      {
        id: 'jackal-ch-2',
        number: 2,
        title: 'The Discovery of the Hollow Leather',
        hindiTitle: 'पोले चमड़े का सच और दावत',
        wordCount: 360,
        readingMinutes: 2,
        isUnlocked: true,
        image: '/src/assets/images/jackal_war_drum_1790509877244.jpg',
        imageCaption: 'The jackal enjoying the leather drum in the sunlit forest',
        hindiImageCaption: 'नगाड़े का रहस्य जानकर खुशी से नाचता चतुर गीदड़',
        content: `Gomayu turned to run, but his sharp mind whispered: "A wise animal never runs from a mystery without looking. Let me creep closer under the bushes."
        
Sticking close to the mossy earth, Gomayu slithered forward. Beneath a giant tamarind tree, he saw an army drum left behind after a king's ancient battle. Whenever the brisk breeze blew, a stout bamboo branch whipped against the taut leather skin, creating the thunderous boom!
        
Gomayu chuckled with relief: "Ha! It is merely empty wood and dried leather!" He approached boldly, tore into the seasoned leather rim for a hearty meal, and rejoiced that courage had triumphed over blind terror.`,
        hindiContent: `गीदड़ भागने ही वाला था कि उसके मन में विचार आया: 'बुद्धिमान प्राणी बिना सच जाने मैदान नहीं छोड़ता। मुझे छिपकर देखना चाहिए कि यह आवाज़ आ कहां से रही है।'
        
वह पेट के बल रेंगता हुआ झाड़ियों के पीछे पहुंचा। वहां इमली के पेड़ के नीचे एक पुराना फौजी नगाड़ा (ढोल) पड़ा था। जब भी तेज हवा चलती, पेड़ की एक सूखी टहनी नगाड़े के चमड़े पर जाकर बज उठती थी: 'धम!'
        
गीदड़ ठहाका मारकर हंसा: 'अरे वाह! यह तो केवल लकड़ी और सूखा चमड़ा है, भीतर से बिल्कुल खोखला!' गीदड़ ने आगे बढ़कर नगाड़े के चमड़े को चबाया, अपनी भूख मिटाई और समझा कि शोर मचाने वाली हर चीज़ खतरनाक नहीं होती।`
      }
    ]
  },
  {
    id: 'tenali-raman-thieves',
    title: 'Tenali Raman & The Thieves',
    hindiTitle: 'तेनालीराम और कुएं का पानी',
    subtitle: 'How the legendary court jester turned two thieves into his garden helpers.',
    hindiSubtitle: 'तेनालीराम की हाज़िरजवाबी — चोरों से ही पूरी रात सींचवा दिया बगीचा',
    author: 'तेनाली रामकृष्ण (Tenali Ramakrishna)',
    authorTitle: 'विजयनगर राजदरबार के प्रसिद्ध विदूषक व कवि',
    coverImage: '/src/assets/images/tenali_raman_well_1790509734671.jpg',
    tags: ['तेनालीराम', 'हास्य और सीख', 'Wisdom', 'Indian Humor', 'Kids Special'],
    genre: 'Folklore & Mythology',
    ageBracket: 'little-dreamers',
    ageCategory: 'kids_3_7',
    musicPreset: 'sitar',
    targetAgeLabel: '3-7 वर्ष व सभी बच्चे • Kids (Ages 3-7)',
    readingMinutes: 5,
    wordCount: 880,
    lexile: '520L',
    rating: 4.97,
    reviewCount: 1980,
    synopsis: 'When two burglars hide outside Tenali Raman’s house to loot his jewels, Raman pretends not to notice. Instead, he tells his wife loudly to hide their gold chest deep in the garden well.',
    hindiSynopsis: 'रात को तेनालीराम के घर के बाहर दो चोर छिपकर खड़े थे। तेनालीराम ने उन्हें देख लिया, पर बिना डरे अपनी पत्नी से ज़ोर से कहा कि चोरों के डर से सारे गहने कुएं में छुपा देते हैं। चोर पूरी रात कुएं से पानी निकालते रहे!',
    moral: 'Presence of mind and good humor can disarm any danger without fighting.',
    hindiMoral: 'सीख: संकट के समय डरने के बजाय यदि ठंडे दिमाग और सूझबूझ से काम लें, तो शत्रु की चाल उसी पर उल्टी पड़ जाती है।',
    format: 'audio',
    audioNarration: {
      narrator: 'आकाशवाणी कथाकार (Akashvani Voice)',
      durationMinutes: 7,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['हाज़िरजवाबी (Quick Wit)', 'सूझबूझ (Cleverness)', 'साहस (Courage)'],
    chapters: [
      {
        id: 'tenali-ch-1',
        number: 1,
        title: 'The Whispers in the Mango Orchard',
        hindiTitle: 'आम के बगीचे में आहट',
        wordCount: 450,
        readingMinutes: 2,
        isUnlocked: true,
        image: '/src/assets/images/tenali_raman_well_1790509734671.jpg',
        imageCaption: 'Clever Tenali Raman whispering loudly in his garden as thieves hide in the banana trees',
        hindiImageCaption: 'केले के पत्तों में छिपे चोरों को देखकर कुएं में खजाना छुपाने का नाटक करते चतुर तेनालीराम',
        content: `One sultry night in the prosperous city of Vijayanagara, Tenali Raman was taking a stroll in his mango backyard. The moonlight fell upon the bushes, revealing two pairs of greedy eyes peering from behind the jasmine creepers.
        
Burglars! Tenali understood at once. He did not scream or run for the royal guards. Instead, he yawned theatrically and called to his wife: "Sharada! Lock the front gate! The town crier announced that a gang of thieves is prowling the neighborhood. We must hide all our gold necklaces, silver cups, and rubies at once!"`,
        hindiContent: `विजयनगर साम्राज्य की एक शांत रात थी। तेनालीराम अपने बगीचे में टहल रहे थे। अचानक उन्हें चमेली की झाड़ियों के पीछे दो परछाइयां हिलती हुई दिखीं।
        
तेनालीराम समझ गए कि ये चोर हैं जो घर में डाका डालने की नीयत से छिपे हैं। वह ज़रा भी नहीं घबराए। उन्होंने अंदर जाकर अपनी पत्नी से इतनी ज़ोर से कहा कि बाहर बैठे चोर भी सुन लें: 'अरे सुनती हो! शहर में बहुत बड़े चोर आए हैं। हमारा जितना भी सोना-चांदी और कीमती गहने हैं, उन्हें एक बड़े बक्से में भरकर बगीचे के कुएं में फेंक देते हैं ताकि कोई चुरा न सके!'`
      },
      {
        id: 'tenali-ch-2',
        number: 2,
        title: 'The Midnight Gardeners',
        hindiTitle: 'रातभर कुएं से पानी निकालते चोर',
        wordCount: 430,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/tenali_raman_well_1790509734671.jpg',
        imageCaption: 'The exhausted thieves fleeing at sunrise as Tenali thanks them for watering his garden',
        hindiImageCaption: 'सुबह चाय का कुल्हड़ लेकर चोरों का धन्यवाद करते तेनालीराम और सिर पर पैर रखकर भागते चोर',
        content: `Tenali and his wife carried a very heavy iron trunk stuffed with large garden stones and tossed it into the deep well with a gigantic *SPLASH!* Then they returned indoors and pretended to snore loudly.
        
Outside, the two thieves smiled gleefully. "The fool has thrown all his riches into the well! Let us draw out the water and seize the chest!"
        
For five long hours, the thieves pulled bucket after bucket of water, dumping it over the nearby plants. By sunrise, Tenali's entire mango grove, vegetable patches, and jasmine trees were lavishly watered! Tenali stepped outside with warm morning chai and bowed: "Thank you, kind gentlemen! My plants were dying of heat. How much do I owe you for watering my garden?" The exhausted thieves took to their heels in terror!`,
        hindiContent: `तेनालीराम ने एक भारी बक्से में पत्थर भरकर बाहर लाया और उसे कुएं में धड़ाम से फेंक दिया। फिर घर का दरवाज़ा बंद कर चैन से सोने चले गए।
        
चोर झाड़ियों में बैठे मुस्कुराए—'अरे वाह! सारा खजाना तो कुएं में है।' उन्होंने सोचा कि कुएं का पानी बाल्टी-बाल्टी निकाल कर खाली करेंगे और खजाना निकाल लेंगे।
        
दोनों चोर पूरी रात कुएं से बाल्टी भर-भरकर पानी बाहर फेंकते रहे। वह पानी बहकर तेनालीराम के पूरे बगीचे, फूलों और सब्जियों की क्यारियों में भर गया। सुबह सूरज निकला, तो तेनालीराम चाय का कुल्हड़ लेकर बाहर आए और मुस्कुराकर बोले: 'धन्यवाद भाइयों! मेरा बगीचा कई दिनों से सूखा पड़ा था। आपकी मेहनत से सारा बाग हरा-भरा हो गया!' चोर अपनी जान बचाकर वहां से ऐसे भागे कि फिर कभी विजयनगर का रुख नहीं किया।`
      }
    ]
  },
  {
    id: 'akbar-birbal-sweetest',
    title: 'Akbar & Birbal: The Sweetest Thing in the World',
    hindiTitle: 'अकबर-बीरबल: संसार की सबसे मीठी चीज़',
    subtitle: 'Is honey the sweetest, or sugarcane juice, or the sweet words spoken from the heart?',
    hindiSubtitle: 'बादशाह का विचित्र सवाल और बीरबल का बुद्धिमत्ता भरा उत्तर',
    author: 'बीरबल कथा (Birbal Tales)',
    authorTitle: 'मुगल बादशाह अकबर के नवरत्न व मुख्य सलाहकार',
    coverImage: '/src/assets/images/akbar_birbal_court_1790509718757.jpg',
    tags: ['अकबर-बीरबल', 'Folklore', 'Moral Stories', 'Indian History', 'Kids Special'],
    genre: 'Folklore & Mythology',
    ageBracket: 'little-dreamers',
    ageCategory: 'kids_3_7',
    musicPreset: 'sitar',
    targetAgeLabel: '3-7 वर्ष व बाल पाठक • Kids (Ages 3-7)',
    readingMinutes: 5,
    wordCount: 820,
    lexile: '560L',
    rating: 4.95,
    reviewCount: 1650,
    synopsis: 'Emperor Akbar poses a sudden riddle to his royal court: "What is the sweetest thing on this earth?" While courtiers name royal sweets, mangoes, and jalebi, Birbal gives an answer that moves the Emperor to tears.',
    hindiSynopsis: "बादशाह अकबर ने दरबार में पूछा कि इस दुनिया में सबसे मीठी चीज़ क्या है? दरबारी गुलाब जामुन और आम का नाम लेते रहे, पर बीरबल ने 'मीठी बोली' और 'सच्चा प्रेम' कहकर सबका दिल जीत लिया।",
    moral: 'Kind words cost nothing, but their sweetness brings peace and friendship to all human hearts.',
    hindiMoral: 'सीख: मीठी वाणी और नम्र स्वभाव से हर व्यक्ति का दिल जीता जा सकता है। कड़वे बोल घाव देते हैं, जबकि मीठे बोल मरहम बन जाते हैं।',
    format: 'audio',
    audioNarration: {
      narrator: 'अमीन सयानी शैली (Ameen Sayani Style)',
      durationMinutes: 6,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['मीठी वाणी (Kind Speech)', 'सद्भाव (Harmony)', 'आंतरिक सौंदर्य (Inner Sweetness)'],
    chapters: [
      {
        id: 'akbar-ch-1',
        number: 1,
        title: 'The Imperial Riddle',
        hindiTitle: 'दरबार-ए-खास में सवाल',
        wordCount: 400,
        readingMinutes: 2,
        isUnlocked: true,
        image: '/src/assets/images/akbar_birbal_court_1790509718757.jpg',
        imageCaption: 'Emperor Akbar holding royal court with clever advisor Birbal',
        hindiImageCaption: 'दरबार-ए-खास में मंत्रियों से दुनिया की सबसे मीठी चीज़ पर सवाल करते बादशाह अकबर',
        content: `The court of Emperor Akbar was assembled in all its grandeur. Persian carpets lined the marble floors, and the scent of rosewater drifted from the fountains.
        
The Emperor turned to his ministers with a twinkle in his eye: "Tell me, wise noblemen, what is the sweetest thing existing in the universe? Whoever answers correctly shall receive a necklace of hundred Burmese pearls!"
        
One minister bowed low: "Jahanpanah, surely it is the fresh honey from the Himalayan hives!"
Another disagreed: "No, Emperor! It is the Alphonso mango plucked in midsummer!"
A third shouted: "The royal syrup jalebi fried in pure desi ghee!" Akbar smiled, but his heart remained unsatisfied. Then he looked at Birbal.`,
        hindiContent: `आगरा के लाल किले में बादशाह अकबर का भव्य दरबार सजा था। इत्र और गुलाब जल की महक फिज़ा में घुली हुई थी।
        
अचानक बादशाह अकबर ने अपने मंत्रियों से पूछा: 'दरबारियों! बताओ, इस धरती पर सबसे मीठी चीज़ कौन सी है? जिसका जवाब सबसे सही होगा, उसे सौ मोतियों का हार इनाम में दिया जाएगा!'
        
एक दरबारी ने कहा: 'हुजूर! सबसे मीठा तो जंगल का ताजा शहद है।'
दूसरे ने कहा: 'नहीं जहांपनाह, सबसे मीठा तो बनारसी आम और रसीली जलेबी है।'
अकबर मुस्कुराए पर किसी के जवाब से संतुष्ट नहीं हुए। उन्होंने अपने सबसे प्रिय मित्र बीरबल की ओर देखा—'बीरबल, तुम चुप क्यों हो?'`
      },
      {
        id: 'akbar-ch-2',
        number: 2,
        title: 'Birbal’s Golden Words',
        hindiTitle: 'बीरबल का लाजवाब उत्तर',
        wordCount: 420,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/akbar_birbal_court_1790509718757.jpg',
        imageCaption: 'Birbal explaining the sweetness of gentle speech as Akbar smiles in joy',
        hindiImageCaption: 'मीठी वाणी की महिमा सुनकर बीरबल को मोतियों का हार पहनाते बादशाह अकबर',
        content: `Birbal stepped forward with folded hands: "Shahenshah, honey and mangoes are sweet only upon the tongue for a passing minute. Once swallowed, their sweetness is gone forever.
        
The sweetest thing in this whole world is 'sweet speech'—a gentle, affectionate tongue (मीठी वाणी). When spoken from a pure heart, kind words heal broken relationships, turn enemies into loyal brothers, comfort the weeping, and remain remembered even centuries after a person passes away."
        
The entire assembly fell silent. Akbar's eyes filled with admiration. He stood from the Peacock Throne, took off his own priceless pearl necklace, and placed it gently around Birbal's neck: "Truly, Birbal, your wisdom is sweeter than all the nectar of paradise."`,
        hindiContent: `बीरबल ने हाथ जोड़कर नम्रता से कहा: 'जहांपनाह! आम, शहद या मिठाई की मिठास तो सिर्फ जीभ पर कुछ सेकंड के लिए रहती है। निगलते ही वह खत्म हो जाती है।
        
इस संसार में सबसे मीठी चीज़ है—'मीठी वाणी' (प्यार और अपनेपन से बोले गए बोल)। जब कोई इंसान प्यार से बात करता है, तो वह पराए को भी अपना बना लेता है, रोते हुए के आंसू पोंछ देता है और दुश्मनों को भी दोस्त बना देता है। मीठे बोल इंसान के चले जाने के बाद भी याद रहते हैं।'
        
यह सुनकर पूरा दरबार तालियों से गूंज उठा। बादशाह अकबर बेहद प्रसन्न हुए। उन्होंने अपने गले से मोतियों की माला उतारकर बीरबल को पहना दी और कहा: 'बीरबल, तुम्हारा कोई जवाब नहीं! तुम्हारी बातें वाकई में दुनिया की सबसे मीठी चीज़ हैं।'`
      }
    ]
  },
  {
    id: 'kabuliwala-tagore',
    title: 'Rabindranath Tagore: Kabuliwala',
    hindiTitle: 'काबुलीवाला - गुरुदेव रबीन्द्रनाथ टैगोर',
    subtitle: 'A timeless story of innocent friendship and fatherly love bridging mountains and oceans.',
    hindiSubtitle: 'काबुल के मेवे वाले और छोटी मिनी के बीच निश्छल प्रेम की अमर कथा',
    author: 'रबीन्द्रनाथ टैगोर (Rabindranath Tagore)',
    authorTitle: 'नोबेल पुरस्कार विजेता भारतीय महाकवि (Nobel Laureate)',
    coverImage: '/src/assets/images/kabuliwala_mini_1790509850635.jpg',
    tags: ['Rabindranath Tagore', 'Indian Classic', 'Emotional Tale', 'Literary Masterpiece'],
    genre: 'Folklore & Mythology',
    ageBracket: 'junior',
    ageCategory: 'teens_8_14',
    musicPreset: 'monsoon',
    targetAgeLabel: '8-14 वर्ष व साहित्य प्रेमी • Ages 8-14',
    readingMinutes: 8,
    wordCount: 1450,
    lexile: '720L',
    rating: 4.99,
    reviewCount: 3100,
    synopsis: 'Rahamat, a tall fruit-seller from Kabul with dry fruits and almonds in his sack, forms an endearing fatherly bond with five-year-old chatterbox Mini in Kolkata. Years later, on the morning of Mini’s wedding, he returns.',
    hindiSynopsis: 'कोलकाता में काबुल से आया मेवे बेचने वाला रहमत और छोटी चुलबुली बच्ची मिनी के बीच एक अनोखा आत्मीय रिश्ता बन जाता है। रहमत को मिनी में अपनी ही बेटी की झलक दिखती है। टैगोर की यह कहानी इंसानियत और वात्सल्य का अमर गीत है।',
    moral: 'The love of a father knows no boundaries of religion, language, or country. Kindness binds humanity as one family.',
    hindiMoral: 'सीख: वात्सल्य और ममता किसी सरहद, जाति या धर्म की मोहताज नहीं होती। संसार का हर पिता अपनी संतान में वही प्रेम देखता है।',
    format: 'illustrated',
    audioNarration: {
      narrator: 'सच्चिदानंद जोशी (Sachidanand Joshi)',
      durationMinutes: 14,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['पिता का प्रेम (Fatherly Love)', 'मानवता (Shared Humanity)', 'मासूमियत (Innocence)'],
    chapters: [
      {
        id: 'kabuli-ch-1',
        number: 1,
        title: 'Mini and the Man from the Mountains',
        hindiTitle: 'मिनी और पहाड़ों से आया मेवे वाला',
        wordCount: 700,
        readingMinutes: 4,
        isUnlocked: true,
        image: '/src/assets/images/kabuliwala_mini_1790509850635.jpg',
        imageCaption: 'Tall dry-fruit seller Rahamat smiling with little Mini in Kolkata courtyard',
        hindiImageCaption: 'कोलकाता के आंगन में नन्ही चंचल मिनी को बादाम-किशमिश देता काबुलीवाला रहमत',
        content: `My five-year-old daughter Mini could not stay silent for a single minute. If she was awake, words flowed from her lips like mountain streams.
        
One morning, while I was writing the seventeenth chapter of my novel, Mini rushed to the window and cried out: "Kabuliwala! O Kabuliwala!"
        
Down on the dusty street walked Rahamat, a tall Afghan fruit seller with a turban upon his head and a sack of dried grapes, pistachios, and almonds slung over his broad shoulder. At first, Mini was frightened that he carried children inside his sack. But Rahamat knelt down, smiled warmly, and offered her raisins from his pocket. From that day on, the two became inseparable companions, laughing at their shared jokes of going to the 'Father-in-law's house'.`,
        hindiContent: `मेरी पांच साल की बेटी मिनी एक पल भी चुप नहीं रह सकती थी। जब तक वह जागती, उसके मुंह से बातों की गंगा बहती रहती थी।
        
एक दिन जब मैं अपने कमरे में लिख रहा था, मिनी खिड़की की तरफ भागी और चिल्लाई: 'काबुलीवाला! ओ काबुलीवाला!'
        
नीचे सड़क पर अफगानिस्तान के काबुल से आया एक लंबा-चौड़ा पठान रहमत जा रहा था। उसके कंधे पर पिस्ते, बादाम और किशमिश का थैला था। पहले तो मिनी डर गई कि काबुलीवाले के थैले में शायद बच्चे बंद होते हैं। लेकिन रहमत ने जमीन पर बैठकर मुस्कुराते हुए अपनी जेब से बादाम और किशमिश निकाल कर मिनी की नन्हीं हथेली पर रख दिए। उस दिन के बाद से दोनों पक्के दोस्त बन गए।`
      },
      {
        id: 'kabuli-ch-2',
        number: 2,
        title: 'The Handprint on the Yellow Paper',
        hindiTitle: 'पीले कागज़ पर नन्हे हाथ का निशान',
        wordCount: 750,
        readingMinutes: 4,
        isUnlocked: true,
        image: '/src/assets/images/kabuliwala_mini_1790509850635.jpg',
        imageCaption: 'The yellowed paper with the ink imprint of a little child hand',
        hindiImageCaption: 'काबुल के पहाड़ों में छूट गई नन्ही बेटी के हाथ के निशान वाला पीला कागज़',
        content: `Years passed. An unfortunate dispute in the bazaar sent Rahamat away to prison for many long years. Life in Kolkata moved on. Mini blossomed into a radiant maiden, and on an auspicious autumn night, she was to be married. The shehnai was playing festive tunes in our courtyard.
        
Suddenly, a gaunt, weathered man stood in the doorway. It was Rahamat, freshly released. He carried a small packet of raisins for his 'little Mini'.
        
I told him softly: "Today is Mini's wedding day. It is not possible to see her." Rahamat bowed his head with moist eyes. He reached into his robe and brought out a crumpled, yellowed piece of paper. He smoothed it gently upon my desk.
        
Upon the paper was the smudge of a tiny child's hand, made with ink and ash. "Babu," Rahamat whispered with trembling lips, "I too have a little daughter like yours back home in the barren mountains of Kabul. I do not come here to sell raisins; I come only to remember the touch of my own child." My eyes filled with tears. I called Mini in her bridal red silk. And looking at Rahamat, I knew that beneath all robes and languages, all fathers share one single beating heart.`,
        hindiContent: `समय बीत गया। एक दुर्भाग्यपूर्ण झगड़े में रहमत को कई साल की जेल हो गई। समय बीतता रहा, मिनी बड़ी हो गई और आज उसकी शादी का दिन था। घर में शहनाई बज रही थी।
        
तभी दरवाजे पर एक कमजोर, बूढ़ा व्यक्ति आया। वह रहमत था, जो जेल से छूटा था। वह अपनी पुरानी दोस्त नन्ही मिनी के लिए कुछ किशमिश लेकर आया था।
        
मैंने कहा: 'रहमत, आज मिनी की शादी है, तुम उससे नहीं मिल सकते।' रहमत की आंखों में आंसू आ गए। उसने अपनी जेब से एक पुराना मुड़ा-तुड़ा पीला कागज निकाला और मेज पर बिछाया। उस कागज पर स्याही से छपा एक नन्हे बच्चे के हाथ का पंजा था।
        
रहमत ने कांपती आवाज़ में कहा: 'बाबूजी, काबुल के पहाड़ों में मेरी भी ऐसी ही एक नन्हीं बच्ची है। मैं यहां बादाम बेचने नहीं, मिनी में अपनी बेटी की सूरत देखने आता था।' मेरी आंखों से आंसू बह निकले। मैंने मिनी को दुल्हन के जोड़े में बाहर बुलाया। रहमत को देखकर मुझे समझ आया कि चाहे कोई अमीर हो या गरीब, काबुल का हो या हिंदुस्तान का, पिता का दिल पूरी दुनिया में एक जैसा ही धड़कता है।`
      }
    ]
  },
  {
    id: 'swami-malgudi',
    title: 'Malgudi Days: Swami and Friends',
    hindiTitle: 'मालगुडी डेज़: स्वामी और उसके दोस्त',
    subtitle: 'Warm childhood adventures under the whispering tamarind trees of South India.',
    hindiSubtitle: 'आर.के. नारायण के काल्पनिक शहर मालगुडी में स्वामी और मणि की खट्टी-मीठी शरारतें',
    author: 'आर.के. नारायण (R.K. Narayan)',
    authorTitle: 'भारतीय अंग्रेजी साहित्य के युगद्रष्टा (Creator of Malgudi)',
    coverImage: '/src/assets/images/swami_and_friends_1790509863380.jpg',
    tags: ['Malgudi Days', 'R.K. Narayan', 'Childhood', 'Indian Classic'],
    genre: 'Folklore & Mythology',
    ageBracket: 'junior',
    ageCategory: 'teens_8_14',
    musicPreset: 'monsoon',
    targetAgeLabel: '8-14 वर्ष (मालगुडी के दिन) • Ages 8-14',
    readingMinutes: 6,
    wordCount: 950,
    lexile: '600L',
    rating: 4.96,
    reviewCount: 2840,
    synopsis: 'Swaminathan attends Albert Mission School in sleepy Malgudi. Monday mornings are unbearable, paper boats on the Sarayu River are essential, and loyal friendships make the world magical.',
    hindiSynopsis: 'मालगुडी की शांत गलियों में स्वामी और उसके दोस्तों की मासूम शरारतें, सोमवार की सुबह स्कूल जाने का आलस और सरयू नदी में कागज़ की नाव तैराने का सुख। बचपन की सबसे प्यारी यादें।',
    moral: 'The greatest wealth in life is the joy of simple living, innocent friendships, and honest laughter.',
    hindiMoral: 'सीख: जीवन का असली आनंद सादगी, सच्ची दोस्ती और छोटी-छोटी खुशियों में है। बचपन की मासूमियत दिल में हमेशा जिंदा रखनी चाहिए।',
    format: 'illustrated',
    audioNarration: {
      narrator: 'पंकज कपूर शैली (Pankaj Kapur Voice)',
      durationMinutes: 9,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['बचपन की सादगी (Simplicity)', 'सच्ची दोस्ती (Friendship)', 'मालगुडी का जादू (Nostalgia)'],
    chapters: [
      {
        id: 'swami-ch-1',
        number: 1,
        title: 'Monday Morning Blues and Paper Boats',
        hindiTitle: 'सोमवार की सुबह और सरयू नदी',
        wordCount: 500,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/swami_and_friends_1790509863380.jpg',
        imageCaption: 'Swami and his companions floating paper boats on Sarayu River in Malgudi',
        hindiImageCaption: 'मालगुडी में सरयू नदी के शांत किनारे कागज़ की नाव तैराते स्वामी और उसके मित्र',
        content: `It was Monday morning. Swaminathan found it difficult to open his eyes. He considered Monday especially unpleasant in the calendar. After the delicious freedom of Saturday and Sunday, it was difficult to get into that Monday mood of work and discipline.
        
He dragged his feet toward the Albert Mission School, his slate clattering against his geometry box. But by late afternoon, the school bell rang its joyful chime! Swami, along with his best friend Mani—the terror of the class who always carried two river pebbles in his pocket—rushed toward the gentle banks of the Sarayu River.
        
They crafted boats out of discarded geography exercise sheets and watched them sail gracefully against the golden sunset waters.`,
        hindiContent: `सोमवार की सुबह थी। स्वामीनाथन को अपनी आंखें खोलना पहाड़ जैसा लग रहा था। शनिवार और रविवार की आजादी के बाद सोमवार को अल्बर्ट मिशन स्कूल का बस्ता उठाना दुनिया की सबसे कठिन सजा लगती थी।
        
लेकिन जैसे ही दोपहर को स्कूल की आखिरी घंटी बजी, स्वामी और उसका सबसे खास दोस्त मणि खुशी से उछल पड़े। दोनों बस्ता कंधे पर टांगकर सीधे सरयू नदी के शांत किनारे की ओर दौड़े।
        
वहां उन्होंने पुरानी कॉपियों के पन्नों से सुंदर-सुंदर नावें बनाईं और नदी की शांत धार में छोड़ दीं। डूबते सूरज की सुनहरी किरणों में नावों को तैरता देख दोनों के चेहरे खुशी से खिल उठे। यही था मालगुडी का सच्चा सुकून!`
      }
    ]
  },
  {
    id: 'shiva-neelkanth',
    title: 'Lord Shiva & The Legend of Neelkanth',
    hindiTitle: 'भगवान शिव और नीलकंठ महादेव (समुद्र मंथन)',
    subtitle: 'When the oceans unleashed cosmic venom, Mahadev drank the poison to protect the universe.',
    hindiSubtitle: 'समुद्र मंथन से जब कालकूट हलाहल विष निकला, तो संसार की रक्षा हेतु महादेव बने नीलकंठ',
    author: 'महर्षि वेदव्यास (Maharishi Ved Vyasa)',
    authorTitle: 'श्रीमद्भागवत व शिव पुराण के रचयिता',
    coverImage: '/src/assets/images/mahadev_neelkanth_1790508943773.jpg',
    tags: ['देवी-देवता', 'Indian Mythology', 'Gods of India', 'Lord Shiva', 'Spiritual', 'Mahadev Special'],
    genre: 'Folklore & Mythology',
    ageBracket: 'all-ages',
    ageCategory: 'all_ages',
    musicPreset: 'shankh_aarti',
    targetAgeLabel: 'सभी उम्र के लिए • All Ages',
    readingMinutes: 8,
    wordCount: 1600,
    lexile: '680L',
    rating: 4.99,
    reviewCount: 4210,
    synopsis: 'During the great churning of the cosmic ocean (Samudra Manthan) by devas and asuras, the first substance to arise was not nectar, but Halahala—a deadly venom that threatened to incinerate existence. Lord Shiva consumed it to save creation.',
    hindiSynopsis: 'देवताओं और दानवों ने जब क्षीरसागर का मंथन किया, तो सबसे पहले अमृत नहीं बल्कि प्राणघातक हलाहल विष निकला जिसकी ज्वाला से तीनों लोक जलने लगे। सृष्टि को विनाश से बचाने के लिए भगवान शिव ने उस भयंकर विष को हंसते-हंसते पी लिया और नीलकंठ कहलाए।',
    moral: 'True greatness lies in bearing hardships for the welfare of others without letting negativity reach your heart.',
    hindiMoral: 'सीख: दूसरों के कल्याण के लिए कष्ट सहना ही देवत्व है। जीवन में कड़वे घूंट को कंठ में धारण करें, उसे अपने हृदय और मन में द्वेष न बनने दें।',
    format: 'audio',
    audioNarration: {
      narrator: 'हरिहरन शैली (Sacred Chants & Voice)',
      durationMinutes: 8,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['त्याग व करुणा (Selfless Sacrifice)', 'सृष्टि रक्षा (Cosmic Welfare)', 'शिव शक्ति (Divine Resolve)'],
    chapters: [
      {
        id: 'shiva-ch-1',
        number: 1,
        title: 'The Great Churning of the Ocean & Deadly Halahala',
        hindiTitle: 'क्षीरसागर का मंथन और विष की ज्वाला',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/mahadev_neelkanth_1790508943773.jpg',
        imageCaption: 'Lord Shiva drinking the boiling cosmic venom Halahala to save the universe',
        hindiImageCaption: 'सृष्टि के कल्याण हेतु कालकूट हलाहल विष का पान करते देवाधिदेव महादेव नीलकंठ',
        content: `Long ago in the golden era, the gods and demons united to churn the Milk Ocean using Mount Mandara as the churning rod and the serpent king Vasuki as the rope. They sought the elusive nectar of immortality (Amrit).
        
But before any treasures could emerge, the deep ocean trembled violently. A suffocating, black-blue cloud of scorching fumes burst from the depths. It was Halahala—the supreme poison capable of burning celestial realms and earth to ashes. The gods covered their burning eyes, and the demons dropped their ends in terror.
        
"Only Mahadev can preserve us!" cried Lord Brahma and Vishnu. Together, they led the trembling multitude to the snow-clad peaks of Mount Kailash, falling at the feet of the Great Ascetic Shiva.`,
        hindiContent: `प्राचीन काल में देवताओं और असुरों ने अमरता का अमृत पाने के लिए क्षीरसागर का मंथन शुरू किया। मंदराचल पर्वत को मथनी और नागराज वासुकि को नेती बनाया गया।
        
लेकिन अमृत निकलने से पहले समुद्र के गर्भ से भयानक गर्जना हुई और नीला-काला धुआं उठने लगा। यह कालकूट हलाहल विष था! उसकी भयंकर ज्वाला से आकाश, पाताल और पृथ्वी जलने लगी। देवता और दानव त्राहि-त्राहि करने लगे।
        
कोई भी इस विष का ताप सहन नहीं कर सकता था। तब भगवान विष्णु और ब्रह्मा जी के साथ सभी देवता कैलाश पर्वत की ओर भागे और देवाधिदेव महादेव के चरणों में गिरकर रक्षा की प्रार्थना करने लगे—'हे भोलेनाथ! इस विष की अग्नि से संसार को बचा लीजिए!'`
      },
      {
        id: 'shiva-ch-2',
        number: 2,
        title: 'Mount Kailash & The Descent of Holy Ganga',
        hindiTitle: 'कैलाश पर्वत पर ध्यान और पावन गंगा अवतरण',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/mahadev_kailash_1790508957532.jpg',
        imageCaption: 'Lord Shiva in supreme meditation atop Mount Kailash as Mother Ganga descends through his locks',
        hindiImageCaption: 'कैलाश पर्वत पर समाधिस्थ महादेव और जटाओं से अवतरित पावन पतितपावनी गंगा जी',
        content: `Lord Shiva smiled with boundless compassion upon the weeping worlds. "Fear not, children. I shall drink this fire so that creation may breathe."
        
Shiva cupped the boiling venom in his hands and brought it to his lips without hesitation. Seeing this, Mother Parvati placed her gentle hand on Shiva's throat, keeping the deadly poison confined within his neck so it would not enter his stomach and harm the universe residing within him.
        
The intense heat turned Mahadev's throat radiant indigo blue. From that blessed day, he came to be revered as 'Neelkanth'—the Blue-Throated Savior. To cool the divine heat, Lord Shiva adorned the crescent moon (Chandrama) upon his hair and allowed Mother Ganga to cascade through his matted locks onto the Himalayan heights.`,
        hindiContent: `भगवान शिव ने मुस्कुराकर कहा: 'संसार की रक्षा के लिए यदि मुझे विष भी पीना पड़े, तो मैं सहर्ष तैयार हूँ।'
        
महादेव ने उस खौलते हुए हलाहल को अपनी हथेलियों में समेटा और एक ही सांस में पी लिया। माता पार्वती ने तुरंत शिवजी के कंठ पर अपना हाथ रख दिया ताकि वह प्राणघाती विष उनके पेट में न जाए, क्योंकि शिव के उदर में ही समस्त ब्रह्मांड बसता है।
        
विष के प्रभाव से भगवान शिव का कंठ नीला पड़ गया। उसी दिन से त्रिलोकीनाथ का नाम 'नीलकंठ' पड़ा। विष की असह्य तपन को शांत करने के लिए देवताओं ने उनके मस्तक पर शीतल चंद्रमा को सजाया और गंगा जी की पावन धारा उनकी जटाओं से बहने लगी।`
      },
      {
        id: 'shiva-ch-3',
        number: 3,
        title: 'The Cosmic Tandava of Bliss & Universal Protection',
        hindiTitle: 'आनंद तांडव और सृष्टि की शाश्वत सुरक्षा',
        wordCount: 500,
        readingMinutes: 2,
        isUnlocked: true,
        image: '/src/assets/images/mahadev_tandava_1790508968530.jpg',
        imageCaption: 'Nataraja Mahadev dancing the eternal cosmic Tandava of creation, protection, and liberation',
        hindiImageCaption: 'सृजन, रक्षा और मुक्ति का दिव्य आनंद तांडव नृत्य करते देवाधिदेव नटराज महादेव',
        content: `With the burning poison now transformed into a jewel of mercy at his throat, Lord Shiva rose to perform the sacred Ananda Tandava—the dance of bliss, rhythm, and cosmic protection.
        
In his upper right hand, he sounded the Damru drum, pulsing out the eternal heartbeat of time and creation. In his left hand rested the pure flame that dispels all ignorance and darkness. Matted locks flowed outward with the energy of swirling galaxies and burning stars.
        
As Mahadev's sacred dance reached its crescendo, peace descended upon all worlds. The devas showered white celestial Mandara blossoms from heaven. All living beings bowed in awe before the Great Lord whose every gesture sustains life and guards against doom. "Om Namah Shivaya!" echoed across creation.`,
        hindiContent: `विष के प्रभाव को अपने कंठ में शांत कर भगवान शिव ने आनंद तांडव प्रारंभ किया। यह तांडव केवल नृत्य नहीं, बल्कि संपूर्ण सृष्टि में जीवन और लय का संचार था।
        
महादेव के दाएं हाथ में डमरू की पावन ध्वनि ने समय और काल को दिशा दी, तो दूसरे हाथ की पावन अग्नि ने समस्त अज्ञान और भय को भस्म कर दिया। उनके जटाजूट से करोड़ों तारों और आकाशगंगाओं की तरह ऊर्जा छिटक रही थी।
        
जब महादेव का नृत्य शांत हुआ, तो तीनों लोकों में अपार शांति और आनंद छा गया। देवताओं ने गगन से सुगंधित पुष्प बरसाए और संपूर्ण ब्रह्मांड 'हर हर महादेव' के जयघोष से गूंज उठा। आज भी जो मनुष्य सच्चे मन से भगवान शिव का स्मरण करता है, उसके जीवन के सारे विष अमृत में बदल जाते हैं।`
      }
    ]
  },
  {
    id: 'krishna-govardhan',
    title: 'Lord Krishna: The Lifting of Govardhan Hill',
    hindiTitle: 'श्रीकृष्ण लीला: गोवर्धन पर्वत और इंद्र का मान-मर्दन',
    subtitle: 'Lifting a sacred mountain on a single little finger to shield the innocent from torrential wrath.',
    hindiSubtitle: 'इंद्र के अहंकार की मूसलाधार बारिश से ब्रजवासियों की रक्षा के लिए कनिष्ठा उंगली पर उठाया पहाड़',
    author: 'श्रीमद्भागवत व सूरदास (Srimad Bhagavatam & Surdas)',
    authorTitle: 'भक्ति कालीन संत व श्रीमद्भागवत परंपरा',
    coverImage: '/src/assets/images/krishna_govardhan_1790508981451.jpg',
    tags: ['देवी-देवता', 'Lord Krishna', 'Indian Mythology', 'Bhakti', 'Moral Story'],
    genre: 'Folklore & Mythology',
    ageBracket: 'junior',
    ageCategory: 'teens_8_14',
    musicPreset: 'bansuri',
    targetAgeLabel: '8-14 वर्ष व बाल-गोपाल • Ages 8-14',
    readingMinutes: 5,
    wordCount: 950,
    lexile: '600L',
    rating: 4.98,
    reviewCount: 3890,
    synopsis: 'When King Indra unleashed unprecedented storms upon the innocent cowherds and cows of Vrindavan, seven-year-old child Krishna smiled, uprooted the enormous Govardhan Mountain, and balanced it upon his pinky finger like a giant umbrella.',
    hindiSynopsis: 'जब देवराज इंद्र ने अपनी पूजा बंद होने पर क्रोधित होकर पूरे ब्रज पर प्रलयंकारी वर्षा कर दी, तो सात वर्ष के नटखट कान्हा ने विशाल गोवर्धन पर्वत को अपनी सबसे छोटी उंगली पर छाते की तरह उठाकर पूरे गांव और पशु-पक्षियों की रक्षा की।',
    moral: 'True devotion honors nature and simple living over arrogance and ritualistic pride.',
    hindiMoral: 'सीख: प्रकृति, पहाड़, नदियाँ और गोधन हमारे सच्चे रक्षक हैं। अहंकार और क्रोध चाहे कितना भी बड़ा हो, विनम्रता और प्रेम के सामने झुक जाता है।',
    format: 'audio',
    audioNarration: {
      narrator: 'अनुराधा पौडवाल शैली (Anuradha Paudwal Style)',
      durationMinutes: 7,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['प्रकृति प्रेम (Love for Nature)', 'संरक्षण (Divine Protection)', 'अहंकार का नाश (Triumph over Ego)'],
    chapters: [
      {
        id: 'krishna-ch-1',
        number: 1,
        title: 'The Great Deluge over Vrindavan',
        hindiTitle: 'इंद्र का क्रोध और ब्रज पर मूसलाधार आंधी',
        wordCount: 480,
        readingMinutes: 2,
        isUnlocked: true,
        image: '/src/assets/images/krishna_govardhan_1790508981451.jpg',
        imageCaption: 'Young Lord Krishna lifting the massive Govardhan Mountain on his pinky finger',
        hindiImageCaption: 'ब्रजवासियों की रक्षा के लिए अपनी कनिष्ठा उंगली पर गोवर्धन पर्वत उठाते बालकृष्ण',
        content: `Every autumn, the villagers of Gokul prepared opulent sweets and feasts for King Indra, hoping for timely rain. But little Krishna asked his father Nanda: "Why do we worship the distant king of clouds? It is our sacred Govardhan hill that provides green pastures for our cows, sweet springs for our thirst, and timber for our huts. Let us worship our mountain!"
        
The cowherds agreed with Krishna and showered flowers upon Govardhan instead. Hearing this, Indra burned with fierce jealousy. "How dare simple milkmaids neglect my worship at the whim of a boy!"
        
Indra commanded the clouds of doom (Samvartaka) to pour torrents of lightning, ice-stones, and floodwater over Vrindavan until houses began floating away.`,
        hindiContent: `हर वर्ष ब्रज के ग्वाले देवराज इंद्र को प्रसन्न करने के लिए छप्पन भोग और बड़े-बड़े यज्ञ करते थे। नन्हे कन्हैया ने बाबा नंद से कहा: 'बाबा! वर्षा करना तो बादलों का प्राकृतिक धर्म है। हमें तो उस गोवर्धन पर्वत की पूजा करनी चाहिए जो हमारी गायों को हरी घास, शीतल जल और जीवन देता है!'
        
सभी ब्रजवासियों ने कान्हा की बात मानकर गोवर्धन की पूजा की। यह देखकर देवराज इंद्र का अहंकार भड़क उठा। उन्होंने क्रोध में आकर प्रलयंकारी संवर्तक मेघों को आदेश दिया कि पूरे ब्रज को पानी में डुबो दिया जाए। बादलों ने गरज-गरज कर पत्थर और पानी की भयानक बौछारें शुरू कर दीं।`
      },
      {
        id: 'krishna-ch-2',
        number: 2,
        title: 'The Chhatra of Govardhan',
        hindiTitle: 'कनिष्ठा उंगली पर पर्वत और इंद्र का नतमस्तक होना',
        wordCount: 470,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/krishna_govardhan_1790508981451.jpg',
        imageCaption: 'Cows and villagers peacefully sheltered beneath Mount Govardhan',
        hindiImageCaption: 'गोवर्धन पर्वत की छत्रछाया में मुरली बजाते श्रीकृष्ण और सुरक्षित ब्रजवासी',
        content: `Terrified villagers, weeping mothers, and lowing cows gathered around Krishna. The boy smiled with reassuring eyes: "Govardhan is our protector. Come with me!"
        
With effortless grace, Krishna placed his left little finger under the base of the massive mountain and lifted it into the air as easily as a child picks up a mushroom!
        
"Enter beneath this emerald canopy!" Krishna called. For seven days and seven nights, without shifting an inch or blinking, Krishna held the mountain aloft while playing his bamboo flute. All the cows, peacocks, calves, and people stood completely dry and safe under Govardhan's shelter. Exhausted and humiliated, Indra stopped the storm, descended from his white elephant Airavata, and touched Krishna's feet in tears of repentance.`,
        hindiContent: `सभी ग्वाले, गोपियाँ और गायें कांपते हुए कन्हैया के पास दौड़े। श्रीकृष्ण मुस्कुराए और बोले: 'डरो मत! चलो गोवर्धन की शरण में।'
        
भगवान कृष्ण ने हंसते-हंसते अपने बाएं हाथ की छोटी उंगली (कनिष्ठा) से विशाल गोवर्धन पर्वत को ऐसे उठा लिया जैसे कोई बच्चा छतरी उठा लेता है!
        
'सब लोग पर्वत के नीचे आ जाओ!' सात दिन और सात रात तक मूसलाधार बारिश होती रही, पर पर्वत के नीचे एक भी बूंद नहीं गिरी। कृष्ण एक हाथ से पर्वत उठाए अपनी मुरली की मधुर धुन बजाते रहे। इंद्र के सारे बादल खाली हो गए और उसका घमंड चूर-चूर हो गया। इंद्र ने ऐरावत हाथी से उतरकर कृष्ण के चरणों में गिरकर क्षमा मांगी।`
      }
    ]
  },
  {
    id: 'hanuman-sanjeevani',
    title: 'Lord Hanuman: The Solar Leap & Mount Sanjeevani',
    hindiTitle: 'बजरंगबली हनुमान: सूर्य निगलना और संजीवनी पर्वत',
    subtitle: 'From mistaking the rising sun for a sweet golden mango to flying across oceans with a healing mountain.',
    hindiSubtitle: 'बचपन में सूर्य को मीठा फल समझकर निगलने वाले मारुतिनंदन का संजीवनी बूटी लेकर लंका पहुंचना',
    author: 'गोस्वामी तुलसीदास (Goswami Tulsidas)',
    authorTitle: 'रामचरितमानस व हनुमान चालीसा के अमर रचयिता',
    coverImage: '/src/assets/images/hanuman_sanjeevani_1790509759635.jpg',
    tags: ['देवी-देवता', 'Hanuman', 'Ramayana', 'Courage & Devotion', 'Spiritual'],
    genre: 'Folklore & Mythology',
    ageBracket: 'all-ages',
    ageCategory: 'all_ages',
    musicPreset: 'shankh_aarti',
    targetAgeLabel: '14+ व सभी उम्र • All Ages',
    readingMinutes: 6,
    wordCount: 1100,
    lexile: '640L',
    rating: 4.99,
    reviewCount: 4950,
    synopsis: 'As a baby, Maruti leaped into the heavens thinking the crimson sunrise was a ripe fruit. Centuries later on the battlefield of Lanka, when Lakshmana lay unconscious, Hanuman flew to the Himalayas, uprooted the glowing Dronagiri peak, and delivered life.',
    hindiSynopsis: 'बालपन में उगते हुए सूर्य को लाल फल समझकर मुख में रख लेने वाले पवनपुत्र हनुमान ने जब लंका के युद्ध में लक्ष्मण को मूर्छित देखा, तो रातभर में हिमालय से पूरा द्रोणागिरि संजीवनी पर्वत ही अपनी हथेली पर उठाकर ले आए।',
    moral: 'Unshakable devotion, selfless service, and humble courage make the impossible possible.',
    hindiMoral: 'सीख: प्रभु-भक्ति और निस्वार्थ सेवा से असंभव कार्य भी संभव हो जाते हैं। शक्ति के साथ विनम्रता ही सच्ची वीरता है।',
    format: 'audio',
    audioNarration: {
      narrator: 'सुदर्शन दास शैली (Classical Ramayana Voice)',
      durationMinutes: 9,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['निस्वार्थ सेवा (Selfless Duty)', 'असीम साहस (Boundless Valour)', 'भक्ति का तेज (Radiance of Bhakti)'],
    chapters: [
      {
        id: 'hanuman-ch-1',
        number: 1,
        title: 'The Infant who Leaped for the Sun',
        hindiTitle: 'बाल हनुमान और सूर्य देव की छलांग',
        wordCount: 520,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/hanuman_sanjeevani_1790509759635.jpg',
        imageCaption: 'Lord Hanuman flying through celestial skies holding the divine medicinal mountain',
        hindiImageCaption: 'हाथ में गदा और हथेली पर द्रोणागिरि संजीवनी पर्वत लिए आकाश मार्ग से उड़ते वीर हनुमान',
        content: `Upon the sunrise peaks of Kishkindha, the infant monkey prince Maruti awoke feeling famished. Through the morning clouds, he beheld a giant, glowing orb of brilliant orange.
        
"Ah, what a luscious ripe mango!" cried little Maruti. Gathering the wind into his lungs, the divine child kicked the mountain peaks and launched himself into the cosmos!
        
Even Rahu and Indra retreated before the fiery toddler. When Indra struck Maruti with his thunderbolt (Vajra), Lord Vayu withdrew the air of the universe until all devas begged for forgiveness, blessing Maruti with immortality, supreme strength, and the sacred name 'Hanuman'.`,
        hindiContent: `किष्किंधा के जंगलों में माता अंजना के नन्हे बालक मारुति सोकर उठे तो उन्हें बहुत तेज भूख लगी। आसमान में देखा तो लाल-लाल चमकता हुआ गोल सूरज निकल रहा था।
        
नन्हे हनुमान ने सोचा—'अरे वाह! कितना मीठा और रसीला लाल फल है!' उन्होंने एक ही छलांग में धरती से आसमान की ओर उड़ान भर दी और सूरज को अपने मुंह में दबा लिया।
        
चारों ओर अंधेरा छा गया। देवराज इंद्र ने घबराकर अपने वज्र से वार किया जिससे बालक की ठोड़ी (हनु) पर चोट लगी। पवन देव ने क्रोध में आकर संसार की सांस रोक ली। तब ब्रह्मा जी समेत सभी देवताओं ने बालक को वरदान दिए और उन्हें 'हनुमान' नाम दिया।`
      },
      {
        id: 'hanuman-ch-2',
        number: 2,
        title: 'The Golden Mountain in the Night Sky',
        hindiTitle: 'द्रोणागिरि पर्वत और लक्ष्मण के प्राण',
        wordCount: 580,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/hanuman_sanjeevani_1790509759635.jpg',
        imageCaption: 'The glowing Sanjeevani mountain balanced upon Hanuman palm across the stars',
        hindiImageCaption: 'तारों भरे आकाश में चमकते संजीवनी पर्वत को लेकर लंका की ओर वेग से उड़ते पवनपुत्र',
        content: `Centuries later, during the epic war in Lanka, prince Lakshmana was pierced by Meghnad’s mystical spear (Shakti Baan). As the royal physician Sushena examined him, he wept: "Only the glowing Sanjeevani herb from the Dronagiri peak in the northern Himalayas can revive him before sunrise!"
        
Hanuman took flight across India at lightning speed. Reaching the snowbound Himalayan mountain, he saw millions of glowing plants. But which one was Sanjeevani?
        
"I cannot waste time in doubt," roared Hanuman. "I shall bring the entire mountain!" Expanding his form to cosmic size, he severed Mount Dronagiri from its base and balanced the glittering mountain upon his palm, flying through the stars back to Lanka just as the dawn light kissed the horizon. Lakshmana breathed and arose, shouting "Jai Shri Ram!"`,
        hindiContent: `लंका के युद्ध में मेघनाद के शक्ति बाण से लक्ष्मण जी मूर्छित हो गए। लंका के वैद्य सुषेण ने कहा: 'यदि सूर्य निकलने से पहले हिमालय के द्रोणागिरि पर्वत से संजीवनी बूटी नहीं आई, तो लक्ष्मण के प्राण नहीं बचेंगे!'
        
हनुमान जी पवन वेग से उड़े और कुछ ही पलों में हजारों मील दूर हिमालय पहुंच गए। पर्वत पर लाखों वनस्पतियां चमक रही थीं। हनुमान जी पहचान नहीं पाए कि संजीवनी कौन सी है।
        
समय बहुत कम था। हनुमान जी ने सोचा: 'अगर पहचानने में समय गंवाया तो देर हो जाएगी।' उन्होंने 'जय श्री राम' का उद्घोष किया और अपनी हथेली पर पूरा द्रोणागिरि पर्वत ही उखाड़ कर रख लिया! रात के आकाश में उड़ता हुआ चमकीला पर्वत देखकर लंकावासी दंग रह गए। सूर्योदय से पहले बूटी आ गई और लक्ष्मण जी उठ खड़े हुए।`
      }
    ]
  },
  {
    id: 'durga-mahishasura',
    title: 'Maa Durga: The Slaying of Mahishasura',
    hindiTitle: 'माँ दुर्गा: महिषासुर मर्दिनी और दिव्य शक्ति का अवतार',
    subtitle: 'When the buffalo demon thought no power could vanquish him, the mother of the cosmos manifested.',
    hindiSubtitle: 'वरदान के घमंड में चूर महिषासुर का वध करने के लिए प्रकट हुईं दशभुजा सिंहवाहिनी भगवती दुर्गा',
    author: 'श्री दुर्गा सप्तशती (Markandeya Purana)',
    authorTitle: 'प्राचीन शाक्त परंपरा व मार्कण्डेय पुराण',
    coverImage: '/src/assets/images/durga_mahishasura_1790509771985.jpg',
    tags: ['देवी-देवता', 'Maa Durga', 'Navratri', 'Divine Feminine', 'Victory of Good'],
    genre: 'Folklore & Mythology',
    ageBracket: 'all-ages',
    ageCategory: 'all_ages',
    musicPreset: 'shankh_aarti',
    targetAgeLabel: '14+ व सभी उम्र • All Ages',
    readingMinutes: 6,
    wordCount: 1050,
    lexile: '660L',
    rating: 4.99,
    reviewCount: 4620,
    synopsis: 'The buffalo demon Mahishasura held a boon that no man, beast, or god could kill him. Blinded by pride, he drove the devas from heaven. In their desperation, the radiance of all deities united to form the ten-armed Mother Durga riding a golden lion.',
    hindiSynopsis: 'महिषासुर को वरदान था कि कोई भी पुरुष या देवता उसे मार नहीं सकता। इस अहंकार में उसने स्वर्ग पर कब्जा कर लिया। तब त्रिदेवों और समस्त देवताओं के तेज से दस भुजाओं वाली माँ दुर्गा प्रकट हुईं जिन्होंने अपने त्रिशूल से अधर्म का अंत किया।',
    moral: 'Righteous divine energy transcends all limits to restore balance whenever oppression peaks.',
    hindiMoral: 'सीख: जब अहंकार और अत्याचार की सीमाएं लांघ जाती हैं, तब नारी शक्ति और सत्य का वह तेज प्रकट होता है जिसके आगे काल भी नतमस्तक हो जाता है।',
    format: 'audio',
    audioNarration: {
      narrator: 'शास्त्रीय दुर्गा स्तुति (Sacred Stotram Style)',
      durationMinutes: 8,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['नारी शक्ति (Divine Feminine)', 'अधर्म पर विजय (Victory of Dharma)', 'साहस (Fearlessness)'],
    chapters: [
      {
        id: 'durga-ch-1',
        number: 1,
        title: 'The Unchecked Tyranny of the Buffalo King',
        hindiTitle: 'महिषासुर का आतंक और देवताओं का हाहाकार',
        wordCount: 500,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/durga_mahishasura_1790509771985.jpg',
        imageCaption: 'Maa Durga manifesting with ten celestial weapons riding the golden lion',
        hindiImageCaption: 'दस भुजाओं में दिव्य अस्त्र धारण कर सिंह पर सवार महिषासुर मर्दिनी माँ भगवती',
        content: `The demon king Mahishasura performed fierce penance for ten thousand years. When Lord Brahma appeared, Mahishasura asked for immortality. Brahma replied: "All who are born must perish. Ask for another boon."
        
Sneering with contempt, Mahishasura thought: 'Women are soft and weak; they cannot harm a warrior.' So he demanded: "Let me be slain only by a woman's hand, and no god or man may defeat me."
        
With the boon secured, Mahishasura became unstoppable. He chased Indra from Amaravati, silenced the wind, and proclaimed himself the sole ruler of creation. The devas wandered the earth as beggars in disguise.`,
        hindiContent: `राक्षस महिषासुर ने हजारों वर्षों तक ब्रह्मा जी की घोर तपस्या की। जब ब्रह्मा जी प्रकट हुए तो महिषासुर ने अमर होने का वरदान मांगा। ब्रह्मा जी ने कहा: 'जो जन्मा है, उसकी मृत्यु निश्चित है। कुछ और मांगो।'
        
महिषासुर ने घमंड में सोचा कि कोई स्त्री तो अबला होती है, वह मेरा क्या बिगाड़ सकेगी! उसने वरदान मांगा: 'मेरी मृत्यु केवल किसी स्त्री के हाथ से हो, कोई भी देवता, दानव या पुरुष मुझे न मार सके।'
        
वरदान पाते ही महिषासुर अहंकारी हो गया। उसने स्वर्ग पर हमला कर देवताओं को भगा दिया और स्वयं को तीनों लोकों का स्वामी घोषित कर दिया। देवता दर-दर भटकने लगे।`
      },
      {
        id: 'durga-ch-2',
        number: 2,
        title: 'The Lion-Rider with Ten Weapons',
        hindiTitle: 'सिंहवाहिनी दुर्गा का प्राकट्य और महिषासुर वध',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/durga_mahishasura_1790509771985.jpg',
        imageCaption: 'The golden Trishul piercing the evil demon as heavens rejoice',
        hindiImageCaption: 'त्रिशूल के प्रहार से महिषासुर का संहार कर धर्म की पुनः स्थापना करती माँ दुर्गा',
        content: `When Brahma, Vishnu, and Shiva heard of heaven’s fall, their righteous anger flared into blinding golden flame. From the fiery confluence of all gods emerged a magnificent goddess whose beauty dazzled the cosmos: Mother Durga.
        
Shiva gave her his Trident, Vishnu his Sudarshana Chakra, Varuna his Conch, Agni his Spear, and the Mountain Himavat gifted her a mighty roaring golden lion.
        
Armed with ten weapons in ten hands, Maa Durga let out a celestial roar that shook the Himalayas. Mahishasura changed into a buffalo, an elephant, and a swordsman, but before the Mother's flashing trident, his illusions shattered. Pierce through the heart, darkness dissolved, and the heavens rained fragrant jasmine blossoms, chanting: *Aigiri Nandini Nanditha Medini!*`,
        hindiContent: `देवताओं की दुर्दशा देखकर भगवान शिव, विष्णु और ब्रह्मा जी के मुख से एक दिव्य तेज निकला। उस महातेज से एक परम सुंदरी, दस भुजाओं वाली देवी प्रकट हुईं—माँ दुर्गा!
        
भगवान शिव ने उन्हें अपना त्रिशूल दिया, विष्णु जी ने सुदर्शन चक्र दिया, इंद्र ने वज्र दिया और पर्वतराज हिमालय ने सवारी के लिए गर्जना करता हुआ सिंह भेंट किया।
        
माँ दुर्गा ने जब सिंह पर सवार होकर शंखनाद किया, तो पूरी धरती और आकाश गूंज उठा। महिषासुर ने कभी भैंसे का, कभी हाथी का रूप बदलकर युद्ध किया। लेकिन माँ दुर्गा के त्रिशूल और चक्र के आगे उसकी एक न चली। माँ ने महिषासुर का वध कर तीनों लोकों को भयमुक्त कर दिया। स्वर्ग से देवताओं ने पुष्प बरसाए और माँ दुर्गा की जय-जयकार की।`
      }
    ]
  },
  {
    id: 'ganesha-pradakshina',
    title: 'Lord Ganesha: The Sacred Cosmic Circumambulation',
    hindiTitle: 'भगवान गणेश: माता-पिता की परिक्रमा और ब्रह्मांड का सत्य',
    subtitle: 'While Kartikeya flew across continents on his peacock, wise Ganesha discovered the universe at home.',
    hindiSubtitle: 'कार्तिकेय ने मोर पर उड़कर धरती नापी, पर बुद्धि के दाता गजानन ने माता-पिता के चरणों में पाया ब्रह्मांड',
    author: 'शिव पुराण (Shiva Purana)',
    authorTitle: 'प्राचीन अठारह महापुराणों में से एक',
    coverImage: '/src/assets/images/ganesha_wisdom_1790509783483.jpg',
    tags: ['देवी-देवता', 'Lord Ganesha', 'Wisdom', 'Family & Respect', 'Moral Story', 'Kids Special'],
    genre: 'Folklore & Mythology',
    ageBracket: 'little-dreamers',
    ageCategory: 'kids_3_7',
    musicPreset: 'temple',
    targetAgeLabel: '3-7 वर्ष (छोटे बच्चे) • Kids (Ages 3-7)',
    readingMinutes: 4,
    wordCount: 820,
    lexile: '510L',
    rating: 4.97,
    reviewCount: 3120,
    synopsis: 'When sage Narada brings a divine fruit of supreme wisdom to Kailash, Shiva and Parvati declare a race: whoever circles the entire universe first shall receive it. Kartikeya flies across galaxies, while Ganesha quietly walks around his parents.',
    hindiSynopsis: 'देवर्षि नारद कैलाश पर ज्ञान का एक चमत्कारी फल लेकर आए। शर्त रखी गई कि जो सबसे पहले पूरे ब्रह्मांड की परिक्रमा करके लौटेगा, फल उसी को मिलेगा। कार्तिकेय मोर पर सवार होकर उड़ गए, पर बुद्धिमान गणेश जी ने माता पार्वती और शिव जी के चक्कर लगा लिए!',
    moral: 'True wisdom and all the holy pilgrimages of the cosmos reside in loving and respecting your parents.',
    hindiMoral: 'सीख: माता-पिता के चरणों में ही संपूर्ण तीर्थ और ब्रह्मांड का वास है। बुद्धि का सही उपयोग ही सबसे बड़ी शक्ति है।',
    format: 'audio',
    audioNarration: {
      narrator: 'बाल कथाकार (Storyteller for Kids)',
      durationMinutes: 6,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['माता-पिता का सम्मान (Respect for Parents)', 'बुद्धि और विवेक (True Wisdom)', 'सच्ची भक्ति (True Devotion)'],
    chapters: [
      {
        id: 'ganesha-ch-1',
        number: 1,
        title: 'The Golden Mango of Kailash',
        hindiTitle: 'कैलाश का दिव्य फल और परिक्रमा की शर्त',
        wordCount: 400,
        readingMinutes: 2,
        isUnlocked: true,
        image: '/src/assets/images/ganesha_wisdom_1790509783483.jpg',
        imageCaption: 'Sage Narada bringing the celestial mango of supreme wisdom to Mount Kailash',
        hindiImageCaption: 'कैलाश पर ज्ञान का दिव्य फल लेकर पहुंचे देवर्षि नारद और परिक्रमा की शर्त',
        content: `One pleasant morning on Mount Kailash, sage Narada arrived holding a radiant golden mango. "This is the fruit of supreme cosmic wisdom," Narada bowed. "It cannot be sliced; only one child may enjoy it whole."
        
Both young brothers—Kartikeya, the fiery commander of celestial armies, and chubby, elephant-headed Ganesha—desired the sweet fruit.
        
Lord Shiva smiled: "Whoever circles the entire universe three times and returns first shall be crowned the victor and receive the fruit!"
        
In an instant, Kartikeya mounted his swift peacock Paravani and shot across oceans, mountain ranges, and starry constellations like a streak of lightning.`,
        hindiContent: `एक दिन कैलाश पर्वत पर देवर्षि नारद हाथ में सोने जैसा चमकता हुआ एक आम लेकर पहुंचे। नारद जी बोले: 'महादेव! यह ज्ञान का दिव्य फल है। इसे काटकर नहीं खाया जा सकता, जो इसका पूरा रस पिएगा वही तीनों लोकों में पूज्य होगा।'
        
दोनों भाई—तेजस्वी कार्तिकेय और नन्हे गजानन गणेश, दोनों फल पाने की जिद करने लगे।
        
भगवान शिव ने मुस्कुराकर कहा: 'तुम दोनों में से जो भी पूरे ब्रह्मांड के तीन चक्कर सबसे पहले लगाकर वापस आएगा, यह फल उसी को मिलेगा!'
        
यह सुनते ही कार्तिकेय अपने फुर्तीले मोर पर सवार हुए और बिजली की गति से ब्रह्मांड की परिक्रमा करने उड़ गए।`
      },
      {
        id: 'ganesha-ch-2',
        number: 2,
        title: 'The Universe at Shiva-Parvati’s Feet',
        hindiTitle: 'माता-पिता के तीन चक्कर और विजय',
        wordCount: 420,
        readingMinutes: 2,
        isUnlocked: true,
        image: '/src/assets/images/ganesha_wisdom_1790509783483.jpg',
        imageCaption: 'Lord Ganesha walking around Lord Shiva and Mother Parvati with devotion',
        hindiImageCaption: 'माता पार्वती और भगवान शिव की परिक्रमा कर ब्रह्मांड का सत्य समझाते बुद्धिदाता गणेश जी',
        content: `Ganesha looked at his humble vehicle, the tiny mouse Mushaka. He knew his little mouse could never outpace a peacock soaring through nebulae.
        
Instead of feeling defeated, Ganesha folded his hands and bowed deeply before Lord Shiva and Mother Parvati. With slow, reverent footsteps, Ganesha walked three times around his parents, chanting sacred mantras.
        
"My son," Shiva asked, "Why do you circle us instead of the universe?"
        
Ganesha replied with glistening eyes: "The Vedas declare that one’s parents are the source, sustenance, and sanctuary of all creation. In circling you, I have circled all sacred rivers, all galaxies, and the supreme cosmos!"
        
Tears of joy welled in Parvati’s eyes. Lord Shiva handed the golden fruit to Ganesha, declaring that in every sacred ceremony on earth, Lord Ganesha would be worshipped first before all other gods (Pratham Pujya).`,
        hindiContent: `गणेश जी का वाहन तो एक नन्हा मूषक (चूहा) था। वह जानते थे कि चूहा कभी मोर की गति की बराबरी नहीं कर सकता।
        
लेकिन गणेश जी घबराए नहीं। उन्होंने हाथ जोड़े और अपने माता-पिता—भगवान शिव और माता पार्वती को एक आसन पर बैठने का निवेदन किया। फिर गणेश जी ने श्रद्धापूर्वक तीन बार उनकी परिक्रमा की और उनके चरणों में शीश नवाया।
        
शिव जी ने पूछा: 'बेटा गणेश! तुम ब्रह्मांड की परिक्रमा करने क्यों नहीं गए?'
        
गणेश जी ने हाथ जोड़कर कहा: 'पिताजी! वेदों और शास्त्रों में लिखा है कि माता-पिता के चरणों में ही समस्त ब्रह्मांड, सारे तीर्थ और संपूर्ण सृष्टि समाई हुई है। आपकी परिक्रमा करने से मेरी ब्रह्मांड की परिक्रमा पूरी हो गई!'
        
माता पार्वती ने प्रेम से गणेश जी को गले से लगा लिया। शिव जी ने वह फल गणेश जी को दिया और वरदान दिया कि संसार के हर शुभ कार्य में सबसे पहले गणेश जी की ही पूजा होगी (प्रथम पूज्य)।`
      }
    ]
  },
  {
    id: 'peepal-chudail',
    title: 'The Chudail of the Peepal Tree & The Inverted Feet',
    hindiTitle: 'पीपल के पेड़ की चुड़ैल और उल्टे पैर की दास्तान',
    subtitle: 'The midnight traveler at the crossroads, the white saree, and the secret hidden beneath the hem.',
    hindiSubtitle: 'चौराहे के पुराने पीपल पर रात बारह बजे की आहट — उल्टे पैर की पहचान और लोहे का रक्षा-कवच',
    author: 'भारतीय लोकगाथा (Indian Ghost Folklore)',
    authorTitle: 'अवध व ब्रज की रहस्यमयी ग्रामीण कथाएं',
    coverImage: '/src/assets/images/ghost_peepal_tree_1790508992567.jpg',
    tags: ['भूत-प्रेत', 'Chudail', 'Indian Folklore', 'Supernatural', 'Village Horror', 'Spooky'],
    genre: 'Folklore & Mythology',
    ageBracket: 'young-adult',
    ageCategory: 'all_ages',
    musicPreset: 'spooky_night',
    targetAgeLabel: 'Ages 12+ • Spooky Folklore',
    readingMinutes: 6,
    wordCount: 1100,
    lexile: '690L',
    rating: 4.96,
    reviewCount: 2980,
    synopsis: 'At the desolate village crossroads stands an ancient peepal tree whispered to house a Chudail. When bullock cart driver Madhav returns late on a moonless night, a weeping woman in pristine white asks for a ride. But the flickering lantern reveals her feet pointing backwards.',
    hindiSynopsis: 'गांव के बाहर वीरान चौराहे पर एक सैकड़ों साल पुराना पीपल का पेड़ था जहाँ रात के समय चुड़ैल का साया मंडराता था। एक रात जब बैलगाड़ी वाला माधव उस रास्ते से गुजरा, तो सफेद साड़ी पहने एक युवती ने लिफ्ट मांगी। लालटेन की रोशनी जैसे ही नीचे पड़ी, माधव के होश उड़ गए—युवती के पंजे उल्टी दिशा में मुड़े हुए थे!',
    moral: 'Do not be blinded by deceptive illusions. Presence of mind, courage, and iron resolve break any phantom spell.',
    hindiMoral: 'सीख: बाहरी सुंदरता और दिखावे के धोखे में नहीं आना चाहिए। संकट के समय होश न खोएं, विवेक और साहस से बड़ी से बड़ी विपत्ति टल जाती है।',
    format: 'text',
    audioNarration: {
      narrator: 'रहस्यमयी रेडियो शैली (Ghost Story Narrator)',
      durationMinutes: 8,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['रहस्य व भय (Supernatural Mystery)', 'उल्टे पैर (Inverted Feet Lore)', 'साहस की परीक्षा (Courage)'],
    chapters: [
      {
        id: 'chudail-ch-1',
        number: 1,
        title: 'The Woman in the White Saree',
        hindiTitle: 'चौराहे पर सफेद साड़ी वाली परछाई',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/ghost_peepal_tree_1790508992567.jpg',
        imageCaption: 'The ancient twisted Peepal tree bathed in eerie moonlight along the deserted village road',
        hindiImageCaption: 'गांव के वीरान तिराहे पर चांदनी रात में खड़ा प्राचीन पीपल का रहस्यमयी पेड़',
        content: `The night was thick as soot. Madhav whipped the reins of his two bullocks as his wooden cart rattled along the dusty unpaved road near Sultanpur village. The clock of the railway station had struck midnight an hour ago.
        
As the cart neared the colossal peepal tree known across three tehsils as the haunt of spirits, the bullocks suddenly stopped, snorting in panic and digging their hooves into the dirt.
        
Beneath the sprawling aerial roots sat a solitary maiden wrapped in an immaculate white cotton saree. Her face was youthful and sorrowful, and her voice sounded sweet like silver bells: "Bhaiya, my cart broke down near the canal. Please let me sit behind your straw bags until the town gate."
        
Madhav felt pity. "Climb aboard, sister," he said, turning back to adjust his brass lantern.`,
        hindiContent: `अमावस्या की रात थी और चारों तरफ घना सन्नाटा पसरा हुआ था। माधव अपनी बैलगाड़ी लेकर सुल्तानपुर के कच्चे रास्ते से गुजर रहा था। दूर रेलवे स्टेशन की घड़ी में रात के बारह बज चुके थे।
        
जैसे ही बैलगाड़ी उस पुराने, विशाल पीपल के पेड़ के पास पहुंची, दोनों बैल अचानक रुक गए और बुरी तरह हांफने लगे। उनके खुर जमीन पर जम गए।
        
पीपल की लटकती जटाओं के नीचे एक युवती सफेद साड़ी पहने अकेली बैठी रो रही थी। उसने बड़ी मीठी आवाज़ में कहा: 'भैया! मेरी गाड़ी नहर के पास टूट गई है। मुझे आगे गांव तक छोड़ दोगे?'
        
माधव को उस पर तरस आ गया। उसने कहा: 'आ जाओ बहन, पीछे बैठ जाओ।' माधव ने अपनी पीतल की लालटेन उठाई ताकि उसे रास्ता दिखा सके।`
      },
      {
        id: 'chudail-ch-2',
        number: 2,
        title: 'The Inverted Feet and the Iron Blade',
        hindiTitle: 'उल्टे पैर का रहस्य और लोहे का वार',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        content: `As the maiden lifted her hem to step upon the cart rung, the lantern's yellow light fell upon the dusty ground.
        
A chill shot straight through Madhav’s spine like liquid ice. Her feet were completely backwards! The heels pointed forward, and the ten long toes twisted in reverse toward the tree trunk! It was a Chudail—the tree spirit that entraps nighttime wanderers.
        
Madhav remembered the golden rule taught by his grandfather: *Spirits fear iron and sacred memory.* He did not scream or run. With a steady hand, he reached into his waist cloth and gripped his iron sickle used for harvesting sugarcane.
        
He turned and brandished the cold iron blade right before her glowing eyes, chanting the Hanuman Chalisa at the top of his lungs! A bloodcurdling hiss echoed through the branches. The maiden's form dissolved into a gust of dry leaves and black mist that swirled back into the crown of the peepal tree. Madhav whipped the bullocks and reached the temple safely, his heart pounding in victory.`,
        hindiContent: `जैसे ही उस युवती ने गाड़ी पर चढ़ने के लिए अपनी साड़ी थोड़ी ऊपर उठाई, लालटेन की रोशनी सीधे उसके पैरों पर पड़ी।
        
माधव के रोंगटे खड़े हो गए और खून जम गया! उसके दोनों पैर बिल्कुल उल्टे थे—एड़ियां आगे की तरफ और दसों उंगलियां पीछे पेड़ की तरफ मुड़ी हुई थीं! वह कोई साधारण स्त्री नहीं, बल्कि पीपल पर रहने वाली 'चुड़ैल' थी।
        
माधव को अपने दादाजी की बात याद आई: 'भूत-प्रेत लोहे और प्रभु नाम से कांपते हैं।' माधव घबराया नहीं। उसने बिना चिल्लाए अपनी धोती की फेंट से गन्ने काटने वाली लोहे की दरांती (हंसिया) निकाली।
        
माधव ने लोहे की धार उसके सामने चमकाई और जोर-जोर से 'हनुमान चालीसा' का पाठ शुरू कर दिया! एक डरावनी चीख गूंजी और वह स्त्री देखते ही देखते काले धुएं और सूखे पत्तों के बवंडर में बदल कर पीपल के तने में समा गई। माधव ने बैलों को दौड़ाया और सीधे गांव के मंदिर पहुंच कर ही दम लिया।`
      }
    ]
  },
  {
    id: 'amavasya-dayan',
    title: 'The Amavasya Dayan & The Mustard Seed Charm',
    hindiTitle: 'अमावस्या की डायन और काली सरसों का रक्षा-सूत्र',
    subtitle: 'The shadow that walked without a body and the earthen pot buried beneath the well.',
    hindiSubtitle: 'गांव के पुराने कुएं के पास डायन की काली नजर और दादी मां के भस्म व सरसों के दाने',
    author: 'ग्रामीण लोकगाथा (Folk Tale of Bengal & Bihar)',
    authorTitle: 'पूर्वी भारत की रहस्यमयी लोककथा',
    coverImage: '/src/assets/images/dayan_dark_haveli_1790509811017.jpg',
    tags: ['भूत-प्रेत', 'Dayan', 'Indian Folklore', 'Occult & Mystery', 'Spooky'],
    genre: 'Folklore & Mythology',
    ageBracket: 'young-adult',
    ageCategory: 'all_ages',
    musicPreset: 'spooky_night',
    targetAgeLabel: 'Ages 12+ • Mystery & Folk Lore',
    readingMinutes: 6,
    wordCount: 1050,
    lexile: '670L',
    rating: 4.95,
    reviewCount: 2640,
    synopsis: 'In a remote riverside hamlet, cattle fell sick and shadows stretched unnaturally on new moon nights. Old grandma Dadi Janki knew it was the work of a Dayan who harvested life-forces into clay jars. Armed with sanctified black mustard seeds, holy river water, and courage, she confronted the shadow.',
    hindiSynopsis: 'नदी किनारे बसे गांव में हर अमावस्या को अजीबोगरीब घटनाएं घटती थीं। जानवरों का दूध सूख जाता और परछाइयां उल्टी नाचती थीं। दादी जानकी समझ गईं कि यह डायन का जादू है जो मिट्टी के मटके में आत्माएं कैद करती है। दादी ने काली सरसों और गंगाजल से उस काली छाया को बेनकाब किया।',
    moral: 'Superstition and fear thrive in silence. Purity of intention, faith, and fearless truth dispel dark enchantments.',
    hindiMoral: 'सीख: डर और अंधविश्वास का साया तभी तक रहता है जब तक इंसान चुप रहे। सत्य, पवित्र आचरण और साहस के आगे कोई काली शक्ति नहीं टिक सकती।',
    format: 'text',
    audioNarration: {
      narrator: 'रेडियो रहस्य शैली (Radio Mystery Voice)',
      durationMinutes: 8,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['डायन का रहस्य (Dayan Lore)', 'सरसों का रक्षा सूत्र (Protective Charm)', 'साहस (Courage)'],
    chapters: [
      {
        id: 'dayan-ch-1',
        number: 1,
        title: 'The Stolen Shadows by the Dry Well',
        hindiTitle: 'सूखे कुएं पर गायब होती परछाइयां',
        wordCount: 500,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/dayan_dark_haveli_1790509811017.jpg',
        imageCaption: 'The spooky ruined haveli and old stepwell on a moonless Amavasya night',
        hindiImageCaption: 'अमावस्या की अंधेरी रात में पुराने खंडहर और बावड़ी के पास मंडराती रहस्यमयी डायन',
        content: `No child in the village of Rampur dared venture toward the abandoned stepwell after dusk on Amavasya. It was whispered that a Dayan—a practitioner of dark midnight crafts—dwelled among the cracked clay bricks.
        
She did not attack with claws or fangs; she stole shadows. If her piercing red gaze fell upon your silhouette, your shadow would detach, glide into her black earthen pitcher, and you would fall into an unending fever.
        
When little Ramesh fell ill after returning from the mango grove, his shadow was indeed missing from the lantern wall!`,
        hindiContent: `रामपुर गांव में अमावस्या की रात कोई बच्चा घर से बाहर नहीं निकलता था। गांव के पुराने सूखे कुएं के पास डायन का डेरा माना जाता था।
        
कहा जाता था कि डायन किसी को छूती नहीं थी, बल्कि इंसान की परछाई चुरा लेती थी। उसकी लाल आंखें जिसकी परछाई पर पड़ जातीं, वह परछाई उसके काले मटके में खिंच जाती और वह व्यक्ति बिस्तर पकड़ लेता था।
        
जब छोटा रमेश बाग से लौटा तो वह तेज बुखार में तपने लगा। लालटेन जलाई गई तो देखा कि दीवार पर रमेश की कोई परछाई नहीं बन रही थी!`
      },
      {
        id: 'dayan-ch-2',
        number: 2,
        title: 'The Circle of Black Mustard Seeds',
        hindiTitle: 'काली सरसों का घेरा और मटके का टूटना',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/dayan_dark_haveli_1790509811017.jpg',
        imageCaption: 'Dadi Janki shattering the black earthen pitcher with courage and faith',
        hindiImageCaption: 'काली सरसों और गंगाजल से तिलिस्म तोड़कर आत्माओं को मुक्त कराती दादी जानकी',
        content: `Eighty-year-old Dadi Janki refused to surrender to terror. She took a pouch of consecrated black mustard seeds (राई), smeared holy ash from the temple havan across her forehead, and walked steadily toward the stepwell.
        
A freezing gale began howling. From the well's darkness rose a tall silhouette with hair wild like storm clouds and eyes burning like embers. "Turn back, old woman, or your shadow is mine!" hissed the Dayan.
        
Dadi Janki stood firm as a rock. "Evil has no dominion over truth!" she cried, flinging the black mustard seeds in a sacred circle around the well while sprinkling drops of Gangajal.
        
The seeds popped like firecrackers of white light. Unable to step over the holy mustard perimeter, the Dayan shrieked in agony. Dadi smashed the clay jar with her walking stick; a hundred trapped shadows rushed out like radiant butterflies, returning to their rightful sleepers. With her power broken, the entity vanished into the dark, never to return.`,
        hindiContent: `अस्सी साल की दादी जानकी ज़रा भी नहीं डरीं। उन्होंने मंदिर के हवन की भस्म अपने माथे पर लगाई और एक पोटली में अभिमंत्रित काली सरसों (राई) और गंगाजल लेकर सीधे कुएं की ओर चल पड़ीं।
        
कुएं से बर्फीली हवाएं चलने लगीं। अंधेरे में से बिखरे बालों वाली एक लंबी काली परछाई निकली जिसकी आंखें अंगारों की तरह दहक रही थीं: 'बुढ़िया, लौट जा नहीं तो तेरी भी परछाई छीन लूंगी!'
        
दादी जानकी चट्टान की तरह खड़ी रहीं: 'अधर्म कभी सत्य को नहीं जीत सकता!' दादी ने जोर से 'ॐ नमः शिवाय' बोलते हुए कुएं के चारों ओर काली सरसों का घेरा बना दिया और गंगाजल छिड़क दिया।
        
सरसों के दाने चटाचट चिंगारियों की तरह फूटने लगे। पवित्र घेरे को पार न कर पाने के कारण डायन तड़पने लगी। दादी ने अपनी लाठी से जमीन पर रखा काला मटका फोड़ दिया। मटका फूटते ही सैकड़ों परछाइयां तितलियों की तरह उड़कर अपने-अपने घरों को लौट गईं। डायन का तिलिस्म हमेशा के लिए टूट गया।`
      }
    ]
  },
  {
    id: 'shmashan-pishaach',
    title: 'The Cemetery Pishaach & The Fearless Monk',
    hindiTitle: 'श्मशान का पिशाच और निडर अघोरी साधु',
    subtitle: 'The flesh-eating night spirit bound to burning embers, and the secret mantra that granted liberation.',
    hindiSubtitle: 'चिता के अंगारों पर भटकने वाला भयंकर पिशाच और ज्ञानी साधु द्वारा दिया गया मुक्ति का मार्ग',
    author: 'प्राचीन तंत्र-कथा (Ancient Indian Mystery Tale)',
    authorTitle: 'काशी व उज्जैन की पौराणिक रहस्य गाथा',
    coverImage: '/src/assets/images/pishaach_burning_ghat_1790509825115.jpg',
    tags: ['भूत-प्रेत', 'Pishaach', 'Spooky', 'Supernatural', 'Spirit Liberation'],
    genre: 'Folklore & Mythology',
    ageBracket: 'young-adult',
    ageCategory: 'all_ages',
    musicPreset: 'spooky_night',
    targetAgeLabel: 'Ages 14+ • Supernatural Classic',
    readingMinutes: 6,
    wordCount: 1100,
    lexile: '700L',
    rating: 4.97,
    reviewCount: 2410,
    synopsis: 'A terrifying nocturnal entity known as a Pishaach roamed the burning grounds of the riverbank, feeding on discarded offerings and terrifying passersby. A wandering monk with deep inner serenity sat before the creature, understanding its eternal hunger and showing it the path to peace.',
    hindiSynopsis: 'नदी किनारे श्मशान घाट पर एक खूंखार पिशाच रहता था जो रात के अंधेरे में आने-जाने वालों को डराता था। एक शांत चित्त साधु जब वहां पहुंचे, तो पिशाच ने उन्हें डराने की कोशिश की। साधु ने बिना डरे उसकी पीड़ा को समझा और पवित्र मंत्र से उसकी अतृप्त आत्मा को मुक्ति दिलाई।',
    moral: 'Monsters are often souls tormented by unresolved greed and anger. Pure compassion and fearlessness liberate all suffering.',
    hindiMoral: 'सीख: क्रोध और वासना ही आत्मा को भटकाकर पिशाच बनाती है। भय से नहीं, बल्कि आत्मबल, दया और ज्ञान से ही अंधकार को प्रकाश में बदला जा सकता है।',
    format: 'text',
    audioNarration: {
      narrator: 'काशी के कथावाचक (Kashi Temple Voice)',
      durationMinutes: 8,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['पिशाच की मुक्ति (Pishaach Liberation)', 'मृत्यु का सत्य (Truth of Mortality)', 'साहस (Fearlessness)'],
    chapters: [
      {
        id: 'pishaach-ch-1',
        number: 1,
        title: 'The Embers of Manikarnika',
        hindiTitle: 'मणिकर्णिका की चिताएं और पिशाच की दहाड़',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/pishaach_burning_ghat_1790509825115.jpg',
        imageCaption: 'The sacred riverbank shrouded in mysterious embers and the hungry spirit',
        hindiImageCaption: 'गंगा के श्मशान घाट पर चिताओं की राख में भटकता अतृप्त पिशाच',
        content: `At the sacred cremation ghats by the flowing Ganges, the fires of mortality burn without pause. But on cold winter midnights when the priests departed, a shadowy being with needle-sharp teeth, sunken yellow eyes, and elongated talons emerged from the ashes: a Pishaach.
        
Cursed by its past life of hoarded gold and cruel miserliness, it was condemned to eternal thirst and unspeakable hunger.
        
One night, Swami Dayananda, carrying nothing but a brass water pot and wearing saffron robes, sat cross-legged near the riverbank to meditate upon the eternal Brahman.`,
        hindiContent: `गंगा के पावन तट पर श्मशान की चिताएं दिन-रात जलती थीं। लेकिन जब आधी रात को सन्नाटा छा जाता, तो राख के ढेरों में से एक भयानक आकृति निकलती थी—तीखे नाखूनों और धंसी हुई पीली आंखों वाला पिशाच।
        
वह अपने पूर्वजन्म में एक बहुत बड़ा लालची और क्रूर साहूकार था जिसने कभी किसी भूखे को अन्न नहीं दिया था। मृत्यु के बाद वह अतृप्त पिशाच बनकर भटक रहा था।
        
एक रात स्वामी दयानंद नामक एक संन्यासी केवल एक कमंडल लेकर गंगा किनारे शांत भाव से ध्यान लगाने बैठ गए।`
      },
      {
        id: 'pishaach-ch-2',
        number: 2,
        title: 'The Thirst Quenched by the Sacred Drop',
        hindiTitle: 'गंगाजल की बूंद और पिशाच की मुक्ति',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/pishaach_burning_ghat_1790509825115.jpg',
        imageCaption: 'Swami Dayananda offering consecrated Ganga water and liberating the soul',
        hindiImageCaption: 'महामृत्युंजय मंत्र और गंगाजल की बूंद से पिशाच की आत्मा को मुक्ति दिलाते साधु',
        content: `The Pishaach bounded toward the monk with a spine-chilling screech, claws outstretched to tear him apart.
        
Swami Dayananda slowly opened his eyes. There was no terror in his gaze—only boundless sorrow and love. "Why do you rage, brother? What fire burns inside you that burns hotter than all these pyres?"
        
The monster froze. In two hundred years, nobody had ever called it 'brother'; every human had screamed, run, or thrown stones.
        
"I am parched!" rasped the creature. "My throat burns with thousand fires of greed!"
        
Swami poured a single palm of sanctified Ganga water upon the ash, reciting the Maha Mrityunjaya Mantra: *Tryambakam Yajamahe Sugandhim Pushtivardhanam.* As the drop touched the spirit's burning forehead, the demonic form peeled away like burnt husk. A peaceful radiant light arose, thanking the monk before ascending into the starry skies to rest at last.`,
        hindiContent: `पिशाच जोर से दहाड़ते हुए अपने नुकीले पंजे फैलाकर साधु की ओर झपटा।
        
स्वामी जी ने धीरे से अपनी आंखें खोलीं। उनकी आंखों में कोई डर नहीं था, केवल असीम करुणा थी। उन्होंने शांत स्वर में कहा: 'भाई! तुम इतने क्रोध में क्यों हो? तुम्हारे भीतर ऐसी कौन सी आग जल रही है जो इन चिताओं से भी अधिक गर्म है?'
        
पिशाच चौंक कर वहीं रुक गया। दो सौ सालों में किसी ने उसे 'भाई' नहीं कहा था; सब डरकर भागते या पत्थर फेंकते थे।
        
पिशाच रोते हुए बोला: 'मेरी आत्मा प्यासी है! मेरे पूर्वजन्म का लालच मुझे जला रहा है!'
        
स्वामी जी ने अपने कमंडल से गंगाजल की एक बूंद ली और 'महामृत्युंजय मंत्र' का जप करते हुए उसके मस्तक पर छिड़क दी। गंगाजल का स्पर्श होते ही पिशाच का डरावना रूप भस्म हो गया और उसकी आत्मा को शांति मिल गई। वह प्रकाश बनकर आकाश में विलीन हो गया।`
      }
    ]
  },
  {
    id: 'vikram-betal',
    title: 'King Vikram & The Ghostly Betal’s Final Riddle',
    hindiTitle: 'विक्रम और बेताल: प्रेत की रहस्यमयी पहेली',
    subtitle: 'The corpse-dwelling spirit in the ancient banyan tree and the test of a righteous emperor.',
    hindiSubtitle: 'श्मशान के बरगद पर लटकता प्रेत बेताल और राजा विक्रमादित्य के न्याय और विवेक की अमर परीक्षा',
    author: 'महाकवि सोमदेव (Baital Pachisi / Somadeva)',
    authorTitle: 'कथासरित्सागर व बेताल पचीसी के प्राचीन रचयिता',
    coverImage: '/src/assets/images/vikram_betal_ghost_1790509796620.jpg',
    tags: ['भूत-प्रेत', 'Betal', 'Vikram Betal', 'Wisdom Riddle', 'Indian Classics'],
    genre: 'Folklore & Mythology',
    ageBracket: 'all-ages',
    ageCategory: 'all_ages',
    musicPreset: 'spooky_night',
    targetAgeLabel: 'सभी उम्र के लिए • All Ages',
    readingMinutes: 6,
    wordCount: 1100,
    lexile: '680L',
    rating: 4.99,
    reviewCount: 3950,
    synopsis: 'To keep a sacred promise, legendary King Vikramaditya ventures into the cemetery to retrieve a corpse inhabited by the supernatural spirit Betal. On the way, Betal tells an intriguing story and poses an impossible riddle: if the King knows the answer and stays silent, his head will shatter!',
    hindiSynopsis: 'एक तांत्रिक को दिया वचन निभाने के लिए राजा विक्रमादित्य श्मशान के बरगद से प्रेत बेताल को उतारकर अपने कंधे पर लाद लेते हैं। रास्ते में बेताल एक रोचक कहानी सुनाकर अंत में न्याय की कठिन पहेली पूछता है—अगर राजा जानते हुए भी उत्तर नहीं देगा तो उसका सिर फट जाएगा!',
    moral: 'A true king and noble human must never compromise truth and justice, even when silence seems convenient.',
    hindiMoral: 'सीख: एक सच्चे न्यायप्रिय व्यक्ति को परिणाम की परवाह किए बिना सदा निष्पक्ष सत्य का साथ देना चाहिए। मौन रहना कभी-कभी कायरता बन जाता है।',
    format: 'text',
    audioNarration: {
      narrator: 'रामानंद सागर शैली (Classic Doordarshan Voice)',
      durationMinutes: 8,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['न्याय व विवेक (Justice & Wisdom)', 'बेताल की पहेली (Supernatural Riddle)', 'प्रतिज्ञा (Sacred Vow)'],
    chapters: [
      {
        id: 'betal-ch-1',
        number: 1,
        title: 'The Corpse in the Whispering Banyan',
        hindiTitle: 'श्मशान का बरगद और बेताल की सवारी',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/vikram_betal_ghost_1790509796620.jpg',
        imageCaption: 'King Vikramaditya carrying the mysterious Betal across the haunted cremation ground',
        hindiImageCaption: 'श्मशान में बरगद से प्रेत बेताल को कंधे पर लादकर ले जाते राजा विक्रमादित्य',
        content: `Rain lashed against the cemetery stones, and owls screeched among the thorny ber bushes. Emperor Vikramaditya of Ujjain walked alone into the dark, his sword drawn.
        
High up in an ancient gnarled banyan tree hung a lifeless body. When Vikram climbed the branches, cut the hemp rope, and slung the corpse over his broad shoulder, the corpse suddenly laughed with a mocking, supernatural chuckle! It was Betal.
        
"O King Vikram!" chuckled the spirit. "Your perseverance is unmatched. To ease our long march through the cemetery mud, I shall tell you a tale. But remember: if you know the rightful verdict and keep silent, your head shall shatter into a hundred fragments!"`,
        hindiContent: `काली रात थी, बिजली कड़क रही थी और श्मशान में उल्लू बोल रहे थे। उज्जैन के प्रतापी राजा विक्रमादित्य अपनी तलवार हाथ में लिए अकेले श्मशान की ओर बढ़ रहे थे।
        
सामने एक पुराने बरगद के पेड़ पर एक शव उल्टा लटका हुआ था। राजा ने पेड़ पर चढ़कर रस्सी काटी और शव को नीचे उतारकर अपने कंधे पर लाद लिया। तभी वह शव जोर-जोर से अट्टहास करते हुए हंसने लगा! वह कोई साधारण शव नहीं, प्रेत 'बेताल' था।
        
बेताल ने कहा: 'राजन! तेरी हिम्मत की दाद देनी पड़ेगी। रास्ता लंबा है, इसलिए मन बहलाने के लिए मैं तुम्हें एक कहानी सुनाता हूँ। पर याद रखना—यदि कहानी के अंत में सवाल का सही जवाब जानते हुए भी तू चुप रहा, तो तेरे सिर के सौ टुकड़े हो जाएंगे!'`
      },
      {
        id: 'betal-ch-2',
        number: 2,
        title: 'The Riddle of the Rightful Heir',
        hindiTitle: 'बेताल की पहेली और राजा का न्याय',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/vikram_betal_ghost_1790509796620.jpg',
        imageCaption: 'The Baital whispering witty moral riddles into King Vikramaditya ear',
        hindiImageCaption: 'राजा विक्रमादित्य के कान में न्याय की अनसुलझी पहेली फुसफुसाता बेताल',
        content: `Betal narrated the tale of a kingdom where three brothers sacrificed their life-energy, their wisdom, and their wealth to save a drowning village during a flash flood. One built the dyke, one guided the stranded cows, and one gave all his grain.
        
"Now tell me, Vikram," demanded Betal. "Who among the three performed the highest virtue and deserves the crown?"
        
Vikramaditya stopped his stride and answered with immaculate clarity: "The one who gave all his grain! The builder had stone, the guide had courage, but the youngest gave away his very sustenance without knowing if he would eat tomorrow. Selfless charity of one's own livelihood is the supreme jewel of Dharma."
        
"Splendidly answered, wise King!" laughed Betal. "But by speaking, you have broken your vow of silence!" And with a whoosh of wind, Betal slipped off Vikram's shoulder and flew back to hang upside down upon the banyan tree. With a smile of unyielding resolve, Vikram turned back into the darkness to retrieve him once more.`,
        hindiContent: `बेताल ने एक सुंदर कथा सुनाई जिसमें तीन भाइयों ने बाढ़ में डूबते गांव को बचाने के लिए अपना सब कुछ दांव पर लगा दिया था। एक ने जान की बाजी लगाकर बांध बनाया, दूसरे ने तैरकर लोगों को निकाला, और तीसरे ने अपने घर का सारा अनाज भूखों में बांट दिया।
        
बेताल ने पूछा: 'बोल राजन! तीनों में से सबसे बड़ा पुण्यात्मा कौन है? जिसका त्याग सबसे महान है?'
        
राजा विक्रमादित्य ने निष्पक्ष होकर उत्तर दिया: 'तीसरा भाई जिसने अपना सारा अन्न दान कर दिया! क्योंकि पहले दोनों ने अपना कौशल और पराक्रम दिखाया, पर तीसरे ने यह जाने बिना कि कल वह स्वयं क्या खाएगा, अपना सारा सहारा भूखों को सौंप दिया। अभाव में किया गया त्याग ही सर्वश्रेष्ठ धर्म है।'
        
'वाह राजन! तेरा न्याय बिल्कुल सटीक है!' बेताल ने कहा, 'लेकिन तूने बोलकर अपना मौन तोड़ दिया, इसलिए मैं चला!' और बेताल हवा में उड़कर फिर उसी बरगद पर जा लटका। राजा विक्रमादित्य मुस्कुराए और पुनः बेताल को लाने पेड़ की ओर चल पड़े।`
      }
    ]
  },
  {
    id: 'haveli-bramharakshas',
    title: 'The Bramharakshas of the Ruined Haveli',
    hindiTitle: 'प्राचीन खंडहर का ब्रह्मराक्षस और मोक्ष का श्लोक',
    subtitle: 'A proud scholar trapped between realms for three hundred years, waiting for someone to teach with love.',
    hindiSubtitle: 'विंध्य के पुराने महल में गूंजती वेद ऋचाएं — घमंडी विद्वान की मुक्ति और सच्ची विनम्रता का पाठ',
    author: 'विंध्य लोककथा (Vindhya Folklore)',
    authorTitle: 'मध्य भारत की पौराणिक लोकगाथा',
    coverImage: '/src/assets/images/bramharakshas_tree_1790509838402.jpg',
    tags: ['भूत-प्रेत', 'Bramharakshas', 'Spooky', 'Supernatural', 'Redemption'],
    genre: 'Folklore & Mythology',
    ageBracket: 'all-ages',
    ageCategory: 'all_ages',
    musicPreset: 'temple',
    targetAgeLabel: 'Ages 12+ • Philosophical Ghost Tale',
    readingMinutes: 6,
    wordCount: 1050,
    lexile: '670L',
    rating: 4.96,
    reviewCount: 2280,
    synopsis: 'A Bramharakshas is among the most formidable supernatural entities in Indian folklore—the restless spirit of a highly learned scholar who misused knowledge out of pride. Trapped inside the library of an overgrown palace, he challenges any visitor to complete sacred Sanskrit verses.',
    hindiSynopsis: 'भारतीय लोकगाथाओं में ब्रह्मराक्षस उस विद्वान की अतृप्त आत्मा होती है जिसे अपने ज्ञान का अहंकार था और जिसने कभी किसी गरीब को शिक्षा नहीं दी। खंडहर बन चुके राजमहल में तीन सौ साल से कैद ब्रह्मराक्षस राहगीरों से श्लोकों के अर्थ पूछता था, जब तक कि एक विनम्र बालक ने उसे सच्चा ज्ञान नहीं सिखाया।',
    moral: 'Knowledge without humility is a heavy chain. Wisdom blooms only when shared freely with love.',
    hindiMoral: 'सीख: विद्या वही है जो विनम्रता दे और सबको बांटी जाए। ज्ञान का अहंकार मनुष्य को ब्रह्मराक्षस बना देता है, जबकि विनम्रता मोक्ष का द्वार खोलती है।',
    format: 'text',
    audioNarration: {
      narrator: 'संस्कृत आचार्य शैली (Sanskrit Scholar Style)',
      durationMinutes: 8,
      audioPreviewSnippetUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg'
    },
    themes: ['विद्या व विनम्रता (Humility in Wisdom)', 'ब्रह्मराक्षस (Bramharakshas Lore)', 'मुक्ति (Liberation)'],
    chapters: [
      {
        id: 'bramha-ch-1',
        number: 1,
        title: 'The Recitations in the Midnight Library',
        hindiTitle: 'खंडहर की हवेली में गूंजते संस्कृत श्लोक',
        wordCount: 500,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/bramharakshas_tree_1790509838402.jpg',
        imageCaption: 'The ancient scholar spirit beneath the sacred banyan tree among misty ruins',
        hindiImageCaption: 'विंध्याचल के खंडहर में बरगद के पेड़ तले भटकता घमंडी विद्वान ब्रह्मराक्षस',
        content: `Deep inside the Vindhya forests lay the moss-covered ruins of a 17th-century royal academy. No woodsman stayed near the gates after sunset, for from the hollow halls drifted the boom of thunderous Sanskrit chanting.
        
It was the Bramharakshas—the towering, spectral scholar who in life had memorized all four Vedas, yet chased away poor students with cruel insults. Upon his death, his arrogance bound him to the dusty palm-leaf manuscripts as a guardian spirit.
        
Whoever failed to answer his obscure grammatical riddles was chased out half-mad with dread.`,
        hindiContent: `विंध्याचल के घने जंगलों में तीन सौ साल पुरानी एक राजसी हवेली खंडहर बन चुकी थी। सूरज ढलते ही कोई उसके पास नहीं जाता था, क्योंकि आधी रात को वहां से वेद मंत्रों के गूंजने की आवाज़ आती थी।
        
वह ब्रह्मराक्षस था—अपने समय का प्रकांड विद्वान जिसने चारों वेद कंठस्थ किए थे, लेकिन अपने ज्ञान के अहंकार में कभी किसी गरीब शिष्य को विद्या नहीं दी थी। मरने के बाद उसके ज्ञान का घमंड ही उसकी बेड़ी बन गया और वह ब्रह्मराक्षस बनकर उस खंडहर में भटकता रहा।
        
जो भी राहगीर वहां से गुजरता, वह उससे संस्कृत व्याकरण के कठिन श्लोक पूछता और न बताने पर उसे डराकर भगा देता था।`
      },
      {
        id: 'bramha-ch-2',
        number: 2,
        title: 'The Sloka of True Humility',
        hindiTitle: 'विनम्रता का श्लोक और तीन सौ साल के शाप से मुक्ति',
        wordCount: 550,
        readingMinutes: 3,
        isUnlocked: true,
        image: '/src/assets/images/bramharakshas_tree_1790509838402.jpg',
        imageCaption: 'Madhav reciting the verse of humility and liberating the scholar spirit',
        hindiImageCaption: 'विनम्रता का श्लोक सुनकर अश्रु बहाते और मोक्ष पाते ब्रह्मराक्षस',
        content: `A young student named Madhav, lost in the woods while seeking medicinal herbs for his mother, sought shelter from the pouring rain inside the ruined library.
        
Instantly, the air turned freezing cold. The stone pillars shook, and a luminous, towering figure wearing sacred grass rings and glowing thread materialized.
        
"Audacious mortal!" boomed the Bramharakshas. "Define for me the highest pinnacle of wisdom, or suffer my wrath!"
        
Madhav did not tremble. He folded his palms with deep reverence, bowed his head to the stone floor, and spoke gently:
        
*विद्या ददाति विनयं, विनयाद् याति पात्रताम्।*
*(True knowledge bestows humility; from humility comes worthiness; from worthiness comes wealth, righteousness, and eternal peace.)*
        
The Bramharakshas stopped. Tears flowed from his spectral eyes. "For three centuries," he whispered, "I demanded pride, yet you have offered me humility. That was the one lesson I never learned in life." The heavy curse shattered. The spirit bowed to the humble youth, blessed him with pure intellect, and dissolved peacefully into the morning sunbeams.`,
        hindiContent: `एक दिन माधव नाम का एक निर्धन छात्र अपनी बीमार मां के लिए जड़ी-बूटी खोजते हुए जंगल में भटक गया और बारिश से बचने के लिए उस खंडहर में जा पहुंचा।
        
अचानक हवा बर्फीली हो गई और खंभों के बीच से जनेऊ धारण किए एक विशालकाय, तेजस्वी परछाई प्रकट हुई। ब्रह्मराक्षस ने गरजकर कहा: 'मूर्ख बालक! बता, संसार में सबसे बड़ी विद्या कौन सी है, नहीं तो तू जीवित नहीं बचेगा!'
        
माधव डरा नहीं। उसने हाथ जोड़कर उस विद्वान आत्मा को प्रणाम किया और बड़ी विनम्रता से कहा:
        
'विद्या ददाति विनयं विनयाद् याति पात्रताम्।
पात्रत्वात् धनमाप्नोति धनात् धर्मं ततः सुखम्॥'
(सच्ची विद्या वही है जो विनम्रता देती है। विनम्रता से योग्यता आती है, योग्यता से धर्म और सच्चा सुख मिलता है।)
        
यह श्लोक सुनते ही ब्रह्मराक्षस की आंखों से आंसू बहने लगे। उसने कांपती आवाज़ में कहा: 'मैंने तीन सौ साल तक सबको अपने ज्ञान से डराया, पर आज एक बालक ने मुझे विद्या का असली सार सिखा दिया कि ज्ञान की पराकाष्ठा विनम्रता है।' उस आत्मा का सारा अहंकार गल गया। उसने माधव को आशीर्वाद दिया और वह तीन सौ साल के शाप से मुक्त होकर परमधाम को चली गई।`
      }
    ]
  },
  {
    id: 'clockwork-alchemist',
    title: 'The Clockwork Alchemist of Prague',
    hindiTitle: 'प्राग का रहस्यमयी घड़ीसाज़',
    subtitle: 'Where forgotten clock towers whisper the transmutation of time and brass.',
    hindiSubtitle: 'जहाँ पुरानी घड़ी की सुइयां समय और रहस्यों की दास्तान सुनाती हैं',
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
