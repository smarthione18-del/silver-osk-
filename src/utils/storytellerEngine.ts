import { Story, AppLanguage, MusicPreset, StoryIntelligence, StoryNarrationSegment } from '../types';

export interface SavedStoryState {
  storyId: string;
  language: AppLanguage;
  chapterIndex: number;
  positionSec: number;
  musicPreset: MusicPreset;
  musicVolume: number;
  narrationVolume: number;
  musicEnabled: boolean;
  speed: number;
  lastUpdated: number;
  storyTitle: string;
  coverImage?: string;
}

const STORAGE_KEY = 'kahanikunj_story_memory_v2';

// 1. Automatic Story-Type & Intelligence Detection
export function analyzeStoryIntelligence(story: Story): StoryIntelligence {
  const title = (story.title + ' ' + (story.hindiTitle || '')).toLowerCase();
  const text = (
    story.synopsis +
    ' ' +
    (story.hindiSynopsis || '') +
    ' ' +
    story.genre +
    ' ' +
    story.tags.join(' ') +
    ' ' +
    (story.chapters?.[0]?.content || '')
  ).toLowerCase();

  // Detect Age Group
  let ageGroup: 'kids_3_6' | 'children_7_10' | 'teens_11_14' = 'children_7_10';
  if (
    story.ageBracket === 'little-dreamers' ||
    story.ageCategory === 'kids_3_7' ||
    title.includes('3-7') ||
    text.includes('नन्हें') ||
    text.includes('3-6')
  ) {
    ageGroup = 'kids_3_6';
  } else if (
    story.ageBracket === 'young-explorers' ||
    story.ageCategory === 'teens_8_14' ||
    text.includes('mystery') ||
    text.includes('victorian')
  ) {
    ageGroup = 'teens_11_14';
  }

  // Detect Story Type & Music
  let genreType = 'folk_traditional';
  let genre = 'Indian Folk & Moral Story (लोककथा व नीति-कथा)';
  let mood = 'Clever, Cheerful & Thoughtful (बुद्धिमान व हास्य-रस)';
  let setting = 'Historic Indian Courtyard & Village (भारतीय ग्राम्य परिवेश)';
  let emotionalTone = 'Warm, moral-guided, and encouraging';
  let storyIntensity: 'gentle' | 'moderate' | 'dramatic' = 'moderate';
  let culturalContext = 'Indian Folk & Wisdom Tradition';
  let recommendedMusic: MusicPreset = 'bansuri';
  let musicReason = 'Gentle bamboo flute providing natural warmth.';
  let characters: string[] = ['Narrator'];

  // Case: Akbar & Birbal
  if (title.includes('akbar') || title.includes('birbal') || text.includes('बीरबल') || text.includes('अकबर')) {
    genreType = 'historical_royal';
    genre = 'Historical Royal Legend (मुगल राजदरबार व बीरबल नीति)';
    mood = 'Royal, Dignified & Clever (राजसी गरिमा, विनोद व बुद्धिमानी)';
    setting = 'Royal Mughal Court & Agra Palace (शाही दरबार व दीवान-ए-खास)';
    emotionalTone = 'Majestic, witty, and heartwarming';
    storyIntensity = 'moderate';
    culturalContext = 'Mughal Golden Era & Royal Heritage';
    recommendedMusic = 'royal_court';
    musicReason = 'Regal Santoor and Shehnai resonance with stately Tanpura drone.';
    characters = ['Narrator', 'Emperor Akbar', 'Birbal', 'Royal Courtier'];
  }
  // Case: Tenali Raman
  else if (title.includes('tenali') || text.includes('तेनाली') || text.includes('विजयनगर')) {
    genreType = 'traditional_folk';
    genre = 'Vijayanagara Court Humor & Folk Legend (तेनालीराम हास्य-कथा)';
    mood = 'Playful, Highly Clever & Humorous (हाज़िरजवाबी, चपलता व हास्य)';
    setting = 'Vijayanagara Palace, Temple Garden & Courtyards (विजयनगर साम्राज्य)';
    emotionalTone = 'Bouncy, witty, and triumphant';
    storyIntensity = 'moderate';
    culturalContext = 'South Indian Classical Court Folk';
    recommendedMusic = 'light_folk';
    musicReason = 'Playful bouncing strings and acoustic folk melody.';
    characters = ['Narrator', 'Tenali Raman', 'Thief 1', 'Thief 2', 'King Krishnadevaraya'];
  }
  // Case: Animal Fables (Clever Crow, Panchatantra Jackal & War Drum, Lion & Hare)
  else if (
    title.includes('crow') ||
    title.includes('jackal') ||
    title.includes('panchatantra') ||
    text.includes('कौवा') ||
    text.includes('गीदड़') ||
    text.includes('पंचतंत्र') ||
    text.includes('जंगल') ||
    story.tags.some((t) => t.toLowerCase().includes('animal'))
  ) {
    genreType = 'animal_fable';
    genre = 'Panchatantra Animal Fable (पंचतंत्र जीव-जंतु नीति-कथा)';
    mood = 'Curious, Nature-rich & Educational (प्राकृतिक कौतूहल व जीवन-सीख)';
    setting = 'Ancient Forest, Village Neem Tree & Courtyard (घना वन व ग्राम)';
    emotionalTone = 'Enchanting, observant, and moral-rich';
    storyIntensity = 'gentle';
    culturalContext = 'Ancient Indian Panchatantra Wisdom';
    recommendedMusic = 'forest_nature';
    musicReason = 'Woodland bird chirps, gentle rustling leaves, and bamboo flute.';
    characters = ['Narrator', 'Kalu Crow / Gomayu Jackal', 'Forest Animals'];
  }
  // Case: Bedtime / Calming stories
  else if (
    title.includes('bedtime') ||
    title.includes('lullaby') ||
    title.includes('moon') ||
    text.includes('रात') ||
    text.includes('नींद') ||
    text.includes('शयन') ||
    text.includes('sleeping')
  ) {
    genreType = 'bedtime';
    genre = 'Soothing Bedtime Tale (शयनकालीन मधुर लोरी कथा)';
    mood = 'Very Soft, Calm & Relaxing (अत्यंत शांत, मधुर व स्वप्निल)';
    setting = 'Moonlit Sky & Quiet Sleeping Meadow (तारों भरी रात व शांत शय्या)';
    emotionalTone = 'Peaceful, loving, and gentle';
    storyIntensity = 'gentle';
    culturalContext = 'Indian Bedtime Lullaby & Storytelling';
    recommendedMusic = 'bedtime_calm';
    musicReason = 'Ultra-soft lullaby harp and warm soothing hum to induce sweet sleep.';
    characters = ['Narrator', 'Gentle Child', 'Moon & Stars'];
  }
  // Case: Adventure stories
  else if (
    story.genre.toLowerCase().includes('adventure') ||
    title.includes('dragon') ||
    title.includes('underground') ||
    text.includes('साहस') ||
    text.includes('खोज')
  ) {
    genreType = 'adventure';
    genre = 'Heroic Adventure & Exploration (रोमांचक साहसिक यात्रा)';
    mood = 'Inspiring, Spirited & Dynamic (साहस, उमंग व शौर्य)';
    setting = 'Mysterious Caverns, Ancient Rivers & Distant Cities (अज्ञात देश व बीहड़)';
    emotionalTone = 'Thrilling, brave, and visionary';
    storyIntensity = 'dramatic';
    culturalContext = 'Epic Journeys & Heroic Deeds';
    recommendedMusic = 'adventure_cinematic';
    musicReason = 'Heroic Indian strings and dynamic driving tempo.';
    characters = ['Narrator', 'Hero / Explorer', 'Companion'];
  }
  // Case: Magical Fantasy
  else if (
    story.genre.toLowerCase().includes('fantasy') ||
    title.includes('alchemist') ||
    title.includes('constellations') ||
    text.includes('जादू')
  ) {
    genreType = 'magical_fantasy';
    genre = 'Enchanted Fantasy & Wonder (जादुई संसार व कल्पना)';
    mood = 'Ethereal, Sparkling & Mysterious (रहस्यमयी, अद्भुत व जादुई)';
    setting = 'Alchemist Laboratory, Starlit Sky & Crystal Realm (तारामंडल व जादुई लोक)';
    emotionalTone = 'Fascinating, dreamlike, and vast';
    storyIntensity = 'moderate';
    culturalContext = 'Mythic Wonder & Starlight Lore';
    recommendedMusic = 'magical_fantasy';
    musicReason = 'Sparkling fairy chimes, crystalline harmonics, and airy ambience.';
    characters = ['Narrator', 'Alchemist / Star Seeker', 'Mystical Beings'];
  }
  // Case: Emotional stories (Kabuliwala, etc.)
  else if (
    title.includes('kabuliwala') ||
    title.includes('tagore') ||
    text.includes('काबुलीवाला') ||
    text.includes('टैगोर') ||
    text.includes('हृदय')
  ) {
    genreType = 'emotional';
    genre = 'Tender Emotional Classic (हृदयस्पर्शी अमर साहित्य)';
    mood = 'Deeply Touching, Compassionate & Warm (करुणा, वात्सल्य व आत्मीयता)';
    setting = 'Old Calcutta Colonial Streets & Courtyard (पुरानी हवेली व कोलकाता)';
    emotionalTone = 'Affectionate, bittersweet, and heartfelt';
    storyIntensity = 'moderate';
    culturalContext = 'Rabindranath Tagore Classical Literature';
    recommendedMusic = 'emotional_gentle';
    musicReason = 'Tender, slow, moving melody evocative of deep paternal love.';
    characters = ['Narrator', 'Rehmat Kabuliwala', 'Little Mini', 'Mini’s Father'];
  }
  // Case: Sacred / Divine (Durga, Ganesha, Hanuman, Shankh)
  else if (
    title.includes('ganesha') ||
    title.includes('durga') ||
    title.includes('hanuman') ||
    title.includes('shiva') ||
    text.includes('गणेश') ||
    text.includes('दुर्गा') ||
    text.includes('हनुमान')
  ) {
    genreType = 'sacred_mythological';
    genre = 'Sacred Mythological Legend (पौराणिक पावन गाथा)';
    mood = 'Divine, Uplifting & Auspicious (पावन, मंगलमय व तेजस्वी)';
    setting = 'Kailash, Ayodhya & Sacred Temples (पवित्र धाम व देवलोक)';
    emotionalTone = 'Reverent, inspiring, and noble';
    storyIntensity = 'moderate';
    culturalContext = 'Vedic & Puranic Heritage';
    recommendedMusic = 'shankh_aarti';
    musicReason = 'Auspicious Shankh trumpet, resonant Aarti temple bells, and divine aura.';
    characters = ['Narrator', 'Lord Deity', 'Devotee / Sages'];
  }
  // Case: Mystery / Spooky (Vikram-Betal, Haunted Banyan)
  else if (
    title.includes('betal') ||
    title.includes('banyan') ||
    title.includes('mystery') ||
    text.includes('बेताल') ||
    text.includes('विक्रम') ||
    text.includes('भूत')
  ) {
    genreType = 'mystery_suspense';
    genre = 'Ancient Riddle & Mystery (प्राचीन विक्रम-बेताल पहेली)';
    mood = 'Suspenseful, Intriguing & Eerie (सस्पेंस, रोमांच व गूढ़ता)';
    setting = 'Ancient Banyan Tree & Moonlit Forest (श्मशान, प्राचीन वटवृक्ष व बीहड़)';
    emotionalTone = 'Chilling yet philosophical and witty';
    storyIntensity = 'dramatic';
    culturalContext = 'King Vikramaditya Legends (बेताल पचीसी)';
    recommendedMusic = 'spooky_night';
    musicReason = 'Eerie wind whistle, low ominous drone, and soft suspense heartbeat.';
    characters = ['Narrator', 'King Vikramaditya', 'Betal (Spirit)'];
  }

  // Determine narrator pace based on age group
  let narratorPace = 0.92;
  if (ageGroup === 'kids_3_6') {
    narratorPace = 0.86; // Gentle and easily graspable for tiny tots
  } else if (ageGroup === 'teens_11_14') {
    narratorPace = 0.96; // Lively and conversational
  }

  // Character Voices configurations
  const characterVoices: { [name: string]: { pitch: number; rate: number; tone: string } } = {
    Narrator: { pitch: 1.0, rate: narratorPace, tone: 'Warm, expressive Indian master storyteller' },
    'Emperor Akbar': { pitch: 0.85, rate: narratorPace * 0.92, tone: 'Calm, royal, authoritative, and mature' },
    Birbal: { pitch: 1.08, rate: narratorPace * 1.04, tone: 'Intelligent, confident, and playfully respectful' },
    'Tenali Raman': { pitch: 1.12, rate: narratorPace * 1.06, tone: 'Clever, energetic, witty, and humorous' },
    'Child character': { pitch: 1.25, rate: narratorPace * 0.95, tone: 'Gentle, sweet, youthful, and curious' },
    Elder: { pitch: 0.88, rate: narratorPace * 0.88, tone: 'Wise, warm, grandfatherly, and deliberate' },
    Betal: { pitch: 0.9, rate: narratorPace * 0.9, tone: 'Mischievous, mysterious, and riddle-loving spirit' },
    'King Vikramaditya': { pitch: 0.87, rate: narratorPace * 0.92, tone: 'Silent, resolute, courageous king' },
  };

  return {
    genre,
    genreType,
    mood,
    characters,
    ageGroup,
    setting,
    emotionalTone,
    storyIntensity,
    culturalContext,
    recommendedMusic,
    musicReason,
    narratorPace,
    characterVoices,
  };
}

