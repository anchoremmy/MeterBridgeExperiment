document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculateButton");
  const knownResistanceInput = document.getElementById(
    "knownResistanceInput"
  );
  const totalResistanceInput1 = document.getElementById(
    "totalResistanceInput1"
  );
  const totalResistanceInput2 = document.getElementById(
    "totalResistanceInput2"
  );
  const resultTableBody = document.getElementById("resultTableBody");
  const wireLength = 100; // Total length of the meter bridge wire in cm

  calculateButton.addEventListener("click", function () {
    calculateLengths();
  });

  knownResistanceInput.addEventListener("input", function () {
    calculateLengths();
  });

  function calculateLengths() {
    const knownResistance = parseFloat(knownResistanceInput.value);
    const totalResistance1 = parseFloat(totalResistanceInput1.value);
    const totalResistance2 = parseFloat(totalResistanceInput2.value);

    if (
      isNaN(knownResistance) ||
      isNaN(totalResistance1) ||
      isNaN(totalResistance2)
    ) {
      alert(
        "Please enter valid numbers for known resistance and both unknown resistances."
      );
      return;
    }

    if (
      knownResistance <= 0 ||
      totalResistance1 <= 0 ||
      totalResistance2 <= 0
    ) {
      alert("Resistance values must be positive numbers.");
      return;
    }

    const lengths = [100, 90, 80, 70, 60]; // Lengths of the unknown resistance wires
    resultTableBody.innerHTML = "";

    lengths.forEach((length) => {
      addRow(length, knownResistance, totalResistance1, totalResistance2);
    });
  }

  function addRow(
    length,
    knownResistance,
    totalResistance1,
    totalResistance2
  ) {
    const resistance1 = (totalResistance1 * length) / wireLength;
    const leftLength1 =
      (knownResistance * wireLength) / (knownResistance + resistance1);
    const rightLength1 = wireLength - leftLength1;

    const resistance2 = (totalResistance2 * length) / wireLength;
    const leftLength2 =
      (knownResistance * wireLength) / (knownResistance + resistance2);
    const rightLength2 = wireLength - leftLength2;

    const row = document.createElement("tr");
    row.innerHTML = `
              <td><input type="number" value="${length}" class="lengthInput"></td>
              <td>${leftLength1.toFixed(2)}</td>
              <td>${rightLength1.toFixed(2)}</td>
              <td>${resistance1.toFixed(2)}</td>
              <td>${leftLength2.toFixed(2)}</td>
              <td>${rightLength2.toFixed(2)}</td>
              <td>${resistance2.toFixed(2)}</td>
          `;
    resultTableBody.appendChild(row);

    row
      .querySelector(".lengthInput")
      .addEventListener("change", function (event) {
        const newLength = parseFloat(event.target.value);
        if (!isNaN(newLength) && newLength > 0) {
          updateRow(
            row,
            newLength,
            knownResistance,
            totalResistance1,
            totalResistance2
          );
        } else {
          alert("Length value must be a positive number.");
          event.target.value = length; // Reset to the original length if invalid input
        }
      });
  }

  function updateRow(
    row,
    length,
    knownResistance,
    totalResistance1,
    totalResistance2
  ) {
    const resistance1 = (totalResistance1 * length) / wireLength;
    const leftLength1 =
      (knownResistance * wireLength) / (knownResistance + resistance1);
    const rightLength1 = wireLength - leftLength1;

    const resistance2 = (totalResistance2 * length) / wireLength;
    const leftLength2 =
      (knownResistance * wireLength) / (knownResistance + resistance2);
    const rightLength2 = wireLength - leftLength2;

    row.cells[1].textContent = leftLength1.toFixed(2);
    row.cells[2].textContent = rightLength1.toFixed(2);
    row.cells[3].textContent = resistance1.toFixed(2);
    row.cells[4].textContent = leftLength2.toFixed(2);
    row.cells[5].textContent = rightLength2.toFixed(2);
    row.cells[6].textContent = resistance2.toFixed(2);
  }

  // Trigger the initial calculation with default values
  calculateLengths();
});