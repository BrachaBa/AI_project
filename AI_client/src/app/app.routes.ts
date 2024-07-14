import { Routes } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component'; // נתיב נכון לקומפוננטה

export const routes: Routes = [
  { path: '', component: MainScreenComponent },
  // ניתן להוסיף נתיבים נוספים לפי הצורך
];
