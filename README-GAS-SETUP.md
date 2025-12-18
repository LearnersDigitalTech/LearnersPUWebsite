## Google Apps Script Backend Setup

This project uses Google Apps Script as a serverless backend to handle form submissions (Enquiries, Admissions, Careers) and store data in Google Sheets.

### Prerequisites
- A Google Account (Gmail / Workspace)

### Step 1: Create the Google Sheet
1.  Go to [Google Sheets](https://sheets.google.com) and create a **New Spreadsheet**.
2.  Name it something like "Learners Website Data".
3.  **Copy the Spreadsheet ID** from the URL.
    - URL format: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
    - You will need this ID for the script configuration.

### Step 2: Set up the Script
1.  In your Google Sheet, go to **Extensions > Apps Script**.
2.  Rename the project to "Learners Website Backend".
3.  Delete any code in `Code.gs` and replace it with the code below:

    ```javascript
    /**
     * Google Apps Script for Learners PU College
     * Handles form submissions for Enquiries, Careers, and Admissions.
     * 
     * INSTRUCTIONS:
     * 1. Create a new Google Sheet.
     * 2. Go to Extensions > Apps Script.
     * 3. Paste this code into Code.gs.
     * 4. Run the 'setup' function once to create the necessary sheets.
     * 5. Deploy as Web App:
     *    - Click 'Deploy' > 'New deployment'
     *    - Select type: 'Web app'
     *    - Description: 'v1'
     *    - Execute as: 'Me' (your email)
     *    - Who has access: 'Anyone' (IMPORTANT)
     *    - Click 'Deploy'
     *    - Copy the 'Web App URL' and provide it to the developer.
     */

    // CONFIGURATION
    var NOTIFICATION_EMAIL = "abhishekmys03@gmail.com"; // Change this to your email
    var SHEET_NAMES = {
        INQUIRY: "Enquiries",
        CAREER: "Careers",
        ADMISSION: "Admissions"
    };

    // IMPORTANT: If your script is NOT created inside the Google Sheet (Standalone), 
    // you MUST paste your Spreadsheet ID below.
    // You can find the ID in the URL of your Google Sheet: docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
    var SPREADSHEET_ID = "1aEidiYe9b7l8YeWDHOxsjhfhq8spBfZGledoeJRHdL4"; // ID provided by user

    function getSpreadsheet() {
        if (SPREADSHEET_ID) {
            return SpreadsheetApp.openById(SPREADSHEET_ID);
        }
        return SpreadsheetApp.getActiveSpreadsheet();
    }

    function setup() {
        var ss = getSpreadsheet();
        if (!ss) {
            throw new Error("Spreadsheet not found. Please set SPREADSHEET_ID.");
        }

        // Create sheets if they don't exist
        createSheetIfNotExists(ss, SHEET_NAMES.INQUIRY, ["Date", "First Name", "Last Name", "Email", "Phone", "Type", "Message", "Newsletter"]);
        createSheetIfNotExists(ss, SHEET_NAMES.CAREER, ["Date", "Full Name", "Email", "Phone", "Position", "Experience", "Current Salary", "Qualification", "Cover Letter", "Resume URL"]);
        createSheetIfNotExists(ss, SHEET_NAMES.ADMISSION, ["Date", "First Name", "Last Name", "Email", "Phone", "Course Preference", "Grade/Class", "Message"]);
    }

    function createSheetIfNotExists(ss, name, headers) {
        var sheet = ss.getSheetByName(name);
        if (!sheet) {
            sheet = ss.insertSheet(name);
            sheet.appendRow(headers);
            sheet.setFrozenRows(1);
        }
        return sheet;
    }

    function doPost(e) {
        var lock = LockService.getScriptLock();
        lock.tryLock(10000);

        try {
            var params = JSON.parse(e.postData.contents);
            var type = params.type;
            var ss = getSpreadsheet();
            if (!ss) {
                throw new Error("Spreadsheet not found. Please set SPREADSHEET_ID.");
            }
            var timestamp = new Date();

            if (type === 'inquiry') {
                handleInquiry(ss, params, timestamp);
            } else if (type === 'career') {
                handleCareer(ss, params, timestamp);
            } else if (type === 'admission') {
                handleAdmission(ss, params, timestamp);
            } else {
                return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Invalid form type' })).setMimeType(ContentService.MimeType.JSON);
            }

            return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);

        } catch (e) {
            return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() })).setMimeType(ContentService.MimeType.JSON);
        } finally {
            lock.releaseLock();
        }
    }

    // --- Email Helper ---
    function generateHtmlBody(title, fields) {
        var rows = "";
        for (var key in fields) {
            if (fields.hasOwnProperty(key)) {
                rows += `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555; font-weight: bold; width: 30%;">${key}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${fields[key] || "-"}</td>
            </tr>`;
            }
        }

        return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1e3a8a; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px;">${title}</h2>
          </div>
          <div style="padding: 20px; background-color: #fafafa;">
            <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              ${rows}
            </table>
          </div>
          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; color: #888; font-size: 12px;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Learners PU College. All rights reserved.</p>
            <p style="margin: 5px 0 0;">This is an automated message from your website.</p>
          </div>
        </div>
      `;
    }

    function sendNotification(subject, htmlBody) {
        if (NOTIFICATION_EMAIL) {
            MailApp.sendEmail({
                to: NOTIFICATION_EMAIL,
                subject: subject,
                htmlBody: htmlBody
            });
        }
    }

    // --- Handlers ---

    function handleInquiry(ss, data, timestamp) {
        var sheet = ss.getSheetByName(SHEET_NAMES.INQUIRY);
        sheet.appendRow([
            timestamp,
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.inquiryType,
            data.message,
            data.newsletter
        ]);

        var htmlBody = generateHtmlBody("New Website Inquiry", {
            "Type": data.inquiryType,
            "Name": data.firstName + " " + data.lastName,
            "Email": data.email,
            "Phone": data.phone,
            "Message": data.message,
            "Newsletter": data.newsletter
        });

        sendNotification("New Inquiry: " + data.inquiryType, htmlBody);
    }

    function handleCareer(ss, data, timestamp) {
        var sheet = ss.getSheetByName(SHEET_NAMES.CAREER);
        var resumeUrl = data.resumeLink || "";

        sheet.appendRow([
            timestamp,
            data.fullName,
            data.email,
            data.phone,
            data.position,
            data.experience,
            data.currentSalary,
            data.qualification,
            data.coverLetter,
            resumeUrl
        ]);

        var htmlBody = generateHtmlBody("New Career Application", {
            "Position": data.position,
            "Name": data.fullName,
            "Email": data.email,
            "Phone": data.phone,
            "Experience": data.experience,
            "Qualification": data.qualification,
            "Current Salary": data.currentSalary,
            "Resume Link": resumeUrl ? `<a href="${resumeUrl}" style="color: #1e3a8a; text-decoration: underline;">View Resume</a>` : "Not provided",
            "Cover Letter": data.coverLetter
        });

        sendNotification("Career Application: " + data.position, htmlBody);
    }

    function handleAdmission(ss, data, timestamp) {
        var sheet = ss.getSheetByName(SHEET_NAMES.ADMISSION);
        sheet.appendRow([
            timestamp,
            data.firstName,
            data.lastName,
            data.email,
            data.phone,
            data.course,
            data.grade,
            data.message
        ]);

        var htmlBody = generateHtmlBody("New Admission Request", {
            "Course": data.course.toUpperCase(),
            "Name": data.firstName + " " + data.lastName,
            "Email": data.email,
            "Phone": data.phone,
            "Grade/Class": data.grade,
            "Message": data.message
        });

        sendNotification("Admission Request: " + data.course, htmlBody);
    }
    ```
4.  **Important:** Find the line `var SPREADSHEET_ID = "...";` in the code and paste your **Spreadsheet ID** from Step 1.
5.  Change `var NOTIFICATION_EMAIL = "...";` to the email address where you want to receive notifications.

### Step 3: Run Setup
1.  In the Apps Script editor toolbar, select the function **`setup`** from the dropdown menu.
2.  Click **Run**.
3.  You will be asked to **Review Permissions**.
    - Click "Review Permissions".
    - Choose your Google Account.
    - If you see "Google hasn't verified this app", click **Advanced** > **Go to ... (unsafe)**.
    - Click **Allow**.
4.  This `setup` function will automatically create the required "Enquiries", "Careers", and "Admissions" sheets with the correct headers in your spreadsheet.

### Step 4: Deploy as Web App
1.  Click the blue **Deploy** button (top right).
2.  Select **New deployment**.
3.  Click the gear icon next to "Select type" and choose **Web app**.
4.  Fill in the details:
    - **Description**: `v1` (or any description)
    - **Execute as**: `Me` (your email address)
    - **Who has access**: `Anyone` (**Critical**: Must be 'Anyone' so the website can send data without user login).
5.  Click **Deploy**.
6.  **Copy the Web App URL** (starts with `https://script.google.com/macros/s/...`).

### Step 5: Connect Frontend
1.  In your Next.js project, open (or create) `.env.local`.
2.  Add the URL you copied in Step 4:
    ```env
    GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
    ```
3.  Restart your local development server (`npm run dev`) to load the new environment variable.

### Updating the Script
If you modify the Google Apps Script code (e.g., adding fields or changing email templates):
1.  Save the code.
2.  **You MUST deploy a NEW VERSION for changes to take effect.**
3.  Click **Deploy > Manage deployments**.
4.  Click the **Edit (pencil)** icon on the active deployment.
5.  Change **Version** to **"New version"**.
6.  Click **Deploy**.
