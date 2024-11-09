# Daily Todo List

A simple and elegant daily todo list web application that helps you organize your tasks day by day.

## Web App: 
https://general-todo-list.vercel.app/

## Features

- **Daily Organization**: Tasks are organized by date
- **Task Status**: Three status options for each task
  - Pending
  - In Progress
  - Completed
- **Auto Numbering**: Tasks are automatically numbered
- **Local Storage**: All data is stored in your browser's local storage
- **Date Navigation**: Easily switch between different dates
- **Responsive Design**: Works well on both desktop and mobile devices

## Usage

1. **Add a Task**
   - Enter your task in the input field
   - Select a status from the dropdown
   - Click "Add" or press Enter

2. **Manage Tasks**
   - Click on a task to cycle through different statuses
   - Click the "Delete" button to remove a task
   - Tasks are automatically saved

3. **Navigate Between Dates**
   - Use "Previous Day" and "Next Day" buttons to change dates
   - Each date has its own separate task list

## Technical Details

- Built with pure HTML, CSS, and JavaScript
- No external dependencies required
- Data persistence using browser's Local Storage
- Responsive design using modern CSS features

## Project Structure

```text
todo-list/
├── index.html # Main HTML file
├── css/
│ └── style.css # Styles
├── js/
│ └── script.js # JavaScript functionality
└── README.md # Documentation
```

## Local Development

1. Clone the repository:

```bash
git clone https://github.com/Bruce6X/todo-list.git
```

2. Open the project:

```bash
cd todo-list
```

3. Open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```


## Data Storage

All tasks are stored in the browser's Local Storage:
- Each date has its own storage key (`tasks_YYYY-MM-DD`)
- Data persists across browser sessions
- Clearing browser data will reset all tasks

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Other modern browsers

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Author

Bruce6X

## Acknowledgments

- Inspired by various todo list applications
- Built for learning and practical use
