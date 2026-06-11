export default function GamingRoomScene() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gr_wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B0D14"/>
          <stop offset="100%" stopColor="#111520"/>
        </linearGradient>
        <linearGradient id="gr_floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D1018"/>
          <stop offset="100%" stopColor="#0A0C12"/>
        </linearGradient>
        <linearGradient id="gr_desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1C24"/>
          <stop offset="100%" stopColor="#12141A"/>
        </linearGradient>
        <linearGradient id="gr_monGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A3A6A"/>
          <stop offset="100%" stopColor="#0A1830"/>
        </linearGradient>
        <linearGradient id="gr_discordBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E2033"/>
          <stop offset="100%" stopColor="#1A1C2E"/>
        </linearGradient>
        <linearGradient id="gr_mcBg" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#5A7830"/>
          <stop offset="40%" stopColor="#4A9848"/>
          <stop offset="100%" stopColor="#6AB4D8"/>
        </linearGradient>
        <linearGradient id="gr_pcGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7020C8"/>
          <stop offset="50%" stopColor="#2080FF"/>
          <stop offset="100%" stopColor="#00D8C8"/>
        </linearGradient>
        <radialGradient id="gr_monAmbient" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1040A0" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#1040A0" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="gr_ledGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8040FF" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#8040FF" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="gr_routerWarn" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF3020" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#FF3020" stopOpacity="0"/>
        </radialGradient>
        <filter id="gr_glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="gr_softGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
        </filter>
        <clipPath id="gr_leftMon"><rect x="262" y="82" width="440" height="278"/></clipPath>
        <clipPath id="gr_rightMon"><rect x="738" y="108" width="360" height="258"/></clipPath>
      </defs>

      {/* ── BACKGROUND ── */}
      <rect width="1440" height="900" fill="url(#gr_wall)"/>
      {/* Floor */}
      <rect y="598" width="1440" height="302" fill="url(#gr_floor)"/>
      {/* Carpet texture lines */}
      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
        <line key={i} x1="0" y1={610+i*28} x2="1440" y2={610+i*28}
          stroke="#141620" strokeWidth="1.5" strokeOpacity="0.5"/>
      ))}
      {/* Skirting board */}
      <rect y="594" width="1440" height="10" fill="#141820"/>

      {/* ── AMBIENT MONITOR GLOW on wall & floor ── */}
      <ellipse cx="720" cy="400" rx="650" ry="400" fill="url(#gr_monAmbient)"/>
      <ellipse cx="720" cy="650" rx="500" ry="180" fill="#1040A0" fillOpacity="0.08"/>

      {/* ── LEFT WALL POSTER — game art ── */}
      <g transform="translate(42,130)">
        <rect x="1" y="2" width="122" height="178" fill="#0A0C14" opacity="0.5"/>
        <rect width="122" height="178" fill="#0E1020"/>
        <rect width="122" height="178" fill="none" stroke="#303848" strokeWidth="2"/>
        {/* Abstract dark sci-fi poster */}
        <rect width="122" height="90" fill="#080C1A"/>
        <ellipse cx="61" cy="45" rx="32" ry="32" fill="#1828A0" opacity="0.6"/>
        <ellipse cx="61" cy="45" rx="20" ry="20" fill="#3050D0" opacity="0.5"/>
        <ellipse cx="61" cy="45" rx="10" ry="10" fill="#8090FF" opacity="0.7"/>
        {[0,1,2,3,4,5].map(i=>(
          <line key={i} x1={20+i*18} y1="0" x2={10+i*18} y2="90"
            stroke="#4060C0" strokeWidth="0.5" strokeOpacity="0.3"/>
        ))}
        <rect y="90" width="122" height="50" fill="#0C1020"/>
        <rect x="8" y="100" width="106" height="7" rx="2" fill="#5060A0" opacity="0.6"/>
        <rect x="18" y="112" width="86" height="5" rx="1.5" fill="#4050808" opacity="0.45"/>
        <rect x="8" y="122" width="70" height="5" rx="1.5" fill="#3040608" opacity="0.4"/>
        <rect y="140" width="122" height="38" fill="#08090F"/>
        <rect x="8" y="148" width="106" height="4" rx="1" fill="#2030505" opacity="0.5"/>
        <rect x="8" y="156" width="90" height="4" rx="1" fill="#2030505" opacity="0.4"/>
        <rect x="8" y="164" width="70" height="4" rx="1" fill="#2030505" opacity="0.35"/>
      </g>

      {/* ── RIGHT WALL POSTER — band/game ── */}
      <g transform="translate(1278,150)">
        <rect x="1" y="2" width="106" height="146" fill="#080C10" opacity="0.4"/>
        <rect width="106" height="146" fill="#0C0E18"/>
        <rect width="106" height="146" fill="none" stroke="#283040" strokeWidth="1.5"/>
        <rect width="106" height="60" fill="#0A0818"/>
        {/* Skull / dark art */}
        <ellipse cx="53" cy="28" rx="22" ry="22" fill="#1A1030" opacity="0.8"/>
        <ellipse cx="53" cy="26" rx="16" ry="16" fill="#200820" opacity="0.9"/>
        <circle cx="47" cy="24" r="5" fill="#0A0A0A"/>
        <circle cx="59" cy="24" r="5" fill="#0A0A0A"/>
        <path d="M46,32 Q53,36 60,32" fill="none" stroke="#6020A0" strokeWidth="2"/>
        <rect y="60" width="106" height="86" fill="#100818"/>
        <rect x="6" y="68" width="94" height="8" rx="2" fill="#6020A0" opacity="0.7"/>
        <rect x="14" y="82" width="78" height="5" rx="1" fill="#4018607" opacity="0.5"/>
        {[0,1,2,3].map(i=>(
          <rect key={i} x="6" y={94+i*10} width={85-(i*6)} height="4" rx="1"
            fill="#30186050" opacity="0.4"/>
        ))}
      </g>

      {/* ── SHELF (left wall, router on it) ── */}
      <rect x="30" y="318" width="200" height="10" rx="2" fill="#1A1C28"/>
      <rect x="30" y="326" width="200" height="4" fill="#141620"/>
      {/* Router */}
      <g transform="translate(52,246)">
        <rect x="1" y="2" width="138" height="72" rx="4" fill="#080C14" opacity="0.4"/>
        <rect width="138" height="72" rx="4" fill="#0E1220"/>
        <rect width="138" height="72" rx="4" fill="none" stroke="#202838" strokeWidth="1.5"/>
        {/* Router top strip */}
        <rect width="138" height="18" rx="4" fill="#141828"/>
        <rect y="15" width="138" height="5" fill="#141828"/>
        {/* Antennas */}
        <rect x="18" y="-34" width="5" height="38" rx="2" fill="#0E1220"/>
        <rect x="38" y="-28" width="5" height="32" rx="2" fill="#0E1220"/>
        <rect x="96" y="-30" width="5" height="34" rx="2" fill="#0E1220"/>
        <rect x="116" y="-36" width="5" height="40" rx="2" fill="#0E1220"/>
        {/* Status LEDs */}
        <circle cx="20" cy="9" r="4" fill="#20C840" opacity="0.9"/>
        <circle cx="20" cy="9" r="7" fill="#20C840" opacity="0.2"/>
        <circle cx="36" cy="9" r="4" fill="#20C840" opacity="0.9"/>
        {/* RED WARNING LED — the clue */}
        <circle cx="52" cy="9" r="4" fill="#FF2010" opacity="0.95"/>
        <circle cx="52" cy="9" r="8" fill="url(#gr_routerWarn)"/>
        <circle cx="68" cy="9" r="4" fill="#FF8010" opacity="0.85"/>
        <circle cx="84" cy="9" r="4" fill="#181C28" opacity="0.8"/>
        {/* Label */}
        <rect x="8" y="24" width="80" height="5" rx="1" fill="#202838" opacity="0.7"/>
        <rect x="8" y="33" width="60" height="4" rx="1" fill="#202838" opacity="0.5"/>
        {/* Ports on bottom */}
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x={8+i*24} y="58" width="14" height="9" rx="1" fill="#0A0E18"/>
        ))}
      </g>
      {/* Router glow on wall */}
      <ellipse cx="120" cy="275" rx="80" ry="50" fill="#FF2010" fillOpacity="0.04"/>

      {/* Small books / games on shelf */}
      {[{x:196,h:58,c:'#1A3060'},{x:208,h:52,c:'#601020'},{x:218,h:62,c:'#204820'},{x:228,h:48,c:'#382060'}].map((b,i)=>(
        <rect key={i} x={b.x} y={268-b.h} width="9" height={b.h} rx="1" fill={b.c}/>
      ))}

      {/* ── DESK ── */}
      {/* Desk surface */}
      <rect x="180" y="418" width="1070" height="18" rx="3" fill="#1E2130"/>
      <rect x="178" y="432" width="1074" height="8" rx="1" fill="#161820"/>
      {/* Desk body */}
      <rect x="182" y="440" width="1066" height="162" fill="url(#gr_desk)"/>
      {/* LED strip under desk edge — purple/blue */}
      <rect x="182" y="430" width="1066" height="4" rx="1" fill="#6030C0" opacity="0.5"/>
      <rect x="182" y="430" width="1066" height="4" fill="url(#gr_ledGlow)" opacity="0.8"/>
      {/* Desk legs */}
      <rect x="210" y="600" width="22" height="240" rx="3" fill="#141620"/>
      <rect x="1208" y="600" width="22" height="240" rx="3" fill="#141620"/>
      {/* Desk shadow on floor */}
      <ellipse cx="720" cy="618" rx="520" ry="18" fill="#080A10" opacity="0.6"/>

      {/* ── LEFT MONITOR (Minecraft) ── */}
      {/* Outer bezel */}
      <rect x="252" y="72" width="460" height="310" rx="6" fill="#0C0E16"/>
      <rect x="252" y="72" width="460" height="310" rx="6" fill="none" stroke="#1A1E2C" strokeWidth="2"/>
      {/* Inner screen */}
      <rect x="262" y="82" width="440" height="278" rx="4" fill="url(#gr_mcBg)"/>

      {/* Minecraft content */}
      <rect x="262" y="82" width="440" height="278" rx="4" fill="url(#gr_mcBg)" clipPath="url(#gr_leftMon)"/>
      {/* Sky */}
      <rect x="262" y="82" width="440" height="120" fill="#4A9ACA" clipPath="url(#gr_leftMon)"/>
      {/* Clouds */}
      <rect x="290" y="100" width="70" height="24" rx="4" fill="#FFFFFF" fillOpacity="0.75" clipPath="url(#gr_leftMon)"/>
      <rect x="300" y="94" width="50" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.8" clipPath="url(#gr_leftMon)"/>
      <rect x="440" y="108" width="54" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.7" clipPath="url(#gr_leftMon)"/>
      {/* Sun */}
      <rect x="630" y="90" width="28" height="28" fill="#FFD800" clipPath="url(#gr_leftMon)"/>
      {/* Terrain — grass */}
      <rect x="262" y="202" width="440" height="30" fill="#5A9A28" clipPath="url(#gr_leftMon)"/>
      {/* Grass top */}
      <rect x="262" y="196" width="440" height="10" fill="#70B030" clipPath="url(#gr_leftMon)"/>
      {/* Dirt */}
      <rect x="262" y="232" width="440" height="128" fill="#7A5030" clipPath="url(#gr_leftMon)"/>
      {/* Stone blocks */}
      {[0,1,2,3,4].map(i=>(
        <rect key={i} x={272+i*80} y={248} width="72" height="36" rx="1"
          fill="#686868" opacity="0.6" clipPath="url(#gr_leftMon)"/>
      ))}
      {/* Minecraft player hand/sword lower right */}
      <rect x="590" y="280" width="32" height="60" rx="3" fill="#C8A870" clipPath="url(#gr_leftMon)"/>
      <rect x="596" y="248" width="14" height="38" rx="2" fill="#A08040" clipPath="url(#gr_leftMon)"/>
      {/* HUD crosshair */}
      <line x1="480" y1="200" x2="480" y2="212" stroke="white" strokeWidth="2" strokeOpacity="0.8" clipPath="url(#gr_leftMon)"/>
      <line x1="474" y1="206" x2="486" y2="206" stroke="white" strokeWidth="2" strokeOpacity="0.8" clipPath="url(#gr_leftMon)"/>
      {/* HUD hotbar */}
      <rect x="374" y="334" width="196" height="22" rx="3" fill="#000000" fillOpacity="0.5" clipPath="url(#gr_leftMon)"/>
      {[0,1,2,3,4,5,6,7].map(i=>(
        <rect key={i} x={376+i*24} y={336} width="22" height="18" rx="1"
          fill={i===2?'#FFFFFF':'#2A2A2A'} fillOpacity={i===2?0.25:0.6} stroke="#555" strokeWidth="0.5" clipPath="url(#gr_leftMon)"/>
      ))}
      {/* Health bar */}
      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
        <g key={i} clipPath="url(#gr_leftMon)">
          <rect x={374+i*19} y={318} width="16" height="12" rx="1" fill="#FF0000" fillOpacity={i<7?0.8:0.2}/>
        </g>
      ))}
      {/* Minecraft chat (bonus clue area) */}
      <rect x="264" y="280" width="180" height="68" rx="2" fill="#000000" fillOpacity="0.45" clipPath="url(#gr_leftMon)"/>
      <rect x="268" y="284" width="120" height="5" rx="1" fill="#AAAAAA" fillOpacity="0.7" clipPath="url(#gr_leftMon)"/>
      <rect x="268" y="292" width="100" height="5" rx="1" fill="#AAAAAA" fillOpacity="0.6" clipPath="url(#gr_leftMon)"/>
      <rect x="268" y="300" width="160" height="5" rx="1" fill="#FF5555" fillOpacity="0.8" clipPath="url(#gr_leftMon)"/>
      <rect x="268" y="308" width="130" height="5" rx="1" fill="#AAAAAA" fillOpacity="0.55" clipPath="url(#gr_leftMon)"/>
      <rect x="268" y="316" width="140" height="5" rx="1" fill="#55FFFF" fillOpacity="0.65" clipPath="url(#gr_leftMon)"/>
      <rect x="268" y="324" width="110" height="5" rx="1" fill="#FFAA00" fillOpacity="0.7" clipPath="url(#gr_leftMon)"/>
      {/* Monitor stand */}
      <rect x="454" y="382" width="56" height="14" rx="2" fill="#0E1018"/>
      <rect x="468" y="394" width="28" height="30" rx="3" fill="#0E1018"/>
      <ellipse cx="482" cy="424" rx="48" ry="8" fill="#0E1018"/>

      {/* Monitor glow on wall behind */}
      <ellipse cx="482" cy="240" rx="220" ry="150" fill="#1040A0" fillOpacity="0.06"/>

      {/* ── RIGHT MONITOR (Discord) ── */}
      <rect x="728" y="98" width="380" height="300" rx="6" fill="#0C0E16"/>
      <rect x="728" y="98" width="380" height="300" rx="6" fill="none" stroke="#1A1E2C" strokeWidth="2"/>
      <rect x="738" y="108" width="360" height="258" rx="3" fill="url(#gr_discordBg)"/>

      {/* Discord UI */}
      {/* Left sidebar - server icons */}
      <rect x="738" y="108" width="48" height="258" fill="#17192A" clipPath="url(#gr_rightMon)"/>
      {/* Server icons */}
      {[0,1,2,3,4,5].map(i=>(
        <circle key={i} cx="762" cy={128+i*38} r="16"
          fill={i===2?'#5865F2':i===3?'#3BA55C':'#2C2F45'}
          clipPath="url(#gr_rightMon)"/>
      ))}
      {/* Home icon on first */}
      <rect x="750" y="120" width="24" height="18" rx="3" fill="#FFFFFF" fillOpacity="0.7" clipPath="url(#gr_rightMon)"/>

      {/* Channel sidebar */}
      <rect x="786" y="108" width="86" height="258" fill="#1E2035" clipPath="url(#gr_rightMon)"/>
      {/* Server name */}
      <rect x="790" y="114" width="78" height="7" rx="2" fill="#FFFFFF" fillOpacity="0.6" clipPath="url(#gr_rightMon)"/>
      <line x1="786" y1="126" x2="872" y2="126" stroke="#2A2D44" strokeWidth="1" clipPath="url(#gr_rightMon)"/>
      {/* Category */}
      <rect x="790" y="132" width="48" height="4" rx="1" fill="#72768A" fillOpacity="0.6" clipPath="url(#gr_rightMon)"/>
      {/* Channel items */}
      {['#general','#gaming','#links','#off-topic'].map((_,i)=>(
        <g key={i} clipPath="url(#gr_rightMon)">
          <rect x="786" y={140+i*22} width="86" height="18" rx="2"
            fill={i===1?'#3A3D56':i===2?'#3A3D56':'transparent'} fillOpacity="0.7"/>
          <rect x="794" y={145+i*22} width={i===1?54:i===2?40:i===3?52:48} height="5" rx="1"
            fill="#B9BCCF" fillOpacity={i===1||i===2?0.85:0.5}/>
        </g>
      ))}
      {/* User panel bottom */}
      <rect x="786" y="350" width="86" height="16" fill="#181A2E" clipPath="url(#gr_rightMon)"/>
      <circle cx="798" cy="358" r="6" fill="#5865F2" clipPath="url(#gr_rightMon)"/>
      <rect x="808" y="354" width="38" height="4" rx="1" fill="#FFFFFF" fillOpacity="0.65" clipPath="url(#gr_rightMon)"/>
      <rect x="808" y="360" width="26" height="3" rx="1" fill="#3BA55C" fillOpacity="0.7" clipPath="url(#gr_rightMon)"/>

      {/* Main chat area */}
      <rect x="872" y="108" width="226" height="258" fill="#1E2138" clipPath="url(#gr_rightMon)"/>
      {/* Channel header */}
      <rect x="872" y="108" width="226" height="28" fill="#1E2138" clipPath="url(#gr_rightMon)"/>
      <line x1="872" y1="136" x2="1098" y2="136" stroke="#2A2D44" strokeWidth="1" clipPath="url(#gr_rightMon)"/>
      <rect x="880" y="116" width="8" height="12" rx="1" fill="#72768A" clipPath="url(#gr_rightMon)"/>
      <rect x="892" y="119" width="60" height="6" rx="1" fill="#FFFFFF" fillOpacity="0.65" clipPath="url(#gr_rightMon)"/>

      {/* Chat messages */}
      {/* Message 1 */}
      <circle cx="882" cy="152" r="8" fill="#F04747" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="144" width="60" height="5" rx="1" fill="#F04747" fillOpacity="0.8" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="152" width="120" height="5" rx="1" fill="#DCDDDE" fillOpacity="0.65" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="160" width="100" height="5" rx="1" fill="#DCDDDE" fillOpacity="0.55" clipPath="url(#gr_rightMon)"/>

      {/* Message 2 - friend */}
      <circle cx="882" cy="182" r="8" fill="#43B581" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="174" width="54" height="5" rx="1" fill="#43B581" fillOpacity="0.8" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="182" width="112" height="5" rx="1" fill="#DCDDDE" fillOpacity="0.65" clipPath="url(#gr_rightMon)"/>

      {/* Message 3 - suspicious link message */}
      <circle cx="882" cy="204" r="8" fill="#7289DA" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="196" width="70" height="5" rx="1" fill="#7289DA" fillOpacity="0.8" clipPath="url(#gr_rightMon)"/>
      {/* Message text */}
      <rect x="894" y="204" width="180" height="5" rx="1" fill="#DCDDDE" fillOpacity="0.7" clipPath="url(#gr_rightMon)"/>
      {/* THE SUSPICIOUS LINK — underlined, blue, stands out */}
      <rect x="894" y="213" width="150" height="5" rx="1" fill="#00AFF4" fillOpacity="0.9" clipPath="url(#gr_rightMon)"/>
      <line x1="894" y1="218" x2="1044" y2="218" stroke="#00AFF4" strokeWidth="0.8" strokeOpacity="0.8" clipPath="url(#gr_rightMon)"/>
      {/* Link preview card */}
      <rect x="894" y="222" width="186" height="48" rx="3" fill="#16181F" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="222" width="3" height="48" rx="1" fill="#00AFF4" clipPath="url(#gr_rightMon)"/>
      <rect x="900" y="228" width="120" height="5" rx="1" fill="#00AFF4" fillOpacity="0.75" clipPath="url(#gr_rightMon)"/>
      <rect x="900" y="236" width="90" height="4" rx="1" fill="#DCDDDE" fillOpacity="0.5" clipPath="url(#gr_rightMon)"/>
      <rect x="900" y="243" width="160" height="4" rx="1" fill="#DCDDDE" fillOpacity="0.4" clipPath="url(#gr_rightMon)"/>
      <rect x="900" y="250" width="130" height="4" rx="1" fill="#DCDDDE" fillOpacity="0.35" clipPath="url(#gr_rightMon)"/>
      <rect x="1050" y="224" width="28" height="44" rx="2" fill="#1A3050" clipPath="url(#gr_rightMon)"/>

      {/* Message 4 - Luca's reply "claimed!" */}
      <circle cx="882" cy="278" r="8" fill="#FAA61A" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="270" width="32" height="5" rx="1" fill="#FAA61A" fillOpacity="0.8" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="278" width="80" height="5" rx="1" fill="#DCDDDE" fillOpacity="0.65" clipPath="url(#gr_rightMon)"/>

      {/* Message 5 - Friend: "wait did u just click that??" */}
      <circle cx="882" cy="298" r="8" fill="#43B581" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="290" width="54" height="5" rx="1" fill="#43B581" fillOpacity="0.8" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="298" width="175" height="5" rx="1" fill="#FF5555" fillOpacity="0.85" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="306" width="155" height="5" rx="1" fill="#FF5555" fillOpacity="0.75" clipPath="url(#gr_rightMon)"/>
      <rect x="894" y="314" width="130" height="5" rx="1" fill="#DCDDDE" fillOpacity="0.55" clipPath="url(#gr_rightMon)"/>

      {/* Message input */}
      <rect x="878" y="330" width="208" height="24" rx="6" fill="#2C2F48" clipPath="url(#gr_rightMon)"/>
      <rect x="886" y="339" width="80" height="5" rx="1" fill="#72768A" fillOpacity="0.5" clipPath="url(#gr_rightMon)"/>

      {/* Discord monitor stand */}
      <rect x="888" y="406" width="60" height="14" rx="2" fill="#0E1018"/>
      <rect x="904" y="418" width="28" height="22" rx="3" fill="#0E1018"/>
      <ellipse cx="918" cy="440" rx="46" ry="7" fill="#0E1018"/>

      {/* Monitor bridge / dual stand */}
      <rect x="692" y="406" width="180" height="6" rx="2" fill="#12141E"/>

      {/* ── GAMING PC TOWER (right side of desk) ── */}
      <g transform="translate(1138, 210)">
        <rect x="1" y="2" width="108" height="228" rx="4" fill="#080A14" opacity="0.5"/>
        <rect width="108" height="228" rx="4" fill="#0E1020"/>
        <rect width="108" height="228" rx="4" fill="none" stroke="#1E2238" strokeWidth="2"/>
        {/* Glass panel side */}
        <rect x="4" y="4" width="100" height="220" rx="3" fill="#080C1C" opacity="0.9"/>
        {/* RGB strip inside - vertical */}
        <rect x="6" y="10" width="5" height="210" rx="2" fill="url(#gr_pcGlow)" opacity="0.9"/>
        {/* RGB bottom horizontal */}
        <rect x="6" y="208" width="96" height="5" rx="2" fill="url(#gr_pcGlow)" opacity="0.7"/>
        {/* Fan rings */}
        <circle cx="54" cy="80" r="42" fill="none" stroke="#1A2040" strokeWidth="8"/>
        <circle cx="54" cy="80" r="30" fill="none" stroke="#3060C0" strokeWidth="3" strokeOpacity="0.5"/>
        <circle cx="54" cy="80" r="18" fill="#0A0E1C"/>
        <circle cx="54" cy="80" r="12" fill="url(#gr_pcGlow)" fillOpacity="0.6"/>
        {/* Fan blades */}
        {[0,1,2,3,4,5,6,7].map(i=>(
          <line key={i}
            x1="54" y1="80"
            x2={54+26*Math.cos(i*Math.PI/4)}
            y2={80+26*Math.sin(i*Math.PI/4)}
            stroke="#2040A0" strokeWidth="2.5" strokeOpacity="0.6"/>
        ))}
        {/* Second fan */}
        <circle cx="54" cy="170" r="30" fill="none" stroke="#1A2040" strokeWidth="6"/>
        <circle cx="54" cy="170" r="20" fill="none" stroke="#3060C0" strokeWidth="2" strokeOpacity="0.4"/>
        <circle cx="54" cy="170" r="10" fill="#0A0E1C"/>
        {[0,1,2,3,4,5,6,7].map(i=>(
          <line key={i}
            x1="54" y1="170"
            x2={54+18*Math.cos(i*Math.PI/4)}
            y2={170+18*Math.sin(i*Math.PI/4)}
            stroke="#2040A0" strokeWidth="2" strokeOpacity="0.5"/>
        ))}
        {/* Power button */}
        <circle cx="88" cy="18" r="7" fill="#1A1E30" stroke="#3050A0" strokeWidth="1.5"/>
        <circle cx="88" cy="18" r="4" fill="#4060C0" opacity="0.7"/>
        {/* USB ports */}
        <rect x="72" y="32" width="24" height="8" rx="1" fill="#0A0C18"/>
        <rect x="73" y="33" width="10" height="6" rx="0.5" fill="#1A1E30"/>
        <rect x="85" y="33" width="10" height="6" rx="0.5" fill="#1A1E30"/>
      </g>
      {/* PC glow on desk/wall */}
      <ellipse cx="1192" cy="340" rx="100" ry="120" fill="#4020C0" fillOpacity="0.08"/>

      {/* ── DESK ITEMS ── */}

      {/* Gaming keyboard */}
      <g transform="translate(440, 432)">
        <rect x="1" y="2" width="358" height="80" rx="5" fill="#0A0C14" opacity="0.4"/>
        <rect width="358" height="80" rx="5" fill="#12141E"/>
        <rect width="358" height="80" rx="5" fill="none" stroke="#1E2238" strokeWidth="1.5"/>
        {/* RGB strip front edge */}
        <rect y="74" width="358" height="6" rx="2" fill="url(#gr_pcGlow)" opacity="0.7"/>
        {/* Key grid */}
        {[0,1,2,3].map(row=>(
          [...Array(row===0?14:row===1?13:row===2?12:10)].map((_,col)=>(
            <rect key={col} x={8+col*(row===3?32:24)} y={8+row*17}
              width={row===3?28:20} height="14" rx="2"
              fill="#0C0E1C" stroke="#1A1E30" strokeWidth="0.5"/>
          ))
        ))}
        {/* Spacebar */}
        <rect x="72" y="59" width="148" height="14" rx="2" fill="#0C0E1C" stroke="#1A1E30" strokeWidth="0.5"/>
      </g>

      {/* Mouse */}
      <g transform="translate(820, 436)">
        <ellipse cx="30" cy="72" rx="32" ry="10" fill="#080A10" fillOpacity="0.5"/>
        <rect width="60" height="90" rx="24" fill="#12141E"/>
        <rect width="60" height="90" rx="24" fill="none" stroke="#1E2238" strokeWidth="1.5"/>
        <line x1="30" y1="20" x2="30" y2="60" stroke="#0A0C18" strokeWidth="2"/>
        <rect x="18" y="4" width="24" height="30" rx="8" fill="#0C0E18"/>
        <rect x="22" y="18" width="16" height="8" rx="3" fill="#3050A0" opacity="0.6"/>
        {/* RGB strip */}
        <rect x="4" y="50" width="52" height="3" rx="1" fill="url(#gr_pcGlow)" opacity="0.6"/>
      </g>

      {/* Mouse pad */}
      <rect x="395" y="420" width="490" height="102" rx="5" fill="#0A0C14" opacity="0.8"/>
      <rect x="397" y="422" width="486" height="98" rx="4" fill="#0E1020" opacity="0.9"/>

      {/* Gaming headset on desk (right of keyboard) */}
      <g transform="translate(910, 412)">
        {/* Headband */}
        <path d="M20,60 Q20,-10 80,-10 Q140,-10 140,60" fill="none" stroke="#1A1E2E" strokeWidth="14" strokeLinecap="round"/>
        <path d="M20,60 Q20,-10 80,-10 Q140,-10 140,60" fill="none" stroke="#242840" strokeWidth="9" strokeLinecap="round"/>
        {/* RGB strip on headband */}
        <path d="M35,40 Q35,0 80,0 Q125,0 125,40" fill="none" stroke="url(#gr_pcGlow)" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
        {/* Left ear cup */}
        <ellipse cx="20" cy="64" rx="18" ry="22" fill="#1A1E2E"/>
        <ellipse cx="20" cy="64" rx="13" ry="17" fill="#101420"/>
        <ellipse cx="20" cy="64" rx="7" ry="9" fill="#2040A0" fillOpacity="0.5"/>
        {/* Right ear cup */}
        <ellipse cx="140" cy="64" rx="18" ry="22" fill="#1A1E2E"/>
        <ellipse cx="140" cy="64" rx="13" ry="17" fill="#101420"/>
        <ellipse cx="140" cy="64" rx="7" ry="9" fill="#2040A0" fillOpacity="0.5"/>
        {/* Mic arm */}
        <path d="M20,74 Q0,90 0,110" fill="none" stroke="#1A1E2E" strokeWidth="5" strokeLinecap="round"/>
        <rect x="-6" y="108" width="12" height="18" rx="4" fill="#1A1E2E"/>
        <rect x="-4" y="110" width="8" height="14" rx="3" fill="#242840"/>
      </g>

      {/* Energy drink cans */}
      {/* Can 1 - upright */}
      <g transform="translate(1080, 402)">
        <ellipse cx="14" cy="36" rx="16" ry="5" fill="#080A10" fillOpacity="0.6"/>
        <rect x="-2" y="-4" width="32" height="36" rx="8" fill="#1A1A1A"/>
        <rect x="-2" y="-4" width="32" height="36" rx="8" fill="none" stroke="#202020" strokeWidth="1"/>
        {/* Brand stripe */}
        <rect x="-2" y="4" width="32" height="12" fill="#C0D000" opacity="0.9"/>
        <rect x="-2" y="-4" width="32" height="10" rx="8" fill="#1A1A1A"/>
        <rect x="-2" y="22" width="32" height="10" rx="8" fill="#1A1A1A"/>
        <ellipse cx="14" cy="-4" rx="14" ry="4" fill="#252525"/>
        <ellipse cx="14" cy="-2" rx="8" ry="3" fill="#303030"/>
      </g>
      {/* Can 2 - crushed/fallen */}
      <g transform="translate(1108, 424) rotate(-35)">
        <rect x="-2" y="-4" width="28" height="28" rx="7" fill="#1A1A1A"/>
        <rect x="-2" y="2" width="28" height="10" fill="#C0D000" opacity="0.8"/>
        <ellipse cx="12" cy="-4" rx="12" ry="3.5" fill="#252525"/>
      </g>

      {/* ── GAMING CHAIR (visible top + back) ── */}
      <g transform="translate(490, 530)">
        {/* Chair back */}
        <rect x="1" y="2" width="408" height="208" rx="14" fill="#0A0C14" opacity="0.4"/>
        <rect width="408" height="208" rx="14" fill="#101420"/>
        <rect width="408" height="208" rx="14" fill="none" stroke="#1A1E2E" strokeWidth="2"/>
        {/* Center stripe */}
        <rect x="164" y="0" width="80" height="208" rx="6" fill="#0C0E1C"/>
        {/* Side bolsters */}
        <rect x="0" y="0" width="60" height="208" rx="14" fill="#0E1022"/>
        <rect x="348" y="0" width="60" height="208" rx="14" fill="#0E1022"/>
        {/* RGB strip on top */}
        <rect x="10" y="0" width="388" height="5" rx="2" fill="url(#gr_pcGlow)" opacity="0.65"/>
        {/* Headrest */}
        <rect x="130" y="-40" width="148" height="60" rx="10" fill="#101420"/>
        <rect x="130" y="-40" width="148" height="60" rx="10" fill="none" stroke="#1A1E2E" strokeWidth="2"/>
        <rect x="160" y="-40" width="88" height="60" rx="6" fill="#0C0E1C"/>
        {/* Logo on back */}
        <rect x="170" y="80" width="68" height="8" rx="2" fill="#1E2238"/>
        <rect x="178" y="92" width="52" height="6" rx="1.5" fill="#1A1E30"/>
      </g>
      {/* Chair arms visible at sides */}
      <rect x="466" y="630" width="30" height="60" rx="8" fill="#0E1020"/>
      <rect x="920" y="630" width="30" height="60" rx="8" fill="#0E1020"/>

      {/* ── SCHOOL BACKPACK (floor, bottom left) ── */}
      <g transform="translate(152, 680)">
        <rect x="1" y="2" width="112" height="142" rx="12" fill="#080A10" opacity="0.4"/>
        <rect width="112" height="142" rx="12" fill="#1A2840"/>
        <rect width="112" height="142" rx="12" fill="none" stroke="#243450" strokeWidth="2"/>
        {/* Front pocket */}
        <rect x="8" y="64" width="96" height="70" rx="8" fill="#162038"/>
        <rect x="8" y="64" width="96" height="70" rx="8" fill="none" stroke="#1E2C44" strokeWidth="1.5"/>
        {/* Zipper line */}
        <line x1="8" y1="70" x2="104" y2="70" stroke="#2A3C58" strokeWidth="1.5"/>
        {/* Zipper pull */}
        <circle cx="56" cy="70" r="4" fill="#3A5070"/>
        {/* Shoulder strap visible */}
        <rect x="36" y="-28" width="18" height="36" rx="6" fill="#142034"/>
        <rect x="62" y="-28" width="18" height="36" rx="6" fill="#142034"/>
        {/* School badge / patch */}
        <rect x="16" y="72" width="40" height="28" rx="3" fill="#1A2A44"/>
        <rect x="18" y="74" width="36" height="24" rx="2" fill="#0E1828"/>
        <rect x="20" y="78" width="32" height="4" rx="1" fill="#3050A0" opacity="0.6"/>
        <rect x="20" y="86" width="24" height="3" rx="1" fill="#3050A0" opacity="0.45"/>
        {/* Keychain */}
        <line x1="100" y1="62" x2="100" y2="50" stroke="#2A3C58" strokeWidth="1.5"/>
        <rect x="95" y="42" width="10" height="10" rx="2" fill="#C0A020" opacity="0.7"/>
      </g>

      {/* ── ATMOSPHERIC EFFECTS ── */}

      {/* Screen light on desk surface */}
      <ellipse cx="720" cy="440" rx="350" ry="18" fill="#1040A0" fillOpacity="0.12"/>

      {/* LED strip glow on wall (above desk edge) */}
      <rect x="182" y="396" width="1066" height="26" fill="#6030C0" fillOpacity="0.04"/>
      <rect x="182" y="396" width="1066" height="10" fill="#8040FF" fillOpacity="0.06"/>

      {/* Ceiling edge shadow */}
      <rect width="1440" height="32" fill="#060810"/>

      {/* Corner vignettes */}
      <rect width="80" height="900" fill="#060810" opacity="0.5"/>
      <rect x="1360" width="80" height="900" fill="#060810" opacity="0.5"/>

      {/* Subtle scanline feel */}
      <rect width="1440" height="900" fill="url(#gr_wall)" opacity="0.06"/>
    </svg>
  );
}
