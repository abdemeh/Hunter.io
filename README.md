# Google Sheets Add-on: Hunter.io Email Finder

## Objective
The objective of this project is to create a Google Sheets add-on that integrates with the Hunter.io API to facilitate the discovery of email addresses and display the results directly within the spreadsheet.

## Usage
Once the add-on is installed, you can access it via the custom menu:
1. Click on the `Icypeas` menu.
2. Select `⚙️ Settings` to enter your Hunter.io API key.
3. Input the required data (first names, last names, and company names or websites) in the respective columns.
4. Use the custom formula `=FindEmail(A2,B2,C2)` in the desired cell to trigger the email address discovery process.

## Features
- Seamless integration with the Hunter.io API.
- User-friendly interface directly within Google Sheets.
- Error handling for API key:
  - If the API key is valid.
  - If the API returns an unauthorized error (invalid API key).
  - If the API returns a forbidden error (rate limit reached).
  - If the API returns a too many requests error (usage limit reached).
- Error handling for email search:
  - If the company domain was not found.
  - If the email was not found.

## Development Environment Setup
To set up the development environment for this project, follow these steps:
1. Create a Google Apps Script project linked to a Google Sheet.
2. Set up Hunter.io API authentication with your Google Account.
3. Follow the steps outlined in the Hunter.io API documentation: [API Documentation](https://hunter.io/api-documentation)

## Dependencies
- [Bulma CSS](https://bulma.io): Used for styling the sidebar interface.
- [Font Awesome](https://fontawesome.com): Provides icons for the user interface.

## Contributing
Contributions are welcome! Please feel free to submit issues or pull requests.

## Screenshots
![API Success](https://github.com/abdemeh/Hunter.io/blob/main/screenshots/api-success.png?raw=true)
![API Error](https://github.com/abdemeh/Hunter.io/blob/main/screenshots/api-error.png?raw=true)

