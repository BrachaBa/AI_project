// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { GreetingService } from '../greeting.service';


// @Component({
//   selector: 'app-main-screen',
//   templateUrl: './main-screen.component.html',
//   styleUrls: ['./main-screen.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule]
// })

// export class MainScreenComponent {
//   event: string = '';
//   age: number | null = null;
//   type: string = '';
//   mood: string = '';
//   selectedLanguage: string = 'hebrew'; // שפת ברירת המחדל
//   blessing: string | null = null;
//   customEvent: string = ''; // הוספת המשתנה customType
//   customMood: string = ''; // הוספת המשתנה customMood
//   customType: string = ''; // הוספת המשתנה customType

//   constructor(private greetingService: GreetingService) { }

//   generateBlessing(): void {
//     const body = { 
//       eventType: this.event,
//       length: this.type,
//       tone: this.mood,
//       language: this.selectedLanguage
//     };

//     this.greetingService.generateGreeting(body.eventType, body.tone, body.length, body.language)
//       .subscribe({
//         next: (response) => {
//           this.blessing = response.greeting;
//         },
//         error: (error) => {
//           console.error('Error occurred:', error);
//         }
//       });
//   }

//   requestAnother(): void {
//     this.blessing = ''; // איפוס הברכה
//   }

//   setLanguage(language: string): void {
//     this.selectedLanguage = language; // קביעת השפה הנבחרת במשתנה
//     console.log(`Selected language: ${language}`);
//   }


//   signInWithGoogle():void{

//   }

//   // function onSignIn(googleUser) {
//   //   var profile = googleUser.getBasicProfile();
//   //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   //   console.log('Name: ' + profile.getName());
//   //   console.log('Image URL: ' + profile.getImageUrl());
//   //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//   // }
// }

import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GreetingService } from '../greeting.service';

declare const gapi: any;

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MainScreenComponent implements AfterViewInit {
  event: string = '';
  age: number | null = null;
  type: string = '';
  mood: string = '';
  selectedLanguage: string = 'hebrew'; // שפת ברירת המחדל
  blessing: string | null = null;
  customEvent: string = ''; // הוספת המשתנה customType
  customMood: string = ''; // הוספת המשתנה customMood
  customType: string = ''; // הוספת המשתנה customType

  constructor(private greetingService: GreetingService) { }

  ngAfterViewInit(): void {
    this.loadGoogleApi().then(() => {
      this.initGoogleSignIn();
    });
  }

  loadGoogleApi(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google API script'));
      document.head.appendChild(script);
    });
  }

  initGoogleSignIn(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
      });
    });
  }

  signInWithGoogle(): void {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser: any) => {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      // כאן תוכל לשלוח את ה-token לשרת שלך ולאמת את המשתמש
    }).catch((error: any) => {
      console.error('Error occurred during Google sign-in:', error);
    });
  }

  generateBlessing(): void {
    const body = { 
      eventType: this.event,
      length: this.type,
      tone: this.mood,
      language: this.selectedLanguage
    };

    this.greetingService.generateGreeting(body.eventType, body.tone, body.length, body.language)
      .subscribe({
        next: (response) => {
          this.blessing = response.greeting;
        },
        error: (error) => {
          console.error('Error occurred:', error);
        }
      });
  }

  requestAnother(): void {
    this.blessing = ''; // איפוס הברכה
  }

  setLanguage(language: string): void {
    this.selectedLanguage = language; // קביעת השפה הנבחרת במשתנה
    console.log(`Selected language: ${language}`);
  }
}
