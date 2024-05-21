import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { KeypadComponent } from './component/keypad/keypad.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrutinizeResultsComponent } from './component/scrutinize-results/scrutinize-results.component';
import { ScrutinizerComponent } from './view/scrutinizer/scrutinizer.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './view/main/main.component';
import { RowComponent } from './component/keypad/row/row.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { SidenavListComponent } from './component/header/sidenav-list/sidenav-list.component';
import { ScrutinizerAlternativeComponent } from './view/scrutinizer-alternative/scrutinizer-alternative.component';

@NgModule({
    declarations: [
        AppComponent,
        KeypadComponent,
        ScrutinizeResultsComponent,
        ScrutinizerComponent,
        HeaderComponent,
        FooterComponent,
        MainComponent,
        RowComponent,
        SidenavListComponent,
        ScrutinizerAlternativeComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FlexLayoutModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatIconModule,
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule,
        MatListModule,
        HttpClientModule,
        MatGridListModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatSidenavModule,
        RouterModule.forRoot([
            { path: 'scrutinizer/classic', component: ScrutinizerComponent },
            { path: 'scrutinizer/columns', component: ScrutinizerAlternativeComponent },
            { path: 'scrutinizer/elige8', component: ScrutinizerComponent },
            { path: '', component: MainComponent },
        ])
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
