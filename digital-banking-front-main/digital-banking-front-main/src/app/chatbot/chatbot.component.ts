import { Component } from '@angular/core';
import { ChatService, ChatMessage } from '../services/chat.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: ChatMessage[] = [];
  newMessage = '';
  sending = false;

  constructor(private chatService: ChatService) {}

  send() {
    const text = this.newMessage?.trim();
    if (!text) return;
    const now = Date.now();
    // push user message
    this.messages.push({ role: 'user', content: text, timestamp: now });
    this.newMessage = '';
    this.sending = true;

    this.chatService.send(text).subscribe({
      next: (resp) => {
        this.messages.push({ role: 'assistant', content: resp.answer, timestamp: Date.now() });
        this.sending = false;
      },
      error: (err) => {
        this.messages.push({ role: 'assistant', content: 'Erreur du serveur: ' + (err?.message || err), timestamp: Date.now() });
        this.sending = false;
      }
    });
  }
}
