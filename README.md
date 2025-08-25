# API Testing Framework with Playwright

## Continuous Integration Setup

This project uses GitHub Actions for continuous integration. Tests are automatically run on:
- Every push to the `oe-2` branch
- Every pull request targeting the `oe-2` branch

### CI Pipeline Features

1. **Automated Test Execution**
   - Runs all Playwright tests
   - Uses Ubuntu latest environment
   - Node.js 18 runtime

2. **Test Reports**
   - Generates detailed HTML reports
   - Stores reports as GitHub Actions artifacts
   - Reports are retained for 30 days

3. **Email Notifications**
   - Sends automated emails after test execution
   - Includes test status (Success/Failure)
   - Provides direct link to test report
   - Notifies relevant stakeholders

### Setup Required

To enable email notifications, you need to set up the following GitHub Secrets:

1. `EMAIL_USERNAME` - Email account username (for sending notifications)
2. `EMAIL_PASSWORD` - Email account password or app-specific password
3. `NOTIFICATION_EMAIL` - Email address to receive notifications

### How to Access Test Reports

1. Go to the GitHub Actions tab in your repository
2. Click on the latest workflow run
3. Download the "playwright-report" artifact
4. Extract and open `index.html` to view the report

### Local Development

To run tests locally:
```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in debug mode
npm run test:debug
```
