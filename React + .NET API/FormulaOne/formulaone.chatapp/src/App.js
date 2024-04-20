import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WaitingRoom from './components/waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/chatroom';

function App() {

  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      //initialize hub connection
      const conn = new HubConnectionBuilder().withUrl("https://localhost:7206/chat").configureLogging(LogLevel.Error).build();

      //create handler to join
      conn.on("JoinSpecificChatroom", (username, msg) => {
        setMessages((messages) => [...messages, {username, msg}]);
      });

      //create handler to receive messages
      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages((messages) => [...messages, {username, msg}]);
      }); 


      await conn.start();
      setConnection(conn);
      await conn.invoke("JoinSpecificChatroom", {username,chatroom});
    }
    catch(e){
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      console.log(message);
      await conn.invoke("SendMessage", message);
    }
    catch(e){
      console.log(e);
    }
  }

  return (
    <div>
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight:light'>Welcome to F1 Chat App</h1>
            </Col>
          </Row>

          {
            !conn
            ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
