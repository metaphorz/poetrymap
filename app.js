/* === GLOBAL STATE === */
const COLLECTIONS = {
    'uk-classic': {
        id: 'uk-classic',
        name: 'UK and Ireland, Classic',
        bounds: [[49.5, -11.0], [61.0, 2.0]], // UK & Ireland
        data: typeof POETRY_DATA !== 'undefined' ? POETRY_DATA : {}
    },
    'us-frost': {
        id: 'us-frost',
        name: 'US Regional, Robert Frost',
        bounds: [[41.0, -73.5], [45.5, -67.0]], // New England Bounds
        data: typeof FROST_DATA !== 'undefined' ? FROST_DATA : {} 
    }
};

let activeCollectionId = 'uk-classic';

window.selectedVoiceURI = null;
window.selectedVoiceType = 'browser'; // 'browser' or 'premium'
window.selectedPremiumVoice = null;
window.currentTtsAudio = null;
window.premiumTtsAvailable = false;

// Check if server has an API key, or if user has one in localStorage
(async function checkTtsAvailability() {
    try {
        const res = await fetch('/api/tts-available');
        const data = await res.json();
        window.premiumTtsAvailable = data.available || !!localStorage.getItem('openrouter_api_key');
    } catch {
        window.premiumTtsAvailable = !!localStorage.getItem('openrouter_api_key');
    }
    // Default to Alloy if premium is available
    if (window.premiumTtsAvailable) {
        window.selectedVoiceType = 'premium';
        window.selectedPremiumVoice = 'alloy';
        window.selectedVoiceURI = 'premium:alloy';
    }
    window.populateVoiceDropdowns();
})();

const PREMIUM_VOICES = [
    { id: 'alloy', name: 'Alloy' },
    { id: 'echo', name: 'Echo' },
    { id: 'fable', name: 'Fable' },
    { id: 'onyx', name: 'Onyx' },
    { id: 'nova', name: 'Nova' },
    { id: 'shimmer', name: 'Shimmer' },
];

window.populateVoiceDropdowns = function() {
    const voices = window.speechSynthesis ? window.speechSynthesis.getVoices().filter(v => v.lang && v.lang.startsWith('en')) : [];
    const selects = document.querySelectorAll('.voice-select-dropdown');
    selects.forEach(select => {
        const currentVal = select.value || window.selectedVoiceURI || '';
        // Rebuild if voices loaded or dropdown is still default-only
        if (select.options.length <= 1 || (voices.length > 0 && select.querySelectorAll('option[data-type="browser"]').length === 0)) {
            // Clear and rebuild with DOM methods (no innerHTML)
            while (select.firstChild) select.removeChild(select.firstChild);
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.textContent = 'Default Voice';
            select.appendChild(defaultOpt);
            // Premium voices first
            if (window.premiumTtsAvailable) {
                PREMIUM_VOICES.forEach(v => {
                    const opt = document.createElement('option');
                    opt.value = 'premium:' + v.id;
                    opt.setAttribute('data-type', 'premium');
                    opt.textContent = '\u2726 ' + v.name;
                    select.appendChild(opt);
                });
                const sep = document.createElement('option');
                sep.disabled = true;
                sep.textContent = '\u2500\u2500 Browser Voices \u2500\u2500';
                select.appendChild(sep);
            }
            // Browser voices
            voices.forEach(v => {
                const opt = document.createElement('option');
                opt.value = 'browser:' + v.voiceURI;
                opt.setAttribute('data-type', 'browser');
                opt.textContent = v.name.replace('Google ', '').replace('English', 'EN').trim();
                select.appendChild(opt);
            });
        }
        if (currentVal && Array.from(select.options).some(o => o.value === currentVal)) {
            select.value = currentVal;
        }
    });
};

window.handleVoiceChange = function(select) {
    const val = select.value;
    if (val.startsWith('premium:')) {
        window.selectedVoiceType = 'premium';
        window.selectedPremiumVoice = val.replace('premium:', '');
        window.selectedVoiceURI = val;
    } else if (val.startsWith('browser:')) {
        window.selectedVoiceType = 'browser';
        window.selectedVoiceURI = val.replace('browser:', '');
    } else {
        window.selectedVoiceType = 'browser';
        window.selectedVoiceURI = null;
    }
    // Sync all dropdowns
    document.querySelectorAll('.voice-select-dropdown').forEach(s => { s.value = val; });
};

