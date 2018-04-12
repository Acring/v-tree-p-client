import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {PlayComponent} from './play/play.component';


export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children:[{
      path: 'search',
      component: SearchComponent
    },{
      path: 'play',
      component: PlayComponent
    }]
  }
];
