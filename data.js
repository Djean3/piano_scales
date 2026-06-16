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
const SCALE_TYPES = ["Major", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Minor", "Locrian"];

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

const SCALES = {
  "C Major": C_MAJOR,
  "D Major": D_MAJOR,
};
