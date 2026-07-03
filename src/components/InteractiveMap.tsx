import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

// Define types for POI and categories
interface POI {
  name: string;
  type: string;
  lat: number;
  lng: number;
  distance: string;
}

const pois: POI[] = [
  {"name":"Educational Center Los Rosales","type":"school","lat":37.399499,"lng":-5.952111,"distance":"5 min"},
  {"name":"San Agustin's School","type":"school","lat":37.397441,"lng":-5.950383,"distance":"10 min"},
  {"name":"Gran Vía Park","type":"park","lat":37.403531,"lng":-5.956236,"distance":"3 min"},
  {"name":"Asador Restaurante La Finca","type":"restaurant","lat":37.394221,"lng":-5.953281,"distance":"12 min"},
  {"name":"Restaurante Jábega","type":"restaurant","lat":37.404158,"lng":-5.956267,"distance":"2 min"},
  {"name":"CHICHA Cocina Peruana","type":"restaurant","lat":37.403403,"lng":-5.957193,"distance":"3 min"},
  {"name":"Tarantelo Tapas - Kansas City","type":"restaurant","lat":37.404184,"lng":-5.956449,"distance":"2 min"},
  {"name":"Poseidón Restaurante","type":"restaurant","lat":37.404634,"lng":-5.95585,"distance":"2 min"},
  {"name":"GILDA ABACERÍA","type":"restaurant","lat":37.40362,"lng":-5.957162,"distance":"3 min"},
  {"name":"Comunidad Terapeutica Santa Clara","type":"hospital","lat":37.406076,"lng":-5.953166,"distance":"4 min"},
  {"name":"Carrefour San Pablo Shopping Center","type":"supermarket","lat":37.407222,"lng":-5.939444,"distance":"18 min"},
  {"name":"Mesón Santa Clara","type":"restaurant","lat":37.394725,"lng":-5.954834,"distance":"10 min"}
];

const typeMap: Record<string, string> = {
  "school":"Educación",
  "hospital":"Salud",
  "supermarket":"Compras",
  "restaurant":"Gastronomía",
  "park":"Parques",
  "all":"Todos"
};

const iconPaths: Record<string, string> = {
  school: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
  hospital: '<path d="M12 6v12M6 12h12"/><rect x="4" y="4" width="16" height="16" rx="2"/>',
  supermarket: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
  restaurant: '<path d="M3 2v7a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V2M7 2v20M17 2c-2 2-2 5-2 8 0 2 1 3 2 3s2-1 2-3c0-3 0-6-2-8Zm0 11v9"/>',
  park: '<path d="M12 2 6 12h4l-4 8h12l-4-8h4L12 2Z"/><path d="M12 22v-4"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9v11a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9"/>'
};

function getSvgIcon(type: string, size: number) {
  const path = iconPaths[type] || iconPaths.home;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}">${path}</svg>`;
}

function getCarIconSvg() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3 17V10l2-5h14l2 5v7"/></svg>';
}

