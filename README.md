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

## Implemented functionalities

On the main page, an aside with the history of the last five modified notes is displayed on the left side.

On the main page, the list of all the created notes ordered by creation date.

On the top right side, a button to create a new note is displayed.

Whether clicking on a note or creating a new one, you are taken to the editing page.

On it, you can still see the aside with the history, a header with the title of the note (editable) and the tldraw editor.

A save button has been added to the editor on the top right side. This button creates a store snapshot and saves it in the database. On the other hand, a listener has been created that detects changes in the store and saves them after one second without modifications.

In the style editor, buttons have been added to rotate a shape 90 degrees to the right or left.

## Considerations

Errors have been handled in the backend without exceptions. The ErrorMessage object is sent to the front and an error message is displayed.

All components are SSR except the editor, buttons with dialog and error message.

For the loading of the list of notes, skeletons have been created while they are being loaded and the html streaming is used to load the page faster.
