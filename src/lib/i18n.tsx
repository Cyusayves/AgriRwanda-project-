import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "rw" | "fr";

export const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "rw", label: "Kinyarwanda", short: "RW" },
  { code: "fr", label: "Français", short: "FR" },
];

const ORDER: Record<Lang, number> = { en: 0, rw: 1, fr: 2 };

/** [English, Kinyarwanda, French] */
const strings = {
  // --- Header / nav ---
  "nav.home": ["Home", "Ahabanza", "Accueil"],
  "nav.marketplace": ["Marketplace", "Isoko", "Marché"],
  "nav.prices": ["Market Prices", "Ibiciro by'isoko", "Prix du marché"],
  "nav.crops": ["Crops", "Ibihingwa", "Cultures"],
  "nav.weather": ["Weather", "Ikirere", "Météo"],
  "nav.knowledge": ["Knowledge", "Ubumenyi", "Savoirs"],
  "nav.experts": ["Experts", "Impuguke", "Experts"],
  "nav.about": ["About", "Abo turi bo", "À propos"],
  "nav.contact": ["Contact", "Twandikire", "Contact"],
  "nav.login": ["Log in", "Injira", "Connexion"],
  "nav.join": ["Join as a farmer", "Iyandikishe nk'umuhinzi", "Rejoindre comme agriculteur"],
  "nav.openMenu": ["Open menu", "Fungura menu", "Ouvrir le menu"],
  "nav.closeMenu": ["Close menu", "Funga menu", "Fermer le menu"],
  "nav.language": ["Language", "Ururimi", "Langue"],

  // --- Footer ---
  "footer.tagline": [
    "Empowering farmers. Connecting markets. Growing Rwanda. A digital agriculture ecosystem linking farmers, buyers, cooperatives, agro-dealers and experts.",
    "Guha imbaraga abahinzi. Guhuza amasoko. Guteza imbere u Rwanda. Urubuga rwa digitale ruhuza abahinzi, abaguzi, amakoperative, abacuruzi b'ibikoresho n'impuguke.",
    "Autonomiser les agriculteurs. Connecter les marchés. Faire grandir le Rwanda. Un écosystème agricole numérique reliant agriculteurs, acheteurs, coopératives, agro-dealers et experts.",
  ],
  "footer.platform": ["Platform", "Urubuga", "Plateforme"],
  "footer.support": ["Support", "Ubufasha", "Assistance"],
  "footer.marketplace": ["Marketplace", "Isoko", "Marché"],
  "footer.prices": ["Market prices", "Ibiciro by'isoko", "Prix du marché"],
  "footer.crops": ["Crop guides", "Amabwiriza y'ibihingwa", "Guides des cultures"],
  "footer.weather": ["Weather & calendar", "Ikirere na kalendari", "Météo et calendrier"],
  "footer.askExpert": ["Ask an expert", "Baza impuguke", "Demander à un expert"],
  "footer.knowledge": ["Knowledge center", "Ikigo cy'ubumenyi", "Centre de savoirs"],
  "footer.about": ["About AgriRwanda", "Ibyerekeye AgriRwanda", "À propos d'AgriRwanda"],
  "footer.contact": ["Contact & help", "Twandikire & ubufasha", "Contact et aide"],
  "footer.legal": [
    "AgriRwanda. Kinyarwanda · English · Français.",
    "AgriRwanda. Ikinyarwanda · Icyongereza · Igifaransa.",
    "AgriRwanda. Kinyarwanda · Anglais · Français.",
  ],

  // --- Home ---
  "home.badge": ["Empowering farmers", "Guha imbaraga abahinzi", "Autonomiser les agriculteurs"],
  "home.title": [
    "Rwanda's digital agriculture platform",
    "Urubuga rwa digitale rw'ubuhinzi mu Rwanda",
    "La plateforme agricole numérique du Rwanda",
  ],
  "home.subtitle": [
    "Manage your farm, sell to verified buyers, follow real market prices, check weather for your sector and get advice from agricultural experts — all in one place.",
    "Cunga umurima wawe, ugurishe ku baguzi bemejwe, ukurikire ibiciro nyabyo by'isoko, urebe ikirere cy'umurenge wawe kandi uhabwe inama z'impuguke — byose ahantu hamwe.",
    "Gérez votre ferme, vendez à des acheteurs vérifiés, suivez les vrais prix du marché, consultez la météo de votre secteur et recevez les conseils d'experts agricoles — en un seul endroit.",
  ],
  "home.exploreMarket": ["Explore marketplace", "Sura isoko", "Explorer le marché"],
  "home.findServices": [
    "Find agricultural services",
    "Shakisha serivisi z'ubuhinzi",
    "Trouver des services agricoles",
  ],
  "home.vp1.title": ["Sell without middlemen", "Gurisha nta bahuza", "Vendre sans intermédiaires"],
  "home.vp1.body": [
    "List crops, livestock and processed products and reach buyers, hotels, schools and exporters directly.",
    "Shyiraho ibihingwa, amatungo n'ibikomoka ku buhinzi ugere ku baguzi, hoteli, amashuri n'abohereza mu mahanga ku buryo butaziguye.",
    "Publiez cultures, bétail et produits transformés et atteignez directement acheteurs, hôtels, écoles et exportateurs.",
  ],
  "home.vp2.title": ["Know the real price", "Menya igiciro nyacyo", "Connaître le vrai prix"],
  "home.vp2.body": [
    "Wholesale and retail prices from markets across the country, updated with clear trend indicators.",
    "Ibiciro by'ubucuruzi bunini n'ubuciriritse biva mu masoko yo mu gihugu hose, bivugururwa n'ibimenyetso bigaragaza icyerekezo.",
    "Prix de gros et de détail des marchés du pays, mis à jour avec des indicateurs de tendance clairs.",
  ],
  "home.vp3.title": ["Ask a real expert", "Baza impuguke nyayo", "Demander à un vrai expert"],
  "home.vp3.body": [
    "Send a photo and a question, and receive guidance from agronomists and veterinary specialists.",
    "Ohereza ifoto n'ikibazo, uhabwe inama z'abahanga mu buhinzi n'abaganga b'amatungo.",
    "Envoyez une photo et une question, et recevez les conseils d'agronomes et de vétérinaires.",
  ],
  "home.featured": [
    "Featured products on the marketplace",
    "Ibicuruzwa byatoranyijwe ku isoko",
    "Produits en vedette sur le marché",
  ],
  "home.viewAll": ["View all products", "Reba ibicuruzwa byose", "Voir tous les produits"],
  "home.todayPrices": ["Today's market prices", "Ibiciro by'isoko by'uyu munsi", "Prix du marché du jour"],
  "home.allMarkets": ["All markets", "Amasoko yose", "Tous les marchés"],
  "home.weatherMusanze": ["Weather · Musanze", "Ikirere · Musanze", "Météo · Musanze"],
  "home.weatherNow": [
    "Light showers · humidity 78% · wind 9 km/h",
    "Imvura yoroheje · ubuhehere 78% · umuyaga 9 km/h",
    "Averses légères · humidité 78% · vent 9 km/h",
  ],
  "home.advisory": [
    "Advisory: heavy rain expected Sunday — delay fertilizer top-dressing.",
    "Inama: imvura nyinshi iteganyijwe ku cyumweru — tinza gushyira ifumbire yo hejuru.",
    "Avis : fortes pluies attendues dimanche — reportez l'apport d'engrais.",
  ],
  "home.fullForecast": [
    "Full forecast & farming calendar",
    "Iteganyagihe ryuzuye na kalendari y'ubuhinzi",
    "Prévisions complètes et calendrier agricole",
  ],
  "home.popularCrops": ["Popular crops in Rwanda", "Ibihingwa bikunzwe mu Rwanda", "Cultures populaires au Rwanda"],
  "home.allCropGuides": ["All crop guides", "Amabwiriza yose y'ibihingwa", "Tous les guides de cultures"],
  "home.featuredFarmer": ["Featured farmer", "Umuhinzi w'icyumweru", "Agriculteur à l'honneur"],
  "home.story.quote": [
    "\"I now sell my tomatoes before they leave the farm.\"",
    "\"Ubu ngurisha inyanya zanjye mbere y'uko zivamo umurima.\"",
    "« Je vends désormais mes tomates avant même qu'elles quittent la ferme. »",
  ],
  "home.story.body": [
    "Mukamana Alice farms 1.4 hectares in Bugesera. Since listing on AgriRwanda she supplies two Kigali hotels directly, checks Kimironko prices every morning and plans her planting around sector-level rainfall forecasts.",
    "Mukamana Alice ahinga hegitari 1.4 muri Bugesera. Kuva atangira gukoresha AgriRwanda, agemurira hoteli ebyiri i Kigali, akareba ibiciro bya Kimironko buri gitondo, kandi agatera akurikije iteganyagihe ry'umurenge we.",
    "Mukamana Alice cultive 1,4 hectare à Bugesera. Depuis son inscription sur AgriRwanda, elle fournit directement deux hôtels de Kigali, consulte les prix de Kimironko chaque matin et planifie ses semis selon les prévisions de pluie de son secteur.",
  ],
  "home.seeSelling": [
    "See what farmers are selling",
    "Reba ibyo abahinzi bacuruza",
    "Voir ce que vendent les agriculteurs",
  ],
  "home.learnSupport": [
    "Learn and get expert support",
    "Iga kandi uhabwe ubufasha bw'impuguke",
    "Apprendre et obtenir l'appui d'experts",
  ],
  "home.knowledgeCenter": ["Knowledge center", "Ikigo cy'ubumenyi", "Centre de savoirs"],
  "home.talkExpert": ["Talk to an expert", "Vugana n'impuguke", "Parler à un expert"],
  "home.askQuestion": ["Ask a question", "Baza ikibazo", "Poser une question"],
  "home.news": [
    "Agriculture news & upcoming events",
    "Amakuru y'ubuhinzi n'ibikorwa biri imbere",
    "Actualités agricoles et événements à venir",
  ],
  "home.cta.title": [
    "Your harvest deserves a fair market",
    "Umusaruro wawe ukwiye isoko ry'ubutabera",
    "Votre récolte mérite un marché équitable",
  ],
  "home.cta.body": [
    "Register your farm today and start selling to verified buyers across Rwanda.",
    "Iyandikishe umurima wawe uyu munsi utangire kugurisha ku baguzi bemejwe mu Rwanda hose.",
    "Enregistrez votre ferme aujourd'hui et vendez à des acheteurs vérifiés partout au Rwanda.",
  ],
  "home.cta.button": ["Create your free account", "Fungura konti yawe ku buntu", "Créez votre compte gratuit"],

  // --- Stats ---
  "stat.farmers": ["Registered farmers", "Abahinzi biyandikishije", "Agriculteurs enregistrés"],
  "stat.buyers": ["Verified buyers", "Abaguzi bemejwe", "Acheteurs vérifiés"],
  "stat.coops": ["Cooperatives", "Amakoperative", "Coopératives"],
  "stat.districts": ["Districts covered", "Uturere dukoreramo", "Districts couverts"],

  // --- Marketplace ---
  "mk.eyebrow": ["Marketplace", "Isoko", "Marché"],
  "mk.title": [
    "Buy directly from Rwandan farmers",
    "Gura wivanye ku bahinzi b'u Rwanda",
    "Achetez directement aux agriculteurs rwandais",
  ],
  "mk.desc": [
    "Fresh produce, livestock products and processed goods listed by verified farmers, cooperatives and agro-processors across all 30 districts.",
    "Umusaruro mushya, ibikomoka ku matungo n'ibitunganyijwe bishyirwaho n'abahinzi, amakoperative n'abatunganya bemejwe mu turere twose 30.",
    "Produits frais, produits d'élevage et biens transformés proposés par des agriculteurs, coopératives et transformateurs vérifiés dans les 30 districts.",
  ],
  "mk.searchLabel": [
    "Search products, districts or sellers",
    "Shakisha ibicuruzwa, uturere cyangwa abagurisha",
    "Rechercher produits, districts ou vendeurs",
  ],
  "mk.searchPlaceholder": [
    "Search maize, Musanze, cooperative…",
    "Shakisha ibigori, Musanze, koperative…",
    "Rechercher maïs, Musanze, coopérative…",
  ],
  "mk.all": ["All", "Byose", "Tous"],
  "mk.available": ["products available", "ibicuruzwa biboneka", "produits disponibles"],
  "mk.quantity": ["Quantity", "Ingano", "Quantité"],
  "mk.grade": ["Grade", "Urwego", "Qualité"],
  "mk.district": ["District", "Akarere", "District"],
  "mk.delivery": ["Delivery", "Itwara", "Livraison"],
  "mk.deliveryValue": ["Pickup or transport", "Kwitwarira cyangwa gutwarwa", "Retrait ou transport"],
  "mk.buy": ["Buy now", "Gura nonaha", "Acheter"],
  "mk.quote": ["Request quote", "Saba igiciro", "Demander un devis"],
  "mk.empty": [
    "No products match that search. Try another crop or district.",
    "Nta gicuruzwa gihuye n'ubushakashatsi. Gerageza ikindi gihingwa cyangwa akandi karere.",
    "Aucun produit ne correspond. Essayez une autre culture ou un autre district.",
  ],
  "mk.verified": ["Verified seller", "Umugurisha wemejwe", "Vendeur vérifié"],

  // --- Order / quote dialog ---
  "order.buyTitle": ["Place an order", "Tanga ikirango cy'ubugure", "Passer une commande"],
  "order.quoteTitle": ["Request a quote", "Saba igiciro", "Demander un devis"],
  "order.qty": ["Quantity you need", "Ingano ukeneye", "Quantité souhaitée"],
  "order.qtyPlaceholder": ["e.g. 500 kg", "urugero: kg 500", "ex. 500 kg"],
  "order.name": ["Your name", "Amazina yawe", "Votre nom"],
  "order.email": ["Your email", "Imeyili yawe", "Votre e-mail"],
  "order.phone": ["Your phone", "Telefone yawe", "Votre téléphone"],
  "order.note": ["Message to the seller (optional)", "Ubutumwa ku mugurisha (si ngombwa)", "Message au vendeur (facultatif)"],
  "order.submitBuy": ["Confirm order", "Emeza ubugure", "Confirmer la commande"],
  "order.submitQuote": ["Send request", "Ohereza icyifuzo", "Envoyer la demande"],
  "order.cancel": ["Cancel", "Hagarika", "Annuler"],
  "order.successBuy": [
    "Order sent to the seller. They will confirm availability shortly.",
    "Ubugure bwoherejwe ku mugurisha. Bagiye kwemeza ko bihari vuba.",
    "Commande envoyée au vendeur. Il confirmera la disponibilité sous peu.",
  ],
  "order.successQuote": [
    "Quote request sent. Expect a price offer within 24 hours.",
    "Icyifuzo cy'igiciro cyoherejwe. Utegereze igiciro mu masaha 24.",
    "Demande de devis envoyée. Vous recevrez une offre sous 24 heures.",
  ],

  // --- Market prices ---
  "pr.eyebrow": ["Market prices", "Ibiciro by'isoko", "Prix du marché"],
  "pr.title": ["Know the price before you sell", "Menya igiciro mbere yo kugurisha", "Connaissez le prix avant de vendre"],
  "pr.desc": [
    "Wholesale and retail prices collected from major markets across Rwanda, updated daily with trend indicators so you can time your sale.",
    "Ibiciro by'ubucuruzi bunini n'ubuciriritse biva mu masoko manini yo mu Rwanda, bivugururwa buri munsi n'ibimenyetso by'icyerekezo kugira ngo umenye igihe cyo kugurisha.",
    "Prix de gros et de détail des grands marchés du Rwanda, mis à jour quotidiennement avec des indicateurs de tendance.",
  ],
  "pr.product": ["Product", "Igicuruzwa", "Produit"],
  "pr.market": ["Market", "Isoko", "Marché"],
  "pr.wholesale": ["Wholesale", "Ubucuruzi bunini", "Gros"],
  "pr.retail": ["Retail", "Ubuciriritse", "Détail"],
  "pr.trend": ["Trend", "Icyerekezo", "Tendance"],
  "pr.caption": [
    "Wholesale and retail agricultural prices by market and district",
    "Ibiciro by'ubuhinzi ku isoko no ku karere",
    "Prix agricoles de gros et de détail par marché et district",
  ],
  "pr.note": [
    "Prices are indicative and collected from market monitors. Always confirm with the buyer before finalising a sale.",
    "Ibiciro ni iby'urugero bikusanywa n'abakurikirana amasoko. Buri gihe wemeze n'umuguzi mbere yo gusoza ubucuruzi.",
    "Les prix sont indicatifs et collectés par des observateurs de marché. Confirmez toujours avec l'acheteur.",
  ],

  // --- Crops ---
  "cr.eyebrow": ["Crops", "Ibihingwa", "Cultures"],
  "cr.title": ["Grow the right crop, the right way", "Hinga igihingwa gikwiye, mu buryo bukwiye", "Cultivez la bonne culture, de la bonne façon"],
  "cr.desc": [
    "Region-specific guidance on land preparation, planting periods, soil and fertilizer needs, pest management and harvesting for Rwanda's main crops.",
    "Inama zihariye ku turere ku gutegura ubutaka, ibihe byo gutera, ubutaka n'ifumbire, kurwanya udukoko no gusarura ibihingwa by'ingenzi mu Rwanda.",
    "Conseils par région : préparation du sol, périodes de semis, besoins en engrais, gestion des ravageurs et récolte.",
  ],
  "cr.season": ["Season", "Igihembwe", "Saison"],
  "cr.regions": ["Suitable regions", "Uturere bikundira", "Régions adaptées"],
  "cr.soil": ["Soil", "Ubutaka", "Sol"],
  "cr.yield": ["Typical yield", "Umusaruro usanzwe", "Rendement typique"],

  // --- Weather ---
  "we.eyebrow": ["Weather", "Ikirere", "Météo"],
  "we.title": ["Plan your farming around the sky", "Tegura ubuhinzi ukurikije ikirere", "Planifiez vos travaux selon le ciel"],
  "we.desc": [
    "Current conditions, seven-day forecasts and agricultural alerts, paired with a farming calendar that tells you what to do this week.",
    "Uko ikirere kimeze ubu, iteganyagihe ry'iminsi irindwi n'imiburo y'ubuhinzi, hamwe na kalendari ikubwira icyo gukora muri iki cyumweru.",
    "Conditions actuelles, prévisions à sept jours et alertes agricoles, avec un calendrier des travaux de la semaine.",
  ],
  "we.district": ["Musanze District", "Akarere ka Musanze", "District de Musanze"],
  "we.cond": ["Light showers, feels like 20°C", "Imvura yoroheje, byumvikana nka 20°C", "Averses légères, ressenti 20°C"],
  "we.humidity": ["Humidity", "Ubuhehere", "Humidité"],
  "we.wind": ["Wind", "Umuyaga", "Vent"],
  "we.rainfall": ["Rainfall", "Imvura yaguye", "Précipitations"],
  "we.alert": [
    "Heavy rain warning for Sunday in the Northern Province. Postpone spraying and fertilizer application, and check drainage channels.",
    "Imiburo y'imvura nyinshi ku cyumweru mu Ntara y'Amajyaruguru. Tinza gutera imiti n'ifumbire, kandi usuzume imiyoboro y'amazi.",
    "Alerte de fortes pluies dimanche dans la Province du Nord. Reportez les traitements et l'engrais, vérifiez le drainage.",
  ],
  "we.forecast": ["7-day forecast", "Iteganyagihe ry'iminsi 7", "Prévisions sur 7 jours"],
  "we.rain": ["Rain", "Imvura", "Pluie"],
  "we.calendar": ["Farming calendar", "Kalendari y'ubuhinzi", "Calendrier agricole"],
  "we.c1.period": ["Now – 25 Aug", "Ubu – 25 Kanama", "Maintenant – 25 août"],
  "we.c1.task": ["Land preparation for Season A", "Gutegura ubutaka bw'igihembwe A", "Préparation des terres saison A"],
  "we.c1.detail": [
    "Plough and incorporate organic manure while soils are still workable.",
    "Hinga kandi uvange ifumbire y'imborera mu gihe ubutaka bukiri bworoshye.",
    "Labourez et incorporez du fumier tant que le sol est travaillable.",
  ],
  "we.c2.period": ["26 Aug – 15 Sep", "26 Kanama – 15 Nzeri", "26 août – 15 sept."],
  "we.c2.task": ["Seed and input purchase", "Kugura imbuto n'ifumbire", "Achat de semences et intrants"],
  "we.c2.detail": [
    "Order certified maize and bean seed from a verified agro-dealer.",
    "Tumiza imbuto z'ibigori n'ibishyimbo zemewe ku mucuruzi wemejwe.",
    "Commandez des semences certifiées de maïs et haricot chez un agro-dealer vérifié.",
  ],
  "we.c3.period": ["Mid Sep – Oct", "Hagati ya Nzeri – Ukwakira", "Mi-sept. – oct."],
  "we.c3.task": ["Planting Season A", "Gutera igihembwe A", "Semis saison A"],
  "we.c3.detail": [
    "Plant with the first reliable rains; apply DAP at planting.",
    "Tera iyo imvura ya mbere ihamye igwa; shyiraho DAP igihe utera.",
    "Semez aux premières pluies fiables ; appliquez du DAP au semis.",
  ],
  "we.c4.period": ["Nov", "Ugushyingo", "Nov."],
  "we.c4.task": ["Top-dressing & weeding", "Gushyira ifumbire yo hejuru no kubagara", "Engrais de couverture et sarclage"],
  "we.c4.detail": [
    "Apply urea after the first weeding, when soil moisture is good.",
    "Shyiraho urea nyuma yo kubagara bwa mbere, iyo ubutaka bufite ubuhehere buhagije.",
    "Appliquez l'urée après le premier sarclage, quand le sol est humide.",
  ],

  // --- Knowledge ---
  "kn.eyebrow": ["Knowledge center", "Ikigo cy'ubumenyi", "Centre de savoirs"],
  "kn.title": [
    "Practical farming knowledge, simply explained",
    "Ubumenyi bufatika bw'ubuhinzi, busobanurwa mu buryo bworoshye",
    "Des savoirs agricoles pratiques, simplement expliqués",
  ],
  "kn.desc": [
    "Short guides, videos, audio lessons and downloadable materials covering modern farming, climate-smart agriculture, livestock and agribusiness.",
    "Amabwiriza magufi, amashusho, amasomo y'amajwi n'inyandiko zishobora gukurwaho ku buhinzi bugezweho, ubuhinzi burengera ikirere, ubworozi n'ubucuruzi bw'ubuhinzi.",
    "Guides courts, vidéos, leçons audio et documents téléchargeables sur l'agriculture moderne, climato-intelligente, l'élevage et l'agribusiness.",
  ],

  // --- Experts ---
  "ex.eyebrow": ["Experts", "Impuguke", "Experts"],
  "ex.title": [
    "Get advice from agricultural specialists",
    "Habwa inama z'abahanga mu buhinzi",
    "Recevez les conseils de spécialistes agricoles",
  ],
  "ex.desc": [
    "Describe your problem, add a photo of the affected crop or animal, and a verified expert will respond with practical guidance.",
    "Sobanura ikibazo cyawe, wongereho ifoto y'igihingwa cyangwa itungo byangiritse, impuguke yemejwe izaguha inama zifatika.",
    "Décrivez votre problème, ajoutez une photo de la culture ou de l'animal concerné, et un expert vérifié vous répondra.",
  ],
  "ex.answers": ["answers", "ibisubizo", "réponses"],
  "ex.formTitle": ["Ask your question", "Baza ikibazo cyawe", "Posez votre question"],
  "ex.formLabel": ["What is happening on your farm?", "Ni iki kibera mu murima wawe?", "Que se passe-t-il dans votre exploitation ?"],
  "ex.placeholder": [
    "e.g. My bean leaves have yellow spots two weeks after planting…",
    "urugero: amababi y'ibishyimbo afite ibibara by'umuhondo nyuma y'ibyumweru bibiri…",
    "ex. mes feuilles de haricot ont des taches jaunes deux semaines après le semis…",
  ],
  "ex.photo": ["Add a photo (optional)", "Ongeraho ifoto (si ngombwa)", "Ajouter une photo (facultatif)"],
  "ex.send": ["Send to an expert", "Ohereza ku mpuguke", "Envoyer à un expert"],
  "ex.sent": [
    "Question sent — an expert will reply within 24 hours.",
    "Ikibazo cyoherejwe — impuguke izasubiza mu masaha 24.",
    "Question envoyée — un expert répondra sous 24 heures.",
  ],

  // --- About ---
  "ab.eyebrow": ["About us", "Abo turi bo", "À propos"],
  "ab.title": [
    "A digital agricultural ecosystem for Rwanda",
    "Urwego rwa digitale rw'ubuhinzi mu Rwanda",
    "Un écosystème agricole numérique pour le Rwanda",
  ],
  "ab.desc": [
    "AgriRwanda brings the whole value chain into one place: production, marketplace, buyers, payments and delivery, supported by weather, soil, knowledge and expert advice.",
    "AgriRwanda ihuriza hamwe urunigi rwose rw'agaciro: umusaruro, isoko, abaguzi, kwishyura no gutanga, bishyigikiwe n'ikirere, ubutaka, ubumenyi n'inama z'impuguke.",
    "AgriRwanda réunit toute la chaîne de valeur : production, marché, acheteurs, paiements et livraison, appuyés par la météo, le sol, les savoirs et les experts.",
  ],
  "ab.mission": ["Our mission", "Intego yacu", "Notre mission"],
  "ab.missionBody": [
    "Give every Rwandan farmer fair market access, reliable information and professional support, whatever the size of their plot.",
    "Guha buri muhinzi w'u Rwanda uburyo bwo kugera ku isoko mu buringanire, amakuru yizewe n'ubufasha bw'inzobere, uko umurima we wangana kose.",
    "Offrir à chaque agriculteur rwandais un accès équitable au marché, une information fiable et un appui professionnel, quelle que soit la taille de sa parcelle.",
  ],
  "ab.how": ["How it works", "Uko bikora", "Comment ça marche"],
  "ab.howBody": [
    "Farmer → production → marketplace → buyer → payment → delivery, with weather, soil, prices and expert guidance at every step.",
    "Umuhinzi → umusaruro → isoko → umuguzi → kwishyura → gutanga, hamwe n'ikirere, ubutaka, ibiciro n'inama z'impuguke muri buri ntambwe.",
    "Agriculteur → production → marché → acheteur → paiement → livraison, avec météo, sol, prix et conseils à chaque étape.",
  ],
  "ab.low": ["Built for low connectivity", "Yubakiwe aho interineti idahagije", "Conçu pour les faibles connexions"],
  "ab.lowBody": [
    "Light pages, compressed images and email or SMS notifications so the platform works well on basic smartphones and slow networks.",
    "Amapaji yoroheje, amafoto yagabanyijwe n'ubutumwa bwa imeyili cyangwa SMS kugira ngo urubuga rukore neza kuri telefone zisanzwe n'umurongo udakomeye.",
    "Pages légères, images compressées et notifications e-mail ou SMS pour fonctionner sur smartphones basiques et réseaux lents.",
  ],
  "ab.who": ["Who uses AgriRwanda", "Abakoresha AgriRwanda", "Qui utilise AgriRwanda"],
  "ab.r1": ["Farmers", "Abahinzi", "Agriculteurs"],
  "ab.r1d": [
    "Register a farm, manage crops and livestock, and sell produce.",
    "Kwiyandikisha umurima, gucunga ibihingwa n'amatungo, no kugurisha umusaruro.",
    "Enregistrer une ferme, gérer cultures et bétail, et vendre la production.",
  ],
  "ab.r2": ["Buyers", "Abaguzi", "Acheteurs"],
  "ab.r2d": [
    "Restaurants, supermarkets, schools, hotels, exporters and processors.",
    "Resitora, amaduka manini, amashuri, hoteli, abohereza mu mahanga n'abatunganya.",
    "Restaurants, supermarchés, écoles, hôtels, exportateurs et transformateurs.",
  ],
  "ab.r3": ["Cooperatives", "Amakoperative", "Coopératives"],
  "ab.r3d": [
    "Aggregate member production and negotiate larger contracts.",
    "Guhuza umusaruro w'abanyamuryango no kuganira amasezerano manini.",
    "Regrouper la production des membres et négocier de plus gros contrats.",
  ],
  "ab.r4": ["Agro-dealers", "Abacuruza ibikoresho by'ubuhinzi", "Agro-dealers"],
  "ab.r4d": [
    "Verified sellers of seeds, fertilizer, feeds, tools and equipment.",
    "Abagurisha bemejwe b'imbuto, ifumbire, ibiryo by'amatungo n'ibikoresho.",
    "Vendeurs vérifiés de semences, engrais, aliments et équipements.",
  ],
  "ab.r5": ["Experts", "Impuguke", "Experts"],
  "ab.r5d": [
    "Agronomists, vets, soil and irrigation specialists giving advice.",
    "Abahanga mu buhinzi, abaganga b'amatungo, abahanga mu butaka no kuhira batanga inama.",
    "Agronomes, vétérinaires, spécialistes du sol et de l'irrigation.",
  ],
  "ab.r6": ["Transporters", "Abatwara ibicuruzwa", "Transporteurs"],
  "ab.r6d": [
    "Verified vehicles moving produce from farm to buyer.",
    "Ibinyabiziga byemejwe bitwara umusaruro uva ku murima ujya ku muguzi.",
    "Véhicules vérifiés acheminant la production de la ferme à l'acheteur.",
  ],

  // --- Contact / registration / verification ---
  "ct.eyebrow": ["Join & contact", "Kwiyandikisha & twandikire", "Inscription et contact"],
  "ct.title": ["Create your AgriRwanda account", "Fungura konti yawe ya AgriRwanda", "Créez votre compte AgriRwanda"],
  "ct.desc": [
    "Register in a few minutes. After email verification, farmers can list products and buyers can start ordering.",
    "Iyandikishe mu minota mike. Nyuma yo kwemeza imeyili, abahinzi bashobora gushyiraho ibicuruzwa, abaguzi bagatangira gutumiza.",
    "Inscrivez-vous en quelques minutes. Après la vérification de l'e-mail, les agriculteurs peuvent publier des produits et les acheteurs commander.",
  ],
  "ct.registration": ["Registration", "Kwiyandikisha", "Inscription"],
  "ct.fullname": ["Full name", "Amazina yombi", "Nom complet"],
  "ct.phone": ["Phone number", "Nimero ya telefone", "Numéro de téléphone"],
  "ct.email": ["Email (Gmail or any address)", "Imeyili (Gmail cyangwa iyindi)", "E-mail (Gmail ou autre)"],
  "ct.iam": ["I am a", "Ndi", "Je suis"],
  "ct.province": ["Province", "Intara", "Province"],
  "ct.district": ["District", "Akarere", "District"],
  "ct.sector": ["Sector", "Umurenge", "Secteur"],
  "ct.farmsize": ["Farm size (ha)", "Ubuso bw'umurima (ha)", "Taille de la ferme (ha)"],
  "ct.crops": ["Main crops or livestock", "Ibihingwa cyangwa amatungo by'ibanze", "Cultures ou élevage principaux"],
  "ct.cropsPlaceholder": [
    "Irish potatoes, climbing beans, 2 dairy cows",
    "Ibirayi, ibishyimbo bitera, inka 2 z'amata",
    "Pommes de terre, haricots grimpants, 2 vaches laitières",
  ],
  "ct.register": ["Register", "Iyandikishe", "S'inscrire"],
  "ct.emailInvalid": [
    "Enter a valid email address, e.g. name@gmail.com",
    "Andika imeyili yemewe, urugero: izina@gmail.com",
    "Saisissez une adresse e-mail valide, ex. nom@gmail.com",
  ],
  "ct.verifyTitle": ["Verify your email", "Emeza imeyili yawe", "Vérifiez votre e-mail"],
  "ct.verifySent": [
    "We sent a 6-digit verification code to",
    "Twohereje kode y'imibare 6 kuri",
    "Nous avons envoyé un code à 6 chiffres à",
  ],
  "ct.codeLabel": ["Verification code", "Kode yo kwemeza", "Code de vérification"],
  "ct.verify": ["Verify email", "Emeza imeyili", "Vérifier l'e-mail"],
  "ct.resend": ["Resend code", "Ongera wohereze kode", "Renvoyer le code"],
  "ct.changeEmail": ["Use another email", "Koresha indi meyili", "Utiliser un autre e-mail"],
  "ct.codeWrong": [
    "That code is not correct. Check the code and try again.",
    "Iyo kode si yo. Reba kode wongere ugerageze.",
    "Ce code est incorrect. Vérifiez-le et réessayez.",
  ],
  "ct.codeExpired": [
    "The code expired. Request a new one.",
    "Kode yarangiye igihe. Saba indi nshya.",
    "Le code a expiré. Demandez-en un nouveau.",
  ],
  "ct.codeResent": ["A new code was sent.", "Kode nshya yoherejwe.", "Un nouveau code a été envoyé."],
  "ct.verified": [
    "Email verified — your AgriRwanda account is active.",
    "Imeyili yemejwe — konti yawe ya AgriRwanda irakora.",
    "E-mail vérifié — votre compte AgriRwanda est actif.",
  ],
  "ct.demoCode": [
    "Demo mode: your verification code is",
    "Uburyo bw'igerageza: kode yawe yo kwemeza ni",
    "Mode démo : votre code de vérification est",
  ],
  "ct.doneTitle": ["Account verified", "Konti yemejwe", "Compte vérifié"],
  "ct.doneBody": [
    "You can now list products on the marketplace and contact buyers.",
    "Ubu ushobora gushyira ibicuruzwa ku isoko no kuvugana n'abaguzi.",
    "Vous pouvez maintenant publier des produits et contacter des acheteurs.",
  ],
  "ct.goMarketplace": ["Go to the marketplace", "Jya ku isoko", "Aller au marché"],
  "ct.registerAnother": ["Register another account", "Iyandikishe indi konti", "Inscrire un autre compte"],
  "ct.support": ["Support & help center", "Ubufasha n'ikigo cy'ubufasha", "Assistance et centre d'aide"],
  "ct.hours": ["(Mon – Sat, 7:00 – 19:00)", "(Kuwa mbere – Kuwa gatandatu, 7:00 – 19:00)", "(lun – sam, 7h00 – 19h00)"],
  "ct.supportNote": [
    "Support is available in Kinyarwanda, English and French. Farmers without internet can request price and weather updates by SMS.",
    "Ubufasha buboneka mu Kinyarwanda, Icyongereza n'Igifaransa. Abahinzi badafite interineti bashobora gusaba ibiciro n'ikirere kuri SMS.",
    "L'assistance est disponible en kinyarwanda, anglais et français. Les agriculteurs sans internet peuvent recevoir prix et météo par SMS.",
  ],
  "role.farmer": ["Farmer", "Umuhinzi", "Agriculteur"],
  "role.buyer": ["Buyer", "Umuguzi", "Acheteur"],
  "role.coop": ["Cooperative", "Koperative", "Coopérative"],
  "role.dealer": ["Agro-dealer", "Umucuruzi w'ibikoresho", "Agro-dealer"],
  "role.expert": ["Expert", "Impuguke", "Expert"],
  "role.transporter": ["Transporter", "Utwara ibicuruzwa", "Transporteur"],
  "prov.kigali": ["Kigali City", "Umujyi wa Kigali", "Ville de Kigali"],
  "prov.north": ["Northern", "Amajyaruguru", "Nord"],
  "prov.south": ["Southern", "Amajyepfo", "Sud"],
  "prov.east": ["Eastern", "Iburasirazuba", "Est"],
  "prov.west": ["Western", "Iburengerazuba", "Ouest"],

  // --- Categories ---
  "cat.Vegetables": ["Vegetables", "Imboga", "Légumes"],
  "cat.Cereals": ["Cereals", "Ibinyampeke", "Céréales"],
  "cat.Legumes": ["Legumes", "Ibinyamisogwe", "Légumineuses"],
  "cat.Cash crops": ["Cash crops", "Ibihingwa ngengabukungu", "Cultures de rente"],
  "cat.Livestock": ["Livestock", "Amatungo", "Élevage"],
  "cat.Poultry": ["Poultry", "Inkoko", "Volaille"],
  "cat.Processed": ["Processed", "Ibitunganyijwe", "Transformés"],
  "cat.Fruits": ["Fruits", "Imbuto", "Fruits"],

  // --- Login ---
  "lg.title": ["Log in to AgriRwanda", "Injira muri AgriRwanda", "Connexion à AgriRwanda"],
  "lg.eyebrow": ["Account access", "Kwinjira kuri konti", "Accès au compte"],
  "lg.desc": [
    "Sign in with the email you registered with. We send a 6-digit code to your inbox — no password to remember.",
    "Injira ukoresheje imeyili wiyandikishijeho. Twohereza kode y'imibare 6 muri imeyili yawe — nta jambobanga rikenewe.",
    "Connectez-vous avec l'e-mail utilisé lors de l'inscription. Nous envoyons un code à 6 chiffres — aucun mot de passe à retenir.",
  ],
  "lg.email": ["Email address", "Aderesi ya imeyili", "Adresse e-mail"],
  "lg.sendCode": ["Send login code", "Ohereza kode yo kwinjira", "Envoyer le code"],
  "lg.codeSent": ["We sent a 6-digit code to", "Twohereje kode y'imibare 6 kuri", "Nous avons envoyé un code à 6 chiffres à"],
  "lg.signIn": ["Sign in", "Injira", "Se connecter"],
  "lg.welcome": ["Welcome back", "Murakaza neza", "Bon retour"],
  "lg.loggedIn": ["You are signed in.", "Winjiye neza.", "Vous êtes connecté."],
  "lg.logout": ["Log out", "Sohoka", "Déconnexion"],
  "lg.noAccount": ["Don't have an account?", "Nta konti ufite?", "Pas encore de compte ?"],
  "lg.createOne": ["Create one", "Fungura konti", "En créer un"],
  "lg.emailInvalid": [
    "Enter a valid email address (for example name@gmail.com).",
    "Andika imeyili yemewe (urugero: izina@gmail.com).",
    "Saisissez une adresse e-mail valide (par exemple nom@gmail.com).",
  ],
} as const;

export type TKey = keyof typeof strings;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: TKey) => string };

const I18nContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "agrirwanda.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && saved in ORDER) setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: TKey) => {
      const entry = strings[key] as readonly string[] | undefined;
      if (!entry) return key;
      return entry[ORDER[lang]] ?? entry[0] ?? key;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}

/** Translate a category coming from the data layer, falling back to the raw value. */
export function translateCategory(t: (k: TKey) => string, category: string) {
  const key = `cat.${category}` as TKey;
  const translated = t(key);
  return translated === key ? category : translated;
}
