import { Attraction, FoodDish, TicketPackage } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_louisland_park_1791983071690.jpg';
export const PARKOUR_IMAGE = '/src/assets/images/louisland_parkour_park_1791983888184.jpg';
export const LOOPING_IMAGE = '/src/assets/images/louisland_looping_challenge_1791983889951.jpg';
export const SALLY_LAND_IMAGE = '/src/assets/images/louisland_sally_land_1791983890116.jpg';
export const RESTAURANT_IMAGE = '/src/assets/images/louisland_restaurant_food_1791983889737.jpg';
export const HYPERCOASTER_IMAGE = '/src/assets/images/louisland_hypercoaster_1791983074769.jpg';
export const CASTLE_IMAGE = '/src/assets/images/louisland_magical_castle_1791983074719.jpg';

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'parkour-parc',
    name: 'Le Parkour Parc',
    category: 'parkour',
    categoryLabel: 'Parkour & Modules',
    description: 'Immense terrain acrobatique équipé d\'une multitude de modules de parkour : rampes de franchissement, murs d\'escalade et de wall run, barres de traction, trampolines géants et fosses en mousse sécurisées pour tous les niveaux.',
    image: PARKOUR_IMAGE,
    minHeight: 'Dès 6 ans (tous niveaux)',
    thrillLevel: 4,
    waitTime: 'Accès continu',
    zone: 'District Parkour',
    featured: true,
  },
  {
    id: 'looping-challenge',
    name: 'Le Looping Challenge',
    category: 'thrill',
    categoryLabel: 'Figures de Parkour',
    description: 'La montagne russe spectaculaire inspirée des cascades de parkour ! Enchaînez les saltos, vrilles aériennes et 5 loopings géants reproduisant les acrobaties ultimes : le Monkey Vault, le Side Flip et les sauts de précision.',
    image: LOOPING_IMAGE,
    minHeight: '1m35 minimum',
    thrillLevel: 5,
    waitTime: '20 min',
    zone: 'Arène Acrobatique',
    featured: true,
  },
  {
    id: 'sally-land',
    name: 'Sally Land : Le Paradis des Goldens',
    category: 'family',
    categoryLabel: 'Attractions & Chiens Golden',
    description: 'Un monde enchanteur entièrement dédié aux adorables Golden Retrievers ! Embarquez sur le carrousel féerique de Sally, amusez-vous avec les fontaines d\'eau interactives et partagez des instants câlins et d\'agility avec nos affectueux Goldens.',
    image: SALLY_LAND_IMAGE,
    minHeight: 'Accessible à tous',
    thrillLevel: 1,
    waitTime: '5 min',
    zone: 'Sally Land',
    featured: true,
  },
  {
    id: 'resto-plats-preferes',
    name: 'Le Restaurant des Plats Préférés',
    category: 'food',
    categoryLabel: 'Burgers & Desserts',
    description: 'L\'adresse gourmande officielle de Louisland avec une carte 100% dédiée à vos plats préférés : burgers gourmets artisanaux avec frites croustillantes, la mythique Dame Blanche au chocolat chaud et l\'incontournable Île Flottante au caramel doré.',
    image: RESTAURANT_IMAGE,
    minHeight: 'Tout public',
    thrillLevel: 1,
    waitTime: 'Sans réservation',
    zone: 'Terrasse Gourmande',
    featured: true,
  },
  {
    id: 'colosse-louis',
    name: 'Le Colosse de Louisland',
    category: 'thrill',
    categoryLabel: 'Sensations fortes',
    description: 'Notre montagne russe légendaire : descente vertigineuse de 55 mètres à 110 km/h au milieu des cascades rocheuses.',
    image: HYPERCOASTER_IMAGE,
    minHeight: '1m30',
    thrillLevel: 5,
    waitTime: '15 min',
    zone: 'La Vallée des Épées',
  },
  {
    id: 'royaume-chateau',
    name: 'Le Château & Jardins Féeriques',
    category: 'family',
    categoryLabel: 'Familiale & Féerie',
    description: 'Une immersion poétique au cœur du château majestueux de Louisland et de ses fontaines dansantes illuminées de mille feux.',
    image: CASTLE_IMAGE,
    minHeight: 'Accessible à tous',
    thrillLevel: 1,
    waitTime: 'En continu',
    zone: 'Cité Merveilleuse',
  },
];

