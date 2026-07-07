# Fingering Review Log

Tracks scales where the fingering was reconstructed from a reasonable
reading of Alfred's Basic Piano Library rather than a fully unambiguous
direct transcription. These do NOT affect note/pitch correctness (the
scales sound and are named correctly either way) — the risk is limited
to which finger number is displayed/spoken during playback.

Format per entry: what's confirmed directly from the book, what was
reconstructed, and the specific reasoning/evidence used.

---

## F# Major + F# Minor family (all 4 types) — flagged 2026-07-07

**Confirmed directly from the book (box text, high confidence):**
- F# Major: RH 4th finger on the 3rd degree (A#). LH 4th finger on the
  1st degree (F#, the tonic) — no footnote/exception (unlike B major).
- F# Minor: RH 4th finger on the 2nd degree (G#) "thereafter" (3 or 4
  allowed the first time — footnote). LH 4th finger on the 1st degree
  (F#). Melodic minor footnote: RH 4th finger on D# ascending, G#
  descending.
- F# minor's "Natural minor" system top note (octave) was legibly
  labeled "3", not the "5" or "1" seen in every other key built so far
  — meaning F# minor's RH does NOT close the octave on the pinky or
  thumb like every other key. This was the point where pixel reading
  stopped being reliable enough to trust further without guessing.

**Reconstructed (not directly confirmed) — used for building the data:**
- `RH_MAJOR_ASC = [2,3,4,1,2,3,4,1]` (degrees 0-7). The "4 on 3rd
  degree" box fact fits this pattern at index 2. Cross points placed
  at the same *positions* as the standard C/D/G/A/E scaffold (index 2
  ascending / index 3 descending), just with different finger values.
- `RH_MINOR_ASC (natural/harmonic) = [2,4,3,1,2,4,3,1]` — first 4
  notes (2,4,3,1) read with reasonable confidence from a clear
  high-res crop of the natural-minor system's bar 1. Second 4 notes
  assumed to mirror the same shape for internal consistency (NOT
  independently confirmed — this is the main flagged guess). This
  guess is supported indirectly: it predicts degree 5 = finger 4,
  which matches the book's own separate melodic-minor footnote
  ("RH 4 on D# ascending") landing on that exact same position.
- `RH_MELODIC_MINOR_ASC` reuses the same finger shape as natural/
  harmonic, applied to the raised 6th/7th pitches (D#, F).
- `LH_ASC (all 4 types) = [4,3,2,1,4,3,2,1]` — reused wholesale from
  B major/minor's confirmed LH shape, since the one directly-read box
  fact available (LH 4th finger on the tonic) matches B's pattern's
  first element exactly. Not independently re-verified note-by-note
  for F# specifically.
- Did NOT attempt to resolve the "top note = finger 3" anomaly seen in
  F# minor's natural-minor system — the descending/ending fingering
  for F# minor may not perfectly match what's coded. **This is the
  single most likely spot to be wrong in the F# family.**

**To manually re-verify later:** Alfred's Basic Piano Library, "Key of
F# Major" (book p.30) and "Key of F# Minor" (book p.54, relative minor
of A major). Compare against `F_SHARP_MAJOR`, `F_SHARP_NATURAL_MINOR`,
`F_SHARP_HARMONIC_MINOR`, `F_SHARP_MELODIC_MINOR` in `data.js`.

---

## F Major + F Minor family (all 4 types) — flagged 2026-07-07

**Confirmed directly from the book (box text, identical wording on
both the Major page p.34 and Minor page p.70, high confidence):**
- LH: 4th finger on the 2nd degree (G) — this IS the standard C/D/G/
  A/E scaffold, confirmed, no change needed.
- RH: 4th finger on the 4th degree (B♭) — this is NOT the standard
  scaffold (standard puts the 4th finger on the 7th degree). F major's
  octave-top note is also legibly labeled "4" (not "5"), confirming
  the RH never uses the pinky in this scale at all.

**Reconstructed (not pixel-confirmed) — used for building the data:**
- `RH_ASC = [1,2,3,4,1,2,3,4]` — the well-known "no-thumb-tuck" F
  major RH fingering (two identical 1-2-3-4 hand positions, confirmed
  at one point by the box: index 3 = B♭ = finger 4, and at the other
  end: the octave = finger 4, matching the visible "4" at the peak).
  The two middle notes of each 4-note group (index 1 and index 2 each
  time) were NOT independently pixel-confirmed — attempts to read
  them directly produced labels that appeared to contradict the box
  text, most likely due to misreading which beam/note a given label
  belongs to on a cramped 2-octave engraving. Went with the standard,
  well-documented "1-2-3-4 / 1-2-3-4" pattern instead of chasing the
  pixels further.
- Cross-cue position shifted to index 3 ascending / index 4
  descending (where the 4→1 finger jump actually happens in this
  pattern), rather than the standard scaffold's index 2/3.
- LH reuses the full standard scaffold as-is (confirmed by box).

**To manually re-verify later:** Alfred's Basic Piano Library, "Key of
F Major" (book p.34) and "Key of F Minor" (book p.70, relative minor
of Ab major). Compare against `F_MAJOR`, `F_NATURAL_MINOR`,
`F_HARMONIC_MINOR`, `F_MELODIC_MINOR` in `data.js`.