// 2. Multilingual Support: Localized Titles, Synopses, Morals, and Chapter Scripts
export const MULTILINGUAL_DATA: Record<
  string,
  {
    gu?: {
      title: string;
      subtitle?: string;
      synopsis: string;
      moral: string;
      chapter1Title: string;
      chapter1Content: string;
      chapter2Title?: string;
      chapter2Content?: string;
    };
    mr?: {
      title: string;
      subtitle?: string;
      synopsis: string;
      moral: string;
      chapter1Title: string;
      chapter1Content: string;
      chapter2Title?: string;
      chapter2Content?: string;
    };
  }
> = {
  'clever-crow': {
    gu: {
      title: 'ચતુર કાગડો અને કૂંજો (પંચતંત્ર)',
      subtitle: 'જ્યાં ચાહ ત્યાં રાહ — કાંકરા નાખીને કેવી રીતે કાગડાએ પોતાની તરસ છીપાવી',
      synopsis:
        'ભીષણ ગરમીના દિવસે એક તરસ્યો કાગડો પાણીની શોધમાં ભટકતો રહ્યો. તેને એક કૂંજો મળ્યો, પણ પાણી ખૂબ નીચે હતું. કાગડાએ ધીરજ ન ગુમાવી અને કાંકરા નાખી પાણી ઉપર લાવ્યો.',
      moral: 'શીખ: જ્યાં ચાહ ત્યાં રાહ. બુદ્ધિ અને ધીરજથી દરેક મુશ્કેલ કામ પણ સરળ બની જાય છે.',
      chapter1Title: 'ભીષણ ગરમી અને તરસ્યો કાગડો',
      chapter1Content:
        'જેઠ મહિનાનો બપોરનો સમય હતો. ચારેબાજુ આકરી ગરમી પડી રહી હતી. કાલુ નામનો એક કાગડો પાણીના એક ટીપા માટે અહીં-તહીં ભટકતો હતો. તેની જીભ તરસથી સુકાઈ ગઈ હતી. ઉડતાં-ઉડતાં તેને એક જૂના લીમડાના ઝાડ નીચે માટીનો કૂંજો દેખાયો. કાલુ ખુશ થઈને કૂંજા પાસે આવ્યો અને ડોકિયું કર્યું. કૂંજામાં પાણી તો હતું, પણ સાવ તળિયે હતું.',
      chapter2Title: 'કાંકરાની યુક્તિ અને વિજય',
      chapter2Content:
        'કાલુએ કૂંજામાં પોતાની ચાંચ નાખી, પણ ચાંચ પાણી સુધી પહોંચી શકી નહીં. તેણે આસપાસ જોયું. તેને નાના-નાના લીસા કાંકરા દેખાયા. તેના મગજમાં એક સરસ વિચાર આવ્યો! તેણે એક-એક કાંકરો ચાંચમાં પકડી કૂંજામાં નાખવાનું શરૂ કર્યું. ટપ! ટપ! ટપ! ધીમે-ધીમે કાંકરા નીચે બેસતા ગયા અને પાણી ઉપર આવતું ગયું. કાલુએ ધરાઈને ઠંડુ પાણી પીધું અને હરખાતો આકાશમાં ઊડી ગયો.',
    },
    mr: {
      title: 'हुशार कावळा आणि माठ (पंचतंत्र)',
      subtitle: 'इच्छा तिथे मार्ग — खडे टाकून कशी शमवली कावळ्याने तहान',
      synopsis:
        'उन्हाळ्याच्या कडक उन्हात एक तहानलेला कावळा पाण्यासाठी वणवण भटकत होता. त्याला एका बागेत माठ दिसला, पण पाणी अगदी तळाशी होते. कावळ्याने हुशारी दाखवून खडे टाकून पाणी वर आणले.',
      moral: 'शीक: इच्छा तिथे मार्ग. बुद्धी आणि संयमाने अवघडातले अवघड संकटही दूर होते.',
      chapter1Title: 'कडक ऊन आणि तहानलेला कावळा',
      chapter1Content:
        'उन्हाळ्याची दुपार होती. सर्वत्र रखरखीत ऊन पडले होते. नद्या आणि तलाव सुकले होते. काळू नावाचा एक कावळा सकाळपासून पाण्यासाठी भटकत होता. त्याची तहानेने जीभ कोरडी पडली होती. अचानक त्याला एका झाडाखाली एक जुना माठ दिसला. काळू आनंदात खाली उतरला आणि त्याने माठात डोकावून पाहिले. पाणी तर होते, पण ते खूप खोल तळाशी होते.',
      chapter2Title: 'खड्यांची युक्ती आणि यश',
      chapter2Content:
        'काळूने माठात चोच घातली, पण चोच पाण्यापर्यंत पोहोचलीच नाही. काळू थोडा वेळ विचारात पडला. तेवढ्यात त्याची नजर जवळच पडलेल्या लहान-लहान खड्यांवर गेली. त्याच्या डोक्यात एक छान कल्पना आली! त्याने एक-एक खडा चोचीत धरून माठात टाकायला सुरुवात केली. टप! टप! टप! हळूहळू खडे खाली बसू लागले आणि पाणी वर चढू लागले. काळूने पोटभर पाणी प्यायले आणि आनंदाने आभाळात झेप घेतली.',
    },
  },
  'tenali-raman-thieves': {
    gu: {
      title: 'તેનાલીરામ અને ચોરોની મહેનત',
      subtitle: 'તેનાલીરામની સમયસૂચકતા — ચોરો પાસે જ આખી રાત બગીચામાં પાણી નંખાવડાવ્યું',
      synopsis:
        'તેનાલીરામના ઘરમાં ચોરી કરવા બે ચોરો ઝાડીઓમાં છુપાયા હતા. તેનાલીરામ સમજી ગયા અને પત્નીને મોટેથી કહ્યું કે ચોરોના ડરથી બધી સંપત્તિ કૂવામાં ફેંકી દઈએ! ચોરો આખી રાત કૂવામાંથી પાણી ઉલેચતા રહ્યા.',
      moral: 'શીખ: સંકટના સમયે ડરવાના બદલે બુદ્ધિપૂર્વક કામ લઈએ તો શત્રુનો દાવ તેના પર જ ઊંધો પડે છે.',
      chapter1Title: 'આંબાના બગીચામાં પગરવ',
      chapter1Content:
        'વિજયનગરની એક શાંત રાત્રે તેનાલીરામ પોતાના બગીચામાં આંટો મારી રહ્યા હતા. અચાનક તેમણે કેળના પાંદડા પાછળ બે લુચ્ચી આંખો ચમકતી જોઈ. તેનાલીરામ તરત સમજી ગયા કે આ ચોર છે! તેઓ જરાય ડર્યા નહીં. તેઓ ઘરમાં ગયા અને મોટેથી બોલ્યા: "અરે સાંભળો છો! શહેરમાં મોટા ચોર આવ્યા છે. આપણું બધું સોનું-ચાંદી મોટા પતરાના પેટીમાં ભરીને કૂવામાં ફેંકી દઈએ જેથી કોઈ ચોરી ન શકે!"',
      chapter2Title: 'ચોરો દ્વારા મફતમાં સિંચાઈ',
      chapter2Content:
        'તેનાલીરામે પથ્થર ભરેલી ભારે પેટી કૂવામાં ધડામ દઈને પધરાવી દીધી અને ઘસઘસાટ સૂવાનો ડોળ કર્યો. ચોરોએ વિચાર્યું: "વાહ! બધો ખજાનો કૂવામાં છે. ચાલો પાણી બહાર કાઢી લઈએ!" આખી રાત બંને ચોર ડોલ ભરી-ભરીને પાણી ખેંચતા રહ્યા અને બગીચાના છોડવાઓમાં રેડતા રહ્યા. સવારે સુરજ ઊગ્યો ત્યારે તેનાલીરામ ચાનો ગરમ કપ લઈને બહાર આવ્યા: "ભાઈઓ તમારો ખૂબ ખૂબ આભાર! મારા બગીચાને પાણીની ખૂબ જરૂર હતી." ચોર જીવ બચાવીને ભાગ્યા!',
    },
    mr: {
      title: 'तेनालीरामन आणि विहिरीतील खजिना',
      subtitle: 'तेनालीरामनची समयसूचकता — चोरांकडूनच रात्रभर करून घेतली बागेची मशागत',
      synopsis:
        'तेनालीरामनच्या घरात चोरी करण्यासाठी दोन चोर लपून बसले होते. तेनालीरामन यांनी त्यांना पाहिले आणि मोठ्या आवाजात पत्नीला सांगितले की सर्व दागिने विहिरीत लपवू या. चोरांनी रात्रभर विहिरीचे पाणी उपसून बाग ओली केली!',
      moral: 'शीक: संकटाच्या वेळी घाबरून न जाता शांत डोक्याने विचार केल्यास शत्रूचा डाव त्याच्यावरच उलटवता येतो.',
      chapter1Title: 'आंब्याच्या बागेत चोरांची चाहूल',
      chapter1Content:
        'विजयनगरच्या एका शांत रात्री तेनालीरामन बागेत फिरत होते. अचानक त्यांना जास्वंदीच्या झाडीमागे दोन परछाया दिसल्या. तेनालीरामन यांनी ओळखले की हे चोर आहेत. ते अजिबात घाबरले नाहीत. त्यांनी घरात जाऊन मोठ्या आवाजात पत्नीला सांगितले: "अगं ऐकतेस का? गावात मोठे चोर आले आहेत. आपले सर्व दागदागिने एका मोठ्या पेटीत भरून बागेतील विहिरीत टाकून देऊ या!"',
      chapter2Title: 'रात्रभर पाणी उपसणारे चोर',
      chapter2Content:
        'तेनालीरामन यांनी एका पेटीत दगड भरून ती विहिरीत धडामकन फेकली आणि शांतपणे झोपायला निघून गेले. चोर झाडीत बसून हसले: "सगळा खजिना तर विहिरीत पडला! चला, पाणी उपसून पेटी बाहेर काढू!" चोर रात्रभर बादल्या भरून पाणी उपसत राहिले. ते पाणी तेनालीरामन यांच्या झाडांना आणि भाजीपाल्याला मिळाले. सकाळी तेनालीरामन चहाचा कप घेऊन बाहेर आले: "धन्यवाद मित्रांनो! माझ्या बागेला पाण्याची गरज होती." चोर तिथून धूम पळून गेले!',
    },
  },
  'akbar-birbal-sweetest': {
    gu: {
      title: 'અકબર અને બીરબલ: દુનિયાની સૌથી મીઠી વસ્તુ',
      subtitle: 'બાદશાહનો વિચિત્ર પ્રશ્ન અને બીરબલનો બુદ્ધિમાન ઉત્તર',
      synopsis:
        'બાદશાહ અકબરે દરબારમાં પૂછ્યું: "આ સંસારમાં સૌથી મીઠી વસ્તુ કઈ છે?" દરબારીઓએ શેરડી, ગુલાબજાંબુ અને મધના નામ આપ્યા, પણ બીરબલે કહ્યું: "પ્રેમભરી મીઠી વાણી!"',
      moral: 'શીખ: મધુર અને સન્માનભરી વાણીથી કઠોરથી કઠોર હૃદય પણ પીગળી જાય છે.',
      chapter1Title: 'શાહી દરબારમાં ગૂંચવણભર્યો સવાલ',
      chapter1Content:
        'એક સવારે શહેનશાહ અકબર પોતાના તખ્ત પર બેઠા હતા. અચાનક તેમણે દરબારીઓ સામે જોઈને પૂછ્યું: "કહો, આ દુનિયામાં સૌથી મીઠી વસ્તુ કઈ છે?" કોઈ દરબારી બોલ્યા કાશ્મીરના સફરજન, કોઈએ કહ્યું તાજું મધ, તો કોઈએ કહ્યું મલાઈદાર જલેબી. બાદશાહ સંતુષ્ટ ન થયા. તેમણે બીરબલ સામે સ્મિત કર્યું.',
      chapter2Title: 'બીરબલનો હૃદયસ્પર્શી જવાબ',
      chapter2Content:
        'બીરબલ હળવેથી આગળ આવ્યા અને નમસ્કાર કરીને બોલ્યા: "જહાંપનાહ! દુનિયામાં સૌથી મીઠી વસ્તુ છે — મધુર વાણી (બોલ)! મીઠા બોલ દુશ્મનને પણ મિત્ર બનાવી દે છે, જ્યારે કડવા બોલથી મધ પણ ઝેર બની જાય છે." અકબરે બીરબલની પીઠ થાબડી અને હીરાનો હાર ભેટ આપ્યો.',
    },
    mr: {
      title: 'अकबर आणि बिरबल: जगातील सर्वात गोड गोष्ट',
      subtitle: 'बादशहाचा अवघड प्रश्न आणि बिरबलाचे चोख उत्तर',
      synopsis:
        'बादशहा अकबराने दरबारात विचारले: "या जगात सर्वात गोड वस्तू कोणती?" दरबारींनी मध आणि साखरेची नावे घेतली, पण बिरबलाने सांगितले: "गोड वाणी!"',
      moral: 'शीक: गोड आणि नम्र शब्दांनी जगातील प्रत्येकाचे मन जिंकता येते.',
      chapter1Title: 'शाही दरबारात विचारलेला प्रश्न',
      chapter1Content:
        'एका प्रसन्न सकाळी बादशहा अकबर आपल्या सिंहासनावर बसले होते. त्यांनी अचानक विचारले: "दरबारी मंडळी, सांगा पाहू, या जगात सर्वात गोड काय आहे?" एकाने सांगितले आंबा, दुसऱ्याने सांगितले गुळाची ढेप. पण बादशहाचे समाधान झाले नाही. त्यांनी बिरबलाकडे पाहिले.',
      chapter2Title: 'बिरबलाचे बुद्धिमत्तापूर्ण उत्तर',
      chapter2Content:
        'बिरबल पुढे आले आणि झुकून म्हणाले: "महाराज! या जगात सर्वात गोड गोष्ट म्हणजे — माणसाचे प्रेमळ बोलणे! गोड शब्दांनी शत्रूही जवळ येतो, आणि कटू शब्दांनी गोड नातीही तुटतात." बादशहा खुश झाले आणि त्यांनी बिरबलाला मौल्यवान रत्नहार दिला.',
    },
  },
};

