import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Divider,
  IconButton,
  Badge,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { PatientHeader } from '../shared/PatientHeader';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  doctorId: string;
  doctorName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const PatientMessages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock API call to fetch conversations
    const fetchConversations = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock conversations data
      const mockConversations: Conversation[] = [
        {
          id: '1',
          doctorId: '101',
          doctorName: 'Dr. Michael Chen',
          lastMessage: 'Thank you for your message. I will review your case.',
          lastMessageTime: '2024-01-20T14:30:00Z',
          unreadCount: 2,
        },
        {
          id: '2',
          doctorId: '102',
          doctorName: 'Dr. Sarah Martinez',
          lastMessage: 'Your test results look good.',
          lastMessageTime: '2024-01-19T09:15:00Z',
          unreadCount: 0,
        },
      ];

      setConversations(mockConversations);
      if (!selectedConversation && mockConversations.length > 0) {
        setSelectedConversation(mockConversations[0].id);
      }
    };

    fetchConversations();
  }, [selectedConversation]);

  useEffect(() => {
    if (selectedConversation) {
      // Mock API call to fetch messages for selected conversation
      const fetchMessages = async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock messages data
        const mockMessages: Message[] = [
          {
            id: '1',
            senderId: '101',
            senderName: 'Dr. Michael Chen',
            content: 'Hello! How can I help you today?',
            timestamp: '2024-01-20T14:00:00Z',
            isRead: true,
          },
          {
            id: '2',
            senderId: 'patient',
            senderName: 'You',
            content: 'I have a question about my medication.',
            timestamp: '2024-01-20T14:15:00Z',
            isRead: true,
          },
          {
            id: '3',
            senderId: '101',
            senderName: 'Dr. Michael Chen',
            content: 'Thank you for your message. I will review your case.',
            timestamp: '2024-01-20T14:30:00Z',
            isRead: false,
          },
        ];

        setMessages(mockMessages);
        scrollToBottom();
      };

      fetchMessages();
    }
  }, [selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'patient',
      senderName: 'You',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    scrollToBottom();

    // Mock API call to send message
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PatientHeader />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ height: 'calc(100vh - 180px)', display: 'flex' }}>
          {/* Conversations List */}
          <Box sx={{ width: 320, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Messages
            </Typography>
            <Divider />
            <List sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 240px)' }}>
              {conversations.map((conversation) => (
                <ListItem
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  sx={{
                    cursor: 'pointer',
                    bgcolor: selectedConversation === conversation.id ? 'action.selected' : 'inherit',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      color="error"
                      badgeContent={conversation.unreadCount}
                      invisible={conversation.unreadCount === 0}
                    >
                      <Avatar>
                        <AccountCircleIcon />
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={conversation.doctorName}
                    secondary={conversation.lastMessage}
                    secondaryTypographyProps={{
                      noWrap: true,
                      sx: { maxWidth: 200 },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Messages Area */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {selectedConversation ? (
              <>
                {/* Messages List */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.senderId === 'patient' ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '70%',
                          bgcolor: message.senderId === 'patient' ? 'primary.main' : 'grey.100',
                          color: message.senderId === 'patient' ? 'white' : 'text.primary',
                          borderRadius: 2,
                          p: 2,
                        }}
                      >
                        <Typography variant="subtitle2" gutterBottom>
                          {message.senderName}
                        </Typography>
                        <Typography variant="body1">
                          {message.content}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            textAlign: 'right',
                            mt: 1,
                            color: message.senderId === 'patient' ? 'white' : 'text.secondary',
                          }}
                        >
                          {formatTimestamp(message.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        multiline
                        maxRows={4}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton color="primary">
                        <AttachFileIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <SendIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}; 