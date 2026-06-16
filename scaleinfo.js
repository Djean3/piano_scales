// Scale-info card — beginner-friendly summary plus a paged music theory
// section with ← → navigation: Pattern → Chords → Modes → Key & Context.

const ScaleInfo = (() => {
  function pitchClass(midi) {
    return ((midi % 12) + 12) % 12;
  }

  function ascendingRun(slots) {
    const out = [slots[0].pitches[0]];
    for (let i = 1; i < slots.length; i++) {
      const p = slots[i].pitches[0];
      if (p <= out[out.length - 1]) break;
      out.push(p);
    }
    return out;
  }

  function intervalPattern(pitches) {
    const steps = [];
    for (let i = 1; i < pitches.length; i++) {
      const diff = pitches[i] - pitches[i - 1];
      steps.push(diff === 2 ? "W" : diff === 1 ? "H" : String(diff));
    }
    return steps;
  }

  function render(container, scale) {
    container.innerHTML = "";
    const rh = scale.sections.find((s) => s.id === "rh") || scale.sections[0];
    const lh = scale.sections.find((s) => s.id === "lh");
    const run = ascendingRun(rh.slots);
    const pattern = intervalPattern(run);
    const chromatic = pattern.length > 0 && pattern.every((s) => s === "H");
    const notes = run.map((m) => PC_LETTER[pitchClass(m)]);
    const tonicPc = pitchClass(run[0]);

    const desc = document.createElement("p");
    desc.className = "scale-info-desc";
    desc.textContent = scale.info.description;
    container.appendChild(desc);

    const notesEl = document.createElement("p");
    notesEl.className = "scale-info-notes";
    notesEl.innerHTML =
      "Notes: " +
      notes
        .map((n, i) => (i === 0 || i === notes.length - 1 ? `<span class="tonic-note">${n}</span>` : n))
        .join(" – ");
    container.appendChild(notesEl);

    container.appendChild(renderKeyboard(rh, lh, run, tonicPc));

    const caption = document.createElement("p");
    caption.className = "scale-info-caption";
    caption.innerHTML =
      '<span class="legend-swatch tonic"></span>Root (1) ' +
      '<span class="legend-swatch other"></span>Scale degrees';
    container.appendChild(caption);

    container.appendChild(buildTheoryPager(scale, pattern, chromatic, run));
  }

  // ── Keyboard diagram ──────────────────────────────────────────────────────

  function renderKeyboard(rh, lh, run, tonicPc) {
    const highlighted = new Set();
    ascendingRun(rh.slots).forEach((m) => highlighted.add(m));
    if (lh) ascendingRun(lh.slots).forEach((m) => highlighted.add(m));

    const degreeByPc = {};
    run.forEach((m, i) => {
      const pc = pitchClass(m);
      if (!(pc in degreeByPc)) degreeByPc[pc] = i + 1;
    });

    function keyContent(midi) {
      const pc = pitchClass(midi);
      return `<span class="key-degree">${degreeByPc[pc]}</span><span class="key-note">${PC_LETTER[pc]}</span>`;
    }

    const board = document.createElement("div");
    board.className = "piano-roll-board scale-info-board";
    const whiteRow = document.createElement("div");
    whiteRow.className = "piano-roll-white-row";

    let whiteIndex = 0;
    const blackKeyDefs = [];
    for (let midi = PIANO_ROLL_MIN; midi <= PIANO_ROLL_MAX; midi++) {
      const pc = pitchClass(midi);
      if (PC_IS_BLACK.has(pc)) {
        blackKeyDefs.push({ midi, boundary: whiteIndex });
        continue;
      }
      const key = document.createElement("div");
      key.className = "piano-key white";
      if (highlighted.has(midi)) {
        key.classList.add("scale-note");
        if (pc === tonicPc) key.classList.add("tonic");
        key.innerHTML = keyContent(midi);
      }
      whiteRow.appendChild(key);
      whiteIndex++;
    }
    const whiteCount = whiteIndex;
    board.appendChild(whiteRow);

    const whiteWidthPct = 100 / whiteCount;
    const blackWidthPct = whiteWidthPct * 0.62;
    for (const def of blackKeyDefs) {
      const key = document.createElement("div");
      key.className = "piano-key black";
      key.style.left = `calc(${def.boundary * whiteWidthPct}% - ${blackWidthPct / 2}%)`;
      key.style.width = `${blackWidthPct}%`;
      if (highlighted.has(def.midi)) {
        key.classList.add("scale-note");
        if (pitchClass(def.midi) === tonicPc) key.classList.add("tonic");
        key.innerHTML = keyContent(def.midi);
      }
      board.appendChild(key);
    }
    return board;
  }

  // ── Theory pager ──────────────────────────────────────────────────────────

  const MODE_NAMES   = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
  const MODE_QUALITY = ["major", "minor", "minor", "major", "major", "minor", "diminished"];
  const MODE_VIBE    = ["bright", "smooth", "exotic", "dreamy", "bluesy", "natural", "dark"];

  function buildTheoryPager(scale, pattern, chromatic, run) {
    const wrapper = document.createElement("div");
    wrapper.className = "theory-pager";

    const pages = [];

    // Page 1 — Interval Pattern
    pages.push({
      title: "Interval Pattern",
      build() {
        const div = document.createElement("div");

        const typeEl = document.createElement("p");
        typeEl.className = "scale-info-type";
        typeEl.textContent = `${chromatic ? "Chromatic" : "Diatonic"} · ${scale.info.typeLabel}`;
        div.appendChild(typeEl);

        const patEl = document.createElement("p");
        patEl.className = "scale-info-pattern";
        patEl.innerHTML = pattern
          .map((s) => `<span class="pattern-step ${s === "W" ? "whole" : s === "H" ? "half" : ""}">${s === "W" ? "Whole" : s === "H" ? "Half" : s}</span>`)
          .join("");
        div.appendChild(patEl);

        if (scale.info.advanced) {
          const adv = document.createElement("p");
          adv.className = "scale-info-desc theory-last";
          adv.textContent = scale.info.advanced;
          div.appendChild(adv);
        }
        return div;
      },
    });

    // Page 2 — Diatonic Chords
    if (!chromatic && run.length >= 7) {
      pages.push({
        title: "Diatonic Chords",
        build() { return buildChordsPage(run); },
      });
    }

    // Page 3 — Modes
    if (!chromatic && run.length >= 7) {
      pages.push({
        title: "Modes",
        build() { return buildModesPage(run); },
      });
    }

    // Page 4 — Scale Degrees
    if (scale.info.degrees) {
      pages.push({
        title: "Scale Degrees",
        build() { return buildScaleDegreesPage(run, scale.info.degrees); },
      });
    }

    // Page 5 — Pentatonic
    if (scale.info.pentatonic) {
      pages.push({
        title: "Pentatonic",
        build() { return buildPentatonicPage(run, scale.info.pentatonic); },
      });
    }

    // Page 6 — Progressions
    if (scale.info.progressions) {
      pages.push({
        title: "Progressions",
        build() { return buildProgressionsPage(scale.info.progressions); },
      });
    }

    // Page 7 — Key & Context
    if (scale.info.keyInfo) {
      pages.push({
        title: "Key & Context",
        build() { return buildKeyInfoPage(scale.info.keyInfo); },
      });
    }

    let current = 0;

    const header = document.createElement("div");
    header.className = "theory-header";

    const prevBtn = document.createElement("button");
    prevBtn.className = "theory-nav";
    prevBtn.innerHTML = "&#8592;";
    prevBtn.setAttribute("aria-label", "Previous topic");

    const titleEl = document.createElement("span");
    titleEl.className = "theory-title";

    const nextBtn = document.createElement("button");
    nextBtn.className = "theory-nav";
    nextBtn.innerHTML = "&#8594;";
    nextBtn.setAttribute("aria-label", "Next topic");

    header.appendChild(prevBtn);
    header.appendChild(titleEl);
    header.appendChild(nextBtn);
    wrapper.appendChild(header);

    const contentEl = document.createElement("div");
    contentEl.className = "theory-content";
    wrapper.appendChild(contentEl);

    const dotsEl = document.createElement("div");
    dotsEl.className = "theory-dots";
    wrapper.appendChild(dotsEl);

    function goTo(idx) {
      current = ((idx % pages.length) + pages.length) % pages.length;
      titleEl.textContent = pages[current].title;
      contentEl.innerHTML = "";
      contentEl.appendChild(pages[current].build());
      dotsEl.innerHTML = "";
      pages.forEach((_, i) => {
        const d = document.createElement("span");
        d.className = "theory-dot" + (i === current ? " active" : "");
        d.addEventListener("click", () => goTo(i));
        dotsEl.appendChild(d);
      });
    }

    prevBtn.addEventListener("click", () => goTo(current - 1));
    nextBtn.addEventListener("click", () => goTo(current + 1));
    goTo(0);
    return wrapper;
  }

  function buildChordsPage(run) {
    const div = document.createElement("div");
    const pitches = run.slice(0, 7);
    const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

    const grid = document.createElement("div");
    grid.className = "theory-chord-grid";

    pitches.forEach((root, d) => {
      let third = pitches[(d + 2) % 7];
      let fifth  = pitches[(d + 4) % 7];
      while (third <= root)  third += 12;
      while (fifth  <= third) fifth += 12;

      const majorThird   = (third - root) === 4;
      const perfectFifth = (fifth  - root) === 7;

      let quality, roman, qualLabel;
      if (majorThird && perfectFifth) {
        quality = "major"; roman = ROMAN[d]; qualLabel = "";
      } else if (!majorThird && perfectFifth) {
        quality = "minor"; roman = ROMAN[d].toLowerCase(); qualLabel = "m";
      } else {
        quality = "dim"; roman = ROMAN[d].toLowerCase() + "°"; qualLabel = "°";
      }

      const noteName = PC_LETTER[((root % 12) + 12) % 12];
      const chip = document.createElement("div");
      chip.className = `theory-chord theory-chord-${quality}`;
      chip.innerHTML =
        `<span class="chord-roman">${roman}</span>` +
        `<span class="chord-name">${noteName}<span class="chord-qual">${qualLabel}</span></span>`;
      grid.appendChild(chip);
    });

    div.appendChild(grid);

    const note = document.createElement("p");
    note.className = "theory-note";
    note.textContent = "Uppercase = major · lowercase = minor · ° = diminished";
    div.appendChild(note);
    return div;
  }

  function buildModesPage(run) {
    const div = document.createElement("div");
    const list = document.createElement("div");
    list.className = "theory-mode-list";

    run.slice(0, 7).forEach((pitch, i) => {
      const noteName = PC_LETTER[((pitch % 12) + 12) % 12];
      const row = document.createElement("div");
      row.className = "theory-mode-row";
      row.innerHTML =
        `<span class="mode-note">${noteName}</span>` +
        `<span class="mode-name">${MODE_NAMES[i]}</span>` +
        `<span class="mode-quality mode-${MODE_QUALITY[i]}">${MODE_QUALITY[i]}</span>` +
        `<span class="mode-vibe">${MODE_VIBE[i]}</span>`;
      list.appendChild(row);
    });

    div.appendChild(list);
    return div;
  }

  function buildKeyInfoPage(info) {
    const div = document.createElement("div");
    const grid = document.createElement("div");
    grid.className = "theory-key-grid";

    [
      ["Key signature", info.signature],
      ["Relative key",  info.relative],
      ["Parallel minor", info.parallel],
    ].forEach(([label, value]) => {
      if (!value) return;
      const row = document.createElement("div");
      row.className = "theory-key-row";
      row.innerHTML =
        `<span class="theory-key-label">${label}</span>` +
        `<span class="theory-key-value">${value}</span>`;
      grid.appendChild(row);
    });

    if (info.genres && info.genres.length) {
      const row = document.createElement("div");
      row.className = "theory-key-row";
      const labelEl = document.createElement("span");
      labelEl.className = "theory-key-label";
      labelEl.textContent = "Common genres";
      const genreWrap = document.createElement("div");
      genreWrap.className = "theory-genres";
      info.genres.forEach((g) => {
        const chip = document.createElement("span");
        chip.className = "theory-genre";
        chip.textContent = g;
        genreWrap.appendChild(chip);
      });
      row.appendChild(labelEl);
      row.appendChild(genreWrap);
      grid.appendChild(row);
    }

    div.appendChild(grid);
    return div;
  }

  function buildScaleDegreesPage(run, degrees) {
    const div = document.createElement("div");
    const list = document.createElement("div");
    list.className = "theory-degree-list";
    run.slice(0, 7).forEach((pitch, i) => {
      const noteName = PC_LETTER[((pitch % 12) + 12) % 12];
      const row = document.createElement("div");
      row.className = "theory-degree-row";
      row.innerHTML =
        `<span class="deg-num">${i + 1}</span>` +
        `<span class="deg-note">${noteName}</span>` +
        `<span class="deg-sol">${degrees.solfege[i]}</span>` +
        `<span class="deg-name">${degrees.names[i]}</span>` +
        `<span class="deg-fn">${degrees.functions[i]}</span>`;
      list.appendChild(row);
    });
    div.appendChild(list);
    return div;
  }

  function buildPentatonicPage(run, penta) {
    const div = document.createElement("div");
    const row = document.createElement("div");
    row.className = "theory-penta-row";
    const inSet = new Set(penta.indices);
    run.slice(0, 7).forEach((pitch, i) => {
      const noteName = PC_LETTER[((pitch % 12) + 12) % 12];
      const chip = document.createElement("span");
      chip.className = `penta-note ${inSet.has(i) ? "in" : "out"}`;
      chip.textContent = noteName;
      row.appendChild(chip);
    });
    div.appendChild(row);
    const note = document.createElement("p");
    note.className = "theory-note";
    note.textContent = `Drops ${penta.dropped} — leaving 5 notes that all sound good together.`;
    div.appendChild(note);
    return div;
  }

  function buildProgressionsPage(progressions) {
    const div = document.createElement("div");
    const list = document.createElement("div");
    list.className = "theory-prog-list";
    progressions.forEach(({ roman, chords, genre }) => {
      const item = document.createElement("div");
      item.className = "theory-prog-item";
      const top = document.createElement("div");
      top.className = "prog-top";
      top.innerHTML =
        `<span class="prog-roman">${roman}</span>` +
        `<span class="prog-genre">${genre}</span>`;
      const chordsEl = document.createElement("div");
      chordsEl.className = "prog-chords";
      chords.forEach((c) => {
        const chip = document.createElement("span");
        chip.className = "prog-chord";
        chip.textContent = c;
        chordsEl.appendChild(chip);
      });
      item.appendChild(top);
      item.appendChild(chordsEl);
      list.appendChild(item);
    });
    div.appendChild(list);
    return div;
  }

  return { render };
})();
