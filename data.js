// C Major scale data — pitches are MIDI note numbers (60 = middle C).
// Each "slot" = one 4-beat (1 measure) unit.
// cross: { type: "over" | "under", audio, handIndex } fires at the slot's midpoint
//   (+2 beats). handIndex selects which entry of pitches[] is crossing (0 = RH/only
//   hand, 1 = LH in the together section) — the cue marks the transition from this
//   slot's pitches[handIndex] to the next slot's pitches[handIndex].
// finger: 1-5, the finger playing pitches[0] (rh/lh sections).
// fingers: [rhFinger, lhFinger] for the together section (pitches[0]=RH, pitches[1]=LH).

const V = "voices/";

// Scale types offered in the "Type" dropdown, in mode order starting from
// Major (Ionian) — Minor here means the natural minor (Aeolian). Only some
// Note + Type combinations exist in SCALES below; the rest show as
// "not built yet" in the UI.
const SCALE_TYPES = ["Major", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Minor", "Harmonic Minor", "Melodic Minor", "Locrian"];

// Spoken finger-number clips ("One".."Five"), played independently of the
// finger+note clips (f1_C.wav etc.) so finger numbers can be heard with
// Note Names off.
const FINGER_AUDIO = {
  1: V + "finger_1.wav",
  2: V + "finger_2.wav",
  3: V + "finger_3.wav",
  4: V + "finger_4.wav",
  5: V + "finger_5.wav",
};

const CROSS_UNDER = { type: "under", audio: V + "cross_under.wav", handIndex: 0 };
const CROSS_OVER = { type: "over", audio: V + "cross_over.wav", handIndex: 0 };
// "Together" section crossings name the hand that's crossing, since both are playing.
const CROSS_UNDER_RIGHT = { type: "under", audio: V + "cross_under_right.wav", handIndex: 0 };
const CROSS_OVER_RIGHT = { type: "over", audio: V + "cross_over_right.wav", handIndex: 0 };
const CROSS_UNDER_LEFT = { type: "under", audio: V + "cross_under_left.wav", handIndex: 1 };
const CROSS_OVER_LEFT = { type: "over", audio: V + "cross_over_left.wav", handIndex: 1 };

const C_MAJOR = {
  name: "C Major",
  nameAudio: V + "01_C_Major.wav",
  info: {
    typeLabel: "Major scale",
    description: "The easiest scale to start with — just the white keys, no sharps or flats.",
    advanced: "Its interval pattern (Whole, Whole, Half, Whole, Whole, Whole, Half) is the " +
      "blueprint for every major scale — shift it to start on a different note, adjust the " +
      "sharps/flats to keep that same spacing, and you get a new major scale.",
    keyInfo: {
      signature: "No sharps or flats",
      relative: "A minor",
      parallel: "C minor",
      genres: ["Classical", "Pop", "Gospel", "Folk"],
    },
    degrees: {
      solfege:     ["Do",  "Re",    "Mi",     "Fa",          "Sol",      "La",         "Ti"],
      names:       ["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading Tone"],
      functions:   ["Home","Passing","Color",  "Pre-dom",     "Tension",  "Color",      "Pull to 1"],
    },
    modeRotation: 0,
    pentatonic: {
      indices: [0, 1, 2, 4, 5],
      dropped: "the 4th (F) and 7th (B) — the most tension-heavy notes",
    },
    progressions: [
      { roman: "I – IV – V",      chords: ["C", "F", "G"],          genre: "Rock / Blues" },
      { roman: "I – V – vi – IV", chords: ["C", "G", "Am", "F"],    genre: "Pop" },
      { roman: "I – vi – IV – V", chords: ["C", "Am", "F", "G"],    genre: "Soul / Doo-wop" },
      { roman: "ii – V – I",      chords: ["Dm", "G", "C"],         genre: "Jazz" },
    ],
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [64], finger: 3, voiceAudio: V + "f3_E.wav", cross: CROSS_UNDER },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [69], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [71], finger: 4, voiceAudio: V + "f4_B.wav", cross: null },
        { pitches: [72], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
        { pitches: [72], finger: 5, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [71], finger: 4, voiceAudio: V + "f4_B.wav", cross: null },
        { pitches: [69], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: CROSS_OVER },
        { pitches: [64], finger: 3, voiceAudio: V + "f3_E.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [48], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
        { pitches: [50], finger: 4, voiceAudio: V + "f4_D.wav", cross: null },
        { pitches: [52], finger: 3, voiceAudio: V + "f3_E.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: CROSS_OVER },
        { pitches: [57], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [59], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [59], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [57], finger: 3, voiceAudio: V + "f3_A.wav", cross: CROSS_UNDER },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [52], finger: 3, voiceAudio: V + "f3_E.wav", cross: null },
        { pitches: [50], finger: 4, voiceAudio: V + "f4_D.wav", cross: null },
        { pitches: [48], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [60, 48], fingers: [1, 5], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [62, 50], fingers: [2, 4], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [64, 52], fingers: [3, 3], voiceAudio: V + "note_E.wav", cross: CROSS_UNDER_RIGHT },
        { pitches: [65, 53], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: CROSS_OVER_LEFT },
        { pitches: [69, 57], fingers: [3, 3], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [71, 59], fingers: [4, 2], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [72, 60], fingers: [5, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [72, 60], fingers: [5, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [71, 59], fingers: [4, 2], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [69, 57], fingers: [3, 3], voiceAudio: V + "note_A.wav", cross: CROSS_UNDER_LEFT },
        { pitches: [67, 55], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [65, 53], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: CROSS_OVER_RIGHT },
        { pitches: [64, 52], fingers: [3, 3], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [62, 50], fingers: [2, 4], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [60, 48], fingers: [1, 5], voiceAudio: V + "note_C.wav", cross: null },
      ],
    },
  ],
};

const D_MAJOR = {
  name: "D Major",
  nameAudio: V + "02_D_Major.wav",
  info: {
    typeLabel: "Major scale",
    description: "Two sharps — F# and C# — give D major a brighter, slightly higher feel than C major.",
    advanced: "Same Whole, Whole, Half, Whole, Whole, Whole, Half interval pattern as C major, just " +
      "shifted up one whole step (2 semitones). Every finger pattern and crossing point lines up " +
      "exactly the same way as C major, just two keys higher.",
    keyInfo: {
      signature: "2 sharps — F♯ and C♯",
      relative: "B minor",
      parallel: "D minor",
      genres: ["Country", "Bluegrass", "Rock", "Pop"],
    },
    degrees: {
      solfege:     ["Do",  "Re",    "Mi",     "Fa",          "Sol",      "La",         "Ti"],
      names:       ["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading Tone"],
      functions:   ["Home","Passing","Color",  "Pre-dom",     "Tension",  "Color",      "Pull to 1"],
    },
    modeRotation: 0,
    pentatonic: {
      indices: [0, 1, 2, 4, 5],
      dropped: "the 4th (G) and 7th (C♯) — the most tension-heavy notes",
    },
    progressions: [
      { roman: "I – IV – V",      chords: ["D", "G", "A"],          genre: "Rock / Blues" },
      { roman: "I – V – vi – IV", chords: ["D", "A", "Bm", "G"],    genre: "Pop" },
      { roman: "I – vi – IV – V", chords: ["D", "Bm", "G", "A"],    genre: "Soul / Doo-wop" },
      { roman: "ii – V – I",      chords: ["Em", "A", "D"],         genre: "Jazz" },
    ],
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [64], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: CROSS_UNDER },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [71], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
        { pitches: [73], finger: 4, voiceAudio: V + "f4_Cs.wav", cross: null },
        { pitches: [74], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
        { pitches: [74], finger: 5, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [73], finger: 4, voiceAudio: V + "f4_Cs.wav", cross: null },
        { pitches: [71], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: CROSS_OVER },
        { pitches: [66], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [64], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [50], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
        { pitches: [52], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: CROSS_OVER },
        { pitches: [59], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [59], finger: 3, voiceAudio: V + "f3_B.wav", cross: CROSS_UNDER },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [54], finger: 3, voiceAudio: V + "f3_Fs.wav", cross: null },
        { pitches: [52], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
        { pitches: [50], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [62, 50], fingers: [1, 5], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [64, 52], fingers: [2, 4], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [66, 54], fingers: [3, 3], voiceAudio: V + "note_Fs.wav", cross: CROSS_UNDER_RIGHT },
        { pitches: [67, 55], fingers: [1, 2], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [69, 57], fingers: [2, 1], voiceAudio: V + "note_A.wav", cross: CROSS_OVER_LEFT },
        { pitches: [71, 59], fingers: [3, 3], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [73, 61], fingers: [4, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [74, 62], fingers: [5, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [74, 62], fingers: [5, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [73, 61], fingers: [4, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [71, 59], fingers: [3, 3], voiceAudio: V + "note_B.wav", cross: CROSS_UNDER_LEFT },
        { pitches: [69, 57], fingers: [2, 1], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [67, 55], fingers: [1, 2], voiceAudio: V + "note_G.wav", cross: CROSS_OVER_RIGHT },
        { pitches: [66, 54], fingers: [3, 3], voiceAudio: V + "note_Fs.wav", cross: null },
        { pitches: [64, 52], fingers: [2, 4], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [62, 50], fingers: [1, 5], voiceAudio: V + "note_D.wav", cross: null },
      ],
    },
  ],
};

const C_NATURAL_MINOR = {
  name: "C Natural Minor",
  nameAudio: V + "03_C_Natural_Minor.wav",
  info: {
    typeLabel: "Natural Minor scale (Aeolian)",
    description: "The parallel minor of C major — three flats (B♭, E♭, A♭), a darker, more " +
      "melancholy color than C major despite sharing the same tonic.",
    advanced: "Natural minor is the 6th mode of its relative major (here, E♭ major) — same key " +
      "signature, just starting and ending on C instead of E♭. Interval pattern: Whole, Half, " +
      "Whole, Whole, Half, Whole, Whole.",
    keyInfo: {
      signature: "3 flats — B♭, E♭, and A♭",
      relative: "E♭ Major",
      parallel: "C Major",
      genres: ["Classical", "Rock", "Blues", "Film Score"],
    },
    degrees: {
      solfege:     ["Do",  "Re",    "Me",     "Fa",          "Sol",      "Le",         "Te"],
      names:       ["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],
      functions:   ["Home","Passing","Color",  "Pre-dom",     "Tension",  "Color",      "Weak pull"],
    },
    modeRotation: 5,
    pentatonic: {
      indices: [0, 2, 3, 4, 6],
      dropped: "the 2nd (D) and 6th (A♭)",
    },
    progressions: [
      { roman: "i – iv – v",       chords: ["Cm", "Fm", "Gm"],        genre: "Rock / Modal" },
      { roman: "i – VI – VII",     chords: ["Cm", "A♭", "B♭"],        genre: "Rock / Pop" },
      { roman: "i – VII – VI – VII", chords: ["Cm", "B♭", "A♭", "B♭"], genre: "Cinematic / Epic" },
      { roman: "i – iv – VII",     chords: ["Cm", "Fm", "B♭"],        genre: "Blues-Rock" },
    ],
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [63], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: CROSS_UNDER },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [70], finger: 4, voiceAudio: V + "f4_Bb.wav", cross: null },
        { pitches: [72], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
        { pitches: [72], finger: 5, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [70], finger: 4, voiceAudio: V + "f4_Bb.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: CROSS_OVER },
        { pitches: [63], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [48], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
        { pitches: [50], finger: 4, voiceAudio: V + "f4_D.wav", cross: null },
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: CROSS_UNDER },
        { pitches: [56], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [56], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: CROSS_OVER },
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [50], finger: 4, voiceAudio: V + "f4_D.wav", cross: null },
        { pitches: [48], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [60, 48], fingers: [1, 5], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [62, 50], fingers: [2, 4], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [63, 51], fingers: [3, 3], voiceAudio: V + "note_Eb.wav", cross: CROSS_UNDER_RIGHT },
        { pitches: [65, 53], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: CROSS_OVER_LEFT },
        { pitches: [68, 56], fingers: [3, 3], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [70, 58], fingers: [4, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [72, 60], fingers: [5, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [72, 60], fingers: [5, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [70, 58], fingers: [4, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [68, 56], fingers: [3, 3], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [65, 53], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: CROSS_OVER_RIGHT },
        { pitches: [63, 51], fingers: [3, 3], voiceAudio: V + "note_Eb.wav", cross: CROSS_UNDER_LEFT },
        { pitches: [62, 50], fingers: [2, 4], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [60, 48], fingers: [1, 5], voiceAudio: V + "note_C.wav", cross: null },
      ],
    },
  ],
};

const C_HARMONIC_MINOR = {
  name: "C Harmonic Minor",
  nameAudio: V + "04_C_Harmonic_Minor.wav",
  info: {
    typeLabel: "Harmonic Minor scale",
    description: "Natural minor with a raised 7th (B natural instead of B♭) — that extra half " +
      "step to the octave gives it a dramatic, exotic sound.",
    advanced: "The gap between the 6th (A♭) and raised 7th (B) is a step-and-a-half (an augmented " +
      "2nd) — the source of harmonic minor's Middle-Eastern/flamenco color. Raising the 7th also " +
      "turns the v chord into a proper major V, giving minor keys a strong dominant-to-tonic pull " +
      "that natural minor doesn't have.",
    keyInfo: {
      signature: "3 flats (B♭, E♭, A♭), plus a raised 7th (B natural)",
      relative: "C Natural Minor",
      parallel: "C Major",
      genres: ["Classical", "Metal", "Flamenco", "Klezmer"],
    },
    degrees: {
      solfege:     ["Do",  "Re",    "Me",     "Fa",          "Sol",      "Le",         "Ti"],
      names:       ["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading Tone"],
      functions:   ["Home","Passing","Color",  "Pre-dom",     "Tension",  "Color",      "Pull to 1"],
    },
    progressions: [
      { roman: "i – iv – V",   chords: ["Cm", "Fm", "G"],   genre: "Classical Cadence" },
      { roman: "V7 – i",       chords: ["G7", "Cm"],        genre: "Strong Resolution" },
      { roman: "i – VI – V",   chords: ["Cm", "A♭", "G"],   genre: "Flamenco / Metal" },
    ],
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [63], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: CROSS_UNDER },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [71], finger: 4, voiceAudio: V + "f4_B.wav", cross: null },
        { pitches: [72], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
        { pitches: [72], finger: 5, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [71], finger: 4, voiceAudio: V + "f4_B.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: CROSS_OVER },
        { pitches: [63], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [48], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
        { pitches: [50], finger: 4, voiceAudio: V + "f4_D.wav", cross: null },
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: CROSS_UNDER },
        { pitches: [56], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [59], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [59], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [56], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: CROSS_OVER },
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [50], finger: 4, voiceAudio: V + "f4_D.wav", cross: null },
        { pitches: [48], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [60, 48], fingers: [1, 5], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [62, 50], fingers: [2, 4], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [63, 51], fingers: [3, 3], voiceAudio: V + "note_Eb.wav", cross: CROSS_UNDER_RIGHT },
        { pitches: [65, 53], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: CROSS_OVER_LEFT },
        { pitches: [68, 56], fingers: [3, 3], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [71, 59], fingers: [4, 2], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [72, 60], fingers: [5, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [72, 60], fingers: [5, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [71, 59], fingers: [4, 2], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [68, 56], fingers: [3, 3], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [65, 53], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: CROSS_OVER_RIGHT },
        { pitches: [63, 51], fingers: [3, 3], voiceAudio: V + "note_Eb.wav", cross: CROSS_UNDER_LEFT },
        { pitches: [62, 50], fingers: [2, 4], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [60, 48], fingers: [1, 5], voiceAudio: V + "note_C.wav", cross: null },
      ],
    },
  ],
};

const C_MELODIC_MINOR = {
  name: "C Melodic Minor",
  nameAudio: V + "05_C_Melodic_Minor.wav",
  info: {
    typeLabel: "Melodic Minor scale (classical)",
    description: "Natural minor with a raised 6th and 7th going up (A and B instead of A♭ and B♭) " +
      "for a smoother climb — then it reverts to natural minor coming back down.",
    advanced: "Classical melodic minor is asymmetric: ascending it borrows the 6th and 7th from " +
      "C major, removing the augmented-2nd gap that harmonic minor has; descending it reverts to " +
      "the natural minor. (Jazz players often use the same raised 6th/7th in both directions — the " +
      "\"jazz minor\" scale — but this app follows the classical piano-method convention.)",
    keyInfo: {
      signature: "3 flats (B♭, E♭, A♭); 6th and 7th raised ascending only",
      relative: "C Natural Minor",
      parallel: "C Major",
      genres: ["Classical", "Jazz", "Film Score"],
    },
    degrees: {
      solfege:     ["Do",  "Re",    "Me",     "Fa",          "Sol",      "La",         "Ti"],
      names:       ["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading Tone"],
      functions:   ["Home","Passing","Color",  "Pre-dom",     "Tension",  "Color",      "Pull to 1"],
    },
    progressions: [
      { roman: "i – IV – V",  chords: ["Cm", "F", "G"],   genre: "Jazz Minor" },
      { roman: "ii – V – i",  chords: ["Dm", "G", "Cm"],  genre: "Minor ii–V–i (Jazz)" },
    ],
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [63], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: CROSS_UNDER },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [69], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [71], finger: 4, voiceAudio: V + "f4_B.wav", cross: null },
        { pitches: [72], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
        { pitches: [72], finger: 5, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [70], finger: 4, voiceAudio: V + "f4_Bb.wav", cross: null },
        { pitches: [68], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [67], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [65], finger: 1, voiceAudio: V + "f1_F.wav", cross: CROSS_OVER },
        { pitches: [63], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [62], finger: 2, voiceAudio: V + "f2_D.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [48], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
        { pitches: [50], finger: 4, voiceAudio: V + "f4_D.wav", cross: null },
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: CROSS_UNDER },
        { pitches: [57], finger: 3, voiceAudio: V + "f3_A.wav", cross: null },
        { pitches: [59], finger: 2, voiceAudio: V + "f2_B.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "f1_C.wav", cross: null },
        { pitches: [60], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [58], finger: 2, voiceAudio: V + "f2_Bb.wav", cross: null },
        { pitches: [56], finger: 3, voiceAudio: V + "f3_Ab.wav", cross: null },
        { pitches: [55], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [53], finger: 2, voiceAudio: V + "f2_F.wav", cross: CROSS_OVER },
        { pitches: [51], finger: 3, voiceAudio: V + "f3_Eb.wav", cross: null },
        { pitches: [50], finger: 4, voiceAudio: V + "f4_D.wav", cross: null },
        { pitches: [48], finger: 5, voiceAudio: V + "f5_C.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [60, 48], fingers: [1, 5], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [62, 50], fingers: [2, 4], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [63, 51], fingers: [3, 3], voiceAudio: V + "note_Eb.wav", cross: CROSS_UNDER_RIGHT },
        { pitches: [65, 53], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: CROSS_OVER_LEFT },
        { pitches: [69, 57], fingers: [3, 3], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [71, 59], fingers: [4, 2], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [72, 60], fingers: [5, 1], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [72, 60], fingers: [5, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [70, 58], fingers: [4, 2], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [68, 56], fingers: [3, 3], voiceAudio: V + "note_Ab.wav", cross: null },
        { pitches: [67, 55], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [65, 53], fingers: [1, 2], voiceAudio: V + "note_F.wav", cross: CROSS_OVER_RIGHT },
        { pitches: [63, 51], fingers: [3, 3], voiceAudio: V + "note_Eb.wav", cross: CROSS_UNDER_LEFT },
        { pitches: [62, 50], fingers: [2, 4], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [60, 48], fingers: [1, 5], voiceAudio: V + "note_C.wav", cross: null },
      ],
    },
  ],
};

const D_NATURAL_MINOR = {
  name: "D Natural Minor",
  nameAudio: V + "06_D_Natural_Minor.wav",
  info: {
    typeLabel: "Natural Minor scale (Aeolian)",
    description: "The parallel minor of D major — one flat (B♭), a darker, more melancholy color " +
      "than D major despite sharing the same tonic.",
    advanced: "Natural minor is the 6th mode of its relative major (here, F major) — same key " +
      "signature, just starting and ending on D instead of F. Interval pattern: Whole, Half, " +
      "Whole, Whole, Half, Whole, Whole.",
    keyInfo: {
      signature: "1 flat — B♭",
      relative: "F Major",
      parallel: "D Major",
      genres: ["Classical", "Rock", "Blues", "Film Score"],
    },
    degrees: {
      solfege:     ["Do",  "Re",    "Me",     "Fa",          "Sol",      "Le",         "Te"],
      names:       ["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Subtonic"],
      functions:   ["Home","Passing","Color",  "Pre-dom",     "Tension",  "Color",      "Weak pull"],
    },
    modeRotation: 5,
    pentatonic: {
      indices: [0, 2, 3, 4, 6],
      dropped: "the 2nd (E) and 6th (B♭)",
    },
    progressions: [
      { roman: "i – iv – v",       chords: ["Dm", "Gm", "Am"],        genre: "Rock / Modal" },
      { roman: "i – VI – VII",     chords: ["Dm", "B♭", "C"],         genre: "Rock / Pop" },
      { roman: "i – VII – VI – VII", chords: ["Dm", "C", "B♭", "C"],  genre: "Cinematic / Epic" },
      { roman: "i – iv – VII",     chords: ["Dm", "Gm", "C"],         genre: "Blues-Rock" },
    ],
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [64], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [65], finger: 3, voiceAudio: V + "f3_F.wav", cross: CROSS_UNDER },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [72], finger: 4, voiceAudio: V + "f4_C.wav", cross: null },
        { pitches: [74], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
        { pitches: [74], finger: 5, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [72], finger: 4, voiceAudio: V + "f4_C.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: CROSS_OVER },
        { pitches: [65], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [64], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [50], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
        { pitches: [52], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
        { pitches: [53], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: CROSS_UNDER },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: CROSS_OVER },
        { pitches: [53], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [52], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
        { pitches: [50], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [62, 50], fingers: [1, 5], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [64, 52], fingers: [2, 4], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [65, 53], fingers: [3, 3], voiceAudio: V + "note_F.wav", cross: CROSS_UNDER_RIGHT },
        { pitches: [67, 55], fingers: [1, 2], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [69, 57], fingers: [2, 1], voiceAudio: V + "note_A.wav", cross: CROSS_OVER_LEFT },
        { pitches: [70, 58], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [72, 60], fingers: [4, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [74, 62], fingers: [5, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [74, 62], fingers: [5, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [72, 60], fingers: [4, 2], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [69, 57], fingers: [2, 1], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [67, 55], fingers: [1, 2], voiceAudio: V + "note_G.wav", cross: CROSS_OVER_RIGHT },
        { pitches: [65, 53], fingers: [3, 3], voiceAudio: V + "note_F.wav", cross: CROSS_UNDER_LEFT },
        { pitches: [64, 52], fingers: [2, 4], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [62, 50], fingers: [1, 5], voiceAudio: V + "note_D.wav", cross: null },
      ],
    },
  ],
};

const D_HARMONIC_MINOR = {
  name: "D Harmonic Minor",
  nameAudio: V + "07_D_Harmonic_Minor.wav",
  info: {
    typeLabel: "Harmonic Minor scale",
    description: "Natural minor with a raised 7th (C# instead of C natural) — that extra half " +
      "step to the octave gives it a dramatic, exotic sound.",
    advanced: "The gap between the 6th (B♭) and raised 7th (C♯) is a step-and-a-half (an augmented " +
      "2nd) — the source of harmonic minor's Middle-Eastern/flamenco color. Raising the 7th also " +
      "turns the v chord into a proper major V, giving minor keys a strong dominant-to-tonic pull " +
      "that natural minor doesn't have.",
    keyInfo: {
      signature: "1 flat (B♭), plus a raised 7th (C♯)",
      relative: "D Natural Minor",
      parallel: "D Major",
      genres: ["Classical", "Metal", "Flamenco", "Klezmer"],
    },
    degrees: {
      solfege:     ["Do",  "Re",    "Me",     "Fa",          "Sol",      "Le",         "Ti"],
      names:       ["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading Tone"],
      functions:   ["Home","Passing","Color",  "Pre-dom",     "Tension",  "Color",      "Pull to 1"],
    },
    progressions: [
      { roman: "i – iv – V",   chords: ["Dm", "Gm", "A"],   genre: "Classical Cadence" },
      { roman: "V7 – i",       chords: ["A7", "Dm"],        genre: "Strong Resolution" },
      { roman: "i – VI – V",   chords: ["Dm", "B♭", "A"],   genre: "Flamenco / Metal" },
    ],
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [64], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [65], finger: 3, voiceAudio: V + "f3_F.wav", cross: CROSS_UNDER },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [73], finger: 4, voiceAudio: V + "f4_Cs.wav", cross: null },
        { pitches: [74], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
        { pitches: [74], finger: 5, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [73], finger: 4, voiceAudio: V + "f4_Cs.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: CROSS_OVER },
        { pitches: [65], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [64], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [50], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
        { pitches: [52], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
        { pitches: [53], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: CROSS_UNDER },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: CROSS_OVER },
        { pitches: [53], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [52], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
        { pitches: [50], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [62, 50], fingers: [1, 5], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [64, 52], fingers: [2, 4], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [65, 53], fingers: [3, 3], voiceAudio: V + "note_F.wav", cross: CROSS_UNDER_RIGHT },
        { pitches: [67, 55], fingers: [1, 2], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [69, 57], fingers: [2, 1], voiceAudio: V + "note_A.wav", cross: CROSS_OVER_LEFT },
        { pitches: [70, 58], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [73, 61], fingers: [4, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [74, 62], fingers: [5, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [74, 62], fingers: [5, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [73, 61], fingers: [4, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: null },
        { pitches: [69, 57], fingers: [2, 1], voiceAudio: V + "note_A.wav", cross: null },
        { pitches: [67, 55], fingers: [1, 2], voiceAudio: V + "note_G.wav", cross: CROSS_OVER_RIGHT },
        { pitches: [65, 53], fingers: [3, 3], voiceAudio: V + "note_F.wav", cross: CROSS_UNDER_LEFT },
        { pitches: [64, 52], fingers: [2, 4], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [62, 50], fingers: [1, 5], voiceAudio: V + "note_D.wav", cross: null },
      ],
    },
  ],
};

const D_MELODIC_MINOR = {
  name: "D Melodic Minor",
  nameAudio: V + "08_D_Melodic_Minor.wav",
  info: {
    typeLabel: "Melodic Minor scale (classical)",
    description: "Natural minor with a raised 6th and 7th going up (B and C# instead of B♭ and C) " +
      "for a smoother climb — then it reverts to natural minor coming back down.",
    advanced: "Classical melodic minor is asymmetric: ascending it borrows the 6th and 7th from " +
      "D major, removing the augmented-2nd gap that harmonic minor has; descending it reverts to " +
      "the natural minor. (Jazz players often use the same raised 6th/7th in both directions — the " +
      "\"jazz minor\" scale — but this app follows the classical piano-method convention.)",
    keyInfo: {
      signature: "1 flat (B♭); 6th and 7th raised ascending only",
      relative: "D Natural Minor",
      parallel: "D Major",
      genres: ["Classical", "Jazz", "Film Score"],
    },
    degrees: {
      solfege:     ["Do",  "Re",    "Me",     "Fa",          "Sol",      "La",         "Ti"],
      names:       ["Tonic","Supertonic","Mediant","Subdominant","Dominant","Submediant","Leading Tone"],
      functions:   ["Home","Passing","Color",  "Pre-dom",     "Tension",  "Color",      "Pull to 1"],
    },
    progressions: [
      { roman: "i – IV – V",  chords: ["Dm", "G", "A"],   genre: "Jazz Minor" },
      { roman: "ii – V – i",  chords: ["Em", "A", "Dm"],  genre: "Minor ii–V–i (Jazz)" },
    ],
  },
  sections: [
    {
      id: "rh",
      announceAudio: V + "right_hand.wav",
      clef: "treble",
      slots: [
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [64], finger: 2, voiceAudio: V + "f2_E.wav", cross: null },
        { pitches: [65], finger: 3, voiceAudio: V + "f3_F.wav", cross: CROSS_UNDER },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_G.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_A.wav", cross: null },
        { pitches: [71], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
        { pitches: [73], finger: 4, voiceAudio: V + "f4_Cs.wav", cross: null },
        { pitches: [74], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
        { pitches: [74], finger: 5, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [72], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
        { pitches: [70], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [69], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [67], finger: 1, voiceAudio: V + "f1_A.wav", cross: CROSS_OVER },
        { pitches: [65], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [64], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
      ],
    },
    {
      id: "lh",
      announceAudio: V + "left_hand.wav",
      clef: "bass",
      slots: [
        { pitches: [50], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
        { pitches: [52], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
        { pitches: [53], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: CROSS_UNDER },
        { pitches: [59], finger: 3, voiceAudio: V + "f3_B.wav", cross: null },
        { pitches: [61], finger: 2, voiceAudio: V + "f2_Cs.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "f1_D.wav", cross: null },
        { pitches: [62], finger: 1, voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [60], finger: 2, voiceAudio: V + "f2_C.wav", cross: null },
        { pitches: [58], finger: 3, voiceAudio: V + "f3_Bb.wav", cross: null },
        { pitches: [57], finger: 1, voiceAudio: V + "f1_A.wav", cross: null },
        { pitches: [55], finger: 2, voiceAudio: V + "f2_G.wav", cross: CROSS_OVER },
        { pitches: [53], finger: 3, voiceAudio: V + "f3_F.wav", cross: null },
        { pitches: [52], finger: 4, voiceAudio: V + "f4_E.wav", cross: null },
        { pitches: [50], finger: 5, voiceAudio: V + "f5_D.wav", cross: null },
      ],
    },
    {
      id: "together",
      announceAudio: V + "together.wav",
      clef: "grand",
      slots: [
        { pitches: [62, 50], fingers: [1, 5], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [64, 52], fingers: [2, 4], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [65, 53], fingers: [3, 3], voiceAudio: V + "note_F.wav", cross: CROSS_UNDER_RIGHT },
        { pitches: [67, 55], fingers: [1, 2], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [69, 57], fingers: [2, 1], voiceAudio: V + "note_A.wav", cross: CROSS_OVER_LEFT },
        { pitches: [71, 59], fingers: [3, 3], voiceAudio: V + "note_B.wav", cross: null },
        { pitches: [73, 61], fingers: [4, 2], voiceAudio: V + "note_Cs.wav", cross: null },
        { pitches: [74, 62], fingers: [5, 1], voiceAudio: V + "note_D.wav", cross: null },
        { pitches: [74, 62], fingers: [5, 1], voiceAudio: V + "now_backwards.wav", cross: null },
        { pitches: [72, 60], fingers: [4, 2], voiceAudio: V + "note_E.wav", cross: null },
        { pitches: [70, 58], fingers: [3, 3], voiceAudio: V + "note_F.wav", cross: null },
        { pitches: [69, 57], fingers: [2, 1], voiceAudio: V + "note_G.wav", cross: null },
        { pitches: [67, 55], fingers: [1, 2], voiceAudio: V + "note_A.wav", cross: CROSS_OVER_RIGHT },
        { pitches: [65, 53], fingers: [3, 3], voiceAudio: V + "note_Bb.wav", cross: CROSS_UNDER_LEFT },
        { pitches: [64, 52], fingers: [2, 4], voiceAudio: V + "note_C.wav", cross: null },
        { pitches: [62, 50], fingers: [1, 5], voiceAudio: V + "note_D.wav", cross: null },
      ],
    },
  ],
};

const SCALES = {
  "C Major": C_MAJOR,
  "D Major": D_MAJOR,
  "C Minor": C_NATURAL_MINOR,
  "C Harmonic Minor": C_HARMONIC_MINOR,
  "C Melodic Minor": C_MELODIC_MINOR,
  "D Minor": D_NATURAL_MINOR,
  "D Harmonic Minor": D_HARMONIC_MINOR,
  "D Melodic Minor": D_MELODIC_MINOR,
};
