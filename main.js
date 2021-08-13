"use strict"

// const axios = require("axios");
const BASE_URL = "https://mchang-lmp-back-end.herokuapp.com/api/LMP";

const $resultsContainer = $("#results");


/** getFormData: gets and returns data from form as object
 *      returns: {
 *                  start_date: 2021-08-01,
 *                  end_date: 2021-08-02,
 *                  market_id: "DAM",
 *                  node: "0096WD_7_N001"
 *                }
 * 
 */
function getFormData() {
    const start_date = $("#form-start-date").val();
    const end_date = $("#form-end-date").val();
    const market_id = $("#form-market-id").val();
    const node = $("#form-node").val();

    return { start_date, end_date, market_id, node };
}


/** getCaisoDataAndDisplay: conductor function, gets Caiso data and renders plot */
async function getCaisoDataAndDisplay() {
    const formData = getFormData();
    const caisoReport = await getCaisoReport(formData);
    renderResults(caisoReport, formData);
}


/** Event listener for submission of search parameters */
$("#form").on("submit", async function(evt){
    evt.preventDefault();
    await getCaisoDataAndDisplay();
})