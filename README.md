# Student Profile Portal App

A **React Native Expo app** that allows students to create a personal profile, select their interests, and record a short audio introduction. It features modern UI, smooth animations, input validation, and a rewarding submission animation.

---

## Features

* **Student Profile**: Input fields for Name, Class, and Gender.
* **Interest Selection**: Category and Subcategory dropdowns.
* **Audio Recording**: Record and play back a brief introduction.
* **Form Validation**: Ensures all fields and audio are completed before submission.
* **Animations**:

  * Fade + slide-in for the form.
  * Confetti animation upon successful submission.
  * Pulsing recording button for visual feedback.
* **Custom Fonts**: Poppins for modern typography.
* **Responsive Design**: Works on multiple screen sizes.
* **Reset on Submission**: Form resets after successful submission.

---

## Folder Structure

```
student-profile-portal/
├─ app/
│  └─ index.js           # App entry point
│  └─ styles.js             # Centralized styles
├─ components/
│  └─ StudentForm.js     # Main form component
├─ package.json          # Project dependencies
└─ README.md
```

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/aish05-code/Cogn.AI_Assignment
cd student-profile-portal
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Start the Expo app**

```bash
npx expo start
```

Scan the QR code with **Expo Go** on your device or run in an emulator.

---

## Usage

1. Enter your **Name** and **Class**.
2. Select **Gender**, **Interest Category**, and **Subcategory**.
3. Record your introduction using the **Record** button. Playback is available after recording.
4. Press **Submit Profile**.

   * Confetti animation appears for fun feedback.
   * Form resets automatically after submission.
5. If any input is missing, an alert prompts the user to complete it.

---

## Dependencies

* `react-native` – Core framework.
* `expo` – Development tools and build system.
* `expo-av` – Audio recording and playback.
* `expo-linear-gradient` – Gradient backgrounds.
* `@expo-google-fonts/poppins` – Custom font.
* `moti` – Animations library.
* `react-native-confetti-cannon` – Confetti animation.
* `@react-native-picker/picker` – Dropdown menus.
* `@expo/vector-icons` – Icons.

---

## Customization

* **Categories/Subcategories**: Modify the `categories` object in `StudentForm.js`.
* **Styling**: Edit `styles.js` for colors, fonts, button appearance, card shadows, etc.
* **Animations**: Adjust Moti transitions and Confetti behavior in `StudentForm.js`.
* **Fonts**: Change the font via `@expo-google-fonts` imports in `index.js` if desired.

---
