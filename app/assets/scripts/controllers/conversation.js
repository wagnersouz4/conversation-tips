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

        vm.loadMomentsOf = function(situation) {
            vm.currentSituation = situation;
            $timeout(function() {
                vm.currentScreen = 'moment';
            }, 1000);
        };

        vm.currentTip = function() {
            return vm.currentMoment.cards[vm.currentCardIndex].tip;
        };

        vm.currentTipLikes = function() {
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
            vm.currentMoment.cards[vm.currentCardIndex].numberOfLikes += 1;
            vm.tipHasBeenLiked = true;
            $timeout(function(){
                vm.tipHasBeenLiked = false;
            }, 2000);
        };

        vm.runMomentCardsAnimation = function() {
            /* 
                It's assuemd that every moment has 3 tips. 
                Therefore, the animation will rely on a index ranging from 0 to 2.
            */
            if (vm.continueCardAnimation === true) {
                $timeout(function(){
                    vm.currentCardIndex = (vm.currentCardIndex === 2) ? 0 : vm.currentCardIndex + 1;
                    vm.runMomentCardsAnimation();
                }, 3000);
            }
        };

        vm.loadCardsOf = function(moment) {
            vm.currentCardIndex = 0;
            vm.continueCardAnimation = true;
            vm.currentMoment = moment;
            vm.currentScreen = 'card';
            vm.runMomentCardsAnimation();
        };
    }
})();