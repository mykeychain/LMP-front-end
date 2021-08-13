/** getCaisoReport: gets report from API
 *      accepts: { start_date, end_date, market_id, node }
 *      returns: {
 *                  header: {
 *                              UOM: "US$/MWh",
 *                              MKT_TYPE: "LMP"
 *                          },
 *                  data: {
 *                          LMP: [{interval, value}, {interval, value}, ...],
 *                          Energy: [{interval, value}, {interval, value}, ...],
 *                          ...
 *                        }
 *               }
 * 
 */
 async function getCaisoReport(formData) {
    const response = await axios.post(BASE_URL, formData);
    return response.data;
}