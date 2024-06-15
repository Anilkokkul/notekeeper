// src/components/NoteList.js
import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import {
  collection,
  query,
  orderBy,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../context/FIrebase";
import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm";
import { Button, Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  // console.log(notes);
  const fetchNotes = async () => {
    try {
      const q = query(
        collection(db, "notes"),
        orderBy("pinned", "desc"),
        orderBy("created", "desc")
      );
      const querySnapshot = await getDocs(q);
      const notesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArray);
    } catch (error) {
      toast.info("Error while getting notes");
      console.error("Error fetching notes: ", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  const handleEdit = (note) => {
    setSelectedNote(note);
    setOpen(true);
  };

  const handleSave = async (note) => {
    if (note.id) {
      const noteRef = doc(db, "notes", note.id);
      await updateDoc(noteRef, note);
      setSelectedNote(null);
      toast.success("Note updated Successfully");
    } else {
      await addDoc(collection(db, "notes"), {
        ...note,
        created: new Date(),
        pinned: null,
      });
      toast.success("Note Added Successfully");
    }
    fetchNotes();
  };

  const handlePinned = async (note) => {
    try {
      const noteRef = doc(db, "notes", note.id);
      if (!note.pinned) {
        await updateDoc(noteRef, { ...note, pinned: new Date() });
        toast.info("Note pinned");
      } else {
        await updateDoc(noteRef, { pinned: null });
        toast.info("Note unpinned");
      }
      fetchNotes();
    } catch (error) {
      console.error("Error updating pinned status: ", error);
      toast.error("Error updating pinned status please retry");
    }
  };
  const notesToDisplay = notes.slice((page - 1) * 6, page * 6);

  const handleDelete = async (id) => {
    try {
      const noteRef = doc(db, "notes", id);
      await deleteDoc(noteRef);
      fetchNotes();
      toast.warn("Note deleted");
    } catch (error) {
      console.error("Error while deleting note", error);
      toast.error("Error while deleting note please try again");
    }
  };

  const handleClose = () => {
    setSelectedNote(null);
    setOpen(false);
  };

  return (
    <div>
      <div className="btn-container">
        <Button size="large" onClick={() => setOpen(true)} variant="contained">
          Add Note
        </Button>
      </div>
      <Grid container spacing={3} padding={4}>
        {notesToDisplay.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <NoteCard
              note={note}
              onEdit={handleEdit}
              handlePinned={handlePinned}
              handleDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
      <Stack className="pagination">
        <Pagination
          count={Math.ceil(notes.length / 6)}
          page={page}
          onChange={(e, value) => setPage(value)}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
      <NoteForm
        open={open}
        onClose={handleClose}
        note={selectedNote}
        onSave={handleSave}
      />
    </div>
  );
};

export default NoteList;
