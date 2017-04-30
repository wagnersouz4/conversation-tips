(function(){
    'use strict';
    
    angular.module('conversationTips')
        .factory('networking', networking);
    
    function networking() {
        var services = {
            loadConversation: loadConversation
        };

        return services;

        // update to consume from the SOS Tool API. For now providing a stub response.
        function loadConversation() {
            var conversation = {
                situations: [
                    {
                        id: 1,
                        description: 'Dating',
                        moments: [
                            {
                                description: 'Starting',
                                cards: [
                                    {
                                        numberOfLikes: 10,
                                        tip: 'Hi! Are you enjoying the party?'
                                    },
                                    {
                                        numberOfLikes: 0,
                                        tip: 'Where are you from?'
                                    },
                                    {
                                        numberOfLikes: 5,
                                        tip: 'How long have you been here?'
                                    }
                                ]
                           }, 
                           {
                               description: 'Maintaining',
                               cards: [
                                   {
                                       numberOfLikes: 5,
                                       tip: 'Hey! Long time no see!'
                                   },
                                   {
                                       numberOfLikes: 10,
                                       tip: 'What have you been up to?'
                                   },
                                   {
                                       numberOfLikes: 0,
                                       tip: 'I was thiking about you yesterday.'
                                   }
                               ]
                           }
                       ] 
                    }, 
                    {
                        id: 2,
                        description: 'Hanging Out'
                    }, 
                    {
                        id: 3,
                        description: 'Networking'
                    },
                    {
                        id: 4,
                        description: 'Work'
                    }
                ]
            };
            return conversation;
        }
    }
})();