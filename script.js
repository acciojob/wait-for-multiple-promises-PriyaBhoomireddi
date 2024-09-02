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
describe('Promise Table Test', () => {
  it('should display "Loading..." and then show resolved promises with time taken', () => {
    cy.visit(baseUrl + "/main.html");

    // Check for the loading text
    cy.get("tr#loading", { timeout: 10000 }) // Increased timeout to ensure element is found
      .find("td")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("Loading...");
      });

    // Wait for the promises to resolve and check the results
    cy.get("tbody#output tr")
      .should('have.length', 4) // Ensure there are 4 rows after loading (3 promises + total)
      .then((rows) => {
        cy.wrap(rows[0]).find('td').first().should('have.text', 'Promise 1');
        cy.wrap(rows[1]).find('td').first().should('have.text', 'Promise 2');
        cy.wrap(rows[2]).find('td').first().should('have.text', 'Promise 3');
        cy.wrap(rows[3]).find('td').first().should('have.text', 'Total');
      });
  });
});
