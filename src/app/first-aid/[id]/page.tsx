import FirstAidGuideClient, { FirstAidGuide } from './FirstAidGuideClient';

// -----------------
// Data
// -----------------
const firstAidGuides: Record<string, FirstAidGuide> = {
  bleeding: {
    id: 'bleeding',
    title: 'Severe Bleeding',
    description: 'How to control severe bleeding and prevent blood loss.',
    icon: '🩸',
    steps: [
      'Apply direct pressure to the wound with a clean cloth or bandage',
      'Maintain pressure until bleeding stops',
      'If blood soaks through, do not remove the cloth - add more layers on top',
      'If possible, elevate the injured area above heart level',
      'Apply a pressure bandage to hold the dressing in place',
    ],
    do: [
      'Wear gloves if available',
      'Wash your hands before and after providing care',
      'Use a clean barrier between your hand and the wound',
      'Keep the injured person calm and still',
    ],
    dont: [
      'Do not remove any embedded objects',
      'Do not use a tourniquet unless bleeding cannot be controlled',
      'Do not apply pressure to eye injuries or embedded objects',
    ],
    whenToSeekHelp: [
      'If bleeding cannot be controlled after 10 minutes of direct pressure',
      'If the wound is deep, large, or caused by a serious injury',
      'If there is an object embedded in the wound',
      'If signs of shock develop (pale, cold, sweaty skin, rapid breathing)',
    ],
  },
  cpr: {
    id: 'cpr',
    title: 'CPR (Cardiopulmonary Resuscitation)',
    description:
      'Life-saving technique used in emergencies when someone is not breathing or their heart has stopped.',
    icon: '🫀',
    steps: [
      'Check for responsiveness',
      'Call emergency services',
      'Place hands on chest center',
      'Perform 30 chest compressions',
      'Give 2 rescue breaths',
      'Continue until help arrives',
    ],
    do: ['Use an AED if available', 'Continue until medical help arrives'],
    dont: [
      "Don't stop unless person starts breathing",
      "Don't delay calling for help",
    ],
    whenToSeekHelp: [
      'Immediately call emergency services',
      "If you're alone, perform CPR for 2 minutes first",
    ],
  },
  choking: {
    id: 'choking',
    title: 'Choking',
    description: 'First aid for someone who cannot breathe, cough, or speak.',
    icon: '🤢',
    steps: [
      'Ask "Are you choking?"',
      'Deliver 5 back blows',
      'Perform abdominal thrusts',
      'Continue until object is dislodged',
    ],
    do: ['Call emergency services if needed', 'Be prepared to perform CPR'],
    dont: ["Don't give anything to drink", "Don't slap if they can cough"],
    whenToSeekHelp: [
      'If person is unconscious',
      'If object is not dislodged',
    ],
  },
  'allergic-reaction': {
    id: 'allergic-reaction',
    title: 'Allergic Reactions',
    description: 'Recognizing and treating severe allergic reactions (anaphylaxis).',
    icon: '⚠️',
    steps: [
      'Look for signs of severe allergic reaction',
      'Administer epinephrine auto-injector if available',
      'Call emergency services',
      'Help person into comfortable position',
      'Monitor breathing',
    ],
    do: [
      'Use EpiPen if prescribed',
      'Stay with the person',
      'Loosen tight clothing',
      'Cover with blanket if shock is suspected',
    ],
    dont: [
      "Don't wait to see if symptoms improve",
      "Don't give oral medications if having trouble breathing",
      "Don't let the person stand or walk",
    ],
    whenToSeekHelp: [
      'Immediately if signs of anaphylaxis',
      'Even if symptoms improve after epinephrine',
      'If person has history of severe reactions',
    ],
  },
  fractures: {
    id: 'fractures',
    title: 'Fractures & Sprains',
    description: 'How to immobilize injuries and when to seek medical attention.',
    icon: '🦴',
    steps: [
      'Keep the injured area still and support it with padding',
      'Apply ice wrapped in cloth to reduce swelling',
      'Elevate the injured limb if possible',
      'Use a splint to immobilize the area',
      'Seek medical attention for proper treatment',
    ],
    do: [
      'Keep the injured area still',
      'Apply ice for 15-20 minutes every 2-3 hours',
      'Use compression with an elastic bandage',
      'Elevate the injured area',
    ],
    dont: [
      'Try to realign the bone',
      'Move the injured area unnecessarily',
      'Apply heat in the first 48 hours',
      'Massage the injured area',
    ],
    whenToSeekHelp: [
      'If bone is visible through skin',
      'If limb appears deformed',
      'If numbness or discoloration occurs',
      'If pain is severe',
    ],
  },
  'heat-stroke': {
    id: 'heat-stroke',
    title: 'Heat Stroke',
    description: 'Emergency response for heat-related illnesses and heat stroke.',
    icon: '🌡️',
    steps: [
      'Move the person to a cooler place immediately',
      'Remove excess clothing',
      'Cool the person with whatever means available (wet cloth, fan, cool bath)',
      'Apply ice packs to armpits, neck, and groin',
      'Monitor body temperature and continue cooling efforts',
      'Seek emergency medical help immediately',
    ],
    do: [
      'Act quickly to cool the person down',
      'Give cool water if the person is conscious',
      'Loosen tight clothing',
      'Stay with the person until help arrives',
    ],
    dont: [
      "Don't give the person anything to drink if they are unconscious",
      "Don't give alcohol or caffeinated beverages",
      "Don't leave the person alone",
      "Don't apply ice directly to the skin",
    ],
    whenToSeekHelp: [
      'If body temperature is above 40°C (104°F)',
      'If the person is unconscious',
      "If symptoms don't improve with cooling measures",
      'If the person has a seizure',
    ],
  },
};

function getGuideById(id: string): FirstAidGuide | undefined {
  return firstAidGuides[id];
}

// -----------------
// Server Page Component (async)
// -----------------
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const guide = getGuideById(id);
  return <FirstAidGuideClient guide={guide} />;
}

