import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "./MyNotes.css";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList); //its the state of note list
  const { loading, notes, error } = noteList; //destructuring          //useSelector is used to get the state from the redux store

  const userLogin = useSelector((state) => state.userLogin); //its the state of user login
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate); //its the state of note creation
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate); //its the state of note update
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete); //its the state of note delete
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are your sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    //here we use using axios inside useEffect - bcz as the page is rendered a call to api to fetch data from the backend
    dispatch(listNotes());
    if (!userInfo) {
      window.location.href = "/";
    }
  }, [dispatch, userInfo, successCreate, successUpdate, successDelete]);

  return (
    <MainScreen title={`Welcome back ${userInfo?.name}...`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>

      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}

      {loadingDelete && <Loading />}
      {notes
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion key={note._id}>
            <Card style={{ margin: 10, border: "none" }}>
              <Card.Header style={{ display: "flex", border: "none" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                    border: "none",
                  }}
                >
                  <Accordion.Header
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    as={Card.Text}
                    variant="link"
                    eventKey="0"
                  >
                    {note.title}
                  </Accordion.Header>
                </span>

                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              <Accordion.Body eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge bg="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on {""}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
