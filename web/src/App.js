import TextField from "@material-ui/core/TextField";
import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
	//this will be one particular instance of a chat message from a certain name (person)
	const [state, setState] = useState({ message: "", name: "" });
	//This state will be the chat object - which will contain multiple names and messages in them
	const [chat, setChat] = useState([]);

	/*saving an instance of the useRef() hook so can use socket.io library as appears cannot access it by default in react - so need to use 
	useRef so can access it and use it in our app and create .on and .emit events and so they can run NB: if you do not use useRef()
	and try accessing socket like this e.g. socket.on the app will not work as react has no access to the socket.io library 
	useRef is making sure the library object you are accessing stays the same each render - so basically persisting state until you change it - is just a hook under the hood
	*/

	const socketRef = useRef();

	useEffect(() => {
		//socket will be listening on this - connection to our backend (like when you have a fetch request for an api call)
		socketRef.current = io.connect("http://localhost:4000");
		//the .on method listens to any event from the client and send it to the server
		socketRef.current.on("message", ({ name, message }) => {
			setChat([...chat, { name, message }]);
		});
		return () => socketRef.current.disconnect();
	}, [chat]);

	//will capture text we are typing and set message state equal to what we are typing and also captures name from name field in text input element
	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const onMessageSubmit = (e) => {
		const { name, message } = state;
		/*emits (broadcasts) message over the websocket to the server, in the brackets first 
		argument in quotations is what you are calling the emit event
                so any .on method listening for it know this is the event to listen for and do something with */
		socketRef.current.emit("message", { name, message });
		// preventDefault stops page refreshing otherwise state would clear state
		e.preventDefault();
		//resets state back to empty string
		setState({ message: "", name });
	};

	const renderChat = () => {
		//will map over chat object and render all name and message states
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		));
	};

	return (
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField
						name="name"
						onChange={(e) => onTextChange(e)}
						value={state.name}
						label="Name"
					/>
				</div>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
		</div>
	);
}

export default App;