if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = window.populateVoiceDropdowns;
}

// Accuracy badge helper
function accuracyBadge(accuracy, size) {
    const config = {
        confirmed:     { color: '#4caf50', label: 'Confirmed', tip: 'Location explicitly named in or tied to the poem' },
        approximate:   { color: '#ff9800', label: 'Approximate', tip: 'Strong contextual link, but not precisely pinned' },
        compositional: { color: '#f44336', label: 'Compositional', tip: "Poem doesn't describe a specific place; pinned to where the poet composed it" },
    };
    const c = config[accuracy] || config.approximate;
    const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';
    const textSize = size === 'sm' ? 'text-[0.5rem]' : 'text-[0.6rem]';
    return `<span class="inline-flex items-center gap-1 cursor-help" title="${c.tip}"><span class="${dotSize} rounded-full inline-block flex-shrink-0" style="background:${c.color}"></span><span class="${textSize} uppercase tracking-wider font-bold opacity-70">${c.label}</span></span>`;
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation handling
    const navKeywords = {
        'MAP': 'index.html',
        'DISCOVERY': 'discovery.html',
        'ANTHOLOGY': 'anthology.html',
        'SAVED': 'anthology.html'
    };

    const checkNavElements = () => {
        const elements = document.querySelectorAll('a, span');
        elements.forEach(el => {
            if (!el.closest('header') && !el.closest('nav') && !el.closest('.bottom-0')) return;
            const text = el.textContent.trim().toUpperCase();
            if (navKeywords[text]) {
                const clickable = el.tagName === 'A' ? el : (el.closest('a') || el);
                clickable.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = navKeywords[text];
                });
                if (clickable.tagName === 'SPAN') {
                    clickable.style.cursor = 'pointer';
                }
            }
        });
    };
    checkNavElements();

    // 1.5 Global Audio Controls
    // Any keystroke stops the current poem reading (browser or premium TTS)
    document.addEventListener('keydown', () => {
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        if (window.currentTtsAudio) {
            window.currentTtsAudio.pause();
            window.currentTtsAudio = null;
            // Reset any playing buttons
            document.querySelectorAll('.play-audio-btn[data-playing="true"]').forEach(btn => {
                btn.dataset.playing = 'false';
                const icon = btn.querySelector('.material-symbols-outlined');
                if (icon) icon.textContent = 'volume_up';
            });
        }
    });

    // Event delegation for mapping the dynamic play buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.play-audio-btn');
        if (btn) {
            e.preventDefault();
            e.stopPropagation(); // prevent triggering the wrapper article click
            const poemId = btn.getAttribute('data-poem-id');
            if (poemId) playPoemAudio(poemId, btn);
        }
    });

    // 2. Map pin handling (fallback)
    const mapPins = document.querySelectorAll('.pointer-events-auto.cursor-pointer.group');
    mapPins.forEach(pin => {
        pin.addEventListener('click', () => {
            window.location.href = 'poem.html';
        });
    });

    // --- NEW DYNAMIC RENDERING LOGIC ---
    if (typeof COLLECTIONS !== 'undefined') {
        
        // Setup Top Header Dropdown
        const collectionSelect = document.getElementById('collection-select');
        if (collectionSelect) {
            Object.values(COLLECTIONS).forEach(col => {
                const opt = document.createElement('option');
                opt.value = col.id;
                opt.textContent = col.name;
                collectionSelect.appendChild(opt);
            });
            collectionSelect.value = activeCollectionId;
        }

        // --- MAP VIEW (index.html) ---
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('poetrymap/')) {
            const sidebarContainer = document.getElementById('sidebar-poems-container');
            
            if (sidebarContainer) {
                let map;
                let markersLayer = L.featureGroup();

                if (document.getElementById('leaflet-map')) {
                    map = L.map('leaflet-map', {
                        zoomControl: false
                    }).setView([53.5, -2.5], 6);
                    
                    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; CARTO',
                        subdomains: 'abcd',
                        maxZoom: 20
                    }).addTo(map);
                    
                    markersLayer.addTo(map);
                    
                    const buttons = document.querySelectorAll('.absolute.bottom-24.right-6 button');
                    if(buttons.length >= 2) {
                        buttons[0].addEventListener('click', () => map.zoomIn());
                        buttons[1].addEventListener('click', () => map.zoomOut());
                    }

                    // Collection Switcher Logic
                    window.switchCollection = (colId) => {
                        activeCollectionId = colId;
                        const col = COLLECTIONS[colId];
                        
                        markersLayer.clearLayers();
                        sidebarContainer.innerHTML = '';
                        
                        // Update Header Title in Sidebar View
                        const anthologyTitle = document.querySelector('aside header h2');
                        if (anthologyTitle) anthologyTitle.innerHTML = `Cartography of <br/>${col.name.split(',')[0]}`;
                        
                        renderCollectionData(col.data, map, markersLayer, sidebarContainer);

                        // Populate voice dropdowns on newly created elements
                        setTimeout(window.populateVoiceDropdowns, 150);

                        // Dynamically frame the viewport around the live pins and polygons
                        if (markersLayer.getLayers().length > 0) {
                            const paddingOptions = window.innerWidth < 768 ? [20, 20] : [60, 60];
                            map.fitBounds(markersLayer.getBounds(), { padding: paddingOptions, maxZoom: 14 });
                        }
                    };

                    if (collectionSelect) {
                        collectionSelect.addEventListener('change', (e) => {
                            window.switchCollection(e.target.value);
                        });
                    }

                    // Initial Render
                    window.switchCollection(activeCollectionId);
                }
            }
        }
        
        // --- POEM DETAIL VIEW (poem.html) ---
        if (window.location.pathname.includes('poem.html')) {
            const urlParams = new URLSearchParams(window.location.search);
            const poemId = urlParams.get('poem') || 'tintern';
            
            // Search all collections for the poem
            let data = null;
            for (let col of Object.values(COLLECTIONS)) {
                if (col.data[poemId]) {
                    data = col.data[poemId];
                    break; // Found it
                }
            }
            
            if (data) {
                // Populate Headings
                const headerP = document.querySelector('article header p.font-label');
                if(headerP) headerP.innerHTML = data.typeTag || 'Classic Lyric';
                
                const headerH2 = document.querySelector('article header h2');
                if(headerH2) headerH2.innerHTML = data.title;
                
                const authorP = document.querySelector('article header p.font-headline.text-xl');
                if(authorP) {
                    authorP.innerHTML = `
                        <div class="flex items-center gap-3">
                            <span>${data.author}</span>
                            <div class="flex items-center bg-surface-container-high rounded-full border border-outline-variant/20 shadow-sm transition-colors hover:bg-surface-dim">
                                <button class="play-audio-btn flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-primary" data-poem-id="${data.id}" title="Read Aloud (Press any key to stop)">
                                    <span class="material-symbols-outlined text-[1.1rem]">volume_up</span>
                                </button>
                                <div class="relative flex items-center pr-2">
                                    <select class="voice-select-dropdown appearance-none bg-transparent border-none text-primary focus:ring-0 text-[0.65rem] font-bold tracking-wider uppercase py-1 pl-1 pr-4 cursor-pointer opacity-70 hover:opacity-100" title="Select Narrator Voice" onchange="window.handleVoiceChange(this); event.stopPropagation();" onclick="event.stopPropagation();">
                                        <option value="">Default Voice</option>
                                    </select>
                                    <span class="material-symbols-outlined absolute right-0 pointer-events-none text-[0.8rem] text-primary/70">arrow_drop_down</span>
                                </div>
                            </div>
                        </div>
                    `;
                    setTimeout(window.populateVoiceDropdowns, 100);
                }
                
                // Populate Body
                const poemBody = document.querySelector('.poem-text');
                if(poemBody) poemBody.innerHTML = data.textHTML;
                
                // Populate Sidebar/Metadata
                const asideH3 = document.querySelector('aside h3');
                if(asideH3) asideH3.innerHTML = data.locationName || data.title;
                
                const heroImgContainer = document.querySelector('aside > div > a.block.relative');
                if(heroImgContainer) {
                    heroImgContainer.innerHTML = `
                        <div id="mini-map" class="w-full h-full"></div>
                        <div class="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none z-[400]"></div>
                        <div class="absolute bottom-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-2 rounded-sm shadow-sm z-[500]">
                            <p class="font-label text-[0.65rem] font-bold text-primary">${data.locationCoords || 'Regional Mapping'}</p>
                            ${data.accuracy ? '<p class="mt-1">' + accuracyBadge(data.accuracy, 'sm') + '</p>' : ''}
                        </div>
                    `;
                    
                    // Center the mini map differently based on Polygon vs Pin
                    let centerLatLng = [53.5, -2.5];
                    if (data.lat && data.lng) {
                        centerLatLng = [data.lat, data.lng];
                    } else if (data.polygonBounds && Array.isArray(data.polygonBounds)) {
                        try {
                           centerLatLng = data.polygonBounds[0];
                        } catch(e) {}
                    }
                    
                    const miniMap = L.map('mini-map', {
                        zoomControl: false,
                        dragging: false,
                        scrollWheelZoom: false,
                        doubleClickZoom: false
                    }).setView(centerLatLng, 7);
                    
                    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; CARTO'
                    }).addTo(miniMap);
                    
                    document.getElementById('mini-map').style.filter = 'sepia(0.6) hue-rotate(-15deg) contrast(0.9) brightness(0.9) saturate(0.8)';
                    
                    if (data.polygonBounds && Array.isArray(data.polygonBounds)) {
                       const polygon = L.polygon(data.polygonBounds, {
                            color: '#001629',
                            weight: 2,
                            fillColor: '#725c00',
                            fillOpacity: 0.15,
                            dashArray: '4'
                       }).addTo(miniMap);
                       miniMap.fitBounds(polygon.getBounds());
                    } else if (data.lat && data.lng) {
                        L.circleMarker(centerLatLng, {
                            radius: 6,
                            fillColor: data.type === 'Inscribed Location' ? '#725c00' : '#001629',
                            color: '#ffffff',
                            weight: 2,
                            opacity: 1,
                            fillOpacity: 1
                        }).addTo(miniMap);
                    }
                }
                
                const descP = document.querySelector('aside > div > p.font-body');
                if(descP) descP.innerHTML = data.desc || '';
                
                // Stats
                const statsDivs = document.querySelectorAll('aside > div.pt-8.border-t .grid p.font-headline');
                if(statsDivs.length >= 2) {
                    const lineCount = data.textHTML.match(/<p/g)?.length || '-';
                    const stanzas = data.textHTML.match(/<div class="space-y-/g)?.length || '-';
                    statsDivs[0].innerHTML = data.stanzas || stanzas;
                    statsDivs[1].innerHTML = data.lineCount || lineCount;
                }
            }
        }
    }
    // --- END DYNAMIC RENDERING LOGIC ---

    // 3. Poem detail handling: Back Arrow
    const headerIcons = document.querySelectorAll('header span.material-symbols-outlined');
    headerIcons.forEach(icon => {
        if (icon.textContent.trim() === 'arrow_back') {
            const backBtn = icon.closest('a') || icon;
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    window.location.href = 'index.html';
                }
            });
            icon.style.cursor = 'pointer';
        }
    });

    // 4. Poem detail: Focus Mode
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        if (btn.textContent.includes('Focus Mode')) {
            let isFocus = false;
            btn.addEventListener('click', () => {
                isFocus = !isFocus;
                const uiElements = document.querySelectorAll('header, aside, footer, nav');
                uiElements.forEach(el => {
                    el.style.transition = 'opacity 0.5s ease';
                    el.style.opacity = isFocus ? '0.1' : '1';
                    el.style.pointerEvents = isFocus ? 'none' : 'auto';
                });
                
                if (isFocus) {
                    btn.closest('header').style.opacity = '1';
                    btn.closest('header').style.backgroundColor = 'transparent';
                    const otherHeaderItems = btn.closest('header').querySelectorAll('h1, a, span.material-symbols-outlined');
                    otherHeaderItems.forEach(item => { item.style.opacity = '0.1'; });
                } else {
                    btn.closest('header').style.backgroundColor = '';
                    const otherHeaderItems = btn.closest('header').querySelectorAll('h1, a, span.material-symbols-outlined');
                    otherHeaderItems.forEach(item => { item.style.opacity = '1'; });
                }
            });
        }
    });
});

