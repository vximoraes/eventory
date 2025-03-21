# 🗓️ Event Management 
Development of a TypeScript application that manages events and users through an SQLite database, facilitating the administration of events, users, and logs of actions performed within the system.

![Image](https://github.com/user-attachments/assets/27b3fc5a-0689-4874-a62e-d5b092b5c30a)

## 🛠️ Tecnologias
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

## ✨ Features
- **Event Management:** Allows adding, listing, retrieving by ID, updating, and deleting events.
- **User Management:** Allows adding, listing, retrieving by ID, updating, and deleting users.
- **Log Recording:** All actions performed on events and users (insert, update, delete) are recorded in a log file, including the log ID, responsible user, date/time, and action taken.
- **Data Validation:** Validations to ensure that the input data is accurate.
- **SQLite Database: Data persistence using SQLite.**

## 🏃‍♂️ Running Locally

### Prerequisites

- Node.js installed on your machine.
- NPM or Yarn to manage packages.

### Steps to run the project

1. Clone the repository:
```bash
git clone https://github.com/vximoraes/eventory.git
```

2. Navigate to the project directory:
```bash
cd eventory 
```

3. Install the dependencies:
```bash
npm install  
```

4. Build the TypeScript:
```bash
npm run build
```

5. Run the project:
```bash
npm run start 
```
6. When starting the application, you will be prompted to log in. Use the following default credentials:

  - Username: ```Admin```
  - Password: ```#Admin12345```

## ⌨️ Navigation in the Interface
The application features an interactive interface that allows navigation through options using the Arrow Keys (⬆️⬇️) and the Enter key (↩️) to select the desired option. This makes using the system more intuitive and easy to operate.