// 3. Helper to retrieve localized story content for any language
export function getLocalizedStoryContent(
  story: Story,
  language: AppLanguage,
  chapterIdx: number = 0
): {
  title: string;
  subtitle: string;
  synopsis: string;
  moral: string;
  chapterTitle: string;
  chapterContent: string;
} {
  const ch = story.chapters?.[chapterIdx] || story.chapters?.[0];

  // 1. Gujarati
  if (language === 'gu') {
    const multi = MULTILINGUAL_DATA[story.id]?.gu;
    if (multi) {
      return {
        title: multi.title,
        subtitle: multi.subtitle || story.subtitle || '',
        synopsis: multi.synopsis,
        moral: multi.moral,
        chapterTitle: (chapterIdx === 1 ? multi.chapter2Title : multi.chapter1Title) || multi.chapter1Title,
        chapterContent: (chapterIdx === 1 ? multi.chapter2Content : multi.chapter1Content) || multi.chapter1Content,
      };
    }
    // Fallback if specific story not pre-bundled
    return {
      title: story.gujaratiTitle || story.hindiTitle || story.title,
      subtitle: story.gujaratiSubtitle || story.hindiSubtitle || story.subtitle || '',
      synopsis: story.gujaratiSynopsis || story.hindiSynopsis || story.synopsis,
      moral: story.gujaratiMoral || story.hindiMoral || story.moral || '',
      chapterTitle: ch?.gujaratiTitle || ch?.hindiTitle || ch?.title || '',
      chapterContent: ch?.gujaratiContent || ch?.hindiContent || ch?.content || story.synopsis,
    };
  }

  // 2. Marathi
  if (language === 'mr') {
    const multi = MULTILINGUAL_DATA[story.id]?.mr;
    if (multi) {
      return {
        title: multi.title,
        subtitle: multi.subtitle || story.subtitle || '',
        synopsis: multi.synopsis,
        moral: multi.moral,
        chapterTitle: (chapterIdx === 1 ? multi.chapter2Title : multi.chapter1Title) || multi.chapter1Title,
        chapterContent: (chapterIdx === 1 ? multi.chapter2Content : multi.chapter1Content) || multi.chapter1Content,
      };
    }
    return {
      title: story.marathiTitle || story.hindiTitle || story.title,
      subtitle: story.marathiSubtitle || story.hindiSubtitle || story.subtitle || '',
      synopsis: story.marathiSynopsis || story.hindiSynopsis || story.synopsis,
      moral: story.marathiMoral || story.hindiMoral || story.moral || '',
      chapterTitle: ch?.marathiTitle || ch?.hindiTitle || ch?.title || '',
      chapterContent: ch?.marathiContent || ch?.hindiContent || ch?.content || story.synopsis,
    };
  }

  // 3. Hindi
  if (language === 'hi') {
    return {
      title: story.hindiTitle || story.title,
      subtitle: story.hindiSubtitle || story.subtitle || '',
      synopsis: story.hindiSynopsis || story.synopsis,
      moral: story.hindiMoral || story.moral || '',
      chapterTitle: ch?.hindiTitle || ch?.title || '',
      chapterContent: ch?.hindiContent || ch?.content || story.synopsis,
    };
  }

  // 4. English default
  return {
    title: story.title,
    subtitle: story.subtitle || '',
    synopsis: story.synopsis,
    moral: story.moral || '',
    chapterTitle: ch?.title || '',
    chapterContent: ch?.content || story.synopsis,
  };
}

