// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const burner = require('./burnme.js');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const speakOutput = 'Welcome to Shakespearean Shade. Burns from the Bard. Shall I burn thee?';
        await handlerInput.attributesManager.setSessionAttributes({"last": "welcome"});
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const BurnMeIntentHandler = {
  async canHandle(handlerInput) {

    let attributes = await handlerInput.attributesManager.getSessionAttributes();

    const newLocal = ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BurnMeIntent')
      || (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent' && (attributes.last === "define" || attributes.last === "welcome" || attributes.last === "noIntentBurn")));
    return newLocal;
  },
  async handle(handlerInput) {
    var burn = burner.burnMe();
    var speakOutput = "";
    for(let i in burn){
      speakOutput += burn[i] + ' ';
    }

    speakOutput += '. Shall I explain that? ';
    
    //save the burn to session attributes
    await handlerInput.attributesManager.setSessionAttributes({"burn": burn, "last": "burn"});

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt('Try saying "burn me" to get burned again or "explain that" to get this one explained.')
        .getResponse();  
  }
};

const ExplainIntentHandler = {
  async canHandle(handlerInput) {
    let attributes = await handlerInput.attributesManager.getSessionAttributes();

    return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExplainIntent')
    ||(Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent' && (attributes.last === "burn" || attributes.last === "noIntentDefine")));
  },
  async handle(handlerInput) {
    let attributes = await handlerInput.attributesManager.getSessionAttributes();
    let explain = "";
    //check for a prior burn
    if(attributes.hasOwnProperty('burn')) {
      explain = burner.explainMe(attributes.burn) + " Shall I burn thee again?";
      await handlerInput.attributesManager.setSessionAttributes({"last": "define", "burn": attributes.burn});  
    } else {
      explain = "I haven't burned you yet. Try saying 'burn me'.";
      await handlerInput.attributesManager.setSessionAttributes({"last": "welcome"});  
    }

  
    
    return handlerInput.responseBuilder
    .speak(explain)
    .reprompt('Try saying "burn me" to get a new burn or "explain that" to hear this explained again.')
    .getResponse();  
  }
}

const LastChanceHandler = {
  async canHandle(handlerInput){
    let attributes = await handlerInput.attributesManager.getSessionAttributes();

    return (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
              && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent'
              && (attributes.last === "burn" || attributes.last === "define"));
  },
  async handle(handlerInput) {

    let attributes = await handlerInput.attributesManager.getSessionAttributes();
    let speakOutput = ""

    if(attributes.last !== "burn"){
      speakOutput = "Would you like me to define that?";
      await handlerInput.attributesManager.setSessionAttributes({"last": "noIntentDefine"});
    } else {
      speakOutput = "Shall I burn thee?"
      await handlerInput.attributesManager.setSessionAttributes({"last": "noIntentBurn"});
    }



    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();

  }
}

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Say 'burn me' to get burned or say 'explain that' to get a burn explained";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    async canHandle(handlerInput) {

      let attributes = await handlerInput.attributesManager.getSessionAttributes();

      return (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
          && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
              || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent'))
          || (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
              && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent'
              && (attributes.last === "noIntentDefine" || attributes.last === "noIntentBurn" || attributes.last === "welcome"));
    },
    handle(handlerInput) {
        const speakOutput = burner.farewell();
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        BurnMeIntentHandler,
        ExplainIntentHandler,
        LastChanceHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
