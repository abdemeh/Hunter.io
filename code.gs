// Function to find email using Hunter.io API
function FindEmail(firstName, lastName, companyName) {
  var apiKey = PropertiesService.getUserProperties().getProperty('HUNTER_API_KEY');
  if (!apiKey) {
    throw new Error('API key not set. Please set your API key in the settings.');
  }

  // Get the domain from the company name
  var domainUrl = 'https://api.hunter.io/v2/domain-search?company=' + encodeURIComponent(companyName) + '&api_key=' + apiKey;
  try {
    var domainResponse = UrlFetchApp.fetch(domainUrl, {muteHttpExceptions: true});
    var domainJson = domainResponse.getContentText();
    var domainData = JSON.parse(domainJson);

    if (domainResponse.getResponseCode() !== 200) {
      return 'Error fetching domain: ' + (domainData.errors && domainData.errors[0] ? domainData.errors[0].details : 'Unknown error');
    }

    if (domainData.data && domainData.data.domain) {
      var domain = domainData.data.domain;
    } else {
      return 'Domain not found for company';
    }
  } catch (e) {
    return 'Error fetching domain: ' + e.message;
  }

  // Use the domain to find the email
  var emailUrl = 'https://api.hunter.io/v2/email-finder?domain=' + domain + '&first_name=' + firstName + '&last_name=' + lastName + '&api_key=' + apiKey;
  try {
    var emailResponse = UrlFetchApp.fetch(emailUrl, {muteHttpExceptions: true});
    var emailJson = emailResponse.getContentText();
    var emailData = JSON.parse(emailJson);

    if (emailResponse.getResponseCode() !== 200) {
      return 'Error fetching email: ' + (emailData.errors && emailData.errors[0] ? emailData.errors[0].details : 'Unknown error');
    }

    if (emailData.data && emailData.data.email) {
      return emailData.data.email;
    } else {
      return 'Email not found';
    }
  } catch (e) {
    return 'Error fetching email: ' + e.message;
  }
}

// Function to create a custom menu on Google Sheets
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Icypeas')
    .addItem('⚙️ Settings', 'showSidebar')
    .addToUi();
}
// Function to display the sidebar for entering API key
function showSidebar() {
  var apiKey = PropertiesService.getUserProperties().getProperty('HUNTER_API_KEY') || '';
  var html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Icypeas Settings')
      .setWidth(300)
      .append('<script>var apiKey = "' + apiKey + '"; document.getElementById("apiKey").value = apiKey;</script>'); // Pass the API key to the HTML template and set the input value
  SpreadsheetApp.getUi().showSidebar(html);
}

// Function to save the API key to user properties and validate it
function saveApiKey(apiKey) {
  var response = testApiKey(apiKey);
  if (response === 'API key is valid.') {
    PropertiesService.getUserProperties().setProperty('HUNTER_API_KEY', apiKey);
  }
  return response;
}

// Function to test the validity of the API key
function testApiKey(apiKey) {
  var testUrl = 'https://api.hunter.io/v2/account?api_key=' + apiKey;
  try {
    var testResponse = UrlFetchApp.fetch(testUrl, { muteHttpExceptions: true });
    var testStatusCode = testResponse.getResponseCode();
    if (testStatusCode === 200) {
      return '<p class="has-text-success" role="alert">API key is valid.</p>';
    } else if (testStatusCode == 401) {
      return '<p class="has-text-danger" role="alert">Unauthorized: Invalid API key.</p>';
    } else if (testStatusCode == 403) {
      return '<p class="has-text-danger" role="alert">Forbidden: You have reached the rate limit.</p>';
    } else if (testStatusCode == 429) {
      return '<p class="has-text-danger" role="alert">Too many requests: You have reached your usage limit.</p>';
    } else {
      return '<p class="has-text-danger" role="alert">HTTP Status Code: '+testStatusCode + ': ' + testResponse.getContentText()+'</p>';
    }
  } catch (e) {
    return '<p class="has-text-danger" role="alert">Error: '+e.message+'</p>';
  }
}