import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import {initialMessages, initialTitleMessages} from './data';

function App() {
  const [messages, setMessages] = useState(initialMessages[0]);
  const [newMessage, setNewMessage] = useState('');
  const [uiMessages, setUiMessages] = useState([]);
  const [titleMessages, setTitlessages] = useState(initialTitleMessages);
  const divRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage) {
        //setMessages([...messages, { text: newMessage, user: 'user' }]);
        setNewMessage('');
        setIsConversationView(true);
        setUiMessages(messages.data);
        fetchResponse(newMessage);
      }
  };

  const fetchResponse = (userMessage) => {
    // Replace with your actual API endpoint
    // fetch('YOUR_REST_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ message: userMessage }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Simulate the response being displayed word by word
    //     data.response.split(' ').forEach((word, index) => {
    //       setTimeout(() => {
    //         setMessages([...messages, { text: word, user: 'bot' }]);
    //       }, (index + 1) * 1000); // Adjust the delay as needed
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching response:', error);
    //   });

    let text = 'Run id R123 failed on 2023-10-16 03:53:24 UTC';
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setUiMessages([...uiMessages, {
                                    date: new Date() + '',
                                    question: userMessage,
                                    answer: text.substring(0, currentIndex)
                                }]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); 

    if (divRef.current) {
        const divElement = divRef.current;
        const lastElement = divElement.lastElementChild;
  
        if (lastElement) {
          lastElement.scrollIntoView({ behavior: 'smooth' });
        }
      }

    // response.split(' ').forEach((word, index) => {
    //     setTimeout(() => {
    //         setUiMessages((prevMessages) => [...prevMessages, {
    //                         date: new Date() + '',
    //                         question: userMessage,
    //                         answer: word
    //                     }]);
    //     }, (index + 1) * 1000); // Adjust the delay as needed
    //   });

    // const messageText = "Run id R123 failed on 2023-10-16 03:53:24 UTC";
    // let currentIndex = 0;
    //   const typingInterval = setInterval(() => {
    //     let existingMessages = uiMessages;
    //     let query = existingMessages.filter(m => m.question == userMessage)[0];
    //     if(query) {
    //         query.answer = messageText.slice(0, currentIndex)
    //     } else {
    //         existingMessages.push({
    //             date: new Date() + '',
    //             question: userMessage,
    //             answer: messageText.slice(0, currentIndex)
    //         })
    //     }
    //     setUiMessages(existingMessages);
    //     currentIndex++;
  
    //     if (currentIndex > messageText.length) {
    //       clearInterval(typingInterval);
    //     }
    //   }, 100);
  };

  const [isHidden, setIsHidden] = useState(false);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuVisible(!isUserMenuVisible);
  };

  const [isConversationView, setIsConversationView] = useState(false);

  const [groupedTitleMessages, setGroupedTitleMessages] = useState({
    today: [],
    last7Days: [],
    before7Days: [],
  });

  useEffect(() => {
    groupTitleMessages();
  }, [titleMessages]);

  const groupTitleMessages = () => {
    const currentDate = new Date().toISOString().split('T')[0];

    const titlesToday = titleMessages.filter((m) => {
        const splitDate = m.date.split('T')[0];
        return splitDate === currentDate;
      });
    const titleLast7Days = titleMessages.filter(
      (m) => {
        const splitDate = m.date.split('T')[0];
        return splitDate < currentDate && new Date(splitDate) >= new Date(currentDate) - 6 * 24 * 60 * 60 * 1000
      });
    const titleBefore7Days = titleMessages.filter(
      (m) => new Date(m.date) < new Date(m) - 6 * 24 * 60 * 60 * 1000
    );

    setGroupedTitleMessages({
      today: titlesToday,
      last7Days: titleLast7Days,
      before7Days: titleBefore7Days,
    });
  };

  const onTitleClick = (id) => {
    let selectedUiMessages = initialMessages.filter(m => m.titleId == id)[0].data;
    setIsConversationView(true);
    setUiMessages(selectedUiMessages);
  };
  


  return (
    <React.Fragment>
        <nav id="sidebar" className={isHidden ? 'hidden' : ''}>
        <div className="float-top">
            <div className="sidebar-controls">
                <button className="new-chat"><i className="fa fa-plus"></i> New Chat</button>
                <button className="hide-sidebar" onClick={toggleHidden}><i className="fa fa-chevron-left"></i></button>
            </div>
            <ul className="conversations">
                <li className="grouping">Today</li>
                {groupedTitleMessages.today.map((m) => (
                <li className="active" onClick={() => onTitleClick(m.titleId)}>
                    <button className="conversation-button"><i className="fa fa-message fa-regular"></i> {m.title} </button>
                    <div className="fade"></div>
                    <div className="edit-buttons">
                        <button><i className="fa fa-edit"></i></button>
                        <button><i className="fa fa-trash"></i></button>
                    </div>
                </li>
                ))}
                <li className="grouping">Yesterday</li>
                {groupedTitleMessages.last7Days.map((m) => (
                <li onClick={() => onTitleClick(m.titleId)}>
                    <button className="conversation-button"><i className="fa fa-message fa-regular"></i> {m.title} </button>
                    <div className="fade"></div>
                    <div className="edit-buttons">
                        <button><i className="fa fa-edit"></i></button>
                        <button><i className="fa fa-trash"></i></button>
                    </div>
                </li>
                ))}
                <li className="grouping">Previous 7 days</li>
                {groupedTitleMessages.before7Days.map((m) => (
                <li onClick={() => onTitleClick(m.titleId)}>
                    <button className="conversation-button"><i className="fa fa-message fa-regular"></i> {m.title} </button>
                    <div className="fade"></div>
                    <div className="edit-buttons">
                        <button><i className="fa fa-edit"></i></button>
                        <button><i className="fa fa-trash"></i></button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
        <div className='user-menu'>
            <button onClick={toggleUserMenu}>
                <i className="user-icon">u</i>
                Dheeraj Mishra
                <i className="fa fa-ellipsis dots"></i>
            </button>
            <ul className={`${isUserMenuVisible ? 'show show-animate' : ''}`}>
                <li><button>My plan</button></li>
                <li><button>Custom instructions</button></li>
                <li><button>Settings &amp; Beta</button></li>
                <li><button>Log out</button></li>
            </ul>
        </div>
    </nav>
    <main>
        <div className="view new-chat-view">
            <div className="model-selector" style={{backgroundColor: '#2c2d30'}}>
                {/* <button className="gpt-3 selected">
                    <i className="fa fa-bolt"></i> GPT-3.5
                    <div className="model-info">
                        <div className="model-info-box">
                            <p>Our fastest model, great for most every day tasks.</p>

                            <p className="secondary">Available to Free and Plus users</p>
                        </div>
                    </div>
                </button>
                <button className="gpt-4">
                    <i className="fa fa-wand-magic-sparkles"></i> GPT-4
                    <div className="model-info">
                        <div className="model-info-box">
                            <p>Our most capable model, great for creative stuff.</p>

                            <p className="secondary">Available for Plus users.</p>
                        </div>
                    </div>
                </button> */}
            </div>

            <div className="logo">
                UBS Logger Analytics
            </div>
        </div>

        {/* <div className="container">
            <div className="box">Box 1</div>
            <div className="box">Box 2</div>
            <div className="box">Box 3</div>
            <div className="box">Box 4</div>
        </div> */}


        
        <div className={`view conversation-view ${isConversationView ? 'display-flex' : 'display-none'}`} ref={divRef}
>
            {/* <div className="model-name">
                <i className="fa fa-bolt"></i> Default (GPT-3.5)
            </div> */}
            
            {uiMessages.map((message, index) => (
                <React.Fragment>
            <div className="user message">
                <div className="identity">
                    <i className="user-icon">u</i>
                </div>
                <div className="content">
                    <p>{message.question}</p>
                </div>
            </div>
            <div className="assistant message">
                <div className="identity">
                    <i className="gpt user-icon">G</i>
                </div>
                <div className="content">
                    <p>{message.answer}</p>
                </div>
            </div>
            </React.Fragment>))}
        </div>
        

        <div id="message-form">
            <div className="message-wrapper">
                <textarea id="message" rows="1" placeholder="Send a message"  value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                >
                </textarea>
                <button className="send-button" onClick={handleSendMessage}><i className="fa fa-paper-plane"></i></button>
            </div>
            <div className="disclaimer">This is a Chatbot UI for UBS Hackathon purpose only</div>
        </div>
    </main>
    </React.Fragment>
  );
}

export default App;
