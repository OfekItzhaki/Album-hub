import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildLibraryComponent } from './components/build-library/build-library.component';
import { CameraComponent } from './components/camera/camera.component';
import { HashComponent } from './components/hash/hash.component';
import { InitialPermissionsComponent } from './components/initial-permissions/initial-permissions.component';
import { LibraryDataComponent } from './components/library-data/library-data.component';
import { PublicFolderComponent } from './components/public-folder/public-folder.component';
import { OnlineImagesComponent } from './components/online-images/online-images.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HashGuardService } from './services/hash-guard/hash-guard.service';
import { PrivateFolderComponent } from './components/private-folder/private-folder.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';

const myroutesconfig: Routes = [

  { path: '', redirectTo: '/buildlibrary', pathMatch: 'full' },

  { path: 'buildlibrary', component: BuildLibraryComponent, data: {navbar:false} },
  { path: 'permissions', component: InitialPermissionsComponent, data: {navbar:false} },
  { path: 'librarydata', component: LibraryDataComponent, data: {navbar:false} },

  { path: 'onlineimages', component: OnlineImagesComponent, data: {navbar:true} },
  { path: 'publicfolder', component: PublicFolderComponent, data: {navbar:true} },
  { path: 'camera', component: CameraComponent, data: {navbar:true} },
  { path: 'privatefolder', component: PrivateFolderComponent, data: {navbar:true} },

  { path: 'slideshow', component: SlideshowComponent, data: {navbar:true} },
  // { path: 'about', component: AboutComponent, data: {navbar:true} },

  { path: 'p', component: HashComponent, canActivate: [HashGuardService] },
  
  // Case route wasn't found
  { path: '**', redirectTo: 'error404' },
  { path: 'error404', component: PageNotFoundComponent, data: {navbar:true} }
];

@NgModule({
  imports: [RouterModule.forRoot(myroutesconfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
