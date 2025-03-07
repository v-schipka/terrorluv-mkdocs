---
icon: material/calculator
---

# Kampf-Rechner

<form id="valuesForm">
    <label for="angriffskraft">Angriffskraft:</label>
    <input type="number" id="angriffskraft" name="angriffskraft" max="80000000" step="any" required>
    <br><br>
    <label for="ko">Knock-Outs:</label>
    <input type="number" id="ko" name="ko" max="1000" required>
    <br><br>
    <button type="submit">Berechnen</button>
</form>
<p class="prompt" id="fight-result"></p>
<p class="prompt" id="fight-result-ele-plus"></p>
<div id="filtered-table-container"></div>


<div class="sheet-container" data-range="truppen!A1:H45" data-ignore="1,2,4" data-sort-numeric="1,2,3,4,5,6,7"></div>

