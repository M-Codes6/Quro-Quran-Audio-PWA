# Contributing to Quro

Thank you for your interest in contributing to Quro.

This project aims to provide a simple and beneficial platform for listening to Quran recitations and Islamic nasheeds.

---

## Ways to Contribute

You can contribute in many ways:

• Fixing bugs  
• Improving UI or UX  
• Adding new features  
• Adding new Qari recitations  
• Adding nasheeds  
• Improving documentation  

---

## Getting Started

1. Fork the repository

2. Clone your fork

```bash
git clone https://github.com/yourusername/quro.git
cd quro
npm install
npm run dev

>Creating a Pull Request

>Create a new branch
    git checkout -b feature-name

>Make your changes

>Commit your changes
    git commit -m "Add new feature"

>Push your branch
    git push origin feature-name

>Open a Pull Request

## Adding Nasheeds
  > Nasheeds are stored in:
    src/data/nasheeds.js

## Each entry should follow this format:

{
  id: 1,
  title: "Nasheed Name",
  url: "Audio URL"
}

## Adding Qari Recitations
 > Qari data is stored in:
    src/data/qaris.js

Please follow the existing structure when adding new reciters.

## Code Style

Please keep the code:
• simple
• readable
• consistent with the existing structure
Respect the Purpose

Quro is created as a Sadaqah Jariyah project.

Please ensure that contributions align with the goal of providing beneficial Islamic content.

Thank You

Your contributions help improve this project and benefit the community.

May Allah reward everyone who contributes to this effort.
