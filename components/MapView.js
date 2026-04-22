'use client';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

const PROVIDERS_DATA = [
  { id:1, name:'Mamadou Fall', job:'Plombier certifié', cat:'btp', lat:14.6973, lng:-17.4432, dist:1.2, rating:4.9, missions:87, sat:97, price:25000, avail:'now', color:'#0B3D91', emoji:'MF', desc:"Expert en plomberie sanitaire et industrielle. Certifié ONAS. Intervention en moins de 2h.", badges:['verified','fast'] },
  { id:2, name:'Awa Diallo', job:'Développeuse web', cat:'it', lat:14.7105, lng:-17.4580, dist:2.4, rating:5.0, missions:124, sat:100, price:50000, avail:'today', color:'#7B2D8B', emoji:'AD', desc:"Développeuse fullstack React/Node.js. 5 ans d'expérience.", badges:['verified','top'] },
  { id:3, name:'Ibrahima Seck', job:'Électricien BT/MT', cat:'btp', lat:14.6850, lng:-17.4320, dist:3.1, rating:4.7, missions:52, sat:94, price:20000, avail:'week', color:'#CC5500', emoji:'IS', desc:"Électricien diplômé. Installation, dépannage et mise en conformité.", badges:['verified'] },
  { id:4, name:'Rokhaya Mbaye', job:'Coiffeuse & Esthéticienne', cat:'beaute', lat:14.7200, lng:-17.4600, dist:1.8, rating:4.8, missions:210, sat:99, price:15000, avail:'now', color:'#C2185B', emoji:'RM', desc:"Spécialiste coiffure afro. Déplacement à domicile possible.", badges:['verified','top','fast'] },
  { id:5, name:'Cheikh Diop', job:'Maçon & Carreleur', cat:'btp', lat:14.6780, lng:-17.4500, dist:4.5, rating:4.6, missions:38, sat:92, price:30000, avail:'today', color:'#1B5E20', emoji:'CD', desc:"Maçonnerie générale, carrelage. Devis gratuit sous 24h.", badges:['verified'] },
  { id:6, name:'Fatoumata Sy', job:'Avocate fiscaliste', cat:'juridique', lat:14.7050, lng:-17.4450, dist:2.0, rating:4.9, missions:67, sat:96, price:80000, avail:'week', color:'#4A148C', emoji:'FS', desc:"10 ans en droit des affaires et fiscalité sénégalaise.", badges:['verified','top'] },
  { id:7, name:'Aliou Ndiaye', job:'Technicien informatique', cat:'it', lat:14.7300, lng:-17.4700, dist:5.2, rating:4.5, missions:93, sat:91, price:18000, avail:'now', color:'#0277BD', emoji:'AN', desc:"Réparation PC/Mac, réseaux. Disponible 7j/7.", badges:['fast'] },
  { id:8, name:'Mariama Cissé', job:'Prof de math & physique', cat:'education', lat:14.6920, lng:-17.4380, dist:1.5, rating:5.0, missions:145, sat:100, price:12000, avail:'today', color:'#00695C', emoji:'MC', desc:"Professeure agrégée. Cours du collège à la terminale.", badges:['verified','top'] },
];

export default function MapView({ providers, focusId, onProviderClick }) {
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (typeof window === 'undefined' || leafletRef.current) return;
    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;

    const map = L.map(mapRef.current, { zoomControl: false }).setView([14.6973, -17.4432], 13);
    leafletRef.current = map;

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '©OpenStreetMap ©Carto', maxZoom: 19,
    }).addTo(map);

    // User marker
    const userIcon = L.divIcon({
      html: `<div style="width:14px;height:14px;background:white;border:3px solid #0D1117;border-radius:50%;box-shadow:0 0 0 6px rgba(13,17,23,.12);"></div>`,
      className: '', iconAnchor: [7,7],
    });
    L.marker([14.6973,-17.4432],{icon:userIcon}).addTo(map).bindPopup('<strong>📍 Votre position</strong>');

    (providers || PROVIDERS_DATA).forEach(p => addMarker(L, map, p, onProviderClick, markersRef));
    return () => { map.remove(); leafletRef.current = null; markersRef.current = {}; };
  }, []);

  useEffect(() => {
    if (!leafletRef.current) return;
    const L = require('leaflet');
    Object.values(markersRef.current).forEach(m => leafletRef.current.removeLayer(m));
    markersRef.current = {};
    (providers || PROVIDERS_DATA).forEach(p => addMarker(L, leafletRef.current, p, onProviderClick, markersRef));
  }, [providers]);

  useEffect(() => {
    if (!focusId || !leafletRef.current) return;
    const m = markersRef.current[focusId];
    if (m) { leafletRef.current.setView(m.getLatLng(), 15, {animate:true}); m.openPopup(); }
  }, [focusId]);

  return <div ref={mapRef} style={{ width:'100%', height:'100%' }} />;
}

function addMarker(L, map, p, onProviderClick, markersRef) {
  const icon = L.divIcon({
    html: `<div style="width:36px;height:36px;background:${p.color};color:#fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:2.5px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.2);font-weight:700;font-size:.68rem;font-family:sans-serif;"><span style="transform:rotate(45deg)">${p.emoji}</span></div>`,
    className: '', iconAnchor: [18,36],
  });

  const popup = `<div style="font-family:'DM Sans',sans-serif;min-width:190px;padding:2px;">
    <strong style="display:block;font-size:.9rem;color:#0D1117;margin-bottom:2px;">${p.name}</strong>
    <span style="font-size:.75rem;color:#8496B0;">${p.job}</span>
    <div style="margin:8px 0 10px;font-size:.78rem;color:#3D4F6B;">
      ⭐ ${p.rating} &nbsp;·&nbsp; ${p.missions} missions &nbsp;·&nbsp; 📍 ${p.dist}km<br>
      <strong style="color:#0D1117;">${p.price.toLocaleString('fr-FR')} FCFA/j</strong>
    </div>
    <button onclick="window.__openProvider(${p.id})"
      style="width:100%;padding:8px;background:#0D1117;color:#fff;border:none;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;font-family:inherit;">
      Voir le profil →
    </button>
  </div>`;

  const marker = L.marker([p.lat,p.lng],{icon}).addTo(map).bindPopup(popup, { maxWidth:220 });
  markersRef.current[p.id] = marker;

  if (typeof window !== 'undefined') {
    window.__openProvider = (id) => {
      const provider = PROVIDERS_DATA.find(x => x.id === id);
      if (provider && onProviderClick) onProviderClick(provider);
    };
  }
}
