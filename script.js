document.addEventListener('DOMContentLoaded', function() {
    let currentCharacter = "";
    let score = 0;

    const characters = [{'name': 'Han Solo', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Corellia', 'species': 'Human', 'died': '34 ABY', 'occupation': 'Smuggler', 'appearedIn': ['A New Hope']}, {'name': 'Leia Organa', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'Yes', 'planet': 'Alderaan', 'species': 'Human', 'died': '35 ABY', 'occupation': 'Senator', 'appearedIn': ['A New Hope']}, {'name': 'Luke Skywalker', 'affiliation': 'Rebel Alliance', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Tatooine', 'species': 'Human', 'died': '34 ABY', 'occupation': 'Jedi', 'appearedIn': ['A New Hope']}, {'name': 'Darth Vader', 'affiliation': 'Galactic Empire', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Tatooine', 'species': 'Human', 'died': '4 ABY', 'occupation': 'Sith', 'appearedIn': ['A New Hope']}, {'name': 'Count Dooku', 'affiliation': 'Separatist', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Serenno', 'species': 'Human', 'died': '19 BBY', 'occupation': 'Sith', 'appearedIn': ['Attack of the Clones']}, {'name': 'Padmé Amidala', 'affiliation': 'Galactic Republic', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Naboo', 'species': 'Human', 'died': '19 BBY', 'occupation': 'Senator', 'appearedIn': ['The Phantom Menace']}, {'name': 'Jar Jar Binks', 'affiliation': 'Galactic Republic', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Naboo', 'species': 'Gungan', 'died': 'Alive', 'occupation': 'Gungan Representative', 'appearedIn': ['The Phantom Menace']}, {'name': 'Grand Moff Tarkin', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Eriadu', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Military', 'appearedIn': ['Revenge of the Sith']}, {'name': 'Chewbacca', 'affiliation': 'Rebel Alliance', 'weapon': 'Bowcaster', 'forceSensitive': 'No', 'planet': 'Kashyyyk', 'species': 'Wookiee', 'died': 'Alive', 'occupation': 'Smuggler', 'appearedIn': ['Revenge of the Sith']}, {'name': 'R2-D2', 'affiliation': 'Rebel Alliance', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Naboo', 'species': 'Droid', 'died': 'Alive', 'occupation': 'Astromech Droid', 'appearedIn': ['The Phantom Menace']}, {'name': 'Qui-Gon Jinn', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Coruscant', 'species': 'Human', 'died': '32 BBY', 'occupation': 'Jedi', 'appearedIn': ['The Phantom Menace']}, {'name': 'Grand Admiral Thrawn', 'affiliation': 'Galactic Empire', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Csilla', 'species': 'Chiss', 'died': 'Alive', 'occupation': 'Military', 'appearedIn': ['Ahsoka']}, {'name': 'Savage Opress', 'affiliation': 'None', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Dathomir', 'species': 'Zabrak', 'died': '19 BBY', 'occupation': 'Sith', 'appearedIn': ['The Clone Wars']}, {'name': 'Asajj Ventress', 'affiliation': 'Separatist', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Dathomir', 'species': 'Dathomirian', 'died': '19 BBY', 'occupation': 'Sith', 'appearedIn': ['The Clone Wars']}, {'name': 'Mother Talzin', 'affiliation': 'None', 'weapon': 'Magic', 'forceSensitive': 'Yes', 'planet': 'Dathomir', 'species': 'Dathomirian', 'died': '20 BBY', 'occupation': 'Nightsister', 'appearedIn': ['The Clone Wars']}, {'name': 'Kit Fisto', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Glee Anselm', 'species': 'Nautolan', 'died': '19 BBY', 'occupation': 'Jedi', 'appearedIn': ['Attack of the Clones']}, {'name': 'Ahsoka Tano', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Shili', 'species': 'Togruta', 'died': 'Alive', 'occupation': 'Jedi', 'appearedIn': ['The Clone Wars']}, {'name': 'Shaak Ti', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Shili', 'species': 'Togruta', 'died': '19 BBY', 'occupation': 'Jedi', 'appearedIn': ['Attack of the Clones']}, {'name': 'Boba Fett', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Kamino', 'species': 'Human (Clone)', 'died': 'Alive', 'occupation': 'Bounty Hunter', 'appearedIn': ['Attack of the Clones']}, {'name': 'Jango Fett', 'affiliation': 'Separatist', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Concord Dawn', 'species': 'Human', 'died': '22 BBY', 'occupation': 'Bounty Hunter', 'appearedIn': ['Attack of the Clones']}, {'name': 'Captain Rex', 'affiliation': 'Galactic Republic', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Kamino', 'species': 'Human (Clone)', 'died': 'Alive', 'occupation': 'Military', 'appearedIn': ['The Clone Wars']}, {'name': 'Cad Bane', 'affiliation': 'Separatist', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Duro', 'species': 'Duros', 'died': '9 ABY', 'occupation': 'Bounty Hunter', 'appearedIn': ['The Clone Wars']}, {'name': 'Aurra Sing', 'affiliation': 'Separatist', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Nar Shaddaa', 'species': 'Palliduvan', 'died': '13 BBY', 'occupation': 'Bounty Hunter', 'appearedIn': ['The Clone Wars']}, {'name': 'Hera Syndulla', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Ryloth', 'species': "Twi'lek", 'died': 'Alive', 'occupation': 'Military', 'appearedIn': ['Rebels']}, {'name': 'Obi-Wan Kenobi', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Stewjon', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Jedi', 'appearedIn': ['The Phantom Menace']}, {'name': 'Emperor Palpatine (Darth Sidious)', 'affiliation': 'Galactic Empire', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Naboo', 'species': 'Human', 'died': '4 ABY', 'occupation': 'Sith', 'appearedIn': ['The Phantom Menace']}, {'name': 'Nute Gunray', 'affiliation': 'Separatist', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Neimoidia', 'species': 'Neimoidian', 'died': '19 BBY', 'occupation': 'Businessman', 'appearedIn': ['The Phantom Menace']}, {'name': 'Anakin Skywalker', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Tatooine', 'species': 'Human', 'died': '4 ABY', 'occupation': 'Jedi', 'appearedIn': ['The Phantom Menace']}, {'name': 'Cassian Andor', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Fest', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Military', 'appearedIn': ['Rogue One']}, {'name': 'Saw Gerrera', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Onderon', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Leader', 'appearedIn': ['The Clone Wars']}, {'name': 'Orson Krennic', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Lexrul', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Military', 'appearedIn': ['Rogue One']}, {'name': 'Jyn Erso', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Vallt', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Military', 'appearedIn': ['Rogue One']}, {'name': 'Din Djarin', 'affiliation': 'Independent', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Unknown', 'species': 'Human', 'died': 'Alive', 'occupation': 'Bounty Hunter', 'appearedIn': ['The Mandalorian']}, {'name': 'Bo-Katan Kryze', 'affiliation': 'Mandalorians', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Mandalore', 'species': 'Human', 'died': 'Alive', 'occupation': 'Mandalorian Warrior', 'appearedIn': ['The Clone Wars']}, {'name': 'Pre Vizsla', 'affiliation': 'Death Watch', 'weapon': 'Darksaber', 'forceSensitive': 'No', 'planet': 'Mandalore', 'species': 'Human', 'died': '19 BBY', 'occupation': 'Mandalorian Warrior', 'appearedIn': ['The Clone Wars']}, {'name': 'Jocasta Nu', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Coruscant', 'species': 'Human', 'died': '19 BBY', 'occupation': 'Jedi', 'appearedIn': ['Attack of the Clones']}, {'name': 'Barriss Offee', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Mirial', 'species': 'Mirialan', 'died': '19 BBY', 'occupation': 'Jedi', 'appearedIn': ['The Clone Wars']}, {'name': 'Luminara Unduli', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Mirial', 'species': 'Mirialan', 'died': '19 BBY', 'occupation': 'Jedi', 'appearedIn': ['Attack of the Clones']}, {'name': 'Mace Windu', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Haruun Kal', 'species': 'Human', 'died': '19 BBY', 'occupation': 'Jedi', 'appearedIn': ['The Phantom Menace']}, {'name': 'Quinlan Vos', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Kiffu', 'species': 'Kiffar', 'died': 'Alive', 'occupation': 'Jedi', 'appearedIn': ['The Phantom Menace']}, {'name': 'Plo Koon', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Dorin', 'species': 'Kel Dor', 'died': '19 BBY', 'occupation': 'Jedi', 'appearedIn': ['The Phantom Menace']}, {'name': 'Ki-Adi-Mundi', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Cerea', 'species': 'Cerean', 'died': '19 BBY', 'occupation': 'Jedi', 'appearedIn': ['The Phantom Menace']}, {'name': 'Darth Revan', 'affiliation': 'Sith', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Unknown', 'species': 'Human', 'died': '3643 BBY', 'occupation': 'Sith Lord', 'appearedIn': ['Knights of the Old Republic']}, {'name': 'Ezra Bridger', 'affiliation': 'Rebel Alliance', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Lothal', 'species': 'Human', 'died': 'Alive', 'occupation': 'Jedi', 'appearedIn': ['Rebels']}, {'name': 'Kanan Jarrus', 'affiliation': 'Rebel Alliance', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Coruscant', 'species': 'Human', 'died': '4 BBY', 'occupation': 'Jedi', 'appearedIn': ['Rebels']}, {'name': 'Nien Nunb', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Sullust', 'species': 'Sullustan', 'died': 'Alive', 'occupation': 'Pilot', 'appearedIn': ['Return of the Jedi']}, {'name': 'Galen Erso', 'affiliation': 'Galactic Empire', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Grange', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Scientist', 'appearedIn': ['Rogue One']}, {'name': '4-LOM', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Gand', 'species': 'Protocol Droid', 'died': 'Alive', 'occupation': 'Bounty Hunter', 'appearedIn': ['The Empire Strikes Back']}, {'name': 'Admiral Ackbar', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Mon Cala', 'species': 'Mon Calamari', 'died': 'Alive', 'occupation': 'Military Leader', 'appearedIn': ['Return of the Jedi']}, {'name': 'Admiral Piett', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Axxila', 'species': 'Human', 'died': '4 ABY', 'occupation': 'Naval Officer', 'appearedIn': ['The Empire Strikes Back']}, {'name': 'Agent Kallus', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Coruscant', 'species': 'Human', 'died': 'Alive', 'occupation': 'Intelligence Officer', 'appearedIn': ['Rebels']}, {'name': 'Bail Organa', 'affiliation': 'Galactic Republic', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Alderaan', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Senator', 'appearedIn': ['Revenge of the Sith']}, {'name': 'Beru Lars', 'affiliation': 'Neutral', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Tatooine', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Farmer', 'appearedIn': ['Revenge of the Sith']}, {'name': 'Bib Fortuna', 'affiliation': "Jabba's Criminal Empire", 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Ryloth', 'species': "Twi'lek", 'died': '4 ABY', 'occupation': 'Assistant', 'appearedIn': ['Return of the Jedi']}, {'name': 'Boss Nass', 'affiliation': 'Naboo', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Naboo', 'species': 'Gungan', 'died': 'Alive', 'occupation': 'Leader', 'appearedIn': ['The Phantom Menace']}, {'name': 'Bossk', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Trandosha', 'species': 'Trandoshan', 'died': 'Alive', 'occupation': 'Bounty Hunter', 'appearedIn': ['The Empire Strikes Back']}, {'name': 'C-3PO', 'affiliation': 'Rebel Alliance', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Tatooine', 'species': 'Droid', 'died': 'Alive', 'occupation': 'Protocol Droid', 'appearedIn': ['The Phantom Menace']}, {'name': 'Chopper', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Lothal', 'species': 'Droid', 'died': 'Alive', 'occupation': 'Astromech Droid', 'appearedIn': ['Rebels']}, {'name': 'Commander Cody', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Kamino', 'species': 'Human (Clone)', 'died': 'Alive', 'occupation': 'Military leader', 'appearedIn': ['Revenge of the Sith']}, {'name': 'Death Trooper', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Unknown', 'species': 'Human', 'died': 'Alive', 'occupation': 'Elite Soldier', 'appearedIn': ['Rogue One']}, {'name': 'Dengar', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Corellia', 'species': 'Human', 'died': 'Alive', 'occupation': 'Bounty Hunter', 'appearedIn': ['The Empire Strikes Back']}, {'name': 'Fennec Shand', 'affiliation': 'Neutral', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Unknown', 'species': 'Human', 'died': 'Alive', 'occupation': 'Bounty Hunter', 'appearedIn': ['The Bad Batch']}, {'name': 'General Grievous', 'affiliation': 'Separatist', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Kalee', 'species': 'Kaleesh', 'died': '19 BBY', 'occupation': 'Military leader', 'appearedIn': ['Revenge of the Sith']}, {'name': 'General Maximilian Veers', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Unknown', 'species': 'Human', 'died': '4 ABY', 'occupation': 'Military Officer', 'appearedIn': ['The Empire Strikes Back']}, {'name': 'Darth Vader', 'affiliation': 'Galactic Empire', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Tatooine', 'species': 'Human', 'died': '4 ABY', 'occupation': 'Sith', 'appearedIn': ['A New Hope']}, {'name': 'Padmé Amidala', 'affiliation': 'Galactic Republic', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Naboo', 'species': 'Human', 'died': '19 BBY', 'occupation': 'Senator', 'appearedIn': ['The Phantom Menace']}, {'name': 'Grand Moff Tarkin', 'affiliation': 'Galactic Empire', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Eriadu', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Military', 'appearedIn': ['Revenge of the Sith']}, {'name': 'Qui-Gon Jinn', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Coruscant', 'species': 'Human', 'died': '32 BBY', 'occupation': 'Jedi', 'appearedIn': ['The Phantom Menace']}, {'name': 'Grand Admiral Thrawn', 'affiliation': 'Galactic Empire', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Csilla', 'species': 'Chiss', 'died': 'Alive', 'occupation': 'Military', 'appearedIn': ['Ahsoka']}, {'name': 'Asajj Ventress', 'affiliation': 'Separatist', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Dathomir', 'species': 'Dathomirian', 'died': '19 BBY', 'occupation': 'Sith', 'appearedIn': ['The Clone Wars']}, {'name': 'Kit Fisto', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Glee Anselm', 'species': 'Nautolan', 'died': '19 BBY', 'occupation': 'Jedi', 'appearedIn': ['Attack of the Clones']}, {'name': 'Ahsoka Tano', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Shili', 'species': 'Togruta', 'died': 'Alive', 'occupation': 'Jedi', 'appearedIn': ['The Clone Wars']}, {'name': 'Shaak Ti', 'affiliation': 'Galactic Republic', 'weapon': 'Lightsaber', 'forceSensitive': 'Yes', 'planet': 'Shili', 'species': 'Togruta', 'died': '19 BBY', 'occupation': 'Jedi', 'appearedIn': ['Attack of the Clones']}, {'name': 'Hera Syndulla', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Ryloth', 'species': "Twi'lek", 'died': 'Alive', 'occupation': 'Military', 'appearedIn': ['Rebels']}, {'name': 'Bail Organa', 'affiliation': 'Galactic Republic', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Alderaan', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Senator', 'appearedIn': ['Revenge of the Sith']}, {'name': 'Cad Bane', 'affiliation': 'Separatist', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Duro', 'species': 'Duros', 'died': '9 ABY', 'occupation': 'Bounty Hunter', 'appearedIn': ['The Clone Wars']}, {'name': 'Aurra Sing', 'affiliation': 'Separatist', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Nar Shaddaa', 'species': 'Palliduvan', 'died': '13 BBY', 'occupation': 'Bounty Hunter', 'appearedIn': ['The Clone Wars']}, {'name': 'Mon Mothma', 'affiliation': 'Rebel Alliance', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Chandrila', 'species': 'Human', 'died': 'Alive', 'occupation': 'Politician', 'appearedIn': ['Return of the Jedi']}, {'name': 'Wedge Antilles', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Corellia', 'species': 'Human', 'died': 'Alive', 'occupation': 'Pilot', 'appearedIn': ['A New Hope']}, {'name': 'Biggs Darklighter', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Tatooine', 'species': 'Human', 'died': '0 BBY', 'occupation': 'Pilot', 'appearedIn': ['A New Hope']}, {'name': 'General Hux', 'affiliation': 'First Order', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Arkanis', 'species': 'Human', 'died': '35 ABY', 'occupation': 'Military Leader', 'appearedIn': ['The Force Awakens']}, {'name': 'Supreme Leader Snoke', 'affiliation': 'First Order', 'weapon': 'Force', 'forceSensitive': 'Yes', 'planet': 'Unknown', 'species': 'Unknown', 'died': '34 ABY', 'occupation': 'Leader', 'appearedIn': ['The Force Awakens']}, {'name': 'Captain Phasma', 'affiliation': 'First Order', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Parnassos', 'species': 'Human', 'died': '34 ABY', 'occupation': 'Military Leader', 'appearedIn': ['The Force Awakens']}, {'name': 'Hondo Ohnaka', 'affiliation': 'Independent', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Sriluur', 'species': 'Weequay', 'died': 'Alive', 'occupation': 'Pirate', 'appearedIn': ['The Clone Wars']}, {'name': 'Maz Kanata', 'affiliation': 'Independent', 'weapon': 'Blaster', 'forceSensitive': 'Yes', 'planet': 'Takodana', 'species': 'Unknown', 'died': 'Alive', 'occupation': 'Pirate', 'appearedIn': ['The Force Awakens']}, {'name': 'Enfys Nest', 'affiliation': 'Cloud-Riders', 'weapon': 'Electroripper Staff', 'forceSensitive': 'No', 'planet': 'Unknown', 'species': 'Human', 'died': 'Alive', 'occupation': 'Leader', 'appearedIn': ['Solo']}, {'name': 'Tobias Beckett', 'affiliation': 'Criminal', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Glee Anselm', 'species': 'Human', 'died': '10 BBY', 'occupation': 'Criminal', 'appearedIn': ['Solo']}, {'name': 'Dryden Vos', 'affiliation': 'Crimson Dawn', 'weapon': 'Bladed Tonfas', 'forceSensitive': 'No', 'planet': 'Dathomir', 'species': 'Near-Human', 'died': '10 BBY', 'occupation': 'Crime Lord', 'appearedIn': ['Solo']}, {'name': 'L3-37', 'affiliation': 'Independent', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Unknown', 'species': 'Droid', 'died': '10 BBY', 'occupation': 'Pilot', 'appearedIn': ['Solo']}, {'name': "Qi'ra", 'affiliation': 'Crimson Dawn', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Corellia', 'species': 'Human', 'died': 'Alive', 'occupation': 'Criminal', 'appearedIn': ['Solo']}, {'name': 'Jannah', 'affiliation': 'Rebel Alliance', 'weapon': 'Energy Bow', 'forceSensitive': 'No', 'planet': 'Kef Bir', 'species': 'Human', 'died': 'Alive', 'occupation': 'Freedom Fighter', 'appearedIn': ['The Rise of Skywalker']}, {'name': 'Val', 'affiliation': 'Criminal', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Unknown', 'species': 'Human', 'died': '10 BBY', 'occupation': 'Criminal', 'appearedIn': ['Solo']}, {'name': 'Lando Calrissian', 'affiliation': 'Rebel Alliance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Socorro', 'species': 'Human', 'died': 'Alive', 'occupation': 'Entrepreneur', 'appearedIn': ['The Empire Strikes Back']}, {'name': 'Beckett', 'affiliation': 'Criminal', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Glee Anselm', 'species': 'Human', 'died': '10 BBY', 'occupation': 'Criminal', 'appearedIn': ['Solo']}, {'name': 'Enfys Nest', 'affiliation': 'Cloud-Riders', 'weapon': 'Electroripper Staff', 'forceSensitive': 'No', 'planet': 'Unknown', 'species': 'Human', 'died': 'Alive', 'occupation': 'Leader', 'appearedIn': ['Solo']}, {'name': 'D-O', 'affiliation': 'Resistance', 'weapon': 'None', 'forceSensitive': 'No', 'planet': 'Unknown', 'species': 'Droid', 'died': 'Alive', 'occupation': 'Droid', 'appearedIn': ['The Rise of Skywalker']}, {'name': 'Zorii Bliss', 'affiliation': 'Spice Runners of Kijimi', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Kijimi', 'species': 'Human', 'died': 'Alive', 'occupation': 'Smuggler', 'appearedIn': ['The Rise of Skywalker']}, {'name': 'Rose Tico', 'affiliation': 'Resistance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Hays Minor', 'species': 'Human', 'died': 'Alive', 'occupation': 'Mechanic', 'appearedIn': ['The Last Jedi']}, {'name': 'Amilyn Holdo', 'affiliation': 'Resistance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Gatalenta', 'species': 'Human', 'died': '34 ABY', 'occupation': 'Military Leader', 'appearedIn': ['The Last Jedi']}, {'name': 'Snap Wexley', 'affiliation': 'Resistance', 'weapon': 'Blaster', 'forceSensitive': 'No', 'planet': 'Akiva', 'species': 'Human', 'died': '35 ABY', 'occupation': 'Pilot', 'appearedIn': ['The Force Awakens']}];

     // Helper function: sanitize string (lowercase & remove symbols)
    function sanitize(str) {
        return str.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    }

    // Helper function: compute Levenshtein distance between two strings
    function levenshtein(a, b) {
        const m = a.length, n = b.length;
        const dp = [];
        for (let i = 0; i <= m; i++) {
            dp[i] = [];
            dp[i][0] = i;
        }
        for (let j = 0; j <= n; j++) {
            dp[0][j] = j;
        }
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (a[i - 1] === b[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j] + 1,    // deletion
                        dp[i][j - 1] + 1,    // insertion
                        dp[i - 1][j - 1] + 1 // substitution
                    );
                }
            }
        }
        return dp[m][n];
    }

    function setupInitialModalBehavior() {
        const initialModal = document.getElementById("myModal");

        // Show the welcome modal initially
        initialModal.style.display = "block";

        // Close button behavior
        document.querySelector('.close').addEventListener('click', () => {
            initialModal.style.display = "none";
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', (event) => {
            if (event.target === initialModal) {
                initialModal.style.display = "none";
            }
        });

        // Help Modal Event Listeners
        const helpButton = document.getElementById('helpButton');
        const helpModal = document.getElementById('helpModal');
        const closeHelp = document.querySelector('.closeHelp');
        
        helpButton.addEventListener('click', () => {
            helpModal.style.display = 'block';
        });
        closeHelp.addEventListener('click', () => {
            helpModal.style.display = 'none';
        });
        window.addEventListener('click', (event) => {
            if (event.target === helpModal) helpModal.style.display = 'none';
        });

    }
    

    function initializeGame() {
        score = 0;
        setupEventListeners();
        selectNewCharacter();
    }

    function setupEventListeners() {
        document.querySelector('.closeNames').addEventListener('click', function() {
            document.getElementById('namesModal').style.display = 'none';
        });
        const giveUpButton = document.querySelector('button[name="giveUpButton"]');
        const guessButton = document.querySelector('button[name="guessButton"]');
        const namesButton = document.querySelector('button[name="namesButton"]');
        const playAgainButton = document.getElementById('playAgainButton');

        guessButton.addEventListener('click', handleGuess);
        giveUpButton.addEventListener('click', handleGiveUp);
        namesButton.addEventListener('click', handleNames);
        playAgainButton.addEventListener('click', handlePlayAgain);
        
    }

    function selectNewCharacter() {
        currentCharacter = characters[Math.floor(Math.random() * characters.length)];
        clearClues();
        document.getElementById('guessBox').value = '';
    }

    function handleGuess() {
        const guessBox = document.getElementById('guessBox');
        const userGuess = guessBox.value.trim();
        const sanitizedUserGuess = sanitize(userGuess);

        // Check if the guess is correct (allowing up to 2 character differences)
        if (levenshtein(sanitize(currentCharacter.name), sanitizedUserGuess) <= 2) {
            markGuessedCharacter(currentCharacter);
            updateCluesBasedOnGuess(currentCharacter, currentCharacter);
            showResultModal(`Correct! It was ${currentCharacter.name}.`);
        } else {
            // Attempt to find a matching character from the list
            const guessedCharacter = characters.find(char => {
                return levenshtein(sanitize(char.name), sanitizedUserGuess) <= 2;
            });
            if (guessedCharacter) {
                markGuessedCharacter(guessedCharacter);
                updateCluesBasedOnGuess(guessedCharacter, currentCharacter);
                animateIncorrectGuess();
            } else {
                alert('Character not found, try again!');
            }
        }
        score++;
        guessBox.value = ''; // Clear the guessBox after each guess
    }


    function markGuessedCharacter(guessedCharacter) {
        const sanitized = guessedCharacter.name.replace(/\s+/g, '-').toLowerCase();
        const nameElement = document.getElementById(`name-${sanitized}`);
        if (nameElement) nameElement.classList.add('guessed');
    }

    function handleGiveUp() {
        showResultModal(`You gave up. The correct answer was ${currentCharacter.name}.`);
    }

    function handlePlayAgain() {
        document.getElementById('resultModal').style.display = 'none'; // Hide the result modal
        score = 0; // Reset score
        selectNewCharacter();
    }

    function handleNames() {
        const namesListElement = document.getElementById('namesList');
        namesListElement.innerHTML = characters.map(character => {
            const sanitized = character.name.replace(/\s+/g, '-').toLowerCase();
            return `<p id="name-${sanitized}">${character.name}</p>`;
        }).join('');
        document.getElementById('namesModal').style.display = 'block';
    }

    function showResultModal(message) {
        const resultModal = document.getElementById('resultModal');
        document.getElementById('resultMessage').textContent = message;
        document.getElementById('finalScore').textContent = score;
        resultModal.style.display = 'block';

        // Setup behavior for closing the result modal
        document.querySelector('.closeResult').addEventListener('click', () => resultModal.style.display = "none");
        window.addEventListener('click', (event) => {
            if (event.target === resultModal) resultModal.style.display = "none";
        });
    }

    function animateIncorrectGuess() {
        const guessBox = document.getElementById('guessBox');
        guessBox.classList.add('incorrect-guess-animation');
        setTimeout(() => {
            guessBox.classList.remove('incorrect-guess-animation');
        }, 1000); // Reset animation after 1 second
    }

    function updateCluesBasedOnGuess(guessedCharacter, currentCharacter) {
        if (guessedCharacter.affiliation && guessedCharacter.affiliation === currentCharacter.affiliation) {
            document.getElementById('affiliationValue').textContent = currentCharacter.affiliation;
        }
        if (guessedCharacter.weapon && guessedCharacter.weapon === currentCharacter.weapon) {
            document.getElementById('weaponValue').textContent = currentCharacter.weapon;
        }
        if (guessedCharacter.forceSensitive && guessedCharacter.forceSensitive === currentCharacter.forceSensitive) {
            document.getElementById('forceValue').textContent = currentCharacter.forceSensitive;
        }
        if (guessedCharacter.planet && guessedCharacter.planet === currentCharacter.planet) {
            document.getElementById('planetValue').textContent = currentCharacter.planet;
        }
        if (guessedCharacter.species && guessedCharacter.species === currentCharacter.species) {
            document.getElementById('speciesValue').textContent = currentCharacter.species;
        }
        if (guessedCharacter.died && guessedCharacter.died === currentCharacter.died) {
            document.getElementById('diedValue').textContent = currentCharacter.died;
        }
        if (guessedCharacter.occupation && guessedCharacter.occupation === currentCharacter.occupation) {
            document.getElementById('occupationValue').textContent = currentCharacter.occupation;
        }
        if (guessedCharacter.appearedIn && currentCharacter.appearedIn) {
            const commonAppearances = guessedCharacter.appearedIn.filter(movie => currentCharacter.appearedIn.includes(movie));
            if (commonAppearances.length > 0) {
                document.getElementById('appearedInValue').textContent = commonAppearances.join(', ');
            }
        }
    }

    function clearClues() {
        document.getElementById('affiliationValue').textContent = '-';
        document.getElementById('weaponValue').textContent = '-';
        document.getElementById('forceValue').textContent = '-';
        document.getElementById('planetValue').textContent = '-';
        document.getElementById('speciesValue').textContent = '-';
        document.getElementById('diedValue').textContent = '-';
        document.getElementById('occupationValue').textContent = '-';
        document.getElementById('appearedInValue').textContent = '-';
    }

    document.getElementById('donateButton').addEventListener('click', function() {
        window.open('https://buymeacoffee.com/christopheosp', '_blank');
    });
    

    setupInitialModalBehavior();
    initializeGame();  // Directly initialize the game
});

