/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        
        
    }
};



var storage = window.localStorage;
function login() {
    if (!window.cordova) {
        var appId = prompt("Enter FB Application ID", "");
        facebookConnectPlugin.browserInit(appId);
    }
    facebookConnectPlugin.login( ['email'],
                                function (response) {
                                alert("Login Success! " + response.status);
                                if (response.status=="connected"){
                                storage.setItem("faceBookResp", JSON.stringify(response));
                                location.reload();
                                }
                                },
                                function (response) {
                                alert(JSON.stringify(response))
                                }
                                );
}

function showDialog() {
    facebookConnectPlugin.showDialog( { method: "feed" },
                                     function (response) { alert(JSON.stringify(response)) },
                                     function (response) { alert(JSON.stringify(response)) });
}

function apiTest() {
    facebookConnectPlugin.api( "me/?fields=id,email", ["user_birthday"],
                              function (response) { alert(JSON.stringify(response)) },
                              function (response) { alert(JSON.stringify(response)) });
}

function logPurchase() {
    facebookConnectPlugin.logPurchase(1.99, "USD",
                                      function (response) { alert(JSON.stringify(response)) },
                                      function (response) { alert(JSON.stringify(response)) });
}

function logEvent() {
    // For more information on AppEvent param structure see
    // https://developers.facebook.com/docs/ios/app-events
    // https://developers.facebook.com/docs/android/app-events
    facebookConnectPlugin.logEvent("Purchased",
                                   {
                                   NumItems: 1,
                                   Currency: "USD",
                                   ContentType: "shoes",
                                   ContentID: "HDFU-8452"
                                   }, null,
                                   function (response) { alert(JSON.stringify(response)) },
                                   function (response) { alert(JSON.stringify(response)) });
}

function getAccessToken() {
    facebookConnectPlugin.getAccessToken(
                                         function (response) { alert(JSON.stringify(response)) },
                                         function (response) { alert(JSON.stringify(response)) });
}

function getStatus() {
    facebookConnectPlugin.getLoginStatus(
                                         function (response) { alert(JSON.stringify(response)) },
                                         function (response) { alert(JSON.stringify(response)) });
}

function logout() {
    facebookConnectPlugin.logout(
                                 function (response) { alert(JSON.stringify(response)); storage.removeItem("faceBookResp");  location.reload();}, 
                                 function (response) { alert(JSON.stringify(response)) });
}

var getFBData =  (storage.getItem("faceBookResp") !=null ? JSON.parse(storage.getItem("faceBookResp")) : "");


if(getFBData != ''){
    if(getFBData.status=="connected"){
        alert("Logged in Facebook");
        $(".login").hide();
        $(".logout").show();
        $(".getAccessToken").show();
        $(".faceBookResponse").html(storage.getItem("faceBookResp"));
    }
}

