import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Button,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Person as PersonIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

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
  patientId: string;
  patientName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const DoctorMessages: React.FC = () => {
  const navigate = useNavigate();
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
          patientId: '101',
          patientName: 'John Smith',
          lastMessage: 'I have a question about my medication.',
          lastMessageTime: '2024-01-20T14:30:00Z',
          unreadCount: 2,
        },
        {
          id: '2',
          patientId: '102',
          patientName: 'Sarah Johnson',
          lastMessage: 'Thank you for the information.',
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
            senderId: 'patient',
            senderName: 'John Smith',
            content: 'I have a question about my medication.',
            timestamp: '2024-01-20T14:00:00Z',
            isRead: true,
          },
          {
            id: '2',
            senderId: 'doctor',
            senderName: 'You',
            content: 'Of course, what would you like to know?',
            timestamp: '2024-01-20T14:15:00Z',
            isRead: true,
          },
          {
            id: '3',
            senderId: 'patient',
            senderName: 'John Smith',
            content: 'Should I take it with food or on an empty stomach?',
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
      senderId: 'doctor',
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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/doctor/dashboard')}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>
        <Paper sx={{ height: 'calc(100vh - 180px)', display: 'flex' }}>
          {/* Conversations List */}
          <Box sx={{ width: 320, borderRight: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Patient Messages
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
                        <PersonIcon />
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={conversation.patientName}
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
                        justifyContent: message.senderId === 'doctor' ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '70%',
                          bgcolor: message.senderId === 'doctor' ? 'primary.main' : 'grey.100',
                          color: message.senderId === 'doctor' ? 'white' : 'text.primary',
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
                            color: message.senderId === 'doctor' ? 'white' : 'text.secondary',
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