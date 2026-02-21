/**
 * Core Function: Rebuild the X (Dragging Stats) array from 'all' data.
 * This will create the content for your X.js file.
 */
function rebuildXData() {
    // 1. Initialize a 40-row array (index 0 is null, 1-39 are the numbers)
    var X = [null];
    for (var i = 1; i <= 39; i++) {
        // Create row: ["01", 0, 0, ..., 0]
        var row = [i.toString().padStart(2, '0')];
        for (var m = 1; m <= 39; m++) {
            row.push(0);
        }
        X.push(row);
    }

    // 2. Data Source Check
    if (typeof all === 'undefined') {
        alert("Error: Variable 'all' not found. Please check allData.js.");
        return;
    }

    // 3. Calculation Logic (From Oldest to Newest)
    // all[j] = Yesterday, all[j-1] = Today
    for (var j = all.length - 1; j > 0; j--) {
        var lastDraw = all[j].slice(1, 6);   // Yesterday's numbers
        var thisDraw = all[j - 1].slice(1, 6); // Today's numbers

        lastDraw.forEach(function(c) {
            var rowIdx = parseInt(c); // Row index (the "dragger")
            thisDraw.forEach(function(n) {
                var colIdx = parseInt(n); // Column index (the "dragged")
                
                // Add +1 count to the specific cell
                if (X[rowIdx] && colIdx >= 1 && colIdx <= 39) {
                    X[rowIdx][colIdx]++;
                }
            });
        });
    }

    // 4. Output: Generate the string for your X.js file
    var outputString = "var X = [\nnull,\n";
    for (var k = 1; k <= 39; k++) {
        outputString += JSON.stringify(X[k]) + (k === 39 ? "" : ",\n");
    }
    outputString += "\n];";

    // 5. Display on Screen (For Tablet Copy-Paste)
    var textArea = document.createElement('textarea');
    textArea.style.cssText = "width:90%; height:400px; position:fixed; top:5%; left:5%; z-index:99999; border:5px solid blue; font-family:monospace;";
    textArea.value = outputString;
    document.body.appendChild(textArea);

    alert("Rebuild Complete! Please copy the text in the box and save it to X.js");
}

/**
 * UI: Create a Red Button on the screen
 */
(function() {
    var btn = document.createElement('button');
    btn.innerHTML = "GENERATE X DATA";
    btn.style.cssText = "position:fixed; bottom:20px; right:20px; z-index:99999; padding:20px; background:red; color:white; border-radius:10px; font-weight:bold;";
    btn.onclick = rebuildXData;
    document.body.appendChild(btn);
})();