// Helper: Group nearby poems into clusters and compute display offsets
function computeClusterOffsets(poems) {
    const PROXIMITY = 0.02; // ~2km — poems within this distance are clustered
    const points = poems.filter(p => p.lat && p.lng && !p.polygonBounds);
    const assigned = new Set();
    const clusters = [];
    const offsets = {};

    for (const p of points) {
        if (assigned.has(p.id)) continue;
        const cluster = [p];
        assigned.add(p.id);
        for (const q of points) {
            if (assigned.has(q.id)) continue;
            if (Math.abs(p.lat - q.lat) < PROXIMITY && Math.abs(p.lng - q.lng) < PROXIMITY) {
                cluster.push(q);
                assigned.add(q.id);
            }
        }
        clusters.push(cluster);
    }

    for (const cluster of clusters) {
        if (cluster.length <= 1) {
            offsets[cluster[0].id] = { lat: cluster[0].lat, lng: cluster[0].lng };
            continue;
        }
        const cLat = cluster.reduce((s, p) => s + p.lat, 0) / cluster.length;
        const cLng = cluster.reduce((s, p) => s + p.lng, 0) / cluster.length;
        const n = cluster.length;
        const radius = Math.min(0.035, 0.015 * Math.ceil(n / 4));
        cluster.forEach((p, i) => {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2;
            offsets[p.id] = {
                lat: cLat + radius * Math.sin(angle),
                lng: cLng + radius * Math.cos(angle) * 1.3
            };
        });
    }
    return offsets;
}

