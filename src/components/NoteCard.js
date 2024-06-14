import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";

const NoteCard = ({ note, onEdit, handlePinned }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{note.title}</Typography>
        <Typography variant="subtitle1">{note.tagline}</Typography>
        <Typography variant="body2">{note.body}</Typography>
        <IconButton onClick={() => onEdit(note)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handlePinned(note)}>
          <PushPinIcon className={`${note.pinned ? "pinned" : ""}`} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
