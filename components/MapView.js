'use client';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

export default function MapView({ providers, focusId, onProviderClick }) {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (leafletMapRef.current) return;

    const L = require('leaflet');
    delete L.Icon.Default.prototype._getIconUrl;

    const map = L.map(mapRef.current, { zoomControl: false }).setView([14.6973, -17.4432], 13);
    leafletMapRef.current = map;

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '©OpenStreetMap ©Carto', maxZoom: 19,
    }).addTo(map);

    // User position
    const userIcon = L.divIcon({
      html: `<div style="width:16px;height:16px;background:white;border:3px solid #0B1F3A;border-radius:50%;box-shadow:0 0 0 5px rgba(11,31,58,.15);"></div>`,
      className: '', iconAnchor: [8, 8],
    });
    L.marker([14.6973, -17.4432], { icon: userIcon }).addTo(map).bindPopup('<b>📍 Votre position</b>');

    providers.forEach(p => addMarker(L, map, p, onProviderClick, markersRef));

    return () => { map.remove(); leafletMapRef.current = null; markersRef.current = {}; };
  }, []);

  // Update markers when providers change
  useEffect(() => {
    if (!leafletMapRef.current) return;
    const L = require('leaflet');
    const map = leafletMapRef.current;
    Object.values(markersRef.current).forEach(m => map.removeLayer(m));
    markersRef.current = {};
    providers.forEach(p => addMarker(L, map, p, onProviderClick, markersRef));
  }, [providers]);

  // Focus on provider
  useEffect(() => {
    if (!focusId || !leafletMapRef.current) return;
    const marker = markersRef.current[focusId];
    if (marker) {
      leafletMapRef.current.setView(marker.getLatLng(), 15, { animate: true });
      marker.openPopup();
    }
  }, [focusId]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
}

function addMarker(L, map, p, onProviderClick, markersRef) {
  const icon = L.divIcon({
    html: `<div style="width:38px;height:38px;background:${p.color};color:#fff;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.25);font-weight:700;font-size:.7rem;font-family:sans-serif;"><span style="transform:rotate(45deg)">${p.emoji}</span></div>`,
    className: '', iconAnchor: [19, 38],
  });

  const popup = `
    <div style="font-family:sans-serif;min-width:180px;padding:4px;">
      <strong style="color:#0B1F3A;font-size:.9rem;display:block;margin-bottom:2px;">${p.name}</strong>
      <span style="font-size:.75rem;color:#7A91B0;">${p.job}</span>
      <div style="margin:8px 0;font-size:.78rem;color:#3D5275;">
        ⭐ ${p.rating} &nbsp;·&nbsp; ${p.missions} missions &nbsp;·&nbsp; 📍 ${p.dist} km<br>
        <strong style="color:#00B4A0;">${p.price.toLocaleString('fr-FR')} FCFA/j</strong>
      </div>
      <button onclick="window._openProvider(${p.id})" style="width:100%;padding:7px;background:#0B1F3A;color:#fff;border:none;border-radius:8px;font-size:.78rem;font-weight:600;cursor:pointer;">
        Voir le profil →
      </button>
    </div>`;

  const marker = L.marker([p.lat, p.lng], { icon }).addTo(map).bindPopup(popup);
  markersRef.current[p.id] = marker;

  window._openProvider = (id) => {
    const provider = [
      { id:1, name:'Mamadou Fall', job:'Plombier certifié', cat:'btp', lat:14.6973, lng:-17.4432, dist:1.2, rating:4.9, missions:87, sat:97, price:25000, avail:'now', color:'#0B3D91', emoji:'MF', desc:"Expert en plomberie sanitaire et industrielle. Certifié ONAS. Intervention en moins de 2h sur Dakar.", badges:['verified','fast'] },
      { id:2, name:'Awa Diallo', job:'Développeuse web', cat:'it', lat:14.7105, lng:-17.4580, dist:2.4, rating:5.0, missions:124, sat:100, price:50000, avail:'today', color:'#7B2D8B', emoji:'AD', desc:"Développeuse fullstack React/Node.js. 5 ans d'expérience.", badges:['verified','top'] },
      { id:3, name:'Ibrahima Seck', job:'Électricien BT/MT', cat:'btp', lat:14.6850, lng:-17.4320, dist:3.1, rating:4.7, missions:52, sat:94, price:20000, avail:'week', color:'#CC5500', emoji:'IS', desc:"Électricien diplômé avec 8 ans d'expérience.", badges:['verified'] },
      { id:4, name:'Rokhaya Mbaye', job:'Coiffeuse & Esthéticienne', cat:'beaute', lat:14.7200, lng:-17.4600, dist:1.8, rating:4.8, missions:210, sat:99, price:15000, avail:'now', color:'#C2185B', emoji:'RM', desc:"Spécialiste coiffure afro et soins capillaires.", badges:['verified','top','fast'] },
      { id:5, name:'Cheikh Diop', job:'Maçon & Carreleur', cat:'btp', lat:14.6780, lng:-17.4500, dist:4.5, rating:4.6, missions:38, sat:92, price:30000, avail:'today', color:'#1B5E20', emoji:'CD', desc:"Maçonnerie générale, carrelage et revêtement de sol.", badges:['verified'] },
      { id:6, name:'Fatoumata Sy', job:'Avocate fiscaliste', cat:'juridique', lat:14.7050, lng:-17.4450, dist:2.0, rating:4.9, missions:67, sat:96, price:80000, avail:'week', color:'#4A148C', emoji:'FS', desc:"10 ans d'expérience en droit des affaires.", badges:['verified','top'] },
      { id:7, name:'Aliou Ndiaye', job:'Technicien informatique', cat:'it', lat:14.7300, lng:-17.4700, dist:5.2, rating:4.5, missions:93, sat:91, price:18000, avail:'now', color:'#0277BD', emoji:'AN', desc:"Réparation PC/Mac, réseaux, installation et maintenance.", badges:['fast'] },
      { id:8, name:'Mariama Cissé', job:'Prof de math & physique', cat:'education', lat:14.6920, lng:-17.4380, dist:1.5, rating:5.0, missions:145, sat:100, price:12000, avail:'today', color:'#00695C', emoji:'MC', desc:"Professeure agrégée. Cours de soutien du collège à la terminale.", badges:['verified','top'] },
    ].find(x => x.id === id);
    if (provider && onProviderClick) onProviderClick(provider);
  };
}
