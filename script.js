document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("output");

  // Add the "Loading..." row with id="loading"
  const loadingRow = document.createElement("tr");
  loadingRow.setAttribute("id", "loading");
  loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
  output.appendChild(loadingRow);

  // Helper function to create a promise that resolves after a random time
  function createPromise(name) {
    return new Promise((resolve) => {
      const time = (Math.random() * 2 + 1).toFixed(3); // Time between 1 and 3 seconds
      setTimeout(() => {
        resolve({ name, time });
      }, time * 1000);
    });
  }

  // Create 3 promises
  const promises = [
    createPromise("Promise 1"),
    createPromise("Promise 2"),
    createPromise("Promise 3"),
  ];

  const startTime = performance.now();

  // Wait for all promises to resolve
  Promise.all(promises).then((results) => {
    const endTime = performance.now();
    const totalTime = ((endTime - startTime) / 1000).toFixed(3);

    // Remove the "Loading..." row
    output.removeChild(loadingRow);

    // Populate the table with the results
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${result.name}</td><td>${result.time}</td>`;
      output.appendChild(row);
    });

    // Add the total time row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
    output.appendChild(totalRow);
  });
});