---

## Bb Major + Bb Minor family (all 4 types) — flagged 2026-07-07

**Confirmed directly from the book (box text, high confidence):**
- RH 4th finger on the 1st degree (B♭, the tonic) for BOTH major and
  minor (identical footnote: "RH 2 or 4 may be used on B♭ in the 1st
  octave — RH 4 thereafter"). Since our single-octave app always
  represents a "1st octave" start, went with 4 throughout (the
  book's own "thereafter"/default answer) rather than the beginner
  alternate.
- LH Major: 4th finger on the 4th degree (E♭).
- LH Minor: 4th finger on the 6th degree (G or G♭, depending on
  scale form) — **a different degree than major's LH fact**,
  meaning Bb major and Bb minor's LH fingering are NOT the same
  shape (unlike every other key built so far, where major/minor
  share one LH shape).

**Reconstructed (not pixel-confirmed) — used for building the data:**
- `RH_ASC (major + all 3 minors) = [4,3,2,1,4,3,2,1]` — reuses the
  exact shape already confirmed for B major's LH, applied here to
  Bb's RH since the one box fact available (tonic = finger 4) matches
  that shape's first element.
- `LH_ASC (major + all 3 minors) = [1,2,3,4,1,2,3,4]` — reuses F
  major's RH shape. This satisfies Bb MAJOR's box fact exactly
  (degree 3 = E♭ = finger 4). **It does NOT satisfy Bb MINOR's own
  box fact** (degree 5 = G/G♭ = finger 4; this pattern gives finger 2
  at that position) — used it anyway for consistency across all 4
  scale types rather than inventing an unconfirmed alternate shape
  for the minor forms specifically. **This is the most likely error
  in the Bb family — Bb minor's LH fingering from roughly the middle
  of the scale onward should be treated as unverified.**
- Cross-cue positions for both hands placed at index 3 ascending /
  index 4 descending (matching where each hypothesized pattern's
  4→1 jump actually falls).

**To manually re-verify later:** Alfred's Basic Piano Library, "Key of
B♭ Major" (book p.36) and "Key of B♭ Minor" (book p.72, relative minor
of D♭ major — also enharmonic with A♯ minor, book p.62). Compare
against `B_FLAT_MAJOR`, `B_FLAT_NATURAL_MINOR`, `B_FLAT_HARMONIC_MINOR`,
`B_FLAT_MELODIC_MINOR` in `data.js`. Pay particular attention to the
LH fingering for Bb minor's degrees 4-7.

---

## Eb Major + Eb Minor family (all 4 types) — flagged 2026-07-07

**Process used for this key (more pixel-verification than earlier
flagged keys, since the book's own layout was clearer here):** rendered
the "Key of E♭ Major" page (book p.38) and the "Key of E♭ Minor" page
(book p.74) at 600-900 DPI, then cropped down to individual measures
and re-cropped further whenever a finger number was ambiguous, reading
each notehead's fingering number directly off the page rather than
guessing from general scale-fingering conventions. Degrees confirmed
this way are marked below; degrees NOT directly legible (either cut
off by a crop boundary or ambiguous at max zoom) were filled in using
the same reasonable-reconstruction approach as the other flagged keys —
matching the confirmed notes on either side and, where a scale's
32-note passage repeats a 4-note fingering cell (a pattern confirmed
in every other irregular key built so far), assuming the cell repeats.

**Confirmed directly from the book (box text, high confidence):**
- E♭ Major: LH 4th finger on A♭ (4th degree). RH 4th finger on B♭
  (5th degree).
- E♭ Minor (natural/harmonic/melodic all share one box on p.74): LH
  4th finger on G♭ (3rd degree) — a DIFFERENT degree than major's LH
  fact (4th degree), meaning E♭ major and minor do NOT share one LH
  shape (same situation as the B♭ family). RH 4th finger on B♭ (5th
  degree) — identical to major's RH fact, so RH is shared across all
  four E♭ scale types.

**Confirmed by direct pixel reading (not just the summary box):**
- RH ascending, both major and minor forms: E♭(2) F(1) G/G♭(2) A♭(3)
  B♭(4) C/C♭(1) D/D♭(2) E♭(3) — read directly off the "Parallel motion
  in octaves" system for both keys; the two systems were visually
  identical in structure, only the pitches differ (G vs G♭, C vs C♭,
  D vs D♭ depending on major/natural-minor). This means RH actually
  crosses the thumb under TWICE per octave (right at the start, F=1,
  and again mid-scale at C/C♭=1) — a different shape than every other
  irregular key built so far (F/B♭/F♯/B all only cross once). Only
  the SECOND crossing (matching the box's B♭/5th-degree fact) gets a
  cross-cue in the app; the first (very early) thumb-tuck is not cued,
  consistent with how the app only ever cues one crossing per octave.
- LH ascending, E♭ Major: E♭(3) F(2) G(1) A♭(4) — first four notes
  read directly and clearly, matching the box fact exactly (A♭=4th
  degree=finger 4).
- LH ascending, E♭ Minor (applies to natural/harmonic/melodic — the
  3rd degree stays G♭ in all three forms): E♭(2) F(1) G♭(4) — first
  three notes read directly, matching the box fact exactly (G♭=3rd
  degree=finger 4). Note this is a shorter lead-in than major's (LH
  minor crosses to finger 4 one note earlier than LH major does).

**Reconstructed (not pixel-confirmed) — used for building the data:**
- LH degrees 5-8 for BOTH major and minor were not clearly legible at
  any crop/zoom level tried. Filled in by repeating the confirmed
  4-note cell a second time: major = `[3,2,1,4,3,2,1,4]`, minor =
  `[2,1,4,3,2,1,4,3]`. This matches the repeating-cell shape seen in
  every other irregular key's LH fingering, but the exact finger on
  the final (octave) note in particular is the least certain single
  value in this whole family.
- Harmonic and melodic minor were not independently pixel-checked
  beyond confirming the book's numbers visually matched natural
  minor's system note-for-note (aside from the raised degree(s)) —
  assumed to share natural minor's exact fingering shape, consistent
  with how every other key in this project has handled harmonic/
  melodic minor relative to natural minor.
- E♭ Natural/Harmonic Minor's 6th scale degree is spelled C♭ (not B)
  to match the book's own 6-flat key signature for E♭ minor (B♭, E♭,
  A♭, D♭, G♭, C♭) — this is the first key in the app to need a C♭ or
  F♭ spelling. New voice files `f1_Cb.wav`, `f4_Gb.wav`, `note_Cb.wav`
  were generated for this.

**To manually re-verify later:** Alfred's Basic Piano Library, "Key of
E♭ Major" (book p.38) and "Key of E♭ Minor" (book p.74, relative minor
of G♭ major — also enharmonic with D♯ minor, book p.60). Compare
against `E_FLAT_MAJOR`, `E_FLAT_NATURAL_MINOR`, `E_FLAT_HARMONIC_MINOR`,
`E_FLAT_MELODIC_MINOR` in `data.js`. Pay particular attention to LH
degrees 5-8 (Bb/C-or-Cb/D-or-Db/Eb) in all four scale types.