// Helper Function: Render Map Elements and UI Sidebar List
function renderCollectionData(dataObj, map, layerGroup, sidebarContainer) {
    const dataKeys = Object.keys(dataObj);
    if (dataKeys.length === 0) {
        if(sidebarContainer) sidebarContainer.innerHTML = '<p class="text-primary/60 italic p-4 font-body text-xl">This collection is currently empty.</p>';
        return;
    }

    const allPoems = Object.values(dataObj);
    const displayPositions = computeClusterOffsets(allPoems);

    allPoems.forEach(poem => {
        const pinColor = poem.type === 'Inscribed Location' ? 'secondary' : 'primary';
        const iconHTML = '<div class="pointer-events-auto cursor-pointer">'
            + '<div class="relative flex flex-col items-center">'
            + '<div class="w-4 h-4 rounded-full bg-' + pinColor + ' border-2 border-surface-container-lowest shadow-sm mb-1 group-hover:scale-125 transition-transform duration-300"></div>'
            + '<div class="glass-panel px-3 py-2 rounded-sm shadow-sm border border-outline-variant/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 z-[1000] absolute -bottom-16 min-w-max text-center">'
            + '<p class="font-headline italic text-base text-on-surface whitespace-normal max-w-[200px] leading-tight mb-1">' + poem.title + '</p>'
            + '<p class="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant">' + poem.author + '</p>'
            + '</div></div></div>';
        const customIcon = L.divIcon({
            className: 'custom-leaflet-pin group',
            html: iconHTML,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        // POLYGON RENDERING SUPPORT
        if (poem.polygonBounds && Array.isArray(poem.polygonBounds)) {
            const polygon = L.polygon(poem.polygonBounds, {
                color: '#001629',
                weight: 2,
                fillColor: '#725c00',
                fillOpacity: 0.15,
                dashArray: '4'
            }).addTo(layerGroup);

            const center = polygon.getBounds().getCenter();
            const marker = L.marker(center, {icon: customIcon}).addTo(layerGroup);
            attachPopupAndSidebar(poem, marker, sidebarContainer);

        } else if (poem.lat && poem.lng) {
            // Use fanned-out position so clustered poems are visually distinct
            const pos = displayPositions[poem.id] || { lat: poem.lat, lng: poem.lng };
            const marker = L.marker([pos.lat, pos.lng], {icon: customIcon}).addTo(layerGroup);
            attachPopupAndSidebar(poem, marker, sidebarContainer);
        }
    });
}

function attachPopupAndSidebar(poem, marker, sidebarContainer) {
    // Leaflet Popup Logic
    const popupContent = `
        <div class="max-w-[300px] max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <div class="flex justify-between items-start mt-2 mb-1">
                <h3 class="font-headline text-2xl text-primary italic pr-2">${poem.title}</h3>
                <div class="flex items-center bg-surface border border-outline-variant/30 rounded-full shadow-sm">
                    <button class="play-audio-btn flex-shrink-0 w-7 h-7 rounded-full hover:bg-surface-container-highest flex items-center justify-center transition-colors text-primary" data-poem-id="${poem.id}" title="Read Aloud (Press any key to stop)">
                        <span class="material-symbols-outlined text-[1rem]">volume_up</span>
                    </button>
                    <div class="relative flex items-center pr-1 border-l border-outline-variant/20">
                        <select class="voice-select-dropdown appearance-none bg-transparent border-none text-primary focus:ring-0 text-[0.55rem] font-bold tracking-wider uppercase pl-2 pr-4 py-1 cursor-pointer opacity-80 hover:opacity-100" title="Select Narrator Voice" onchange="window.handleVoiceChange(this); event.stopPropagation();" onclick="event.stopPropagation();">
                            <option value="">Default Voice</option>
                        </select>
                        <span class="material-symbols-outlined absolute right-0 pointer-events-none text-[0.7rem] text-primary/70">arrow_drop_down</span>
                    </div>
                </div>
            </div>
            <p class="font-body text-sm text-on-surface-variant mb-1">${poem.author}</p>
            ${poem.locationCoords ? '<p class="font-label text-[0.6rem] tracking-wider text-outline mb-0.5">' + poem.locationCoords + '</p>' : ''}
            ${poem.locationName ? '<p class="font-label text-[0.6rem] tracking-wider text-outline/70 mb-1">' + poem.locationName + '</p>' : ''}
            ${poem.accuracy ? '<p class="mb-3">' + accuracyBadge(poem.accuracy, 'sm') + '</p>' : ''}
            <div class="font-body text-[0.9rem] text-on-surface leading-relaxed mb-6 space-y-3">
                ${poem.textHTML}
            </div>
            <a href="poem.html?poem=${poem.id}" target="_blank" class="block text-center w-full py-3 font-label text-xs tracking-[0.2em] uppercase rounded-sm transition-colors shadow-sm" style="background-color: #725c00; color: #fdf9ef;" onmouseover="this.style.backgroundColor='#e8c344'; this.style.color='#231b00';" onmouseout="this.style.backgroundColor='#725c00'; this.style.color='#fdf9ef';">
                Read Immersive View
            </a>
        </div>
    `;
    marker.bindPopup(popupContent, { maxWidth: 320, minWidth: 280, className: 'vintage-leaflet-popup' });
    marker.on('popupopen', () => setTimeout(window.populateVoiceDropdowns, 150));
    
    // UI Sidebar Logic
    if (sidebarContainer) {
        const articleHTML = `
            <article class="group relative cursor-pointer" onclick="window.open('poem.html?poem=${poem.id}', '_blank')">
                <div class="flex justify-between items-start mb-3">
                    <span class="font-label text-[0.65rem] tracking-widest text-outline">${poem.locationCoords || 'Regional Focus'}</span>
                    ${poem.accuracy ? accuracyBadge(poem.accuracy, 'sm') : ''}
                        <div class="flex items-center bg-surface-container-lowest border border-outline-variant/20 rounded-full shadow-sm mr-2">
                            <button class="play-audio-btn w-6 h-6 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors z-10 text-primary" data-poem-id="${poem.id}" onclick="event.stopPropagation();" title="Read Aloud (Press any key to stop)">
                                <span class="material-symbols-outlined text-[0.9rem]">volume_up</span>
                            </button>
                            <div class="relative flex items-center pr-1 border-l border-outline-variant/20">
                                <select class="voice-select-dropdown appearance-none bg-transparent border-none text-primary focus:ring-0 text-[0.5rem] font-bold tracking-wider uppercase pl-1.5 pr-3 py-0.5 cursor-pointer opacity-80 hover:opacity-100" title="Select Narrator Voice" onchange="window.handleVoiceChange(this); event.stopPropagation();" onclick="event.stopPropagation();">
                                    <option value="">Default</option>
                                </select>
                                <span class="material-symbols-outlined absolute right-0 pointer-events-none text-[0.6rem] text-primary/70">arrow_drop_down</span>
                            </div>
                        </div>
                        <span class="material-symbols-outlined text-outline group-hover:text-secondary transition-colors">star</span>
                    </div>
                </div>
                <h3 class="font-headline text-xl italic mb-2 group-hover:translate-x-1 transition-transform pr-6">${poem.title}</h3>
                <p class="font-body text-on-surface-variant leading-relaxed line-clamp-3">
                    ${poem.desc || ''}
                </p>
            </article>
        `;
        sidebarContainer.insertAdjacentHTML('beforeend', articleHTML);
    }
}

// Audio Playback Engine
function playPoemAudio(poemId, btn) {
    // Search collections to find the targeted poem
    let poem = null;
    for (let col of Object.values(COLLECTIONS)) {
        if (col.data[poemId]) {
            poem = col.data[poemId];
            break;
        }
    }
    if (!poem) return;

    // Route to premium or browser TTS
    if (window.selectedVoiceType === 'premium' && window.selectedPremiumVoice) {
        playPremiumTts(poem, btn);
    } else {
        playBrowserTts(poem);
    }
}

// Premium TTS via OpenRouter
async function playPremiumTts(poem, btn) {
    if (btn && btn.dataset.playing === 'true') {
        // Stop if already playing
        if (window.currentTtsAudio) {
            window.currentTtsAudio.pause();
            window.currentTtsAudio = null;
        }
        btn.dataset.playing = 'false';
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'volume_up';
        return;
    }

    // Stop any existing playback
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (window.currentTtsAudio) {
        window.currentTtsAudio.pause();
        window.currentTtsAudio = null;
    }

    // Strip HTML
    const tempDiv = document.createElement('div');
    tempDiv.textContent = ''; // safe clear
    tempDiv.innerHTML = poem.textHTML;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';
    let textToRead = `${poem.title}, by ${poem.author}.\n\n${cleanText}`.slice(0, 4000);

    // Show loading state
    if (btn) {
        btn.dataset.playing = 'true';
        const icon = btn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'hourglass_empty';
    }

    try {
        const body = { text: textToRead, voice: window.selectedPremiumVoice };
        const clientKey = localStorage.getItem('openrouter_api_key');
        if (clientKey) body.apiKey = clientKey;

        const res = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
            throw new Error(err.error || `HTTP ${res.status}`);
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        window.currentTtsAudio = audio;

        // Show stop icon
        if (btn) {
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) icon.textContent = 'stop';
        }

        audio.onended = () => {
            window.currentTtsAudio = null;
            URL.revokeObjectURL(url);
            if (btn) {
                btn.dataset.playing = 'false';
                const icon = btn.querySelector('.material-symbols-outlined');
                if (icon) icon.textContent = 'volume_up';
            }
        };
        audio.onerror = audio.onended;
        audio.play();
    } catch (err) {
        console.error('Premium TTS error:', err.message);
        if (btn) {
            btn.dataset.playing = 'false';
            const icon = btn.querySelector('.material-symbols-outlined');
            if (icon) icon.textContent = 'volume_up';
        }
        window.currentTtsAudio = null;
    }
}

// Browser Speech Synthesis TTS
function playBrowserTts(poem) {
    if (!window.speechSynthesis) return;

    // Stop any existing playback
    window.speechSynthesis.cancel();
    if (window.currentTtsAudio) {
        window.currentTtsAudio.pause();
        window.currentTtsAudio = null;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = poem.textHTML;
    const cleanText = tempDiv.textContent || tempDiv.innerText || '';
    let textToRead = `${poem.title}, by ${poem.author}.\n\n${cleanText}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const engVoices = voices.filter(v => v.lang && v.lang.startsWith('en'));

    const preferredVoiceNames = [
        'Google UK English Male', 'Google UK English Female', 'Google US English',
        'Daniel', 'Samantha', 'Fiona', 'Moira'
    ];

    let selectedVoice = null;

    // Check if user selected a browser voice from dropdown
    if (window.selectedVoiceURI && !window.selectedVoiceURI.startsWith('premium:') && !window.selectedVoiceURI.startsWith('browser:')) {
        selectedVoice = engVoices.find(v => v.voiceURI === window.selectedVoiceURI);
    } else if (window.selectedVoiceURI && window.selectedVoiceURI.startsWith('browser:')) {
        const uri = window.selectedVoiceURI; // already stripped in handleVoiceChange
        selectedVoice = engVoices.find(v => v.voiceURI === uri);
    }

    if (!selectedVoice) {
        for (const name of preferredVoiceNames) {
            const found = engVoices.find(v => v.name === name);
            if (found) { selectedVoice = found; break; }
        }
    }
    if (!selectedVoice) {
        selectedVoice = engVoices.find(v => v.name && (v.name.includes('Premium') || v.name.includes('Enhanced')));
    }
    if (!selectedVoice && engVoices.length > 0) {
        selectedVoice = engVoices[0];
    }
    if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
    } else {
        utterance.lang = 'en-US';
    }

    window.speechSynthesis.speak(utterance);
}
