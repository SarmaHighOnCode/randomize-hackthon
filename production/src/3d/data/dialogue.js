export const DIALOGUE = {
  receptionist: {
    npcName: 'GREETING UNIT',
    lines: [
      { text: 'Name?', delay: 500 },
      { text: '...processing...', delay: 800 },
      { text: 'Ah yes. The new candidate.', delay: 0 },
      { text: 'Take the East Elevators to your right.', delay: 0 },
      { text: "Don't fall into the void.", delay: 1000 },
      { text: "It reflects poorly on your KPI.", delay: 0 },
    ],
  },
  interviewer: {
    npcName: 'INTERVIEWER',
    lines: [
      { text: '*shuffles papers*', delay: 800 },
      { text: '*glances at laptop screen*', delay: 600 },
      { text: 'So...', delay: 500 },
      { text: '...tell me about yourself.', delay: 0 },
    ],
  },
  interviewResult: {
    npcName: 'INTERVIEWER',
    lines: [
      { text: '*scribbles notes furiously*', delay: 800 },
      { text: 'Interesting. Very interesting.', delay: 600 },
      { text: '*whispers something to colleague*', delay: 700 },
      { text: 'Well...', delay: 500 },
      { text: "You start Monday.", delay: 0 },
    ],
  },
  interviewResultA: {
    npcName: 'INTERVIEWER',
    lines: [
      { text: '*scribbles enthusiastically*', delay: 300 },
      { text: 'Perfect.', delay: 0 },
      { text: 'Exactly what we look for.', delay: 800 },
      { text: 'We hear that answer a lot, actually.', delay: 600 },
      { text: 'A lot.', delay: 0 },
      { text: 'You start Monday.', delay: 0 },
    ],
  },
  interviewResultB: {
    npcName: 'INTERVIEWER',
    lines: [
      { text: '...', delay: 2200 },
      { text: 'Right.', delay: 1000 },
      { text: '*makes a note*', delay: 0 },
      { text: 'You start Monday.', delay: 0 },
    ],
  },
  interviewResultC: {
    npcName: 'INTERVIEWER',
    lines: [
      { text: '*stares*', delay: 3500 },
      { text: '*writes something*', delay: 600 },
      { text: 'You start Monday.', delay: 0 },
    ],
  },
  phoneRing: {
    npcName: '',
    lines: [
      { text: 'A phone rings somewhere in the office.', delay: 0 },
    ],
  },
  interviewer2: {
    npcName: 'INTERVIEWER 2',
    lines: [
      { text: '*leans forward*', delay: 500 },
      { text: "Welcome to Nexus Corp.", delay: 0 },
      { text: "You'll love it here.", delay: 600 },
      { text: "Everyone does.", delay: 800 },
      { text: "*smiles in a way that doesn't reach their eyes*", delay: 0 },
    ],
  },
  coworkerPrinter: {
    npcName: 'COWORKER',
    lines: [
      { text: 'Oh. New intern?', delay: 400 },
      { text: 'Good luck.', delay: 600 },
      { text: 'The last one cried on day two.', delay: 0 },
      { text: 'Day one was orientation.', delay: 0 },
    ],
  },
  coworkerDesk: {
    npcName: 'COWORKER',
    lines: [
      { text: "Don't touch my stapler.", delay: 0 },
    ],
  },
  narratorScene5: {
    npcName: '',
    lines: [
      { text: 'And so you sat down.', delay: 1200 },
      { text: 'Ready to make a difference.', delay: 1000 },
      { text: 'Ready to change the world.', delay: 1000 },
      { text: 'Ready to... read your first Jira ticket.', delay: 2000 },
    ],
  },

  // --- STREET SCENE INTERACTIONS ---
  trashResumes: {
    npcName: 'OBSERVATION',
    lines: [
      { text: 'A trash can overflowing with resumes.', delay: 400 },
      { text: 'Most of them still warm from the printer.', delay: 0 },
      { text: '"Top 1% on LinkedIn" — crossed out in red.', delay: 0 },
    ],
  },
  hiringPoster: {
    npcName: 'POSTER',
    lines: [
      { text: '"NOW HIRING: INTERNS"', delay: 300 },
      { text: '"No Experience Needed"', delay: 0 },
      { text: 'In smaller print: "But You Will Get Plenty."', delay: 600 },
      { text: 'Someone scratched "RUN" into the bottom.', delay: 0 },
    ],
  },
  newspaperBox: {
    npcName: 'HEADLINE',
    lines: [
      { text: '"NEXUS CORP WINS BEST WORKPLACE AWARD"', delay: 400 },
      { text: '"...for the 12th consecutive year."', delay: 0 },
      { text: '"Employees too afraid to vote otherwise."', delay: 800 },
    ],
  },
  busStop: {
    npcName: 'OBSERVATION',
    lines: [
      { text: 'A bus stop bench.', delay: 300 },
      { text: 'Someone carved "TURN BACK" into the wood.', delay: 600 },
      { text: 'The bus schedule says "Next bus: After your shift."', delay: 0 },
    ],
  },

  // --- LOBBY SCENE INTERACTIONS ---
  waterCooler: {
    npcName: 'WATER COOLER',
    lines: [
      { text: '"OUT OF WATER"', delay: 300 },
      { text: 'It has been out of water since 2019.', delay: 600 },
      { text: 'Nobody has filed a ticket about it.', delay: 0 },
      { text: 'Filing tickets is someone else\'s job.', delay: 0 },
    ],
  },
  lobbyTV: {
    npcName: 'CORPORATE TV',
    lines: [
      { text: 'The screen cycles through core values:', delay: 300 },
      { text: '"INNOVATION. INTEGRITY. IMPACT."', delay: 400 },
      { text: 'It has been playing this loop for 4 years.', delay: 0 },
      { text: 'No one has ever looked up.', delay: 0 },
    ],
  },
  lobbyCouch: {
    npcName: 'OBSERVATION',
    lines: [
      { text: 'Premium designer couches.', delay: 300 },
      { text: 'Cost more than your annual salary.', delay: 0 },
      { text: 'Sitting is not permitted during work hours.', delay: 600 },
    ],
  },

  // --- OFFICE SCENE INTERACTIONS ---
  sprintBoard: {
    npcName: 'SPRINT BOARD',
    lines: [
      { text: 'The sprint board tells a story:', delay: 300 },
      { text: 'TODO: 47 tickets.', delay: 200 },
      { text: 'IN PROGRESS: 12 tickets.', delay: 200 },
      { text: 'BLOCKED: 31 tickets.', delay: 200 },
      { text: 'DONE: ...empty.', delay: 600 },
      { text: 'Sprint ends tomorrow.', delay: 0 },
    ],
  },
  incidentSign: {
    npcName: 'SIGN',
    lines: [
      { text: '"Days Without Incident: 0"', delay: 300 },
      { text: 'The highest it ever reached was 1.', delay: 600 },
      { text: 'That day, the sign itself fell off the wall.', delay: 0 },
    ],
  },
  salarySign: {
    npcName: 'SIGN',
    lines: [
      { text: '"Please Do Not Discuss Salary. Or Feelings."', delay: 400 },
      { text: 'Printed on the most expensive paper in the building.', delay: 0 },
      { text: 'Framed in mahogany.', delay: 0 },
    ],
  },
  coffeeCups: {
    npcName: 'OBSERVATION',
    lines: [
      { text: '14 coffee cups on one desk.', delay: 300 },
      { text: 'Each one from a different day.', delay: 0 },
      { text: 'The owner was last seen "stepping out for a minute."', delay: 600 },
      { text: 'That was three weeks ago.', delay: 0 },
    ],
  },
};

export const INTERVIEW_CHOICES = [
  "A) \"I'm passionate about synergy and disrupting paradigms\"",
  'B) "I just need the experience honestly"',
  'C) "..."',
];
