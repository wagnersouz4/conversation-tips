(function(){
    'use strict';

    angular.module('conversationTips')
        .controller('ConversationCtrl', Conversation);
    
    /* @ngInject */
    function Conversation(networking, $timeout) {
        var vm = this;

        function loadConversation() {
            // update to use promises when consuming from an API
            vm.conversation = networking.loadConversation();
        }
        
        function ensureCurrentMomentExists() {
            if (vm.currentMoment === null) {
                console.log('There is no current moment');
                return;
            }
        }

       vm.init = function init() {
            loadConversation();
            vm.currentScreen = 'situation';
        };

        vm.selectedSituationIs = function(situation) {
            if (vm.currentSituation === situation) {
                return true;
            }
            return false;
        };

        vm.currentTip = function() {
            ensureCurrentMomentExists();
            return vm.currentMoment.cards[vm.currentCardIndex].tip;
        };

        vm.currentTipLikes = function() {
            ensureCurrentMomentExists();
            return vm.currentMoment.cards[vm.currentCardIndex].numberOfLikes;
        };

        vm.currentCardIndexIs = function(index) {
            return (index === vm.currentCardIndex) ? true : false;
        };

        /* 
            Refactor the likeTip function, as it should post the updated number of 
            likes to the SOS API in order to persist the data.
        */
        vm.likeTip = function() {
            ensureCurrentMomentExists();
            vm.currentMoment.cards[vm.currentCardIndex].numberOfLikes += 1;
            vm.tipHasBeenLiked = true;
            vm.tipHasBeenLikedTimeout = $timeout(function(){
                vm.tipHasBeenLiked = false;
            }, 2000);
        };

        vm.runMomentCardsAnimation = function() {
            /* 
                It's assuemd that every moment has 3 tips. 
                Therefore, the animation will rely on a index ranging from 0 to 2.
            */
            if (vm.continueCardAnimation === true) {
                vm.momentCardsAnimationTimeout = $timeout(function(){
                    vm.currentCardIndex = (vm.currentCardIndex === 2) ? 0 : vm.currentCardIndex + 1;
                    vm.runMomentCardsAnimation();
                }, 3000);
            }
        };

        vm.loadMomentsOf = function(situation) {
            vm.currentSituation = situation;
            vm.currentScreenTimeout = $timeout(function() {
                vm.currentScreen = 'moment';
            }, 1000);
        };

        vm.loadCardsOf = function(moment) {
            vm.currentCardIndex = 0;
            vm.continueCardAnimation = true;
            vm.currentMoment = moment;
            vm.currentScreen = 'card';
            vm.runMomentCardsAnimation();
        };

        /*
            Closing the app will depend on how it's how it has been built.
            For security reasons a attempt to window.close will be block by the browser.
            At this funcional mock a alert will be used to illustrate the exit application.
        */
        vm.closeApp = function() {
            /* globals alert */
            alert('Closing the application! A proper closing method will be used in the real application.');
        };

        vm.backToScreen = function(screenName) {
            // Verifying is the screenName is valid
            if (['situation', 'moment'].indexOf(screenName) === -1) {
                console.log('Invalid screen name');
                return;
            } 

            switch (screenName) {
                case 'situation':
                    $timeout.cancel(vm.currentScreenTimeout);
                    vm.currentScreen = screenName;
                    vm.currentSituation = null;
                    break;
                case 'moment':
                    $timeout.cancel(vm.momentCardsAnimationTimeout);
                    $timeout.cancel(vm.tipHasBeenLikedTimeout);
                    vm.currentScreen = screenName;
                    vm.currentMoment = null;
                    vm.currentCardIndex = null;
                    vm.continueCardAnimation = false;
                    vm.tipHasBeenLiked = false;
                    break;
                default:
                    break;
            }
        };
    }
})();