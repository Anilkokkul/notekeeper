import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import ClearIcon from "@mui/icons-material/Clear";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const NoteCard = ({ note, onEdit, handlePinned, handleDelete }) => {
  return (
    <>
      <Card className="card">
        <span onClick={() => handlePinned(note)} className="batch">
            {!note.pinned ? (
              <PushPinOutlinedIcon fontSize="large" />
            ) : (
              <PushPinIcon className="pinned" fontSize="large" />
            )}
          </span>
        <CardContent className="card">
          
          <div onClick={() => onEdit(note)}>
            <Typography variant="h5">{note.title}</Typography>
            <Typography variant="subtitle1">{note.tagline}</Typography>
            <Typography variant="body2">{note.body}</Typography>
          </div>
          <div>
            <IconButton onClick={() => onEdit(note)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(note.id)}>
              <ClearIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default NoteCard;
