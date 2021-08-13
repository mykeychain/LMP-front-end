const COLORS = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
]

const POINT_STYLES = [
            "circle",
            "star",
            "triangle",
            "rect",
            "rectRot",
            "cross",
            "rectRounded",
            "dash",
            "line",
            "crossRot"
        ]

/** renderResults: renders container including plot and table of results */
function renderResults(reportData, formData) {
    const $resultsDiv = $("<div class='results-div'></div>");
    $resultsContainer.append($resultsDiv);
    renderPlot(reportData, $resultsDiv, formData);
    renderTable(reportData, $resultsDiv);
    $resultsDiv.append(reportTime());
}

/** renderPlot: renders and appends plot from given data set */
function renderPlot(reportData, $resultsDiv, formData) {
    let chartData = [];

    // for each data set, formats data to be compatible with chart.js
    for (let category in reportData.data) {
        let i = chartData.length;

        chartData.push({
            label: category,
            data: reportData.data[category],
            borderColor: COLORS[i],
            backgroundColor: COLORS[i],
            pointStyle: POINT_STYLES[i],
            pointRadius: 5
        });
    };

    const $myChart = $(`<canvas id='myChart' class='results-chart'></canvas>`);
    $resultsDiv.append($myChart);

    const myChart = new Chart($myChart, {
        type: 'line',
        data: {
            datasets: chartData
        },
        options: {
            parsing: {
                xAxisKey: 'interval',
                yAxisKey: 'value'
            },
            scales: {
                yAxis: {
                    title: {
                        display: true,
                        text: reportData.header["UOM"]
                    }
                },
                xAxis: {
                    title: {
                        display: true,
                        text: "HE"
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `${formData.start_date} to ${formData.end_date}`,
                    font: {
                        size: 18
                    }
                }
            }
        }
    });
}


/** renderTable: renders and appends table from given data set */
function renderTable(reportData, $resultsDiv) {
    const $tableDiv = $("<div class='table-div'></div>")
    const $resultsTable = $("<table class='results-table'></table>");
    $resultsDiv.append($tableDiv);
    $tableDiv.append($resultsTable);

    // creates and appends table header
    const $header = $("<tr></tr>");
    $header.append($("<th class='category-column'>LMP Type</th>"));
    for (let i = 1; i <= 24; i++) {
        const $heading = $(`<th>HE${i}</th>`);
        $header.append($heading);
    }
    $resultsTable.append($header);

    // fills and appends table cells with data
    for (let category in reportData.data) {
        const $row = $("<tr></tr>");
        $row.append($(`<td class='category-column'>${category}</td>`));
        for (let data of reportData.data[category]) {
            const $cell = $(`<td>${data.value}</td>`);
            $row.append($cell);
        };
        $resultsTable.append($row);
    }

    $resultsTable.on("click", "tr", toggleFocus);
}


/** toggleFocus: toggles class focus of target row */
function toggleFocus(evt) {
    const $row = $(evt.target).parent();
    $row.toggleClass("focus");
}

/** reportTime: generates and returns timestamp to display */
function reportTime() {
    const timestamp = new Date
    return $(`<p>Report generated at: ${timestamp.toLocaleString()}</p>`)
}