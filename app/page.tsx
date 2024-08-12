"use client"; 
import { useState, ChangeEvent } from 'react';
import { Container, TextField, Button, List, ListItem, IconButton, Typography, Checkbox, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { Edit, Delete, Save, CheckCircle, Cancel } from '@mui/icons-material';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editText, setEditText] = useState<string>('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        isEditing: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const handleCompleteTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) setEditText(todoToEdit.text);
  };

  const handleSaveEditTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText, isEditing: false } : todo
      )
    );
    setEditText('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  return (
    <Container maxWidth="sm"><br></br>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Add a new todo"
          value={newTodo}
          onChange={handleChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
        >
          Add
        </Button>
      </div>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} divider>
            {todo.isEditing ? (
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <TextField
                  value={editText}
                  onChange={handleEditChange}
                  fullWidth
                />
                <IconButton onClick={() => handleSaveEditTodo(todo.id)}>
                  <Save />
                </IconButton>
              </div>
            ) : (
              <>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => handleCompleteTodo(todo.id)}
                  icon={<Cancel />}
                  checkedIcon={<CheckCircle />}
                />
                <ListItemText
                  primary={todo.text}
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleEditTodo(todo.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleRemoveTodo(todo.id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
