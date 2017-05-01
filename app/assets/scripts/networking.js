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
                        description: 'Hanging Out',
                        moments: [
                            {
                                description: 'Starting',
                                cards: [
                                    {
                                        numberOfLikes: 10,
                                        tip: 'Hi! What do you for a living?'
                                    },
                                    {
                                        numberOfLikes: 0,
                                        tip: 'What are your hobbies?'
                                    },
                                    {
                                        numberOfLikes: 5,
                                        tip: 'Do you like jogging?'
                                    }
                                ]
                           }, 
                           {
                               description: 'Maintaining',
                               cards: [
                                   {
                                       numberOfLikes: 5,
                                       tip: 'How about McDonalds today?'
                                   },
                                   {
                                       numberOfLikes: 10,
                                       tip: 'Let\'s have some beers!'
                                   },
                                   {
                                       numberOfLikes: 0,
                                       tip: 'Let\'s have some fun!'
                                   }
                               ]
                           }
                       ] 
                    },
                    {
                        description: 'Work',
                        moments: [
                            {
                                description: 'Starting',
                                cards: [
                                    {
                                        numberOfLikes: 10,
                                        tip: 'How long have you been working here?'
                                    },
                                    {
                                        numberOfLikes: 0,
                                        tip: 'Where do you usually lunch?'
                                    },
                                    {
                                        numberOfLikes: 5,
                                        tip: 'Good morning! I am \'your name\'.'
                                    }
                                ]
                           }, 
                           {
                               description: 'Maintaining',
                               cards: [
                                   {
                                       numberOfLikes: 5,
                                       tip: 'How does a meeting tomorrow morning sound?'
                                   },
                                   {
                                       numberOfLikes: 10,
                                       tip: 'Excuse-me, do you have a moment to help me here?'
                                   },
                                   {
                                       numberOfLikes: 0,
                                       tip: 'If you need my help, just let me know.'
                                   }
                               ]
                           }
                       ] 
                    },
                    {
                        description: 'Networking',
                        moments: [
                            {
                                description: 'Starting',
                                cards: [
                                    {
                                        numberOfLikes: 10,
                                        tip: 'What kind of business are you in?'
                                    },
                                    {
                                        numberOfLikes: 0,
                                        tip: 'Have you heard about this new startup?'
                                    },
                                    {
                                        numberOfLikes: 5,
                                        tip: 'I am really interested in your company! Could you tell me more about it?'
                                    }
                                ]
                           }, 
                           {
                               description: 'Maintaining',
                               cards: [
                                   {
                                       numberOfLikes: 5,
                                       tip: 'I really like you work!'
                                   },
                                   {
                                       numberOfLikes: 10,
                                       tip: 'You have been fantastic! Great job!'
                                   },
                                   {
                                       numberOfLikes: 0,
                                       tip: 'It was a plesure to work with you!'
                                   }
                               ]
                           }
                       ] 
                    }
                ]
            };
            return conversation;
        }
    }
})();