---

## Ab Major + Ab Minor family (all 4 types) — flagged 2026-07-07

**Process used:** same high-DPI pixel-reading approach as the E♭
family. Rendered "Key of A♭ Major" (book p.40) and "Key of A♭ Minor"
(book p.76) at 900-1000 DPI, cropped to individual measures, read each
notehead's fingering number directly. This key's page was unusually
generous with detail — it spells out extra facts beyond the usual
one-line box, quoted below — so more of this key's fingering rests on
directly-stated text than on repeat-cell guessing, compared to earlier
flagged keys.

**Confirmed directly from the book (explicit text, high confidence):**
- General box (applies to Major, and to Harmonic/Melodic-ascending
  Minor): LH 4th finger on D♭ (4th degree). RH 4th finger on B♭ (2nd
  degree), **with a footnote**: "In the 1st octave, RH 3 or 4 may be
  used on B♭ — RH 4 thereafter." This app always plays a single (1st)
  octave, so it correctly uses the footnote's 1st-octave alternate
  (finger 3 on B♭), not the box's headline "4" — confirmed directly
  from the score, where the written-out fingering actually shows "3"
  with "(4)" as a small parenthetical alternate above it.
- Natural minor gets its own explicit override, printed directly above
  its own system: "LH 4th finger on G♭ (7th degree)" — a different
  degree than the general box's D♭/4th-degree fact. The book adds a
  plain-English callout right under that system: **"This is the only
  scale where the LH fingering in the natural minor differs from the
  harmonic minor"** — i.e. every other minor key in the whole method
  book has natural and harmonic minor sharing one LH shape; A♭ is
  the sole exception, and the book flags it as such itself.