export const FAVORITE_DISHES: FoodDish[] = [
  {
    id: 'burger-gourmet',
    name: 'Le Burger Gourmet de Louis',
    type: 'Burger',
    description: 'Pain brioché toasté, bœuf façon bouchère sélectionné, cheddar affiné fondant, bacon croustillant, oignons confits au caramel et sauce spéciale Louisland, servi avec frites dorées.',
    price: '15,50 €',
    badge: 'Plat signature',
  },
  {
    id: 'dame-blanche',
    name: 'La Dame Blanche Légendaire',
    type: 'Glace',
    description: 'Trois généreuses boules de glace vanille bourbon intense de Madagascar, sauce chocolat noir fondu tiède versée minute, nuage de chantilly maison et amandes grillées effilées.',
    price: '7,90 €',
    badge: 'Incontournable',
  },
  {
    id: 'ile-flottante',
    name: 'L\'Île Flottante Fondante',
    type: 'Dessert',
    description: 'Blancs d\'œufs vaporeux pochés à la perfection, déposés sur un lit de crème anglaise onctueuse à la vraie vanille, nappés d\'un filet de caramel au beurre doux et nougatine croquante.',
    price: '7,50 €',
    badge: 'Délice artisanal',
  },
  {
    id: 'menu-complet',
    name: 'Le Menu Favoris de Louis (Trio Gourmand)',
    type: 'Burger',
    description: 'Le Burger Gourmet + Grande portion de frites croustillantes + Boisson fraîche 50cl + Votre dessert au choix : La Dame Blanche OU L\'Île Flottante.',
    price: '21,90 €',
    badge: 'Formule préférée',
  },
];

export const TICKET_PACKAGES: TicketPackage[] = [
  {
    id: 'standard-day',
    name: 'Billet Journée Découverte',
    subtitle: 'Accès illimité à toutes les attractions',
    priceAdult: 44,
    priceChild: 34,
    popular: false,
    features: [
      'Accès illimité au Parkour Parc & Looping Challenge',
      'Accès illimité à l\'univers Sally Land (Golden Retrievers)',
      'Tous les spectacles et animations du château inclus',
      'Annulation gratuite jusqu\'à 48h avant la visite',
      'Gratuit pour les enfants de moins de 3 ans',
    ],
  },
  {
    id: 'fastpass-day',
    name: 'Pass Frissons & Émotion',
    subtitle: 'La journée parfaite avec coupe-file',
    priceAdult: 59,
    priceChild: 46,
    popular: true,
    features: [
      'Tout le contenu du Billet Découverte',
      'Coupe-file FastPass pour le Looping Challenge et les coasters',
      'Accès prioritaire aux modules experts du Parkour Parc',
      '1 bon de réduction de 10% au Restaurant des Plats Préférés',
      'Billet 100% digital sur smartphone',
    ],
  },
  {
    id: 'vip-pass',
    name: 'Pass Ultime Louisland VIP',
    subtitle: 'Expérience sans attente et services privilégiés',
    priceAdult: 89,
    priceChild: 69,
    popular: false,
    features: [
      'Accès illimité FastPass sur TOUTES les attractions',
      'Session privilégiée VIP à Sally Land avec les Goldens',
      'Place réservée au Restaurant des Plats Préférés',
      'Parking premium offert à l\'entrée',
      'Photo souvenir collector offerte',
    ],
  },
];

export const PARK_SCHEDULES = [
  { day: 'Lundi', hours: '10:00 - 20:00', status: 'Ouvert', crowd: 'Calme' },
  { day: 'Mardi', hours: '10:00 - 20:00', status: 'Ouvert', crowd: 'Calme' },
  { day: 'Mercredi', hours: '10:00 - 20:00', status: 'Ouvert', crowd: 'Affluence modérée' },
  { day: 'Jeudi', hours: '10:00 - 20:00', status: 'Ouvert', crowd: 'Calme' },
  { day: 'Vendredi', hours: '10:00 - 21:00', status: 'Ouvert (Nocturne)', crowd: 'Affluence modérée' },
  { day: 'Samedi', hours: '09:30 - 22:00', status: 'Ouvert (Grande Nocturne)', crowd: 'Forte affluence' },
  { day: 'Dimanche', hours: '09:30 - 21:00', status: 'Ouvert', crowd: 'Affluence modérée' },
];

export const PRACTICAL_TIPS = [
  {
    title: 'Le Parkour Parc en toute sécurité',
    description: 'Chaussures de sport obligatoires. Encadrement par des moniteurs diplômés et zones sécurisées par des fosses en mousse.',
  },
  {
    title: 'Sally Land & Nos Amis les Chiens',
    description: 'Espace bienveillant encadré par des soigneurs canins. Eau fraîche et zones d\'ombre pour le bien-être des Golden Retrievers.',
  },
  {
    title: 'Restaurant des Plats Préférés',
    description: 'Service continu de 11h30 à 21h00. Burgers cuits à la minute, Dames Blanches et Îles Flottantes préparées artisanalement.',
  },
  {
    title: 'Accès & Parking',
    description: 'Sortie 14 autoroute A6 ou navettes TGV directes depuis la gare en 12 minutes. Parking 4 000 places surveillé.',
  },
];
