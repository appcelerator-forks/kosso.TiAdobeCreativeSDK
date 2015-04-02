# TiAdobeCreativeSDK
Titanium Module for photo editing using the Adobe Creative SDK (was the Aviary SDK).

Based on work by [@ludolphus](https://github.com/ludolphus/AviaryModule), [@alexshive](https://github.com/alexshive/AviaryModule), [@ghkim](https://github.com/ghkim/AviaryModule) and [@frederictedesco](https://github.com/frederictedesco/Adobe-Creative-Image-module-for-Titanium) (for the latest Adobe update)

I was getting some build errors (on the module at first, then the app) so decided to start from scratch and rename. 


- Added the Frameworks to the XCode project
- Extracted the CreativeSDK Foundation and Image framework .bundle files for Titanium app resources.  (Copy to platform/iphone/.. in your project root folder).

You will need to download the Adobe Creative SDK from https://creativesdk.adobe.com/downloads.html  (It's too big for github). Then copy the `AdobeCreativeSDKFoundation.framework` and `AdobeCreativeSDKImage.framework` files into the iphone folder to build the module. 

You can then open the frameworks and go into 'Resources' and copy out the `AdobeCreativeSDKFoundationResources.bundle` and `AdobeCreativeSDKImageResources.bundle` files which need to be placed in your APP_Project/platform/iphone folder for your app. 

- You will also need to edit the module.xconfig file to locate the Adobe Frameworks. 

- Install the module locally to the app (in modules/iphone/.. in your project root folder).


# Example

~~~

var photo_editor = require("com.kosso.tiadobecreativesdk");

var image_blob = [ A TiBlob from the camera or album, for example ];

var edited_image;

// Editor tool options.
var tools = ['kAFEffects','kAFEnhance','kAFOrientation','kAFAdjust', 'kAFCrop','kAFSharpness','kAFText','kAFStickers','kAFDraw','kAFMeme','kAFFrames','kAFFocus'];
var alltools = ['kAFEnhance', 'kAFEffects', 'kAFFrames', 'kAFOverlays', 'kAFVignette', 'kAFCrop', 'kAFSplash', 'kAFFocus', 'kAFOrientation', 'kAFAdjustments', 'kAFSharpness', 'kAFStickers', 'kAFDraw', 'kAFMeme', 'kAFText', 'kAFRedeye', 'kAFWhiten', 'kAFBlemish', 'kAFBlur'];

// Obtain an App Client ID from Adode https://creativesdk.adobe.com/myapps.html  - You will need an Adobe ID. 

var adobe_client_id = 'YOUR_ADOBE_CREATIVE_SDK_CLIENT_ID';
var adobe_client_secret = 'YOUR_ADOBE_CREATIVE_SDK_CLIENT_SECRET';

// set statusbar color
photo_editor.setStatusBarStyle(Ti.UI.iPhone.StatusBar.LIGHT_CONTENT);
set text of Cancel and Apply buttons
photo_editor.setCancelApplyButtons({cancel:0, save: 1});

// Open the image in the Adobe CreativeSDK Image Editor
photo_editor.newImageEditor({apikey:adobe_client_id, secret: adobe_client_secret, image: image_blob, tools: tools});

// Open the image in the Adobe CreativeSDK Image Editor with custom crops
var crops = ["Avatar", 400, 400, "Cover", 960, 260];
photo_editor.newImageEditor({apikey:adobe_client_id, secret: adobe_client_secret, image: image_blob, tools: tools, crops: crops});
 
// Fired when the editor is done 
photo_editor.addEventListener('avEditorFinished', function(e){

	Ti.API.info('avEditorFinished done: '+e.image);
	Ti.API.info('avEditorFinished size: '+e.image.length);

	if(e.image.length==0){
		Ti.API.info('photo editor ERROR!');
		return;
	}

	setTimeout(function(){
		edited_image = e.image;
		photo_editor = null;
	},150);		
});

~~~


# Authors
1.0.0 Initial version by Kosso [Twitter](https://twitter.com/kosso) [App.net](https://app.net/kosso)
1.0.1 update by Jérôme Danthinne [Twitter](https://twitter.com/jdanthinne) 
1.1.0 update by Steven van Loef [Twitter](https://twitter.com/ludolphus) [App.net](https://app.net/ludolphus)

