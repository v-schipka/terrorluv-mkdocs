---
icon: material/calculator
---

# Kampf-Rechner


<form id="valuesForm">
    <label for="angriffskraft">Angriffskraft:</label><br>
    <input type="number" id="angriffskraft" name="angriffskraft" max="80000000" step="any" required><br>
    <label for="ko">Knock-Outs:</label><br>
    <input type="number" id="ko" name="ko" max="1000" required><br>

  <button type="submit">Berechnen</button>
</form>

<div class="results-container">
  <p id="fight-result">Ohne Elemente:</p>
  <p id="fight-result-ele-plus">Mit Element-Vorteil:</p>
</div>

<hr>

### Truppenstärken

<div class="sheet-container" data-range="truppen!A1:H45" data-ignore="1,2,4" data-sort-numeric="1,2,3,4,5,6,7"></div>


