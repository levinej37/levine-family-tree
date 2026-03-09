# Levine Family Tree 🌳

A collaborative, password-protected family genealogy app built with React + Firebase + Vite. Deployable to Vercel for free.

---

## Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/levine-family-tree.git
cd levine-family-tree
npm install
```

### 2. Set Up Firebase

1. Go to [firebase.google.com](https://firebase.google.com) and sign in
2. Click **Add Project** → name it `levine-family-tree`
3. Skip Google Analytics (optional)
4. In the left sidebar: **Build → Realtime Database**
5. Click **Create Database** → choose a region → start in **Test Mode**
6. In the left sidebar: **Project Settings (gear icon) → General**
7. Scroll to **Your Apps** → click the `</>` web icon → register the app
8. Copy your Firebase config values

### 3. Create `.env.local`
Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:
```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=levine-family-tree.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://levine-family-tree-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=levine-family-tree
VITE_FIREBASE_STORAGE_BUCKET=levine-family-tree.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abc123

# Change this to your own secret family passcode
VITE_FAMILY_PASSCODE=YourSecretPasscodeHere
```

### 4. Run Locally
```bash
npm run dev
```
Visit: http://localhost:5173

The app will auto-seed Firebase with all the Levine family data on first run.

---

## Deploy to Vercel

### Option A: Via Vercel Dashboard (easiest)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. In **Environment Variables**, add all keys from your `.env.local`
5. Click **Deploy**

### Option B: Via CLI
```bash
npm install -g vercel
vercel
```

### After deploying:
- Share your Vercel URL with family for **viewing**
- Share the passcode separately (via text/email) for those who can **edit**

---

## How It Works

### Viewing (anyone with the link)
- Browse the family tree diagram
- Click any person to see their profile, relationships, and bio
- Search for family members by name, birthplace, or bio

### Editing (requires passcode)
1. Click **🔒 Edit Mode** in the top right
2. Enter the family passcode
3. The banner turns green: **✓ Editing Unlocked**
4. Add, edit, or delete family members
5. All changes sync instantly to Firebase and are visible to everyone
6. Click **🔓 Lock** to return to view-only mode

---

## Firebase Security Rules

Once you're done testing, update your Firebase Realtime Database rules to be more secure. In the Firebase Console → Realtime Database → Rules:

```json
{
  "rules": {
    "people": {
      ".read": true,
      ".write": true
    }
  }
}
```

> **Note:** The current setup uses a client-side passcode for simplicity. For a more secure setup, consider implementing Firebase Authentication with email/password or anonymous auth tied to the passcode. This is a great next step if you want to prevent anyone from writing directly to your database URL.

---

## Adding More Family Members

1. Click **Edit Mode** and enter the passcode
2. Click **+ Add Person**
3. Fill in their details and link them to parents/spouses
4. Hit **Save** — they'll appear in the tree immediately

---

## Family Heritage Summary

The Levine family tree spans four distinct heritage lines:

| Heritage | Family Names | Origin |
|----------|-------------|--------|
| 🕍 Ashkenazi Jewish | Shemin, Levine, Solomon, Altschuler | Mogilev, Belarus |
| 🇸🇪 Swedish | Horne | Sweden |
| 🇮🇪 Irish | O'Hanrahan | Ireland |
| 🇮🇹 Italian | Catanzaro (Terhune) | Italy |

---

## Project Structure

```
levine-family-tree/
├── src/
│   ├── components/
│   │   ├── Avatar.jsx          # Profile avatar with initials fallback
│   │   ├── LoginModal.jsx      # Passcode entry modal
│   │   ├── PeopleList.jsx      # Grid view of all members
│   │   ├── PersonCard.jsx      # Individual card in tree view
│   │   ├── ProfileModal.jsx    # Edit/view profile form
│   │   ├── ProfilePanel.jsx    # Side panel for selected person
│   │   └── TreeView.jsx        # Visual family tree diagram
│   ├── data/
│   │   └── familyData.js       # All seed data + helper functions
│   ├── hooks/
│   │   ├── useAuth.js          # Passcode authentication
│   │   └── usePeople.js        # Firebase data sync
│   ├── App.jsx                 # Main app component
│   ├── firebase.js             # Firebase config + CRUD helpers
│   ├── main.jsx                # Entry point
│   └── theme.js                # Design tokens + global styles
├── .env.example                # Environment variable template
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## Questions?

Contact James Levine or open a GitHub Issue.