export default function InteractiveMap(_props?: any) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const poiMarkersRef = useRef<Record<string, L.Marker>>({});
  
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const center: [number, number] = [37.40336, -5.954279];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create Leaflet Map Instance
    const map = L.map(mapContainerRef.current, { scrollWheelZoom: false }).setView(center, 15);
    mapRef.current = map;

    // Load CARTO Voyager Tile Layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Create Main Property Marker
    const mainIcon = L.divIcon({
      className: '',
      html: `<div class="iz-main-icon">${getSvgIcon('home', 20)}</div>`,
      iconSize: [42, 42],
      iconAnchor: [21, 21],
      popupAnchor: [0, -21]
    });

    const mainMarker = L.marker(center, { icon: mainIcon })
      .addTo(map)
      .bindPopup('Propiedad', { minWidth: 100, maxWidth: 250, autoPanPadding: [20, 20] });
    
    mainMarker.openPopup();

    // Build POI Markers but do not add them to the map yet
    const markers: Record<string, L.Marker> = {};
    pois.forEach(p => {
      const poiIcon = L.divIcon({
        className: '',
        html: `<div class="iz-poi-icon">${getSvgIcon(p.type, 16)}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -17]
      });

      const m = L.marker([p.lat, p.lng], { icon: poiIcon })
        .bindPopup(p.name, { minWidth: 100, maxWidth: 250, autoPanPadding: [20, 20] });
      
      markers[p.name] = m;
    });

    poiMarkersRef.current = markers;

    // Show initial category
    updateMapMarkers('all', markers, map);

    // Invalidation and Resize handlers
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };

    const handleOrientation = () => {
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 200);
    };

    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 200);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientation);

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Sync Markers to activeCategory and map state
  const updateMapMarkers = (category: string, markers: Record<string, L.Marker>, map: L.Map) => {
    // Remove all POIs first
    Object.values(markers).forEach(m => {
      if (map.hasLayer(m)) {
        map.removeLayer(m);
      }
    });

    // Add filtered POIs
    const filtered = category === 'all' ? pois : pois.filter(p => p.type === category);
    filtered.forEach(p => {
      const marker = markers[p.name];
      if (marker) {
        marker.addTo(map);
      }
    });

    // Reset view to main center
    map.setView(center, 15);
  };

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    const map = mapRef.current;
    const markers = poiMarkersRef.current;
    if (map && markers) {
      updateMapMarkers(category, markers, map);
    }
  };

  const handleFocusPoi = (name: string) => {
    const map = mapRef.current;
    const markers = poiMarkersRef.current;
    if (map && markers) {
      // Show focused marker & open popup
      const marker = markers[name];
      if (marker) {
        // Ensure it is on the map
        if (!map.hasLayer(marker)) {
          marker.addTo(map);
        }
        map.setView(marker.getLatLng(), 16);
        marker.openPopup();
      }
    }
  };

  const filteredPois = activeCategory === 'all' ? pois : pois.filter(p => p.type === activeCategory);

  return (
    <div id="inmozone-root-1783013011648" className="inmozone-wrapper">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
        .inmozone-wrapper, .inmozone-wrapper *, .inmozone-wrapper *::before, .inmozone-wrapper *::after { box-sizing: border-box; }
        .inmozone-wrapper { font-family: 'Inter', sans-serif; width: 100%; max-width: 1200px; margin: 80px auto; background: #FFFFFF; color: #1A1A1A; border-radius: 24px; overflow: hidden; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 30px 70px -20px rgba(0,0,0,0.15); min-width: 0; }
        .iz-grid { display: grid; grid-template-columns: 0.6fr 1.4fr; gap: 0; width: 100%; max-width: 100%; min-width: 0; align-items: stretch; }
        #iz-map { height: 100%; min-height: 480px; width: 100%; max-width: 100%; background: #EFE9DD; }
        .iz-sidebar { padding: 40px; background: #FFFFFF; border-right: 1px solid rgba(0,0,0,0.08); display: flex; flex-direction: column; min-width: 0; }
        .iz-tabs {
          display: flex;
          flex-wrap: nowrap;
          gap: 10px;
          margin-bottom: 30px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding-bottom: 12px;
          min-width: 0;
        }
        .iz-tabs::-webkit-scrollbar {
          height: 4px;
        }
        .iz-tabs::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .iz-tabs::-webkit-scrollbar-thumb {
          background: #C5A059;
          border-radius: 10px;
        }
        .iz-tab {
          padding: 10px 18px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          text-align: center;
          border: 1px solid rgba(0,0,0,0.12);
          background: #FFFFFF;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(0,0,0,0.6);
        }
        .iz-tab.active {
          background: #1A1A1A;
          color: white;
          border-color: #1A1A1A;
          box-shadow: none;
        }
        .iz-list { display: flex; flex-direction: column; gap: 12px; overflow-y: auto; max-height: 450px; padding-right: 10px; }
        .iz-list::-webkit-scrollbar { width: 4px; }
        .iz-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .iz-item { display: flex; align-items: center; gap: 14px; padding: 16px; border-radius: 16px; background: #FFFFFF; border: 1px solid rgba(0,0,0,0.08); transition: all 0.3s; cursor: pointer; }
        .iz-item:hover { border-color: #C5A059; background: #C5A0590D; }
        .iz-item-icon { flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%; background: rgba(197,160,89,0.12); border: 1px solid rgba(197,160,89,0.3); display: flex; align-items: center; justify-content: center; }
        .iz-item-icon svg { width: 16px; height: 16px; stroke: #C5A059; }
        .iz-item-info { display: flex; flex-direction: column; flex: 1; min-width: 0; }
        .iz-item-name { font-weight: 700; font-size: 14px; color: #1A1A1A; }
        .iz-item-meta { font-size: 9px; text-transform: uppercase; letter-spacing: 0.1em; color: #C5A059; margin-top: 4px; font-weight: 800; }
        .iz-item-times { display: flex; align-items: center; gap: 10px; margin-top: 6px; }
        .iz-time-badge { display: flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 700; color: rgba(0,0,0,0.55); }
        .iz-time-badge svg { width: 12px; height: 12px; stroke: #C5A059; }
        .iz-distance { font-size: 10px; font-weight: 800; color: #C5A059; background: #C5A0591A; padding: 4px 12px; border-radius: 100px; text-transform: uppercase; flex-shrink: 0; }
        .iz-privacy-badge { position: absolute; left: 16px; bottom: 16px; z-index: 500; background: rgba(10,14,20,0.85); color: #C5A059; font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(197,160,89,0.3); display: flex; align-items: center; gap: 8px; }
        .iz-privacy-badge svg { width: 12px; height: 12px; stroke: #C5A059; }
        .iz-map-container { position: relative; height: 100%; }
        .iz-poi-icon { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: #0A0E14; border: 2px solid #C5A059; box-shadow: 0 4px 12px rgba(0,0,0,0.355); }
        .iz-poi-icon svg { width: 16px; height: 16px; stroke: white; }
        .iz-main-icon { display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 50%; background: #C5A059; border: 3px solid white; box-shadow: 0 4px 14px rgba(0,0,0,0.4); }
        .iz-main-icon svg { width: 20px; height: 20px; stroke: #0A0E14; }
        .leaflet-popup-content-wrapper { min-width: 120px !important; border-radius: 12px !important; }
        .leaflet-popup-content { min-width: 80px !important; white-space: normal !important; word-wrap: break-word !important; overflow-wrap: break-word !important; font-size: 14px !important; line-height: 1.4 !important; margin: 10px 14px !important; }
        @media (max-width: 1024px) { .iz-grid { grid-template-columns: 1fr; } .iz-sidebar { border-right: none; order: 2; min-width: 0; } .iz-map-container { order: 1; width: 100%; max-width: 100%; min-width: 0; } #iz-map { height: 360px; width: 100%; max-width: 100%; } .inmozone-wrapper { margin: 48px auto; border-radius: 20px; max-width: 100vw; width: 100%; min-width: 0; } }
      ` }} />

      <div className="iz-grid">
        <div className="iz-sidebar">
          <div className="iz-tabs" id="iz-tabs-container">
            <div className={`iz-tab ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => handleFilter('all')}>Todos</div>
            <div className={`iz-tab ${activeCategory === 'school' ? 'active' : ''}`} onClick={() => handleFilter('school')}>Educación</div>
            <div className={`iz-tab ${activeCategory === 'hospital' ? 'active' : ''}`} onClick={() => handleFilter('hospital')}>Salud</div>
            <div className={`iz-tab ${activeCategory === 'supermarket' ? 'active' : ''}`} onClick={() => handleFilter('supermarket')}>Compras</div>
            <div className={`iz-tab ${activeCategory === 'restaurant' ? 'active' : ''}`} onClick={() => handleFilter('restaurant')}>Gastronomía</div>
            <div className={`iz-tab ${activeCategory === 'park' ? 'active' : ''}`} onClick={() => handleFilter('park')}>Parques</div>
          </div>
          <div className="iz-list" id="iz-list-container">
            {filteredPois.map((p, index) => (
              <div key={index} className="iz-item" onClick={() => handleFocusPoi(p.name)}>
                <div className="iz-item-icon" dangerouslySetInnerHTML={{ __html: getSvgIcon(p.type, 16) }} />
                <div className="iz-item-info">
                  <span className="iz-item-name">{p.name}</span>
                  <span className="iz-item-meta">{typeMap[p.type] || p.type}</span>
                  <div className="iz-item-times">
                    <span className="iz-time-badge" dangerouslySetInnerHTML={{ __html: `${getCarIconSvg()} ${p.distance} en coche` }} />
                  </div>
                </div>
                <span className="iz-distance">{p.distance}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="iz-map-container">
          <div id="iz-map" ref={mapContainerRef}></div>
          <div className="iz-privacy-badge">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Ubicación aproximada por privacidad
          </div>
        </div>
      </div>
    </div>
  );
}
