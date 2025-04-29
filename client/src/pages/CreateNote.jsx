import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export function CreateNote() {
    const [noteTitle, setNoteTitle] = useState("");
    const [note, setNote] = useState("");
    const navigate = useNavigate();
    const { campaignId } = useParams();
    const makeRequest = useFetch();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await makeRequest("/note/create/", "POST", {
            title: noteTitle,
            content: note,
            campaignId: campaignId,
        });
        if (res.ok) {
            const note = await res.json();
            console.log(note);
            navigate(`/campaign/${campaignId}/`);
        } else {
            console.error("Failed to create note");
        }
    }
    return (
        <div className="create-note">
            <h1>Create a New Note</h1>
            <form>
                <label>Note Title:</label>
                <input type="text" id="note-title" name="note-title" value={noteTitle} onChange={e => setNoteTitle(e.target.value)} required />
                
                <label>Note:</label>
                <textarea id="note" name="note" value={note} onChange={e => setNote(e.target.value)} required></textarea>
                
                <button type="submit" onClick={handleSubmit}>Create Note</button>
            </form>
        </div>
    );
}