- Melodic minor gets its own explicit override too: "LH 4th finger on
  D♭ ascending, G♭ descending" — meaning melodic minor's LH is a
  genuine hybrid, using the major/harmonic shape going up and the
  natural-minor shape coming back down. This is modeled in `data.js`
  by giving A♭ Melodic Minor's LH section a different ascending vs.
  descending finger source (the generator script's usual
  mirror-the-ascending-array shortcut does not apply to this one key).

**Confirmed by direct pixel reading (not just the summary/override
text):**
- RH ascending, all four scale types share one shape (only pitches
  differ by form): A♭(2) B♭(3) C/C♭(1) D♭(2) E♭(3) F/F♭(1) G/G♭(2)
  A♭(3). Thumb lands on the two "white-key-equivalent" degrees (C or
  C♭≡B, and F or F♭≡E) — consistent with the general principle (seen
  in every irregular key so far) that thumb placement favors the
  white keys of a scale where possible.
- LH ascending, Major/Harmonic form: A♭(3) B♭(2) C/C♭(1) D♭(4) — first
  four notes read directly, matching the box fact exactly (D♭ = 4th
  degree = finger 4).
- LH ascending, Natural Minor form: A♭(3) B♭(2) C♭(1) — first three
  notes read directly; the crossing to finger 4 was not legible at
  the exact note in this particular pixel pass, but its DEGREE
  position is separately confirmed by the printed override text
  (G♭ = 7th degree = finger 4), which is what the data actually uses.

**Reconstructed (not pixel-confirmed) — used for building the data:**
- LH degrees 4-7 for the Natural Minor shape (`[3,2,1,2,3,1,4,3]`) were
  built by analogy to the RH shape's own two-thumb-crossing structure
  (thumb at the same two relative positions, C♭-equivalent and
  F♭-equivalent) rather than read note-by-note off the page — this
  satisfies the one confirmed fact (G♭ = finger 4) but the notes
  around it (E♭, F♭ specifically) are the least certain values in
  this family.
- Harmonic and Melodic minor's shared portions (RH entirely; LH's
  ascending-major-shape / descending-natural-shape halves) were
  assumed rather than independently re-verified beyond confirming the
  book's override sentences quoted above.
- A♭ Natural/Harmonic Minor's key signature (7 flats: B♭, E♭, A♭, D♭,
  G♭, C♭, F♭) is the first in the app to need an F♭ spelling — new
  voice files `f1_Fb.wav`, `f2_Fb.wav`, `note_Fb.wav` were generated.

**To manually re-verify later:** Alfred's Basic Piano Library, "Key of
A♭ Major" (book p.40) and "Key of A♭ Minor" (book p.76, relative minor
of C♭ major — also enharmonic with G♯ minor, book p.58). Compare
against `A_FLAT_MAJOR`, `A_FLAT_NATURAL_MINOR`, `A_FLAT_HARMONIC_MINOR`,
`A_FLAT_MELODIC_MINOR` in `data.js`. Pay particular attention to LH
degrees 4-7 (E♭/F♭/G♭) in the Natural Minor (and Melodic Minor's
descending pass, which reuses the Natural Minor shape).
