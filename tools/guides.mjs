// Our guide to each of the 55 trophies, keyed by the official list's id. Written for this entry in our own words from
// the pages in sources.mjs; every step names the source ids that back it. Keys:
//   k kinds, st roadmap stage (1-6), ch chapter where it unlocks or starts (0 = prologue), c PSN-style count,
//   sum the "In short" line, steps [[text, ...sourceIds]], mis { level: 'missable' | 'watch', why, ponr, cite },
//   dis sources that disagree [[text, ...sourceIds]], unc details no source confirms yet.
export const GUIDES = {
  1: {
    k: ['completion'], st: 6, ch: null, c: 54,
    sum: 'Pops by itself once the other 54 are earned: one playthrough, single-player only, roughly 200 hours.',
    steps: [
      ['All 54 other trophies are single-player. The list has no online, multiplayer or DLC trophy.', 'pp', 'kg'],
      ['Plan on one playthrough of about 200 hours. There is no New Game+ and no mission replay, so rotate manual saves (15 slots plus one autosave) and keep one at the start and end of every chapter.', 'pp', 'kg', 'gg'],
      ['Leave cheats off for the whole run: while one is active, trophies and saving are both disabled.', 'pp', 'kg', 'gg'],
      ['Order of work: story first (doing the Chapter 1 meditation), then side characters and collectibles, then the 100% checklist and leftovers.', 'pp', 'kg'],
    ],
    dis: [['Time to platinum: PowerPyx and KeenGamer say about 200 hours; GameTrek says 100 to 200; Playhub says over 200.', 'pp', 'kg', 'gt', 'ph']],
  },
  2: {
    k: ['story'], st: 1, ch: 1,
    sum: 'Finish Gone Fishing, the first Jason mission of Chapter 1, right after the Prologue. Cannot be missed.',
    steps: [
      ['Play through the Prologue (as Lucia). Gone Fishing is the next mission and opens Chapter 1 as Jason.', 'gbm'],
      ['The trophy unlocks as soon as Gone Fishing is complete; it is story-locked and cannot be missed.', 'pp', 'gb'],
    ],
    dis: [['GAMES.GG\'s story guide calls the whole of Chapter 1 "Just Like Paradise" and counts the Prologue as its first mission; GTABase lists the Prologue on its own.', 'ggs', 'gbm']],
  },
  3: {
    k: ['story'], st: 1, ch: 1,
    sum: 'Finish Chapter 1 (Gone Fishing to Discharge Time); it pops at the start of Chapter 2. Do the balcony meditation first.',
    steps: [
      ['Chapter 1 is mostly Jason: from Gone Fishing through Island Dreams, Feng Shui and Down to Earth to Discharge Time, 27 entries in GTABase\'s list.', 'gbm'],
      ['Expect the trophy just after What\'s in the Bag?, the first mission of Chapter 2.', 'pp', 'gb'],
      ['Before the last Chapter 1 mission, accept Lucia\'s meditation on the balcony of Jason\'s house (see Positive Mental Attitude) and make a manual save.', 'pp', 'kg', 'ggs'],
    ],
    dis: [['GameTrek files this trophy under Chapter 2 and GAMES.GG titles Chapter 2 "Paradise Lost"; the official description says Chapter 1. Both fit a trophy that pops as Chapter 2 begins.', 'gt', 'ggs', 'pp']],
  },
  4: {
    k: ['story'], st: 1, ch: 2,
    sum: 'Finish Chapter 2 (Lucia, What\'s in the Bag? to Checking Out); it pops after Welcome to Vice City.',
    steps: [
      ['Chapter 2 is Lucia\'s: What\'s in the Bag?, Moses, Daily Driver, Breakfast Run, then Coffee Break reunites both leads before Checking Out ends it.', 'gbm'],
      ['Prepare for Vice City asks for at least $15,000 before the story will move on.', 'gbm'],
      ['The trophy arrives after Welcome to Vice City, the first Chapter 3 mission.', 'pp', 'gb'],
      ['Before Chapter 2 ends, pick up the two Starlet Motel cards in Port Gellhorn (see Don\'t Touch My Deck).', 'fxc'],
    ],
    dis: [['GameTrek ties this trophy to Chapter 3, the chapter in which it pops.', 'gt']],
  },
  5: {
    k: ['story'], st: 1, ch: 3,
    sum: 'Finish Chapter 3 (Welcome to Vice City to The Cartel Heist); it pops after Ocean Beach and Another Life.',
    steps: [
      ['Chapter 3 runs from Welcome to Vice City to The Cartel Heist, 31 entries in GTABase\'s list.', 'gbm'],
      ['The trophy comes after the first two Chapter 4 missions, Ocean Beach and Another Life.', 'pp', 'gb'],
      ['Chapter 3 opens Andy, Tyrone, Randy and Yasmani\'s jobs plus the Key Cloner and Dye Pack Jammer: start those strands while you play.', 'pp', 'gbs'],
    ],
  },
  6: {
    k: ['story'], st: 1, ch: 4,
    sum: 'Finish Chapter 4 (Ocean Beach to Starting From Zero), the longest chapter.',
    steps: [
      ['Chapter 4 is the longest: 35 entries from Ocean Beach to the finale, Starting From Zero.', 'gbm'],
      ['The trophy unlocks after Starting From Zero and cannot be missed.', 'pp', 'gb'],
      ['Play the optional That\'s Where The Money Is… while in Chapter 4: it opens bank vault robberies.', 'pp', 'gb100'],
    ],
  },
  7: {
    k: ['story'], st: 1, ch: 5,
    sum: 'Gold for the final story mission, at the end of short Chapter 5. Free roam continues after the credits.',
    steps: [
      ['Chapter 5 is short. GTABase lists 10 entries from Bird in the Hand to The End of the Road; GAMES.GG counts 7 missions.', 'gbm', 'ggs'],
      ['Make a manual save before the last mission; there is no replay.', 'pp', 'gg'],
      ['Free roam carries on after the ending, so all side content can still be done afterwards.', 'pp', 'gb'],
    ],
    dis: [['PowerPyx says this pops at the same point as Top Of The World, Ma (after Starting From Zero); GTABase puts the final mission in Chapter 5, after Operation Savage Glory.', 'pp', 'gbm']],
    unc: ['The final mission\'s name, The End of the Road, comes from one source (GTABase).'],
  },
  8: {
    k: ['story'], st: 1, ch: 2,
    sum: 'Story mission Breakfast Run, late in Lucia\'s Chapter 2, just before Coffee Break.',
    steps: [
      ['Breakfast Run is a Lucia mission near the end of Chapter 2, right before Coffee Break.', 'gbm', 'pp'],
      ['It is story-locked and cannot be missed.', 'gb'],
      ['Coffee Break follows and reunites Jason and Lucia: from then on the partner trophies (Hot Together, Retail Therapy, Personal Best) are possible.', 'pp', 'ggs'],
    ],
  },
  9: {
    k: ['story'], st: 1, ch: 3,
    sum: 'The Cartel Heist, the finale of Chapter 3.',
    steps: [
      ['The Cartel Heist closes Chapter 3. Its build-up includes Sinfrontera National Bank, Security Expert and Heist Planning.', 'gbm'],
      ['The trophy unlocks on completion and cannot be missed.', 'pp', 'gb'],
    ],
  },
  10: {
    k: ['story'], st: 1, ch: 4,
    sum: 'Story mission Child\'s Play in Chapter 4.',
    steps: [
      ['Child\'s Play is a Chapter 4 story mission played with both leads.', 'gbm', 'pp'],
      ['It unlocks on completion and cannot be missed.', 'gb'],
      ['Right after it, GTABase marks the optional call "This Is a Free Call From…" as missable. It is not tied to a trophy.', 'gbm'],
    ],
  },
  11: {
    k: ['story'], st: 1, ch: 4,
    sum: 'Story mission Headliners in Chapter 4, straight after Child\'s Play.',
    steps: [
      ['Headliners follows Child\'s Play in Chapter 4.', 'gbm', 'pp'],
      ['The trophy unlocks on completion and cannot be missed.', 'gb'],
    ],
  },
  12: {
    k: ['story'], st: 1, ch: 4,
    sum: 'Story mission VCIA Takedown, late in Chapter 4.',
    steps: [
      ['VCIA Takedown comes late in Chapter 4, after Fully Catered and Heist Plans in Place.', 'gbm', 'pp'],
      ['The trophy unlocks on completion and cannot be missed.', 'gb'],
      ['The optional That\'s Where The Money Is… (bank vaults) appears soon after.', 'gbm'],
    ],
  },
  13: {
    k: ['story'], st: 1, ch: 5,
    sum: 'Story mission Operation Savage Glory in Chapter 5.',
    steps: [
      ['Operation Savage Glory is a Chapter 5 story mission.', 'gbm', 'pp'],
      ['It unlocks on completion and cannot be missed.', 'gb'],
    ],
  },
  14: {
    k: ['completion'], st: 6, ch: null, c: 100,
    sum: 'Gold for 100%. The checklist appears after the story; most categories need about 70-80%, a few need everything.',
    steps: [
      ['The checklist only shows after the story (Progress > Stats > 100% Completion), but anything done earlier already counts.', 'pp', 'gg', 'gb100'],
      ['The main story is worth 50%; optional tasks 6%; gang operations 3%; every other line 1-2%.', 'gb100'],
      ['Needs all of: 39 Gang Operations, 22 Bank Jobs, 7 Payday Loans, 8 vaults, 42 shooting golds, 42 drone time trials, 15 Bret\'s Target Decks and 33 Underwater Discoveries.', 'gb100', 'kg'],
      ['Needs part of: 300/397 stunts, 70/80 challenges, 200/277 vehicles scanned, 100/255 animals studied, 15/18 card sets, 15/18 meditations, 30/34 magazines, 100/125 Cocaine Flamingos, 90/100 hoops, 100 optional tasks.', 'gb100', 'kg', 'pp'],
      ['Take every valuable on a gang operation the first time: they respawn slowly.', 'gb100'],
    ],
    mis: { level: 'watch', why: 'GTABase says nothing on the 100% list is missable, but also that a handful of optional tasks expire during the story. Only 100 are needed and PowerPyx says more exist.', ponr: 'None confirmed; optional tasks can expire as the story moves on.', ch: null, cite: ['gb100', 'pp'] },
    dis: [['Time for 100%: GTABase says 100-120 hours, PowerPyx about 100 hours. PowerPyx adds that the checklist is about 60% of true completion.', 'gb100', 'pp']],
  },
  15: {
    k: ['activity'], st: 4, ch: null, c: 250,
    sum: 'Any 250 of 397 stunts; Under the Bridges are quickest. Carry on to 300 for 100%.',
    steps: [
      ['Four stunt types count together: 130 Stunt Jumps, 202 Under the Bridges, 40 Knife Flights and 25 Base Jumps (397).', 'pp'],
      ['Under the Bridges are the fastest to stack up; sweep them region by region.', 'pp'],
      ['Progress > Activities > Stunts shows the count per region.', 'pp'],
      ['The 100% checklist wants 300, so keep going after the trophy.', 'pp', 'kg', 'gb'],
    ],
  },
  16: {
    k: ['activity'], st: 4, ch: null, c: 9,
    sum: 'Try all nine activity types once: fishing, hunting, golf, shooting range, pool, basketball, arcade, a race and a stunt.',
    steps: [
      ['The nine types: fishing, hunting, golf, a shooting range, pool, basketball, an arcade game, a race or drone race, and a stunt.', 'pp'],
      ['Progress > Activities shows which ones are still untouched.', 'pp'],
      ['Most happen on the way to other trophies (Cal\'s fishing, Bret\'s hunting, Stick Fiddler, Cunning Stunts).', 'pp', 'gb'],
    ],
  },
  17: {
    k: ['activity'], st: 4, ch: null, c: 42,
    sum: 'Gold all 42 shooting range challenges. Also required in full for 100%.',
    steps: [
      ['There are 42 gold medals to win. GTABase\'s checklist splits them between Griffin Shooting Range (18) and Rodgers Ranch (24).', 'gb100'],
      ['A $5 waiver pass at the range unlocks the challenges.', 'gb100'],
      ['Range practice also raises Focus, which helps Gunslinger.', 'pp'],
      ['All 42 golds count for 100% as well.', 'gb100', 'kg'],
    ],
    dis: [['Range count: PowerPyx, GTABase\'s trophy list and GameTrek speak of 12 range locations; GTABase\'s 100% checklist names two ranges holding all 42 medals.', 'pp', 'gb', 'gt', 'gb100']],
  },
  18: {
    k: ['activity'], st: 4, ch: null, c: 14,
    sum: 'Win a Top Fun drone race at each of the 14 locations (42 time trials in all).',
    steps: [
      ['Top Fun Drones runs 14 locations with 42 time trials between them.', 'pp', 'kg', 'gb100'],
      ['The trophy needs a win at each of the 14 locations.', 'kg', 'gb'],
      ['100% needs all 42 time trials, so finish every trial while you are there.', 'gb100', 'kg'],
    ],
  },
  19: {
    k: ['activity'], st: 4, ch: null, c: 20,
    sum: 'Win 20 different races out of 40. 100% needs 30, plus 10 of 13 race challenge golds.',
    steps: [
      ['There are 40 unique races; any 20 different wins count.', 'pp', 'gb'],
      ['Go on to 30 wins and 10 of 13 race challenge golds for the 100% checklist.', 'gb100', 'kg'],
      ['Yago\'s strand (from Chapter 3) starts with Join a Street Race. GTABase marks the optional Race Against Yago as time-sensitive.', 'gbs', 'gbm'],
    ],
  },
  20: {
    k: ['activity'], st: 4, ch: 1,
    sum: 'After Feng Shui (Chapter 1) Cal texts you; win his fishing challenge west of Key Lento.',
    steps: [
      ['Finish Feng Shui in Chapter 1; Cal then sends a text.', 'pp', 'gb'],
      ['A purple fishing icon appears west of Key Lento: go there and start the challenge.', 'pp'],
      ['Beat Cal to unlock it. Fishing also counts toward Master of None and raises Focus.', 'pp'],
    ],
  },
  21: {
    k: ['activity'], st: 4, ch: null, c: 1,
    sum: 'Finish every level of one of the four arcade games (three are on the TV at home).',
    steps: [
      ['There are four games: Tenebrae Lux, Street Trash III and Time Jackers Rewind on the TV at home, and Bang For Your Buck on arcade machines around the map.', 'pp'],
      ['Clear all the levels of any one of them; its extra challenges are not needed.', 'pp'],
      ['The TV games can be locked during some story stretches. 100% needs all four played.', 'pp', 'gb100'],
    ],
  },
  22: {
    k: ['side'], st: 2, ch: 3,
    sum: 'Lucia-only strand from Chapter 3: finish Andy\'s five quests, ending with Puff Puff Pass.',
    steps: [
      ['During Chapter 3, as Lucia, Andy calls and texts his address in Belville.', 'pp'],
      ['Five quests in order: Climbing the Cellerichain, Pay the Cellerica Fee, Peach!, Read the Label, Puff Puff Pass.', 'pp', 'gbs'],
      ['Puff Puff Pass awards the trophy.', 'pp', 'gb'],
      ['Andy\'s strand does not count toward Strangers & Freaks.', 'gbs', 'gg'],
    ],
  },
  23: {
    k: ['side', 'collectible'], st: 2, ch: 1, c: 7,
    sum: 'Kenton\'s treasure-diving strand: recover all 7 shipwreck treasures. Starts after Island Dreams (Chapter 1).',
    steps: [
      ['After Island Dreams in Chapter 1, Kenton appears as a green "KR" icon in Key Lento.', 'pp'],
      ['Dive the shipwrecks and recover 7 treasures; a metal detector helps you dig.', 'pp', 'gb'],
      ['Kenton is away after Chapter 1 and texts Jason again in Chapters 2-3. PowerPyx says calling Brian later in Chapter 2 brings him back sooner.', 'pp'],
      ['Track it under Progress > Characters > Kenton Rees. 100% needs 5 of 7 Kenton sets, but all 7 for Underwater Discoveries.', 'pp', 'gb100'],
    ],
  },
  24: {
    k: ['side'], st: 2, ch: 2,
    sum: 'Billy\'s five jobs from the Thrillbilly Mud Club (after Coffee Break); Hometown Heroes awards it.',
    steps: [
      ['After Coffee Break in Chapter 2, Billy is marked at the Thrillbilly Mud Club in Kelly County.', 'pp'],
      ['Play his five: Thrillbillies, Twist Wrist Smash Grab, Mall Rats, The Impaler, Hometown Heroes.', 'pp', 'gbs'],
      ['Hometown Heroes awards the trophy.', 'pp', 'gb'],
      ['Billy does not count toward Strangers & Freaks.', 'gbs'],
    ],
  },
  25: {
    k: ['side'], st: 2, ch: null, c: 8,
    sum: 'Finish 8 qualifying stranger strands. Kirk, Kyle, Yago and Pilot Pete are confirmed; character strands do not count.',
    steps: [
      ['Confirmed to count: Kirk (3 missions, Chapter 1 flyer), Kyle (3, Chapter 2 flyer), Yago (3, Chapter 3) and Pilot Pete (5, Chapter 4).', 'gbs', 'pp'],
      ['Not counted: Andy, Billy, Tyrone, Yasmani, Eddie Acosta and Moses (PowerPyx); GTABase also names Shirley.', 'pp', 'gbs'],
      ['Strand missions arrive by call or text after some in-game days, sometimes in a later chapter; a started strand stays open.', 'gbs'],
      ['The game does not show which strands count, so watch the trophy\'s own progress counter.', 'gbs', 'gg'],
    ],
    mis: { level: 'watch', why: 'GTABase marks the optional Race Against Yago as time-sensitive, and Yago\'s strand counts. Whether missing that race shuts the strand is unconfirmed.', ponr: 'Unconfirmed; play Yago\'s races as soon as they appear in Chapter 3.', ch: 3, cite: ['gbm', 'gbs'] },
    unc: ['Which four strands complete the 8 is not confirmed by any source read (GTABase leaves Bret, Moses, Randy and Dunk unstated).'],
  },
  26: {
    k: ['side'], st: 2, ch: 3, c: 16,
    sum: 'Deliver Randy\'s Wish List of 16 cars, unlocked with the Key Cloner in Chapter 3.',
    steps: [
      ['The Wish List opens in Chapter 3 with the Zorrusso delivery that gives you the Key Cloner.', 'pp', 'gbm'],
      ['The 16: Zorrusso, Vitello, Infernus, Windsor Drop, Toros, Tempesta, Paragon, Jagular, Jubilee, Itali RSX, Growler, Gauntlet Hellfire, Furia, Dubsta, Banshee, Baller ST-D.', 'pp'],
      ['Map > Robberies > Randy\'s Wish List tracks it; scan a car with WAiNK to check it is on the list.', 'pp'],
      ['Randy ("RK") is in west Vice City. Many targets spawn by the hotels of Vice Beach and Ocean Beach; cleaner cars pay more.', 'pp'],
    ],
    dis: [['PowerPyx calls the unlocking mission "Clonin\' Keys, Makin\' GS"; GTABase\'s list shows "Steal the Zorrusso for Randy" at that point.', 'pp', 'gbm']],
  },
  27: {
    k: ['side'], st: 2, ch: 3,
    sum: 'Jason-only: after Here, Kitty Kitty (Chapter 3) destroy Tyrone\'s synthetic labs, then play Spin On This.',
    steps: [
      ['After Here, Kitty Kitty in Chapter 3, purple markers show synthetic labs around Vice City.', 'pp'],
      ['As Jason, destroy the labs (quest Take Out Kitty Litter).', 'pp', 'gbs'],
      ['Tyrone\'s second quest, Spin On This, then unlocks the trophy.', 'pp', 'gb'],
    ],
    unc: ['The number of labs is not in the pages read (PowerPyx links a separate lab guide).'],
  },
  28: {
    k: ['collectible'], st: 3, ch: 1, c: 18,
    sum: 'Meditate at every spot: 10 places count as 18. Accept Lucia\'s balcony meditation in Chapter 1 before it disappears.',
    steps: [
      ['Chapter 1, the morning after Down to Earth: Lucia mentions meditating in the kitchen of Jason\'s house. Follow her to the balcony and accept.', 'pp', 'kg', 'gg'],
      ['Do it before Chapter 1 ends. Afterwards the invitation is gone and no mission can be replayed.', 'pp', 'kg', 'ggs'],
      ['There are 10 meditation places but 18 counts, because some count twice when done with both Jason and Lucia.', 'gb100', 'pp'],
      ['Doing the two-person spots needs the partner, who joins you after Coffee Break (Chapter 2).', 'pp'],
      ['Track it at Progress > Collections > Exploration > Meditations. 100% needs only 15 of 18.', 'pp', 'gb100', 'kg'],
    ],
    mis: { level: 'missable', why: 'Lucia\'s balcony meditation at Jason\'s house is offered only in Chapter 1. No source can yet say whether it is one of the 18, so treat it as required.', ponr: 'End of Chapter 1: before What\'s in the Bag? starts Chapter 2.', ch: 1, cite: ['pp', 'kg', 'gg', 'gb'] },
    dis: [['KeenGamer and PowerPyx count it as the one missable trophy; GTABase says "possibly missable"; Fextralife only says at least one trophy can be missed.', 'kg', 'pp', 'gb', 'fx']],
    unc: ['Whether the Chapter 1 balcony meditation is needed for the trophy (PowerPyx earned it after doing it).'],
  },
  29: {
    k: ['side'], st: 2, ch: 2,
    sum: 'Jason-only: Bret\'s hunting strand from Chapter 2 (Coffee Break); hunt his unique animal. Which animal is unconfirmed.',
    steps: [
      ['After Coffee Break, Bret texts Jason (not Lucia) about Veteran Hunted, in Lummox County.', 'pp', 'gbs'],
      ['He then marks hunting spots. His unique Killtelligence SM-69 rifle can be taken from any Ammu-Nation weapon locker.', 'pp'],
      ['Follow his hunts until the unique animal falls; a clean one-shot kill pays more but is not needed.', 'pp', 'gb'],
      ['His 15 Target Decks (map, Activities) are all needed for 100%.', 'pp', 'gb100'],
    ],
    unc: ['Which of Bret\'s animals triggers the trophy (PowerPyx and GTABase both say unconfirmed).'],
  },
  30: {
    k: ['collectible'], st: 3, ch: null, c: 3,
    sum: 'Complete any 3 of the 18 card sets. Start with the small ones (12 and 18 cards); grab two Chapter 2 cards in time.',
    steps: [
      ['There are 18 sets, about 480 cards, from 12 to 36 cards per set.', 'fxc'],
      ['Smallest first: Backyard Wrestling (12), Delights Dancers (18), then any 24-card set.', 'fxc'],
      ['Cards cannot be bought. Spares sell at Pawn Shops without lowering your progress (Progress > Collections > Collectible Cards).', 'fxc'],
      ['Before Chapter 2 ends, take Vicki (Delights Dancers #1, Starlet Motel office) and Victor Maravilla (Los Santos Corkers #2, motel kitchen) in Port Gellhorn.', 'fxc'],
      ['100% needs 15 of 18 sets.', 'gb100', 'kg'],
    ],
    mis: { level: 'watch', why: 'Two cards at the Starlet Motel can only be taken before Chapter 2 ends. Missing them loses two sets, one of them the second-smallest; 3 sets are still possible, but 100% (15 of 18) would leave one spare.', ponr: 'End of Chapter 2.', ch: 2, step: 3, cite: ['fxc', 'gb100'] },
    dis: [['Fextralife gives the Vice City Manatees set as 24 cards but says it may be 30.', 'fxc']],
  },
  31: {
    k: ['collectible'], st: 3, ch: null, c: 100,
    sum: 'Scan 100 WAiNK locations (landmarks, curiosities, sculptures, No Flusher tags). Separate from vehicle scans.',
    steps: [
      ['Any 100 count, from Landmarks (31), Curiosities (35), Sculptures (23) and No Flusher tags.', 'pp'],
      ['These are tracked separately from vehicle scanning (Whip It Good).', 'gg'],
      ['100 locations is also the 100% target.', 'gb100'],
    ],
  },
  32: {
    k: ['activity'], st: 4, ch: null, c: 50,
    sum: 'Complete 50 of the 80 challenges; leave it for late, many finish on their own. 100% needs 70.',
    steps: [
      ['Progress > Challenges lists all 80; tick "Completed" to see what is done.', 'pp'],
      ['Many finish naturally, so check the list late in the run.', 'pp'],
      ['Keep going to 70 for 100%: the 10 hardest can be skipped.', 'gb100', 'kg'],
    ],
  },
  33: {
    k: ['crime'], st: 5, ch: 2,
    sum: 'With your partner along, get 4 stars and escape the red heat zone. A bank vault job does this for you.',
    steps: [
      ['Unlocked after Coffee Break. Call your partner (hold right on the D-pad, then triangle).', 'pp'],
      ['Cause trouble until you have 4 stars.', 'pp', 'gb'],
      ['Head for the train tunnel north of Ambrosia in Kelly County; police and helicopters struggle there.', 'pp', 'gg'],
      ['The trophy needs you to leave the red heat zone, not just the flashing search area.', 'pp', 'gg'],
      ['It also tends to pop during That\'s Where The Money Is… (vault jobs give 4 stars).', 'pp', 'gb'],
    ],
  },
  34: {
    k: ['crime'], st: 5, ch: 2, c: 3,
    sum: 'With your partner, rob 3 shops in a row while the red-and-blue wanted level stays on. Jewelry stores in north Vice City work.',
    steps: [
      ['After Coffee Break, bring your partner. Keep the red-and-blue wanted level up between shops: the red heat zone alone does not count.', 'pp', 'gg'],
      ['Take armor, Sticky Bombs from Ammu-Nation, and Zombix or Adrenaline to heal.', 'pp'],
      ['PowerPyx suggests the three jewelry stores in north Vice City (after Yasmani\'s Jewelry Jobs); blow each back-room safe.', 'pp'],
      ['The trophy can lag about 30 seconds after the third shop; if it doesn\'t pop, rob a fourth.', 'pp', 'gg', 'gb'],
    ],
  },
  35: {
    k: ['collectible'], st: 3, ch: null, c: 100,
    sum: 'Scan 100 different vehicles with WAiNK at a busy road; 100% needs 200 of 277 base models.',
    steps: [
      ['Scanning a vehicle with WAiNK is enough to discover it; a busy road works fast.', 'pp'],
      ['Progress > Vehicles shows the count.', 'pp'],
      ['Carry on to 200 of 277 base models for 100%.', 'gb100', 'kg'],
    ],
    dis: [['PowerPyx counts 557 vehicles at launch; the 100% checklist counts 277 base models.', 'pp', 'gb100']],
  },
  36: {
    k: ['world'], st: 5, ch: null, c: 5,
    sum: 'Activate Combat Focus (L3+R3 while aiming) and drop 5 gang enemies before it ends.',
    steps: [
      ['Aim, then press L3 and R3 to start Combat Focus. Adrenaline (hold L1, press triangle) extends it.', 'pp', 'gg'],
      ['Gang operation enemies are the best targets. PowerPyx says soldiers, police and civilians don\'t seem to count.', 'pp', 'gb'],
      ['An assault rifle such as the Duke 556 and body armor help.', 'pp', 'gg'],
      ['Focus has 4 levels, raised by ranges, golf, pool, fishing and headshots.', 'pp'],
    ],
  },
  37: {
    k: ['world'], st: 5, ch: null,
    sum: 'Steal a passenger jet docked at a VCIA boarding bridge (E3/E4), take off, and fly about 1 km away.',
    steps: [
      ['Only a large plane docked at a departure boarding bridge counts; planes parked on the airfield do not.', 'pp', 'gg'],
      ['Break through an airfield fence, take the stairs by the bridge into the plane and go up to the cockpit. Terminals E3/E4 are the easiest.', 'pp', 'gg'],
      ['Back out to the runway, take off, and fly about 1 km (0.6 mi) away for the trophy.', 'pp', 'gb'],
    ],
  },
  38: {
    k: ['world'], st: 5, ch: null,
    sum: 'Steal a Rhino tank at Mile Zero Air Station and take out enemies with it.',
    steps: [
      ['Tanks stand in the south of Mile Zero Air Station, the island base in southwest Mariana County.', 'pp', 'gb'],
      ['Ram the gate, or use the stunt jump near the southeast entrance.', 'pp'],
      ['Climb in and shoot enemies until it pops.', 'pp', 'kg'],
    ],
  },
  39: {
    k: ['crime'], st: 5, ch: 3,
    sum: 'With the Snap Gun from Yasmani\'s Jewelry Jobs (Chapter 3), open a jewelry store safe unseen.',
    steps: [
      ['Finish Yasmani\'s Jewelry Jobs in Chapter 3 to get the Snap Gun.', 'pp', 'gg'],
      ['Pick the back door with it. Kicking the door in sets off the alarm.', 'pp', 'gg'],
      ['Find the note with the safe code, loot the safe, disable the alarm and destroy the security footage.', 'pp'],
      ['Leave; it unlocks shortly after. Richardson Jewelry & Diamonds in Vice City is suggested.', 'pp', 'gg', 'gb'],
    ],
  },
  40: {
    k: ['crime'], st: 5, ch: 4, c: 5,
    sum: 'Rob 5 of the 8 bank vaults (opened by That\'s Where The Money Is… in Chapter 4) and escape each time.',
    steps: [
      ['Play the optional That\'s Where The Money Is… in Chapter 4 to unlock vaults.', 'pp', 'gg', 'gb100'],
      ['Tail a security van to its bank and walk in while the vault stands open.', 'pp', 'gg'],
      ['Bring your partner: you have to pass a bag over (hold right). Expect 4 stars; flee on a fast motorbike, then swap vehicles.', 'pp', 'gg'],
      ['Yasmani sells van tips for $10,000 after two Payday Loans jobs. Each vault pays up to $205,000; 100% needs all 8.', 'pp', 'gb100'],
    ],
  },
  41: {
    k: ['crime'], st: 5, ch: 4,
    sum: 'Rob an armored truck and get away; a bank vault job counts too.',
    steps: [
      ['A bank vault robbery (from Chapter 4) counts for this.', 'pp', 'gb'],
      ['Earlier route: sticky-bomb the rear door of an armored truck parked by a bank.', 'pp'],
      ['Escape the red heat zone or use a Pay \'n\' Spray. The Ambrosia train tunnel helps.', 'pp', 'gg'],
    ],
  },
  42: {
    k: ['collectible'], st: 3, ch: null,
    sum: 'Clear the fog from the whole map of Leonida; a plane is fastest.',
    steps: [
      ['The whole map has to be uncovered.', 'pp', 'kg'],
      ['Fly a plane in passes over the remaining fog.', 'pp', 'gb'],
    ],
  },
  43: {
    k: ['crime'], st: 5, ch: null, c: 9,
    sum: 'Rob one Illegal Operation from each of the 9 gangs (39 in all, yellow icons). 100% wants all 39.',
    steps: [
      ['Gang operations show as yellow map icons; there are 39 across 9 gangs.', 'pp', 'gb100'],
      ['Progress > Gangs shows which gangs are still missing.', 'pp'],
      ['Loot everything on the first visit; 100% needs all 39 and they respawn slowly.', 'gb100', 'gg'],
    ],
    unc: ['The nine gang names are not given by the pages read.'],
  },
  44: {
    k: ['world'], st: 5, ch: 4,
    sum: 'Buy an Apple Martini at the Ocean View Rooftop Bar on Ocean Beach and drink it by the bar.',
    steps: [
      ['Go to the Ocean View Rooftop Bar on Ocean Beach.', 'pp'],
      ['Order an Apple Martini and drink it while standing next to the bar.', 'pp'],
    ],
    dis: [['Only PowerPyx gives this method; KeenGamer and GTABase list the trigger as unconfirmed.', 'pp', 'kg', 'gb']],
  },
  45: {
    k: ['world'], st: 5, ch: 3,
    sum: 'Steal the blue Banshee from the south Vice City showroom and drive it out through the window (needs the Key Cloner).',
    steps: [
      ['Get the Key Cloner in Chapter 3.', 'pp'],
      ['Go to the vehicle showroom in south Vice City and take the blue Banshee; only that car counts.', 'pp'],
      ['Drive it through the showroom window. The trophy follows a moment after you drive off.', 'pp'],
    ],
    dis: [['Only PowerPyx gives this method; KeenGamer and GTABase list it as unconfirmed.', 'pp', 'kg', 'gb']],
  },
  46: {
    k: ['crime'], st: 5, ch: 2, c: 3,
    sum: 'Rob all 3 key valuables at Kingpin Bowling (Port Gellhorn) and lose the police. Not missable.',
    steps: [
      ['The optional Hit Kingpin Bowling (Chapter 2) marks the gang operation in Port Gellhorn.', 'pp', 'gbm'],
      ['Take the luxury watch (southeast office), the Gutterball Moreland 850 shotgun (northeast table) and the safe in the northeast hallway office.', 'pp', 'gg'],
      ['Open the safe with Sticky Bombs from Ammu-Nation.', 'pp', 'gg'],
      ['Escape the police. It respawns, and items already taken still count on a later visit.', 'pp', 'gg', 'gb'],
    ],
    dis: [['The description names Kolt & Associates\' bowling alley; the guides call the place Kingpin Bowling.', 'pp', 'gg', 'gb']],
  },
  47: {
    k: ['activity'], st: 4, ch: 2,
    sum: 'Max out Strength for Jason and Lucia together: train at a gym with your partner.',
    steps: [
      ['Possible after Coffee Break. Check Touchpad > Jason & Lucia > Strength.', 'pp'],
      ['Buy a fitness-club membership (Map > Activities filter).', 'pp'],
      ['Call your partner and work out together: the other lead trains at the same time. After the story you can train at home too.', 'pp', 'gg', 'gb'],
    ],
  },
  48: {
    k: ['world'], st: 5, ch: null, c: 500,
    sum: '500 actions that change your Criminal Profile; usually comes naturally. Irredeemable is permanent.',
    steps: [
      ['Turn on Settings > UI > HUD Notifications > Criminal Profile to see each action counted.', 'pp'],
      ['Robberies and fights count, so it usually fills during normal play; leave it till late.', 'pp', 'gg'],
      ['The profile climbs from Professional through Hardened, Violent and Psycho to Irredeemable. GTABase warns Irredeemable is permanent.', 'pp', 'gb'],
    ],
  },
  49: {
    k: ['world'], st: 5, ch: 0,
    sum: 'Trigger unconfirmed. The leading idea: rob the Prologue\'s Payday Loans store in Little Cuba again.',
    steps: [
      ['No source has confirmed how this unlocks yet.', 'pp', 'kg', 'gb'],
      ['PowerPyx thinks it involves the Payday Loans store from the Prologue, in Little Cuba, Vice City, perhaps by robbing it again in a certain way.', 'pp'],
    ],
    unc: ['The whole method is unconfirmed; this app will not invent one.'],
  },
  50: {
    k: ['world'], st: 5, ch: null,
    sum: 'UFO event: alone after 2 AM on the road northwest of the Starlet Motel (Kelly County); return the abducted woman to her car.',
    steps: [
      ['Go alone, after 2 AM, to the road northwest of the Starlet Motel in Kelly County.', 'pp'],
      ['If a car with blinking lights is there, follow the path into the woods to the UFO.', 'pp'],
      ['It drops a woman. Talk to her, offer help and take her back to her car.', 'pp'],
      ['It is random; if the car is not there, drive off and return.', 'pp'],
    ],
    dis: [['Only PowerPyx gives this method; KeenGamer and GTABase list it as unconfirmed.', 'pp', 'kg', 'gb']],
  },
  51: {
    k: ['world'], st: 5, ch: null, c: 10,
    sum: 'On any bike, kick 10 pedestrians (Square) within 60 seconds in a crowded spot.',
    steps: [
      ['Ride any bike into a crowd, for example in Vice City or on Ocean Beach.', 'pp'],
      ['Kick pedestrians with Square: 10 within 60 seconds.', 'pp'],
    ],
    dis: [['Only PowerPyx gives this method; KeenGamer and GTABase say it is still being confirmed.', 'pp', 'kg', 'gb']],
  },
  52: {
    k: ['crime'], st: 5, ch: 3, c: 250000,
    sum: 'Fence $250,000 of marked bills (Dye Pack Jammer from Credit Check, Chapter 3); vaults are fastest.',
    steps: [
      ['Credit Check in Chapter 3 gives the Dye Pack Jammer.', 'pp'],
      ['Rob banks and Payday Loans, then take the marked bills to a fence; Yasmani pays the most.', 'pp', 'gb'],
      ['The total carries over between robberies. A vault (Chapter 4) can pay up to $205,000.', 'pp'],
      ['$250,000 fenced is also a 100% line.', 'gb100'],
    ],
  },
  53: {
    k: ['world'], st: 5, ch: null, c: 100000,
    sum: 'Spend $100,000 in shops; guns, mods and tattoos add up fastest.',
    steps: [
      ['Any shop spending counts; guns, car mods and tattoos are quickest.', 'pp', 'gb'],
      ['Shops counted by PowerPyx: 14 mod shops, 19 Pay \'n\' Sprays, 24 Ammu-Nations, 67 clothes, 17 shoe, 18 salon, 11 tattoo and 15 electronics stores.', 'pp'],
    ],
  },
  54: {
    k: ['world'], st: 5, ch: 2, c: 8,
    sum: 'Buy the 8 garages for sale ($160,000 total) in the Vice City Real Estate app, open after Daily Driver.',
    steps: [
      ['Daily Driver in Chapter 2 opens the Vice City Real Estate app.', 'pp', 'gg'],
      ['Buy the 8 garages on sale, about $160,000 in all.', 'pp', 'gg', 'gb'],
      ['The 4 story garages are not needed.', 'pp', 'gg'],
    ],
  },
  55: {
    k: ['world'], st: 5, ch: 2, c: 10,
    sum: 'Register 10 vehicles through Scooter Bros (after Moses, Chapter 2): respray and register at Moses\' garage.',
    steps: [
      ['The Scooter Bros app installs after Moses in Chapter 2. You need garage space first (see Little Boxes).', 'pp', 'gg'],
      ['Drive stolen vehicles to Moses in Port Gellhorn and choose Respray, then Register.', 'pp', 'gg'],
      ['Early on he only takes cars without trackers. From Chapter 3, cars with standard trackers can be registered at any Pay \'n\' Spray.', 'pp', 'gg'],
      ['Registration costs money, so cheap cars and bikes are best.', 'pp', 'gg', 'gb'],
    ],
  },
};
