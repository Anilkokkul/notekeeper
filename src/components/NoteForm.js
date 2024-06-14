// src/components/NoteForm.js
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { toast } from "react-toastify";

const NoteForm = ({ open, onClose, note, onSave }) => {
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setTagline(note.tagline || "");
      setBody(note.body || "");
    } else {
      setTitle("");
      setTagline("");
      setBody("");
    }
  }, [note]);

  const handleSave = () => {
    if (title && tagline && body) {
      onSave({ ...note, title, tagline, body });
      onClose();
      setTitle("");
      setTagline("");
      setBody("");
    } else {
      console.log("fff");
      toast.warning("Please fill all the fields");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{note ? "Edit Note" : "Add Note"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Tagline"
          type="text"
          fullWidth
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Body"
          type="text"
          fullWidth
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteForm;