// 4. Pronunciation Normalizer for authentic Indian accents
export function normalizePronunciation(text: string, language: AppLanguage): string {
  if (!text) return '';
  // In English, ensure traditional names aren't mangled by flat Western phonetics
  if (language === 'en') {
    return text
      .replace(/\bBirbal\b/g, 'Beerbal')
      .replace(/\bTenali Raman\b/g, 'Tenalee Raaman')
      .replace(/\bPanchatantra\b/g, 'Punch-atantra')
      .replace(/\bKalu\b/g, 'Kaalu')
      .replace(/\bGomayu\b/g, 'Gomaayu')
      .replace(/\bVikramaditya\b/g, 'Vikram-aaditya')
      .replace(/\bBetal\b/g, 'Betaal')
      .replace(/\bVishnu Sharma\b/g, 'Vishnoo Sharma');
  }
  return text;
}

// 5. Intelligent Story Narration Segmenter
// Splits text into sentences and dialogue chunks, detecting speakers and calculating natural storytelling pauses
export function prepareNarrationSegments(
  text: string,
  intel: StoryIntelligence,
  moralText?: string
): StoryNarrationSegment[] {
  if (!text) return [];

  const segments: StoryNarrationSegment[] = [];
  const clean = text.replace(/\r\n/g, '\n').trim();

  // Regex splitting by sentences or dialogue quotes
  const rawSentences = clean.split(/(?<=[.!?।\n])\s+/);

  rawSentences.forEach((raw, idx) => {
    const s = raw.trim();
    if (!s) return;

    let speaker = 'Narrator';
    let pitch = intel.characterVoices['Narrator']?.pitch || 1.0;
    let rate = intel.narratorPace;
    let pauseAfterMs = 450;

    // Detect dialogue quotes
    const isQuote =
      (s.startsWith('"') && s.endsWith('"')) ||
      (s.startsWith('“') && s.endsWith('”')) ||
      (s.startsWith("'") && s.endsWith("'")) ||
      (s.startsWith('‘') && s.endsWith('’'));

    const sLower = s.toLowerCase();

    if (isQuote || sLower.includes('said') || sLower.includes('बोले') || sLower.includes('म्हणाले') || sLower.includes('કહ્યું')) {
      if (sLower.includes('akbar') || sLower.includes('अकबर') || sLower.includes('बादशाह')) {
        speaker = 'Emperor Akbar';
        pitch = intel.characterVoices['Emperor Akbar']?.pitch || 0.85;
        rate = intel.characterVoices['Emperor Akbar']?.rate || rate * 0.92;
        pauseAfterMs = 500;
      } else if (sLower.includes('birbal') || sLower.includes('बीरबल')) {
        speaker = 'Birbal';
        pitch = intel.characterVoices['Birbal']?.pitch || 1.08;
        rate = intel.characterVoices['Birbal']?.rate || rate * 1.04;
        pauseAfterMs = 480;
      } else if (sLower.includes('tenali') || sLower.includes('तेनाली')) {
        speaker = 'Tenali Raman';
        pitch = intel.characterVoices['Tenali Raman']?.pitch || 1.12;
        rate = intel.characterVoices['Tenali Raman']?.rate || rate * 1.06;
        pauseAfterMs = 450;
      } else if (sLower.includes('child') || sLower.includes('mini') || sLower.includes('बच्चे') || sLower.includes('કાલુ')) {
        speaker = 'Child character';
        pitch = intel.characterVoices['Child character']?.pitch || 1.25;
        rate = rate * 0.95;
        pauseAfterMs = 420;
      }
    }

    // Add extra pause for questions, exclamation, or end of paragraph
    if (s.endsWith('?') || s.endsWith('?')) {
      pauseAfterMs += 250;
    } else if (s.includes('...')) {
      pauseAfterMs += 350;
    }

    segments.push({
      id: `seg-${idx}`,
      text: s,
      speaker,
      pitch,
      rate,
      pauseAfterMs,
    });
  });

  // Append Moral with extra reflective pause
  if (moralText && moralText.trim().length > 0) {
    segments.push({
      id: `seg-moral`,
      text: moralText.trim(),
      speaker: 'Narrator',
      pitch: 0.95,
      rate: intel.narratorPace * 0.88,
      pauseAfterMs: 900,
      isMoral: true,
    });
  }

  return segments;
}

