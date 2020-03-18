const { GeneralMessage, messageType } = require("./GeneralMessageBase");
/**
 * Class representing Matrix identification message
 * @extends GeneralMessage
 */
class IdentificationMessage extends GeneralMessage {
  /**
   * Create the message that will be sent to .Net.
   * @param {string} MessageId Id for sync.
   * @param {messageType} MessageType Type of message (Cabinet, Camera, Identification).
   * @param {identificationMessageType} IdentificationMessageType
   * @param {Array.<{IdentificationStatusResponse: identificationStatusResponse, DeviceType: deviceType}>} Devices
   * @param {Null} ReceivedData For receiving data from .Net. should initiate as Null
   * @param {identificationStatusResponse} IdentificationStatusResponse
   */
  constructor(
    MessageId,
    MessageType,
    IdentificationMessageType,
    Devices,
    ReceivedData = {},
    IdentificationStatusResponse = "None"
  ) {
    super(MessageId, MessageType);
    this.IdentificationMessageType = IdentificationMessageType;
    this.Devices = Devices;
    this.ReceivedData = ReceivedData;
    this.IdentificationStatusResponse = IdentificationStatusResponse;
  }
}

const identificationMessageType = Object.freeze({
  CONNECT: "Connect",
  DISCCONECT_ALL_READERS: "DisconnectAllReaders",
  DISCONNECT_READERS: "DisconnectReaders",
  INPUT_RECEIVED: "InputReceived"
});

const identificationStatusResponse = Object.freeze({
  CONNECTED: "Connected",
  DISCONNECTED: "Disconnected",
  ERROR: "Error",
  NONE: "None"
});

const deviceType = Object.freeze({
  PCPROX_PROXIMITY_READER: "PcProxProximityCard",
  KEYBOARD_EMULATOR: "KeyboardEmulator",
  DIGITAL_PERSONA_FINGER_PRINT: "DigitalPersonaFingerPrint"
});

module.exports = {
  IdentificationMessage,
  messageType,
  identificationMessageType,
  identificationStatusResponse,
  deviceType
};
