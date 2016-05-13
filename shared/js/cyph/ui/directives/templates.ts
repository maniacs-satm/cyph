import {Util} from 'cyph/util';


/**
 * Reusable HTML view templates for component directives.
 */
export const Templates	= {
	chatCyphertext: `
		<div class='chat-cyphertext nano'>
			<md-content class='nano-content'>
				<md-list layout='column'>
					<md-item
						class='message-item unread'
						ng-repeat='message in $this.cyphertext.messages'
						layout='horizontal'
					>
						<span class='message'>
							<strong
								translate
								ng-bind='::(
									message.author === Cyph.Session.Users.me ?
										"me" :
										"friend"
								) + ": "'
							></strong>
							<span flex>{{::message.text}}</span>
							<br />
							<br />
						</span>
					</md-item>
				</md-list>
			</md-content>
			<md-button
				translate
				aria-label='Close Cyphertext'
				class='md-fab md-theme-grey close-button'
				ng-click='$this.cyphertext.hide()'
			>
				<strong>&times;</strong>
			</md-button>
		</div>
	`,

	chatMain: `
		<div
			class='chat-main platform-container'
			ng-class='{
				video: $this.p2pManager.isInUse(),
				mobile: $this.isMobile
			}'
			layout='column'
			layout-fill
			flex
		>
			<div
				ng-view
				class='loading'
				layout='column'
				layout-fill
				flex
				ng-class='{
					active: $this.state === Cyph.UI.Chat.States.keyExchange
				}'
			>
				<div flex></div>
				<div class='logo-animation'>
					<img src='/img/logo.animated.gif' alt='Animated Cyph logo' />
				</div>
				<div translate>Initiating key exchange...</div>
				<md-progress-linear
					class='md-accent key-exchange-progress'
					md-mode='determinate'
					ng-value='$this.keyExchangeProgress'
				></md-progress-linear>
				<div flex></div>
			</div>

			<div
				ng-view
				class='abort-screen loading'
				layout='column'
				layout-fill
				flex
				ng-class='{
					active: $this.state === Cyph.UI.Chat.States.aborted
				}'
			>
				<div flex></div>
				<div class='logo-animation'>
					<img src='/img/walken.png' alt='Definitely not Christopher Walken' />
				</div>
				<div>
					<div translate>This cyph has been aborted.</div>
					<br />
					<span translate>Please</span>
					<a
						translate
						target='_self'
						ng-href='{{Cyph.Env.newCyphUrl}}'
					>try again</a>.
				</div>
				<div flex></div>
			</div>

			<div
				ng-view
				class='chat-begin-message loading'
				layout='column'
				layout-fill
				flex
				ng-class='{
					active: $this.state === Cyph.UI.Chat.States.chatBeginMessage
				}'
			>
				<div flex></div>
				<div class='logo-animation'>
					<img src='/img/logo.animated.connected.gif' alt='Animated Cyph logo' />
				</div>
				<div translate>Securely Connected!</div>
				<md-progress-linear
					class='md-accent key-exchange-progress'
					md-mode='determinate'
					ng-value='100'
				></md-progress-linear>
				<div flex></div>
			</div>

			<div
				ng-view
				class='video-call'
				flex
				ng-class='{
					active: $this.state === Cyph.UI.Chat.States.chat,
					playing: $this.p2pManager.isPlaying()
				}'
			>
				<a class='logo' rel='noreferrer' ng-href='{{Cyph.Env.homeUrl}}'>
					<img src='/img/betalogo.mobile.png' alt='Beta logo' />
				</a>
				<video
					class='friend stream'
					ng-show='$this.p2pManager.p2p.incomingStream.video'
					autoplay
				></video>
				<video
					class='friend'
					ng-hide='
						$this.p2pManager.p2p.incomingStream.video ||
						$this.p2pManager.p2p.incomingStream.loading
					'
					ng-attr-src='{{
						$this.p2pManager.isPlaying() ?
							"/video/voicecall.mp4" :
							" "
					}}'
					autoplay
					loop
					muted
				></video>
				<video
					class='me'
					ng-show='$this.p2pManager.p2p.outgoingStream.video'
					autoplay
					muted
				></video>

				<md-progress-circular
					ng-show='$this.p2pManager.p2p.incomingStream.loading'
					md-mode='indeterminate'
				></md-progress-circular>

				<div
					class='progress'
					ng-show='$this.p2pManager.p2p.outgoingFile.name'
				>
					<span translate>Sending</span>
					<span>
						{{$this.p2pManager.p2p.outgoingFile.name}}
						({{$this.p2pManager.p2p.outgoingFile.readableSize}}):
					</span>
					<md-progress-linear
						md-mode='determinate'
						value='{{$this.p2pManager.p2p.outgoingFile.percentComplete}}'
					></md-progress-linear>
				</div>

				<div
					class='progress'
					ng-show='$this.p2pManager.p2p.incomingFile.name'
				>
					<span translate>Receiving</span>
					<span>
						{{$this.p2pManager.p2p.incomingFile.name}}
						({{$this.p2pManager.p2p.incomingFile.readableSize}}):
					</span>
					<md-progress-linear
						md-mode='determinate'
						value='{{$this.p2pManager.p2p.incomingFile.percentComplete}}'
					></md-progress-linear>
				</div>

				<md-button
					translate
					class='sidebar'
					aria-label='Sidebar'
					ng-click='$this.p2pManager.toggleSidebar()'
				>
					<img src='/img/icons/chat.png' alt='Chat' />
				</md-button>

				<div class='buttons'>
					<md-button
						translate
						class='md-fab video-call-button'
						ng-click='$this.p2pManager.videoCallButton()'
						ng-attr-aria-label='{{
							!$this.p2pManager.p2p.outgoingStream.video ?
								"Enable Camera" :
								"Disable Camera"
						}}'
					>
						<img
							ng-show='
								!$this.p2pManager.isActive ||
								!$this.p2pManager.p2p.outgoingStream.video
							'
							src='/img/icons/video.on.png'
							alt='Video on'
						/>
						<img
							ng-show='
								$this.p2pManager.isActive &&
								$this.p2pManager.p2p.outgoingStream.video
							'
							src='/img/icons/video.off.png'
							alt='Video off'
						/>
					</md-button>
					<md-button
						translate
						class='md-fab voice-call-button'
						ng-click='$this.p2pManager.voiceCallButton()'
						ng-attr-aria-label='{{
							!$this.p2pManager.p2p.outgoingStream.audio ?
								"Enable Mic" :
								"Disable Mic"
						}}'
					>
						<img
							ng-show='!$this.p2pManager.isActive'
							src='/img/icons/voice.on.png'
							alt='Voice on'
						/>
						<img
							ng-show='
								$this.p2pManager.isActive &&
								!$this.p2pManager.p2p.outgoingStream.audio
							'
							src='/img/icons/mic.on.png'
							alt='Mic on'
						/>
						<img
							ng-show='
								$this.p2pManager.isActive &&
								$this.p2pManager.p2p.outgoingStream.audio
							'
							src='/img/icons/mic.off.png'
							alt='Mic off'
						/>
					</md-button>
					<md-button
						translate
						class='md-fab send-file-button'
						ng-disabled='$this.p2pManager.p2p.outgoingFile.name'
						aria-label='Send File'
					>
						<img src='/img/icons/file.png' alt='File' />
						<input
							type='file'
							cyph-filechange='$this.p2pManager.sendFileButton()'
						/>
					</md-button>
					<md-button
						translate
						aria-label='End Call'
						class='md-fab md-theme-grey close-button'
						ng-click='$this.p2pManager.closeButton()'
					>
						<strong>&times;</strong>
					</md-button>
				</div>
			</div>

			<div
				class='video-call-message-box'
				cyph-chat-message-box='$this'
			></div>

			<div
				ng-view
				class='message-list nano'
				flex
				ng-class='{
					active: $this.state === Cyph.UI.Chat.States.chat
				}'
			>
				<md-content class='nano-content'>
					<md-list layout='column'>
						<md-item
							class='message-item unread'
							ng-class='::"author-" + Cyph.Session.Users[message.author]'
							ng-repeat='message in $this.messages'
							layout='horizontal'
						>
							<span class='message'>
								<strong
									translate
									class='message-author'
									ng-hide='::message.author === Cyph.Session.Users.app'
									ng-bind='::(
										message.author === Cyph.Session.Users.me ?
											"me" :
											"friend"
									) + ": "'
								></strong>
								<span
									class='message-text'
									cyph-markdown='::message.text'
									ng-class='::{
										"app-message":
											message.author === Cyph.Session.Users.app
									}'
								></span>
							</span>
							<span flex class='message-timestamp'>
								<span
									class='mobile-only'
									ng-show='::message.author === Cyph.Session.Users.me'
								>
									<span translate>me</span> &nbsp;&mdash;&nbsp;
								</span>

								{{::message.timestamp}}

								<span
									class='mobile-only'
									ng-show='::message.author === Cyph.Session.Users.friend'
								>
									&nbsp;&mdash;&nbsp; <span translate>friend</span>
								</span>
							</span>
						</md-item>

						<md-item
							class='friend-is-typing'
							ng-class='{"show": $this.isFriendTyping}'
						>
							<span class='ellipsis-spinner'>
								<div class='bounce1'></div>
								<div class='bounce2'></div>
								<div class='bounce3'></div>
							</span>
						</md-item>

						<div ng-show='$this.isDisconnected' layout='row' layout-align='center center'>
							<md-card flex='50' class='md-padding'>
								<md-card-content>
									<ng-transclude></ng-transclude>
								</md-card-content>
							</md-card>
						</div>
					</md-list>
				</md-content>
			</div>
		</div>
	`,

	chatMessageBox: `
		<div
			class='chat-message-box platform-container'
			ng-class='{mobile: $this.isMobile}'
			ng-show='
				$this.state === Cyph.UI.Chat.States.chat &&
				$this.session.state.isAlive
			'
		>
			<textarea
				translate
				class='message-box tabIndent'
				ng-model='$this.currentMessage'
				ng-trim='false'
				ng-change='$this.messageChange()'
				cyph-enterpress='$this.send()'
				enterpress-only='desktop'
				placeholder='Send a secure message...'
			></textarea>

			<md-button
				translate
				class='send-button mobile-only'
				ng-class='{
					"chat-message-box-hidden": $this.currentMessage === ""
				}'
				ng-click='$this.send()'
				aria-label='Send'
			>
				<md-icon class='grey'>send</md-icon>
			</md-button>

			<md-button
				translate
				class='insert-photo-mobile mobile-only'
				ng-class='{"chat-message-box-hidden": $this.currentMessage !== ""}'
				aria-label='Insert Photo'
			>
				<md-icon class='grey'>insert_photo</md-icon>
				<input
					accept='image/*'
					type='file'
					cyph-filechange='$this.photoManager.insert(this)'
				/>
			</md-button>

			<md-fab-speed-dial
				md-direction='up'
				class='md-fling md-hover-full md-fab-bottom-right desktop-only'
				md-open='isOpen'
				ng-mouseenter='isOpen = true'
				ng-mouseleave='isOpen = false'
			>
				<md-fab-trigger>
					<md-button
						aria-label='Menu'
						class='md-fab'
					>
						<img src='/img/logo.white.icon.png' />
					</md-button>
				</md-fab-trigger>
				<md-fab-actions>
					<md-button
						aria-label='Send File'
						class='md-fab md-raised md-mini'
						ng-click='$this.p2pManager.sendFileButton()'
					>
						<md-tooltip md-direction='left'>
							Send File
						</md-tooltip>
						<md-icon class='grey'>attach_file</md-icon>
					</md-button>
					<md-button
						aria-label='Send Image'
						class='md-fab md-raised md-mini'
					>
						<md-tooltip md-direction='left'>
							Send Image
						</md-tooltip>
						<md-icon class='grey'>insert_photo</md-icon>
						<input
							accept='image/*'
							type='file'
							cyph-filechange='$this.photoManager.insert(this)'
						/>
					</md-button>
					<md-button
						aria-label='Voice Call'
						class='md-fab md-raised md-mini'
						ng-click='$this.p2pManager.voiceCallButton()'
					>
						<md-tooltip md-direction='left'>
							Voice Call
						</md-tooltip>
						<md-icon class='grey'>phone</md-icon>
					</md-button>
					<md-button
						aria-label='Video Call'
						class='md-fab md-raised md-mini'
						ng-click='$this.p2pManager.videoCallButton()'
					>
						<md-tooltip md-direction='left'>
							Video Call
						</md-tooltip>
						<md-icon class='grey'>videocam</md-icon>
					</md-button>
				</md-fab-actions>
			</md-fab-speed-dial>

			<md-subheader
				class='new-messages md-subheader-colored md-sticky-clone'
				ng-show='$this.scrollManager.unreadMessages > 0'
				sticky-state='active'
				ng-click='$this.scrollManager.scrollDown()'
			>
				<strong>&#8595;&nbsp;&nbsp;</strong>
				<span
					translate
					ng-bind='
						$this.scrollManager.unreadMessages +
						" " + "new" + " " +
						(
							$this.scrollManager.unreadMessages > 1 ?
								"messages" :
								"message"
						)
					'
				></span>
			</md-subheader>
		</div>
	`,

	chatToolbar: `
		<div>
			<div ng-if='!$this.isMobile'>
				<div class='desktop-toolbar desktop-only' layout='row' layout-align='end end' flex='95'>
					<img
						src='/img/icons/help.png'
						ng-click='$this.helpButton()'
					/>
					<a href='{{Cyph.Env.homeUrl}}'>
						<img src='/img/icons/castle.png' />
					</a>
					<img
						src='/img/icons/close.png'
						ng-show='$this.isConnected'
						ng-click='$this.disconnectButton()'
					/>
				</div>
			</div>
			<div ng-if='$this.isMobile'>
				<md-toolbar class='mobile-toolbar'>
					<div class='md-toolbar-tools'>
						<a class='logo' rel='noreferrer' ng-href='{{Cyph.Env.homeUrl}}'>
							<img src='/img/betalogo.mobile.png' alt='Beta logo' />
						</a>

						<span flex></span>

						<span ng-show='showChat && $this.state === Cyph.UI.Chat.States.chat'>
							<span ng-click='$this.p2pManager.disabledAlert()'>
								<md-button
									translate
									class='video-call-button'
									ng-disabled='
										!$this.p2pManager.isEnabled ||
										!$this.isConnected ||
										!$this.session.state.isAlive
									'
									ng-click='$this.p2pManager.videoCallButton()'
									ng-attr-aria-label='{{
										!$this.p2pManager.isActive ?
											"Video Call" :
											!$this.p2pManager.p2p.outgoingStream.video ?
												"Enable Camera" :
												"Disable Camera"
									}}'
								>
									<img
										ng-show='
											!$this.p2pManager.isActive ||
											!$this.p2pManager.p2p.outgoingStream.video
										'
										src='/img/icons/video.on.png'
										alt='Video on'
									/>
									<img
										ng-show='
											$this.p2pManager.isActive &&
											$this.p2pManager.p2p.outgoingStream.video
										'
										src='/img/icons/video.off.png'
										alt='Video off'
									/>
								</md-button>
								<md-button
									translate
									class='voice-call-button'
									aria-label='Voice Call'
									ng-disabled='
										!$this.p2pManager.isEnabled ||
										!$this.isConnected ||
										!$this.session.state.isAlive
									'
									ng-click='$this.p2pManager.voiceCallButton()'
									ng-attr-aria-label='{{
										!$this.p2pManager.isActive ?
											"Voice Call" :
											!$this.p2pManager.p2p.outgoingStream.audio ?
												"Enable Mic" :
												"Disable Mic"
									}}'
								>
									<img
										ng-show='!$this.p2pManager.isActive'
										src='/img/icons/voice.on.png'
										alt='Voice on'
									/>
									<img
										ng-show='
											$this.p2pManager.isActive &&
											!$this.p2pManager.p2p.outgoingStream.audio
										'
										src='/img/icons/mic.on.png'
										alt='Mic on'
									/>
									<img
										ng-show='
											$this.p2pManager.isActive &&
											$this.p2pManager.p2p.outgoingStream.audio
										'
										src='/img/icons/mic.off.png'
										alt='Mic off'
									/>
								</md-button>
								<md-button
									translate
									class='send-file-button'
									ng-disabled='
										$this.p2pManager.p2p.outgoingFile.name ||
										!$this.p2pManager.isEnabled ||
										!$this.isConnected ||
										!$this.session.state.isAlive
									'
									aria-label='Send File'
								>
									<img src='/img/icons/file.png' alt='File' />
									<input
										type='file'
										cyph-filechange='$this.p2pManager.sendFileButton()'
									/>
								</md-button>
							</span>

							<md-button translate aria-label='Menu' ng-click='open()'>
								<img src='/img/icons/menu.png' alt='Menu' />
							</md-button>
						</span>
					</div>
				</md-toolbar>

				<md-sidenav md-component-id='sidenav' class='md-sidenav-right'>
					<md-toolbar>
						<h1 translate class='md-toolbar-tools'>Settings</h1>
					</md-toolbar>
					<md-content class='md-padding'>
						<div>
							<md-button
								translate
								aria-label='Show Cyphertext'
								ng-click='$this.cyphertext.show()'
							>
								Show Cyphertext
							</md-button>
						</div>
						<div>
							<md-button
								translate
								aria-label='Help'
								ng-click='$this.helpButton()'
							>
								Help
							</md-button>
						</div>
						<div>
							<md-button
								translate
								aria-label='Disconnect'
								ng-disabled='!$this.session.state.isAlive'
								ng-click='$this.disconnectButton()'
							>
								Disconnect
							</md-button>
						</div>
					</md-content>
				</md-sidenav>
			</div>
		</div>
	`,

	checkout: `
		<form>
			<div ng-hide='complete'>
				<div class='checkout-ui'>
					<div class='braintree'></div>
					<div layout='row'>
						<md-input-container class='md-block' flex>
							<label>Name</label>
							<input ng-model='name' />
						</md-input-container>
						<md-input-container class='md-block' flex>
							<label>Email</label>
							<input ng-model='email' type='email' />
						</md-input-container>
					</div>
				</div>
				<md-button type='submit'>
					Confirm \${{amount}} payment
				</md-button>
			</div>
			<div translate class='confirmation' ng-show='complete'>
				<ng-transclude></ng-transclude>
			</div>
		</form>
	`,

	contact: `
		<div>
			<div ng-hide='sent'>
				<div layout-gt-xs='row'>
					<md-input-container class='md-block' flex>
						<label>Cyph team to contact</label>
						<md-select ng-model='to'>
							<md-option
								ng-repeat='address in Cyph.Config.cyphEmailAddresses'
								value='{{address}}'
							>
								{{address}}
							</md-option>
						</md-select>
					</md-input-container>
				</div>
				<div layout='row'>
					<md-input-container class='md-block' flex>
						<label>Name</label>
						<input ng-model='fromName' />
					</md-input-container>
					<md-input-container class='md-block' flex>
						<label>Email</label>
						<input ng-model='fromEmail' type='email' />
					</md-input-container>
				</div>
				<md-input-container class='md-block'>
					<label>Subject</label>
					<input ng-model='subject' />
				</md-input-container>
				<md-input-container class='md-block'>
					<label>Message</label>
					<textarea ng-model='message' md-select-on-focus></textarea>
				</md-input-container>

				<md-button>
					Send
				</md-button>
			</div>
			<div ng-show='sent'>
				Your email has been sent! Expect to hear back from us within 72 business hours.
			</div>
		</div>
	`,

	linkConnection: `
		<div
			class='link-connection loading'
			layout='column'
			layout-fill
			flex
		>
			<div flex></div>
			<div class='logo-animation'>
				<img src='/img/logo.animated.gif' alt='Animated Cyph logo' />
			</div>
			<div>
				<div ng-show='$this.isPassive' translate>
					Waiting for friend to join...
				</div>
				<div ng-hide='$this.isPassive'>
					<div translate>
						Send the link below to someone else and when they open it, you'll be securely connected!
					</div>
					<br />

					<md-input-container class='connect-link-input desktop-only'>
						<input translate ng-model='$this.link' aria-label='Cyph link' />
					</md-input-container>

					<div class='connect-link-mobile mobile-only'>
						<a
							class='connect-link-link'
							ng-href='{{$this.link}}'
						>{{$this.link}}</a>
						<br />

						<md-button
							translate
							class='md-fab'
							aria-label='SMS'
						>
							<img src='/img/icons/sms.png' alt='SMS' />
							<a
								target='_self'
								ng-href='{{Cyph.Env.smsUriBase}}{{$this.linkEncoded}}'
							></a>
						</md-button>

						<span class='divider'>
							&nbsp;
						</span>

						<md-button
							translate
							class='md-fab'
							aria-label='Email'
						>
							<img src='/img/icons/email.png' alt='Email' />
							<a
								target='_self'
								ng-href='mailto:?body={{$this.linkEncoded}}'
							></a>
						</md-button>
					</div>
				</div>

				<br />
				<div>
					<span translate>
						Link expires in
					</span>
					<timer
						class='timer'
						interval='1000'
						countdown='$this.countdown'
						autostart='false'
					>
						{{minutes}}:{{sseconds}}
					</timer>
				</div>
			</div>
			<div flex></div>
		</div>
	`,

	pro: `
		<md-content
			class='nano'
			layout='column'
			layout-fill
			flex
		>
			<div class='nano-content'>
				<div
					class='login-form'
					ng-show='$this.proState === Cyph.im.UI.ProStates.login'
					ng-class='{checking: checking}'
					layout='row'
					layout-align='center center'
				>
					<md-card flex='75' class='md-padding'>
						<md-card-title>
							<md-card-title-text>
								<span class='md-headline' translate>
									Log In
								</span>
								<span class='md-subhead' translate>
									Welcome to Cyph! You can log in to your beta account here.
								</span>
							</md-card-title-text>
						</md-card-title>
						<md-card-content>
							<form>
								<div layout='row' layout-align='center center'>
									<md-subheader ng-style='{visibility: error ? "visible" : "hidden"}'>
										Invalid username or password.
									</md-subheader>
								</div>
								<div layout='row' layout-align='center center'>
									<md-input-container class='md-block' flex='60'>
										<label>Username</label>
										<input ng-model='username' required />
									</md-input-container>
								</div>
								<div layout='row' layout-align='center center'>
									<md-input-container class='md-block' flex='60'>
										<label>Password</label>
										<input ng-model='password' type='password' required />
									</md-input-container>
								</div>
								<div layout='row' layout-align='center center'>
									<md-button type='submit' aria-label='Log In' translate>
										Log In
									</md-button>
								</div>
							</form>
						</md-card-content>
						<md-progress-circular md-mode='indeterminate'></md-progress-circular>
					</md-card>
				</div>
				<div ng-show='$this.proState === Cyph.im.UI.ProStates.register'>
					Registration screen
				</div>
				<div ng-show='$this.proState === Cyph.im.UI.ProStates.settings'>
					Settings screen
				</div>
			</div>
		</md-content>
	`,

	signupForm: `
			<form class='beta-signup-form' ng-submit='$this.submit()'>
				<div ng-show='$this.state === 0'>
					<ng-transclude></ng-transclude>
					<div flex layout='row' layout-sm='column' layout-xs='column' class='signup-form'>
						<div flex='50' layout='column'>
							<md-input-container>
								<label translate>email</label>
								<input type='email' ng-model='$this.data.Email' required />
							</md-input-container>
							<md-input-container>
								<label translate>password</label>
								<input type='password' ng-model='$this.data.Password' ng-disabled='true'/>
							</md-input-container>
							<md-input-container>
								<label translate>password confirmation</label>
								<input type='password' ng-model='$this.data.Password' ng-disabled='true'/>
							</md-input-container>
						</div>
						<div flex='50' layout-column>
							<p translate>
								We are currently at capacity and registration is closed, but you can sign up for the
									waitlist to reserve your spot in line for an account.
							</p>
							<p translate>
								But you don't need an account to use Cyph, just click the start new Cyph button on the homepage. Our beta accounts program
								provides early access to more advanced functionality and cool new features.
							</p>
						</div>
					</div>
					<div class='buttons' layout='row'>
						<md-button
							translate
							type='submit'
							aria-label='Register'
							ng-hide='$this.state > 1'
							ng-disabled='true'
						>
							Register
						</md-button>
						<md-button
							translate
							type='submit'
							ng-hide='$this.state > 1'
							aria-label='Waitlist Signup'
						>
							Waitlist Signup
						</md-button>
					</div>
				</div>
						
				<div ng-show='$this.state === 1'>
					<p translate>
						Thanks for signing up. Feel free to give us your name too. Privacy is at the core of our ideology, so we'll never give away your email address or personal details.
					</p>
					<div layout='row' flex='100'>
						<div flex='20'></div>
						<md-input-container>
							<label translate>Name (optional)</label>
							<input ng-model='$this.data.name' />
						</md-input-container>
						<div flex='15'></div>
					</div>
					<md-button
							translate
							type='submit'
							ng-hide='$this.state > 1'
							aria-label='Waitlist Signup'
						>
							Submit
					</md-button>

				</div>
				<div translate ng-show='$this.state === 2'>
					Thanks for subscribing, {{$this.data.name}}! We'll email you when your invite is ready.
				</div>
			</form>
	`,

	staticCyphNotFound: `
		<md-content
			class='cyph-not-found nano'
			layout='column'
			layout-fill
			flex
		>
			<div class='nano-content'>
				<div>
					<h1 translate>
						I'm sorry, but your cyph is in another castle...
					</h1>
				</div>
				<img src='/img/404.png' alt='Funny Mario reference' />
				<div class='explanation'>
					<p>
						<span translate>Please</span>
						<a
							translate
							target='_self'
							ng-href='{{Cyph.Env.newCyphUrl}}'
						>try again</a>.
					</p>
					<p translate>Reasons why you may have landed here:</p>
					<ul>
						<li translate>
							The cyph you're looking for has expired
						</li>
						<li translate>
							The cyph you're looking for has already been connected to
							(someone else got there first, or you clicked twice)
						</li>
						<li translate>
							A glitch in the matrix
						</li>
						<li translate>
							You're just guessing random URLs
						</li>
						<li translate>
							We broke something
						</li>
					</ul>
				</div>
			</div>
		</md-content>
	`,

	staticCyphSpinningUp: `
		<div
			class='cyph-spinning-up loading'
			layout='column'
			layout-fill
			flex
		>
			<div flex></div>
			<div class='logo-animation'>
				<img src='/img/logo.animated.gif' alt='Animated Cyph logo' />
			</div>
			<div translate>Now spinning up your cyph room...</div>
			<div flex></div>
		</div>
	`,

	staticFooter: `
		<div layout='row' flex class='footer desktop-only'>
			<div flex></div>

			<p flex='nogrow' layout-padding>
				© Cyph 2016 (Patents Pending)
			</p>

			<p flex='nogrow' layout-padding>
				<a flex ng-href='{{Cyph.Env.homeUrl}}contact'>Contact</a>
			</p>

			<p flex='nogrow' layout-padding>
				<a ng-href='{{Cyph.Env.homeUrl}}donate'>
					Donate
				</a>
			</p>

			<p flex='nogrow' layout-padding>
					<strong>
						- Individual Use Only -
					</strong>
			</p>

			<p flex='nogrow' layout-padding>
				 <a ng-href='{{Cyph.Env.homeUrl}}pricing'>
				 	Business Pricing
				</a>
			</p>

			<p flex='nogrow' layout-padding>
				<a ng-href='{{Cyph.Env.homeUrl}}privacypolicy'>
					Privacy Policy
				</a>
			</p>

			<p flex='nogrow' layout-padding>
				<a ng-href='{{Cyph.Env.homeUrl}}termsofservice'>
					Terms of Service
				</a>
			</p>
			<div flex></div>
		</div>
	`
};

(() => {
	for (const k of Object.keys(Templates)) {
		Templates[k]	= Util.translateHtml(Templates[k]);
	}
})();
