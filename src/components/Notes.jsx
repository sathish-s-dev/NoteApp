/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { BiTrash, BiCheck, BiUndo } from 'react-icons/bi';
function getData() {
	try {
		let data = localStorage.getItem('notes');
		data = JSON.parse(data);
		console.log(data);
		return data;
	} catch (err) {
		console.log(err.message);
	}
}

function Notes() {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		let data = getData();
		if (data != null || data != []) setNotes(data);
	}, []);

	console.log(notes, 'notes data');
	const noteRef = React.useRef();
	return (
		<div className='min-h-screen px-6 sm:p-10 py-10 md:p-14 text-emerald-800 dark:text-slate-200 flex flex-col items-center w-full'>
			<h1 className='text-2xl font-bold '>Notes App</h1>
			<form
				className='flex justify-center items-center flex-col gap-4 w-full max-w-2xl p-4'
				onSubmit={(e) => {
					e.preventDefault();
					if (noteRef.current.value !== '') {
						let note = {
							id: Date.now(),
							note: noteRef.current.value,
							completed: false,
						};
						let newNotes = Array.from(notes);
						newNotes.push(note);
						setNotes(newNotes);
						noteRef.current.value = '';
						localStorage.setItem('notes', JSON.stringify([...notes, note]));
					}
				}}>
				<input
					placeholder='Add a note...'
					type='text'
					className='border border-slate-400 accent-emerald-400/30 px-4 py-4 pb-12 h- w-3/4 sm:w-2/3 rounded-md bg-inherit shadow-sm dark:shadow-white/60'
					ref={noteRef}
				/>
				<input
					type='submit'
					value={'Add Note'}
					className=' px-4 py-2 dark:border border text-emerald-100 bg-emerald-800 cursor-pointer border-slate-400 dark:bg-slate-800 dark:text-white rounded-md'
				/>
			</form>
			<div className='flex flex-col gap-4 mt-6 w-full max-w-xl items-center'>
				<NoteList
					notes={notes}
					setNotes={setNotes}
				/>
			</div>
		</div>
	);
}
export default Notes;

function NoteList({ notes, setNotes }) {
	return (
		<>
			{notes &&
				notes.map((note) => {
					return (
						<div
							key={note.id}
							className='flex dark:bg-slate-100/10 flex-row gap-4 items-center w-full md:w-3/4  max-w-md px-4 py-2 dark:border backdrop:blur-sm justify-between rounded shadow-sm hover:shadow-md border-slate-400/40 hover:cursor-pointer  text-md      bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100'>
							<p
								className={`text-center capitalize ${
									note.completed
										? 'line-through dark:text-red-300 text-red-800/90'
										: 'text-emerald-800 dark:text-emerald-400'
								}`}>
								{note.note}
							</p>
							<div className='flex text-xl gap-4'>
								{note.completed ? (
									<BiUndo
										className='cursor-pointer hover:scale-110 transition-all duration-300 dark:text-red-300 border w-5 h-5 dark:border-red-300 text-red-800/90 border-red-800/90 rounded'
										aria-label='undo-button'
										onClick={() => {
											let newNote = notes.find((n) => n.id === note.id);
											newNote.completed = !newNote.completed;
											let newNotes = notes.filter((n) => n.id !== note.id);
											setNotes([...newNotes, newNote]);
											getData();
										}}
									/>
								) : (
									<BiCheck
										className='cursor-pointer hover:scale-110 transition-all duration-300 text-emerald-800 dark:text-emerald-400 border w-5 h-5 border-emerald-800 dark:border-green-400 rounded'
										aria-label='complete button'
										onClick={() => {
											let newNote = notes.find((n) => n.id === note.id);
											newNote.completed = !newNote.completed;
											let newNotes = notes.filter((n) => n.id !== note.id);
											setNotes([...newNotes, newNote]);
											getData();
										}}
									/>
								)}
								<BiTrash
									className='cursor-pointer hover:scale-110 transition-all duration-300 text-red-500  w-5 h-5 border-red-500 rounded'
									aria-label='delete button'
									onClick={() => {
										// localStorage.removeItem('notes');
										localStorage.setItem(
											'notes',
											JSON.stringify(notes.filter((n) => n.id !== note.id))
										);
										let data = getData();
										setNotes(data);
									}}
								/>
							</div>
						</div>
					);
				})}
		</>
	);
}
