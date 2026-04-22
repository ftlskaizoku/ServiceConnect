export const PROVIDERS = [
  { id:1, name:'Mamadou Fall', job:'Plombier certifié', cat:'btp', lat:14.6973, lng:-17.4432, dist:1.2, rating:4.9, missions:87, sat:97, price:25000, avail:'now', color:'#0B3D91', emoji:'MF', desc:'Expert en plomberie sanitaire et industrielle. Certifié ONAS. Intervention en moins de 2h sur Dakar.', badges:['verified','fast'] },
  { id:2, name:'Awa Diallo', job:'Développeuse web', cat:'it', lat:14.7105, lng:-17.4580, dist:2.4, rating:5.0, missions:124, sat:100, price:50000, avail:'today', color:'#7B2D8B', emoji:'AD', desc:"Développeuse fullstack React/Node.js. 5 ans d'expérience. Projets livrés en temps et en heure.", badges:['verified','top'] },
  { id:3, name:'Ibrahima Seck', job:'Électricien BT/MT', cat:'btp', lat:14.6850, lng:-17.4320, dist:3.1, rating:4.7, missions:52, sat:94, price:20000, avail:'week', color:'#CC5500', emoji:'IS', desc:"Électricien diplômé avec 8 ans d'expérience. Installation, dépannage et mise en conformité.", badges:['verified'] },
  { id:4, name:'Rokhaya Mbaye', job:'Coiffeuse & Esthéticienne', cat:'beaute', lat:14.7200, lng:-17.4600, dist:1.8, rating:4.8, missions:210, sat:99, price:15000, avail:'now', color:'#C2185B', emoji:'RM', desc:'Spécialiste coiffure afro et soins capillaires. Déplacement à domicile possible sur Dakar.', badges:['verified','top','fast'] },
  { id:5, name:'Cheikh Diop', job:'Maçon & Carreleur', cat:'btp', lat:14.6780, lng:-17.4500, dist:4.5, rating:4.6, missions:38, sat:92, price:30000, avail:'today', color:'#1B5E20', emoji:'CD', desc:'Maçonnerie générale, carrelage et revêtement de sol. Devis gratuit sous 24h.', badges:['verified'] },
  { id:6, name:'Fatoumata Sy', job:'Avocate fiscaliste', cat:'juridique', lat:14.7050, lng:-17.4450, dist:2.0, rating:4.9, missions:67, sat:96, price:80000, avail:'week', color:'#4A148C', emoji:'FS', desc:"10 ans d'expérience en droit des affaires et fiscalité sénégalaise. Consultation en cabinet ou en ligne.", badges:['verified','top'] },
  { id:7, name:'Aliou Ndiaye', job:'Technicien informatique', cat:'it', lat:14.7300, lng:-17.4700, dist:5.2, rating:4.5, missions:93, sat:91, price:18000, avail:'now', color:'#0277BD', emoji:'AN', desc:'Réparation PC/Mac, réseaux, installation et maintenance. Disponible 7j/7 à Dakar.', badges:['fast'] },
  { id:8, name:'Mariama Cissé', job:'Prof de math & physique', cat:'education', lat:14.6920, lng:-17.4380, dist:1.5, rating:5.0, missions:145, sat:100, price:12000, avail:'today', color:'#00695C', emoji:'MC', desc:'Professeure agrégée. Cours de soutien du collège à la terminale. Résultats garantis.', badges:['verified','top'] },
];

export const SERVICES = [
  { icon:'🔨', label:'Plomberie', count:124, cat:'btp' },
  { icon:'⚡', label:'Électricité', count:98, cat:'btp' },
  { icon:'💻', label:'Informatique', count:210, cat:'it' },
  { icon:'🏗️', label:'Maçonnerie', count:87, cat:'btp' },
  { icon:'💄', label:'Coiffure', count:156, cat:'beaute' },
  { icon:'⚖️', label:'Juridique', count:44, cat:'juridique' },
  { icon:'📚', label:'Cours part.', count:312, cat:'education' },
  { icon:'🎉', label:'Événements', count:73, cat:'evenement' },
  { icon:'🚚', label:'Transport', count:201, cat:'transport' },
  { icon:'🌿', label:'Jardinage', count:55, cat:'jardinage' },
];

export const CLIENT_REQUESTS = [
  { id:1, title:"Réparation fuite d'eau — Salle de bain", provider:'Mamadou Fall', job:'Plombier', location:'Plateau', price:25000, status:'active', date:"Aujourd'hui" },
  { id:2, title:'Cours de mathématiques — Terminale S', provider:'Mariama Cissé', job:'Prof', location:'Grand Yoff', price:12000, status:'pending', date:'Devis en attente' },
  { id:3, title:'Installation tableau électrique', provider:null, location:'Almadies', price:null, status:'pending', date:"Aujourd'hui" },
  { id:4, title:'Développement site vitrine', provider:'Awa Diallo', job:'Dev Web', location:'Dakar', price:150000, status:'done', date:'Il y a 3 jours' },
];

export const PROVIDER_MISSIONS = [
  { id:1, title:'Installation électrique complète — Villa Les Almadies', client:'Amadou Diallo', location:'Almadies', price:45000, status:'active', date:"Aujourd'hui" },
  { id:2, title:'Dépannage climatiseur — Appartement Ouakam', client:'Bineta Traoré', location:'Ouakam', price:18000, status:'active', date:"Aujourd'hui 14h30" },
  { id:3, title:'Réfection salle de bain — Plateau', client:'Aissatou Ndiaye', location:'Plateau', price:30000, status:'pending', date:'Devis envoyé' },
  { id:4, title:'Mise aux normes tableau électrique — Yoff', client:'Nouveau client', location:'Yoff', price:null, status:'pending', date:"Il y a 1h" },
  { id:5, title:'Peinture intérieure 3 pièces — Ouakam', client:'Moussa Ba', location:'Ouakam', price:80000, status:'done', date:'Hier', rating:5 },
  { id:6, title:'Maintenance PC réseau — Bureau Grand Yoff', client:'Ibrahima Sow', location:'Grand Yoff', price:15000, status:'done', date:'Il y a 2j', rating:4.5 },
];

export const TRANSACTIONS = [
  { id:1, type:'in', label:'Paiement reçu — Moussa Ba', sub:'Peinture intérieure · Via Wave', amount:80000, date:'Hier 16h22' },
  { id:2, type:'in', label:'Paiement reçu — Ibrahima Sow', sub:'Maintenance PC · Via Orange Money', amount:15000, date:'Il y a 2j' },
  { id:3, type:'out', label:'Retrait — Wave', sub:'77 *** ** 67 · Traité en 2 min', amount:50000, date:'Il y a 4j' },
  { id:4, type:'in', label:'Paiement reçu — Fatou Diallo', sub:'Installation électrique · Via Wave', amount:60000, date:'Il y a 5j' },
];
