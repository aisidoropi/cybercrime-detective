import type { Level } from '../types/game';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'The Morning Message',
    subtitle: 'A quiet kitchen. A vibrating phone. A moment that changed everything.',
    victim: {
      name: 'Hilde Bauer',
      age: 72,
      description: 'Retired schoolteacher. Lives alone in Freiburg. Trusts authority.',
    },
    briefing:
      'Early Tuesday morning. Hilde was eating breakfast when her phone buzzed. What seemed like a routine notification led her to hand over her bank details to a stranger. Investigate the kitchen. Find out how it happened.',
    interviewQuestions: [
      {
        id: 'morning-routine',
        question: 'Walk me through your morning — what do you usually do first thing?',
        answer: "Oh, you know, the usual. I wake up around seven, put on the kettle. Sometimes I stop by the café downstairs — they know me there. I catch up on my messages while the tea steeps. My granddaughter sends me pictures of the garden. It's nice to see what she's up to before I start my day.",
      },
      {
        id: 'password-habits',
        question: 'How careful are you with your passwords?',
        answer: "Passwords... I try, but it's so many of them, you know? I use the same one for most things — my email, the shopping sites, the bank app. It's just easier to remember that way. I wrote it down somewhere safe, I think. Or maybe I didn't. My memory isn't what it used to be.",
      },
      {
        id: 'public-computers',
        question: 'Do you ever use public computers?',
        answer: "Sometimes, yes. The library has those computers anyone can use. I go there on Thursdays for the knitting circle. Sometimes I check my email there if my tablet is acting up. They said it's perfectly safe — they wipe them every night, the librarian told me.",
      },
      {
        id: 'link-habits',
        question: 'How do you usually handle links people send you?',
        answer: "If it looks important, I click it. My grandson sends me articles, my friends send me birthday cards — those little animations. I don't really look at the address, I just... if it looks like it's from someone I know, I trust it. Is that wrong?",
      },
    ],
    clues: [
      {
        id: 'phone-notification',
        label: 'Vibrating Smartphone',
        shortDesc: 'A message notification glows on the screen.',
        detail:
          'The screen reads: "DHL PAKET: Ihre Sendung #4829X wartet auf Zollgebühr. Bitte bezahlen Sie jetzt: bit.ly/dhl-zoll-de" — The sender is listed as +49 800 DHLEXPR. The link shortener hides the real destination.',
        type: 'screenshot',
        icon: '📱',
        x: 53,
        y: 78,
        hitW: 7,
        hitH: 18,
        discovered: false,
        boardX: 120,
        boardY: 80,
      },
      {
        id: 'sender-number',
        label: 'SMS Sender Number',
        shortDesc: 'The sender number looks official — but is it?',
        detail:
          'The number +49 800 DHLEXPR appears legitimate at a glance. But real DHL never sends payment links via SMS. This number was spoofed — attackers can fake any sender ID they want using SMS spoofing services. Hilde had no way to know.',
        type: 'note',
        icon: '📋',
        x: 53,
        y: 73,
        hitW: 6,
        hitH: 6,
        discovered: false,
        boardX: 320,
        boardY: 60,
      },
      {
        id: 'suspicious-website',
        label: 'Fake DHL Website',
        shortDesc: 'A browser tab left open on the kitchen counter tablet.',
        detail:
          'The tablet shows a website: "dhl-zollzahlung-secure.net" — it looks identical to the real DHL site. But look closely: the domain is wrong, the padlock is missing, and the payment form asks for full card details including CVV. This is a pixel-perfect phishing clone.',
        type: 'screenshot',
        icon: '🖥️',
        x: 76,
        y: 48,
        hitW: 17,
        hitH: 20,
        discovered: false,
        boardX: 520,
        boardY: 100,
      },
      {
        id: 'fridge-note',
        label: 'Handwritten Fridge Note',
        shortDesc: 'A note in Hilde\'s handwriting pinned to the fridge.',
        detail:
          '"DHL — Sendungsnummer 4829X — 4,95€ Zoll bezahlt — Karte: 4*** ***8 CVV 392" — Hilde wrote down the payment details as a reminder. She entered her full card number and CVV into the fake site. The attackers now have everything they need to make fraudulent purchases.',
        type: 'note',
        icon: '📝',
        x: 34,
        y: 47,
        hitW: 9,
        hitH: 12,
        discovered: false,
        boardX: 180,
        boardY: 260,
      },
      {
        id: 'browser-indicator',
        label: 'Missing Padlock',
        shortDesc: 'The browser address bar reveals a critical warning sign.',
        detail:
          'The address bar shows "http://" — not "https://". There is no padlock icon. Modern browsers mark these sites as "Not Secure". The real DHL website always uses HTTPS with a valid certificate. This single detail could have saved Hilde — but most people never check.',
        type: 'photo',
        icon: '🔓',
        x: 76,
        y: 41,
        hitW: 12,
        hitH: 5,
        discovered: false,
        boardX: 400,
        boardY: 280,
      },
    ],
    bonusClues: [
      {
        id: 'coffee-mug',
        label: 'Cold Coffee Mug',
        shortDesc: 'Coffee gone cold. She\'s been distracted for a while.',
        detail:
          'The coffee is stone cold. Hilde must have been on the fake website for at least 30 minutes — reading, re-reading, trying to understand. Scammers design their sites to create urgency and confusion. The longer a victim stays, the more likely they are to comply.',
        type: 'witness',
        icon: '☕',
        x: 44,
        y: 82,
        hitW: 7,
        hitH: 14,
        discovered: false,
        boardX: 60,
        boardY: 180,
      },
      {
        id: 'newspaper',
        label: 'Folded Newspaper',
        shortDesc: 'Today\'s paper. Unread. Something interrupted her morning.',
        detail:
          'The newspaper is still folded — front page unread. Hilde never got to her morning ritual. The SMS arrived before she finished breakfast. Attackers target morning hours when people are still waking up and their guard is lowest.',
        type: 'photo',
        icon: '📰',
        x: 36,
        y: 80,
        hitW: 14,
        hitH: 16,
        discovered: false,
        boardX: 560,
        boardY: 280,
      },
    ],
    accusationOptions: [
      {
        id: 'smishing',
        label: 'SMS Phishing (Smishing)',
        description:
          'The attacker sent a fraudulent SMS impersonating DHL with a link to a fake payment portal, harvesting Hilde\'s card details.',
        icon: '📱',
      },
      {
        id: 'vishing',
        label: 'Voice Call Scam (Vishing)',
        description:
          'Someone called Hilde pretending to be DHL support and verbally obtained her card details over the phone.',
        icon: '📞',
      },
      {
        id: 'malware',
        label: 'Banking Malware',
        description:
          'Malware installed on her tablet intercepted her banking app and redirected her payment to attackers.',
        icon: '🦠',
      },
      {
        id: 'data-breach',
        label: 'Dark Web Data Breach',
        description:
          'Hilde\'s card details were purchased from a previous data breach and used without any interaction from her.',
        icon: '🕵️',
      },
      {
        id: 'phishing',
        label: 'Email Phishing',
        description:
          'A fraudulent email was sent to Hilde with a link to a fake website designed to steal her credentials.',
        icon: '📧',
      },
      {
        id: 'shoulder-surfing',
        label: 'Shoulder Surfing',
        description:
          'Someone watched Hilde enter her password or PIN in a public place and copied it.',
        icon: '👀',
      },
    ],
    correctAnswers: ['smishing'],
    handbookTerms: [
      {
        term: 'Smishing',
        oneLiner: 'Phishing attacks delivered via SMS text message.',
        analogy:
          'Like a forged letter that looks like it came from your bank — but it was slipped under your door by a thief.',
        inThisCase:
          'The attacker sent Hilde a text pretending to be DHL, tricking her into visiting a fake payment site.',
      },
      {
        term: 'Phishing',
        oneLiner: 'Tricking someone into revealing sensitive information by impersonating a trusted source.',
        analogy:
          'Casting a wide net in a lake, hoping a fish mistakes the fake lure for real food.',
        inThisCase:
          'The fake DHL website was designed to look identical to the real one so Hilde wouldn\'t question it.',
      },
      {
        term: 'Spoofed Sender ID',
        oneLiner: 'Faking the sender name or number on a text or email.',
        analogy:
          'Writing anyone\'s return address on an envelope — the post office doesn\'t verify if it\'s actually you.',
        inThisCase:
          'The attackers made the SMS appear to come from a number that resembled official DHL contact.',
      },
      {
        term: 'HTTPS / TLS',
        oneLiner: 'Encrypted connection between your browser and a website.',
        analogy:
          'A sealed, tamper-evident envelope — you know no one opened it in transit.',
        inThisCase:
          'The fake site used HTTP, not HTTPS — meaning the connection was unencrypted and the site had no verified certificate.',
      },
      {
        term: 'Social Engineering',
        oneLiner: 'Manipulating people into giving up information or access rather than hacking systems.',
        analogy:
          'A con artist doesn\'t pick the lock — they convince you to hand over the keys.',
        inThisCase:
          'The fake urgency ("pay now or your package will be returned") pressured Hilde into acting without thinking.',
      },
    ],
    successOutcome:
      'Case closed. You correctly identified the attack as SMS Phishing (Smishing). The Cybercrime Unit traced the fake domain to a server farm in Eastern Europe. Hilde\'s bank reversed the charges. The phone number was added to the national fraud registry. Three other victims were protected because of your investigation.',
    failureOutcome:
      'Incorrect conclusion. Review your evidence. Hilde received no phone calls — only a text message. Her tablet showed a website, not a banking app. And the note on the fridge tells you exactly what she entered and where. Look again.',
  },
  {
    id: 2,
    title: 'Link in the Chat',
    subtitle: 'A Discord message from a friend. One click. An account gone overnight.',
    victim: {
      name: 'Luca Bianchi',
      age: 15,
      description: 'Student, gamer, lives with his parents in Berlin. Active on Discord every evening.',
    },
    briefing:
      'Friday evening. Luca was playing Minecraft when a message arrived in his Discord server. A link. A promise of a free account upgrade. One click later, his Discord was posting the same link to everyone he knew. Investigate the gaming room. Find out what happened.',
    clues: [
      {
        id: 'discord-link',
        label: 'Suspicious Discord Link',
        shortDesc: 'A blue underlined link in the chat — something about a free Minecraft upgrade.',
        detail:
          '"minecraft-premium-claim.xyz/free" — this URL does not belong to Minecraft or Microsoft. It was sent from a friend\'s account that had already been compromised. The link opened a page that looked identical to the Discord login screen. When Luca entered his credentials, they were sent directly to an attacker\'s server. His account was taken over within seconds.',
        type: 'screenshot',
        icon: '🔗',
        x: 68,
        y: 25,
        hitW: 14,
        hitH: 8,
        discovered: false,
        boardX: 300,
        boardY: 80,
      },
      {
        id: 'link-preview',
        label: 'Phishing Domain Preview',
        shortDesc: 'The link unfurls into a preview card with a suspicious domain.',
        detail:
          'Discord automatically fetches a preview of any shared link. The preview card shows "minecraft-premium-claim.xyz" — a domain registered 3 days ago with a privacy-protected registrant. The real Minecraft website is minecraft.net. Any other domain offering account upgrades is a phishing site. The preview was the one visible warning Luca missed.',
        type: 'screenshot',
        icon: '🌐',
        x: 74,
        y: 30,
        hitW: 10,
        hitH: 6,
        discovered: false,
        boardX: 480,
        boardY: 80,
      },
      {
        id: 'router-alert',
        label: 'Router Warning LED',
        shortDesc: 'The router on the shelf has a red LED blinking. It wasn\'t doing that before.',
        detail:
          'The router\'s intrusion-detection LED is red. The admin log shows an outbound connection established at 21:47 to 185.220.101.47 — a known Tor exit node and phishing relay server flagged in multiple threat databases. This connection was made from Luca\'s PC at the exact moment he clicked the link. The attacker\'s server received his credentials over an encrypted tunnel.',
        type: 'photo',
        icon: '📡',
        x: 9,
        y: 31,
        hitW: 13,
        hitH: 9,
        discovered: false,
        boardX: 60,
        boardY: 200,
      },
      {
        id: 'luca-reply',
        label: 'Luca\'s "claimed!" Message',
        shortDesc: 'Luca replied "claimed!" — he thought it worked.',
        detail:
          'Luca\'s own message in the chat: "claimed! 🎉". He believed the phishing page was a legitimate upgrade portal. This message was sent at 21:47 — exactly when the router log records the outbound connection. The attacker\'s system confirms receipt of valid credentials within 8 seconds of the page being loaded. Luca had no idea his account was already gone.',
        type: 'note',
        icon: '💬',
        x: 63,
        y: 33,
        hitW: 10,
        hitH: 4,
        discovered: false,
        boardX: 160,
        boardY: 200,
      },
      {
        id: 'friend-warning',
        label: 'Friend\'s Panic Message',
        shortDesc: 'A friend in the chat: "wait did u just send me that?? I got that link too"',
        detail:
          'Minutes after Luca "claimed" his upgrade, his friend sent a panicked message: the same link had been posted to three other servers by Luca\'s account — without Luca touching the keyboard. The attacker had already taken control and was using Luca\'s account to spread the phishing link to his entire contact list. This is the classic "account compromise → propagation" pattern.',
        type: 'witness',
        icon: '😱',
        x: 68,
        y: 38,
        hitW: 16,
        hitH: 6,
        discovered: false,
        boardX: 360,
        boardY: 240,
      },
    ],
    bonusClues: [
      {
        id: 'minecraft-chat',
        label: 'Minecraft In-Game Chat',
        shortDesc: 'Minecraft chat shows Luca was active — then went quiet mid-session.',
        detail:
          'The in-game Minecraft chat shows normal activity, then nothing. Luca stopped responding to his server at 21:47 — the same minute the Discord link appeared. He switched windows to check Discord and never came back. His character was left standing in the open, unattended. His friends on the server noticed immediately.',
        type: 'witness',
        icon: '🎮',
        x: 25,
        y: 35,
        hitW: 12,
        hitH: 8,
        discovered: false,
        boardX: 80,
        boardY: 370,
      },
      {
        id: 'energy-drink',
        label: 'Crushed Energy Drink Can',
        shortDesc: 'A second empty can. He\'s been at this desk since afternoon.',
        detail:
          'Two energy drink cans — one fresh, one crushed. Luca had been gaming for hours before the attack. Prolonged gaming sessions lower attention and critical thinking. The attacker\'s timing was not random: phishing links sent in the evening, when users are tired and in flow state, have measurably higher click-through rates.',
        type: 'photo',
        icon: '🥤',
        x: 77,
        y: 48,
        hitW: 6,
        hitH: 8,
        discovered: false,
        boardX: 540,
        boardY: 370,
      },
    ],
    accusationOptions: [
      {
        id: 'phishing',
        label: 'Discord Phishing Link (Credential Theft)',
        description:
          'A compromised friend\'s account sent a fake "free upgrade" link. Luca entered his Discord credentials on a phishing page, handing the attacker full account access.',
        icon: '🔗',
      },
      {
        id: 'malware-mod',
        label: 'Malware Hidden in a Game Mod',
        description:
          'Luca downloaded a Minecraft mod from an unofficial site that contained malware, which harvested his login credentials from memory.',
        icon: '🦠',
      },
      {
        id: 'account-brute-force',
        label: 'Password Brute Force Attack',
        description:
          'An automated script tried thousands of password combinations until it found the correct one for Luca\'s Discord account.',
        icon: '🔐',
      },
      {
        id: 'sim-swap',
        label: 'SIM Card Swap',
        description:
          'Attackers convinced Luca\'s mobile provider to transfer his phone number to their SIM, then used SMS codes to reset his Discord password.',
        icon: '📱',
      },
      {
        id: 'session-hijack',
        label: 'Session Hijacking',
        description:
          'An attacker intercepted Luca\'s login session token over the network and used it to access his account without needing credentials.',
        icon: '🎯',
      },
      {
        id: 'social-engineering',
        label: 'Social Engineering (Impersonation)',
        description:
          'An attacker posed as Discord support or a friend in voice chat and convinced Luca to share his login details.',
        icon: '🎭',
      },
    ],
    correctAnswers: ['phishing'],
    handbookTerms: [
      {
        term: 'Phishing',
        oneLiner: 'Tricking someone into handing over credentials by impersonating a trusted source.',
        analogy:
          'A fake front door to a building — it looks identical to the real one, but everything you hand to the doorman goes straight to the thief.',
        inThisCase:
          'The fake "minecraft-premium-claim.xyz" page looked like a Discord login. Luca\'s username and password went to an attacker, not Discord.',
      },
      {
        term: 'Account Propagation',
        oneLiner: 'Using a hijacked account to spread attacks to the victim\'s contacts.',
        analogy:
          'A stolen address book — the thief writes letters pretending to be you, asking your friends to do something harmful.',
        inThisCase:
          'Within minutes of gaining access, the attacker used Luca\'s Discord account to send the same phishing link to his friends and servers.',
      },
      {
        term: 'Compromised Account',
        oneLiner: 'An account controlled by an attacker, often without the real owner knowing.',
        analogy:
          'A puppet — it looks and acts like the real person from the outside, but someone else is pulling the strings.',
        inThisCase:
          'The link was sent from Luca\'s friend\'s account, which had already been phished. Luca trusted it because he trusted the sender.',
      },
      {
        term: 'Social Engineering',
        oneLiner: 'Manipulating human psychology rather than hacking systems directly.',
        analogy:
          'Convincing the bank teller to open the vault by pretending to be the manager — no lockpick required.',
        inThisCase:
          'The promise of a free upgrade exploited Luca\'s excitement. The familiar sender (a trusted friend) removed suspicion.',
      },
      {
        term: 'URL Spoofing',
        oneLiner: 'Creating a web address that mimics a legitimate one to deceive users.',
        analogy:
          'A street sign that says "Hospital" but points to an abandoned building.',
        inThisCase:
          '"minecraft-premium-claim.xyz" was designed to look plausible at a glance. The real site is minecraft.net. Three seconds of attention would have revealed the difference.',
      },
    ],
    successOutcome:
      'Case closed. You correctly identified the attack as a Discord Phishing Link. The Cybercrime Unit traced "minecraft-premium-claim.xyz" to a phishing kit sold on underground forums. The domain had already been used against 340 other accounts across Europe. Discord suspended the compromised accounts. Luca recovered access to his account 48 hours later. His friends were warned in time.',
    failureOutcome:
      'Incorrect deduction. Look more carefully at the evidence. Luca was not targeted by automated guessing — the attack was personal and immediate. The router log shows an outbound connection at the exact moment he clicked the link. And his friend\'s panic message tells you what happened next. Follow the chat.',
  },
];

export const getLevelById = (id: number): Level | undefined =>
  LEVELS.find((l) => l.id === id);
