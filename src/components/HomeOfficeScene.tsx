export default function HomeOfficeScene() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ho_wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8BEAC" />
          <stop offset="100%" stopColor="#D8CCBA" />
        </linearGradient>
        <linearGradient id="ho_floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8C6C30" />
          <stop offset="100%" stopColor="#6E5220" />
        </linearGradient>
        <linearGradient id="ho_deskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#282018" />
          <stop offset="100%" stopColor="#1E180E" />
        </linearGradient>
        <linearGradient id="ho_skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6AA8D8" />
          <stop offset="50%" stopColor="#A8C8E8" />
          <stop offset="100%" stopColor="#E8D8A8" />
        </linearGradient>
        <linearGradient id="ho_alertHeaderGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C01010" />
          <stop offset="100%" stopColor="#A00808" />
        </linearGradient>
        <linearGradient id="ho_screenGrad" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#0A1428" />
          <stop offset="100%" stopColor="#081020" />
        </linearGradient>
        <linearGradient id="ho_sunbeamGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD870" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFD870" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ho_monitorGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C01010" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C01010" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ho_lampGlow" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="#FFD870" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFD870" stopOpacity="0" />
        </radialGradient>
        <pattern id="ho_wallPat" x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
          <rect width="72" height="72" fill="#D4C8B4" />
          <line x1="0" y1="36" x2="72" y2="36" stroke="#C4B8A4" strokeWidth="0.4" strokeOpacity="0.35" />
          <line x1="36" y1="0" x2="36" y2="72" stroke="#C4B8A4" strokeWidth="0.4" strokeOpacity="0.35" />
        </pattern>
        <pattern id="ho_floorPat" x="0" y="0" width="110" height="22" patternUnits="userSpaceOnUse">
          <rect width="110" height="22" fill="#8A6828" />
          <rect x="1" y="1" width="108" height="20" fill="#966E2E" />
          <line x1="0" y1="7" x2="110" y2="6.5" stroke="#7A5C20" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="0" y1="15" x2="110" y2="15.5" stroke="#7A5C20" strokeWidth="0.4" strokeOpacity="0.3" />
          <line x1="36" y1="0" x2="34" y2="22" stroke="#7A5C20" strokeWidth="0.3" strokeOpacity="0.18" />
          <line x1="74" y1="0" x2="76" y2="22" stroke="#7A5C20" strokeWidth="0.3" strokeOpacity="0.14" />
        </pattern>
        <filter id="ho_glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="ho_screenClip">
          <rect x="522" y="136" width="468" height="288" rx="3" />
        </clipPath>
      </defs>

      {/* ═══════════════════════════════════════
          LAYER 1 — CEILING, WALLS, FLOOR
      ═══════════════════════════════════════ */}

      {/* Ceiling */}
      <rect width="1440" height="58" fill="#C8C0B0" />
      {/* Crown moulding */}
      <rect y="54" width="1440" height="14" fill="#BCAE9C" />
      <rect y="62" width="1440" height="5" fill="#ACA08E" />
      <rect y="66" width="1440" height="2" fill="#9C907E" />

      {/* Wall */}
      <rect y="68" width="1440" height="510" fill="url(#ho_wallPat)" />
      <rect y="68" width="1440" height="510" fill="#D4C8B4" opacity="0.2" />

      {/* Baseboard */}
      <rect y="572" width="1440" height="16" fill="#B8AC9C" />
      <rect y="578" width="1440" height="8" fill="#ACA090" />
      <rect y="584" width="1440" height="4" fill="#9C9080" />

      {/* Floor — laminate planks */}
      <rect y="588" width="1440" height="312" fill="url(#ho_floorPat)" />
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
        <line key={i} x1="0" y1={588 + i * 24} x2="1440" y2={588 + i * 24}
          stroke="#6A5018" strokeWidth="1.5" strokeOpacity="0.32" />
      ))}
      {[100,240,390,530,680,820,970,1110,1260,1400].map((x, i) => (
        <line key={i} x1={x} y1="588" x2={x + 16} y2="900"
          stroke="#6A5018" strokeWidth="0.8" strokeOpacity="0.18" />
      ))}
      <rect y="588" width="1440" height="7" fill="#B88C38" opacity="0.18" />

      {/* ═══════════════════════════════════════
          LAYER 2 — WINDOW (LEFT) WITH VENETIAN BLINDS
      ═══════════════════════════════════════ */}

      {/* Window recess shadow */}
      <rect x="52" y="90" width="330" height="428" fill="#A09080" />

      {/* Afternoon sky */}
      <rect x="66" y="98" width="302" height="414" fill="url(#ho_skyGrad)" />

      {/* Distant rooftops & trees */}
      <rect x="66" y="320" width="302" height="192" fill="#8CAE70" opacity="0.5" />
      <ellipse cx="120" cy="340" rx="50" ry="38" fill="#6A8A50" opacity="0.6" />
      <ellipse cx="200" cy="332" rx="62" ry="48" fill="#5A7A40" opacity="0.55" />
      <ellipse cx="310" cy="348" rx="58" ry="42" fill="#649050" opacity="0.5" />
      <rect x="88" y="340" width="12" height="70" fill="#4A3820" opacity="0.55" />
      <rect x="230" y="330" width="10" height="80" fill="#4A3820" opacity="0.5" />

      {/* House rooftops far back */}
      <polygon points="66,280 130,240 194,280" fill="#C8A888" opacity="0.5" />
      <rect x="66" y="280" width="128" height="50" fill="#B89878" opacity="0.45" />
      <polygon points="220,300 284,262 348,300" fill="#C4A480" opacity="0.45" />
      <rect x="220" y="300" width="128" height="34" fill="#B09070" opacity="0.4" />

      {/* Window outer frame */}
      <rect x="52" y="90" width="330" height="428" fill="none" stroke="#5C4028" strokeWidth="18" />
      {/* Vertical muntin */}
      <rect x="208" y="90" width="14" height="428" fill="#5C4028" />
      {/* Horizontal muntin */}
      <rect x="52" y="302" width="330" height="14" fill="#5C4028" />

      {/* === VENETIAN BLINDS === */}
      {/* Blinds are partially open — alternating thin slats casting stripes */}
      {/* Over top half of window */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((i) => (
        <g key={i}>
          {/* Slat */}
          <rect x="66" y={98 + i * 13} width="138" height="9" rx="1"
            fill="#C8B898" opacity="0.88" />
          <rect x="222" y={98 + i * 13} width="142" height="9" rx="1"
            fill="#C8B898" opacity="0.88" />
          {/* Shadow under slat */}
          <rect x="66" y={98 + i * 13 + 8} width="138" height="4"
            fill="#6A5020" opacity="0.12" />
          <rect x="222" y={98 + i * 13 + 8} width="142" height="4"
            fill="#6A5020" opacity="0.12" />
        </g>
      ))}
      {/* Blind lift cord */}
      <line x1="348" y1="98" x2="348" y2="306" stroke="#B8A888" strokeWidth="1.5" strokeOpacity="0.7" />
      <line x1="356" y1="98" x2="356" y2="306" stroke="#B8A888" strokeWidth="1.5" strokeOpacity="0.7" />

      {/* Bottom half of window — open, more light */}
      <rect x="66" y="316" width="138" height="192" fill="url(#ho_skyGrad)" opacity="0.9" />
      <rect x="222" y="316" width="142" height="192" fill="url(#ho_skyGrad)" opacity="0.9" />
      {/* Partial blinds bottom half */}
      {[0,1,2,3].map((i) => (
        <g key={i}>
          <rect x="66" y={316 + i * 13} width="138" height="9" rx="1"
            fill="#C8B898" opacity="0.75" />
          <rect x="222" y={316 + i * 13} width="142" height="9" rx="1"
            fill="#C8B898" opacity="0.75" />
        </g>
      ))}

      {/* Window sill */}
      <rect x="42" y="512" width="352" height="28" rx="3" fill="#7B5830" />
      <rect x="42" y="512" width="352" height="6" fill="#9B7840" />

      {/* Small cactus on windowsill */}
      <ellipse cx="362" cy="518" rx="16" ry="6" fill="#5C3818" />
      <rect x="350" y="498" width="24" height="22" rx="4" fill="#6A7828" />
      <rect x="358" y="490" width="8" height="18" rx="4" fill="#5A6820" />
      <rect x="350" y="500" width="10" height="8" rx="3" fill="#6A7828" />
      <rect x="366" y="503" width="8" height="6" rx="3" fill="#6A7828" />

      {/* ═══════════════════════════════════════
          VENETIAN BLIND LIGHT STRIPES ON FLOOR
      ═══════════════════════════════════════ */}

      {/* Warm diagonal light bands from window falling on floor */}
      {[0,1,2,3,4].map((i) => (
        <polygon key={i}
          points={`${66 + i * 26},512 ${90 + i * 26},512 ${240 + i * 42},900 ${210 + i * 42},900`}
          fill="#FFD870" opacity="0.07"
        />
      ))}

      {/* Light spill on desk surface from window */}
      <polygon points="66,512 394,512 600,590 160,590"
        fill="#FFD870" opacity="0.06" />

      {/* ═══════════════════════════════════════
          LAYER 3 — BOOKSHELF (LEFT)
      ═══════════════════════════════════════ */}

      {/* Bookshelf unit — left of window */}
      <rect x="0" y="68" width="44" height="520" fill="#5C3D1E" />
      <rect x="0" y="68" width="44" height="520" fill="none" stroke="#7B5230" strokeWidth="2" />
      {/* Shelves */}
      {[130, 220, 310, 400, 490].map((y, i) => (
        <rect key={i} x="0" y={y} width="44" height="8" fill="#4A2C10" />
      ))}
      {/* Books — stacked vertically on each shelf */}
      {[
        {y:76, books:[{w:9,h:50,c:'#1A3048'},{w:7,h:44,c:'#2A4820'},{w:11,h:52,c:'#481820'},{w:8,h:46,c:'#3A3010'},{w:6,h:42,c:'#182838'}]},
        {y:168, books:[{w:10,h:48,c:'#2A1830'},{w:8,h:42,c:'#182020'},{w:12,h:50,c:'#304810'},{w:7,h:44,c:'#3A2808'},{w:9,h:46,c:'#101838'}]},
        {y:258, books:[{w:8,h:48,c:'#381818'},{w:11,h:52,c:'#183828'},{w:7,h:44,c:'#1A1A38'},{w:9,h:50,c:'#38280A'},{w:6,h:42,c:'#281838'}]},
        {y:348, books:[{w:9,h:46,c:'#102838'},{w:8,h:44,c:'#281008'},{w:11,h:50,c:'#103828'},{w:7,h:42,c:'#2A2008'},{w:10,h:48,c:'#181028'}]},
      ].map((shelf) => {
        let xpos = 2;
        return shelf.books.map((b, bi) => {
          const el = <rect key={bi} x={xpos} y={shelf.y} width={b.w} height={b.h} rx="1" fill={b.c} />;
          xpos += b.w + 1;
          return el;
        });
      })}

      {/* ═══════════════════════════════════════
          LAYER 4 — WALL DECOR
      ═══════════════════════════════════════ */}

      {/* Engineering diploma / certificate */}
      <g transform="translate(410, 108)">
        <rect x="2" y="3" width="124" height="100" rx="2" fill="#8B6030" opacity="0.3" />
        <rect x="0" y="0" width="124" height="100" rx="2" fill="#8B6030" />
        <rect x="5" y="5" width="114" height="90" fill="#F5ECD8" />
        <rect x="9" y="9" width="106" height="82" fill="#EDE4CC" />
        {/* Cert decorative border */}
        <rect x="9" y="9" width="106" height="82" fill="none" stroke="#C0A060" strokeWidth="1.5" />
        <rect x="13" y="13" width="98" height="74" fill="none" stroke="#C0A060" strokeWidth="0.5" />
        {/* Text lines */}
        <rect x="16" y="18" width="92" height="7" rx="2" fill="#3A2C10" opacity="0.6" />
        <rect x="25" y="30" width="74" height="5" rx="1.5" fill="#3A2C10" opacity="0.45" />
        <rect x="20" y="40" width="84" height="4" rx="1" fill="#3A2C10" opacity="0.35" />
        <rect x="20" y="48" width="80" height="4" rx="1" fill="#3A2C10" opacity="0.3" />
        {/* Seal */}
        <circle cx="62" cy="72" r="14" fill="none" stroke="#C0A060" strokeWidth="1.5" />
        <circle cx="62" cy="72" r="10" fill="#E8D080" opacity="0.4" />
        <circle cx="62" cy="72" r="6" fill="#D0B860" opacity="0.5" />
        <rect x="0" y="0" width="124" height="100" rx="2" fill="none" stroke="#A08040" strokeWidth="1" />
      </g>

      {/* Second smaller certificate */}
      <g transform="translate(554, 124) rotate(1.5)">
        <rect x="2" y="3" width="88" height="70" rx="2" fill="#6B4820" opacity="0.3" />
        <rect x="0" y="0" width="88" height="70" rx="2" fill="#7B5828" />
        <rect x="5" y="5" width="78" height="60" fill="#F0E8D4" />
        <rect x="8" y="8" width="72" height="54" fill="#EBE1CB" />
        <rect x="8" y="8" width="72" height="54" fill="none" stroke="#A8844A" strokeWidth="1" />
        <rect x="12" y="14" width="64" height="6" rx="2" fill="#3A2C10" opacity="0.55" />
        <rect x="18" y="24" width="52" height="4" rx="1" fill="#3A2C10" opacity="0.38" />
        <rect x="14" y="32" width="60" height="3" rx="1" fill="#3A2C10" opacity="0.28" />
        <rect x="14" y="39" width="56" height="3" rx="1" fill="#3A2C10" opacity="0.25" />
        <circle cx="44" cy="54" r="9" fill="none" stroke="#A8844A" strokeWidth="1" />
        <circle cx="44" cy="54" r="6" fill="#C8A848" opacity="0.35" />
      </g>

      {/* Wall calendar — right side of wall */}
      <g transform="translate(1100, 108)">
        <rect x="0" y="0" width="90" height="110" rx="2" fill="#F8F4EC" />
        <rect x="0" y="0" width="90" height="28" fill="#1A3060" rx="2" />
        <rect x="0" y="25" width="90" height="5" fill="#1A3060" />
        {/* Month name */}
        <rect x="10" y="8" width="70" height="9" rx="2" fill="#FFFFFF" opacity="0.7" />
        {/* Day grid */}
        {[0,1,2,3,4].map((row) =>
          [0,1,2,3,4,5,6].map((col) => (
            <rect key={`${row}-${col}`}
              x={4 + col * 12} y={38 + row * 14}
              width="9" height="10" rx="1"
              fill={row === 2 && col === 3 ? '#E83030' : '#D8D0C0'}
              opacity={row === 2 && col === 3 ? 0.9 : 0.55}
            />
          ))
        )}
      </g>

      {/* Sticky note on wall above monitor */}
      <g transform="translate(1030, 95) rotate(-2)">
        <rect x="1" y="2" width="55" height="50" fill="#8A7020" opacity="0.2" />
        <rect x="0" y="0" width="55" height="50" fill="#FFEE50" />
        <rect x="0" y="0" width="55" height="5" fill="#F0DD20" opacity="0.5" />
        <text x="4" y="14" fontSize="6.5" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.8">AnyDesk:</text>
        <text x="4" y="24" fontSize="6.5" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.75">631 448 902</text>
        <text x="4" y="36" fontSize="6" fontFamily="Georgia, serif" fill="#C83020" fillOpacity="0.85">"Microsoft"</text>
        <text x="4" y="46" fontSize="5.5" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.65">gave me this</text>
      </g>

      {/* ═══════════════════════════════════════
          LAYER 5 — DESK
      ═══════════════════════════════════════ */}

      {/* Desk shadow on wall */}
      <rect x="158" y="420" width="1090" height="20" fill="#1A1008" opacity="0.15" />

      {/* Desk body — dark wood */}
      <rect x="160" y="438" width="1090" height="164" fill="url(#ho_deskGrad)" />
      {/* Desk top surface edge highlight */}
      <rect x="160" y="436" width="1092" height="12" rx="2" fill="#3A2C18" />
      {/* Desk front lip */}
      <rect x="158" y="596" width="1094" height="18" rx="2" fill="#2E2416" />
      <rect x="158" y="612" width="1094" height="8" fill="#1E1810" opacity="0.5" />

      {/* Desk shadow on floor */}
      <rect x="200" y="618" width="1040" height="20" fill="#1A0E04" opacity="0.25" />

      {/* Desk legs */}
      <rect x="195" y="614" width="28" height="286" rx="4" fill="#1E1810" />
      <rect x="195" y="614" width="28" height="286" rx="4" fill="#2A2018" opacity="0.5" />
      <rect x="1220" y="614" width="28" height="286" rx="4" fill="#1E1810" />
      <rect x="1220" y="614" width="28" height="286" rx="4" fill="#2A2018" opacity="0.5" />
      {/* Desk crossbar */}
      <rect x="223" y="740" width="997" height="14" rx="3" fill="#1E1810" />

      {/* Desk drawers (right side) */}
      {[448, 510, 572].map((y, i) => (
        <g key={i}>
          <rect x="1108" y={y} width="134" height="56" rx="2" fill="#221A10" stroke="#2E2418" strokeWidth="1.5" />
          <rect x="1115" y={y + 7} width="120" height="42" rx="1" fill="#1C1408" />
          <rect x="1158" y={y + 27} width="34" height="5" rx="2.5" fill="#3A2E1C" />
          <rect x="1158" y={y + 28} width="34" height="2" rx="1" fill="#5A4830" opacity="0.7" />
        </g>
      ))}

      {/* ═══════════════════════════════════════
          LAYER 6 — MONITOR
      ═══════════════════════════════════════ */}

      {/* Monitor shadow on wall */}
      <ellipse cx="756" cy="440" rx="250" ry="18" fill="#1A0E04" opacity="0.22" />

      {/* Monitor outer bezel */}
      <rect x="510" y="128" width="492" height="314" rx="8" fill="#14121E" />
      <rect x="510" y="128" width="492" height="314" rx="8" fill="none" stroke="#2A2838" strokeWidth="2" />

      {/* Monitor inner bezel */}
      <rect x="516" y="134" width="480" height="302" rx="6" fill="#1A1828" />

      {/* Screen area */}
      <rect x="522" y="138" width="468" height="290" rx="4" fill="url(#ho_screenGrad)" />

      {/* === SCREEN CONTENT === */}

      {/* Windows wallpaper — dark blue mountain/aurora */}
      <rect x="522" y="138" width="468" height="290" rx="4" fill="#0A1428" clipPath="url(#ho_screenClip)" />
      {/* Aurora bands on wallpaper */}
      <ellipse cx="720" cy="200" rx="280" ry="60" fill="#103848" opacity="0.5" />
      <ellipse cx="780" cy="230" rx="240" ry="45" fill="#082838" opacity="0.4" />
      <ellipse cx="660" cy="350" rx="260" ry="50" fill="#181028" opacity="0.45" />
      {/* Mountain silhouette */}
      <polygon points="522,380 600,310 660,350 720,295 790,340 860,300 950,380 990,345 990,428 522,428"
        fill="#060E1C" clipPath="url(#ho_screenClip)" />

      {/* Windows taskbar at bottom of screen */}
      <rect x="522" y="400" width="468" height="28" fill="#0C1020" opacity="0.96" clipPath="url(#ho_screenClip)" />
      {/* Start button */}
      <rect x="527" y="404" width="32" height="20" rx="3" fill="#1A2840" clipPath="url(#ho_screenClip)" />
      <circle cx="543" cy="414" r="7" fill="#3060A8" opacity="0.7" clipPath="url(#ho_screenClip)" />
      {/* Search bar */}
      <rect x="564" y="407" width="120" height="14" rx="7" fill="#162030" clipPath="url(#ho_screenClip)" />
      <rect x="570" y="411" width="60" height="5" rx="2" fill="#203848" opacity="0.7" clipPath="url(#ho_screenClip)" />
      {/* Taskbar icons */}
      {[700, 720, 742, 764].map((x, i) => (
        <rect key={i} x={x} y="407" width="16" height="14" rx="2"
          fill="#1A2840" clipPath="url(#ho_screenClip)" opacity="0.8" />
      ))}
      {/* System tray */}
      <rect x="900" y="407" width="80" height="14" rx="3" fill="#1A2840" opacity="0.6" clipPath="url(#ho_screenClip)" />
      <rect x="905" y="411" width="40" height="5" rx="1" fill="#3A5070" opacity="0.55" clipPath="url(#ho_screenClip)" />
      <rect x="950" y="411" width="24" height="5" rx="1" fill="#3A5070" opacity="0.55" clipPath="url(#ho_screenClip)" />
      {/* Clock in tray */}
      <rect x="948" y="407" width="38" height="14" rx="2" fill="#1E2840" clipPath="url(#ho_screenClip)" />
      <rect x="952" y="410" width="28" height="4" rx="1" fill="#506880" opacity="0.7" clipPath="url(#ho_screenClip)" />
      <rect x="956" y="416" width="20" height="3" rx="1" fill="#405870" opacity="0.55" clipPath="url(#ho_screenClip)" />

      {/* === FAKE BROWSER WINDOW (RIGHT SIDE, PARTIALLY BEHIND ALERT) === */}
      {/* Browser chrome */}
      <rect x="820" y="142" width="166" height="254" rx="4" fill="#0E1820" clipPath="url(#ho_screenClip)" />
      <rect x="820" y="142" width="166" height="22" rx="4" fill="#0A1018" clipPath="url(#ho_screenClip)" />
      <rect x="820" y="155" width="166" height="9" fill="#0A1018" clipPath="url(#ho_screenClip)" />
      {/* Browser tab */}
      <rect x="824" y="143" width="80" height="16" rx="3" fill="#162028" clipPath="url(#ho_screenClip)" />
      {/* Address bar — the hotspot clue */}
      <rect x="824" y="148" width="156" height="10" rx="3" fill="#182030" clipPath="url(#ho_screenClip)" />
      {/* Red warning icon — no HTTPS */}
      <circle cx="830" cy="153" r="4" fill="#E04030" opacity="0.9" clipPath="url(#ho_screenClip)" />
      <rect x="829" y="150" width="2" height="3.5" rx="0.5" fill="white" clipPath="url(#ho_screenClip)" />
      <circle cx="830" cy="155.5" r="1" fill="white" clipPath="url(#ho_screenClip)" />
      {/* Phishing domain text — red tinted */}
      <rect x="836" y="151" width="100" height="4" rx="1" fill="#E04030" opacity="0.45" clipPath="url(#ho_screenClip)" />
      <rect x="836" y="151" width="72" height="4" rx="1" fill="#C02820" opacity="0.5" clipPath="url(#ho_screenClip)" />
      {/* Fake Microsoft page header */}
      <rect x="820" y="164" width="166" height="20" fill="#1A4A90" opacity="0.9" clipPath="url(#ho_screenClip)" />
      <rect x="824" y="168" width="40" height="12" rx="1" fill="#FFFFFF" opacity="0.6" clipPath="url(#ho_screenClip)" />
      <rect x="870" y="170" width="60" height="5" rx="1" fill="#A0B8D0" opacity="0.5" clipPath="url(#ho_screenClip)" />
      {/* Page content */}
      <rect x="820" y="186" width="166" height="210" fill="#080E18" clipPath="url(#ho_screenClip)" />
      <rect x="824" y="192" width="120" height="7" rx="2" fill="#C03020" opacity="0.6" clipPath="url(#ho_screenClip)" />
      <rect x="824" y="203" width="158" height="4" rx="1" fill="#405868" opacity="0.5" clipPath="url(#ho_screenClip)" />
      <rect x="824" y="210" width="150" height="4" rx="1" fill="#405868" opacity="0.45" clipPath="url(#ho_screenClip)" />
      <rect x="824" y="217" width="155" height="4" rx="1" fill="#405868" opacity="0.45" clipPath="url(#ho_screenClip)" />
      {/* Call button */}
      <rect x="824" y="228" width="80" height="20" rx="4" fill="#C03020" opacity="0.85" clipPath="url(#ho_screenClip)" />
      <rect x="832" y="234" width="64" height="7" rx="1" fill="#FFFFFF" opacity="0.6" clipPath="url(#ho_screenClip)" />
      {/* Form fields */}
      <rect x="824" y="256" width="155" height="12" rx="2" fill="#142030" clipPath="url(#ho_screenClip)" />
      <rect x="824" y="272" width="155" height="12" rx="2" fill="#142030" clipPath="url(#ho_screenClip)" />
      <rect x="824" y="290" width="155" height="12" rx="2" fill="#142030" clipPath="url(#ho_screenClip)" />
      <rect x="824" y="310" width="80" height="14" rx="4" fill="#1A4A90" opacity="0.8" clipPath="url(#ho_screenClip)" />

      {/* === ANYDESK REMOTE ACCESS BAR (very top of screen) === */}
      {/* Orange warning bar — "Remote Session Active" */}
      <rect x="522" y="138" width="468" height="26" rx="4" fill="#D07010" clipPath="url(#ho_screenClip)" />
      <rect x="522" y="156" width="468" height="8" fill="#C06808" clipPath="url(#ho_screenClip)" />
      {/* AnyDesk logo placeholder */}
      <rect x="527" y="142" width="16" height="18" rx="3" fill="#E88020" opacity="0.9" clipPath="url(#ho_screenClip)" />
      <rect x="529" y="144" width="12" height="14" rx="2" fill="#F09030" opacity="0.8" clipPath="url(#ho_screenClip)" />
      {/* Warning text */}
      <rect x="548" y="144" width="88" height="6" rx="1.5" fill="#FFF8E0" opacity="0.85" clipPath="url(#ho_screenClip)" />
      <rect x="548" y="153" width="130" height="5" rx="1.5" fill="#FFE8A0" opacity="0.65" clipPath="url(#ho_screenClip)" />
      {/* Session info */}
      <rect x="685" y="145" width="110" height="5" rx="1.5" fill="#FFD880" opacity="0.5" clipPath="url(#ho_screenClip)" />
      <rect x="685" y="153" width="80" height="5" rx="1.5" fill="#FFD880" opacity="0.4" clipPath="url(#ho_screenClip)" />
      {/* Disconnect button */}
      <rect x="922" y="143" width="60" height="18" rx="4" fill="#C03020" opacity="0.9" clipPath="url(#ho_screenClip)" />
      <rect x="928" y="148" width="48" height="7" rx="1.5" fill="#FFFFFF" opacity="0.7" clipPath="url(#ho_screenClip)" />

      {/* === FAKE VIRUS ALERT POPUP (DOMINANT CENTER ELEMENT) === */}
      {/* Drop shadow */}
      <rect x="538" y="172" width="278" height="234" rx="5" fill="#000000" opacity="0.5" clipPath="url(#ho_screenClip)" />
      {/* Alert popup body */}
      <rect x="533" y="168" width="278" height="234" rx="5" fill="#F8F4F0" clipPath="url(#ho_screenClip)" />

      {/* Alert header — red */}
      <rect x="533" y="168" width="278" height="48" rx="5" fill="url(#ho_alertHeaderGrad)" clipPath="url(#ho_screenClip)" />
      <rect x="533" y="202" width="278" height="14" fill="#A00808" clipPath="url(#ho_screenClip)" />

      {/* Windows shield icon in header */}
      <rect x="540" y="175" width="28" height="34" rx="2" fill="#E84020" opacity="0.9" clipPath="url(#ho_screenClip)" />
      <polygon points="554,179 542,185 542,197 554,203 566,197 566,185" fill="#FFFFFF" opacity="0.85" clipPath="url(#ho_screenClip)" />
      <rect x="551" y="184" width="6" height="12" rx="1" fill="#C03020" clipPath="url(#ho_screenClip)" />
      <circle cx="554" cy="199" r="2.5" fill="#C03020" clipPath="url(#ho_screenClip)" />

      {/* Header title text */}
      <rect x="574" y="178" width="128" height="7" rx="2" fill="#FFFFFF" opacity="0.92" clipPath="url(#ho_screenClip)" />
      <rect x="574" y="188" width="104" height="5" rx="1.5" fill="#FFD8D0" opacity="0.75" clipPath="url(#ho_screenClip)" />
      <rect x="574" y="196" width="90" height="4.5" rx="1.5" fill="#FFD8D0" opacity="0.65" clipPath="url(#ho_screenClip)" />

      {/* Close button X */}
      <rect x="795" y="174" width="12" height="12" rx="2" fill="#FF4040" opacity="0.9" clipPath="url(#ho_screenClip)" />
      <line x1="797.5" y1="176.5" x2="804.5" y2="183.5" stroke="white" strokeWidth="1.5" clipPath="url(#ho_screenClip)" />
      <line x1="804.5" y1="176.5" x2="797.5" y2="183.5" stroke="white" strokeWidth="1.5" clipPath="url(#ho_screenClip)" />

      {/* Alert body */}
      {/* Trojan name */}
      <rect x="541" y="222" width="220" height="8" rx="2" fill="#C01010" opacity="0.8" clipPath="url(#ho_screenClip)" />
      <rect x="541" y="233" width="240" height="5" rx="1.5" fill="#5A3030" opacity="0.55" clipPath="url(#ho_screenClip)" />
      <rect x="541" y="241" width="230" height="5" rx="1.5" fill="#5A3030" opacity="0.5" clipPath="url(#ho_screenClip)" />
      <rect x="541" y="249" width="215" height="5" rx="1.5" fill="#5A3030" opacity="0.48" clipPath="url(#ho_screenClip)" />

      {/* Divider */}
      <line x1="536" y1="260" x2="808" y2="260" stroke="#D0A0A0" strokeWidth="0.8" clipPath="url(#ho_screenClip)" />

      {/* "CALL MICROSOFT SUPPORT" in red */}
      <rect x="541" y="265" width="200" height="10" rx="2.5" fill="#C01010" opacity="0.85" clipPath="url(#ho_screenClip)" />

      {/* Phone number — big, red */}
      <rect x="541" y="280" width="148" height="14" rx="3" fill="#900808" opacity="0.9" clipPath="url(#ho_screenClip)" />
      <rect x="541" y="282" width="148" height="5" rx="1.5" fill="#C02020" opacity="0.7" clipPath="url(#ho_screenClip)" />
      {/* Number text simulated */}
      <text x="545" y="292" fontSize="10" fontFamily="monospace" fill="#FF6060" fillOpacity="0.9"
        clipPath="url(#ho_screenClip)">0800-221-5533</text>

      {/* Warning text */}
      <rect x="541" y="300" width="240" height="4.5" rx="1" fill="#703030" opacity="0.45" clipPath="url(#ho_screenClip)" />
      <rect x="541" y="307" width="220" height="4" rx="1" fill="#703030" opacity="0.4" clipPath="url(#ho_screenClip)" />

      {/* "CALL NOW" button */}
      <rect x="541" y="318" width="118" height="26" rx="5" fill="#C01010" clipPath="url(#ho_screenClip)" />
      <rect x="541" y="318" width="118" height="26" rx="5" fill="none" stroke="#E83030" strokeWidth="1.5" clipPath="url(#ho_screenClip)" />
      <rect x="553" y="327" width="94" height="8" rx="2" fill="#FFFFFF" opacity="0.85" clipPath="url(#ho_screenClip)" />

      {/* "Do not close" warning */}
      <rect x="541" y="350" width="172" height="4" rx="1" fill="#A06030" opacity="0.5" clipPath="url(#ho_screenClip)" />
      <rect x="541" y="357" width="155" height="4" rx="1" fill="#A06030" opacity="0.42" clipPath="url(#ho_screenClip)" />

      {/* Monitor red glow — the screen illuminates the desk below */}
      <ellipse cx="756" cy="442" rx="280" ry="40" fill="url(#ho_monitorGlow)" />

      {/* Monitor stand */}
      <rect x="712" y="440" width="88" height="14" rx="3" fill="#141220" />
      <rect x="698" y="452" width="116" height="12" rx="3" fill="#141220" />
      {/* Stand neck */}
      <rect x="740" y="454" width="32" height="120" rx="4" fill="#141220" />
      <rect x="742" y="455" width="28" height="118" rx="3" fill="#1E1C2A" />
      {/* Stand base */}
      <ellipse cx="756" cy="575" rx="72" ry="14" fill="#141220" />
      <ellipse cx="756" cy="574" rx="70" ry="12" fill="#1E1C2A" />

      {/* ═══════════════════════════════════════
          LAYER 7 — DESK LAMP
      ═══════════════════════════════════════ */}

      <g transform="translate(1050, 440)">
        {/* Stand base */}
        <ellipse cx="20" cy="138" rx="36" ry="9" fill="#1A1610" />
        <ellipse cx="20" cy="136" rx="32" ry="7" fill="#242018" />
        {/* Vertical pole */}
        <rect x="16" y="50" width="8" height="88" rx="3" fill="#1A1610" />
        {/* Arm */}
        <line x1="20" y1="50" x2="-15" y2="10" stroke="#1A1610" strokeWidth="10" strokeLinecap="round" />
        <line x1="20" y1="50" x2="-15" y2="10" stroke="#282218" strokeWidth="7" strokeLinecap="round" />
        {/* Lamp head */}
        <ellipse cx="-15" cy="8" rx="28" ry="14" fill="#1A1610" />
        <ellipse cx="-15" cy="10" rx="24" ry="11" fill="#242018" />
        {/* Bulb glow */}
        <ellipse cx="-15" cy="10" rx="12" ry="6" fill="#FFD870" opacity="0.8" />
        {/* Lamp light cone on desk */}
        <polygon points="-15,22 -80,138 50,138"
          fill="url(#ho_lampGlow)" />
      </g>

      {/* ═══════════════════════════════════════
          LAYER 8 — RIGHT SHELF UNIT
      ═══════════════════════════════════════ */}

      <rect x="1244" y="68" width="196" height="520" fill="#5C3D1E" />
      <rect x="1244" y="68" width="196" height="520" fill="none" stroke="#7B5230" strokeWidth="2" />
      {/* Shelves */}
      {[120, 220, 320, 420, 520].map((y, i) => (
        <rect key={i} x="1244" y={y} width="196" height="8" fill="#4A2C10" />
      ))}
      {/* Books on right shelf */}
      {[
        {y:76, colors:['#2A1830','#1E3040','#3A2010','#102838','#281020','#1A3820','#302010']},
        {y:176, colors:['#182830','#302010','#1A2840','#283010','#201838','#3A1820','#102A30']},
        {y:276, colors:['#1A2030','#2A3010','#181838','#3A1A10','#102030','#2A2830','#201028']},
      ].map((shelf) => {
        const widths = [22, 18, 26, 20, 16, 24, 20];
        const heights = [42, 36, 46, 40, 32, 44, 38];
        let xpos = 1249;
        return shelf.colors.map((c, bi) => {
          const el = (
            <rect key={bi} x={xpos} y={shelf.y} width={widths[bi]} height={heights[bi]} rx="1" fill={c} />
          );
          xpos += widths[bi] + 2;
          return el;
        });
      })}
      {/* Trophy / award on shelf */}
      <g transform="translate(1258, 330)">
        <rect x="10" y="0" width="30" height="40" rx="3" fill="#C8A020" />
        <rect x="12" y="2" width="26" height="36" rx="2" fill="#D8B030" />
        <polygon points="25,-20 10,0 40,0" fill="#C8A020" />
        <rect x="5" y="40" width="40" height="8" rx="2" fill="#A08020" />
        <rect x="0" y="48" width="50" height="6" rx="2" fill="#8A6C18" />
      </g>
      {/* Printer */}
      <g transform="translate(1252, 426)">
        <rect x="0" y="0" width="178" height="82" rx="5" fill="#C8C4BE" />
        <rect x="4" y="4" width="170" height="74" rx="4" fill="#D4D0CA" />
        <rect x="4" y="4" width="170" height="28" rx="4" fill="#C0BCB6" />
        <rect x="16" y="12" width="80" height="12" rx="3" fill="#A8A4A0" />
        <rect x="100" y="11" width="14" height="14" rx="7" fill="#60A030" opacity="0.85" />
        <rect x="118" y="11" width="14" height="14" rx="7" fill="#E04020" opacity="0.85" />
        <rect x="10" y="38" width="158" height="5" rx="2" fill="#A8A4A0" opacity="0.6" />
        {/* Paper tray */}
        <rect x="14" y="54" width="150" height="20" rx="2" fill="#B8B4AE" />
        <rect x="18" y="57" width="142" height="14" rx="1" fill="#F8F4F0" opacity="0.8" />
      </g>

      {/* ═══════════════════════════════════════
          LAYER 9 — KEYBOARD & MOUSE MAT
      ═══════════════════════════════════════ */}

      {/* Mouse mat — large gaming/office pad */}
      <rect x="490" y="444" width="540" height="148" rx="6" fill="#1A1820" />
      <rect x="492" y="446" width="536" height="144" rx="5" fill="#201E2A" />
      <rect x="492" y="446" width="536" height="144" rx="5" fill="none" stroke="#302840" strokeWidth="1.5" />

      {/* Keyboard */}
      <rect x="510" y="458" width="460" height="118" rx="8" fill="#2A2838" />
      <rect x="514" y="462" width="452" height="110" rx="6" fill="#323040" />
      {/* Key rows */}
      {[0,1,2,3].map((row) => (
        [...Array(row === 0 ? 14 : row === 1 ? 13 : row === 2 ? 12 : 11)].map((_, col) => {
          const keyW = row === 3 ? 36 : 30;
          const keyH = 20;
          const startX = 520 + (row === 3 ? 20 : row * 8);
          const gap = row === 3 ? 4 : 3;
          return (
            <rect key={col}
              x={startX + col * (keyW + gap)}
              y={468 + row * 26}
              width={keyW} height={keyH} rx="3"
              fill="#282638" stroke="#3A3848" strokeWidth="0.5"
            />
          );
        })
      ))}
      {/* Spacebar */}
      <rect x="616" y="546" width="188" height="20" rx="3" fill="#282638" stroke="#3A3848" strokeWidth="0.5" />

      {/* Mouse */}
      <g transform="translate(1000, 468)">
        <ellipse cx="28" cy="56" rx="30" ry="10" fill="#1A1820" opacity="0.4" />
        <rect x="0" y="0" width="56" height="88" rx="22" fill="#2E2C3A" />
        <rect x="2" y="2" width="52" height="84" rx="21" fill="#363448" />
        <line x1="28" y1="20" x2="28" y2="60" stroke="#242232" strokeWidth="2" />
        <rect x="18" y="4" width="22" height="32" rx="8" fill="#2A2838" />
        <rect x="22" y="8" width="14" height="12" rx="6" fill="#3A3848" opacity="0.7" />
        {/* Scroll wheel */}
        <rect x="22" y="22" width="12" height="8" rx="3" fill="#484658" />
      </g>

      {/* ═══════════════════════════════════════
          LAYER 10 — DESK ITEMS (CLUES)
      ═══════════════════════════════════════ */}

      {/* ===== PAPERS / PRINTED INSTRUCTIONS ===== */}
      <g transform="translate(172, 452) rotate(-4)">
        <rect x="2" y="2" width="164" height="126" rx="2" fill="#1A1008" opacity="0.2" />
        <rect x="0" y="0" width="164" height="126" rx="2" fill="#F2EEE4" />
        <rect x="0" y="0" width="164" height="18" fill="#E4E0D4" />
        <rect x="5" y="5" width="120" height="7" rx="2" fill="#1A1808" opacity="0.55" />
        <rect x="5" y="15" width="80" height="4" rx="1" fill="#1A1808" opacity="0.35" />
        {[0,1,2,3,4,5,6,7].map(i => (
          <rect key={i} x="5" y={24 + i * 12} width={145 - (i % 3) * 10} height="4" rx="1"
            fill="#1A1808" opacity={i === 0 ? 0.5 : 0.28} />
        ))}
      </g>
      {/* Second paper, slightly offset */}
      <g transform="translate(180, 462) rotate(2)">
        <rect x="0" y="0" width="158" height="120" rx="2" fill="#F8F4EC" />
        <rect x="0" y="0" width="158" height="16" fill="#EAE6DC" />
        <rect x="5" y="4" width="110" height="7" rx="2" fill="#1A1808" opacity="0.48" />
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x="5" y={22 + i * 12} width={140 - (i % 4) * 8} height="4" rx="1"
            fill="#1A1808" opacity="0.24" />
        ))}
      </g>

      {/* ===== PHONE — SHOWING CALL LOG ===== */}
      <g transform="translate(366, 466)">
        {/* Shadow */}
        <ellipse cx="40" cy="140" rx="44" ry="10" fill="#1A0808" opacity="0.4" />
        {/* Body */}
        <rect x="0" y="0" width="80" height="144" rx="12" fill="#141222" />
        <rect x="0" y="0" width="80" height="144" rx="12" fill="none" stroke="#222038" strokeWidth="2" />
        {/* Camera */}
        <rect x="24" y="4" width="32" height="14" rx="4" fill="#0E0C1A" />
        <circle cx="36" cy="11" r="5" fill="#0A0818" />
        <circle cx="36" cy="11" r="3.5" fill="#161428" />
        <circle cx="47" cy="11" r="4.5" fill="#0A0818" />
        <circle cx="47" cy="11" r="3" fill="#161428" />
        {/* Screen */}
        <rect x="5" y="8" width="70" height="128" rx="9" fill="#080E1E" />
        {/* Status bar */}
        <rect x="5" y="8" width="70" height="14" rx="9" fill="#060C18" />
        <rect x="5" y="16" width="70" height="6" fill="#060C18" />
        <rect x="8" y="10" width="20" height="4" rx="1" fill="#304060" opacity="0.65" />
        <rect x="57" y="10" width="14" height="4" rx="1" fill="#304060" opacity="0.55" />
        {/* Call log header */}
        <rect x="5" y="22" width="70" height="18" fill="#0C1828" />
        <rect x="10" y="26" width="50" height="7" rx="2" fill="#A0B8D0" opacity="0.7" />
        {/* Call entries */}
        {[
          {y:44, duration:'47:12', color:'#E04030', label:'outgoing'},
          {y:64, duration:'2:08', color:'#60A040', label:'incoming'},
          {y:84, duration:'0:22', color:'#60A040', label:'incoming'},
        ].map((call, i) => (
          <g key={i}>
            <rect x="5" y={call.y} width="70" height="18" fill="#0A1420" />
            <line x1="5" y1={call.y + 18} x2="75" y2={call.y + 18}
              stroke="#182030" strokeWidth="0.5" />
            {/* Phone icon */}
            <circle cx="14" cy={call.y + 9} r="6" fill={call.color} opacity="0.7" />
            {/* Number */}
            <rect x="24" y={call.y + 4} width="38" height="4.5" rx="1"
              fill="#A0B8D0" opacity="0.55" />
            {/* Duration */}
            <rect x="24" y={call.y + 11} width={call.duration.length * 4.5} height="3.5" rx="1"
              fill="#607888" opacity="0.45" />
          </g>
        ))}
        {/* Highlight on first call — 47 min to fake Microsoft */}
        <rect x="5" y="44" width="70" height="18" fill="#E04030" opacity="0.08" />
        <rect x="5" y="44" width="3" height="18" fill="#E04030" opacity="0.7" />
        {/* More calls below */}
        <rect x="5" y="104" width="70" height="18" fill="#0A1420" />
        <rect x="5" y="122" width="70" height="14" fill="#0A1420" />
        {/* Home bar */}
        <rect x="25" y="133" width="30" height="3" rx="1.5" fill="#242038" />
        {/* Buttons */}
        <rect x="-3" y="36" width="3" height="18" rx="1.5" fill="#0E0C1A" />
        <rect x="-3" y="60" width="3" height="24" rx="1.5" fill="#0E0C1A" />
        <rect x="80" y="46" width="3" height="28" rx="1.5" fill="#0E0C1A" />
      </g>

      {/* ===== SCRATCH NOTEPAD ===== */}
      <g transform="translate(538, 456) rotate(3)">
        {/* Shadow */}
        <rect x="3" y="4" width="118" height="128" rx="2" fill="#1A1008" opacity="0.2" />
        {/* Pad backing */}
        <rect x="0" y="-8" width="118" height="14" rx="2" fill="#E8A030" />
        {/* Lined paper */}
        <rect x="0" y="0" width="118" height="124" fill="#FFFCF4" />
        {/* Left margin */}
        <line x1="22" y1="0" x2="22" y2="124" stroke="#F0B0B0" strokeWidth="1" strokeOpacity="0.6" />
        {/* Ruled lines */}
        {[14,24,34,44,54,64,74,84,94,104,114].map((y, i) => (
          <line key={i} x1="0" y1={y} x2="118" y2={y}
            stroke="#C0B8D0" strokeWidth="0.6" strokeOpacity="0.5" />
        ))}
        {/* Handwritten content */}
        <text x="26" y="20" fontSize="7.5" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.85">Microsoft Support:</text>
        <text x="26" y="32" fontSize="8.5" fontFamily="Georgia, serif" fill="#C83020" fillOpacity="0.9">0800-221-5533</text>
        <line x1="26" y1="34" x2="104" y2="34" stroke="#C83020" strokeWidth="0.8" strokeOpacity="0.6" />
        <text x="26" y="46" fontSize="7" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.75">AnyDesk: 631 448 902</text>
        <text x="26" y="58" fontSize="7" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.7">Google Play Card:</text>
        <text x="26" y="70" fontSize="7.5" fontFamily="monospace" fill="#1A0808" fillOpacity="0.82">BGCQ-1829-XKPD</text>
        <text x="26" y="82" fontSize="7" fontFamily="Georgia, serif" fill="#1A0808" fillOpacity="0.7">Amazon Gift Card:</text>
        <text x="26" y="94" fontSize="7.5" fontFamily="monospace" fill="#1A0808" fillOpacity="0.8">AZ6H-9QR2-MKVE</text>
        {/* Circled note */}
        <ellipse cx="80" cy="110" rx="28" ry="10" fill="none" stroke="#C83020" strokeWidth="1.2" strokeOpacity="0.6" />
        <text x="57" y="113" fontSize="7" fontFamily="Georgia, serif" fill="#C83020" fillOpacity="0.85">500€ × 4 =??</text>
      </g>

      {/* ===== GIFT CARD ENVELOPES / CARDS ===== */}
      <g transform="translate(820, 448)">
        {/* Stack shadow */}
        <ellipse cx="85" cy="148" rx="90" ry="14" fill="#1A0808" opacity="0.3" />

        {/* Bottom envelope — Amazon */}
        <g transform="rotate(-8) translate(10, 8)">
          <rect x="0" y="0" width="148" height="96" rx="3" fill="#FF9900" />
          <rect x="0" y="0" width="148" height="96" rx="3" fill="#232F3E" opacity="0.85" />
          <rect x="8" y="8" width="132" height="80" rx="2" fill="#1A2530" />
          {/* Amazon logo area */}
          <rect x="14" y="14" width="55" height="16" rx="2" fill="#FF9900" opacity="0.9" />
          <rect x="16" y="17" width="51" height="9" rx="1" fill="#FFA820" opacity="0.8" />
          {/* "Gift Card" text */}
          <rect x="14" y="35" width="80" height="8" rx="2" fill="#FFFFFF" opacity="0.5" />
          <rect x="14" y="47" width="95" height="6" rx="1.5" fill="#A0B0C0" opacity="0.4" />
          {/* Value */}
          <rect x="14" y="60" width="50" height="12" rx="2" fill="#FF9900" opacity="0.75" />
          <rect x="18" y="63" width="42" height="6" rx="1" fill="#FFFFFF" opacity="0.6" />
          {/* Torn open flap */}
          <path d="M 0,0 Q 74,25 148,0" fill="#2A3A4A" opacity="0.5" />
        </g>

        {/* Middle envelope — Google Play */}
        <g transform="rotate(3) translate(0, 4)">
          <rect x="5" y="10" width="150" height="98" rx="3" fill="#34A853" opacity="0.9" />
          <rect x="5" y="10" width="150" height="98" rx="3" fill="none" stroke="#2A8A45" strokeWidth="1.5" />
          <rect x="12" y="17" width="136" height="84" rx="2" fill="#1E3828" />
          {/* G logo area */}
          <circle cx="38" cy="48" r="16" fill="#FFFFFF" opacity="0.15" />
          <circle cx="38" cy="48" r="12" fill="none" stroke="#34A853" strokeWidth="3" opacity="0.7" />
          {/* "Google Play" text bars */}
          <rect x="58" y="38" width="72" height="7" rx="2" fill="#FFFFFF" opacity="0.5" />
          <rect x="58" y="48" width="60" height="5.5" rx="1.5" fill="#A0D0B0" opacity="0.4" />
          {/* Value */}
          <rect x="12" y="70" width="55" height="14" rx="2" fill="#34A853" opacity="0.7" />
          <rect x="15" y="73" width="49" height="7" rx="1.5" fill="#FFFFFF" opacity="0.6" />
          {/* Scratch area — scratched off */}
          <rect x="80" y="68" width="60" height="20" rx="2" fill="#2A4A38" />
          <rect x="82" y="70" width="56" height="16" rx="1" fill="#283A30" />
          {/* Scratch marks */}
          {[0,1,2,3].map(i => (
            <line key={i} x1={84 + i*12} y1="72" x2={90 + i*12} y2="84"
              stroke="#3A5040" strokeWidth="2" strokeOpacity="0.7" />
          ))}
        </g>

        {/* Top card — Google Play face up, code visible */}
        <rect x="8" y="18" width="148" height="92" rx="3" fill="#1E7A3E" />
        <rect x="10" y="20" width="144" height="88" rx="2" fill="#28924A" />
        <rect x="12" y="22" width="140" height="84" rx="2" fill="#1A6A34" />
        {/* Google Play logo simplified */}
        <polygon points="22,36 22,68 50,52" fill="#34C462" opacity="0.85" />
        <polygon points="22,36 50,52 36,44" fill="#50D478" opacity="0.7" />
        {/* "Google Play Gift Card" */}
        <rect x="58" y="32" width="84" height="8" rx="2" fill="#FFFFFF" opacity="0.6" />
        <rect x="58" y="43" width="70" height="5.5" rx="1.5" fill="#90D0A0" opacity="0.5" />
        {/* Value label */}
        <rect x="58" y="56" width="40" height="14" rx="2" fill="#2AAA50" opacity="0.8" />
        <text x="63" y="66" fontSize="8" fontFamily="Arial Black, sans-serif" fill="white" fontWeight="900">€500</text>
        {/* Code number */}
        <rect x="12" y="78" width="136" height="20" rx="3" fill="#0E4A22" />
        <text x="18" y="91" fontSize="8" fontFamily="monospace" fill="#80FF98" fillOpacity="0.85">BGCQ-1829-XKPD-4891</text>
      </g>

      {/* ===== COFFEE MUG ===== */}
      <g transform="translate(1058, 448)">
        {/* Shadow */}
        <ellipse cx="38" cy="106" rx="48" ry="11" fill="#1A0808" opacity="0.3" />
        {/* Saucer */}
        <ellipse cx="38" cy="104" rx="46" ry="11" fill="#C8B8A0" />
        <ellipse cx="38" cy="102" rx="42" ry="9" fill="#D8C8B0" />
        {/* Body */}
        <path d="M 10,28 Q 10,100 38,100 Q 66,100 66,28 Q 66,14 38,14 Q 10,14 10,28 Z" fill="#D0BBAA" />
        <path d="M 12,29 Q 12,98 38,98 Q 64,98 64,29 Q 64,16 38,16 Q 12,16 12,29 Z" fill="#E0CBBA" />
        {/* Rim */}
        <ellipse cx="38" cy="28" rx="28" ry="8" fill="#C8B4A0" />
        <ellipse cx="38" cy="26" rx="26" ry="6" fill="#D6C2B0" />
        {/* Cold coffee — dark, no steam */}
        <ellipse cx="38" cy="26" rx="24" ry="5" fill="#2A1608" />
        <ellipse cx="38" cy="25" rx="22" ry="4" fill="#321C0C" />
        <ellipse cx="38" cy="24" rx="18" ry="3" fill="#2C1808" />
        {/* Handle */}
        <path d="M 66,36 Q 92,38 92,56 Q 92,76 66,80"
          fill="none" stroke="#C4B09C" strokeWidth="12" strokeLinecap="round" />
        <path d="M 66,36 Q 90,38 90,56 Q 90,76 66,80"
          fill="none" stroke="#D8C4B0" strokeWidth="8" strokeLinecap="round" />
        {/* Mug text — "World's Best Engineer" */}
        <rect x="16" y="50" width="48" height="6" rx="1.5" fill="#B8A490" opacity="0.5" />
        <rect x="20" y="60" width="40" height="5" rx="1.5" fill="#B8A490" opacity="0.4" />
        <rect x="16" y="69" width="48" height="5" rx="1.5" fill="#B8A490" opacity="0.35" />
      </g>

      {/* ═══════════════════════════════════════
          LAYER 11 — ATMOSPHERIC EFFECTS
      ═══════════════════════════════════════ */}

      {/* Monitor red glow on ceiling above */}
      <ellipse cx="756" cy="136" rx="200" ry="30" fill="#C01010" opacity="0.04" />

      {/* Desk lamp warm cone on desk surface */}
      <ellipse cx="1010" cy="570" rx="170" ry="38" fill="#FFD870" opacity="0.08" />

      {/* Venetian blind stripes on left wall */}
      {[0,1,2,3,4,5].map((i) => (
        <rect key={i}
          x="395" y={110 + i * 64}
          width="90" height="22"
          fill="#FFD870" opacity="0.04"
        />
      ))}

      {/* Corner shadows */}
      <rect x="0" y="0" width="55" height="900" fill="#1A1008" opacity="0.18" />
      <rect x="1395" y="0" width="45" height="900" fill="#1A1008" opacity="0.15" />
      <rect y="0" width="1440" height="34" fill="#1A1008" opacity="0.1" />

      {/* Ceiling shadow band */}
      <rect y="0" width="1440" height="20" fill="#100C04" opacity="0.2" />
    </svg>
  );
}
