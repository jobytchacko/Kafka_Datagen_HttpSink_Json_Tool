const express = require('express');

const app = express();
app.use(express.json());

// Sample data storage (replace this with a proper database or storage mechanism)
let items = [];

// Route handler for creating an item
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json({ message: 'Item created successfully', item: newItem });
});

// Route handler for getting all items
app.get('/items', (req, res) => {
  res.status(200).json(items);
});

// Route handler for getting a specific item by ID
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = items.find(item => item.id === itemId);
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    res.status(200).json(item);
  }
});

// Route handler for updating a specific item by ID
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const index = items.findIndex(item => item.id === itemId);
  if (index === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    items[index] = { ...items[index], ...updatedItem };
    res.status(200).json({ message: 'Item updated successfully', item: items[index] });
  }
});

// Route handler for deleting a specific item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const index = items.findIndex(item => item.id === itemId);
  if (index === -1) {
    res.status(404).json({ message: 'Item not found' });
  } else {
    const deletedItem = items.splice(index, 1);
    res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
  }
});

// Route handler for filtering items by a query parameter (e.g., /items?category=electronics)
app.get('/items', (req, res) => {
  const category = req.query.category;
  const filteredItems = items.filter(item => item.category === category);
  res.status(200).json(filteredItems);
});

// Route handler for handling all other undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