// 6. Voice Selection Strategy
export function selectBestVoiceForLanguage(
  voices: SpeechSynthesisVoice[],
  language: AppLanguage
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  if (language === 'hi') {
    return (
      voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('hi') ||
          v.name.toLowerCase().includes('hindi') ||
          v.name.toLowerCase().includes('kalpana') ||
          v.name.toLowerCase().includes('hemant')
      ) || null
    );
  }

  if (language === 'gu') {
    return (
      voices.find((v) => v.lang.toLowerCase().startsWith('gu') || v.name.toLowerCase().includes('gujarati')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('hi')) || // Fallback to Indian voice
      null
    );
  }

  if (language === 'mr') {
    return (
      voices.find((v) => v.lang.toLowerCase().startsWith('mr') || v.name.toLowerCase().includes('marathi')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('hi')) || // Fallback to Indian voice
      null
    );
  }

  if (language === 'en') {
    // Prefer Indian English voice for natural pronunciation of Indian names
    return (
      voices.find((v) => v.lang.toLowerCase() === 'en-in' || v.name.toLowerCase().includes('india')) ||
      voices.find((v) => v.lang.toLowerCase().startsWith('en')) ||
      null
    );
  }

  return voices[0] || null;
}

// 7. Smart Story Memory (Resume Story)
export function saveStoryMemory(state: Omit<SavedStoryState, 'lastUpdated'>) {
  try {
    const data: SavedStoryState = {
      ...state,
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save story memory:', e);
  }
}

export function loadStoryMemory(): SavedStoryState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function clearStoryMemory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }
}
