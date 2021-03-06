import {CommonModule} from '@angular/common';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {NativeScriptModule} from 'nativescript-angular/platform';
import {AppComponent} from './app.component';
import {BetaComponent} from './beta.component';
import {ChatRootComponent} from './chat-root.component';
import {ChatCyphertextComponent} from './js/cyph/components/chat-cyphertext.component';
import {ChatMainComponent} from './js/cyph/components/chat-main.component';
import {ChatMessageBoxComponent} from './js/cyph/components/chat-message-box.component';
import {ChatMessageComponent} from './js/cyph/components/chat-message.component';
import {ContactComponent} from './js/cyph/components/contact.component';
import {FileInputComponent} from './js/cyph/components/file-input.component';
import {FooterComponent} from './js/cyph/components/footer.component';
import {HelpComponent} from './js/cyph/components/help.component';
import {LinkConnectionComponent} from './js/cyph/components/link-connection.component';
import {MarkdownComponent} from './js/cyph/components/markdown.component';
import {NotFoundComponent} from './js/cyph/components/not-found.component';
import {SignupFormComponent} from './js/cyph/components/signup-form.component';
import {NanoScrollerDirective} from './js/cyph/directives/nano-scroller.directive';
import {TranslateDirective} from './js/cyph/directives/translate.directive';
import {ConfigService} from './js/cyph/services/config.service';
import {DialogService} from './js/cyph/services/dialog.service';
import {EnvService} from './js/cyph/services/env.service';
import {MdDialogService} from './js/cyph/services/material/md-dialog.service';
import {MdToastService} from './js/cyph/services/material/md-toast.service';
import {NotificationService} from './js/cyph/services/notification.service';
import {SignupService} from './js/cyph/services/signup.service';
import {StringsService} from './js/cyph/services/strings.service';
import {VirtualKeyboardWatcherService} from './js/cyph/services/virtual-keyboard-watcher.service';
import {VisibilityWatcherService} from './js/cyph/services/visibility-watcher.service';


/**
 * Angular module for Cyph UI.
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		BetaComponent,
		ChatCyphertextComponent,
		ChatMainComponent,
		ChatMessageComponent,
		ChatMessageBoxComponent,
		ChatRootComponent,
		ContactComponent,
		FileInputComponent,
		FooterComponent,
		HelpComponent,
		LinkConnectionComponent,
		MarkdownComponent,
		NanoScrollerDirective,
		NotFoundComponent,
		SignupFormComponent,
		TranslateDirective
	],
	entryComponents: [
		AppComponent,
		FileInputComponent,
		HelpComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		NativeScriptModule
	],
	providers: [
		ConfigService,
		DialogService,
		EnvService,
		MdDialogService,
		MdToastService,
		NotificationService,
		SignupService,
		StringsService,
		Title,
		VirtualKeyboardWatcherService,
		VisibilityWatcherService
	],
	schemas: [NO_ERRORS_SCHEMA]
})
/* tslint:disable-next-line:no-stateless-class */
export class AppModule {
	constructor () {}
}

