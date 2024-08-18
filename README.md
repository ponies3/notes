# Proyect Notes

## Description

Simple notes application. In it you can create, save and modify your notes using the editor with a variety of tools.

## Technologies Used

- Next.js
- tRPC
- Drizzle
- Tailwind
- SQLite

## Installation

Follow these steps to install and configure the project:

1. Clone the repository: https://github.com/ponies3/notes.git

2. Navigate into the project directory

3. Install the dependencies

```
npm i
```

4. Initializes the database

```
npm run db:push
```

5. Start the development server in port 3000

```
npm run dev
```

## Folder Configuration

- In the app folder is the nextjs "app router" with the pages, routes and layouts.
- In the servers folder is the configuration of the database and its entities and the api routes.
- In the trpc folder is the configuration of the trpc server and react clients.
- In the styles folder are the global styles.
- In the components folder are the reusable components of the application.
- In the modules folder are the different modules of the application (in this case only notes).this folder is divided into:
  - pages: main pages of the module (containers).
  - components: common components of the module.
  - domain: models, classes and domain interfaces.
  - application: the different usecase of the module.

## Implemented Functionalities

- **Recent Notes Sidebar**:

  - The main page features a sidebar on the left that displays the five most recently modified notes for quick access.

- **Note List**:

  - A chronological list of all created notes is available on the main page, ordered by their creation date.

- **New Note Button**:

  - A button in the top right corner of the main page allows users to quickly create a new note.

- **Search Functionality**:

  - An SSR-based search input is located on the top left side of the main page, enabling users to search notes via URL search parameters.

- **Note Editing**:

  - When clicking on a note or creating a new one, the user is redirected to the note editing page, which includes:
    - The recent notes sidebar.
    - A header with the note's title, which is editable, back button and delete button.
    - The tldraw editor for content creation.

- **Save Mechanism**:

  - A "Save" button has been added to the top right corner of the editor, allowing users to take a snapshot of the current state and save it to the database.
  - Additionally, an automatic save feature detects changes in the editor and saves them if no further modifications are made within one second.

- **Shape Rotation**:
  - In the style editor, buttons have been added to rotate shapes 90 degrees to the right or left, offering greater design flexibility.

## Considerations

Errors have been handled in the backend without exceptions. The ErrorMessage object is sent to the front and an error message is displayed.

All components are SSR except the editor, searcher, buttons with dialog and error message.

For the loading of the list of notes, skeletons have been created while they are being loaded and the html streaming is used to load the page faster.
