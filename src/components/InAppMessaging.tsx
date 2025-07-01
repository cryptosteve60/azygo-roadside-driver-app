
import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Phone, MapPin } from "lucide-react";
import { websocketService } from "@/services/websocketService";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  senderId: string;
  senderType: 'driver' | 'customer';
  message: string;
  timestamp: Date;
  type: 'text' | 'location' | 'photo';
}

interface InAppMessagingProps {
  jobId: string;
  customerName: string;
  customerId: string;
  driverId: string;
}

const InAppMessaging: React.FC<InAppMessagingProps> = ({
  jobId,
  customerName,
  customerId,
  driverId
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing messages
    loadMessages();

    // Listen for new messages
    websocketService.on('MESSAGE', handleNewMessage);

    return () => {
      websocketService.off('MESSAGE', handleNewMessage);
    };
  }, [jobId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      // This would fetch messages from your API
      const mockMessages: Message[] = [
        {
          id: "1",
          senderId: customerId,
          senderType: 'customer',
          message: "Hi! I'm waiting at the parking lot entrance.",
          timestamp: new Date(Date.now() - 300000),
          type: 'text'
        },
        {
          id: "2",
          senderId: driverId,
          senderType: 'driver',
          message: "Great! I'm about 5 minutes away. I'll call you when I arrive.",
          timestamp: new Date(Date.now() - 240000),
          type: 'text'
        }
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleNewMessage = (messageData: any) => {
    const newMsg: Message = {
      id: messageData.id,
      senderId: messageData.senderId,
      senderType: messageData.senderType,
      message: messageData.message,
      timestamp: new Date(messageData.timestamp),
      type: messageData.type || 'text'
    };
    
    setMessages(prev => [...prev, newMsg]);
    
    if (messageData.senderType === 'customer') {
      toast({
        title: `Message from ${customerName}`,
        description: messageData.message
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      const message: Message = {
        id: Date.now().toString(),
        senderId: driverId,
        senderType: 'driver',
        message: newMessage,
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, message]);
      setNewMessage("");

      // Send via WebSocket
      websocketService.send('MESSAGE', {
        jobId,
        message: newMessage,
        recipientId: customerId,
        senderType: 'driver'
      });

    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const shareLocation = async () => {
    try {
      const message: Message = {
        id: Date.now().toString(),
        senderId: driverId,
        senderType: 'driver',
        message: "📍 Current location shared",
        timestamp: new Date(),
        type: 'location'
      };

      setMessages(prev => [...prev, message]);

      websocketService.send('MESSAGE', {
        jobId,
        message: "Location shared",
        recipientId: customerId,
        senderType: 'driver',
        type: 'location'
      });

      toast({
        title: "Location shared",
        description: "Customer can now see your current location"
      });
    } catch (error) {
      console.error('Failed to share location:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-96 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">Chat with {customerName}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={shareLocation}>
              <MapPin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderType === 'driver' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.senderType === 'driver'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isLoading}
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading || !newMessage.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InAppMessaging;
