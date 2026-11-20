// Our guide to each of the 55 trophies, keyed by the official list's id. Written for this entry in our own words from
// the pages in sources.mjs; every step names the page ids that back it. Keys:
//   k kinds, ch chapter where it unlocks or starts (0 = prologue), c the count PlayStation tracks,
//   sum the "In short" line, steps [[text, ...pageIds]],
//   mis { level: 'missable' | 'possible' | 'risk', why, ponr, ch, before, cite } (the missable window),
//   disputes [{ topic, a: [text, ...ids], b: [text, ...ids], call }] (sources that disagree, both sides shown),
//   unc details no page confirms yet. Where each trophy sits in the roadmap is set in roadmap.mjs.
const AUTO = ['It unlocks on its own when the mission ends and cannot be missed.', 'pp', 'gb'];

export const GUIDES = {
  1: {
    k: ['completion'], c: 54,
    sum: 'Pops when the other 54 are done: all offline, one playthrough, about 200 hours.',
    steps: [
      ['All 54 other trophies are offline single-player; the list has no online, multiplayer or DLC trophy.', 'pp', 'gb', 'ps', 'ol'],
      ['One playthrough is enough: there are no difficulty trophies and no mission medals.', 'pp', 'kg', 'ol', 'psl'],
      ['No mission replay and no New Game+: keep a manual save at each chapter start. You get 15 manual slots plus one autosave.', 'pp', 'ig-replay', 'boom-save', 'bb-replay', 'ps'],
      ['Cheats unlock only after the story (Progress menu); entering one turns trophies off for the session, so keep a clean save.', 'tt-cheats', 'sn-cheats', 'kg', 'fx'],
      ['Order: story with optional missions (60-80 h), then the 100% checklist and 70 of 80 challenges (~100 h), then strangers and leftovers.', 'pp', 'kg', 'pp-length'],
    ],
    disputes: [
      { topic: 'Time to platinum', a: ['About 200 hours.', 'pp', 'kg', 'psl'], b: ['250 hours or more, perhaps past 300.', 'ps'], call: 'Plan on ~200 h; the longer figure assumes a slower 100% clean-up.' },
      { topic: 'Cheats and saving', a: ['A cheat turns off trophies and saving for the rest of the session.', 'tt-cheats', 'altchar', 'pp'], b: ['Only trophies are blocked; saving still works (judged from GTA V and RDR2).', 'bb-cheats'], call: 'Never save with a cheat on; reload a clean save.' },
      { topic: 'Any missable trophy?', a: ['None known yet.', 'ps'], b: ['Possibly one: Positive Mental Attitude, via a Chapter 1 meditation.', 'pp', 'kg', 'giga', 'gt-road'], call: 'Treat Positive Mental Attitude as missable.' },
    ],
  },
  2: {
    k: ['story'], ch: 1,
    sum: 'Finish Gone Fishing, the first mission after the Prologue. Cannot be missed.',
    steps: [
      ['The Prologue is played as Lucia; Gone Fishing follows it as the first Jason mission.', 'gtw', 'dx', 'gw'],
      ['Cal gives the mission: you fish drug packages out of the sea.', 'pp-gone'],
      AUTO,
      ['Free roam opens after it, so map fog and early activities can start now.', 'bb-fog'],
    ],
    disputes: [
      { topic: 'Where the Prologue sits', a: ['It counts as mission 1 of Chapter 1.', 'dx', 'gtw'], b: ['GTABase lists the Prologue on its own.', 'gbm'], call: 'Either way Gone Fishing comes straight after it.' },
    ],
  },
  3: {
    k: ['story'], ch: 1,
    sum: 'Finish Chapter 1. Starting Tourist Trap is the point of no return: meditate with Lucia and save first.',
    steps: [
      ['Chapter 1 is mostly Jason: 22 missions counting the Prologue, through Island Dreams, Feng Shui and Down to Earth to Discharge Time.', 'dx', 'gtw', 'gr-story'],
      ['Starting Tourist Trap (Kat calls after Recalibration) locks you in: Home Sweet Home and Discharge Time follow with no free roam.', 'vgc-ch1', 'ol-miss'],
      ['Before it: accept Lucia\'s balcony meditation, finish Shirley\'s two errands and make a manual save.', 'ol-miss', 'griv', 'pp-sf', 'egm', 'gg', 'ggs'],
      ['Jason\'s cash stash, his Ganado and the Ultimate Edition vehicles do not carry over; only BuckMe savings do.', 'ol-miss', 'vgc-ch1'],
      ['The trophy pops after What\'s in the Bag?, the first Chapter 2 mission.', 'pp', 'gb'],
    ],
    disputes: [
      { topic: 'Which chapter', a: ['GameTrek\'s trophy page files it under Chapter 2.', 'gt'], b: ['Its own roadmap and the other guides say Chapter 1.', 'gt-road', 'pp', 'ps'], call: 'Chapter 1, as the official text says; it pops as Chapter 2 opens.' },
    ],
  },
  4: {
    k: ['story'], ch: 2,
    sum: 'Finish Lucia\'s Chapter 2 in Port Gellhorn. Grab the two Starlet Motel cards before it ends.',
    steps: [
      ['Chapter 2 is Lucia\'s, around Port Gellhorn, from What\'s in the Bag? to Checking Out; Jason rejoins for the last missions.', 'gr-story', 'gtw', 'dx'],
      ['Prepare for Vice City asks for at least $15,000 before the story moves on.', 'gbm'],
      ['Before Checking Out, take Vicki (motel office bathroom) and Victor Maravilla (kitchen fridge) at the Starlet Motel: both rooms close after Chapter 2.', 'pp-delights', 'pp-corkers', 'fxc'],
      ['The trophy pops after Welcome to Vice City, the first Chapter 3 mission.', 'pp', 'gb'],
    ],
    disputes: [
      { topic: 'Mission count', a: ['11 story missions; Thrillbillies and Twist Wrist, Smash, Grab are optional Billy jobs.', 'dx', 'gr-story'], b: ['13, counting those two as story.', 'ps-story', 'ig-story'], call: '11; the two Billy jobs count toward The Lone Rider instead.' },
    ],
  },
  5: {
    k: ['story'], ch: 3,
    sum: 'Finish Chapter 3 in Vice City (to The Cartel Heist); it opens most crime trophies.',
    steps: [
      ['Chapter 3 moves to Vice City and unlocks switching between Jason and Lucia: 26 missions to The Cartel Heist.', 'gr-story', 'dx', 'gtw'],
      ['Credit Check opens small banks and Payday Loans and gives the Dye Pack Jammer for marked bills.', 'pp-banks', 'pp-payday', 'gg-launder'],
      ['Yasmani\'s Jewelry Jobs give the Snap Gun; Here, Kitty Kitty opens Tyrone\'s labs; Clonin\' Keys gives the Key Cloner for Randy.', 'gg', 'pp', 'ol-side'],
      ['Race Against Yago is time-limited: play it as soon as it appears.', 'pp-yago', 'gb-yago', 'ps-story'],
      ['The trophy comes after the first two Chapter 4 missions, Ocean Beach and Another Life.', 'pp', 'gb'],
    ],
  },
  6: {
    k: ['story'], ch: 4,
    sum: 'Finish Chapter 4, the longest, ending with Starting From Zero. Open the bank vaults while here.',
    steps: [
      ['Chapter 4 has 25 missions from Ocean Beach to Starting From Zero.', 'dx', 'ps-story', 'gtw'],
      ['Near its end, play the optional That\'s Where The Money Is… (Wait at the Cafe): it opens the 8 large bank vaults.', 'pp-banks', 'gg-banks', 'gg'],
      ['The optional call This Is a Free Call From… (Lucia) is timed in this chapter; no trophy needs it.', 'tn', 'gbm'],
      ['The trophy unlocks after Starting From Zero and cannot be missed.', 'pp', 'gb'],
    ],
    disputes: [
      { topic: 'Which chapter', a: ['GameTrek\'s trophy page lists it as Chapter 5.', 'gt'], b: ['The other guides tie it to the end of Chapter 4.', 'pp', 'gb'], call: 'Chapter 4, as the official description says.' },
    ],
  },
  7: {
    k: ['story'], ch: 5,
    sum: 'Gold for the final mission, The End of the Road. Save just before it; free roam continues after.',
    steps: [
      ['Chapter 5 is the shortest: 7 missions from Bird in the Hand to The End of the Road.', 'dx', 'gr-story', 'gtw', 'gb-final'],
      ['The game asks you to confirm before the finale, a run of missions leading to one of several endings.', 'kotaku', 'ol-miss'],
      ['Keep an untouched manual save from just before it: it lets you see another ending.', 'ol-miss', 'ol', 'sr-ngp'],
      ['After the credits you return to just before the finale with progress kept, and the 100% checklist appears.', 'kotaku', 'sr-ngp', 'd1'],
    ],
    disputes: [
      { topic: 'What it asks', a: ['Finish Chapter 5.', 'ig', 'bb', 'ozc'], b: ['Finish the final mission.', 'pp', 'gb', 'gt-road'], call: 'The same moment: the final mission closes Chapter 5.' },
    ],
  },
  8: {
    k: ['story'], ch: 2,
    sum: 'Breakfast Run, the 8th Chapter 2 mission (Lucia), just before Coffee Break.',
    steps: [
      ['Breakfast Run is the 8th mission of Chapter 2, played as Lucia.', 'dx', 'gtw', 'gbm'],
      AUTO,
      ['Coffee Break follows and reunites Jason and Lucia: the partner trophies open from then.', 'pp', 'gb', 'ggs'],
    ],
  },
  9: {
    k: ['story'], ch: 3,
    sum: 'The Cartel Heist, the 26th and last mission of Chapter 3.',
    steps: [
      ['The Cartel Heist closes Chapter 3 as its 26th mission.', 'dx', 'gtw', 'gr-story'],
      ['Its build-up runs through Sinfrontera National Bank, Security Expert and Hidden Charges.', 'gr-story', 'dx'],
      AUTO,
    ],
  },
  10: {
    k: ['story'], ch: 4,
    sum: 'Child\'s Play, the 17th mission of Chapter 4.',
    steps: [
      ['Child\'s Play is the 17th mission of Chapter 4.', 'dx', 'gr-story'],
      AUTO,
      ['Nearby, the optional call This Is a Free Call From… is marked missable; no trophy needs it.', 'gbm', 'tn'],
    ],
  },
  11: {
    k: ['story'], ch: 4,
    sum: 'Headliners, straight after Child\'s Play in Chapter 4.',
    steps: [
      ['Headliners is the 18th Chapter 4 mission, right after Child\'s Play.', 'dx', 'gr-story'],
      AUTO,
    ],
  },
  12: {
    k: ['story'], ch: 4,
    sum: 'VCIA Takedown, late in Chapter 4 (not the free-roam jet theft).',
    steps: [
      ['VCIA Takedown is the 23rd Chapter 4 mission, after Fully Catered.', 'dx', 'gr-story'],
      AUTO,
      ['Do not confuse it with Catch Me If You Can, the free-roam jet theft at VCIA.', 'gg-jet'],
    ],
  },
  13: {
    k: ['story'], ch: 5,
    sum: 'Operation Savage Glory, the 5th of 7 Chapter 5 missions.',
    steps: [
      ['Operation Savage Glory is the 5th of 7 missions in Chapter 5.', 'dx', 'gr-story'],
      AUTO,
      ['Protective Custody and the finale follow: save before the finale.', 'gr-story', 'ol'],
    ],
  },
  14: {
    k: ['completion'], c: 100,
    sum: 'Gold for 100%. The checklist shows after the story; earlier progress counts and nothing on it is missable.',
    steps: [
      ['The checklist appears only after the story (Progress > Stats > 100% Completion), but progress made earlier counts.', 'pp', 'gfz', 'ps-100', 'sr-ngp'],
      ['It has 35 tasks; nothing on it is missable and all of it can be done in free roam.', 'ig-100', 'pp-100', 'gfz', 'gb100'],
      ['No slack on: 39 gang operations, 22 bank jobs, 7 Payday Loans, 8 vaults, 42 range golds, 42 drone trials, 15 Bret decks, 33 underwater finds.', 'gfz', 'ig-100', 'ps-100'],
      ['Partial: 300/397 stunts, 70/80 challenges, 200/277 vehicles, 100/255 animals, 15/18 card sets, 15/18 meditations, 30/34 magazines, 100/125 flamingos, 90/100 hoops, 5/7 Kenton sets.', 'pp-100', 'ps-100', 'd1', 'ig-100'],
      ['Also: 100 optional tasks and $250,000 of marked bills fenced.', 'gb', 'ps-100', 'giga'],
      ['Take every key valuable at a gang operation on the first visit: restocks are slow and partial.', 'gb100', 'boom-apollo', 'gfz'],
    ],
    disputes: [
      { topic: 'Race challenge golds', a: ['30 race challenge golds.', 'ps-100'], b: ['10 of the 13 race challenges.', 'ig-100', 'pp-racech'], call: '10 of 13: with only 13 challenges, 30 golds cannot be right.' },
    ],
  },
  15: {
    k: ['activity'], c: 250,
    sum: 'Any 250 of 397 stunts; Under the Bridges are quickest. Go on to 300 for 100%.',
    steps: [
      ['397 stunts count together: 130 Stunt Jumps, 202 Under the Bridges, 40 Knife Flights and 25 Base Jumps.', 'pp-stunts', 'pp', 'ps', 'gb'],
      ['Under the Bridges are the fastest to pile up.', 'pp', 'gb'],
      ['Just doing a stunt counts; its optional challenge is not needed.', 'pp-stunts', 'gb'],
      ['Stunt Jumps by county: Vice-Dale 55, Kelly 29, Mariana 17, Lummox 16, Leonard 13. Track at Progress > Activities > Stunts.', 'pp-stunts', 'ps'],
      ['The 100% checklist wants 300, so keep going.', 'pp', 'gfz', 'ps-100'],
    ],
  },
  16: {
    k: ['activity'], c: 9,
    sum: 'Try each of the nine activity types once; most happen along the way.',
    steps: [
      ['Nine types: fishing, hunting, golf, a shooting range, pool, basketball (sink one), an arcade game, a race or drone race, and a stunt.', 'gb', 'pp', 'ps'],
      ['Progress > Activities shows which are still untried.', 'gb'],
      ['Most come naturally on the way to Baited My Tackle, Fair Game, Stick Fiddler and Cunning Stunts.', 'pp'],
    ],
  },
  17: {
    k: ['activity'], c: 42,
    sum: 'Gold all 42 challenges at Griffin (18) and Rodgers Ranch (24). Rentals are enough.',
    steps: [
      ['42 golds over two ranges: Griffin (6 courses × 3 medals) and Rodgers Ranch in Port Gellhorn (6 × 4).', 'pp-range', 'ps', 'ol'],
      ['Buy the $5 Waiver Pass from the clerk; $10 rental guns are enough for every gold.', 'pp-range', 'gb100'],
      ['At Griffin, speed beats bullseyes (one saves 1 s); slow time on the spinning Hook and Loop targets.', 'pp-range'],
      ['Rodgers Ranch scores with a multiplier that misses reset; Cops & Robbers is sniper headshots throughout.', 'pp-range'],
      ['Every finished challenge permanently raises Focus, which helps Gunslinger.', 'pp-range', 'gb-focus', 'sn-focus2'],
      ['Menu: Touch Pad > Activities > Shooting Ranges; some challenges unlock only after others.', 'ps'],
    ],
    disputes: [
      { topic: 'Number of ranges', a: ['12 range locations.', 'pp', 'gb'], b: ['Two ranges hold all 42 golds.', 'pp-range', 'ps', 'ol'], call: 'Two: PowerPyx\'s own range guide lists only Griffin and Rodgers Ranch.' },
      { topic: 'What 100% needs', a: ['All 42 golds.', 'pp-range', 'kg', 'ps-100'], b: ['A bronze in each challenge.', 'gb-range'], call: 'Get the 42 golds; the trophy needs them anyway.' },
    ],
  },
  18: {
    k: ['activity'], c: 14,
    sum: 'Win a Top Fun drone race at all 14 locations; finish all 42 trials while there for 100%.',
    steps: [
      ['Top Fun Drones has 14 locations holding 42 races; one win per location is enough.', 'gb', 'pp', 'ol', 'ps'],
      ['Some locations charge an entry fee; find them under Touch Pad > Activities > Drones.', 'ps'],
      ['The 100% checklist wants all 42 time trials.', 'gb', 'kg', 'ps-100', 'gfz'],
    ],
  },
  19: {
    k: ['activity'], c: 20,
    sum: 'Win 20 different races of 40; repeats do not count. 100% needs 30.',
    steps: [
      ['There are 40 unique races; win 20 different ones. A repeat win adds nothing.', 'pp-races', 'gb', 'ps'],
      ['Many races let you hire a car; raise your car\'s Rating at Mod Shops (Touch Pad > Activities > Racing).', 'ps'],
      ['Separate from races, 13 Race Challenges award medals; 100% wants 30 race wins and 10 challenge golds.', 'pp-racech', 'ps-100', 'ig-100'],
      ['Yago\'s strand starts with street races in Chapter 3; Race Against Yago is time-limited.', 'pp-yago', 'gb-yago'],
    ],
  },
  20: {
    k: ['activity'], ch: 1,
    sum: 'After Feng Shui (Chapter 1) Cal texts you; win his fishing challenge west of Key Lento.',
    steps: [
      ['After Feng Shui (Meet Cal) in Chapter 1, Cal texts about a purple fishing icon west of Key Lento.', 'pp'],
      ['His quest is Catch a Bigger Fish; it does not count for Strangers & Freaks.', 'pp-sf'],
      ['Push Square: land a Parrotfish over 2 kg for Cal, fishing from a boat with a rod.', 'ps'],
      ['The fishing in Gone Fishing and Recalibration is scripted story, not this challenge.', 'pp-gone', 'pp-recal'],
      ['Fishing also counts for Master of None and trains Focus.', 'gb', 'gb-focus', 'sn-focus2'],
    ],
  },
  21: {
    k: ['activity'], c: 1,
    sum: 'Clear every level of one of the four video games; three are on the TV at home.',
    steps: [
      ['Four games: Tenebrae Lux, Street Trash III and Time Jackers Rewind on the home JoySystem, and Bang For Your Buck on arcade cabinets.', 'pp-arcade', 'gb', 'pp'],
      ['Clear all levels of any one game; its extra challenges are not needed.', 'pp', 'gb', 'ol'],
      ['The home console is off during Chapter 2 and back in Chapter 3; Feng Shui has you play two games.', 'pp-arcade'],
      ['One Bang For Your Buck cabinet stands outside Bargain World in Port Gellhorn.', 'pp-arcade'],
      ['100% wants all four played; starting and quitting a game counts.', 'pp-arcade', 'kg', 'ps-100'],
    ],
  },
  22: {
    k: ['side'], ch: 3,
    sum: 'Lucia-only: Andy\'s five quests from Chapter 3 in Belville, ending with Puff Puff Pass.',
    steps: [
      ['In Chapter 3 Andy calls and texts Lucia her new address in Belville; the strand is Lucia-only.', 'pp', 'ol-side', 'ol'],
      ['Five quests: Climbing the Cellerichain (three parts), Pay the Cellerica Fee, Peach!, Read the Label, Puff Puff Pass.', 'pp', 'gbs'],
      ['Puff Puff Pass starts when Cecilia calls Lucia to the Paper Boys warehouse; it pays $10,000 and refunds the $5,000 fee.', 'gb-puff'],
      ['The trophy pops on Puff Puff Pass; the strand stays open after the story.', 'pp', 'gb-puff'],
      ['Andy does not count toward Strangers & Freaks.', 'gbs', 'ol-side', 'gg', 'ts'],
    ],
  },
  23: {
    k: ['side', 'collectible'], ch: 1, c: 7,
    sum: 'Kenton\'s treasure dives: recover all 7 shipwreck sets. Starts with Island Dreams in Chapter 1.',
    steps: [
      ['Island Dreams (Work for Kenton) starts at his beach shop in Key Lento after Hey Arnold!; it pays $400.', 'pp-island', 'bb-island'],
      ['Kenton then lends his boat, scuba gear and a metal detector; his shop is a green KR icon, dives are purple chests.', 'gt-kenton', 'vgc-island', 'gb'],
      ['Clear all 7 shipwreck sets; the detector beeps faster, then steady, near treasure.', 'pp', 'ol-side', 'gt-kenton', 'bb-island'],
      ['Kenton leaves after Chapter 1 and texts Jason again in Chapters 2-3; calling Brian in Chapter 2 may speed this.', 'pp', 'gt-kenton', 'gg-coll'],
      ['Not missable and open after the story. Track at Progress > Characters > Kenton Rees; 100% wants 5 of 7.', 'pp-100', 'gt-kenton', 'gt-coll'],
    ],
    disputes: [
      { topic: 'What triggers it', a: ['Finishing all 7 treasure sets.', 'pp', 'ol-side'], b: ['A final mission, Maritime Disputes.', 'ps-kenton', 'ps'], call: 'Do all 7 sets; if it has not popped, look for Maritime Disputes.' },
    ],
  },
  24: {
    k: ['side'], ch: 2,
    sum: 'Billy\'s five jobs from the Thrillbilly Mud Club (after Coffee Break); Hometown Heroes awards it.',
    steps: [
      ['After Coffee Break (Chapter 2), Billy is marked at the Thrillbilly Mud Club in Kelly County.', 'pp', 'gc'],
      ['Five jobs: Thrillbillies, Twist Wrist Smash Grab, Mall Rats, The Impaler, Hometown Heroes.', 'pp', 'gbs', 'gt-sf'],
      ['Twist Wrist, Smash, Grab: chase an armored truck on a dirt bike, blow its rear door, grab a bag.', 'pp-twist'],
      ['Hometown Heroes comes by text a few days after The Impaler, uses both leads and pays $10,000.', 'pp-heroes', 'gb-heroes'],
      ['Billy does not count toward Strangers & Freaks.', 'gbs', 'pp-heroes', 'gb-heroes', 'ts'],
    ],
  },
  25: {
    k: ['side'], ch: 3, c: 8,
    sum: 'Finish 8 stranger strands. Kirk, Kyle, Yago and Pilot Pete are confirmed; play Race Against Yago at once.',
    steps: [
      ['Confirmed to count: Kirk (3 quests, Chapter 1), Kyle (3, Chapter 2), Yago (Chapter 3) and Pilot Pete (5, Chapter 4, Jason).', 'pp-sf', 'pp', 'gl', 'gc'],
      ['Not counted: Andy, Billy, Tyrone, Yasmani, Moses, Shirley and Eddie Acosta.', 'pp-sf', 'ol-side', 'gl', 'ts'],
      ['The game does not say which strands count: check the trophy\'s progress before and after each last quest.', 'pp-sf', 'gg'],
      ['Follow-ups arrive by call or text after in-game days or a chapter change; Kirk\'s strand ends in Chapter 2.', 'pp-sf', 'gg-side'],
      ['Race Against Yago appears days after Bumper to Bumper in Salton: choose the Freeway Run.', 'pp-yago', 'gb-yago'],
      ['Unfinished strands that are not timed stay open after the story.', 'pp-sf', 'gc'],
    ],
    mis: { level: 'risk', ch: 3, cite: ['pp-sf', 'pp-yago', 'gb-yago', 'tn'],
      why: 'Yago\'s strand counts, and Race Against Yago has a limited-time hourglass. Whether missing it ends the strand is unconfirmed.',
      ponr: 'Race Against Yago\'s timer in Chapter 3 (length not stated).',
      before: 'Save when it appears and race at once.' },
    disputes: [
      { topic: 'Which other strands count', a: ['Bret, Randy and Kenton do not count either.', 'gl', 'gc'], b: ['Four more count but are unnamed; Bret, Randy and Dunk unstated.', 'gt-sf', 'pp-sf'], call: 'Unresolved: finish every stranger and watch the counter.' },
    ],
    unc: ['Which four strands make up the rest of the 8.'],
  },
  26: {
    k: ['side'], ch: 3, c: 16,
    sum: 'Deliver Randy\'s Wish List cars, opened by the Key Cloner in Chapter 3.',
    steps: [
      ['Chapter 3\'s Clonin\' Keys, Makin\' GS gives the Key Cloner and opens Randy\'s Wish List.', 'pp', 'ol-side'],
      ['The first car, the Zorrusso, is delivered in the story (Steal the Zorrusso for Randy).', 'pp', 'gr-story', 'dx'],
      ['Track it at Map > Robberies > Randy\'s Wish List; Randy is the green RK icon in west Vice City. Scan a car with WAiNK to check it is wanted.', 'pp', 'ps-randy'],
      ['Cleaner cars pay more; many spawn near the Vice Beach and Ocean Beach hotels. Infernus, Mamba GT and Ascot Paragon have trackers.', 'pp', 'ps-randy'],
      ['Delivering the Mamba GT lets Pay \'n\' Spray handle advanced trackers. The list is needed for 100%.', 'sn-trackers', 'gb-randy'],
    ],
    disputes: [
      { topic: 'List size', a: ['16 cars.', 'pp', 'ol-side', 'gt-sf'], b: ['22 cars; the Mamba GT is added by the extra job ¡Dale Mamba!.', 'ps-randy', 'gc'], call: 'Deliver every car Map > Robberies still lists.' },
    ],
  },
  27: {
    k: ['side'], ch: 3,
    sum: 'Jason-only: destroy Tyrone\'s Kitty Litter labs from Chapter 3, then finish Spin On This.',
    steps: [
      ['After Here, Kitty Kitty (Chapter 3), labs show as purple markers in Vice City (Take Out Kitty Litter); Jason only.', 'pp', 'ol-side', 'gb-labs'],
      ['Each lab destroyed pays $2,000 or $2,500 by BuckMe.', 'pp-labs', 'gb-labs'],
      ['Once enough are gone, Spin On This starts at a diner outside Grayson, Lummox County; it pays $10,000.', 'pp-spin', 'gb-spin'],
      ['In it: take the motel clerk\'s key, clear the lab behind the green door, charge two vats, chase down Rocky.', 'pp-spin'],
      ['Labs are not missable and can be finished after the story.', 'pp-labs'],
    ],
    disputes: [
      { topic: 'Number of labs', a: ['13: one in the story plus 12.', 'gb-labs'], b: ['14 (its own list adds up to 13).', 'pp-labs'], call: '13 can be located; clear them all.' },
    ],
    unc: ['How many labs trigger Spin On This.'],
  },
  28: {
    k: ['collectible'], ch: 1, c: 18,
    sum: '18 meditations at 10 spots. Lucia\'s Chapter 1 balcony session may count and is gone after Chapter 1: do it.',
    steps: [
      ['The morning after Down to Earth, Lucia mentions meditating in the kitchen at Jason\'s house (Key Lento): follow her to the balcony, look at her (L2), choose Accept.', 'griv', 'pp-med', 'jdg'],
      ['That session adds 1 to the counter but is not a marked spot, and it is gone once Chapter 2 starts.', 'griv', 'jdg', 'pp-med'],
      ['Most spots count once as Jason and once as Lucia, so both must be playable (after Coffee Break, Chapter 2).', 'pp-med', 'gb', 'gfz'],
      ['Spots: Smooth Sand (off west Capri), Swamp (Buckskin Swamp), Worn Stone (Camp Moonflower), Red Rocks, Water Wheel, Jutting Cliff, Waterfall, Seaside.', 'pp-med'],
      ['The last, Ascent Mountain on the Mount Kalaga summit, appears only once all others are done.', 'pp-med'],
      ['Let the full animation play or it will not count. Track at Progress > Collections > Exploration > Meditations.', 'ps', 'pp-med'],
      ['100% needs only 15 of 18, but the trophy needs every one.', 'pp-med', 'gfz', 'griv'],
    ],
    mis: { level: 'possible', ch: 1, cite: ['pp-med', 'gb', 'griv', 'vgc-ch1', 'ol-miss'],
      why: 'The balcony session cannot be redone, and no source confirms all 18 are reachable without it.',
      ponr: 'starting Tourist Trap, Chapter 1.',
      before: 'accept Lucia\'s invitation, then save.' },
    disputes: [
      { topic: 'Is the balcony session required?', a: ['Yes: skip it and the trophy is lost.', 'jdg'], b: ['Unconfirmed; PowerPyx did it and earned the trophy.', 'pp-med', 'pp', 'gb', 'griv'], call: 'Treat it as required: it takes two minutes.' },
    ],
  },
  29: {
    k: ['side'], ch: 2,
    sum: 'Jason-only: Bret\'s hunting strand from Chapter 2; the trophy animal is not confirmed yet.',
    steps: [
      ['Some time after Coffee Break, Bret texts Jason (not Lucia); Veteran Hunted starts in Lummox County near Mount Kalaga.', 'pp', 'pp-100', 'ol-side', 'gg-side'],
      ['It gives the Killtelligence SM-69 rifle; Ammu-Nation weapon lockers can replace it.', 'pp'],
      ['Bret\'s Hunting Decks follow: 15 Target Decks, sent one after another, all needed for 100%.', 'gb-bret', 'pp-100', 'ps-bret', 'ol-side'],
      ['Only Pristine or Good carcasses are accepted: use a clean head or heart shot.', 'ps-bret', 'pp-100', 'ol'],
      ['First decks: whitetail buck and doe; then a white tom turkey, a spotted skunk (night) and a wild boar.', 'ps-bret'],
      ['PowerPyx expects the trophy to pop naturally while working through the decks.', 'pp'],
    ],
    unc: ['Which of Bret\'s animals awards the trophy.'],
  },
  30: {
    k: ['collectible'], ch: 2, c: 3,
    sum: 'Any 3 of 18 card sets; the cheapest three total 54 cards. Two Chapter 2 cards are lost later.',
    steps: [
      ['18 sets, 480 cards, from 12 to 36 cards a set.', 'pp-cards', 'gb100', 'gg-coll'],
      ['Cheapest three: Backyard Wrestling (12), Delights Dancers (18) and any 24-card set, 54 cards in all.', 'pp-cards', 'gg-coll', 'fxc'],
      ['Before Chapter 2 ends, take Vicki (Starlet Motel office bathroom) and Victor Maravilla (motel kitchen fridge).', 'pp-delights', 'pp-corkers', 'fxc'],
      ['Cards are pick-ups only (surfaces, walls, yellow phone boxes, toolboxes); they cannot be bought.', 'pp-cards', 'fxc'],
      ['Selling a card at a Pawn Shop keeps it in your set; Bronze, Silver and Gold variants count separately.', 'pp-cards', 'ps', 'fxc'],
      ['100% needs 15 of 18 sets (Progress > Collections > Collectible Cards).', 'pp-100', 'gb100', 'ps-100'],
    ],
    mis: { level: 'risk', ch: 2, cite: ['pp-delights', 'pp-corkers', 'fxc'],
      why: 'Two Starlet Motel cards are lost after Chapter 2. That costs the Delights Dancers and Los Santos Corkers sets, not the trophy.',
      ponr: 'end of Chapter 2 (Checking Out).',
      before: 'pick up both motel cards in Port Gellhorn.' },
  },
  31: {
    k: ['collectible'], c: 100,
    sum: 'Scan any 100 WAiNK spots: landmarks, curiosities, sculptures and No Flusher tags.',
    steps: [
      ['Open the WAiNK app (D-pad up, then R1); nearby spots vibrate and show a notice.', 'pp', 'gt-coll', 'pp-waink'],
      ['Any 100 count from Landmarks (31), Curiosities (35), Sculptures (23) and No Flusher Tags.', 'pp', 'pp-curio', 'gt-coll', 'gg-coll', 'ps-hub'],
      ['No Flusher Tags are painted ground markings; every scan spot is outdoors.', 'pp-waink'],
      ['AHOL Street Art, 1010 Murals and Magazine Tattoos are scanned too but do not count.', 'pp-waink', 'gt-coll'],
      ['Track at Progress > Collections > WAiNK Locations; 100 is also the 100% target.', 'pp-waink', 'ps', 'pp-100'],
    ],
    disputes: [
      { topic: 'How many spots', a: ['112 in four groups (23 No Flusher Tags).', 'gt-coll', 'gg-coll'], b: ['Five sets, one still unknown; 89 visible at first.', 'pp-waink', 'ath'], call: 'At least 112 exist, so 100 is reachable.' },
    ],
  },
  32: {
    k: ['activity'], c: 50,
    sum: '50 of the 80 challenges; check late, many finish on their own. 100% needs 70.',
    steps: [
      ['80 challenges in 8 groups of 10: Combat, Criminal, Exploration, Fitness, Shopping, Sports, Survival, Vehicle.', 'pp-chal', 'gg-chal'],
      ['Progress > Challenges lists them; many finish naturally, so check late.', 'pp', 'gb', 'ps'],
      ['70 are needed for 100%: skip the hardest, such as Train Landing, Train Jump or Helipad Flyovers.', 'gg-chal', 'kg', 'gfz'],
      ['The Combat challenge Headshots (4 in one Focus) is separate from Gunslinger.', 'pp-chal'],
    ],
    disputes: [
      { topic: 'What the 80 are', a: ['General challenges in 8 groups.', 'pp-chal', 'gg-chal'], b: ['Shooting-range and racing challenges.', 'psl'], call: 'General: two guides list all 8 groups.' },
    ],
  },
  33: {
    k: ['crime'], ch: 2,
    sum: 'With your partner, reach 4 stars and leave the red heat zone; a vault job does it too.',
    steps: [
      ['After Coffee Break, call your partner (hold right on the D-pad, then triangle).', 'pp', 'gb'],
      ['Reach 4 stars; a bank vault robbery gives 4 at once.', 'pp', 'gb', 'ol'],
      ['Leave the red heat zone, not just the flashing search area.', 'ol', 'pp'],
      ['The train tunnel north of Ambrosia (Kelly County) is the suggested escape.', 'pp', 'gb', 'gg-tank'],
      ['Break line of sight, hide in bushes or a parked car, spare the cops; police know you as a pair, so split or change outfit.', 'gb-wanted', 'dx-police'],
    ],
  },
  34: {
    k: ['crime'], ch: 3, c: 3,
    sum: 'With your partner, rob 3 shops in a row without losing your stars; the north Vice City jewelers work.',
    steps: [
      ['Possible after Coffee Break; bring your partner.', 'pp', 'gg'],
      ['Keep the stars between shops: if they fade and only the red heat zone is left, the chain breaks.', 'ol', 'pp'],
      ['Route: the three close jewelry stores in north Vice City (after Yasmani\'s Jewelry Jobs, Chapter 3).', 'pp', 'gb'],
      ['Bring armor and Sticky Bombs for back-room safes; threaten staff and hold L2 to get registers opened.', 'pp', 'sr-money'],
      ['It can lag about 30 seconds; if nothing pops, rob a fourth.', 'pp', 'gb', 'ol'],
    ],
  },
  35: {
    k: ['collectible'], c: 100,
    sum: 'Scan 100 different vehicles with WAiNK beside a busy road; 100% needs 200 of 277.',
    steps: [
      ['Scanning a vehicle with WAiNK discovers it; no need to drive it. A busy road is fastest.', 'pp', 'gb'],
      ['Boats and aircraft count; Standout Vehicles do not.', 'gb100', 'giga'],
      ['Cars delivered to Moses or Randy count too. Track at Progress > Vehicles.', 'gfz', 'pp', 'ps'],
      ['Go on to 200 of 277 base models for 100%.', 'pp-100', 'psl', 'gb100'],
    ],
    disputes: [
      { topic: 'Does getting in count?', a: ['Entering or scanning both count.', 'ps', 'ozc'], b: ['Scan with WAiNK.', 'gb', 'ol'], call: 'Scan everything: it works either way.' },
    ],
  },
  36: {
    k: ['world'], c: 5,
    sum: 'In one Combat Focus (L3+R3 while aiming) drop 5 gang members; train Focus first.',
    steps: [
      ['Combat Focus unlocks in Chapter 1\'s Down to Earth: aim, then press L3 + R3.', 'sn-focus', 'gb-focus', 'ol'],
      ['Use gang members at an Illegal Operation; soldiers, police and civilians seem not to count.', 'pp', 'gb', 'ol'],
      ['An assault rifle helps; Adrenaline or food with the Focus icon makes it last longer.', 'pp', 'ol', 'sn-focus2'],
      ['Ranges, golf putting, pool, fishing and meditation permanently extend the bar.', 'gb-focus', 'sn-focus2', 'ig-fit'],
      ['Refill it with coffee or tea, sleep or a shower at a safehouse.', 'gb-focus', 'pp-range'],
    ],
  },
  37: {
    k: ['world'],
    sum: 'Steal a jet docked at a VCIA boarding bridge (E3/E4), take off and fly about 1 km away.',
    steps: [
      ['Only a large passenger jet docked at a departure boarding bridge works; planes on the airfield do not.', 'pp', 'gb', 'gg-jet'],
      ['Gates E3 and E4 are easiest.', 'pp', 'gb', 'ol-base'],
      ['A Brute Ripley airport tug gets you to the plane; board with the Pilot plane prompt.', 'gg-jet'],
      ['Take off and fly about 1 km (0.6 mi) away.', 'pp', 'gb', 'ol-base'],
      ['Stealing a plane no longer means instant five stars, but expect police.', 'tg-planes'],
    ],
  },
  38: {
    k: ['world'],
    sum: 'Take a Rhino tank at Mile Zero Air Station and fight from it; save first.',
    steps: [
      ['Tanks sit at the south end of Mile Zero Air Station, on Goose Key at the west end of the Keys (Mariana County).', 'pp', 'gb', 'ol-base', 'gg-tank'],
      ['Get in by the gate, the stunt jump near the southeast entrance, or by parachute.', 'gg-tank', 'ol-base', 'pp'],
      ['Save first: the wanted level climbs to 5, then 6 stars within minutes.', 'ol-base', 'ol'],
      ['Escape on a fast bike via the Ambrosia train tunnel; military vehicles cannot be kept.', 'gg-tank', 'ol-base'],
    ],
    disputes: [
      { topic: 'When it pops', a: ['A few seconds after you get in.', 'ol-base'], b: ['Only after you fire on enemies from inside.', 'pp', 'gb', 'gg-tank'], call: 'Shoot from the tank until it pops.' },
    ],
  },
  39: {
    k: ['crime'], ch: 3,
    sum: 'With the Snap Gun (Yasmani, Chapter 3), rob a jewelry store unseen: back door, safe code, alarm, footage.',
    steps: [
      ['Finish Yasmani\'s Jewelry Jobs in Chapter 3 to get the Snap Gun.', 'pp', 'gb', 'gg'],
      ['Pick the back door with it; kicking the door trips the alarm.', 'pp', 'gb', 'ol'],
      ['Read the safe code on the back-room note, loot the safe, then disable the alarm and the footage.', 'pp', 'gb'],
      ['Shooting cameras does not erase the cloud CCTV.', 'gg-banks'],
      ['Richardson Jewelry & Diamonds in Vice City is suggested.', 'pp'],
    ],
  },
  40: {
    k: ['crime'], ch: 4, c: 5,
    sum: 'Rob 5 of the 8 large bank vaults (opened in Chapter 4) and escape each time.',
    steps: [
      ['The optional That\'s Where The Money Is… (Wait at the Cafe), late in Chapter 4, opens the 8 large vaults.', 'pp-banks', 'gg-banks', 'ol'],
      ['Tail a security van to its bank: the vault opens briefly when the guard brings a briefcase in.', 'pp-banks', 'gg-banks'],
      ['Bring your partner. A vault gives 4 stars at once: flee on a fast motorbike, then swap vehicles.', 'pp-banks', 'gg-banks', 'ol'],
      ['Yasmani sells van tips for $10,000 after his Payday Loans jobs.', 'pp', 'gg-banks'],
      ['Each vault pays up to about $205,000; your getaway vehicle caps how much you carry.', 'pp-banks', 'gg-banks'],
      ['100% wants all 8; they stay open after the story.', 'pp', 'kg', 'ol', 'gg-banks'],
    ],
    disputes: [
      { topic: 'Grade', a: ['Bronze.', 'ps'], b: ['Silver.', 'fx', 'ig', 'ol'], call: 'Silver, as the official list says.' },
      { topic: 'Top payout', a: ['Up to $205,000.', 'pp-banks', 'gg-banks'], b: ['Up to $200,000.', 'ig-money'], call: 'About $200,000; it is a ceiling, not a promise.' },
    ],
  },
  41: {
    k: ['crime'], ch: 4,
    sum: 'Rob an armored truck and leave the red heat zone; a bank vault job counts too.',
    steps: [
      ['A large bank vault robbery counts.', 'pp', 'gb'],
      ['Earlier route: box in an armored truck by a bank and sticky-bomb its rear doors.', 'pp', 'gb'],
      ['Leave the red heat zone (or reach a Pay \'n\' Spray) to count as escaped.', 'ol', 'gb'],
      ['Billy\'s Twist Wrist, Smash, Grab also blows open a truck; its walkthrough does not say it awards this.', 'pp-twist'],
    ],
    unc: ['Whether the truck in Billy\'s mission counts.'],
  },
  42: {
    k: ['collectible'],
    sum: 'Clear the fog from the whole map; a crop duster does it in about 4-5 hours.',
    steps: [
      ['Possible from Chapter 1, once free roam opens after Gone Fishing.', 'pp-fog', 'bb-fog'],
      ['Fog clears by map segment: dipping into a segment clears it. A visible outline is not the same as discovered.', 'pp-fog', 'gg-map'],
      ['Fly the double-decker crop duster (Bottcher Duster); jets carry trackers and burn fuel fast.', 'pp-fog', 'bb-fog'],
      ['Planes wait at airstrips near Key Lento, in Mariana County and central Kelly County; land when fuel turns yellow.', 'pp-fog', 'bb-fog'],
      ['Allow 4-5 hours with refuels; save by hand, autosaves are rare.', 'bb-fog'],
      ['Airboats help in the Grassrivers marsh.', 'gg-map'],
    ],
  },
  43: {
    k: ['crime'], c: 9,
    sum: 'Rob one Illegal Operation of each of the 9 gangs (39 in all); take every key valuable.',
    steps: [
      ['Nine gangs run 39 Illegal Operations (yellow masked icons).', 'pp-gangs', 'kg-gangs', 'ig-money', 'gb'],
      ['Kingfishers 3, Kolts & Associates 5, M7 2, La Polilla Negra 2, Final Chapter 4, San4San 5, PTT Youngin$ 2, Guardia Brothers 3, Other Criminals 13.', 'pp-gangs', 'kg-gangs'],
      ['A spot counts only once every key valuable (safe plus previewed items) is taken.', 'pp-gangs', 'kg-gangs'],
      ['Safe codes are random: find the note on site or search a knocked-out guard.', 'kg-gangs', 'gg-banks'],
      ['Progress > Gangs shows each gang; the story marks 19 of the 39.', 'kg-gangs', 'pp', 'gfz'],
      ['All 39 are needed for 100%; done spots restock slowly and partly.', 'pp', 'gb100', 'boom-apollo'],
    ],
  },
  44: {
    k: ['world'],
    sum: 'PowerPyx: an Apple Martini at the Ocean View Rooftop Bar, Ocean Beach, drunk by the bar.',
    steps: [
      ['Order an Apple Martini at the Ocean View Rooftop Bar on Ocean Beach and drink it standing by the bar.', 'pp'],
      ['It is one of 122 bars (blue drink icons), listed with the Ocean Beach bars in Vice-Dale County.', 'pp-bars'],
    ],
    disputes: [
      { topic: 'Method', a: ['Apple Martini at the Ocean View Rooftop Bar.', 'pp'], b: ['No confirmed method yet.', 'gb', 'kg', 'ol'], call: 'Try PowerPyx\'s method; only one site confirms it.' },
    ],
  },
  45: {
    k: ['world'], ch: 3,
    sum: 'PowerPyx: with the Key Cloner, take the blue Banshee and drive it out of the south Vice City showroom window.',
    steps: [
      ['Get the Key Cloner in Chapter 3 first.', 'pp', 'ol-side'],
      ['Take the blue Banshee from the showroom in south Vice City; only that car counts.', 'pp'],
      ['Drive it out through the showroom window; it pops a moment later.', 'pp', 'ozc'],
    ],
    disputes: [
      { topic: 'Method', a: ['The blue Banshee, out through the window.', 'pp'], b: ['No confirmed method yet.', 'gb', 'kg', 'ol'], call: 'Try it; two sites describe the window escape.' },
    ],
  },
  46: {
    k: ['crime'], ch: 2, c: 3,
    sum: 'Rob all three key valuables at Kingpin Bowling (Port Gellhorn) and lose the police. Not missable.',
    steps: [
      ['The optional Lucia job Hit Kingpin Bowling (after Coffee Break, Chapter 2) marks this Kolts & Associates operation.', 'gb-bowl', 'pp', 'pp-gangs'],
      ['Take the luxury watch (southeast room), the Gutterball Moreland 850 shotgun (pool table) and the safe in the small northeast office.', 'gb-bowl', 'pp'],
      ['Blow the safe with a Sticky Bomb; stock armor and Zombix and bring your partner.', 'gb-bowl', 'pp', 'ol'],
      ['Lose the 2-star wanted level; it pops shortly after.', 'gb-bowl', 'pp'],
      ['Not missable: the alley respawns in Chapter 3 and items taken earlier still count.', 'gb-bowl', 'pp', 'gb'],
    ],
    disputes: [
      { topic: 'What it asks', a: ['Just bowl at the alley.', 'ozc'], b: ['Rob all three key valuables and escape.', 'gb-bowl', 'pp', 'kg', 'ol'], call: 'Rob it: four guides agree.' },
    ],
  },
  47: {
    k: ['activity'], ch: 2,
    sum: 'Max Strength for Jason and Lucia: train at a gym together after Coffee Break.',
    steps: [
      ['After Coffee Break, max the Strength stat for both leads (pause menu).', 'pp', 'gb', 'kg'],
      ['Buy a gym membership once at the front desk; it covers both.', 'sn-gym', 'pp'],
      ['Call your partner and train together: both train at once.', 'pp', 'gb', 'ol'],
      ['Jason\'s Key Lento safehouse has a back-deck gym; after the story you can train at home.', 'sn-gym', 'gb'],
      ['Strength grows with pull-ups and weights plus protein and rest; missed workouts lose progress.', 'ig-fit'],
    ],
    disputes: [
      { topic: 'What it asks', a: ['Max Strength for both.', 'pp', 'gb', 'kg'], b: ['A story trophy with no trigger.', 'ozc'], call: 'Train Strength: three guides agree.' },
    ],
  },
  48: {
    k: ['world'], c: 500,
    sum: '500 actions that change your Criminal Profile; it fills in normal play. Irredeemable is permanent.',
    steps: [
      ['Turn on Settings > UI > HUD Notifications > Criminal Profile to see each counted action.', 'pp', 'gb'],
      ['Robberies and fights count, so it fills during normal play.', 'ol', 'pp'],
      ['Profiles run Professional, Hardened, Violent, Psycho, Irredeemable; Irredeemable cannot be undone.', 'pp', 'gb', 'g8jp'],
      ['Your profile changes Focus gains: takedowns for Professional/Hardened, headshots for Violent/Psycho.', 'ig-fit'],
      ['Criminal Profile and relationship status do not affect 100%.', 'jdg'],
    ],
  },
  49: {
    k: ['world'], ch: 0,
    sum: 'Unconfirmed. Leads only: a repeat of the Prologue Payday Loans robbery, or normal play.',
    steps: [
      ['No source has confirmed how this unlocks.', 'pp', 'gb', 'kg', 'ol'],
      ['PowerPyx\'s lead: the Prologue\'s Payday Loans store in Little Cuba, robbed again a certain way; its Payday Loans guide does not mention it.', 'pp', 'pp-payday'],
      ['Output Lag says it may pop during normal play.', 'ol'],
      ['Gamer Guides shows its unlock condition only as "Save Mark obtained".', 'ggd-bad'],
    ],
    disputes: [
      { topic: 'Likely trigger', a: ['Rob the Prologue\'s Payday Loans again.', 'pp'], b: ['Succeed on a second attempt.', 'gb'], call: 'Unconfirmed: we will not invent a method.' },
    ],
    unc: ['The whole method.'],
  },
  50: {
    k: ['world'], ch: 2,
    sum: 'UFO event near the Starlet Motel (Kelly County) after 2 AM, alone: help the woman, fetch her car.',
    steps: [
      ['Go alone after 2 AM to the woods by the Starlet Motel in Kelly County.', 'pp', 'bb-ufo', 'gr-ufo'],
      ['Look for a parked car with blinking lights and open doors; if absent, leave and return.', 'pp', 'bb-ufo', 'gr-ufo'],
      ['Follow the trail toward the white beam; the UFO drops a woman.', 'bb-ufo', 'gr-ufo', 'pp'],
      ['Help her, then fetch her car: you are abducted on the way and wake days later to a call.', 'bb-ufo', 'gr-ufo'],
      ['Beebom says Chapter 2 must be reached; GameRant calls it part one of a three-part secret.', 'bb-ufo', 'gr-ufo'],
    ],
    disputes: [
      { topic: 'Exact spot', a: ['The road northwest of the Starlet Motel.', 'pp'], b: ['A forest east of Port Gellhorn, near the motel.', 'bb-ufo', 'gr-ufo'], call: 'Search around the Starlet Motel at 2 AM.' },
    ],
  },
  51: {
    k: ['world'], c: 10,
    sum: 'PowerPyx: on any bike, kick 10 pedestrians within 60 seconds in a crowd.',
    steps: [
      ['On any bike, kick pedestrians with Square: 10 within 60 seconds.', 'pp'],
      ['Crowded Vice City or Ocean Beach streets work best.', 'pp'],
    ],
    disputes: [
      { topic: 'Method', a: ['10 bike kicks in 60 seconds.', 'pp'], b: ['Still being confirmed.', 'gb', 'kg', 'ol'], call: 'Try PowerPyx\'s method; one site confirms it.' },
    ],
  },
  52: {
    k: ['crime'], ch: 3, c: 250000,
    sum: 'Launder $250,000 of marked bills through fences; needs the Dye Pack Jammer (Chapter 3).',
    steps: [
      ['Credit Check (Meet Raul\'s Crew), Chapter 3, gives the Dye Pack Jammer needed to launder.', 'pp', 'gg-launder', 'pp-payday', 'gfz'],
      ['Marked bills come from banks and Payday Loans; take them to a fence.', 'gg-launder', 'pp', 'sr-money'],
      ['Yasmani pays the most; bills left at one of your garages can be collected by him.', 'gg-launder', 'gg-banks', 'gb'],
      ['The total adds up over trips; one vault can pay up to $205,000.', 'gg-launder', 'pp', 'pp-banks'],
      ['Death or arrest loses the bag; each lead carries at most $20,000 cash.', 'sr-money', 'gg-banks'],
      ['$250,000 laundered is also a 100% line.', 'ps-100', 'gb100'],
    ],
  },
  53: {
    k: ['world'], c: 100000,
    sum: 'Spend $100,000 across shops; guns, car mods and tattoos add up fastest.',
    steps: [
      ['All shop spending adds up; guns, car mods and tattoos are fastest.', 'pp', 'gb'],
      ['Shops: 14 Mod Shops, 19 Pay \'n\' Sprays, 24 Ammu-Nations, 67 clothing, 17 shoe, 18 salon, 11 tattoo, 15 electronics.', 'pp'],
      ['Shops are listed under Touch Pad > Style.', 'ps'],
    ],
  },
  54: {
    k: ['world'], ch: 2, c: 8,
    sum: 'Buy the 8 garages in the Vice City Real Estate app (from Daily Driver, Chapter 2), about $160,000.',
    steps: [
      ['Daily Driver (Steal the Crawler for Moses), Chapter 2, opens the Vice City Real Estate app.', 'pp', 'ol', 'gb'],
      ['Buy the 8 garages for sale, about $160,000 in total; each adds a parking spot.', 'pp', 'ps', 'gb', 'ol'],
      ['Prices: Mitchel Auto Center $4,000 up to Atlantic Court $40,000.', 'ps'],
      ['Story garages (like Valentina\'s on Ocean Beach) and pre-order bonus garages do not count.', 'pp', 'gb', 'gg-slots', 'sn-bonus'],
      ['Safehouses and other property cannot be bought.', 'gb-money'],
    ],
  },
  55: {
    k: ['world'], ch: 2, c: 10,
    sum: 'Register 10 vehicles via Scooter Bros: Moses\' garage first, any Pay \'n\' Spray from Chapter 3.',
    steps: [
      ['The Scooter Bros app comes with Moses (Take A Vehicle to Moses), Chapter 2.', 'pp', 'gg-slots', 'ol'],
      ['Each registration needs a free garage space (see Little Boxes) and costs more for pricier cars.', 'pp', 'ps', 'ol', 'gg-slots'],
      ['Early on, Moses\' Port Gellhorn garage takes only tracker-free cars: Respray, then Register.', 'pp', 'gb'],
      ['From Chapter 3, cars with Standard trackers register at any Pay \'n\' Spray.', 'pp', 'ol', 'gg-slots', 'sn-trackers'],
      ['Tracked cars cannot be modded until registered; storing a car does not register it.', 'gb-cars', 'gg-slots'],
    ],
    disputes: [
      { topic: 'Where to register', a: ['A Pay \'n\' Spray or Mod Shop.', 'ps'], b: ['Moses first; Pay \'n\' Spray from Chapter 3.', 'pp', 'gb', 'ol'], call: 'Start with Moses, then Pay \'n\' Spray.' },
    ],
  },
};
