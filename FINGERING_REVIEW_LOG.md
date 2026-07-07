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
