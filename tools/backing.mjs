// Second sources and new cited steps from the 20 Nov 2026 research pass, merged into the first-pass guides by
// build-data.mjs. Each id names a page in sources.mjs that was fetched and read and states the fact; the sentences
// are ours. cite: { stepNumber: [extra page ids] }; text: { stepNumber: [new text, ...ids] } where a page corrected a
// step; steps: new steps, [text, ...ids]; disputes: new disagreements, both sides cited.
export const BACKING = {
  1: {
    steps: [
      ["The list is 1 platinum, 2 gold, 6 silver and 46 bronze; 28 trophies are hidden, every story trophy among them.","pp","gb","ol"],
      ["Difficulty is about 4/10; no trophy is hard on its own. Most of the time goes into the 100% checklist behind A Long Road (gold).","pp","kg","gb","ol"],
    ],
  },
  2: {
    cite: { 2: ["pp-gone","a-gb-gone","a-gg-gone"] },
    steps: [
      ["Ease off the throttle as you reach each dropped package so Cal has time to hook it; there are three to collect.","a-vgc-gone","a-gg-gone","a-bb-gone","a-ozc-gone"],
      ["Donnie is tied up in a shack by the big turbine at the Kingfishers' camp; crouch and use takedowns, as the camp is too crowded for a gunfight.","pp-gone","a-gb-gone","a-gg-gone","a-vgc-gone"],
      ["On the way to the sea plane, a red and white trailer holds optional cash that raises Professional reputation; skip it and it is gone.","pp-gone","a-gb-gone","a-gg-gone"],
      ["Finishing it unlocks Jason's house in Key Lento, your first safehouse.","pp-gone","a-bb-gone","a-gg-gone","a-ozc-gone"],
      ["Gear Up is next; GTA Wiki says Just a Scratch, Lab Fees and Unwanted Attention open at the same time.","pp-gone","a-gg-gone","a-gw-gone"],
    ],
  },
  3: {
    steps: [
      ["Tourist Trap starts when you talk to Lucia on the beach in south Key Lento; nothing forces you to start it, so finish Chapter 1 business first.","a-gb-tourist","vgc-ch1"],
      ["Jason's Key Lento house is lost for good too; GTABase advises putting at least $5,000 into BuckMe Family Savings before Tourist Trap.","a-gb-tourist"],
      ["Kenton's treasure dives, Cal's fishing and the Kingfisher hideouts are not lost: they come back later in the story.","a-gb-tourist","ol-miss"],
      ["In Tourist Trap Jason is shot and you play Lucia with only base health and Focus; keep Jason alive on the way to the boat or the mission fails.","a-vgc-tourist","a-gb-tourist"],
    ],
  },
  4: {
    cite: { 2: ["gbm","a-pp-prep","a-gb-prep"] },
    steps: [
      ["Good money for the $15,000: Billy's two jobs, Hit Avery Pawn, Hit Kingpin Bowling, Impounded Vehicle, Veteran Hunted (Jason) and Afternoon Delight.","a-pp-prep","a-gb-prep"],
      ["Deposit cash into BuckMe as you earn it, so a death does not cost you part of the $15,000.","a-pp-prep","a-gb-prep"],
      ["Checking Out starts after a call about an article Cal sent: go back to the motel room and use the bathroom door.","a-pp-check","a-gb-check"],
      ["Starting Checking Out ends Chapter 2 and you lose the Starlet Motel as a home for good, so finish anything there first.","a-pp-check","a-gb-check"],
      ["Bug: dying in the bike chase can drop Jason as an objective and leave a police search you cannot escape. Restart the mission if it happens.","a-pp-check","a-gb-check"],
    ],
  },
  5: {
    steps: [
      ["Timed optional missions such as Race Against Yago show an hourglass icon on the map and expire if left too long.","a-pp-walk","ol-miss"],
      ["Meet the Heders, early in the chapter, gives the Cut-off Tool: it cuts the locks on orange SCOOP containers, which hold cash and loot.","a-pp-heders","a-gb-heders"],
    ],
  },
  6: {
    steps: [
      ["Missing a timed optional mission such as the Free Call also costs nothing toward 100% completion.","a-pp-walk","gbm"],
      ["After VCIA Takedown the chapter winds down with Tie Up Loose Ends, Call Valentina Back, Sunset and Starting From Zero.","a-pp-walk","gbm"],
    ],
  },
  7: {
    steps: [
      ["Nothing has to be cleared before the finale: side-story finales and bank vault jobs stay available after the credits.","kotaku","ol","gg-banks"],
      ["The finale marker stays on the map after the credits, so you can play the finale again and possibly reach another ending.","kotaku","sr-ngp"],
      ["The finale starts outside a law office where Jason and Lucia wait; you can walk away and keep playing until you choose to go in.","sr-ngp"],
    ],
  },
  8: {
    steps: [
      ["After Slam Dunk, wait for Jason's call (about half an in-game day, sooner if you do other main missions); the Starlet Motel icon then turns pink.","a-pp-bfast","a-gb-bfast"],
      ["The mission is a robbery run: Hank's Waffles, a liquor store and a thrift store. Threaten the staff and grab the cash; each has a generous 1-minute timer.","a-pp-bfast","a-gb-bfast"],
      ["It ends with a 2-star wanted level; small off-road trails are the easiest way to lose the police.","a-pp-bfast","a-gb-bfast"],
      ["Chapter 2 is Lucia-only for hours until this mission; afterwards Jason is playable again and each of them gets a personal vehicle.","a-pp-bfast","a-gb-bfast","vgc-ch1"],
    ],
  },
  9: {
    steps: [
      ["It opens once Hidden Charges and the rest of Chapter 3 are done: wait for Raul to get in touch, then meet him at the planning room in Stockyard.","a-gb-cartel","a-pp-walk"],
      ["Safe Word, earlier in the chapter, ends with safecracking practice you can repeat as often as you like at Raul's compound; it uses the heist's mechanics.","a-pp-safe","a-gb-safe"],
      ["The heist runs from blowing cell towers and cracking the vault to defending a bus and a freeway escape; GTABase lists a $120,000 payout.","a-gb-cartel"],
    ],
  },
  10: {
    steps: [
      ["Child's Play is the rescue of Rafa from his kidnappers, a few missions after Jason's Rafa mission.","a-pp-walk","a-gb-rafa","gbm"],
      ["The run-up (Adventures in Babysitting, Rafa's Kidnapping, Fresh Evidence) is Jason-only; Child's Play itself uses both leads.","a-pp-walk","a-gb-rafa","a-gb-child"],
    ],
  },
  11: {
    text: {
      1: ["Headliners is the 18th Chapter 4 mission in the Dexerto, GameRant and GTABase lists, straight after Child's Play.","dx","gr-story","gbm"],
    },
    steps: [
      ["In Headliners the Dimez perform at VYB and Jason and Lucia help run the launch party.","a-gb-head","a-pp-walk"],
      ["The Dimez's feud with rapper DWNPLY goes back to Chapter 3's Cooties, where Lucia trashes his car in their music video.","a-pp-cooties","a-gb-cooties"],
    ],
    disputes: [
      {"topic":"Where Headliners falls","a":["Right after Child's Play, 18th in Chapter 4.","dx","gr-story","gbm"],"b":["Later: after Fully Catered and Heist Plans in Place, just before VCIA Takedown.","a-pp-walk"],"call":"Some main missions can be taken in a different order; either way it comes mid Chapter 4."},
    ],
  },
  12: {
    cite: { 3: ["gg-jet","ol"] },
    steps: [
      ["After VCIA Takedown only Sunset and Starting From Zero are left in Chapter 4.","gr-story","ps-story","ig-story","pp"],
      ["From Making Gainz until VCIA Takedown, Jason and Lucia cannot be seen together, so the missions in between switch between Jason-only and Lucia-only.","b-dork","tn"],
    ],
  },
  13: {
    steps: [
      ["The four Chapter 5 missions before it are Bird in the Hand, Taking Liberties, VC Baby and Doggie Bag.","dx","gr-story","ps-story","ig-story"],
      ["Before the finale the game asks you to confirm, and its marker stays on the map, so you can finish other tasks first.","kotaku","ps-story"],
    ],
  },
  14: {
    steps: [
      ["Also on the list: beat 5 of the 7 pool opponents, play 2 of the 3 mini golf courses, and start all 4 video games.","pp-100","gb100","gfz","ig-100","ps-100"],
      ["The 90 hoops must be different ones: scoring again at the same hoop does not count. Find them under Map > Exploration > Points of Interest.","gb100","pp-100"],
      ["Only mini golf counts (King Gator Adventure Golf, Frontier Adventure Golf, Dino Golf Challenge); the two full-size golf courses do not.","gb100","pp-100"],
    ],
  },
  15: {
    steps: [
      ["On the map a found stunt shows purple and a finished one turns white; both stay marked.","pp-stunts","b-sg-stunts"],
      ["Map > Exploration > Stunt Spots lists every stunt you have found by name, done or not.","pp-stunts","ps","b-sg-stunts"],
      ["In Progress > Activities > Stunts, highlight Stunt Jumps and press R3 for a county-by-county count.","pp-stunts","b-sg-stunts"],
      ["Under the Bridges and Knife Flights are flown in an aircraft (Knife Flights tip the plane through gaps between Vice City towers); Base Jumps are parachute drops through checkpoints.","ps"],
    ],
  },
  16: {
    cite: { 2: ["gb","b-ol-act"], 3: ["pp","gb"] },
    steps: [
      ["Activities use a dumbbell icon on the map; filter them under Map > Activities.","pp","pp-100","b-ol-act"],
      ["Pool is 8-ball on tables in bars, taverns and cafes; one game ticks it off.","b-ol-act","gb100"],
      ["For basketball, each hoop has a ball beside it; one stands outside Jason's house.","gb100","b-ol-act"],
      ["Golf here means mini golf, on any of three courses: King Gator Adventure Golf, Frontier Adventure Golf or Dino Golf Challenge.","b-ol-act","gb100"],
      ["A free fishing rod waits on the jetty behind Jason's house in Key Lento.","b-ol-fish"],
    ],
  },
  17: {
    cite: { 3: ["pp-range","b-egm-range","b-ol-act"], 4: ["pp-range","b-ol-act","b-egm-range"], 6: ["ps","pp-100"] },
    steps: [
      ["Griffin is in northwest Vice City; Rodgers Ranch is in northeast Port Gellhorn.","pp-range","b-egm-range","b-ol-act"],
      ["The range challenges do not show on the map until you have bought that range's waiver.","pp-range","gb100","b-ol-act"],
      ["Play Griffin's timed courses as Lucia: she runs faster and turns better than Jason.","pp-range","b-ol-act","b-egm-range"],
      ["On Rodgers Ranch's Hunting Range, put about four body shots into each bear before its weak spot.","pp-range","b-ol-act"],
    ],
  },
  18: {
    cite: { 2: ["ps","pp-100","b-ol-act"] },
    steps: [
      ["Each location has three trials: beat par on the first two to open the third, which you only need to finish.","pp-100","gb100","b-ol-act"],
      ["A drone race icon only appears once you are within about 100 m; Map > Activities > Top Fun Drones lists the ones you have found.","gb100","ps","b-ol-act"],
    ],
  },
  19: {
    cite: { 2: ["ps","b-ol-act","pp-100"] },
    steps: [
      ["Race icons turn up in blue only within about 100 m; filter them with Map > Activities > Racing.","pp-races","gb100","b-ol-act"],
      ["At Gellhorn Raceway (south of Port Gellhorn) do the introduction lap with Beau first; it opens the rest of the track's races.","pp-races","b-gg-racech"],
      ["The Thrillbilly Mud Club's 8 dirt and oval races open through Billy's optional Chapter 2 mission Thrillbillies.","pp-races"],
      ["The AI catches up when behind, so a lead is never safe until the finish line.","b-ol-act"],
    ],
  },
  20: {
    cite: { 1: ["pp","gb","b-ol-fish","b-gfz-fish"], 2: ["pp-sf","b-dork","b-gfz-fish","b-ol-fish"], 4: ["pp-gone","pp-recal","b-dork"] },
    text: {
      3: ["Cal wants a stoplight parrotfish heavier than 2 lb (about 0.9 kg), caught with a rod from a boat.","b-pp-fish","b-ol-fish","b-gfz-fish"],
    },
    steps: [
      ["His spot is a purple circle out on the water in Gambit Bay, Mariana County.","b-pp-fish","b-gfz-fish","b-ol-fish"],
      ["Jason's boat is gone after Chapter 1: take a fishing boat from the docks by The Rusty Anchor and drop anchor from the vehicle menu.","b-pp-fish","b-gfz-fish"],
      ["The starter Small Saltwater Lure is enough; release parrotfish under 2 lb and keep casting inside the circle.","b-pp-fish","b-ol-fish","b-gfz-fish"],
    ],
    disputes: [
      {"topic":"How heavy a parrotfish","a":["Over 2 lb, about 0.9 kg.","b-pp-fish","b-ol-fish","b-gfz-fish"],"b":["Over 2 kg.","ps"],"call":"2 lb, as three guides say; a fish over 2 kg would satisfy both."},
    ],
  },
  21: {
    cite: { 3: ["pp-arcade","b-ol-zombix","b-gbolt","b-gg-tv"], 4: ["pp-arcade","b-gbolt","b-ol-zombix"] },
    steps: [
      ["The home console sits on the coffee table in front of the TV in Jason's house; interact with it to pick a game.","b-gbolt","b-ol-zombix","pp-arcade"],
      ["Pick the game that suits you: Tenebrae Lux is a puzzle game, Time Jackers Rewind a timed top-down shooter, Street Trash III a top-down zombie shooter.","b-gg-tv","b-ol-zombix"],
      ["Other Bang For Your Buck cabinets: Xero Food Mart (south Kelly County), Richardson Jewelry & Diamonds (Downtown Vice City) and Electric Boulevard in Stockyard.","b-gbolt"],
    ],
  },
  22: {
    cite: { 3: ["gb-puff","b-pp-puff"] },
    steps: [
      ["Andy's call comes after Lucia's Mami Knows Best and Car Service missions; her new house is in Belville, Leonard County.","b-pp-cell"],
      ["Climbing the Cellerichain is three deliveries for Andy: to Waning Sands, a market stall in north Vice City, then a house in Ambrosia.","b-pp-cell","gbs","ol-side"],
      ["Have $5,000 ready: the Cellerica fee is sent to Andy through the BuckMe app, from anywhere.","b-pp-fee","gb-puff"],
      ["The later quests take a while to trigger: keep playing as Lucia until Andy or Cecilia gets in touch.","b-pp-fee","b-pp-read","b-pp-puff","gb-puff"],
      ["Read the Label: take the stolen Cellerica van from north Vice City to the Belville warehouse; Cecilia pays $1,800.","b-pp-read","gbs"],
    ],
  },
  23: {
    steps: [
      ["Pick the metal detector from the bottom-right slot of the weapon wheel and aim with L2; sweep the pink search zone until its light turns from red to green, then take the chest.","pp-island","c-egm-island","gt-kenton"],
      ["After each set, bring the finds back to Kenton to sell; he then calls and marks the next wreck. A finished set pays a large bonus.","gt-kenton","gg-coll","ps-kenton"],
      ["The wrecks lie in the water around Key Lento (south and east of it); the first, Nuestra Señora del Ocio, is found during Island Dreams itself.","ps-kenton","gt-kenton"],
      ["Finishing his strand (Maritime Disputes) lets you take the Rugger Fortune boat in place of Kenton's Huntress.","ps-kenton"],
    ],
  },
  24: {
    cite: { 3: ["pp-twist","c-gb-twist"] },
    steps: [
      ["Thrillbillies: buy outfits at the club shop, rent a bike at Roostere's Rentals (the Sanchez is faster) and race 13 riders. You need not win, just avoid last; 1st pays $2,500.","c-pp-thrill","c-gb-thrill"],
      ["Mall Rats can take a long while to arrive (mid Chapter 3) and is solo only: meet Billy in Ocean Beach, ride into the mall, rob the jewelers' safe and escape. Pays $12,000.","c-pp-mall","c-gb-mall"],
      ["The Impaler: reply to Wyman's text, hop the Ambrosia impound fence, take the only black-and-white cruiser (3 stars) and lose the police in the rail tunnel north of Ambrosia.","c-pp-impaler","c-gb-impaler"],
    ],
  },
  25: {
    steps: [
      ["Kirk's first and last quests are night-only, and the last one, Advanced Skunk Apeonomics, can only be played as Lucia.","pp-sf","gl"],
      ["Two of Yago's races, Bumper to Bumper and Brother to Brother, are Jason-only: switch to Jason if they will not start.","pp-sf","gl"],
      ["Stranger jobs show as Optional Missions in the map list or as purple markers, but some stay hidden and unmarked, so an empty map does not mean you have found them all.","pp-sf","egm"],
    ],
  },
  26: {
    steps: [
      ["Undamaged Wish List cars pay around $35,000 or more each, the quickest route to the 100% list's $200,000 fencing goal.","gb100","pp-100"],
      ["Cars with advanced trackers send your location to the police unless you drive fast, so keep your speed up all the way to Randy.","ps-randy","gb-cars"],
      ["Talking to Randy at Leonida Auto World can give hints on where a wanted car is found.","ps-randy"],
    ],
  },
  27: {
    cite: { 4: ["pp-spin","gb-spin"], 5: ["pp-labs","gb-labs"] },
    steps: [
      ["Find each lab inside its purple search zone by the building leaking pink gas. Tyrone and Dook give more spots if asked, and a cook you question may point to another lab.","pp-labs","gb-labs"],
      ["To destroy a lab, shoot its propane tanks or gas cans or throw a Molotov through the door. Some need the Snap Gun or a forced door; one keypad code is on a nearby billboard.","pp-labs","gb-labs"],
      ["Read the papers, receipts and cards inside labs: Spin On This unlocks after enough labs are destroyed and enough information is gathered. Burnt labs are the only sign one is done.","pp-labs","gb-labs"],
      ["Wear body armor and bring a long gun before reaching the diner. In the pipe, just run (shooting Rocky does nothing); outside, aim for his head.","pp-spin","gb-spin"],
    ],
  },
  28: {
    cite: { 4: ["pp-med","c-gt-med"], 5: ["pp-med","c-gt-med"] },
    steps: [
      ["The 18 add up as 8 shared spots twice each (Jason and Lucia), plus Lucia's balcony session and Ascent Mountain once each.","pp-med","c-gt-med",{"after":2}],
      ["Ascent Mountain counts once and needs Jason and Lucia together, so it waits until joint free roam opens after Coffee Break (Chapter 2).","pp-med","gg-coll","gt-coll","gb",{"after":5}],
      ["Call your partner before setting off so both meditate at each spot in one trip instead of visiting every spot twice.","gb100","kg",{"after":3}],
      ["Route by county: Kelly has Swamp, Worn Stone and Red Rocks (Manifest Canyon); Lummox has Water Wheel (paper mill), Jutting Cliff and Waterfall (NW of Tallaloko).","pp-med","c-gt-med",{"after":4}],
      ["Seaside is a rocky outcrop on the beach east of Waning Sands (Leonard County); Smooth Sand is a sandbar off Capri's west coast (Mariana County).","pp-med","c-gt-med",{"after":4}],
      ["Spots show a purple icon only once you are close; found ones appear with the map's Exploration filter Meditate Around Leonida.","pp-med","ps","ol",{"after":5}],
      ["Meditating also trains Focus, so the tour doubles as Focus practice.","c-gg-fit","sn-focus2","ig-fit"],
    ],
  },
  29: {
    cite: { 2: ["pp","gb100"] },
    steps: [
      ["Hold L3 and R3 to use Focus: it shows the animal's scent trail and its vital spots, so you can line up a clean head or heart shot.","c-pp-vet","ps-bret"],
      ["Track the decks at Map > Activities > Target Deck, or at Progress > Contacts > Bret Vogel.","pp-100","gb100","pp"],
      ["Bret picks up big kills such as boars himself; smaller animals go in the bed of a pickup truck, as with the first deer.","ps-bret","c-pp-vet"],
      ["Bret texts each new deck with hints such as whether the animal is out at night; use a scope and shoot from range, since some animals flee if you get close.","ps-bret"],
    ],
  },
  30: {
    text: {
      1: ["18 sets, 480 cards, from 12 to 36 cards a set.","pp-cards","gt-coll","gg-coll","fxc"],
    },
    steps: [
      ["Some cards lie in more than one place; a second copy adds nothing to the set, but it can still be sold.","pp-cards","fxc","gb100","gt-coll"],
      ["Pawn Shops pay from about $20 to over $1,000 a card depending on rarity.","pp-cards","fxc"],
      ["Choose by what you already hold: a bigger set you have mostly finished can need fewer pickups than a fresh small one.","gg-coll"],
    ],
  },
  31: {
    cite: { 3: ["pp-waink","gg-coll"] },
    steps: [
      ["Vehicle scans are a separate counter: scanning cars, boats or aircraft never adds to the 100 locations.","gg-coll","gb100","pp-100"],
      ["Two of the five WAiNK groups start locked with no total; a group shows up once you scan its first entry.","ath","gg-coll"],
      ["Big sights worth a scan include the Imperial Spanish Ruins, the Gellhorn Funfair Ferris wheel, Kalaga Lookout and St Lucia Lighthouse.","gt-coll"],
    ],
  },
  32: {
    cite: { 4: ["pp-chal","gg-chal"] },
    text: {
      4: ["The Combat challenge Headshots asks for 4 headshot kills in one use of Combat Focus.","pp-chal","gg-chal"],
    },
    steps: [
      ["All 80 are open from the start and can be done in any order.","gg-chal","pp-chal","gb100"],
      ["Start the slow Fitness ones early: Strength Regime and Cardio Regime need level 4 on both Jason and Lucia for 5 days in a row.","gg-chal","pp-chal"],
      ["Read the fine print first: many must be done in one day, without dying or arrest, or without taking damage, and fail if you break that.","gg-chal","pp-chal"],
      ["Several overlap with other trophy work: scan 4 WAiNK spots, find 3 cards in each county, study 20 animal species.","gg-chal","pp-chal"],
    ],
  },
  33: {
    steps: [
      ["Shooting at a chasing helicopter makes it back off; a fast sports motorbike also helps you outrun four stars.","pp","gb-wanted"],
      ["If police know your car, switch it or respray it, and keep clear of CCTV cameras while you shake the heat.","gt","gb-wanted","dx-police"],
      ["Do not turn back: being spotted or committing a crime inside the heat area brings the wanted level straight back.","gb-wanted","dx-police"],
    ],
  },
  34: {
    steps: [
      ["The same run can also clear the Stick Ups challenge: rob 3 stores in one day without dying or being arrested.","pp-chal","gg-chal","d-ig-chal"],
      ["Dying or getting busted costs the cash and stash bags you carry, so bank the takings at an ATM once the chain is done.","gg-banks","gb-money"],
    ],
  },
  35: {
    steps: [
      ["Hold Up on the D-pad to bring out WAiNK, then hold R1 to scan the vehicle.","pp-100","gb-cars"],
      ["Traffic differs by region: supercars near the Ocean Beach hotels, vans and trucks in Port Gellhorn, basic cars in Key Lento.","pp-100","gb100"],
      ["A scan also shows the car's security, such as alarm and tracker, which helps if you plan to steal it.","gb-cars","d-gg-rob"],
    ],
  },
  36: {
    steps: [
      ["Incapacitating an enemy counts the same as a kill, but each Combat Focus lasts only a few seconds.","pp","d-gt-focus"],
      ["In Combat Focus, red spots on an enemy are lethal and yellow spots (arms, legs) incapacitate; headshots drop targets fastest.","gb-focus","d-gt-focus"],
      ["Pair it with the Headshots challenge: 4 headshot kills in one Combat Focus also counts toward the 50 challenges.","pp-chal","gg-chal","d-ig-chal"],
      ["A Focus boost from food or drink lasts until you are wasted or end the session, so eat just before the attempt.","gb-focus","sn-focus2"],
    ],
  },
  37: {
    cite: { 5: ["tg-planes","d-ig-6star"] },
    steps: [
      ["Drive through the airfield fence, enter by the door at the stairs beside the boarding bridge, go up to the cockpit and reverse the jet out toward the runway.","gb","gg","pp"],
      ["The engines take a while to start, so you cannot roll away the moment you sit down.","d-gr-air"],
      ["You will almost surely be wanted before takeoff, with police jets following, so save first and keep moving.","d-gr-air","ol"],
    ],
  },
  38: {
    cite: { 3: ["ol-base","ol","gg-tank","d-ig-6star"] },
    steps: [
      ["Expect about 3 stars the moment you climb into a tank, before the military response builds.","d-pp-tank","ol-base"],
      ["Six stars are close to impossible to lose, so ditch the slow tank for something faster early.","d-ig-6star","ol-base"],
      ["Park a car in front of the tank as cover while you climb in; the cannon fires with R1.","ol-base"],
    ],
  },
  39: {
    cite: { 4: ["gg-banks","gb-money"], 5: ["pp","gb","gg"] },
    steps: [
      ["Jewelers show on the map as green Smash 'n' Grab icons (Map > Robberies); hovering one shows its estimated take.","d-pp-sng","gb-money"],
      ["At Richardson, the panel right of the central-room door disarms security, the box under the security screen wipes footage, and the safe is in the northeast corner.","d-pp-yjj"],
      ["Donovan Banks & Co. also has a Snap Gun back door, with alarm and footage controls in its back office; Casa de Empeño has no such door.","d-pp-yjj"],
    ],
  },
  40: {
    steps: [
      ["Track vaults with Map > Robberies > Bank Jobs: bright green means done, dark green not yet; hovering shows what is left.","pp-banks","gb100"],
      ["One person cannot carry a whole vault: hand a bag to your partner (hold Right on the D-pad) or stow it in the trunk; a crash can knock it loose.","gg-banks","gb","pp-100"],
      ["The 14 small banks (from Credit Check, Chapter 3) have only a drawer and safe; this trophy needs the 8 large vaults.","pp-banks","gb100"],
      ["Lombank Downtown and one Lombank in Ocean Beach pay most ($135k-$205k); four of the eight vaults are in Ocean Beach.","pp-banks"],
    ],
  },
  41: {
    cite: { 4: ["pp-twist","c-gb-twist"] },
    steps: [
      ["PowerPyx says it unlocks automatically in the optional Chapter 4 mission That's Where The Money Is… (Wait at the Cafe).","pp"],
      ["Sticky Bombs for the truck doors are in the back of Yasmani's shop once his jobs are done.","pp"],
      ["For the getaway, the train tunnel north of Ambrosia (Kelly County) slows police and hides you from helicopters.","gg","pp"],
    ],
  },
  42: {
    cite: { 5: ["bb-fog","pp-fog"] },
    steps: [
      ["If no plane has spawned at an airstrip, try the next one; Paradise Taxi from your phone contacts gets you to the southern strips fast.","pp-fog","bb-fog"],
      ["The fuel gauge sits above the minimap (enable it in UI settings, Down on the D-pad shows it); running dry crashes the plane, but a fresh one respawns at the strip.","pp-fog","bb-fog","d-gr-fog"],
      ["A military jet is faster but brings 5 stars and pursuing fighter jets, so stick with the duster.","d-gr-fog","ol-base"],
    ],
  },
  43: {
    steps: [
      ["A site stays hidden until you walk into its area (the map just says Robbery Opportunity); found ones list under Map > Robberies > Illegal Operations.","pp-gangs","kg-gangs"],
      ["The Ultimate Edition's bonus PTT Youngin$ site does not count toward the 39.","pp-gangs","kg-gangs"],
      ["Police answer hideouts more slowly than stores; a suppressed weapon keeps it quiet, while long gunfights draw patrols.","kg-gangs"],
    ],
  },
  44: {
    steps: [
      ["The Ocean View has a poolside bar and a rooftop bar; a door behind the poolside bar leads to a lift up to the roof.","d-gsc","pp-bars"],
      ["Another guide got it with any cocktail from the rooftop bar, drunk at the beach-side railing; try there if standing by the bar fails.","d-gsc"],
    ],
  },
  45: {
    steps: [
      ["Randy gives you the Key Cloner in the main mission Clonin' Keys, Makin' Gs, around mid Chapter 3; it installs on the phone for both leads.","pp","e-sn-steal","e-psi-key","e-sg-key"],
      ["To use it, stand at the driver's door, pick Clone Key and hold the stick in the right spot until the bar fills; the car then opens and starts.","e-psi-key","e-sg-key"],
      ["A key-cloned car needs no separate hotwiring, and Shacknews says cloning keeps the car alarm from going off.","e-sg-key","e-sn-steal"],
    ],
  },
  46: {
    steps: [
      ["Kingpin Bowling is the Kolts & Associates entry among 39 gang operations, all needed for 100%, and it also covers that gang for Pest Control.","pp-gangs","gb-bowl"],
      ["The watch is a collectible and the Moreland 850 is a unique shotgun; your cash reward depends on how much loot you take and fence.","e-pp-bowl","gb-bowl"],
      ["Find gang operations on the map under Robberies > Illegal Operations; Progress > Gangs shows your counts.","pp-gangs"],
    ],
  },
  47: {
    cite: { 5: ["ig-fit","c-gg-fit"] },
    steps: [
      ["Train when rested and fed: a tired or hungry lead gets less out of each workout.","sn-gym","ig-fit","c-gg-fit"],
      ["Always finish the whole workout; partial sessions do not give the full gain and PowerPyx says unfinished gains are lost.","e-pp-stats","ig-fit","c-gg-fit"],
      ["Check Strength for each lead in the phone's Fitness app or under Touch Pad > Jason & Lucia.","e-pp-stats","pp","gb"],
    ],
  },
  48: {
    cite: { 4: ["ig-fit","e-pp-crim","e-gb-crim","e-gg-crim"] },
    steps: [
      ["Jason and Lucia each have their own profile; view both in the Jason & Lucia menu (Touch Pad) or hold D-pad Right for a quick look.","e-pp-crim","e-gb-crim","e-gg-crim"],
      ["At Psycho and above you can no longer surrender to the police.","e-pp-crim","e-gb-crim","e-gg-crim"],
      ["PowerPyx says running over civilians and cops speeds it up, but killing civilians and police pushes your profile toward Psycho.","pp","e-pp-crim","e-gb-crim"],
    ],
  },
  49: {
    steps: [
      ["To test the Payday Loans lead: the Little Cuba store is job #4 of 7, and Payday Loans jobs only open after Credit Check in Chapter 3.","pp-payday"],
      ["Of Zen and Computing files it with the story trophies that unlock during the campaign; no method is given.","ozc"],
    ],
  },
  50: {
    steps: [
      ["You lose three in-game days; your partner phones asking where you went, and GameRant says it does not hurt your relationship.","bb-ufo","gr-ufo"],
      ["When you reach the woman, press Triangle to help her, then pick a dialogue option.","bb-ufo"],
    ],
  },
  51: {
    steps: [
      ["The kick is Square on PS5 (X on Xbox), on bicycles as well as on motorbikes and scooters.","e-gb-ctrl","e-wg-ctrl"],
    ],
  },
  52: {
    steps: [
      ["Big vaults open after the optional Chapter 4 job That's Where The Money Is (Wait at the Cafe); robbing one gives an instant 4-star wanted level.","pp","gg-launder","pp-banks","gg-banks"],
      ["Yasmani opens up through his Jewelry Jobs in Chapter 3; his $10,000 security-van tips need two Payday Loans robberies done first.","gg-launder","pp-banks","gg-banks"],
      ["Vault robberies stay repeatable after the story, the quickest way to top up the laundered total.","gg-banks","e-pp-money"],
    ],
  },
  53: {
    cite: { 3: ["ps","e-pp-cloth","e-pp-tattoo"] },
    steps: [
      ["Some shops are Ultimate Edition only: PowerPyx marks Stock 305 and Electric Fang Tattoo exclusive, and pre-launch reports named three more (a salon and two mod shops).","e-pp-cloth","e-pp-tattoo","e-bb-ue","e-dx-ue"],
      ["For spending money, Randy's Wish List supercars (from Chapter 3) can pay over $30,000 each in top condition.","e-pp-money","e-sg-key"],
    ],
  },
  54: {
    cite: { 3: ["ps","e-pp-garages"], 5: ["gb-money","e-boom-safe"] },
    steps: [
      ["Raise the phone with Up and buy every garage inside the Vice City Real Estate app.","ps","e-pp-garages"],
      ["PowerPyx counts 16 garage spots once all 8 are bought (half of them from story garages), or 18 vehicle slots with your two personal cars.","e-pp-garages"],
      ["The extra parking gives the free spaces On the Spot needs, so buy garages before registering cars.","gg","gb","pp"],
    ],
  },
  55: {
    steps: [
      ["Scan a car with the Waink app (hold Up) before taking it to Moses: it shows any tracker and the registration cost.","gg-slots","e-pp-car","e-sg-key"],
      ["Registered cars can be called to you through Scooter Bros (phone, green car icon) for a small fee.","ps","e-pp-summon","gg-slots"],
      ["Use cheap cars and bikes to keep registration fees low.","gb","gg","pp"],
      ["Moses' registration screen shows how many owned vehicle slots you have.","gg-slots"],
    ],
  },
};
