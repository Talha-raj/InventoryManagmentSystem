Here's the updated README with the additional instructions:

---

# Task Project Inventory Management System

Welcome to the Task Project Inventory Management System! Follow the instructions below to set up and run the application.

## Getting Started

### 1. Install Dependencies

First, install the project dependencies using npm:

```bash
npm install
```

### 2. Check React Native Environment

Ensure that your React Native environment is correctly set up. Make sure you have the following:

- React Native CLI
- Android Studio or Xcode (for iOS)
- Emulator or physical device connected

### 3. Verify React Native Version

This project is configured to work with React Native version 0.75.2. Ensure you have this version installed:

```bash
npx react-native --version
```

### 4. Start the JSON Server

To run the JSON server, use the following command:

```bash
npx json-server db.json
```

### 5. Forward the Port

After starting the JSON server, forward the port to host APIs locally.

### 6. Configure API Base URL

- Go to `src/utils/Api`
- Edit the `baseUrl` to match the forwarded port.

### 7. Start the React Native App

Once the JSON server is running and the API base URL is configured, start the React Native application with:

```bash
npx react-native run-android
```

### 8. App Access

**For Admin:**

- **Username:** username
- **Password:** password
- **Permissions:** View, Delete, Update, Create

**For Staff:**

- **Username:** staff
- **Password:** password
- **Permissions:** View, Update

### 9. Additional Information

I have attached app screenshots to help you visualize the user interface and functionality.

---
