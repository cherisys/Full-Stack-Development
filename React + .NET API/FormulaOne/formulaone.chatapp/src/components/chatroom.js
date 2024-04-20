import {Row, Col} from 'react-bootstrap';
import MessageContainer from './messagecontainer';
import SendMessageForm from './sendmessage';

const ChatRoom = ({messages, sendMessage}) => <div>
    <Row className="px-5 py-5">
        <Col sm={10}>
            <h2>Chatroom</h2>
        </Col>
        <Col>

        </Col>
    </Row>
    <Row className="px-5 py-5">
        <Col sm={12}>
            <MessageContainer messages={messages}/>
        </Col>
        <Col sm={12}>
            <SendMessageForm sendMessage={sendMessage}/>
        </Col>
    </Row>
</div>

export default ChatRoom;