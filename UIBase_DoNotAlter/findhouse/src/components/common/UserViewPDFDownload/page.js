//this function will return the staticHeaders
const getStaticHeaders = (userFieldType) => {
  if (userFieldType == "appraiserCompany_Datails") {
    return [
      ["order_id", "Order Id"],
      ["address", "Address"],
      ["assigned_appraiser", "Assigned Appraiser"],
      ["status", "Status"],
      ["appraisal_status", "Appraisal Status"],
      ["remark", "Remark"],
      ["urgency", "Urgency"],
      ["date", "Submission Date"],
      ["type_of_building", "Type Of Building"],
      ["estimated_value", "Estimated Property Value ($)"],
      ["type_of_appraisal", "Type Of Appraisal"],
      ["purpose", "Purpose"],
      ["lender_information", "Lender Information"],
    ];
  }
};

//this function to extract element
function extractTextFromReactElement(element) {
  if (typeof element === "string") {
  } else if (Array.isArray(element)) {
    return element.map((child) => extractTextFromReactElement(child)).join("");
  } else if (typeof element === "object" && element !== null) {
    return extractTextFromReactElement(element.props.children);
  } else {
    return "";
  }
}

const getCreatedByName = (userFieldType) => {
  const userInfo = JSON.parse(localStorage.getItem("user")) || {};
  if (userFieldType === "appraiserCompany_Datails") {
    return `${userInfo?.[userFieldType]?.officeContactFirstName || "John"} ${
      userInfo?.[userFieldType]?.officeContactFirstName || "Doe"
    }`;
  }
  return `John Doe`;
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};

function getFormattedDate() {
  const date = new Date();
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const getTheDownloadView = (userFieldType, allData, pdfTitle) => {
  return new Promise((resolve, reject) => {
    try {
      const staticHeaders = getStaticHeaders(userFieldType);

      const printContent = `
          <html>
            <head>
              <script>document.title = 'kjshak';</script>
              <style>
                @media print {
                  @page {
                    size: landscape;
                    margin: 0;
                  }
                  body {
                    margin: 10mm;
                    padding: 10mm;
                  }
                  .header, .footer {
                    width: 100%;
                    position: fixed;
                    text-align: center;
                    background: white;
                  }
                  .header {
                    top: 0;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #ddd;
                  }
                  .footer {
                    bottom: 0;
                    padding-top: 10px;
                    border-top: 1px solid #ddd;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                  }
                  .logo img {
                    width: 60px;
                    height: 45px;
                  }
                  .title {
                    font-size: 24px;
                    font-weight: bold;
                  }
                  .table-container {
                    margin-top: 80px;
                    margin-bottom: 80px;
                    page-break-before: always;
                  }
                  table {
                    width: 100%;
                    border-collapse: collapse;
                  }
                  th, td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: left;
                  }
                  h3 {
                    page-break-before: always;
                    text-align: center;
                    font-size: 20px;
                  }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="logo">
                  <img src="/assets/images/Appraisal_Land_Logo.png" alt="header-logo2.png"/>
                </div>
                <div class="title">
                  <span style="color: #2e008b;">Appraisal</span>
                  <span style="color: #97d700;">Land</span>
                </div>
              </div>
  
              <div class="footer">
                <div class="footer-main">
                  <a href="https://appraisalland.ca/" target="_blank" style="color: #2e008b; text-decoration: underline;">
                    Appraisal Land
                  </a>
                  <span>© ${getCurrentYear()} All Rights Reserved.</span>
                </div>
                <div class="footer-content" style="margin-left: -10%">
                  <span>Created By: ${getCreatedByName(userFieldType)}</span>
                  <span>Created At: ${getFormattedDate()}</span>
                </div>
              </div>
  
              <div class="table-container">
                <h3>${pdfTitle}</h3>
                <table>
                  <thead>
                    <tr>
                      ${staticHeaders
                        .map((header) => `<th>${header[1]}</th>`)
                        .join("")}
                    </tr>
                  </thead>
                  <tbody>
                    ${allData
                      .map(
                        (item) => `
                        <tr>
                        ${staticHeaders
                          .map((header) => {
                            if (
                              header[0].toLowerCase() === "appraisal_status" ||
                              header[0].toLowerCase() === "status" ||
                              header[0]?.toLowerCase() === "assigned_appraiser"
                            ) {
                              const value = item[header[0].toLowerCase()];
                              const className = value.props.className;
                              const content =
                                header[0].toLowerCase() === "appraisal_status"
                                  ? extractTextFromReactElement(
                                      value.props.children
                                    )?.split("Current Status")[0]
                                  : value.props.children;

                              const color = className.includes("btn-warning")
                                ? "#E4A11B"
                                : className.includes("btn-danger")
                                ? "#DC4C64"
                                : className.includes("btn-success")
                                ? "#14A44D"
                                : "#54B4D3";

                              return `<td style="color: ${color};">${content}</td>`;
                            } else {
                              const updatedValue =
                                item[header[0].toLowerCase()];
                              return `<td>${
                                updatedValue == undefined
                                  ? "N.A."
                                  : updatedValue
                              }</td>`;
                            }
                          })
                          .join("")}
                      </tr>
                      `
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </body>
          </html>`;

      const printWindow = window.open("", "", "width=1200,height=800");

      if (!printWindow) {
        reject(new Error("Failed to open print window"));
        return;
      }

      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();

      printWindow.onload = function () {
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
          resolve("Printed successfully");
        };
      };
    } catch (error) {
      console.error({ error });
      reject(new Error("Error handling print"));
    }
  });
};
