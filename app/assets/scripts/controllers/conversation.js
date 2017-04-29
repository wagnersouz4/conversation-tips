(function(){
    'use strict';

    angular.module('conversationTips')
        .controller('ConversationCtrl', Conversation);
    
    /* @ngInject */
    function Conversation(networking) {
        var vm = this;
        init();

        function init() {
            loadConversation();
        }

        function loadConversation() {
            // update to use promises when consuming from an API
            vm.conversation = networking.loadConversation();
        }
    }
})();