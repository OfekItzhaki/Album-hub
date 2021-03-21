import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavComponent } from './components/nav/nav.component';
import { HashComponent } from './components/hash/hash.component';
import { BuildLibraryComponent } from './components/build-library/build-library.component';
import { InitialPermissionsComponent } from './components/initial-permissions/initial-permissions.component';
import { LibraryDataComponent } from './components/library-data/library-data.component';
import { OnlineImagesComponent } from './components/online-images/online-images.component';
import { CameraComponent } from './components/camera/camera.component';
import { PublicFolderComponent } from './components/public-folder/public-folder.component';
import { PrivateIndicationComponent } from './components/private-indication/private-indication.component';
import { EditDetailsComponent } from './components/edit-details/edit-details.component';
import { LogoComponent } from './components/logo/logo.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { RoutesContainerComponent } from './components/routes-container/routes-container.component';
import { HttpClientModule } from '@angular/common/http';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivateFolderComponent } from './components/private-folder/private-folder.component';
import { PrivateModeDialogComponent } from './components/private-mode-dialog/private-mode-dialog.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { FavoriteIndicationComponent } from './components/favorite-indication/favorite-indication.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from './modules/material-module/material-module.module';
import { FavoriteFolderComponent } from './components/favorite-folder/favorite-folder.component';

@NgModule({
  declarations: [
    // the dependencies components
    AppComponent,
    PageNotFoundComponent,
    NavComponent,
    HashComponent,
    BuildLibraryComponent,
    InitialPermissionsComponent,
    LibraryDataComponent,
    OnlineImagesComponent,
    CameraComponent,
    PublicFolderComponent,
    PrivateIndicationComponent,
    EditDetailsComponent,
    LogoComponent,
    SideNavbarComponent,
    RoutesContainerComponent,
    BottomMenuComponent,
    PrivateFolderComponent,
    PrivateModeDialogComponent,
    FavoriteIndicationComponent,
    SlideshowComponent,
    FavoriteFolderComponent,
  ],
  imports: [
    // the dependencies modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
