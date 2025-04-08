# DND-Inventory-Manager  
**D&D Inventory & Campaign Manager** – A tool to track character inventories, manage campaign notes, and organize game sessions efficiently. Features include item tracking, party management, and session logs. Built for DMs and players alike!

---

# DND Inventory Manmager  

## General Description  
This application is designed to be a D&D group's new best friend! It provides a convenient and easy way for players to manage their character sheets without having to constantly erase information. It also displays details about all their items from the *D&D Handbook*, so they don't have to look anything up! DMs will have tools to manage their sessions and campaigns, and can take notes for individual sessions or the overall campaign to share with players—ensuring everyone has access to the same information.

---

## Feature List  

### Must-Have Features  
- Log in  
- Helpful Character Sheets  
  - Display the most important information by default  
  - Name, backstory, class & level, race, alignment, XP, etc.  
  - Individual campaign notes  
- Inventory management  
  - API integration to display item descriptions  
  - Support for custom items  
- Highlight equipped weapons/armor  
- Currency conversion and tracking  
- DM access to party member information  
- DM campaign notes that are viewable by players  

### Nice-to-Have Features  
- Modular character sheets (customizable layout)  
- Audio transcription with written summaries  
- Item categorization (e.g., view all healing items in one search)  
- Automatic AC and attack bonus updates based on equipped items  
- Character sheet creation helper (auto-calculate stats)  
- Party management (trade items between characters, view other character backstories if allowed)

---

## Technical Challenges  
- Supporting both DM and player views will require conditional logic and role-based access  
- Managing view/edit permissions based on campaign and user role  
- Ensuring proper visibility of character info based on campaign membership  
- Learning and integrating with the item description API

- Link to website: [https://www.dnd5eapi.co/](https://www.dnd5eapi.co/)  
- API Link: [https://www.dnd5eapi.co/api/2014/](https://www.dnd5eapi.co/api/2014/)

---

## Requirements  

1. This application will use **React** for the frontend to dynamically display user input, character sheet data, and campaign/session info. **Django** will serve as the backend for data storage and authentication.  
2. There will be a landing page, a login page, a "Players" page (for managing character sheets, inventory, personal notes, session notes, etc.), and a "DM" page (for managing party data and campaign/session notes).  
3. A login system is required. Each user can have multiple characters and campaigns.  
4. This application aims to eliminate the tediousness of managing paper character sheets and streamline session/campaign management for DMs, providing unified notes for everyone.  
5. The app will feature consistent CSS and styling across all pages to create a unified look and feel.  
6. Users can create multiple characters and campaigns, each of which can contain any number of items, quests, notes, etc.

---

## Group Members  

- **Group 1**  
- **Charlie Miner**  
  - A02325182  
- **Chandler Neeley**  
  - A02429680